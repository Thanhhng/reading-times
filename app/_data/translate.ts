export const TRANSLATE_CHAR_LIMIT = 500;

export function chunkText(text: string, max = TRANSLATE_CHAR_LIMIT): string[] {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return [];
  if (clean.length <= max) return [clean];

  const sentences = clean.match(/[^.!?…]+[.!?…]*\s*/g) ?? [clean];
  const chunks: string[] = [];
  let current = "";
  for (const sentence of sentences) {
    if (sentence.length > max) {
      if (current.trim()) {
        chunks.push(current.trim());
        current = "";
      }
      chunks.push(...hardSplit(sentence, max));
      continue;
    }
    if ((current + sentence).length > max) {
      if (current.trim()) chunks.push(current.trim());
      current = sentence;
    } else {
      current += sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

function hardSplit(text: string, max: number): string[] {
  const out: string[] = [];
  let current = "";
  for (const word of text.trim().split(/\s+/)) {
    if (word.length > max) {
      if (current) {
        out.push(current);
        current = "";
      }
      for (let i = 0; i < word.length; i += max) out.push(word.slice(i, i + max));
      continue;
    }
    const next = current ? `${current} ${word}` : word;
    if (next.length > max) {
      out.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) out.push(current);
  return out;
}
