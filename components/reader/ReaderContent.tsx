import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { reader as c } from "@/app/classes/reader";
import type { Chapter } from "@/app/_data/readingText";

export type ReaderMode = "full" | "chapter" | "scroll";

const WORDS_PER_SCREEN = 130;

function groupScreens(paragraphs: string[]): string[][] {
  const screens: string[][] = [];
  let current: string[] = [];
  let count = 0;
  for (const paragraph of paragraphs) {
    current.push(paragraph);
    count += paragraph.split(" ").length;
    if (count >= WORDS_PER_SCREEN) {
      screens.push(current);
      current = [];
      count = 0;
    }
  }
  if (current.length) screens.push(current);
  return screens;
}

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
  if (mode === "scroll") {
    const paragraphs = chapters.flatMap((ch) =>
      ch.title ? [ch.title, ...ch.paragraphs] : ch.paragraphs,
    );
    const screens = groupScreens(paragraphs);
    return (
      <div className={c.col}>
        {screens.map((screen, i) => (
          <div key={i} className={c.screen}>
            {screen.map((paragraph, j) => (
              <p key={j} className={cn(c.para, c.paraGap)}>
                {paragraph}
              </p>
            ))}
            <div className={c.screenFoot}>
              {i + 1} / {screens.length}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (mode === "chapter") {
    const index = Math.min(Math.max(chapter, 1), chapters.length);
    const current = chapters[index - 1];
    return (
      <div className={c.col}>
        <div className={c.chapterTitle}>
          {current.title ?? `Chapter ${index}`}
        </div>
        {current.paragraphs.map((paragraph, i) => (
          <p key={i} className={cn(c.para, c.paraGap)}>
            {paragraph}
          </p>
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
            <p key={j} className={cn(c.para, c.paraGap)}>
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}
