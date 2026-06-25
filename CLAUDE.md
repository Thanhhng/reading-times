# Reading Time — developer guide

**Turn wasted time into wonderful time.** A cozy, warm-editorial bilingual (English ↔ Vietnamese)
feed-scroll reading app: scroll to read, read to learn a language. Books are public-domain
(Project Gutenberg via a self-hosted Gutendex API). This file is the single working dev doc —
product, data, and design all live here.

## Stack & commands

- Next.js 16 (App Router, React 19), TypeScript (strict), Tailwind v4, `next/font`.
- `npm run dev` · `npm run build` · `npm run lint`.
- **Requires the self-hosted Gutendex API running at `http://127.0.0.1:8000`** (see Data layer).
  Without it, pages render their graceful empty states.
- Gotchas: Tailwind v4 needs a **relative** `@import` in `app/globals.css`; `app/design/**` is
  **reference-only** and never imported into shipped code.

## Repo structure

- `app/` — routes: `/` (home), `/library`, `/library/[bookId]` (book detail), `/read/[bookId]`
  (reader), `/settings`.
- `app/classes/*.ts` — **Tailwind class objects** (`ui`, `library`, `home`, `reader`, `sidebar`,
  `bottomNav`, `mobileBar`, `settings`). Components import these instead of inlining
  long class strings. This is the house pattern — follow it.
- `app/_data/*.ts` — data layer, all live (no fixtures):
  - `gutendex.ts` — types + mappers + `fetchBooks` / `fetchBook` against the self-host.
  - `readingText.ts` — fetches a book's plain text, strips Gutenberg boilerplate, splits into
    paragraphs/chapters.
  - `nav.ts` — sidebar + bottom-nav items (static, no book data).
- `components/ui/*` — production primitives: BookCard, BookCardSkeleton, BookGridSkeleton,
  GenreChip, Badge, Tag, Avatar, IconButton, ProgressBar, Segmented, Switch, ThemeSegmented,
  button, input, separator, sheet, sidebar, skeleton, tooltip.
- `components/library/*` — BookGrid (server, fetch + grid), FilterBar (server, link-based
  toggles), LibraryReload (client refresh button).
- `components/reader/*` — Reader (client shell: top bar, Aa panel, progress rail),
  ReaderContent (server, renders chapters/paragraphs), AaPanel, BilingualSentence (kept for the
  future bilingual milestone; currently unused).
- `components/layout/*` — DesktopSidebar, MobileTopBar, MobileBottomNav, ThemeToggle.
- `components/brand/*` — logo / illustrations as React.
- `app/globals.css` — design tokens (`:root` light, `.dark` dark, reader-bg variants) + base styles.
- `app/design/**` — **reference only**: design-system recreations and the UI kit
  (`app/design/ui_kits/reading-time/` is the de-facto product spec — LibraryView, ReaderView,
  HomeView, SettingsView JSX). Mine for intended visuals; never import from it.

## Data layer (`app/_data/gutendex.ts`)

Live endpoints (ISR `revalidate: 2700`, 12s timeout, errors → `null`):

- List: `http://127.0.0.1:8000/books/?languages=&sort=popular|ascending|descending&search=&topic=&page=`
  (trailing slash matters — the API 301s without it). Typed as `GutendexResponse`
  (`count`, `next`, `previous`, `results: GutendexBook[]`).
- Single book: `http://127.0.0.1:8000/books/{id}` → `fetchBook(id)`.
- Covers and text files are served from `https://www.gutenberg.org` (covers under `/cache/epub/**`,
  already allowed in `next.config.ts` `images.remotePatterns`).

Types and mappers:

- `GutendexBook` — raw API shape; `formats` is `Partial<Record<string, string>>` so indexing
  yields `string | undefined`; `summaries` / `editors` are optional.
- `LibraryBook = BookCardProps & { id, textUrl, summary, languages, downloadCount, translators }` —
  the identity-bearing app model. Map with `toLibraryBook(book)`.
- `readingTextUrl(book)` — picks a readable text URL: UTF-8 → us-ascii → `text/plain`, drops
  `.zip`, gated on `media_type === "Text"`.
- `deriveGenres(book)` — clean genres from `bookshelves` `"Category: …"` entries first, then fills
  remaining slots from the segment before `" -- "` in `subjects`; deduped, capped at 3.
- `readableBooks(response)` — `results` → only readable text books (`textUrl !== null`) as
  `LibraryBook[]`. Every surface uses this.
- Author/translator names are flipped `"Last, First"` → `"First Last"` with parentheticals removed.

**Contract:** every surface runs on real self-host data — there are no hardcoded book fixtures.
`hasBilingual` is always `false` until a Vietnamese translation pipeline exists (the reader is
EN-only and hides translation UI).

## Reading text (`app/_data/readingText.ts`)

