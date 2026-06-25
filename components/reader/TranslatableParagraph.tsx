"use client";

import { cn } from "@/lib/utils";
import { reader as c } from "@/app/classes/reader";
import { store, useTranslationEntry } from "./translationStore";

export function TranslatableParagraph({ pid, text }: { pid: string; text: string }) {
  const entry = useTranslationEntry(pid);
  return (
    <>
      <p data-pid={pid} className={cn(c.para, c.paraGap)}>
        {text}
      </p>
      {entry?.status === "loading" && <p className={c.transLoading}>Đang dịch…</p>}
      {entry?.status === "done" && (
        <p lang="vi" className={c.transBlock}>
          {entry.text}
        </p>
      )}
      {entry?.status === "error" && (
        <p className={c.transError}>
          Không dịch được.{" "}
          <button
            type="button"
            className={c.transRetry}
            onClick={() => store.translate(pid, entry.source)}
          >
            Thử lại
          </button>
        </p>
      )}
    </>
  );
}
