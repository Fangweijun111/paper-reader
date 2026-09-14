import type { Metadata } from "next";
import { CollectionLandingApp } from "./components/CollectionLandingApp";
import { paperCollections } from "./data/collections";
import { libraryPapers } from "./data/library";
import { summarizeNonEmptyCollections } from "./lib/collections";
import { countPapersByStatus } from "./lib/library";

export const metadata: Metadata = {
  title: "Paper Atlas · 论文精读库",
  description:
    "持续生长的中英双语论文精读库，包含论文状态、证据定位与结构化精读报告。",
};

export default function Home() {
  const collections = summarizeNonEmptyCollections(
    paperCollections,
    libraryPapers,
  );
  const counts = countPapersByStatus(libraryPapers);

  return <CollectionLandingApp collections={collections} counts={counts} />;
}
