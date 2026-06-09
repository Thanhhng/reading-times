import { BookCard } from "@/components/ui/BookCard";
import { toBookCardProps } from "@/app/_data/gutendex";
import { sampleBooks } from "@/app/_data/gutendex-sample";

export default function Page() {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {sampleBooks.results.map((book) => (
        <li key={book.id}>
          <BookCard {...toBookCardProps(book)} />
        </li>
      ))}
    </ul>
  );
}
