"use client";

import { useSyncExternalStore } from "react";
import { translateText } from "@/app/_data/translateAction";

export type TransEntry =
  | { status: "loading"; source: string }
  | { status: "done"; source: string; text: string }
  | { status: "error"; source: string; message: string };

type Store = {
  subscribe: (cb: () => void) => () => void;
  get: (pid: string) => TransEntry | undefined;
  translate: (pid: string, source: string) => void;
  dismiss: (pid: string) => void;
};

function createStore(): Store {
  const map = new Map<string, TransEntry>();
  const cache = new Map<string, string>();
  const listeners = new Set<() => void>();
  const emit = () => listeners.forEach((l) => l());

  async function run(pid: string, source: string) {
    const cached = cache.get(source);
    if (cached) {
      map.set(pid, { status: "done", source, text: cached });
      emit();
      return;
    }
    map.set(pid, { status: "loading", source });
    emit();
    const data = await translateText(source);
    if ("result" in data) {
      cache.set(source, data.result);
      map.set(pid, { status: "done", source, text: data.result });
    } else {
      map.set(pid, { status: "error", source, message: data.error });
    }
    emit();
  }

  return {
    subscribe(cb) {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    get(pid) {
      return map.get(pid);
    },
    translate(pid, source) {
      void run(pid, source);
    },
    dismiss(pid) {
      map.delete(pid);
      emit();
    },
  };
}

export const store = createStore();

export function useTranslationEntry(pid: string): TransEntry | undefined {
  return useSyncExternalStore(
    store.subscribe,
    () => store.get(pid),
    () => undefined,
  );
}
