export const topNav = {
  bar: "sticky top-0 z-[var(--z-topbar)] hidden border-b border-border bg-[var(--surface-translucent)] backdrop-blur-[14px] backdrop-saturate-[1.4] md:block",
  inner: "mx-auto flex w-full max-w-[var(--content-max)] items-center gap-[var(--space-6)] px-[var(--space-6)] py-[var(--space-4)]",
  brand: "flex min-w-0 items-center gap-[10px] rounded-[var(--radius-sm)]",
  glyph: "size-[28px] shrink-0 text-accent",
  name: "truncate font-serif text-[length:var(--text-lg)] font-semibold tracking-[-0.01em] text-ink",
  links: "ml-auto flex items-center gap-[var(--space-5)]",
  link: "font-serif text-[length:var(--text-md)] transition-colors hover:text-ink",
  linkActive: "font-semibold text-ink",
  linkIdle: "text-muted-foreground",
  actions: "flex items-center gap-[var(--space-2)]",
  action:
    "inline-flex size-10 items-center justify-center rounded-full bg-surface-2 text-ink transition-colors hover:bg-accent-soft hover:text-accent [&_svg]:size-[18px]",
  actionActive: "bg-accent-soft text-accent",
};
