import { notFound } from "next/navigation";
import { books } from "@/app/_data/books";
import { getSentences } from "@/app/_data/sentences";
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
  searchParams: Promise<{ mode?: string }>;
}) {
  const { bookId } = await params;
  const { mode: modeParam } = await searchParams;

  const book = books.find((item) => item.id === bookId);
  if (!book) notFound();

  const mode = resolveMode(modeParam);
  const sentences = getSentences(bookId);

  return (
    <Reader bookId={book.id} title={book.title} mode={mode}>
      <ReaderContent mode={mode} sentences={sentences} chapterTitle="Chapter 1" />
    </Reader>
  );
}
