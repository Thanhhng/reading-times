"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { serviceError as c } from "@/app/classes/ui";

export function ServiceError({
  error,
  retry,
  title,
}: {
  error: Error & { digest?: string };
  retry: () => void;
  title: string;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={c.root} role="alert">
      <h1 className={c.title}>{title}</h1>
      <p className={c.text}>
        The book service didn’t respond. Check that the Gutendex server is running at
        127.0.0.1:8000, then try again.
      </p>
      <div className={c.actions}>
        <button type="button" onClick={retry} className={cn(buttonVariants({ size: "lg" }))}>
          <RotateCw />
          Try again
        </button>
        <Link href="/library" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
          Back to library
        </Link>
      </div>
    </div>
  );
}
