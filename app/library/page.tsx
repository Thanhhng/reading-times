import { Suspense } from "react";
import { BookGrid } from "@/components/library/BookGrid";
import { BookGridSkeleton } from "@/components/ui/BookGridSkeleton";
import { library } from "@/app/classes/library";
import type { LibraryFilters } from "@/components/library/FilterBar";

type SP = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const all = (v: string | string[] | undefined) =>
  v == null ? [] : Array.isArray(v) ? v : [v];

function toFilters(sp: SP): LibraryFilters {
  const sort = first(sp.sort);
  const page = Number(first(sp.page));
  const languages = first(sp.languages);
  return {
    genres: all(sp.genre),
    languages: languages ? languages.split(",") : [],
    bilingual: first(sp.bilingual) === "1",
    search: first(sp.search) || undefined,
    topic: first(sp.topic) || undefined,
    sort:
      sort === "popular" || sort === "ascending" || sort === "descending"
        ? sort
        : undefined,
    page: Number.isFinite(page) && page > 0 ? page : undefined,
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const filters = toFilters(sp);
  return (
    <div className={library.view}>
      <header className={library.head}>
        <h1 className={library.headTitle}>Library</h1>
        <p className={library.headSub}>
          Public-domain books from Project Gutenberg — pick one and start reading.
        </p>
      </header>
      <Suspense key={JSON.stringify(filters)} fallback={<BookGridSkeleton count={20} />}>
        <BookGrid filters={filters} />
      </Suspense>
    </div>
  );
}
