export type PaperBlockKind =
  | "heading"
  | "paragraph"
  | "equation"
  | "algorithm"
  | "table"
  | "figure-caption";

export type PaperBlock = {
  id: string;
  sectionId: string;
  kind: PaperBlockKind;
  label?: string;
  english: string;
  chinese: string;
  imageSrc?: string;
  imageAlt?: string;
  evidenceKeys?: string[];
};

export type PaperSection = {
  id: string;
  number?: string;
  titleEn: string;
  titleZh: string;
  collapsedByDefault: boolean;
  blocks: PaperBlock[];
};

export type ReaderPaperMeta = {
  slug: string;
  readerLabel: string;
  eyebrow: string;
  title: string;
  authors: string;
  affiliations: string;
  pdfHref: string;
  pageCount: number;
};

export function validatePaperSections(sections: PaperSection[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();

  for (const section of sections) {
    if (!section.blocks.length) errors.push(`empty-section:${section.id}`);
    for (const block of section.blocks) {
      if (ids.has(block.id)) errors.push(`duplicate:${block.id}`);
      ids.add(block.id);
      if (!block.english.trim()) errors.push(`missing-en:${block.id}`);
      if (!block.chinese.trim()) errors.push(`missing-zh:${block.id}`);
      if (block.sectionId !== section.id) {
        errors.push(`section-mismatch:${block.id}`);
      }
    }
  }

  return errors;
}
