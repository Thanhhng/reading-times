import { bookCard, chip } from "@/app/classes/ui";
import { GenreChip } from "./GenreChip";

type BookCardProps = {
  title: string;
  author: string;
  genres: string[];
  estMinutes: number;
  hasBilingual: boolean;
};

function readTime(minutes: number) {
  return minutes >= 60 ? `~${Math.round(minutes / 60)}h đọc` : `~${minutes}p đọc`;
}

export function BookCard({
  title,
  author,
  genres,
  estMinutes,
  hasBilingual,
}: BookCardProps) {
  return (
    <article className={bookCard.root}>
      <div className={bookCard.cover}>
        <span className={bookCard.coverTitle}>{title}</span>
      </div>
      <div className={bookCard.body}>
        <h3 className={bookCard.title}>{title}</h3>
        <p className={bookCard.author}>{author}</p>
        <div className={bookCard.chips}>
          {genres.map((genre) => (
            <GenreChip key={genre} label={genre} />
          ))}
        </div>
        <div className={bookCard.meta}>
          <span>{readTime(estMinutes)}</span>
          {hasBilingual && <span className={chip.bilingual}>Song ngữ</span>}
        </div>
      </div>
    </article>
  );
}
