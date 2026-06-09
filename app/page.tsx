import Link from "next/link";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { BookCard } from "@/components/ui/BookCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { HeroArt } from "@/components/brand/HeroArt";
import { books } from "./_data/books";
import { home } from "./classes/home";

export default function HomePage() {
  const current = books[0];
  const shorts = books.filter((book) => book.estMinutes <= 160);
  const classics = books.filter((book) => book.genres.includes("Classic"));

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
              href={`/read/${current.id}`}
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

      <section className={home.rail}>
        <div className={home.railHead}>
          <h2 className={home.railTitle}>Continue reading</h2>
        </div>
        <div className={home.continueCard}>
          <div className={home.continueCover}>
            <span className={home.continueCoverTitle}>{current.title}</span>
          </div>
          <div className={home.continueBody}>
            <div className={home.continueTitle}>{current.title}</div>
            <div className={home.continueMeta}>
              {current.author} · Chapter 3 · 12 phút để xong chương này
            </div>
            <ProgressBar
              value={current.progress ?? 0}
              caption={`${current.progress}% · ~5h còn lại`}
            />
          </div>
          <Link
            href={`/read/${current.id}`}
            className={cn(buttonVariants())}
          >
            <BookOpen />
            Read now
          </Link>
        </div>
      </section>

      <section className={home.rail}>
        <div className={home.railHead}>
          <h2 className={home.railTitle}>Short reads · under 30 minutes</h2>
          <span className={home.railSeeAll}>See all</span>
        </div>
        <div className={home.railScroll}>
          {shorts.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              genres={book.genres}
              estMinutes={book.estMinutes}
              hasBilingual={book.hasBilingual}
            />
          ))}
        </div>
      </section>

      <section className={home.rail}>
        <div className={home.railHead}>
          <h2 className={home.railTitle}>Classics</h2>
          <span className={home.railSeeAll}>See all</span>
        </div>
        <div className={home.railScroll}>
          {classics.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              genres={book.genres}
              estMinutes={book.estMinutes}
              hasBilingual={book.hasBilingual}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
