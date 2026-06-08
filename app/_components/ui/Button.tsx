import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { button } from "../../_styles/ui";

type ButtonProps = {
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
  iconLeft?: ReactNode;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  iconLeft,
  children,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        button.base,
        variant === "primary" && button.primary,
        variant === "ghost" && button.ghost,
        size === "lg" ? button.lg : button.md,
      )}
    >
      {iconLeft && <span className={button.icon}>{iconLeft}</span>}
      {children}
    </button>
  );
}
