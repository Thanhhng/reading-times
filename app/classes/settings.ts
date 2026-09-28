export const settings = {
  view: "mx-auto w-full min-w-0 max-w-[var(--content-max)] px-[var(--space-4)] pt-[var(--space-6)] pb-[var(--space-8)] @2xl/main:px-[var(--space-6)] [&>*]:max-w-[760px]",
  head: "mb-[var(--space-5)]",
  headTitle: "text-[length:var(--text-2xl)]",
  headSub: "mt-[6px] text-[length:var(--text-md)] text-muted-foreground",

  group: "mb-[var(--space-5)]",
  card: "mt-[10px] overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface",
  row: "flex flex-col items-start gap-[var(--space-3)] border-b border-border px-[var(--space-5)] py-[var(--space-4)] last:border-b-0 @md/main:flex-row @md/main:items-center @md/main:justify-between @md/main:gap-[var(--space-4)]",
  rowLabel: "flex flex-col gap-[2px]",
  rowLabelTitle: "text-[length:var(--text-base)] font-medium text-ink",
  rowLabelHint: "text-[length:var(--text-xs)] text-muted-foreground",
};

export const segmented = {
  root: "inline-flex max-w-full gap-[2px] rounded-[var(--radius-md)] bg-surface-2 p-[3px]",
  themeLight: "cursor-pointer whitespace-nowrap rounded-[var(--radius-sm)] px-2 py-[6px] text-[length:var(--text-sm)] transition-colors bg-surface font-semibold text-accent shadow-[var(--shadow-xs)] dark:bg-transparent dark:font-medium dark:text-muted-foreground dark:shadow-none @sm/main:px-3",
  themeDark: "cursor-pointer whitespace-nowrap rounded-[var(--radius-sm)] px-2 py-[6px] text-[length:var(--text-sm)] transition-colors bg-transparent font-medium text-muted-foreground dark:bg-surface dark:font-semibold dark:text-accent dark:shadow-[var(--shadow-xs)] @sm/main:px-3",
};
