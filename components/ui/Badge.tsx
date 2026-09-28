import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { badge } from "@/app/classes/ui";

export function Badge({ children }: { children: ReactNode }) {
  return <span className={cn(badge.base, badge.accent)}>{children}</span>;
}
