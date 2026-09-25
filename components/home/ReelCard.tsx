import { ChevronsUp, Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { homeReel as r } from "@/app/_data/homeReel";
import { home } from "@/app/classes/home";

export function ReelCard() {
  return (
    <article className={home.reel} aria-label="Sample reading screen">
      <div className={home.reelMeta}>
        <span>{r.position}</span>
        <span>{r.chapter}</span>
      </div>

      <div className="mt-[var(--space-5)]">
        <h2 className={home.reelTitle}>{r.title}</h2>
        <p className={home.reelAuthor}>{r.author}</p>
      </div>

      <p className={home.reelPassage}>
        <mark className={home.reelMark}>{r.highlight}</mark> {r.rest}
      </p>

      <div className={home.reelTrans}>
        <div className={home.reelTransLabel}>
          <Languages aria-hidden="true" />
          Tiếng Việt
        </div>
        <p className={home.reelTransText} lang="vi">
          {r.translation}
        </p>
      </div>

      <div className={home.reelFoot}>
        <span className="inline-flex items-center gap-[6px]">
          <ChevronsUp aria-hidden="true" className="size-4" />
          Swipe up for the next screen
        </span>
        <span>{r.duration}</span>
      </div>

      <div className={home.reelDots} aria-hidden="true">
        {Array.from({ length: r.total }, (_, i) => (
          <span
            key={i}
            className={cn(home.reelDot, i === r.current && home.reelDotActive)}
          />
        ))}
      </div>
    </article>
  );
}
