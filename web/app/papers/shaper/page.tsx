import type { Metadata } from "next";
import { PaperReaderApp } from "../../components/PaperReaderApp";
import { shaperPaperSections } from "../../data/papers/shaper/paper";
import { shaperEvidenceTargets, shaperReportMarkdown } from "../../data/papers/shaper/report";

export const metadata: Metadata = {
  title: "SHAPER · 导师精读 | Paper Atlas",
  description: "Self-Evolving Embodied Agents via Skill-Harness Evolution 官方来源说明、论文图表与 13 章精读报告。",
};

export default function ShaperPage() {
  return (
    <PaperReaderApp
      paperMeta={{
        slug: "shaper",
        readerLabel: "SHAPER \u00b7 READER",
        eyebrow: "EMBODIED AGENTS \u00b7 SKILL EVOLUTION \u00b7 CONTEXT-CODE HARNESS \u00b7 2026",
        title: "Self-Evolving Embodied Agents via Skill-Harness Evolution",
        authors: "Peidong Wang \u00b7 Zhiming Ma \u00b7 Ying Chang \u00b7 Xufang Luo \u00b7 Xiaocui Yang \u00b7 Shi Feng \u00b7 Yuqing Yang \u00b7 Dongsheng Li",
        affiliations: "Northeastern University \u00b7 Microsoft Research",
        pdfHref: "https://arxiv.org/pdf/2608.11350v1",
        pageCount: 26,
      }}
      sections={shaperPaperSections}
      reportMarkdown={shaperReportMarkdown}
      evidenceTargets={shaperEvidenceTargets}
    />
  );
}
