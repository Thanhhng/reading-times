export const sidebar = {
  aside: "sticky top-0 hidden h-svh shrink-0 flex-col gap-[var(--space-3)] border-r border-border bg-surface py-[var(--space-4)] transition-[width] duration-[var(--dur-base)] ease-[var(--ease-soft)] md:flex",
  asideExpanded: "w-[var(--sidebar-w)] px-[var(--space-3)]",
  asideCollapsed: "w-[var(--sidebar-collapsed)] px-[10px]",

  brand: "flex items-center gap-[10px] px-[6px] pt-[6px] pb-[10px]",
  brandCollapsed: "justify-center px-0",
  glyph: "size-[30px] shrink-0 text-accent",
  brandText: "min-w-0 flex-1",
  name: "font-serif text-[17px] font-semibold leading-none tracking-[-0.01em] text-ink",
  slogan: "mt-[3px] font-serif text-[10.5px] italic leading-[1.2] text-muted-foreground",
  iconBtn: "inline-flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-faint transition-colors hover:bg-surface-2 hover:text-ink",

  nav: "flex flex-1 flex-col gap-[3px] overflow-y-auto overflow-x-hidden",
  group: "flex flex-col gap-[3px]",

  item: "flex items-center gap-[12px] rounded-[var(--radius-md)] px-[12px] py-[9px] text-[length:var(--text-base)] font-medium text-ink transition-colors hover:bg-surface-2",
  itemActive: "bg-accent-soft text-accent hover:bg-accent-soft",
  itemCollapsed: "justify-center px-0",
  itemIcon: "inline-flex size-[18px] shrink-0 [&>svg]:size-full",
  itemLabel: "min-w-0 flex-1 truncate",
  badge: "rounded-[6px] border border-border bg-surface px-[6px] py-[1px] text-[length:var(--text-2xs)] font-semibold text-muted-foreground",

  foot: "flex shrink-0 flex-col gap-2 pt-[var(--space-2)]",
};
