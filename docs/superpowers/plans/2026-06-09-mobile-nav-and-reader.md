# Mobile Nav + Reader Implementation Plan

> **For agentic workers:** Steps use checkbox (`- [ ]`) syntax. There is **no test runner** in this repo (no jest/vitest/playwright in `package.json`), and the work is visual/server-component frontend. "Verification" therefore means: `npx tsc --noEmit` passes, `npm run build` succeeds, `npm run lint` is clean, and a visual check in `npm run dev` against `app/design/ui_kits/reading-time/` + `~/Downloads/mobile.html`. Do **not** invent a test framework.

**Goal:** Replace the mobile hamburger nav with the design's bottom tab bar + brand top bar, and build the full-screen Reader (Full / Chapter / Scroll modes, vertical progress, no Ask-AI) — responsive, light+dark, server-component-first, token-driven, no dead code left behind.

**Architecture:** Next 16 App Router + Tailwind v4 + shadcn/base-ui. Class strings live in `app/classes/*.ts`; design tokens in `app/globals.css` (mirrors `app/design/tokens`). Chrome (sidebar / top bar / bottom nav) lives in a layout; the Reader renders full-screen with no chrome via an App Router **route group**. Interactive bits are small client islands; heavy text content is server-rendered.

**Tech Stack:** next@16, react@19, tailwindcss@4, next-themes, lucide-react, class-variance-authority, tailwind-merge.

**Design sources (read-only):**
- `app/design/components/reading/BottomNav.{jsx,d.ts,prompt.md}` — bottom tab bar primitive (Home · Library · Read[primary] · Profile).
- `app/design/ui_kits/reading-time/app.jsx` — `MobileTopBar` (brand + search + theme, **no hamburger**), `MobileBottomNav`, responsive ≤720px switch.
- `app/design/ui_kits/reading-time/ReaderView.jsx` — reader shell, modes, Aa panel, bilingual sentence, progress.

---

## Sub-project A — Mobile navigation refactor (this is built first)

Replace `MobileHeader` (hamburger) + `MobileSidebar` (slide-in Sheet) with `MobileTopBar` (brand + search + theme toggle) and `MobileBottomNav` (4 tabs). Desktop sidebar unchanged.

**Files:**
- Create: `app/classes/bottomNav.ts` — bottom-nav class strings (port of `.rt-bottomnav*`).
- Create: `app/classes/mobileBar.ts` — mobile top-bar class strings (port of `.rt-mobilebar*`).
- Create: `components/layout/ThemeToggle.tsx` — `"use client"` sun/moon toggle island (next-themes).
- Create: `components/layout/MobileTopBar.tsx` — server component; brand → `/`, search → `/search`, `<ThemeToggle/>`.
- Create: `components/layout/MobileBottomNav.tsx` — `"use client"`; `usePathname` active state; tabs from data.
- Modify: `app/_data/nav.ts` — add `BottomNavTab` type + `bottomNavTabs` (Read tab href derived from the in-progress book).
- Modify: `app/layout.tsx` — swap `MobileHeader`/`MobileSidebar` → `MobileTopBar`/`MobileBottomNav`; pad `<main>` bottom on mobile to clear the fixed bar.
- Modify: `app/classes/sidebar.ts` — drop the now-unused `sheet` key.
- Delete: `components/layout/MobileHeader.tsx`, `components/layout/MobileSidebar.tsx`.

**Decisions (no hardcoding):**
- Tabs: **Home · Library · Read(primary) · Profile** — exactly the design's set. Search is *not* a tab (lives in the top bar / ⌘K). Vocabulary/Highlights stay off the bar (they're profile data).
- Active map: `/`→home, `/library*`→library, `/read*`→read, `/settings*`→profile.
- Read tab href = the continue book: `books.find(b => b.progress) ?? books[0]` → `/read/<id>` (resolves once Sub-project B lands).
- Breakpoint: keep `md` (768px), matching the existing `md:flex` desktop sidebar.
- `sheet.tsx` is **kept** (shadcn `components/ui/sidebar.tsx` depends on it) — verify with grep before assuming otherwise.

