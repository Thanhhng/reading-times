"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LibraryReload() {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => start(() => router.refresh())}
      className={cn(buttonVariants({ variant: "outline" }))}
    >
      {pending ? "Đang tải lại…" : "Tải lại"}
    </button>
  );
}
