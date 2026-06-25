"use client";

import { useEffect, useState } from "react";
import { Languages } from "lucide-react";
import { reader as c } from "@/app/classes/reader";
import { store } from "./translationStore";

type Anchor = {
  x: number;
  y: number;
  pid: string;
  start: number;
  end: number;
  source: string;
};

export function SelectionPopover() {
  const [anchor, setAnchor] = useState<Anchor | null>(null);

  useEffect(() => {
    function update() {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) return setAnchor(null);
      const source = sel.toString().trim();
      if (!source) return setAnchor(null);

      const range = sel.getRangeAt(0);
      const paraOf = (node: Node | null) => {
        const el = node instanceof Element ? node : node?.parentElement;
        return el?.closest<HTMLElement>("[data-pid]") ?? null;
      };
      const para = paraOf(range.startContainer);
      if (!para?.dataset.pid) return setAnchor(null);
      if (paraOf(range.endContainer) !== para) return setAnchor(null);

      const pre = document.createRange();
      pre.selectNodeContents(para);
      pre.setEnd(range.startContainer, range.startOffset);
      const start = pre.toString().length;
      const end = start + range.toString().length;

      const rect = range.getBoundingClientRect();
      setAnchor({
        x: Math.min(Math.max(rect.left + rect.width / 2, 56), window.innerWidth - 56),
        y: Math.max(rect.top, 48),
        pid: para.dataset.pid,
        start,
        end,
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
          store.translate(anchor.pid, {
            start: anchor.start,
            end: anchor.end,
            source: anchor.source,
          });
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
