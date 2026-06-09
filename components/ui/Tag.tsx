import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { tag } from "@/app/classes/ui";

type TagProps = {
  label: string;
  count?: number;
  tone?: "accent" | "neutral";
  icon?: ReactNode;
};

export function Tag({ label, count, tone = "neutral", icon }: TagProps) {
  return (
    <span className={cn(tag.base, tag[tone])}>
      {icon}
      {label}
      {count != null && <span className={tag.count}>{count}</span>}
    </span>
  );
}
