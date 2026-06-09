# Reading Time — developer guide

**Turn wasted time into wonderful time.** A cozy, warm-editorial bilingual (English ↔ Vietnamese)
feed-scroll reading app: scroll to read, read to learn a language. Books are public-domain
(Project Gutenberg via the Gutendex API) or user-uploaded.

This file is the working dev doc. Two companions hold the deep detail:

- **`docs/product-spec.md`** — the full product spec: sitemap, business flow, auth rules, every
  page, the reading modes + API shapes, the multi-category filter logic, and the data model.
  Read it before building a new feature area.
- **`reading-time-design` skill** (`user-invocable`) — the design system: tokens, fonts, assets,
  illustrations, and UI-kit components. Invoke it for any visual work.

## Stack & commands

- Next.js 16 (App Router, React 19), TypeScript (strict), Tailwind v4, `next/font`.
- `npm run dev` · `npm run build` · `npm run lint`.
- Stack gotchas live in memory ([[reading-time-stack-notes]]): Tailwind v4 needs a **relative**
  `@import`, and `app/design/**` is **reference-only** (not shipped).

## Repo structure

- `app/` — routes. Real pages: `/` (home), `/library`, `/read/[…]`, `/settings`, `/storybook`.
- `app/classes/*.ts` — **Tailwind class objects** (e.g. `bookCard`, `chip`, `home`). Components
  import these instead of inlining long class strings. This is the house pattern — follow it.
- `app/_data/*.ts` — typed data + mappers (`books.ts` local fixtures, `gutendex.ts` types + mapper,
  `gutendex-sample.ts` hardcoded Gutendex sample).
- `components/ui/*` — production primitives (BookCard, GenreChip, Button, ProgressBar, …).
- `components/brand/*` — logo / illustrations as React.
- `app/globals.css` — design tokens (`:root` light, `.dark` dark, reader-bg variants) + base styles.
- `app/design/**` — **reference only**: the design skill's HTML/JSX recreations. Mine for intended
  visuals; never import from it into shipped code.

## Design rules (non-negotiable)

- **Never pure white / pure black.** Light = ivory `#FAF6EE` on `#2C2A26`; dark = warm near-black
  `#17161B` on off-white `#E9E3D7`. Dark never pairs with black text.
- Fonts: **Fraunces** (display/serif), **Literata** (reading), **Be Vietnam Pro** (UI). All cover
  Vietnamese diacritics. Never Inter/Roboto/Arial.
- Accent terracotta `#C4663A` (amber `#E0905C` in dark), used sparingly (primary CTA, active nav).
- Warm soft shadows, 12–16px radii. Tone: sentence case, second-person, no hype. Vietnamese copy is
  fine in UI; bilingual word-pairs use the `↔` glyph.
- Use design tokens via the exposed Tailwind colors (`bg-surface`, `text-ink`, `border-border`,
  `text-muted-foreground`, …). Tokens that aren't exposed as utilities (e.g. `--border-strong`) go
  through arbitrary values: `border-[var(--border-strong)]`. Components stay server components and
  use no comments unless a pragma is required.

## BookCard + Gutendex mapping (current)

`components/ui/BookCard.tsx`:

```ts
type BookCardProps = {
  title: string;
  author?: string;
  genres?: string[];
  cover?: string | null;     // image URL; null → deterministic warm-color spine fallback
  hasBilingual?: boolean;    // default false → shows an "EN · VI" badge on the cover
};
```

It renders a real cover image when `cover` is set, otherwise a warm spine drawn from a deterministic
6-colour palette keyed off the title. Works in both themes. Genre chips are capped to the first 3.

`app/_data/gutendex.ts` owns the Gutendex shape (`GutendexBook`, `GutendexResponse`) and
`toBookCardProps(book)`, which:

- picks the cover from `formats["image/jpeg"]`,
- derives clean genres from `bookshelves` `"Category: …"` entries (falling back to the segment
  before `" -- "` in `subjects`), deduped and capped at 3,
- flips author `"Last, First"` → `"First Last"`,
- leaves `hasBilingual` unset (false) — no Vietnamese translation exists yet.

`/library` maps `sampleBooks.results` through `toBookCardProps`. The sample is hardcoded in
`app/_data/gutendex-sample.ts`; the live API (`https://gutendex.com/books`) is not wired yet.

## Next milestone — live library

1. **Live fetch**: replace `gutendex-sample.ts` with a fetch from `https://gutendex.com/books`
   (params: `languages`, `sort=popular|ascending|descending`, `search`, `topic`, `page`). Keep
   `toBookCardProps` as the boundary; add typed pagination (`count`, `next`, `previous`).
   If switching to `next/image`, add `images.remotePatterns` for `www.gutenberg.org` in `next.config`.
2. **Filter bar** (`docs/product-spec.md` §7): multi-select genres, sort, "bilingual only" — OR
   within a group, AND across groups; reflect state in the query string.
3. **Book Detail panel** (§5.3): right-hand slide-over opened from a card, without leaving `/library`.
