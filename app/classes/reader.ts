export const reader = {
  shell:
    "fixed inset-0 z-[100] flex flex-col bg-[var(--reader-bg)] text-[var(--reader-text)] transition-colors duration-[var(--dur-base)] ease-[var(--ease-soft)]",

  topbar:
    "relative z-[5] flex items-center gap-[14px] border-b border-[var(--reader-rule)] bg-[color-mix(in_srgb,var(--reader-bg)_86%,transparent)] px-[18px] py-[10px] backdrop-blur-[10px] transition-[transform,opacity] duration-[var(--dur-base)] ease-[var(--ease-soft)] data-[hidden]:-translate-y-full data-[hidden]:opacity-0",

  toolBtn:
    "inline-flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] text-[var(--reader-text)] transition-colors hover:bg-[color-mix(in_srgb,var(--reader-text)_8%,transparent)] [&_svg]:size-[19px]",
  toolBtnActive: "bg-[color-mix(in_srgb,var(--reader-text)_8%,transparent)] text-accent",

  titleWrap: "min-w-0 flex-1",
  title: "truncate font-serif text-[length:var(--text-md)] font-semibold",

  tools: "flex items-center gap-[6px]",

  modeswitch:
    "mr-[4px] flex gap-[2px] rounded-[var(--radius-md)] bg-[color-mix(in_srgb,var(--reader-text)_8%,transparent)] p-[2px]",
  modeBtn:
    "inline-flex size-8 items-center justify-center rounded-[var(--radius-sm)] text-[color-mix(in_srgb,var(--reader-text)_58%,transparent)] transition-colors hover:text-[var(--reader-text)] [&_svg]:size-[16px]",
  modeBtnActive: "bg-[var(--reader-bg)] text-accent shadow-[var(--shadow-xs)]",

  scroll: "flex-1 overflow-y-auto scroll-smooth [scrollbar-gutter:stable]",
  col: "mx-auto max-w-[var(--reader-max)] px-[var(--space-5)] pt-[var(--space-7)] pb-[30vh]",
  chapterTitle:
    "mb-[var(--space-5)] font-serif text-[length:var(--text-2xl)] font-semibold text-[var(--reader-text)]",
  para:
    "text-[length:var(--reader-size)] leading-[var(--reader-leading)] text-[var(--reader-text)] [font-family:var(--reader-font)]",
  paraGap: "mb-[1em] last:mb-0",
  chapterNav: "mt-[var(--space-7)] flex items-center justify-between gap-[var(--space-3)]",
  chapterNavBtn:
    "inline-flex items-center gap-[6px] rounded-[var(--radius-md)] border border-[var(--reader-rule)] px-[14px] py-[8px] font-sans text-[length:var(--text-sm)] font-medium text-[var(--reader-text)] transition-colors hover:bg-[color-mix(in_srgb,var(--reader-text)_8%,transparent)] [&_svg]:size-4",
  screenFoot:
    "mt-[var(--space-3)] font-sans text-[length:var(--text-xs)] tabular-nums text-faint",

  rail: "pointer-events-none fixed right-[12px] top-1/2 z-[6] h-[44vh] -translate-y-1/2",
  railTrack:
    "relative h-full w-[5px] overflow-hidden rounded-[var(--radius-pill)] bg-[color-mix(in_srgb,var(--reader-text)_14%,transparent)]",
  railFill:
    "absolute inset-x-0 top-0 rounded-[var(--radius-pill)] bg-accent transition-[height] duration-[var(--dur-base)] ease-[var(--ease-soft)]",
  railPct:
    "absolute right-[14px] hidden -translate-y-1/2 rounded-[var(--radius-pill)] bg-[var(--surface)] px-[7px] py-[2px] text-[length:var(--text-2xs)] font-semibold tabular-nums text-accent shadow-[var(--shadow-sm)] md:block",

  aa: "absolute right-[16px] top-[calc(100%+8px)] z-[20] w-[320px] rounded-[var(--radius-lg)] border border-border bg-surface p-[var(--space-4)] text-ink shadow-[var(--shadow-xl)]",
  aaHead:
    "mb-[var(--space-3)] flex items-center justify-between text-[length:var(--text-md)] font-semibold",
  aaClose:
    "inline-flex size-[26px] items-center justify-center rounded-[var(--radius-sm)] text-muted-foreground transition-colors hover:bg-surface-2 [&_svg]:size-4",
  aaRow: "flex items-center justify-between gap-[12px] py-[8px]",
  aaLabel: "shrink-0 text-[length:var(--text-sm)] text-muted-foreground",
  aaSize: "flex items-center gap-[10px]",
  aaSizeBtn:
    "inline-flex size-[30px] items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-strong)] bg-surface font-semibold text-ink transition-colors hover:bg-surface-2",
  aaSizeVal: "min-w-[36px] text-center text-[length:var(--text-sm)] tabular-nums text-ink",

  seg: "inline-flex gap-[2px] rounded-[var(--radius-md)] bg-surface-2 p-[3px]",
  segBtn:
    "whitespace-nowrap rounded-[var(--radius-sm)] px-[12px] py-[6px] text-[length:var(--text-sm)] font-medium text-muted-foreground transition-colors hover:text-ink",
  segBtnActive: "bg-surface text-accent font-semibold shadow-[var(--shadow-xs)]",

  bgRow: "flex gap-[8px]",
  bgSwatch:
    "size-[30px] rounded-[var(--radius-sm)] border-2 border-[var(--border-strong)] transition-shadow",
  bgSwatchActive: "border-accent shadow-[0_0_0_2px_var(--accent-soft)]",

  transPopup:
    "z-[30] rounded-[var(--radius-pill)] border border-border bg-surface shadow-[var(--shadow-lg)] animate-in fade-in-0 zoom-in-95 duration-150",
  transPopupBtn:
    "inline-flex items-center gap-[6px] rounded-[var(--radius-pill)] px-[12px] py-[6px] font-sans text-[length:var(--text-sm)] font-semibold text-accent transition-colors hover:bg-accent-soft [&_svg]:size-[15px]",
  transBlock:
    "mb-[1em] border-l-2 border-accent-soft pl-[12px] text-[length:calc(var(--reader-size)*0.95)] italic leading-[var(--lh-normal)] text-accent [font-family:var(--reader-font)]",
  transLoading:
    "mb-[1em] border-l-2 border-accent-soft pl-[12px] font-sans text-[length:var(--text-sm)] italic text-muted-foreground",
  transError:
    "mb-[1em] border-l-2 border-danger pl-[12px] font-sans text-[length:var(--text-sm)] text-danger",
  transRetry:
    "font-semibold text-accent underline underline-offset-2 transition-colors hover:text-accent-hover",
};
