import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { reader as c } from "@/app/classes/reader";
import type { Chapter } from "@/app/_data/readingText";
import { TranslatableParagraph } from "./TranslatableParagraph";

export type ReaderMode = "full" | "chapter";

export function ReaderContent({
  mode,
  chapters,
  chapter,
  bookId,
}: {
  mode: ReaderMode;
  chapters: Chapter[];
  chapter: number;
  bookId: number;
}) {

  if (mode === "chapter") {
    const index = Math.min(Math.max(chapter, 1), chapters.length);
    const current = chapters[index - 1];
    return (
      <div className={c.col}>
        <div className={c.chapterTitle}>
          {current.title ?? `Chapter ${index}`}
        </div>
        {current.paragraphs.map((paragraph, i) => (
          <TranslatableParagraph key={i} pid={`${bookId}-${index - 1}-${i}`} text={paragraph} />
        ))}
        <nav className={c.chapterNav} aria-label="Chapters">
          {index > 1 ? (
            <Link
              href={`/read/${bookId}?mode=chapter&ch=${index - 1}`}
              className={c.chapterNavBtn}
            >
              <ChevronLeft />
              Previous
            </Link>
          ) : (
            <span />
          )}
          <span className={c.screenFoot}>
            {index} / {chapters.length}
          </span>
          {index < chapters.length ? (
            <Link
              href={`/read/${bookId}?mode=chapter&ch=${index + 1}`}
              className={c.chapterNavBtn}
            >
              Next
              <ChevronRight />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    );
  }

  return (
    <div className={c.col}>
      {chapters.map((ch, i) => (
        <section key={i}>
          {ch.title && <div className={c.chapterTitle}>{ch.title}</div>}
          {ch.paragraphs.map((paragraph, j) => (
            <TranslatableParagraph key={j} pid={`${bookId}-${i}-${j}`} text={paragraph} />
          ))}
        </section>
      ))}
    </div>
  );
}
