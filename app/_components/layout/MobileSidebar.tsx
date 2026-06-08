"use client";

import { X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSidebar } from "@/components/ui/sidebar";
import { BrandGlyph } from "../brand/BrandGlyph";
import { SidebarNav } from "./SidebarNav";
import { sidebar } from "../../_styles/sidebar";

export function MobileSidebar() {
  const { openMobile, setOpenMobile } = useSidebar();
  const close = () => setOpenMobile(false);

  return (
    <Sheet open={openMobile} onOpenChange={setOpenMobile}>
      <SheetContent side="left" showCloseButton={false} className={sidebar.sheet}>
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Reading Time navigation menu
        </SheetDescription>

        <div className={sidebar.brand}>
          <BrandGlyph className={sidebar.glyph} />
          <div className={sidebar.brandText}>
            <div className={sidebar.name}>Reading Time</div>
            <div className={sidebar.slogan}>
              Turn wasted time into wonderful time
            </div>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className={sidebar.iconBtn}
          >
            <X className="size-[18px]" />
          </button>
        </div>

        <SidebarNav onNavigate={close} />
      </SheetContent>
    </Sheet>
  );
}
