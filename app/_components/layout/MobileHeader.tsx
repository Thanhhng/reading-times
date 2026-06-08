"use client";

import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { BrandGlyph } from "../brand/BrandGlyph";

export function MobileHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-surface px-[var(--space-4)] py-[var(--space-3)] md:hidden">
      <button
        type="button"
        onClick={toggleSidebar}
        aria-label="Open menu"
        className="inline-flex size-9 items-center justify-center rounded-[var(--radius-md)] text-ink transition-colors hover:bg-surface-2"
      >
        <Menu className="size-[22px]" />
      </button>

      <Link href="/" className="flex items-center gap-2">
        <BrandGlyph className="size-[26px] shrink-0 text-accent" />
        <span className="font-serif text-[length:var(--text-md)] font-semibold text-ink">
          Reading Time
        </span>
      </Link>

      <button
        type="button"
        aria-label="Search"
        className="ml-auto inline-flex size-9 items-center justify-center rounded-[var(--radius-md)] text-ink transition-colors hover:bg-surface-2"
      >
        <Search className="size-[20px]" />
      </button>
    </header>
  );
}
