const REVALIDATE_SECONDS = 2700;
const FETCH_TIMEOUT_MS = 20000;

export type Chapter = {
  title: string | null;
  paragraphs: string[];
};

const START_RE = /\*\*\*\s*START OF (?:THE|THIS) PROJECT GUTENBERG EBOOK[^*]*\*\*\*/i;
const END_RE = /\*\*\*\s*END OF (?:THE|THIS) PROJECT GUTENBERG EBOOK[^*]*\*\*\*/i;
const HEADING_RE =
  /^(?:(?:chapter|part|book|stave|act|scene|canto|letter|section)\b.{0,80}|[IVXLCDM]+\.?)$/i;

export function stripGutenbergBoilerplate(raw: string): string {
  let text = raw;
  const start = text.match(START_RE);
  if (start?.index != null) text = text.slice(start.index + start[0].length);
  const end = text.match(END_RE);
  if (end?.index != null) text = text.slice(0, end.index);
  return text.trim();
}

export function toParagraphs(text: string): string[] {
  return text
    .split(/\r?\n\s*\r?\n+/)
    .map((block) => block.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

export function toChapters(paragraphs: string[]): Chapter[] {
  const chapters: Chapter[] = [];
  let current: Chapter = { title: null, paragraphs: [] };
  for (const paragraph of paragraphs) {
    if (paragraph.length <= 90 && HEADING_RE.test(paragraph)) {
      if (current.title || current.paragraphs.length) chapters.push(current);
      current = { title: paragraph, paragraphs: [] };
    } else {
      current.paragraphs.push(paragraph);
    }
  }
  if (current.title || current.paragraphs.length) chapters.push(current);
  return chapters;
}

export function countWords(chapters: Chapter[]): number {
  return chapters.reduce(
    (sum, chapter) =>
      sum +
      chapter.paragraphs.reduce(
        (inner, paragraph) => inner + paragraph.split(" ").length,
        0,
      ),
    0,
  );
}

export async function fetchReadingText(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    return stripGutenbergBoilerplate(await res.text());
  } catch {
    return null;
  }
}
