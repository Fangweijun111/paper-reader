export type LanguageMode = "parallel" | "english" | "chinese";

export type ReadingState = {
  splitPercent: number;
  languageMode: LanguageMode;
  paperBlockId: string;
  reportSectionId: string;
  collapsedSections: string[];
};

export const DEFAULT_READING_STATE: ReadingState = {
  splitPercent: 65,
  languageMode: "parallel",
  paperBlockId: "abstract",
  reportSectionId: "report-1",
  collapsedSections: [
    "appendix-a",
    "appendix-b",
    "appendix-c",
    "appendix-d",
    "references",
  ],
};

export function parseReadingState(raw: string | null): ReadingState {
  if (!raw) return DEFAULT_READING_STATE;
  try {
    const parsed = JSON.parse(raw) as Partial<ReadingState>;
    const mode: LanguageMode =
      parsed.languageMode === "english" || parsed.languageMode === "chinese"
        ? parsed.languageMode
        : "parallel";
    const split =
      typeof parsed.splitPercent === "number"
        ? Math.min(78, Math.max(48, parsed.splitPercent))
        : 65;
    return {
      splitPercent: split,
      languageMode: mode,
      paperBlockId:
        typeof parsed.paperBlockId === "string"
          ? parsed.paperBlockId
          : "abstract",
      reportSectionId:
        typeof parsed.reportSectionId === "string"
          ? parsed.reportSectionId
          : "report-1",
      collapsedSections: Array.isArray(parsed.collapsedSections)
        ? parsed.collapsedSections.filter((item): item is string => {
            return typeof item === "string";
          })
        : DEFAULT_READING_STATE.collapsedSections,
    };
  } catch {
    return DEFAULT_READING_STATE;
  }
}

export function serializeReadingState(state: ReadingState) {
  return JSON.stringify(state);
}
