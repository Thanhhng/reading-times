"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, LayoutGrid, Lock, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { sidebar } from "@/app/classes/sidebar";
import { gatedNav, mainNav, type NavItem } from "@/app/_data/nav";

type SidebarNavProps = {
  collapsed?: boolean;
  onNavigate?: () => void;
};

function NavLink({
  item,
  collapsed,
  active,
  onNavigate,
}: {
  item: NavItem;
  collapsed: boolean;
  active: boolean;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      title={collapsed ? item.title : undefined}
      aria-current={active ? "page" : undefined}
      className={cn(
        sidebar.item,
        active && sidebar.itemActive,
        collapsed && sidebar.itemCollapsed,
      )}
    >
      <span className={sidebar.itemIcon}>
        <Icon />
      </span>
      {!collapsed && <span className={sidebar.itemLabel}>{item.title}</span>}
      {!collapsed && item.badge && (
        <span className={sidebar.badge}>{item.badge}</span>
      )}
      {!collapsed && item.locked && (
        <span className={sidebar.lock}>
          <Lock />
        </span>
      )}
    </Link>
  );
}

export function SidebarNav({ collapsed = false, onNavigate }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <>
      <nav className={sidebar.nav}>
        <div className={sidebar.group}>
          {mainNav.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              collapsed={collapsed}
              active={pathname === item.href}
              onNavigate={onNavigate}
            />
          ))}
        </div>
        <div className={sidebar.sep} />
        <div className={sidebar.group}>
          {gatedNav.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              collapsed={collapsed}
              active={pathname === item.href}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </nav>

      <div className={sidebar.foot}>
        <Link
          href="/storybook"
          onClick={onNavigate}
          title={collapsed ? "Storybook" : undefined}
          aria-current={pathname === "/storybook" ? "page" : undefined}
          className={cn(
            sidebar.item,
            pathname === "/storybook" && sidebar.itemActive,
            collapsed && sidebar.itemCollapsed,
          )}
        >
          <span className={sidebar.itemIcon}>
            <LayoutGrid />
          </span>
          {!collapsed && <span className={sidebar.itemLabel}>Storybook</span>}
        </Link>
        <Link
          href="/settings"
          onClick={onNavigate}
          title={collapsed ? "Settings" : undefined}
          aria-current={pathname === "/settings" ? "page" : undefined}
          className={cn(
            sidebar.item,
            pathname === "/settings" && sidebar.itemActive,
            collapsed && sidebar.itemCollapsed,
          )}
        >
          <span className={sidebar.itemIcon}>
            <Settings />
          </span>
          {!collapsed && <span className={sidebar.itemLabel}>Settings</span>}
        </Link>
        <button
          type="button"
          title={collapsed ? "Sign in" : undefined}
          className={cn(sidebar.signin, collapsed && sidebar.signinCollapsed)}
        >
          <ChevronRight className="size-[18px] shrink-0" />
          {!collapsed && <span>Sign in</span>}
        </button>
      </div>
    </>
  );
}
