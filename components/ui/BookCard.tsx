import type { CSSProperties } from "react";
import Image from "next/image";
import { bookCard } from "@/app/classes/ui";
import { GenreChip } from "./GenreChip";

export type BookCardProps = {
  title: string;
  author?: string;
  genres?: string[];
  cover?: string | null;
  hasBilingual?: boolean;
};

const COVERS: [string, string][] = [
  ["#C4663A", "#FBEEE3"],
  ["#6E685E", "#E4F0EE"],
  ["#9C4C28", "#F6E6DA"],
  ["#3E5C6B", "#E6EEF1"],
  ["#7A5230", "#F3E8DA"],
  ["#6E5A86", "#ECE5F1"],
];

export function coverFor(title: string): [string, string] {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash * 31 + title.charCodeAt(i)) >>> 0;
  }
  return COVERS[hash % COVERS.length];
}

export function BookCard({
  title,
  author,
  genres = [],
  cover = null,
  hasBilingual = false,
}: BookCardProps) {
  const [c1, ct] = coverFor(title);
  const coverStyle = { "--_c1": c1, "--_ct": ct } as CSSProperties;
  return (
    <article className={bookCard.root} style={coverStyle}>
      <div className={bookCard.cover}>
        {cover && (
          <Image
            className={bookCard.coverImg}
            src={cover}
            alt={title}
            fill
            loading="eager"
            sizes="(min-width:1280px) 20vw, (min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
          />
        )}
        {hasBilingual && (
          <div className={bookCard.badges}>
            <span className={bookCard.bilingual}>EN · VI</span>
          </div>
        )}
        {!cover && (
          <>
            <span className={bookCard.coverTitle}>{title}</span>
            {author && <span className={bookCard.coverAuthor}>{author}</span>}
          </>
        )}
      </div>
      <div className={bookCard.body}>
        <h3 className={bookCard.title}>{title}</h3>
        {author && <p className={bookCard.author}>{author}</p>}
        {genres.length > 0 && (
          <div className={bookCard.chips}>
            {genres.slice(0, 3).map((genre) => (
              <GenreChip key={genre} label={genre} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
