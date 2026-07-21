"use client";

import { useState, type ReactNode } from "react";
import { Segmented } from "@/components/ui/Segmented";
import { ThemeSegmented } from "@/components/ui/ThemeSegmented";
import { settings } from "../classes/settings";

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={settings.group}>
      <div className="rt-eyebrow">{title}</div>
      <div className={settings.card}>{children}</div>
    </section>
  );
}

function Row({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className={settings.row}>
      <div className={settings.rowLabel}>
        <span className={settings.rowLabelTitle}>{label}</span>
        {hint && <small className={settings.rowLabelHint}>{hint}</small>}
      </div>
      <div className="w-full @md/main:w-auto">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const [language, setLanguage] = useState("en");
  const [font, setFont] = useState("serif");
  const [mode, setMode] = useState("full");

  return (
    <div className={settings.view}>
      <div className={settings.head}>
        <h1 className={settings.headTitle}>Settings</h1>
        <p className={settings.headSub}>
          Your reading preferences. Everything saves locally.
        </p>
      </div>

      <Group title="Appearance">
        <Row label="Interface language">
          <Segmented
            value={language}
            onChange={setLanguage}
            options={[
              { value: "en", label: "English" },
              { value: "vi", label: "Tiếng Việt" },
            ]}
          />
        </Row>
        <Row
          label="Theme"
          hint="Light is warm ivory; dark is dim and easy on the eyes"
        >
          <ThemeSegmented />
        </Row>
      </Group>

      <Group title="Reading defaults">
        <Row label="Default font">
          <Segmented
            value={font}
            onChange={setFont}
            options={[
              { value: "serif", label: "Serif" },
              { value: "sans", label: "Sans" },
              { value: "dyslexic", label: "Dyslexic" },
            ]}
          />
        </Row>
        <Row label="Default mode" hint="Normal reading is the default">
          <Segmented
            value={mode}
            onChange={setMode}
            options={[
              { value: "full", label: "Normal" },
              { value: "chapter", label: "Chapter" },
            ]}
          />
        </Row>
      </Group>
    </div>
  );
}
