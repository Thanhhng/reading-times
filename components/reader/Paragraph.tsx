import { cn } from "@/lib/utils";
import { reader as c } from "@/app/classes/reader";

export function Paragraph({ text }: { text: string }) {
  return <p className={cn(c.para, c.paraGap)}>{text.replaceAll("_", "")}</p>;
}
