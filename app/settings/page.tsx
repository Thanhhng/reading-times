import { ThemeSegmented } from "@/components/ui/ThemeSegmented";
import { settings } from "../classes/settings";

export default function SettingsPage() {
  return (
    <div className={settings.view}>
      <div className={settings.head}>
        <h1 className={settings.headTitle}>Settings</h1>
        <p className={settings.headSub}>Choose how Reading Time looks on this device.</p>
      </div>

      <section className={settings.group}>
        <div className="rt-eyebrow">Appearance</div>
        <div className={settings.card}>
          <div className={settings.row}>
            <div className={settings.rowLabel}>
              <span className={settings.rowLabelTitle}>Theme</span>
              <small className={settings.rowLabelHint}>
                Light is warm ivory; dark is dim and easy on the eyes
              </small>
            </div>
            <div className="w-full @md/main:w-auto">
              <ThemeSegmented />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
