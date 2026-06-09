export const mobileBar = {
  bar: "sticky top-0 z-[var(--z-topbar)] flex items-center gap-[10px] border-b border-border bg-[var(--surface-translucent)] px-[var(--space-4)] py-[10px] backdrop-blur-[14px] backdrop-saturate-[1.4] md:hidden",
  brand: "flex min-w-0 items-center gap-[8px]",
  glyph: "size-[26px] shrink-0 text-accent",
  name: "truncate font-serif text-[length:var(--text-md)] font-semibold tracking-[-0.01em] text-ink",
  actions: "ml-auto flex items-center gap-[2px]",
  action:
    "inline-flex size-9 items-center justify-center rounded-[var(--radius-md)] text-ink transition-colors hover:bg-surface-2 [&_svg]:size-[20px]",
};
