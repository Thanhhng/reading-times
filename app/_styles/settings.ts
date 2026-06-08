export const settings = {
  view: "mx-auto max-w-[760px] px-[var(--space-6)] pt-[var(--space-6)] pb-[var(--space-8)]",
  head: "mb-[var(--space-5)]",
  headTitle: "text-[length:var(--text-2xl)]",
  headSub: "mt-[6px] text-[length:var(--text-md)] text-muted-foreground",

  profile: "mb-[var(--space-6)] flex items-center gap-[var(--space-4)] rounded-[var(--radius-lg)] border border-border bg-surface px-[var(--space-5)] py-[var(--space-4)] shadow-[var(--shadow-sm)]",
  avatar: "flex size-[56px] shrink-0 items-center justify-center rounded-full bg-accent-soft font-serif text-[length:var(--text-lg)] font-semibold text-accent",
  profileBody: "flex-1",
  pname: "font-serif text-[length:var(--text-lg)] font-semibold text-ink",
  pmail: "text-[length:var(--text-sm)] text-muted-foreground",

  group: "mb-[var(--space-5)]",
  card: "mt-[10px] overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface",
  row: "flex items-center justify-between gap-[var(--space-4)] border-b border-border px-[var(--space-5)] py-[var(--space-4)] last:border-b-0",
  rowLabel: "flex flex-col gap-[2px]",
  rowLabelTitle: "text-[length:var(--text-base)] font-medium text-ink",
  rowLabelHint: "text-[length:var(--text-xs)] text-muted-foreground",

  wpm: "flex items-center gap-3",
  wpmInput: "accent-[var(--accent)]",
  wpmValue: "min-w-[64px] text-right text-[length:var(--text-sm)] tabular-nums text-ink",

  providers: "flex gap-2",
  badge: "inline-flex items-center gap-[5px] rounded-[var(--radius-pill)] border border-border bg-surface-2 px-[10px] py-[3px] text-[length:var(--text-xs)] font-medium text-muted-foreground",
  badgeDot: "size-[7px] rounded-full bg-accent-2",

  manageBtn: "rounded-[var(--radius-md)] border border-border-strong bg-surface px-[14px] py-[8px] text-[length:var(--text-sm)] font-semibold text-ink transition-colors hover:bg-surface-2",
  dangerBtn: "rounded-[var(--radius-md)] bg-[var(--danger-soft)] px-[14px] py-[8px] text-[length:var(--text-sm)] font-semibold text-danger transition-colors hover:brightness-95",
};

export const segmented = {
  root: "inline-flex gap-[2px] rounded-[var(--radius-md)] bg-surface-2 p-[3px]",
  button: "cursor-pointer whitespace-nowrap rounded-[var(--radius-sm)] px-3 py-[6px] text-[length:var(--text-sm)] font-medium text-muted-foreground transition-colors data-[active]:bg-surface data-[active]:font-semibold data-[active]:text-accent data-[active]:shadow-[var(--shadow-xs)]",
  themeLight: "cursor-pointer whitespace-nowrap rounded-[var(--radius-sm)] px-3 py-[6px] text-[length:var(--text-sm)] transition-colors bg-surface font-semibold text-accent shadow-[var(--shadow-xs)] dark:bg-transparent dark:font-medium dark:text-muted-foreground dark:shadow-none",
  themeDark: "cursor-pointer whitespace-nowrap rounded-[var(--radius-sm)] px-3 py-[6px] text-[length:var(--text-sm)] transition-colors bg-transparent font-medium text-muted-foreground dark:bg-surface dark:font-semibold dark:text-accent dark:shadow-[var(--shadow-xs)]",
};

export const toggleSwitch = {
  root: "group inline-flex h-[24px] w-[42px] cursor-pointer items-center rounded-full bg-surface-2 p-[3px] transition-colors data-[checked]:bg-accent",
  knob: "size-[18px] rounded-full bg-surface shadow-[var(--shadow-xs)] transition-transform group-data-[checked]:translate-x-[18px]",
};
