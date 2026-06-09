"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { bottomNav } from "@/app/classes/bottomNav";
import { bottomNavTabs } from "@/app/_data/nav";

function activeTab(pathname: string): string {
  if (pathname.startsWith("/read")) return "read";
  if (pathname.startsWith("/library")) return "library";
  if (pathname.startsWith("/settings")) return "profile";
  if (pathname === "/") return "home";
  return "home";
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const active = activeTab(pathname);

  return (
    <nav aria-label="Primary" className={bottomNav.bar}>
      {bottomNavTabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.id === active;
        return (
          <Link
            key={tab.id}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              bottomNav.item,
              isActive ? bottomNav.itemActive : bottomNav.itemIdle,
            )}
          >
            <span
              className={cn(
                bottomNav.pill,
                isActive && bottomNav.pillActive,
                tab.primary && bottomNav.pillPrimary,
              )}
            >
              <span className={cn(bottomNav.icon, tab.primary && bottomNav.iconPrimary)}>
                <Icon />
              </span>
              {tab.dot && !tab.primary && <span className={bottomNav.dot} />}
            </span>
            <span className={cn(bottomNav.label, isActive && bottomNav.labelActive)}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
