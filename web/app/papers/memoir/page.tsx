import type { Metadata } from "next";
import { PaperReaderApp } from "../../components/PaperReaderApp";
import { memoirPaperSections } from "../../data/papers/memoir/paper";
import { memoirEvidenceTargets, memoirReportMarkdown } from "../../data/papers/memoir/report";

export const metadata: Metadata = {
  title: "Memoir / Dream to Recall · 双语精读 | Paper Atlas",
  description: "Dream to Recall: Imagination-Guided Experience Retrieval for Memory-Persistent Vision-and-Language Navigation 英文原文、中文翻译、论文图表与 13 章精读报告。",
};

export default function MemoirPage() {
  return (
    <PaperReaderApp
      paperMeta={{
        slug: "memoir",
        readerLabel: "MEMOIR \u00b7 READER",
        eyebrow: "VISION-LANGUAGE NAVIGATION \u00b7 WORLD MODEL \u00b7 PERSISTENT MEMORY \u00b7 2026",
        title: "Dream to Recall: Imagination-Guided Experience Retrieval for Memory-Persistent Vision-and-Language Navigation",
        authors: "Yunzhe Xu \u00b7 Yiyuan Pan \u00b7 Zhe Liu",
        affiliations: "Shanghai Jiao Tong University",
        pdfHref: "/papers/memoir.pdf",
        pageCount: 21,
      }}
      sections={memoirPaperSections}
      reportMarkdown={memoirReportMarkdown}
      evidenceTargets={memoirEvidenceTargets}
    />
  );
}
