import type { Metadata } from "next";
import { PaperReaderApp } from "../../components/PaperReaderApp";
import { onEvoMemoryPaperSections } from "../../data/papers/onevomemory/paper";
import { onEvoMemoryEvidenceTargets, onEvoMemoryReportMarkdown } from "../../data/papers/onevomemory/report";

export const metadata: Metadata = {
  title: "OnEvoMemory · 导师精读 | Paper Atlas",
  description: "OnEvoMemory: Evolving Memory through Online Robot Rollouts for Pretrained Robot Policies 官方来源说明、论文图表与 13 章精读报告。",
};

export default function OnEvoMemoryPage() {
  return (
    <PaperReaderApp
      paperMeta={{
        slug: "onevomemory",
        readerLabel: "ONEVOMEMORY \u00b7 READER",
        eyebrow: "ROBOT POLICY \u00b7 VALUE-GUIDED MEMORY \u00b7 ONLINE ROLLOUTS \u00b7 2026",
        title: "OnEvoMemory: Evolving Memory through Online Robot Rollouts for Pretrained Robot Policies",
        authors: "Zhongxi Chen \u00b7 Shenqi Zong",
        affiliations: "Shanghai Jiao Tong University \u00b7 Tsinghua University",
        pdfHref: "https://arxiv.org/pdf/2608.08749v1",
        pageCount: 6,
      }}
      sections={onEvoMemoryPaperSections}
      reportMarkdown={onEvoMemoryReportMarkdown}
      evidenceTargets={onEvoMemoryEvidenceTargets}
    />
  );
}
