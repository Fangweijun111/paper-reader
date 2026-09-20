import type { Metadata } from "next";
import { PaperLibraryApp } from "../../components/PaperLibraryApp";
import { paperCollections } from "../../data/collections";
import { libraryPapers } from "../../data/library";
import { papersForCollection } from "../../lib/collections";

const collection = paperCollections.find(item => item.slug === "latent-reasoning")!;

export const metadata: Metadata = {
  title: "潜空间推理 · Latent Reasoning | Paper Atlas",
  description: collection.description,
};

export default function LatentReasoningCollectionPage() {
  return <PaperLibraryApp backHref="/" collection={collection}
    papers={papersForCollection(libraryPapers, "latent-reasoning")} />;
}
