import type { BookCardProps } from "@/components/ui/BookCard";

export type GutendexAuthor = {
  name: string;
  birth_year: number | null;
  death_year: number | null;
};

export type GutendexBook = {
  id: number;
  title: string;
  authors: GutendexAuthor[];
  translators: GutendexAuthor[];
  editors?: GutendexAuthor[];
  summaries?: string[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean | null;
  media_type: string;
  formats: Record<string, string>;
  download_count: number;
};

export type GutendexResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: GutendexBook[];
};

const CATEGORY_PREFIX = "Category: ";

function cleanGenres(book: GutendexBook): string[] {
  const fromShelves = book.bookshelves
    .filter((shelf) => shelf.startsWith(CATEGORY_PREFIX))
    .map((shelf) => shelf.slice(CATEGORY_PREFIX.length));
  const source = fromShelves.length
    ? fromShelves
    : book.subjects.map((subject) => subject.split(" -- ")[0]);
  return Array.from(new Set(source)).slice(0, 3);
}

function formatAuthor(name: string | undefined): string | undefined {
  if (!name) return undefined;
  const clean = name.replace(/\s*\([^)]*\)/g, "").trim();
  const parts = clean.split(", ");
  return parts.length === 2 ? `${parts[1]} ${parts[0]}` : clean;
}

export function toBookCardProps(book: GutendexBook): BookCardProps {
  return {
    title: book.title,
    author: formatAuthor(book.authors[0]?.name),
    genres: cleanGenres(book),
    cover: book.formats["image/jpeg"] ?? null,
  };
}
