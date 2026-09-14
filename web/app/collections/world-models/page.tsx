import type { Metadata } from "next";
import { PaperLibraryApp } from "../../components/PaperLibraryApp";
import { paperCollections } from "../../data/collections";
import { libraryPapers } from "../../data/library";
import { papersForCollection } from "../../lib/collections";

const collection = paperCollections.find(
  (item) => item.slug === "world-models",
)!;

export const metadata: Metadata = {
  title: "世界模型 · World Models | Paper Atlas",
  description: collection.description,
};

export default function WorldModelsCollectionPage() {
  const papers = papersForCollection(libraryPapers, "world-models");

  return (
    <PaperLibraryApp
      backHref="/"
      collection={collection}
      papers={papers}
    />
  );
}
