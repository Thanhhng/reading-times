"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandGlyph } from "@/components/brand/BrandGlyph";
import { topNav as c } from "@/app/classes/topNav";
import { topNav } from "@/app/_data/nav";
import { ThemeToggle } from "./ThemeToggle";

function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function TopNav() {
  const pathname = usePathname();
  if (pathname.startsWith("/read")) return null;

  return (
    <header className={c.bar}>
      <div className={c.inner}>
        <Link href="/" className={c.brand}>
          <BrandGlyph className={c.glyph} />
          <span className={c.name}>Reading Time</span>
        </Link>

        <nav aria-label="Primary" className={c.links}>
          {topNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(c.link, active ? c.linkActive : c.linkIdle)}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className={c.actions}>
          <Link
            href="/settings"
            aria-label="Settings"
            title="Settings"
            aria-current={pathname === "/settings" ? "page" : undefined}
            className={cn(c.action, pathname === "/settings" && c.actionActive)}
          >
            <Settings />
          </Link>
          <ThemeToggle className={c.action} title="Toggle light / dark" />
        </div>
      </div>
    </header>
  );
}
