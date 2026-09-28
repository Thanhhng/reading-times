"use client";

import { ServiceError } from "@/components/ui/ServiceError";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return <ServiceError error={error} retry={unstable_retry} title="We couldn’t load this book" />;
}
