import Link from "next/link";
import { BookCard } from "@/components/ui/BookCard";
import { fetchBooks, readableBooks } from "@/app/_data/gutendex";
import { library } from "@/app/classes/library";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FilterBar, libraryHref, type LibraryFilters } from "./FilterBar";
import { LibraryReload } from "./LibraryReload";

const PAGE_SIZE = 32;
const GENRE_OPTIONS = 10;

function topGenres(books: { genres?: string[] }[]): string[] {
  const counts = new Map<string, number>();
  for (const book of books) {
    for (const genre of book.genres ?? []) {
      counts.set(genre, (counts.get(genre) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, GENRE_OPTIONS)
    .map(([genre]) => genre);
}

export async function BookGrid({ filters }: { filters: LibraryFilters }) {
  const data = await fetchBooks({
    search: filters.search,
    topic: filters.topic,
    sort: filters.sort,
    page: filters.page,
    languages: filters.languages.length ? filters.languages : undefined,
  });
  const books = readableBooks(data);

  if (!data || books.length === 0) {
    return (
      <div className={library.empty}>
        <p>No books to show right now.</p>
        <LibraryReload />
      </div>
    );
  }

  const allGenres = [
    ...new Set([...filters.genres, ...topGenres(books)]),
  ].slice(0, GENRE_OPTIONS + filters.genres.length);

  const shown = books.filter(
    (book) =>
      (!filters.genres.length ||
        book.genres?.some((genre) => filters.genres.includes(genre))) &&
      (!filters.bilingual || book.hasBilingual),
  );

  const page = filters.page ?? 1;
  const pages = Math.max(1, Math.ceil(data.count / PAGE_SIZE));

  return (
    <>
      <FilterBar allGenres={allGenres} filters={filters} />
      {shown.length === 0 ? (
        <div className={library.empty}>
          <p>No books match these filters — try removing one.</p>
        </div>
      ) : (
        <>
          <p className={library.count}>
            {data.count.toLocaleString("en-US")} books · page {page} of {pages}
          </p>
          <ul className={library.grid}>
            {shown.map((book) => (
              <li key={book.id} className="min-w-0">
                <Link href={`/library/${book.id}`} className="block h-full">
                  <BookCard {...book} />
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
      <div className={library.pager}>
        {data.previous && (
          <Link
            href={libraryHref(filters, { page: page - 1 })}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Previous
          </Link>
        )}
        {data.next && (
          <Link
            href={libraryHref(filters, { page: page + 1 })}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Next
          </Link>
        )}
      </div>
    </>
  );
}
