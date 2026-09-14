export type ChapterMentorNotes = Record<number, string>;

type ChapterBoundary = {
  chapter: number;
  start: number;
  contentStart: number;
};

export function appendChapterMentorNotes(
  markdown: string,
  notes: ChapterMentorNotes | undefined,
): string {
  if (!notes || Object.keys(notes).length === 0) return markdown;

  const boundaries: ChapterBoundary[] = Array.from(
    markdown.matchAll(/^## (\d+)\.[^\n]*$/gm),
  ).map((match) => ({
    chapter: Number(match[1]),
    start: match.index,
    contentStart: match.index + match[0].length,
  }));

  let output = markdown;
  for (let index = boundaries.length - 1; index >= 0; index -= 1) {
    const current = boundaries[index];
    const end = boundaries[index + 1]?.start ?? output.length;
    const chapterContent = output.slice(current.contentStart, end);
    const note = notes[current.chapter]?.trim();

    if (!note || chapterContent.includes("**导师解读**")) continue;

    const before = output.slice(0, end).trimEnd();
    const after = output.slice(end);
    output = `${before}\n\n> **导师解读**：${note}${after ? `\n\n${after}` : "\n"}`;
  }

  return output;
}
