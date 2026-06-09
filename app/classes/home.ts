export const home = {
  view: "mx-auto w-full min-w-0 max-w-[var(--content-max)] px-[var(--space-4)] pt-[var(--space-6)] pb-[var(--space-8)] @2xl/main:px-[var(--space-6)]",

  hero: "mb-[var(--space-6)] grid grid-cols-1 items-center gap-[var(--space-5)] overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface bg-[linear-gradient(180deg,var(--accent-soft),transparent_80%)] p-[var(--space-5)] @2xl/main:grid-cols-[1.2fr_1fr] @2xl/main:gap-[var(--space-6)] @2xl/main:p-[var(--space-7)]",
  heroEyebrow: "text-[length:var(--text-xs)] font-semibold uppercase tracking-[.06em] text-accent",
  heroTitle: "mt-3 mb-2 leading-[1.05] text-[length:clamp(1.75rem,5cqi,2.75rem)] [text-wrap:balance] break-words",
  heroText: "mb-[var(--space-5)] font-serif italic text-[length:var(--text-lg)] text-muted-foreground",
  heroCta: "flex flex-wrap items-center gap-2 @sm/main:gap-3",
  heroArt: "hidden justify-center text-ink @2xl/main:flex",

  rail: "mb-[var(--space-6)] flex min-w-0 flex-col gap-[var(--space-3)]",
  railHead: "flex items-baseline justify-between",
  railTitle: "text-[length:var(--text-xl)]",
  railSeeAll: "text-[length:var(--text-xs)] font-semibold uppercase tracking-[.08em] text-muted-foreground",
  railScroll: "grid min-w-0 snap-x grid-flow-col auto-cols-[160px] gap-[var(--space-4)] overflow-x-auto pb-2 @sm/main:auto-cols-[184px]",

  continueCard: "flex flex-wrap items-center gap-[var(--space-4)] rounded-[var(--radius-lg)] border border-border bg-surface p-[var(--space-4)] shadow-[var(--shadow-sm)]",
  continueCover: "flex aspect-[3/4] w-[64px] shrink-0 items-end rounded-[var(--radius-sm)] bg-accent p-2 shadow-[var(--shadow-sm)] @sm/main:w-[70px]",
  continueCoverTitle: "font-serif font-semibold text-[11px] leading-[1.1] text-[#FBEEE3]",
  continueBody: "flex min-w-0 flex-1 flex-col gap-2",
  continueTitle: "font-serif font-semibold text-[length:var(--text-lg)]",
  continueMeta: "text-[length:var(--text-sm)] text-muted-foreground",
};
