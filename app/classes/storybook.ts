export const storybook = {
  view: "mx-auto w-full min-w-0 max-w-[var(--content-max)] px-[var(--space-4)] pt-[var(--space-6)] pb-[var(--space-8)] @sm/main:px-[var(--space-6)]",
  head: "mb-[var(--space-6)]",
  headTitle: "text-[length:var(--text-2xl)]",
  headSub: "mt-[6px] text-[length:var(--text-md)] text-muted-foreground",

  section: "mb-[var(--space-7)]",
  sectionTitle: "mb-[var(--space-4)] text-[length:var(--text-xl)]",
  subTitle: "mb-[var(--space-2)] text-[length:var(--text-xs)] font-semibold uppercase tracking-[.08em] text-muted-foreground",

  card: "rounded-[var(--radius-lg)] border border-border bg-surface p-[var(--space-5)]",
  row: "flex flex-wrap items-center gap-[var(--space-4)]",
  stack: "flex flex-col gap-[var(--space-4)]",

  grid: "grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-[var(--space-4)]",
  swatch: "flex flex-col gap-2",
  swatchBox: "h-[64px] w-full rounded-[var(--radius-md)] border border-border",
  swatchName: "text-[length:var(--text-sm)] font-medium text-ink",
  swatchVar: "text-[length:var(--text-2xs)] text-muted-foreground",
};