`fetchReadingText(url)` fetches the plain text (ISR-cached, 20s timeout) and strips everything
outside `*** START/END OF THE PROJECT GUTENBERG EBOOK … ***`. `toParagraphs` splits on blank
lines; `toChapters` groups paragraphs under heading-like lines (CHAPTER/PART/BOOK/roman numerals).

## Pages

- **Home (`/`)** — hero with "Start reading" (most popular book) + two rails ("Popular now",
  "Recently added") from `readableBooks(fetchBooks(...))`. Cards link to `/library/{id}`.
  No continue-reading card yet — needs reading-progress persistence (future milestone).
- **Library (`/library`)** — server-rendered grid + **filter bar built from `Link` toggles**:
  multi-select genres (OR within group, derived from the current page's results, narrowed
  client-side against `deriveGenres` output), language tags + sort + "EN ↔ VI" (API params),
  AND across groups. All state lives in the query string (`genre` repeated, `languages` comma
  list, `sort`, `bilingual=1`, `page`). Prev/Next pagination from `count`/`next`/`previous`.
- **Book detail (`/library/[bookId]`)** — a routed page (the newest design replaced the old
  slide-over): cover (real image or warm spine fallback via `coverFor`), genre badges, stats
  (downloads · language · public domain), Gutendex summary, "Translated by …" when non-empty,
  reading-mode launcher, and "Read now" → `/read/{id}`. Words/est-minutes are intentionally
  omitted (not in Gutendex; don't fetch full text for a grid stat).
- **Reader (`/read/[bookId]?mode=&ch=`)** — numeric Gutenberg id. Two modes, **`full`
  ("Normal reading") is the default**: `full` = whole book with chapter headings, `chapter` =
  one chapter at a time with Previous/Next (`?ch=N`).
  Duration/session-based reading was removed. The Aa panel (size/font/leading/background) hides
  its Translation row while books are EN-only.
  **On-demand EN→VI translation:** select (highlight) text in a paragraph → a floating "Dịch"
  popup appears → click to translate the selection live via SimplyTranslate, rendered as a block
  under that paragraph (one slot per paragraph). Same flow on desktop and mobile. Pieces:
  `translateText` server action (`app/_data/translateAction.ts`, axios, chunks ≤500 chars via
  `chunkText` in `app/_data/translate.ts`), `TranslationProvider` (per-`pid` store),
  `TranslatableParagraph`, `SelectionPopover`. Styled via `trans*` keys in `app/classes/reader.ts`.
  Independent of `hasBilingual` and the dormant `BilingualSentence`/`data-trans` sentence pipeline
  (still reserved for milestone 2).
- **Settings (`/settings`)** — local-only prefs UI; default mode segmented control is
  Normal/Chapter (no Sessions, no wpm slider).
- **Mobile nav** — bottom tab bar (≤`md`) with four equal flat tabs: Home · Library · Read ·
  Profile. No raised primary pill; active tab = accent-soft pill + accent text. "Read" jumps into
  the most popular book in normal reading (href computed in `app/layout.tsx` from real data,
  `/library` fallback).

## Design system (non-negotiable)

- **Never pure white / pure black.** Light = ivory `#FAF6EE` on `#2C2A26`; dark = warm near-black
  `#17161B` on off-white `#E9E3D7`. Dark never pairs with black text.
- Fonts: **Fraunces** (display/serif), **Literata** (reading), **Be Vietnam Pro** (UI) — loaded in
  `app/layout.tsx` via `next/font`, all cover Vietnamese diacritics. Never Inter/Roboto/Arial.
- Accent terracotta `#C4663A` (amber `#E0905C` in dark), used sparingly (primary CTA, active nav).
  Secondary accent teal for bilingual badges. Warm soft shadows, 12–16px radii.
- Tone: sentence case, second-person, no hype. Vietnamese copy is fine in UI; bilingual word-pairs
  use the `↔` glyph.
- Use design tokens via the exposed Tailwind utilities (`bg-surface`, `bg-surface-2`, `text-ink`,
  `border-border`, `text-muted-foreground`, `bg-accent`, `bg-accent-soft`, …). Tokens not exposed
  as utilities (e.g. `--border-strong`, `--reader-*`) go through arbitrary values:
  `border-[var(--border-strong)]`.
- Components stay **server components** unless they need state; no comments unless a pragma is
  required.
- BookCard: real cover via `next/image` when `cover` is set, otherwise a deterministic warm-color
  spine (6-colour palette keyed off the title, `coverFor(title)`). Genre chips capped at 3.
  "EN · VI" badge only when `hasBilingual`.

## Milestones (remaining)

1. **Reading-progress persistence** — continue-reading card on home, real "Read" tab resume,
   progress on book detail.
2. **Bilingual EN ↔ VI pipeline** — sentence-aligned translations; re-enable `hasBilingual`, the
   reader's Translation modes, and `BilingualSentence`.
3. **Search & categories** — wire the sidebar search (`/search`) and categories (`/categories`)
   routes to `fetchBooks({ search, topic })`.
4. **Reader stats** — words / est-minutes derived from fetched text length for the reader header.
