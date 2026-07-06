"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { reader as c } from "@/app/classes/reader";
import { store, useHighlights, type Highlight } from "./translationStore";

function segments(text: string, highlights: Highlight[]) {
  const out: { text: string; hl?: Highlight }[] = [];
  let cursor = 0;
  for (const hl of highlights) {
    const start = Math.max(hl.start, cursor);
    const end = Math.min(hl.end, text.length);
    if (start > cursor) out.push({ text: text.slice(cursor, start) });
    if (end > start) out.push({ text: text.slice(start, end), hl });
    cursor = Math.max(cursor, end);
  }
  if (cursor < text.length) out.push({ text: text.slice(cursor) });
  return out;
}

export function TranslatableParagraph({ pid, text }: { pid: string; text: string }) {
  const highlights = useHighlights(pid);
  const finalFormatParagraph = text.replaceAll(/[_\-—]/g, "");
  return (
    <>
      <p data-pid={pid} className={cn(c.para, c.paraGap)}>
        {highlights?.length
          ? segments(text, highlights).map((seg, i) =>
              seg.hl ? (
                <mark key={i} className={c.transMark} data-status={seg.hl.status}>
                  {seg.text}
                </mark>
              ) : (
                <span key={i}>{seg.text}</span>
              ),
            )
          : finalFormatParagraph}
      </p>

      {highlights && highlights.length > 0 && (
        <div className={c.transList}>
          {highlights.map((hl) => (
            <div key={hl.id} className={c.transItem}>
              <button
                type="button"
                aria-label="Bỏ bản dịch"
                className={c.transDismiss}
                onClick={() => store.dismiss(pid, hl.id)}
              >
                <X />
              </button>
              {hl.status === "loading" && <span className={c.transLoading}>Đang dịch…</span>}
              {hl.status === "done" && (
                <span lang="vi" className={c.transBlock}>
                  {hl.text}
                </span>
              )}
              {hl.status === "error" && (
                <span className={c.transError}>
                  Không dịch được.{" "}
                  <button
                    type="button"
                    className={c.transRetry}
                    onClick={() => store.retry(pid, hl.id)}
                  >
                    Thử lại
                  </button>
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
