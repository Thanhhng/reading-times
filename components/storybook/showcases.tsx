import type { ReactNode } from "react";
import { storybook as s } from "@/app/classes/storybook";

export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={s.section}>
      <h2 className={s.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

const COLORS = [
  { name: "Page", token: "--bg" },
  { name: "Surface", token: "--surface" },
  { name: "Surface 2", token: "--surface-2" },
  { name: "Ink", token: "--text" },
  { name: "Muted", token: "--text-muted" },
  { name: "Faint", token: "--text-faint" },
  { name: "Border", token: "--border" },
  { name: "Border strong", token: "--border-strong" },
  { name: "Accent", token: "--accent" },
  { name: "Accent soft", token: "--accent-soft" },
  { name: "Accent hover", token: "--accent-hover" },
  { name: "Accent ink", token: "--accent-ink" },
  { name: "Teal", token: "--accent-2" },
  { name: "Teal soft", token: "--accent-2-soft" },
  { name: "Highlight", token: "--highlight" },
  { name: "Success", token: "--success" },
  { name: "Warning", token: "--warning" },
  { name: "Danger", token: "--danger" },
];

export function ColorTokens() {
  return (
    <div className={s.grid}>
      {COLORS.map((c) => (
        <div key={c.token} className={s.swatch}>
          <div className={s.swatchBox} style={{ background: `var(${c.token})` }} />
          <div>
            <div className={s.swatchName}>{c.name}</div>
            <div className={s.swatchVar}>{c.token}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

const TYPE = ["4xl", "3xl", "2xl", "xl", "lg", "md", "base", "sm", "xs", "2xs"];

export function TypeTokens() {
  return (
    <div className={s.card}>
      <div className="flex flex-col gap-[var(--space-3)]">
        {TYPE.map((name) => (
          <div key={name} className="flex items-baseline gap-[var(--space-4)]">
            <span className="w-[48px] shrink-0 text-[length:var(--text-2xs)] text-muted-foreground">
              {name}
            </span>
            <span
              className="min-w-0 truncate font-serif text-ink"
              style={{ fontSize: `var(--text-${name})` }}
            >
              Turn wasted time
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const FONTS = [
  { name: "Display — Fraunces", cls: "font-serif" },
  { name: "Reading — Literata", cls: "font-read" },
  { name: "UI — Be Vietnam Pro", cls: "font-sans" },
];

export function FontTokens() {
  return (
    <div className={s.stack}>
      {FONTS.map((f) => (
        <div key={f.cls} className={s.card}>
          <div className={s.subTitle}>{f.name}</div>
          <div className={`${f.cls} text-[length:var(--text-xl)] text-ink`}>
            Turn wasted time into wonderful time.
          </div>
          <div
            className={`${f.cls} mt-1 text-[length:var(--text-md)] text-muted-foreground`}
          >
            Đọc sách song ngữ mỗi ngày, một màn hình thật êm.
          </div>
        </div>
      ))}
    </div>
  );
}

const SPACES = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function SpacingTokens() {
  return (
    <div className={s.card}>
      <div className="flex flex-col gap-[var(--space-3)]">
        {SPACES.map((n) => (
          <div key={n} className="flex items-center gap-[var(--space-4)]">
            <span className="w-[72px] shrink-0 text-[length:var(--text-2xs)] text-muted-foreground">
              space-{n}
            </span>
            <span
              className="h-[12px] shrink-0 rounded-[var(--radius-xs)] bg-accent"
              style={{ width: `var(--space-${n})` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const RADII = ["xs", "sm", "md", "lg", "xl", "pill"];

export function RadiiTokens() {
  return (
    <div className="flex flex-wrap gap-[var(--space-4)]">
      {RADII.map((r) => (
        <div key={r} className="flex flex-col items-center gap-2">
          <div
            className="size-[56px] border border-border bg-surface-2"
            style={{ borderRadius: `var(--radius-${r})` }}
          />
          <span className="text-[length:var(--text-2xs)] text-muted-foreground">
            radius-{r}
          </span>
        </div>
      ))}
    </div>
  );
}

const SHADOWS = ["xs", "sm", "md", "lg", "xl", "hover"];

export function ShadowTokens() {
  return (
    <div className="flex flex-wrap gap-[var(--space-5)]">
      {SHADOWS.map((sh) => (
        <div key={sh} className="flex flex-col items-center gap-2">
          <div
            className="size-[64px] rounded-[var(--radius-md)] bg-surface"
            style={{ boxShadow: `var(--shadow-${sh})` }}
          />
          <span className="text-[length:var(--text-2xs)] text-muted-foreground">
            shadow-{sh}
          </span>
        </div>
      ))}
    </div>
  );
}
