import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { search as c } from "@/app/classes/search";

export function SearchForm({ defaultValue }: { defaultValue?: string }) {
  return (
    <form method="GET" action="/search" className={c.form}>
      <div className={c.field}>
        <SearchIcon className={c.icon} aria-hidden="true" />
        <Input
          type="search"
          name="search"
          defaultValue={defaultValue}
          placeholder="Search by title or author…"
          aria-label="Search by title or author"
          className={c.input}
        />
      </div>
      <Button type="submit">Search</Button>
    </form>
  );
}
