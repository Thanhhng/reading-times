"use client";

import { PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
import { BrandGlyph } from "../brand/BrandGlyph";
import { SidebarNav } from "./SidebarNav";
import { sidebar } from "../../_styles/sidebar";

export function DesktopSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <aside
      className={cn(
        sidebar.aside,
        collapsed ? sidebar.asideCollapsed : sidebar.asideExpanded,
      )}
    >
      <div className={cn(sidebar.brand, collapsed && sidebar.brandCollapsed)}>
        {collapsed ? (
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Expand sidebar"
            title="Expand sidebar"
            className="inline-flex rounded-[var(--radius-sm)] transition-colors hover:bg-surface-2"
          >
            <BrandGlyph className={sidebar.glyph} />
          </button>
        ) : (
          <>
            <BrandGlyph className={sidebar.glyph} />
            <div className={sidebar.brandText}>
              <div className={sidebar.name}>Reading Time</div>
              <div className={sidebar.slogan}>
                Turn wasted time into wonderful time
              </div>
            </div>
            <button
              type="button"
              onClick={toggleSidebar}
              aria-label="Collapse sidebar"
              className={sidebar.iconBtn}
            >
              <PanelLeft className="size-[17px]" />
            </button>
          </>
        )}
      </div>

      <SidebarNav collapsed={collapsed} />
    </aside>
  );
}
