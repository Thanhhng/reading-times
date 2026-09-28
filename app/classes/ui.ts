export const badge = {
  base: "inline-flex items-center gap-[5px] rounded-[var(--radius-pill)] px-[10px] py-[3px] text-[length:var(--text-xs)] font-semibold",
  accent: "bg-accent-soft text-accent",
};

export const bookCard = {
  root: "group flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface text-left shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-hover)]",
  cover:
    "relative flex aspect-[3/4] w-full flex-col justify-end overflow-hidden bg-[var(--_c1)] p-[14px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] after:absolute after:inset-y-0 after:left-0 after:w-[5px] after:bg-black/10 after:content-['']",
  coverImg: "object-cover",
  coverTitle:
    "relative line-clamp-3 font-serif text-[16px] font-semibold leading-[1.15] tracking-[-0.01em] text-[var(--_ct)]",
  coverAuthor: "relative mt-1 font-serif text-[11px] text-[var(--_ct)] opacity-80",
  body: "flex flex-1 flex-col gap-[7px] p-3",
  title:
    "line-clamp-2 font-serif text-[length:var(--text-md)] font-semibold leading-[1.2] tracking-[-0.01em] text-ink",
  author: "text-[length:var(--text-sm)] text-muted-foreground",
  chips: "mt-[2px] flex flex-wrap gap-[6px]",
  plainRoot: "group flex h-full w-full flex-col text-left",
  plainCover:
    "rounded-[var(--radius-sm)] shadow-[var(--shadow-md)] transition-[transform,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-hover)]",
  plainBody: "flex flex-col gap-[4px] pt-[var(--space-3)]",
  plainTitle:
    "line-clamp-2 font-serif text-[length:var(--text-md)] font-semibold leading-[1.25] tracking-[-0.01em] text-ink",
  plainAuthor: "font-read text-[length:var(--text-sm)] text-muted-foreground",
};

export const chip = {
  base: "inline-flex items-center rounded-[var(--radius-pill)] border border-border bg-surface-2 px-[8px] py-[2px] text-[length:var(--text-2xs)] font-medium text-muted-foreground",
};
