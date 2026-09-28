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
  (reader), `/search`, `/settings`.
- `app/classes/*.ts` — **Tailwind class objects** (`ui`, `library`, `home`, `reader`, `topNav`,
  `bottomNav`, `mobileBar`, `settings`, `search`). Components import these instead of inlining
  long class strings. This is the house pattern — follow it.
- `app/_data/*.ts` — data layer, all live (no fixtures):
  - `gutendex.ts` — types + mappers + `fetchBooks` / `fetchBook` against the self-host.
  - `readingText.ts` — fetches a book's plain text, strips Gutenberg boilerplate, splits into
    paragraphs/chapters.
  - `nav.ts` — top-nav + bottom-nav items (static, no book data).
  - `homeReel.ts` — static sample copy for the home hero's reel preview card.
- `components/ui/*` — production primitives: BookCard, BookCardSkeleton, BookGridSkeleton,
  GenreChip, Badge, ThemeSegmented, button, input, tooltip. Add new primitives only when a
  surface actually uses them.
- `components/library/*` — BookGrid (server, fetch + grid), FilterBar (server, link-based
  toggles), LibraryReload (client refresh button).
- `components/reader/*` — Reader (client shell: top bar, Aa panel, progress rail),
  ReaderContent (server, renders chapters/paragraphs), Paragraph (server `<p>`, strips Gutenberg
  `_italic_` underscores), AaPanel.
- `components/search/*` — SearchForm (GET form → `/search?search=`), SearchResults (server fetch).
- `components/layout/*` — TopNav (desktop, hidden on `/read`), MobileTopBar, MobileBottomNav,
  ThemeToggle.
