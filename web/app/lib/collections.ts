import type {
  CollectionSlug,
  LibraryPaper,
  PaperCollection,
} from "./library";

export type CollectionSummary = PaperCollection & {
  paperCount: number;
  latestUpdate: string;
  href: string;
};

export function papersForCollection(
  papers: LibraryPaper[],
  slug: CollectionSlug,
): LibraryPaper[] {
  return papers.filter((paper) => paper.collection === slug);
}

export function summarizeNonEmptyCollections(
  collections: PaperCollection[],
  papers: LibraryPaper[],
): CollectionSummary[] {
  return collections
    .map((collection) => {
      const matches = papersForCollection(papers, collection.slug);

      return {
        ...collection,
        paperCount: matches.length,
        latestUpdate:
          matches.map((paper) => paper.updatedAt).sort().at(-1) ?? "",
        href: `/collections/${collection.slug}`,
      };
    })
    .filter((collection) => collection.paperCount > 0)
    .sort((left, right) => left.order - right.order);
}
