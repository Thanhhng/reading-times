import { library } from "@/app/classes/library";
import { BookCardSkeleton } from "./BookCardSkeleton";

export function BookGridSkeleton({ count = 20 }: { count?: number }) {
  return (
    <ul className={library.grid} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <li key={i}>
          <BookCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
