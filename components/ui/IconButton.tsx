import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { iconButton } from "@/app/classes/ui";

type IconButtonProps = ComponentProps<"button"> & {
  variant?: "outline" | "ghost" | "soft";
};

export function IconButton({
  variant = "ghost",
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn(iconButton.base, iconButton[variant], className)}
      {...props}
    />
  );
}
