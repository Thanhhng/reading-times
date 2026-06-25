"use client";

import { useSyncExternalStore } from "react";
import { translateText } from "@/app/_data/translateAction";

export type Highlight = {
  id: string;
  start: number;
  end: number;
  source: string;
  status: "loading" | "done" | "error";
  text?: string;
  message?: string;
};

export type Range = { start: number; end: number; source: string };

type Store = {
  subscribe: (cb: () => void) => () => void;
  get: (pid: string) => Highlight[] | undefined;
  translate: (pid: string, range: Range) => void;
  retry: (pid: string, id: string) => void;
  dismiss: (pid: string, id: string) => void;
};

function createStore(): Store {
  const map = new Map<string, Highlight[]>();
  const cache = new Map<string, string>();
  const listeners = new Set<() => void>();
  let seq = 0;
  const emit = () => listeners.forEach((l) => l());

  const setList = (pid: string, list: Highlight[]) => {
    map.set(pid, list);
    emit();
  };

  const patch = (pid: string, id: string, fields: Partial<Highlight>) => {
    const list = map.get(pid);
    if (!list) return;
    setList(pid, list.map((h) => (h.id === id ? { ...h, ...fields } : h)));
  };

  async function run(pid: string, id: string, source: string) {
    const hit = cache.get(source);
    if (hit) {
      patch(pid, id, { status: "done", text: hit });
      return;
    }
    const data = await translateText(source);
    if ("result" in data) {
      cache.set(source, data.result);
      patch(pid, id, { status: "done", text: data.result });
    } else {
      patch(pid, id, { status: "error", message: data.error });
    }
  }

  return {
    subscribe(cb) {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    get(pid) {
      return map.get(pid);
    },
    translate(pid, range) {
      const id = `${++seq}`;
      const kept = (map.get(pid) ?? []).filter(
        (h) => h.end <= range.start || h.start >= range.end,
      );
      const next = [...kept, { id, ...range, status: "loading" as const }].sort(
        (a, b) => a.start - b.start,
      );
      setList(pid, next);
      void run(pid, id, range.source);
    },
    retry(pid, id) {
      const current = map.get(pid)?.find((h) => h.id === id);
      if (!current) return;
      patch(pid, id, { status: "loading", message: undefined });
      void run(pid, id, current.source);
    },
    dismiss(pid, id) {
      const list = map.get(pid);
      if (list) setList(pid, list.filter((h) => h.id !== id));
    },
  };
}

export const store = createStore();

export function useHighlights(pid: string): Highlight[] | undefined {
  return useSyncExternalStore(
    store.subscribe,
    () => store.get(pid),
    () => undefined,
  );
}
