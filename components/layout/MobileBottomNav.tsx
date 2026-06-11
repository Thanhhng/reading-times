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
  return "home";
}

export function MobileBottomNav({ readHref }: { readHref?: string }) {
  const pathname = usePathname();
  const active = activeTab(pathname);

  return (
    <nav aria-label="Primary" className={bottomNav.bar}>
      {bottomNavTabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.id === active;
        const href = tab.id === "read" ? (readHref ?? tab.href) : tab.href;
        return (
          <Link
            key={tab.id}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              bottomNav.item,
              isActive ? bottomNav.itemActive : bottomNav.itemIdle,
            )}
          >
            <span className={cn(bottomNav.pill, isActive && bottomNav.pillActive)}>
              <span className={bottomNav.icon}>
                <Icon />
              </span>
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
