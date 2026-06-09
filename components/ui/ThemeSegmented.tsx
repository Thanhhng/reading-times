"use client";

import { useTheme } from "next-themes";
import { segmented } from "@/app/classes/settings";

export function ThemeSegmented() {
  const { setTheme } = useTheme();

  return (
    <div className={segmented.root}>
      <button type="button" onClick={() => setTheme("light")} className={segmented.themeLight}>
        Light
      </button>
      <button type="button" onClick={() => setTheme("dark")} className={segmented.themeDark}>
        Dark
      </button>
    </div>
  );
}
