import type { BookCardProps } from "@/components/ui/BookCard";

export type GutendexPerson = {
  name: string;
  birth_year: number | null;
  death_year: number | null;
};

export type GutendexFormats = Partial<Record<string, string>> & {
  "image/jpeg"?: string;
  "text/plain; charset=utf-8"?: string;
  "text/plain; charset=us-ascii"?: string;
  "text/html"?: string;
  "application/epub+zip"?: string;
};

export type GutendexBook = {
  id: number;
  title: string;
  authors: GutendexPerson[];
  translators: GutendexPerson[];
  editors?: GutendexPerson[];
  summaries?: string[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean | null;
  media_type: string;
  formats: GutendexFormats;
  download_count: number;
};

export type GutendexResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: GutendexBook[];
};

export type LibraryBook = BookCardProps & {
  id: number;
  textUrl: string | null;
  summary: string | null;
  languages: string[];
  downloadCount: number;
  translators: string[];
};

const CATEGORY_PREFIX = "Category: ";
const TEXT_FORMAT_KEYS = [
  "text/plain; charset=utf-8",
  "text/plain; charset=us-ascii",
  "text/plain",
] as const;

export function readingTextUrl(book: GutendexBook): string | null {
  if (book.media_type !== "Text") return null;
  for (const key of TEXT_FORMAT_KEYS) {
    const url = book.formats[key];
    if (url && !url.endsWith(".zip")) return url;
  }
  return null;
}

function flipName(name: string): string {
  const clean = name.replace(/\s*\([^)]*\)/g, "").trim();
  const [last, first] = clean.split(", ");
  return first ? `${first} ${last}` : clean;
}

export function deriveGenres(book: GutendexBook): string[] {
  const fromShelves = book.bookshelves
    .filter((shelf) => shelf.startsWith(CATEGORY_PREFIX))
    .map((shelf) => shelf.slice(CATEGORY_PREFIX.length));
  const fromSubjects = book.subjects.map((subject) => subject.split(" -- ")[0]);
  const ordered = fromShelves.length
    ? [...fromShelves, ...fromSubjects]
    : fromSubjects;
  return Array.from(new Set(ordered)).slice(0, 3);
}

export function toBookCardProps(book: GutendexBook): BookCardProps {
  return {
    title: book.title,
    author: book.authors[0] ? flipName(book.authors[0].name) : undefined,
    genres: deriveGenres(book),
    cover: book.formats["image/jpeg"] ?? null,
    hasBilingual: false,
  };
}

export function toLibraryBook(book: GutendexBook): LibraryBook {
  return {
    ...toBookCardProps(book),
    id: book.id,
    textUrl: readingTextUrl(book),
    summary: book.summaries?.[0] ?? null,
    languages: book.languages,
    downloadCount: book.download_count,
    translators: book.translators.map((t) => flipName(t.name)),
  };
}

export function readableBooks(
  response: GutendexResponse | null,
): LibraryBook[] {
  if (!response) return [];
  return response.results
    .filter((book) => book.media_type === "Text")
    .map(toLibraryBook)
    .filter((book) => book.textUrl !== null);
}

const GUTENDEX_URL = "http://127.0.0.1:8000/books/";
const REVALIDATE_SECONDS = 2700;
const FETCH_TIMEOUT_MS = 12000;

export type FetchBooksParams = {
  languages?: string[];
  sort?: "popular" | "ascending" | "descending";
  search?: string;
  topic?: string;
  page?: number;
};

export async function fetchBooks(
  params: FetchBooksParams = {},
): Promise<GutendexResponse | null> {
  const qs = new URLSearchParams();
  if (params.languages?.length) qs.set("languages", params.languages.join(","));
  if (params.sort) qs.set("sort", params.sort);
  if (params.search) qs.set("search", params.search);
  if (params.topic) qs.set("topic", params.topic);
  if (params.page) qs.set("page", String(params.page));
  const query = qs.toString();
  const url = query ? `${GUTENDEX_URL}?${query}` : GUTENDEX_URL;
  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    return (await res.json()) as GutendexResponse;
  } catch {
    return null;
  }
}

export async function fetchBook(id: number): Promise<LibraryBook | null> {
  try {
    const res = await fetch(`${GUTENDEX_URL}${id}`, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    return toLibraryBook((await res.json()) as GutendexBook);
  } catch {
    return null;
  }
}
