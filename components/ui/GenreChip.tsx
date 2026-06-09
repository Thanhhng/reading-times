import { chip } from "@/app/classes/ui";

export function GenreChip({ label }: { label: string }) {
  return <span className={chip.base}>{label}</span>;
}
