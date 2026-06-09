export const iconButton = {
  base: "inline-flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] text-[length:var(--text-sm)] font-semibold transition-colors [&_svg]:size-[18px]",
  outline: "border border-border bg-surface text-ink hover:bg-surface-2",
  ghost: "text-ink hover:bg-surface-2",
  soft: "bg-accent-soft text-accent hover:brightness-95",
};

export const badge = {
  base: "inline-flex items-center gap-[5px] rounded-[var(--radius-pill)] px-[10px] py-[3px] text-[length:var(--text-xs)] font-semibold",
  accent: "bg-accent-soft text-accent",
  teal: "bg-accent-2-soft text-accent-2",
  success: "bg-[var(--success-soft)] text-success",
  neutral: "bg-surface-2 text-muted-foreground",
  dot: "size-[7px] shrink-0 rounded-full bg-current",
};

export const tag = {
  base: "inline-flex items-center gap-[6px] rounded-[var(--radius-pill)] border px-[12px] py-[5px] text-[length:var(--text-sm)] font-medium [&_svg]:size-[15px]",
  accent: "border-accent text-accent",
  neutral: "border-border text-ink",
  count: "font-semibold text-muted-foreground",
};

export const avatar = {
  base: "inline-flex shrink-0 items-center justify-center rounded-full font-serif font-semibold",
  accent: "bg-accent-soft text-accent",
  teal: "bg-accent-2-soft text-accent-2",
  sm: "size-8 text-[length:var(--text-xs)]",
  md: "size-10 text-[length:var(--text-sm)]",
  lg: "size-[56px] text-[length:var(--text-lg)]",
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
