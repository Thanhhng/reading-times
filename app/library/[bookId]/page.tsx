import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AlignJustify, BookOpen, ChevronLeft, List } from "lucide-react";
import { fetchBook } from "@/app/_data/gutendex";
import { bookPage as c } from "@/app/classes/library";
import { Badge } from "@/components/ui/Badge";
import { coverFor } from "@/components/ui/BookCard";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MODES = [
  { id: "full", label: "Normal reading", icon: AlignJustify },
  { id: "chapter", label: "Chapter", icon: List },
];

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;
  const id = Number(bookId);
  if (!Number.isInteger(id) || id <= 0) notFound();

  const book = await fetchBook(id);
  if (!book) notFound();

  const [c1, ct] = coverFor(book.title);
  const coverStyle = { "--_c1": c1, "--_ct": ct } as CSSProperties;
  const languages = book.languages.map((l) => l.toUpperCase()).join(" · ");

  return (
    <div className={c.view}>
      <Link href="/library" className={c.back}>
        <ChevronLeft />
        Library
      </Link>
      <div className={c.layout}>
        <div className={c.side}>
          <div className={c.cover} style={coverStyle}>
            {book.cover ? (
              <Image
                className={c.coverImg}
                src={book.cover}
                alt={book.title}
                fill
                priority
                sizes="280px"
              />
            ) : (
              <>
                <span className={c.coverTitle}>{book.title}</span>
                {book.author && (
                  <span className={c.coverAuthor}>{book.author}</span>
                )}
              </>
            )}
          </div>
        </div>

        <div className={c.main}>
          <header>
            <h1 className={c.title}>{book.title}</h1>
            {book.author && <p className={c.author}>{book.author}</p>}
            <div className={c.badges}>
              {book.genres?.map((genre) => (
                <Badge key={genre} tone="accent">
                  {genre}
                </Badge>
              ))}
              {book.hasBilingual && (
                <Badge tone="teal" dot>
                  EN · VI
                </Badge>
              )}
            </div>
          </header>

          <div className={c.stats}>
            <div className={c.stat}>
              <span className={c.statValue}>
                {book.downloadCount.toLocaleString("en-US")}
              </span>
              downloads
            </div>
            <div className={c.stat}>
              <span className={c.statValue}>{languages}</span>
              language
            </div>
            <div className={c.stat}>
              <span className={c.statValue}>Free</span>
              public domain
            </div>
          </div>

          {book.summary && <p className={c.summary}>{book.summary}</p>}
          {book.translators.length > 0 && (
            <p className={c.translators}>
              Translated by {book.translators.join(", ")}
            </p>
          )}

          <div className={c.modes}>
            <div className="rt-eyebrow">Reading mode</div>
            <div className={c.modeGrid}>
              {MODES.map((mode) => {
                const Icon = mode.icon;
                return (
                  <Link
                    key={mode.id}
                    href={`/read/${book.id}?mode=${mode.id}`}
                    className={cn(mode.id === "full" ? buttonVariants({ size: "lg" }) : c.modeBtn)}
                  >
                    <Icon />
                    {mode.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
