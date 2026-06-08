export const button = {
  base: "inline-flex items-center justify-center gap-2 font-sans font-semibold rounded-[var(--radius-md)] cursor-pointer whitespace-nowrap transition-colors",
  primary: "bg-accent text-accent-ink hover:bg-accent-hover shadow-[var(--shadow-sm)]",
  ghost: "bg-transparent text-ink hover:bg-surface-2",
  md: "text-[length:var(--text-base)] px-[var(--space-4)] py-[10px]",
  lg: "text-[length:var(--text-md)] px-[22px] py-[13px]",
  icon: "inline-flex w-[18px] h-[18px] shrink-0 [&>svg]:w-full [&>svg]:h-full",
};

export const bookCard = {
  root: "group flex flex-col gap-[10px] text-left",
  cover:
    "relative flex aspect-[3/4] items-end overflow-hidden rounded-[var(--radius-md)] bg-accent p-3 shadow-[var(--shadow-sm)] transition-transform duration-[var(--dur-base)] group-hover:-translate-y-[3px]",
  coverTitle: "font-serif font-semibold text-[13px] leading-[1.15] text-[#FBEEE3]",
  body: "flex flex-col gap-[3px]",
  title: "font-serif font-semibold text-[length:var(--text-base)] leading-[1.2] text-ink",
  author: "text-[length:var(--text-xs)] text-muted-foreground",
  chips: "mt-[2px] flex flex-wrap gap-[6px]",
  meta: "mt-[2px] flex items-center gap-[6px] text-[length:var(--text-xs)] text-faint",
};

export const chip = {
  base: "inline-flex items-center rounded-[var(--radius-pill)] border border-border bg-surface-2 px-[8px] py-[2px] text-[length:var(--text-2xs)] font-medium text-muted-foreground",
  bilingual:
    "inline-flex items-center gap-[4px] rounded-[var(--radius-pill)] bg-accent-2-soft px-[8px] py-[2px] text-[length:var(--text-2xs)] font-semibold text-accent-2",
};

export const progress = {
  track: "h-[6px] w-full overflow-hidden rounded-[var(--radius-pill)] bg-surface-2",
  fill: "h-full rounded-[var(--radius-pill)] bg-accent",
  caption: "mt-[6px] text-[length:var(--text-xs)] text-muted-foreground",
};
