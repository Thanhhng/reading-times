import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { badge } from "@/app/classes/ui";

type BadgeProps = {
  children: ReactNode;
  tone?: "accent" | "teal" | "success" | "neutral";
  dot?: boolean;
};

export function Badge({ children, tone = "neutral", dot = false }: BadgeProps) {
  return (
    <span className={cn(badge.base, badge[tone])}>
      {dot && <span className={badge.dot} />}
      {children}
    </span>
  );
}
