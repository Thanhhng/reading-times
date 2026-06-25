"use client";

import { useEffect, useState } from "react";
import { Languages } from "lucide-react";
import { reader as c } from "@/app/classes/reader";
import { store } from "./translationStore";

type Anchor = { x: number; y: number; pid: string; source: string };

export function SelectionPopover() {
  const [anchor, setAnchor] = useState<Anchor | null>(null);

  useEffect(() => {
    function update() {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) return setAnchor(null);
      const source = sel.toString().trim();
      if (!source) return setAnchor(null);
      const node = sel.anchorNode;
      const el = node instanceof Element ? node : node?.parentElement;
      const para = el?.closest<HTMLElement>("[data-pid]");
      if (!para?.dataset.pid) return setAnchor(null);
      const rect = sel.getRangeAt(0).getBoundingClientRect();
      setAnchor({
        x: Math.min(Math.max(rect.left + rect.width / 2, 56), window.innerWidth - 56),
        y: Math.max(rect.top, 48),
        pid: para.dataset.pid,
        source,
      });
    }
    document.addEventListener("selectionchange", update);
    return () => document.removeEventListener("selectionchange", update);
  }, []);

  if (!anchor) return null;
  return (
    <div
      className={c.transPopup}
      style={{
        position: "fixed",
        left: anchor.x,
        top: anchor.y,
        transform: "translate(-50%,-100%)",
      }}
    >
      <button
        type="button"
        className={c.transPopupBtn}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          store.translate(anchor.pid, anchor.source);
          setAnchor(null);
          window.getSelection()?.removeAllRanges();
        }}
      >
        <Languages />
        Dịch
      </button>
    </div>
  );
}
