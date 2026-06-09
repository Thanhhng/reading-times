import { cn } from "@/lib/utils";
import { avatar } from "@/app/classes/ui";

type AvatarProps = {
  initials: string;
  tone?: "accent" | "teal";
  size?: "sm" | "md" | "lg";
};

export function Avatar({ initials, tone = "accent", size = "md" }: AvatarProps) {
  return (
    <span className={cn(avatar.base, avatar[tone], avatar[size])}>
      {initials}
    </span>
  );
}
