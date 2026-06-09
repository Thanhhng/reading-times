import Link from "next/link";
import { Search } from "lucide-react";
import { BrandGlyph } from "@/components/brand/BrandGlyph";
import { mobileBar } from "@/app/classes/mobileBar";
import { ThemeToggle } from "./ThemeToggle";

export function MobileTopBar() {
  return (
    <header className={mobileBar.bar}>
      <Link href="/" className={mobileBar.brand}>
        <BrandGlyph className={mobileBar.glyph} />
        <span className={mobileBar.name}>Reading Time</span>
      </Link>

      <div className={mobileBar.actions}>
        <Link href="/search" aria-label="Search" className={mobileBar.action}>
          <Search />
        </Link>
        <ThemeToggle className={mobileBar.action} />
      </div>
    </header>
  );
}
