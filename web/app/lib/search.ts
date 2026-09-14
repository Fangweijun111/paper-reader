import type { PaperSection } from "./content";

export type SearchSource = "paper-en" | "paper-zh" | "report";

export type SearchRecord = {
  id: string;
  source: SearchSource;
  sectionId: string;
  label: string;
  text: string;
};

export type SearchResult = SearchRecord & {
  excerpt: string;
  score: number;
};

function normalize(value: string) {
  return value.toLocaleLowerCase().replace(/\s+/g, " ").trim();
}

function excerpt(text: string, query: string) {
  const flat = text.replace(/\s+/g, " ").trim();
  const index = normalize(flat).indexOf(query);
  const start = Math.max(0, index - 42);
  const end = Math.min(flat.length, index + query.length + 88);
  return `${start > 0 ? "…" : ""}${flat.slice(start, end)}${
    end < flat.length ? "…" : ""
  }`;
}

export function buildSearchIndex(
  sections: PaperSection[],
  reportMarkdown: string,
): SearchRecord[] {
  const records: SearchRecord[] = [];

  for (const section of sections) {
    for (const block of section.blocks) {
      records.push({
        id: block.id,
        source: "paper-en",
        sectionId: section.id,
        label: block.label || section.titleEn,
        text: block.english,
      });
      records.push({
        id: block.id,
        source: "paper-zh",
        sectionId: section.id,
        label: block.label || section.titleZh,
        text: block.chinese,
      });
    }
  }

  const chunks = reportMarkdown.split(/^## /gm).slice(1);
  chunks.forEach((chunk, index) => {
    const [heading = `报告 ${index + 1}`, ...body] = chunk.split("\n");
    records.push({
      id: `report-${index + 1}`,
      source: "report",
      sectionId: `report-${index + 1}`,
      label: heading.replace(/\s+$/, ""),
      text: body.join("\n"),
    });
  });

  return records;
}

export function searchRecords(
  records: SearchRecord[],
  input: string,
): SearchResult[] {
  const query = normalize(input);
  if (!query) return [];

  return records
    .flatMap((record) => {
      const haystack = normalize(`${record.label} ${record.text}`);
      const position = haystack.indexOf(query);
      if (position < 0) return [];
      const labelMatch = normalize(record.label).includes(query);
      const starts = haystack.startsWith(query);
      return [
        {
          ...record,
          excerpt: excerpt(record.text, query),
          score: (labelMatch ? 100 : 0) + (starts ? 25 : 0) - position / 1000,
        },
      ];
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 40);
}
