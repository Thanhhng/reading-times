"use client";

import { useState, type ReactNode } from "react";
import { Segmented } from "@/components/ui/Segmented";
import { ThemeSegmented } from "@/components/ui/ThemeSegmented";
import { Switch } from "@/components/ui/Switch";
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
          Your reading preferences. Everything saves locally; sign in to sync
          across devices.
        </p>
      </div>

      <div className={settings.profile}>
        <span className={settings.avatar}>LP</span>
        <div className={settings.profileBody}>
          <div className={settings.pname}>Linh Pham</div>
          <div className={settings.pmail}>
            linh@reading.time · signed in with Google
          </div>
        </div>
        <button type="button" className={settings.manageBtn}>
          Manage account
        </button>
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
              { value: "scroll", label: "Scroll" },
            ]}
          />
        </Row>
      </Group>

      <Group title="Account">
        <Row
          label="Sync across devices"
          hint="Reading position, highlights, vocabulary"
        >
          <Switch checked />
        </Row>
        <Row label="Connected providers">
          <div className={settings.providers}>
            <span className={settings.badge}>
              <span className={settings.badgeDot} />
              Google
            </span>
            <span className={settings.badge}>GitHub</span>
          </div>
        </Row>
        <Row label="Danger zone" hint="Permanently delete your data">
          <button type="button" className={settings.dangerBtn}>
            Delete all data
          </button>
        </Row>
      </Group>
    </div>
  );
}
