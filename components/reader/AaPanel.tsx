"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { reader as c } from "@/app/classes/reader";

export type ReaderPrefs = {
  size: number;
  font: "serif" | "sans" | "dyslexic";
  leading: number;
};

type Props = {
  prefs: ReaderPrefs;
  setPref: <K extends keyof ReaderPrefs>(key: K, value: ReaderPrefs[K]) => void;
  onClose: () => void;
};

const FONTS: [ReaderPrefs["font"], string][] = [
  ["serif", "Serif"],
  ["sans", "Sans"],
  ["dyslexic", "Readable"],
];

const LEADINGS: [number, string][] = [
  [1.5, "Tight"],
  [1.75, "Normal"],
  [2, "Loose"],
];

export function AaPanel({ prefs, setPref, onClose }: Props) {
  return (
    <div className={c.aa}>
      <div className={c.aaHead}>
        <span>Text settings</span>
        <button type="button" className={c.aaClose} onClick={onClose} aria-label="Close">
          <X />
        </button>
      </div>

      <div className={c.aaRow}>
        <span className={c.aaLabel}>Size</span>
        <div className={c.aaSize}>
          <button
            type="button"
            className={c.aaSizeBtn}
            aria-label="Decrease text size"
            onClick={() => setPref("size", Math.max(14, prefs.size - 1))}
          >
            A−
          </button>
          <span className={c.aaSizeVal}>{prefs.size}px</span>
          <button
            type="button"
            className={c.aaSizeBtn}
            aria-label="Increase text size"
            onClick={() => setPref("size", Math.min(24, prefs.size + 1))}
          >
            A+
          </button>
        </div>
      </div>

      <div className={c.aaRow}>
        <span className={c.aaLabel}>Font</span>
        <div className={c.seg}>
          {FONTS.map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={cn(c.segBtn, prefs.font === value && c.segBtnActive)}
              onClick={() => setPref("font", value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className={c.aaRow}>
        <span className={c.aaLabel}>Line height</span>
        <div className={c.seg}>
          {LEADINGS.map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={cn(c.segBtn, prefs.leading === value && c.segBtnActive)}
              onClick={() => setPref("leading", value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
