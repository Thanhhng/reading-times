import { Suspense } from "react";
import { SearchForm } from "@/components/search/SearchForm";
import { SearchResults } from "@/components/search/SearchResults";
import { BookGridSkeleton } from "@/components/ui/BookGridSkeleton";
import { library } from "@/app/classes/library";

type SP = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const query = first(sp.search)?.trim() || undefined;
  const pageNum = Number(first(sp.page));
  const page = Number.isFinite(pageNum) && pageNum > 0 ? pageNum : undefined;

  return (
    <div className={library.view}>
      <header className={library.head}>
        <h1 className={library.headTitle}>Search</h1>
        <p className={library.headSub}>
          Find a book by title or author across the library.
        </p>
      </header>

      <SearchForm defaultValue={query} />

      {!query ? (
        <div className={library.empty}>
          <p>Type a title or author to search the library.</p>
        </div>
      ) : (
        <Suspense
          key={JSON.stringify({ query, page })}
          fallback={<BookGridSkeleton count={20} />}
        >
          <SearchResults query={query} page={page} />
        </Suspense>
      )}
    </div>
  );
}