- [ ] **A1** Create `app/classes/bottomNav.ts` and `app/classes/mobileBar.ts`.
- [ ] **A2** Create `ThemeToggle.tsx`, `MobileTopBar.tsx`, `MobileBottomNav.tsx`.
- [ ] **A3** Add `bottomNavTabs` to `app/_data/nav.ts`.
- [ ] **A4** Rewire `app/layout.tsx`; remove the `sheet` key from `app/classes/sidebar.ts`.
- [ ] **A5** Delete `MobileHeader.tsx` + `MobileSidebar.tsx`; grep to confirm no other importers.
- [ ] **A6** Verify: `npx tsc --noEmit` + `npm run build` + `npm run lint` clean.

---

## Sub-project B — Reader (`/read/[bookId]`)

Full-screen reader, no app chrome, server-rendered content with small client islands.

**Files:**
- Create: `app/(app)/layout.tsx` — move the chrome (SidebarProvider + DesktopSidebar + MobileTopBar + main + MobileBottomNav) here.
- Move: `app/page.tsx`, `app/settings/`, `app/storybook/` → under `app/(app)/` (URLs unchanged; fix relative imports to `@/app/...`).
- Slim: `app/layout.tsx` → `<html><body><ThemeProvider>{children}</ThemeProvider>` + fonts only.
- Create: `app/read/[bookId]/page.tsx` — server component; resolves book + sentences; reads `?mode=full|chapter|scroll` (default `full`); renders layout server-side.
- Create: `app/_data/sentences.ts` — sample bilingual sentence data (id/src/tgt/words) keyed by bookId.
- Create: `app/classes/reader.ts` — reader class strings (port of `.rt-reader*`).
- Create: `components/reader/ReaderTopBar.tsx` — `"use client"`; back, title, mode switch (Full/Chapter/Scroll via `?mode=`), Aa toggle, theme; auto-hides on scroll.
- Create: `components/reader/AaPanel.tsx` — `"use client"`; size/font/line-height/background/translation prefs.
- Create: `components/reader/ReadingProgress.tsx` — `"use client"`; **vertical** progress rail showing % scrolled.
- Create: `components/reader/BilingualSentence.tsx` — server-rendered src + tgt; reveal mode via container `data-trans` + delegated client handler.

**Decisions:**
- Modes = **Full (default) · Chapter · Scroll** — `sections`/"By duration" is removed entirely (no session picker, no `Clock` mode button).
- Mode is a URL search param so the server renders the correct layout (server-component-first, light JS).
- **No "Hỏi AI về đoạn này"** button — the `rt-reader__askwrap` block and `onAskAI` are dropped.
- Vertical progress: fixed rail (right edge on desktop, hidden behind safe gutter on mobile) driven by scroll position; replaces the top-bar horizontal bar as the primary indicator (a thin top-bar bar may remain as secondary).

- [ ] **B1** Route-group refactor: create `app/(app)/layout.tsx`, move pages, slim root layout. Verify build + URLs.
- [ ] **B2** `app/_data/sentences.ts` + `app/classes/reader.ts`.
- [ ] **B3** `BilingualSentence.tsx` + server `page.tsx` rendering Full/Chapter/Scroll from `?mode=`.
- [ ] **B4** `ReaderTopBar.tsx` (mode switch + Aa + theme + auto-hide), `AaPanel.tsx`.
- [ ] **B5** `ReadingProgress.tsx` vertical rail.
- [ ] **B6** Wire the bottom-nav Read tab + Home "Continue reading" CTA to the reader.
- [ ] **B7** Verify: `npx tsc --noEmit` + `npm run build` + `npm run lint` + visual check light/dark, mobile/desktop.

---

## Cleanup pass (after A + B)

- [ ] Grep for orphaned imports/classes: `MobileHeader`, `MobileSidebar`, `sidebar.sheet`, `sections`, `By duration`, `askwrap`, `onAskAI`, `Clock` mode.
- [ ] Remove any `app/classes` keys no longer referenced.
- [ ] Confirm no `useSidebar().openMobile`/`setOpenMobile` usages remain.
- [ ] `npm run lint` clean (no unused vars/imports).
