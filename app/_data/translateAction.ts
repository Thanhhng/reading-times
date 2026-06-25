"use server";

import axios from "axios";
import { chunkText } from "./translate";

const SIMPLY_TRANSLATE_URL = "https://simplytranslate.org/api/translate/";
const TRANSLATE_TIMEOUT_MS = 15000;

export type TranslateResult = { result: string } | { error: string };

export async function translateText(
  text: string,
  from = "en",
  to = "vi",
): Promise<TranslateResult> {
  const source = text.trim();
  if (!source) return { error: "Missing text" };
  try {
    const results: string[] = [];
    for (const chunk of chunkText(source)) {
      const { data } = await axios.get<{ translated_text?: string }>(SIMPLY_TRANSLATE_URL, {
        params: { engine: "google", from, to, text: chunk },
        timeout: TRANSLATE_TIMEOUT_MS,
      });
      if (!data.translated_text) throw new Error("Empty translation");
      results.push(data.translated_text);
    }
    return { result: results.join(" ") };
  } catch (error) {
    const message = axios.isAxiosError(error)
      ? error.message
      : error instanceof Error
        ? error.message
        : "Translation failed";
    return { error: message };
  }
}
