import { chip } from "../../_styles/ui";

export function GenreChip({ label }: { label: string }) {
  return <span className={chip.base}>{label}</span>;
}
