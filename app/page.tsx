import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { BookCard } from "@/components/ui/BookCard";
import { ReelCard } from "@/components/home/ReelCard";
import { fetchBooks, readableBooks, type LibraryBook } from "./_data/gutendex";
import { home } from "./classes/home";

const today = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

function Rail({
  title,
  href,
  books,
}: {
  title: string;
  href: string;
  books: LibraryBook[];
}) {
  if (books.length === 0) return null;
  return (
    <section className={home.rail}>
      <div className={home.railHead}>
        <h2 className={home.railTitle}>{title}</h2>
        <Link href={href} className={home.railSeeAll}>
          See all
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
      <div className={home.railScroll}>
        {books.map((book) => (
          <Link
            key={book.id}
            href={`/library/${book.id}`}
            className={home.railItem}
          >
            <BookCard {...book} variant="plain" />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default async function HomePage() {
  const [popularData, newestData] = await Promise.all([
    fetchBooks({ sort: "popular" }),
    fetchBooks({ sort: "descending" }),
  ]);
  const popular = readableBooks(popularData).slice(0, 6);
  const newest = readableBooks(newestData).slice(0, 6);
  const featured = popular[0];
  const total = popularData?.count;

  return (
    <div className={home.view}>
      <section className={home.hero}>
        <div className="min-w-0">
          <h1 className={home.heroTitle}>
            Turn wasted time
            <br />
            into wonderful time.
          </h1>
          <p className={home.heroText}>
            A bilingual library you scroll through — read to learn a language,
            one calm screen at a time.
          </p>
          <div className={home.heroCta}>
            <Link
              href={featured ? `/read/${featured.id}` : "/library"}
              className={cn(buttonVariants({ size: "lg" }))}
            >
              <Play />
              Start today’s reel
            </Link>
            <Link href="/library" className={home.heroLink}>
              Browse the library
            </Link>
          </div>
        </div>
        <ReelCard />
      </section>

      <div className={home.masthead}>
        <span>{today.format(new Date())}</span>
        <span>English → Tiếng Việt</span>
        <span>Public-domain classics, free</span>
        {total ? <span>{total.toLocaleString("en-US")} books</span> : null}
      </div>

      <Rail title="Popular now" href="/library" books={popular} />
      <Rail
        title="Recently added"
        href="/library?sort=descending"
        books={newest}
      />
    </div>
  );
}
