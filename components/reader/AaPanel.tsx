"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { reader as c } from "@/app/classes/reader";

export type ReaderPrefs = {
  size: number;
  font: "serif" | "sans" | "dyslexic";
  leading: number;
  bg: "auto" | "light" | "warm" | "dark";
  trans: "hidden" | "on-tap" | "parallel";
};

type Props = {
  prefs: ReaderPrefs;
  setPref: <K extends keyof ReaderPrefs>(key: K, value: ReaderPrefs[K]) => void;
  showTranslation?: boolean;
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

const BGS: [Exclude<ReaderPrefs["bg"], "auto">, string][] = [
  ["light", "#FAF6EE"],
  ["warm", "#F1E7CF"],
  ["dark", "#17161B"],
];

const TRANSLATIONS: [ReaderPrefs["trans"], string][] = [
  ["hidden", "Hidden"],
  ["on-tap", "On tap"],
  ["parallel", "Parallel"],
];

export function AaPanel({ prefs, setPref, showTranslation = true, onClose }: Props) {
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

      <div className={c.aaRow}>
        <span className={c.aaLabel}>Background</span>
        <div className={c.bgRow}>
          {BGS.map(([value, color]) => (
            <button
              key={value}
              type="button"
              aria-label={value}
              aria-pressed={prefs.bg === value}
              className={cn(c.bgSwatch, prefs.bg === value && c.bgSwatchActive)}
              style={{ background: color }}
              onClick={() => setPref("bg", value)}
            />
          ))}
        </div>
      </div>

      {showTranslation && (
        <div className={c.aaRow}>
          <span className={c.aaLabel}>Translation</span>
          <div className={c.seg}>
            {TRANSLATIONS.map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={cn(c.segBtn, prefs.trans === value && c.segBtnActive)}
                onClick={() => setPref("trans", value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
