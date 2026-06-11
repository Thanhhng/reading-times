import Link from "next/link";
import { cn } from "@/lib/utils";
import { filterBar as c } from "@/app/classes/library";

export type LibraryFilters = {
  genres: string[];
  languages: string[];
  sort?: "popular" | "ascending" | "descending";
  bilingual: boolean;
  search?: string;
  topic?: string;
  page?: number;
};

const LANGUAGES: [string, string][] = [
  ["en", "EN"],
  ["fr", "FR"],
  ["de", "DE"],
  ["es", "ES"],
  ["it", "IT"],
];

const SORTS: [NonNullable<LibraryFilters["sort"]>, string][] = [
  ["popular", "Most popular"],
  ["descending", "Newest"],
  ["ascending", "Oldest"],
];

export function libraryHref(
  filters: LibraryFilters,
  overrides: Partial<LibraryFilters> = {},
): string {
  const next = { ...filters, page: undefined, ...overrides };
  const qs = new URLSearchParams();
  for (const genre of next.genres) qs.append("genre", genre);
  if (next.languages.length) qs.set("languages", next.languages.join(","));
  if (next.sort) qs.set("sort", next.sort);
  if (next.bilingual) qs.set("bilingual", "1");
  if (next.search) qs.set("search", next.search);
  if (next.topic) qs.set("topic", next.topic);
  if (next.page && next.page > 1) qs.set("page", String(next.page));
  const query = qs.toString();
  return query ? `/library?${query}` : "/library";
}

function toggled(list: string[], value: string): string[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export function FilterBar({
  allGenres,
  filters,
}: {
  allGenres: string[];
  filters: LibraryFilters;
}) {
  const sort = filters.sort ?? "popular";
  return (
    <div className={c.bar}>
      {allGenres.length > 0 && (
        <div className={c.group}>
          <span className={c.label}>Genre</span>
          {allGenres.map((genre) => (
            <Link
              key={genre}
              href={libraryHref(filters, { genres: toggled(filters.genres, genre) })}
              className={cn(
                c.tag,
                filters.genres.includes(genre) ? c.tagActive : c.tagIdle,
              )}
            >
              {genre}
            </Link>
          ))}
        </div>
      )}
      <div className={c.group}>
        <span className={c.label}>Language</span>
        {LANGUAGES.map(([code, label]) => (
          <Link
            key={code}
            href={libraryHref(filters, {
              languages: toggled(filters.languages, code),
            })}
            className={cn(
              c.tag,
              filters.languages.includes(code) ? c.tagActive : c.tagIdle,
            )}
          >
            {label}
          </Link>
        ))}
      </div>
      <div className={c.group}>
        <Link
          href={libraryHref(filters, { bilingual: !filters.bilingual })}
          className={cn(c.tag, filters.bilingual ? c.tagActive : c.tagIdle)}
        >
          EN ↔ VI
        </Link>
      </div>
      <div className={cn(c.group, c.spacer)}>
        <div className={c.seg}>
          {SORTS.map(([value, label]) => (
            <Link
              key={value}
              href={libraryHref(filters, { sort: value })}
              className={cn(c.segBtn, sort === value && c.segBtnActive)}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
