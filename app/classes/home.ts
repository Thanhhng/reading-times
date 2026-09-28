export const home = {
  view: "mx-auto w-full min-w-0 max-w-[var(--content-max)] px-[var(--space-4)] pt-[var(--space-6)] pb-[var(--space-8)] @2xl/main:px-[var(--space-6)] @4xl/main:pt-[var(--space-8)]",

  hero: "grid grid-cols-1 items-center gap-[var(--space-7)] @4xl/main:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] @4xl/main:gap-[var(--space-8)]",
  heroTitle:
    "font-serif font-bold leading-[0.95] tracking-[-0.022em] text-ink text-[length:clamp(2.75rem,9cqi,5.75rem)] [font-variation-settings:'opsz'_144,'SOFT'_30] break-words",
  heroText:
    "mt-[var(--space-6)] max-w-[30rem] font-read italic text-[length:var(--text-lg)] leading-[1.6] text-muted-foreground",
  heroCta: "mt-[var(--space-6)] flex flex-wrap items-center gap-x-[var(--space-5)] gap-y-[var(--space-3)]",
  heroLink:
    "rounded-[var(--radius-sm)] font-serif text-[length:var(--text-md)] font-semibold text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline",

  reel: "relative mx-auto w-full max-w-[26rem] rounded-[var(--radius-xl)] border border-border bg-surface p-[var(--space-5)] shadow-[var(--shadow-xl)] @sm/main:p-[var(--space-6)]",
  reelMeta:
    "flex items-center justify-between font-read text-[length:var(--text-xs)] uppercase tracking-[var(--tracking-caps)] text-faint",
  reelTitle: "font-serif text-[length:var(--text-md)] font-semibold leading-[1.25] text-ink",
  reelAuthor: "mt-[2px] font-read text-[length:var(--text-sm)] text-muted-foreground",
  reelPassage:
    "mt-[var(--space-4)] font-read text-[length:var(--text-lg)] leading-[1.65] text-ink",
  reelMark:
    "rounded-[4px] bg-[var(--highlight)] box-decoration-clone px-[3px] text-[var(--highlight-ink)]",
  reelTrans:
    "mt-[var(--space-5)] rounded-[var(--radius-md)] bg-accent-2-soft p-[var(--space-4)] shadow-[var(--shadow-xs)]",
  reelTransLabel:
    "flex items-center gap-[6px] font-read text-[length:var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)] text-accent-2 [&_svg]:size-[15px]",
  reelTransText: "mt-[var(--space-2)] font-read text-[length:var(--text-md)] leading-[1.6] text-ink",
  reelFoot:
    "mt-[var(--space-5)] flex items-center justify-between font-read text-[length:var(--text-sm)] text-muted-foreground",
  reelDots:
    "absolute top-1/2 right-[-18px] hidden -translate-y-1/2 flex-col gap-[6px] @sm/main:flex",
  reelDot: "h-[14px] w-[4px] rounded-[var(--radius-pill)] bg-[var(--border-strong)]",
  reelDotActive: "h-[28px] bg-accent",

  masthead:
    "mt-[var(--space-8)] grid grid-cols-2 gap-x-[var(--space-4)] gap-y-[var(--space-3)] border-t-[4px] border-b border-double border-t-ink border-b-ink py-[var(--space-4)] font-read text-[length:var(--text-xs)] uppercase tracking-[var(--tracking-caps)] text-muted-foreground @3xl/main:flex @3xl/main:items-center @3xl/main:justify-between",

  rail: "mt-[var(--space-8)] flex min-w-0 flex-col gap-[var(--space-5)]",
  railHead: "flex items-baseline justify-between gap-[var(--space-4)]",
  railTitle:
    "font-serif text-[length:var(--text-2xl)] font-semibold tracking-[-0.02em] text-ink @2xl/main:text-[length:var(--text-3xl)]",
  railSeeAll:
    "inline-flex shrink-0 items-center gap-[6px] rounded-[var(--radius-sm)] font-read text-[length:var(--text-base)] text-accent transition-colors hover:text-accent-hover [&_svg]:size-4",
  railScroll:
    "grid min-w-0 snap-x grid-flow-col auto-cols-[148px] gap-[var(--space-5)] overflow-x-auto pb-2 @sm/main:auto-cols-[168px] @4xl/main:grid-flow-row @4xl/main:auto-cols-auto @4xl/main:grid-cols-6 @4xl/main:overflow-visible",
  railItem: "block min-w-0 snap-start rounded-[var(--radius-md)]",
};