- `components/home/*` — ReelCard (static sample reading screen in the home hero).
- `components/brand/*` — BrandGlyph (logo as React).
- `app/globals.css` — design tokens (`:root` light, `.dark` dark; the reader's `--reader-*` follow the theme) + base styles.
- `app/design/**` — **reference only**: design-system recreations and the UI kit
  (`app/design/ui_kits/reading-time/` is the de-facto product spec — LibraryView, ReaderView,
  HomeView, SettingsView JSX). Mine for intended visuals; never import from it.

## Data layer (`app/_data/gutendex.ts`)

Live endpoints (ISR `revalidate: 2700`, 12s timeout). Base URL comes from `GUTENDEX_URL`
(default `http://127.0.0.1:8000/books/`). `fetchBooks` turns any failure into `null` (list pages
show their empty state + reload). `fetchBook` returns `null` only on a real 404 (→ `notFound()`);
network errors / 5xx throw `GutendexUnavailableError`, caught by `error.tsx` in
`app/library/[bookId]/` and `app/read/[bookId]/` (`ServiceError` with "Try again" →
`unstable_retry()`).

- List: `http://127.0.0.1:8000/books/?languages=&sort=popular|ascending|descending&search=&topic=&page=`
  (trailing slash matters — the API 301s without it). Typed as `GutendexResponse`
  (`count`, `next`, `previous`, `results: GutendexBook[]`).
- Single book: `http://127.0.0.1:8000/books/{id}/` → `fetchBook(id)` (trailing slash avoids a 301).
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

**Contract:** every surface runs on real self-host data — there are no hardcoded book fixtures
(the one exception is the illustrative home reel card sample in `homeReel.ts`). The app is
EN-only for now: there is no translation code or bilingual flag in the model.

## Reading text (`app/_data/readingText.ts`)

`fetchReadingText(url)` fetches the plain text (ISR-cached, 20s timeout) and strips everything
outside `*** START/END OF THE PROJECT GUTENBERG EBOOK … ***`. `toParagraphs` splits on blank
lines; `toChapters` groups paragraphs under heading-like lines (CHAPTER/PART/BOOK/roman numerals).

## Pages

- **Home (`/`)** — editorial hero (giant Fraunces headline, "Start today's reel" → most popular
  book, static `ReelCard` preview), a masthead strip (date · EN → VI · free · live book count), and
  two 6-book rails ("Popular now", "Recently added") from `readableBooks(fetchBooks(...))` using
  `BookCard variant="plain"`. Cards link to `/library/{id}`.
  No continue-reading card yet — needs reading-progress persistence (future milestone).
- **Library (`/library`)** — server-rendered grid + **filter bar built from `Link` toggles**:
  multi-select genres (OR within group, derived from the current page's results, narrowed
  client-side against `deriveGenres` output), language tags + sort (API params), AND across
  groups. All state lives in the query string (`genre` repeated, `languages` comma list, `sort`,
  `page`). Prev/Next pagination from `count`/`next`/`previous`.
- **Book detail (`/library/[bookId]`)** — a routed page (the newest design replaced the old
  slide-over): cover (real image or warm spine fallback via `coverFor`), genre badges, stats
  (downloads · language · public domain), Gutendex summary, "Translated by …" when non-empty,
  and a reading-mode launcher (Normal reading / Chapter → `/read/{id}?mode=`). Words/est-minutes are intentionally
  omitted (not in Gutendex; don't fetch full text for a grid stat).
- **Reader (`/read/[bookId]?mode=&ch=`)** — numeric Gutenberg id. Two modes, **`full`
  ("Normal reading") is the default**: `full` = whole book with chapter headings, `chapter` =
  one chapter at a time with Previous/Next (`?ch=N`).
  Duration/session-based reading was removed. The Aa panel has size / font / line height only;
  the reader follows the app light/dark theme. Native right-click works (nothing intercepts
  `contextmenu`). On-demand translation was removed (it will be rebuilt as milestone 2).
- **Search (`/search?search=&page=`)** — `SearchResults` → `fetchBooks({ search, page })`; linked
  from the desktop TopNav and the mobile top bar.
- **Settings (`/settings`)** — server page with one real control: Theme (`ThemeSegmented`,
  next-themes). Nothing else is persisted yet.
- **Desktop nav** — sticky top navbar (brand · Home/Library/Search · Settings gear · light/dark
  toggle). Replaced the old left sidebar; hidden on `/read/*` (the reader has its own top bar).
- **Mobile nav** — bottom tab bar (≤`md`) with four equal flat tabs: Home · Library · Read ·
  Profile. No raised primary pill; active tab = accent-soft pill + accent text. "Read" links to
  `/library` for now (the root layout does no data fetching; resume-reading comes with
  milestone 1).

## Design system (non-negotiable)

- **Never pure white / pure black.** Light = ivory `#FAF6EE` on `#2C2A26`; dark = warm near-black
  `#17161B` on off-white `#E9E3D7`. Dark never pairs with black text.
- Fonts: **Fraunces** (display/serif), **Literata** (reading), **Be Vietnam Pro** (UI) — loaded in
  `app/layout.tsx` via `next/font`, all cover Vietnamese diacritics. Never Inter/Roboto/Arial.
- Accent terracotta `#C4663A` (amber `#E0905C` in dark), used sparingly (primary CTA, active nav).
  Secondary accent teal (`accent-2`) for the bilingual/VI panels. Warm soft shadows, 12–16px radii.
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
  `variant="plain"` (home rails) drops the card chrome and chips.

## Milestones (remaining)

1. **Reading-progress persistence** — continue-reading card on home, real "Read" tab resume,
   progress on book detail.
2. **Bilingual EN ↔ VI pipeline** — rebuild from scratch with a reliable translator (DeepL /
   Google Cloud / self-hosted LibreTranslate; the free Google `gtx` endpoint 429s quickly).
   The old select-to-translate code is in git history (e.g. commit `ce2a4c0`).
3. **Categories** — a `/categories` route on `fetchBooks({ topic })` (the old mock page was removed).
4. **Reader stats** — words / est-minutes derived from fetched text length for the reader header.
