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
  root: "group flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface text-left shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-hover)]",
  cover:
    "relative flex aspect-[3/4] w-full flex-col justify-end overflow-hidden bg-[var(--_c1)] p-[14px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] after:absolute after:inset-y-0 after:left-0 after:w-[5px] after:bg-black/10 after:content-['']",
  coverImg: "object-cover",
  coverTitle:
    "relative line-clamp-3 font-serif text-[16px] font-semibold leading-[1.15] tracking-[-0.01em] text-[var(--_ct)]",
  coverAuthor: "relative mt-1 font-serif text-[11px] text-[var(--_ct)] opacity-80",
  badges: "absolute right-[10px] top-[10px] z-[1] flex gap-[5px]",
  bilingual:
    "rounded-[var(--radius-pill)] bg-black/35 px-2 py-[3px] text-[10px] font-bold tracking-[0.03em] text-[#FBEEE3] backdrop-blur-[4px]",
  body: "flex flex-1 flex-col gap-[7px] p-3",
  title:
    "line-clamp-2 font-serif text-[length:var(--text-md)] font-semibold leading-[1.2] tracking-[-0.01em] text-ink",
  author: "text-[length:var(--text-sm)] text-muted-foreground",
  chips: "mt-[2px] flex flex-wrap gap-[6px]",
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
