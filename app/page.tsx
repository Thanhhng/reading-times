import Link from "next/link";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { BookCard } from "@/components/ui/BookCard";
import { HeroArt } from "@/components/brand/HeroArt";
import { fetchBooks, readableBooks, type LibraryBook } from "./_data/gutendex";
import { home } from "./classes/home";

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
        </Link>
      </div>
      <div className={home.railScroll}>
        {books.map((book) => (
          <Link
            key={book.id}
            href={`/library/${book.id}`}
            className="block min-w-0"
          >
            <BookCard {...book} />
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
  const popular = readableBooks(popularData).slice(0, 10);
  const newest = readableBooks(newestData).slice(0, 10);
  const featured = popular[0];

  return (
    <div className={home.view}>
      <section className={home.hero}>
        <div className="min-w-0">
          <div className={home.heroEyebrow}>Reels for reading</div>
          <h1 className={home.heroTitle}>Turn wasted time into wonderful time.</h1>
          <p className={home.heroText}>
            A bilingual library you scroll through — read to learn a language,
            one calm screen at a time.
          </p>
          <div className={home.heroCta}>
            <Link
              href={featured ? `/read/${featured.id}` : "/library"}
              className={cn(buttonVariants({ size: "lg" }))}
            >
              <BookOpen />
              Start reading
            </Link>
            <Link
              href="/library"
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
            >
              Browse the library
            </Link>
          </div>
        </div>
        <div className={home.heroArt}>
          <HeroArt className="h-auto w-full max-w-[300px]" />
        </div>
      </section>

      <Rail title="Popular now" href="/library" books={popular} />
      <Rail
        title="Recently added"
        href="/library?sort=descending"
        books={newest}
      />
    </div>
  );
}
