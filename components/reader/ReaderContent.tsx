import { reader as c } from "@/app/classes/reader";
import type { Sentence } from "@/app/_data/sentences";
import { BilingualSentence } from "./BilingualSentence";

export type ReaderMode = "full" | "chapter" | "scroll";

function countWords(text: string): number {
  return text.trim().split(/\s+/).length;
}

function groupScreens(sentences: Sentence[], perScreen = 75): Sentence[][] {
  const screens: Sentence[][] = [];
  let current: Sentence[] = [];
  let count = 0;
  for (const sentence of sentences) {
    current.push(sentence);
    count += countWords(sentence.src);
    if (count >= perScreen) {
      screens.push(current);
      current = [];
      count = 0;
    }
  }
  if (current.length) screens.push(current);
  return screens;
}

export function ReaderContent({
  mode,
  sentences,
  chapterTitle,
}: {
  mode: ReaderMode;
  sentences: Sentence[];
  chapterTitle: string;
}) {
  if (mode === "scroll") {
    const screens = groupScreens(sentences);
    return (
      <div className={c.col}>
        {screens.map((screen, i) => (
          <div key={screen[0].id} className={c.screen}>
            <p className={c.para}>
              {screen.map((s) => (
                <BilingualSentence key={s.id} src={s.src} tgt={s.tgt} />
              ))}
            </p>
            <div className={c.screenFoot}>
              {i + 1} / {screens.length}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={c.col}>
      {mode === "chapter" && <div className={c.chapterTitle}>{chapterTitle}</div>}
      <p className={c.para}>
        {sentences.map((s) => (
          <BilingualSentence key={s.id} src={s.src} tgt={s.tgt} />
        ))}
      </p>
    </div>
  );
}
