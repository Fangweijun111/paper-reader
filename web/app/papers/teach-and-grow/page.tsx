import type { Metadata } from "next";
import { PaperReaderApp } from "../../components/PaperReaderApp";
import { teachAndGrowPaperSections } from "../../data/papers/teach-and-grow/paper";
import { teachAndGrowEvidenceTargets, teachAndGrowMentoredReportMarkdown } from "../../data/papers/teach-and-grow/report";

export const metadata: Metadata = {
  title: "Teach and Grow · 导师精读 | Paper Atlas",
  description: "Teach and Grow: An Agent-Centered Architecture for General Robot Learning 官方来源说明、论文图表与 13 章精读报告。",
};

export default function TeachAndGrowPage() {
  return (
    <PaperReaderApp
      paperMeta={{
        slug: "teach-and-grow",
        readerLabel: "TEACH AND GROW \u00b7 READER",
        eyebrow: "ROBOT LEARNING \u00b7 SKILL LIBRARY \u00b7 EXPERIENCE MEMORY \u00b7 2026",
        title: "Teach and Grow: An Agent-Centered Architecture for General Robot Learning",
        authors: "Chang Nie \u00b7 Zhe Liu \u00b7 Hesheng Wang",
        affiliations: "Shanghai Jiao Tong University \u00b7 Shanghai Key Laboratory of Navigation and Location Based Services",
        pdfHref: "https://arxiv.org/pdf/2608.17209v1",
        pageCount: 17,
      }}
      sections={teachAndGrowPaperSections}
      reportMarkdown={teachAndGrowMentoredReportMarkdown}
      evidenceTargets={teachAndGrowEvidenceTargets}
    />
  );
}
