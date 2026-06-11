export const library = {
  view: "pt-[var(--space-6)] pb-[var(--space-8)] @sm/main:px-[var(--space-6)]",
  head: "mb-[var(--space-5)]",
  headTitle: "text-[length:var(--text-2xl)]",
  headSub: "mt-[6px] text-[length:var(--text-md)] text-muted-foreground",
  grid: "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  empty: "flex flex-col items-center gap-[var(--space-3)] py-[var(--space-8)] text-center text-[length:var(--text-md)] text-muted-foreground",
  count: "mb-[var(--space-3)] text-[length:var(--text-sm)] text-muted-foreground",
  pager: "mt-[var(--space-6)] flex items-center justify-center gap-[var(--space-3)]",
  pagerInfo: "text-[length:var(--text-sm)] tabular-nums text-muted-foreground",
};

export const filterBar = {
  bar: "mb-[var(--space-5)] flex flex-wrap items-center gap-x-[var(--space-4)] gap-y-[var(--space-3)] rounded-[var(--radius-lg)] border border-border bg-surface p-[var(--space-3)] shadow-[var(--shadow-sm)]",
  group: "flex flex-wrap items-center gap-[6px]",
  label:
    "mr-[2px] text-[length:var(--text-xs)] font-semibold uppercase tracking-[.06em] text-muted-foreground",
  tag: "inline-flex items-center gap-[6px] rounded-[var(--radius-pill)] border px-[12px] py-[5px] text-[length:var(--text-sm)] font-medium transition-colors",
  tagIdle:
    "border-border text-ink hover:border-[var(--border-strong)] hover:bg-surface-2",
  tagActive: "border-accent bg-accent-soft text-accent",
  spacer: "ml-auto",
  seg: "inline-flex gap-[2px] rounded-[var(--radius-md)] bg-surface-2 p-[3px]",
  segBtn:
    "whitespace-nowrap rounded-[var(--radius-sm)] px-[12px] py-[5px] text-[length:var(--text-sm)] font-medium text-muted-foreground transition-colors hover:text-ink",
  segBtnActive: "bg-surface font-semibold text-accent shadow-[var(--shadow-xs)]",
};

export const bookPage = {
  view: "mx-auto w-full min-w-0 max-w-[var(--content-max)] px-[var(--space-4)] pt-[var(--space-5)] pb-[var(--space-8)] @2xl/main:px-[var(--space-6)]",
  back: "mb-[var(--space-4)] inline-flex items-center gap-[4px] text-[length:var(--text-sm)] font-medium text-muted-foreground transition-colors hover:text-ink [&_svg]:size-[16px]",
  layout:
    "grid grid-cols-1 gap-[var(--space-6)] @2xl/main:grid-cols-[280px_minmax(0,1fr)]",
  side: "mx-auto w-full max-w-[280px] @2xl/main:mx-0",
  cover:
    "relative flex aspect-[3/4] w-full flex-col justify-end overflow-hidden rounded-[var(--radius-lg)] bg-[var(--_c1)] p-[18px] shadow-[var(--shadow-md)] after:absolute after:inset-y-0 after:left-0 after:w-[6px] after:bg-black/10 after:content-['']",
  coverImg: "object-cover",
  coverTitle:
    "relative line-clamp-4 font-serif text-[20px] font-semibold leading-[1.15] tracking-[-0.01em] text-[var(--_ct)]",
  coverAuthor: "relative mt-2 font-serif text-[13px] text-[var(--_ct)] opacity-80",
  main: "flex min-w-0 flex-col gap-[var(--space-5)]",
  title: "text-[length:var(--text-2xl)] leading-[1.1]",
  author: "mt-[6px] text-[length:var(--text-md)] text-muted-foreground",
  badges: "mt-[var(--space-3)] flex flex-wrap gap-[6px]",
  stats:
    "flex flex-wrap gap-x-[var(--space-6)] gap-y-[var(--space-3)] rounded-[var(--radius-lg)] border border-border bg-surface p-[var(--space-4)]",
  stat: "flex flex-col gap-[2px] text-[length:var(--text-xs)] text-muted-foreground",
  statValue: "font-serif text-[length:var(--text-lg)] font-semibold text-ink",
  summary:
    "max-w-[68ch] font-serif text-[length:var(--text-md)] leading-[1.65] text-ink",
  translators: "text-[length:var(--text-sm)] italic text-muted-foreground",
  modes: "flex flex-col gap-[var(--space-3)]",
  modeGrid: "grid grid-cols-1 gap-[10px] @sm/main:grid-cols-3",
  modeBtn:
    "flex items-center gap-[10px] rounded-[var(--radius-md)] border border-border bg-surface px-[14px] py-[12px] text-[length:var(--text-sm)] font-medium text-ink transition-colors hover:border-[var(--border-strong)] hover:bg-surface-2 [&_svg]:size-[18px] [&_svg]:text-accent",
  cta: "flex flex-wrap items-center gap-[var(--space-3)]",
};

export const bookCardSkeleton = {
  root: "flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-[var(--shadow-sm)]",
  cover: "aspect-[3/4] w-full animate-pulse bg-muted",
  body: "flex flex-1 flex-col gap-[7px] p-3",
  titleBar: "h-[14px] w-[85%] animate-pulse rounded-[var(--radius-md)] bg-muted",
  titleBar2: "h-[14px] w-[55%] animate-pulse rounded-[var(--radius-md)] bg-muted",
  authorBar: "mt-[2px] h-[11px] w-[40%] animate-pulse rounded-[var(--radius-md)] bg-muted",
  chips: "mt-[2px] flex flex-wrap gap-[6px]",
  chip: "h-[18px] w-[52px] animate-pulse rounded-[var(--radius-pill)] bg-muted",
};
