import { notFound } from "next/navigation";
import { fetchBook } from "@/app/_data/gutendex";
import { fetchReadingText, toChapters, toParagraphs } from "@/app/_data/readingText";
import { Reader } from "@/components/reader/Reader";
import { ReaderContent, type ReaderMode } from "@/components/reader/ReaderContent";

const MODES: ReaderMode[] = ["full", "chapter", "scroll"];

function resolveMode(value: string | undefined): ReaderMode {
  return MODES.includes(value as ReaderMode) ? (value as ReaderMode) : "full";
}

export default async function ReaderPage({
  params,
  searchParams,
}: {
  params: Promise<{ bookId: string }>;
  searchParams: Promise<{ mode?: string; ch?: string }>;
}) {
  const { bookId } = await params;
  const { mode: modeParam, ch } = await searchParams;

  const id = Number(bookId);
  if (!Number.isInteger(id) || id <= 0) notFound();

  const book = await fetchBook(id);
  if (!book?.textUrl) notFound();

  const text = await fetchReadingText(book.textUrl);
  const chapters = text
    ? toChapters(toParagraphs(text))
    : [
        {
          title: null,
          paragraphs: [
            "The book text couldn't be loaded right now — go back and try again in a moment.",
          ],
        },
      ];

  const mode = resolveMode(modeParam);
  const chapter = Number(ch);

  return (
    <Reader bookId={book.id} title={book.title} mode={mode}>
      <ReaderContent
        mode={mode}
        chapters={chapters}
        chapter={Number.isFinite(chapter) && chapter > 0 ? chapter : 1}
        bookId={book.id}
      />
    </Reader>
  );
}
