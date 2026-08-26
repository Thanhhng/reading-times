"use client";

import { useEffect, useRef, useState } from "react";
import { Languages } from "lucide-react";
import { reader as c } from "@/app/classes/reader";
import { store } from "./translationStore";
import { TRANSLATE_CHAR_LIMIT } from "@/app/_data/translate";

type MenuState = {
  x: number;
  y: number;
  pid: string;
  start: number;
  end: number;
  source: string;
  tooLong: boolean;
};

function paraOf(node: Node | null): HTMLElement | null {
  const el = node instanceof Element ? node : node?.parentElement ?? null;
  return el?.closest<HTMLElement>("[data-pid]") ?? null;
}

function resolveParagraphSelection(
  eventTarget: EventTarget | null,
): { pid: string; start: number; end: number; source: string } | null {
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed || sel.rangeCount === 0) return null;
  if (!(eventTarget instanceof Node) || !sel.containsNode(eventTarget, true)) {
    return null;
  }

  const source = sel.toString().trim();
  if (!source) return null;

  const range = sel.getRangeAt(0);
  const para = paraOf(range.startContainer);
  if (!para?.dataset.pid) return null;
  // A selection ending exactly at a paragraph's last character often has its
  // Range boundary normalized to (nextParagraph, 0) by the browser — that
  // includes zero characters of the next paragraph, so only treat it as a
  // genuine cross-paragraph selection when the end offset is non-zero.
  if (range.endOffset > 0 && paraOf(range.endContainer) !== para) return null;

  const pre = document.createRange();
  pre.selectNodeContents(para);
  pre.setEnd(range.startContainer, range.startOffset);
  const start = pre.toString().length;
  const end = start + range.toString().length;

  return { pid: para.dataset.pid, start, end, source };
}

const MENU_W = 190;
const MENU_H = 88;
const EDGE = 8;

export function SelectionContextMenu() {
  const [menu, setMenu] = useState<MenuState | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close() {
      setMenu(null);
    }

    function onContextMenu(e: MouseEvent) {
      const resolved = resolveParagraphSelection(e.target);
      if (!resolved) return;
      e.preventDefault();
      const x = Math.min(Math.max(e.clientX, EDGE), window.innerWidth - MENU_W - EDGE);
      const y = Math.min(Math.max(e.clientY, EDGE), window.innerHeight - MENU_H - EDGE);
      setMenu({ x, y, ...resolved, tooLong: resolved.source.length > TRANSLATE_CHAR_LIMIT });
    }

    function onPointerDown(e: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) close();
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, []);

  if (!menu) return null;

  return (
    <div
      ref={menuRef}
      role="menu"
      className={c.transMenu}
      style={{ position: "fixed", left: menu.x, top: menu.y }}
    >
      {menu.tooLong ? (
        <p className={c.transMenuError}>Không thể dịch đoạn quá 500 ký tự.</p>
      ) : (
        <button
          type="button"
          role="menuitem"
          className={c.transMenuItem}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            store.translate(menu.pid, {
              start: menu.start,
              end: menu.end,
              source: menu.source,
            });
            setMenu(null);
            window.getSelection()?.removeAllRanges();
          }}
        >
          <Languages />
          Dịch
        </button>
      )}
    </div>
  );
}
