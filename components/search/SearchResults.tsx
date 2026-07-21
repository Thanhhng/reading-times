import Link from "next/link";
import { BookCard } from "@/components/ui/BookCard";
import { fetchBooks, readableBooks } from "@/app/_data/gutendex";
import { library } from "@/app/classes/library";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LibraryReload } from "@/components/library/LibraryReload";

const PAGE_SIZE = 32;

function searchHref(query: string, page: number): string {
  const qs = new URLSearchParams({ search: query });
  if (page > 1) qs.set("page", String(page));
  return `/search?${qs.toString()}`;
}

export async function SearchResults({
  query,
  page,
}: {
  query: string;
  page?: number;
}) {
  const data = await fetchBooks({ search: query, page });
  const books = readableBooks(data);

  if (!data) {
    return (
      <div className={library.empty}>
        <p>Couldn&rsquo;t reach the library right now.</p>
        <LibraryReload />
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className={library.empty}>
        <p>No matches for &ldquo;{query}&rdquo;.</p>
      </div>
    );
  }

  const current = page ?? 1;
  const pages = Math.max(1, Math.ceil(data.count / PAGE_SIZE));

  return (
    <>
      <p className={library.count}>
        {data.count.toLocaleString("en-US")} results · page {current} of {pages}
      </p>
      <ul className={library.grid}>
        {books.map((book) => (
          <li key={book.id} className="min-w-0">
            <Link href={`/library/${book.id}`} className="block h-full">
              <BookCard {...book} />
            </Link>
          </li>
        ))}
      </ul>
      <div className={library.pager}>
        {data.previous && (
          <Link
            href={searchHref(query, current - 1)}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Previous
          </Link>
        )}
        {data.next && (
          <Link
            href={searchHref(query, current + 1)}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Next
          </Link>
        )}
      </div>
    </>
  );
}
