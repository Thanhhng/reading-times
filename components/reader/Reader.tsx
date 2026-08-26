"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { AlignJustify, ChevronLeft, List, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import { reader as c } from "@/app/classes/reader";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { AaPanel, type ReaderPrefs } from "./AaPanel";
import type { ReaderMode } from "./ReaderContent";
import { SelectionContextMenu } from "./SelectionContextMenu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const MODES: { id: ReaderMode; label: string; icon: typeof AlignJustify }[] = [
  { id: "full", label: "Full", icon: AlignJustify },
  { id: "chapter", label: "Chapter", icon: List },
];

const FONT_VAR: Record<ReaderPrefs["font"], string> = {
  serif: "var(--font-reading)",
  sans: "var(--font-ui)",
  dyslexic: "var(--font-dyslexic)",
};

export function Reader({
  bookId,
  title,
  mode,
  hasBilingual = false,
  children,
}: {
  bookId: number | string;
  title: string;
  mode: ReaderMode;
  hasBilingual?: boolean;
  children: ReactNode;
}) {
  const [prefs, setPrefs] = useState<ReaderPrefs>({
    size: 19,
    font: "serif",
    leading: 1.75,
    bg: "auto",
    trans: hasBilingual ? "on-tap" : "hidden",
  });
  const setPref = <K extends keyof ReaderPrefs>(key: K, value: ReaderPrefs[K]) =>
    setPrefs((prev) => ({ ...prev, [key]: value }));

  const [showAa, setShowAa] = useState(false);
  const [showBar, setShowBar] = useState(true);
  const [progress, setProgress] = useState(0);
  const lastY = useRef(0);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? Math.round((el.scrollTop / max) * 100) : 0);

    const y = el.scrollTop;
    if (y > lastY.current + 6 && y > 80) setShowBar(false);
    else if (y < lastY.current - 6) setShowBar(true);
    lastY.current = y;
  };

  const onContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (prefs.trans !== "on-tap") return;
    const sentence = (event.target as HTMLElement).closest("[data-sent]");
    if (sentence) sentence.toggleAttribute("data-open");
  };

  const shellStyle = {
    "--reader-font": FONT_VAR[prefs.font],
    "--reader-size": `${prefs.size}px`,
    "--reader-leading": String(prefs.leading),
  } as CSSProperties;

  return (
    <div
      className={c.shell}
      data-reader-bg={prefs.bg === "auto" ? undefined : prefs.bg}
      data-trans={prefs.trans}
      style={shellStyle}
    >
      <div className={c.topbar} data-hidden={showBar ? undefined : ""}>
        <Tooltip>
          <TooltipTrigger
            render={
              <Link href="/" aria-label="Back to home" className={c.toolBtn}>
                <ChevronLeft />
              </Link>
            }
          />
          <TooltipContent>Home</TooltipContent>
        </Tooltip>

        <div className={c.titleWrap}>
          <div className={c.title}>{title}</div>
        </div>

        <div className={c.tools}>
          <div className={c.modeswitch}>
            {MODES.map((m) => {
              const Icon = m.icon;
              const active = m.id === mode;
              return (
                <Tooltip key={m.id}>
                  <TooltipTrigger
                    render={
                      <Link
                        href={`/read/${bookId}?mode=${m.id}`}
                        replace
                        scroll={false}
                        aria-label={m.label}
                        aria-current={active ? "true" : undefined}
                        className={cn(c.modeBtn, active && c.modeBtnActive)}
                      >
                        <Icon />
                      </Link>
                    }
                  />
                  <TooltipContent>{m.label}</TooltipContent>
                </Tooltip>
              );
            })}
          </div>

          <Tooltip>
            <TooltipTrigger
              render={
                <button
                  type="button"
                  aria-label="Text settings"
                  aria-expanded={showAa}
                  className={cn(c.toolBtn, showAa && c.toolBtnActive)}
                  onClick={() => setShowAa((v) => !v)}
                >
                  <Type />
                </button>
              }
            />
            <TooltipContent>Text settings</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger render={<ThemeToggle className={c.toolBtn} />} />
            <TooltipContent>Theme</TooltipContent>
          </Tooltip>
        </div>

        {showAa && (
          <AaPanel
            prefs={prefs}
            setPref={setPref}
            showTranslation={hasBilingual}
            onClose={() => setShowAa(false)}
          />
        )}
      </div>

      <div className={c.scroll} onScroll={onScroll} onClick={onContentClick}>
        {children}
        <SelectionContextMenu />
      </div>

      <div
        className={c.rail}
        role="progressbar"
        aria-label="Reading progress"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className={c.railTrack}>
          <div className={c.railFill} style={{ height: `${progress}%` }} />
        </div>
        <span className={c.railPct} style={{ top: `${progress}%` }}>
          {progress}%
        </span>
      </div>
    </div>
  );
}
