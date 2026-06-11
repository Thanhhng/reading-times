export const bottomNav = {
  bar: "fixed inset-x-0 bottom-0 z-[var(--z-topbar)] flex items-stretch gap-[2px] border-t border-border bg-[var(--surface-translucent)] px-[6px] pt-[7px] pb-[calc(7px+env(safe-area-inset-bottom,0))] backdrop-blur-[14px] backdrop-saturate-[1.4] md:hidden",

  item: "group/tab flex min-h-[48px] min-w-0 flex-1 flex-col items-center gap-[4px] text-muted-foreground transition-colors [-webkit-tap-highlight-color:transparent]",
  itemIdle:
    "[@media(hover:hover)]:hover:text-ink [@media(hover:hover)]:hover:[&>span:first-child]:bg-surface-2",
  itemActive: "text-accent",

  pill: "relative inline-flex h-[30px] w-[58px] items-center justify-center rounded-[var(--radius-pill)] transition-[background-color,transform] duration-[var(--dur-base)] ease-[var(--ease-soft)] group-active/tab:scale-90",
  pillActive: "bg-accent-soft",

  icon: "inline-flex size-[23px] [&>svg]:size-full",

  label:
    "max-w-full truncate text-[length:var(--text-2xs)] font-medium leading-none tracking-[0.01em]",
  labelActive: "font-semibold",
};
