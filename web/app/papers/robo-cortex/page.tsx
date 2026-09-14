import type { Metadata } from "next";
import { PaperReaderApp } from "../../components/PaperReaderApp";
import { roboCortexPaperSections } from "../../data/papers/robo-cortex/paper";
import { roboCortexEvidenceTargets, roboCortexReportMarkdown } from "../../data/papers/robo-cortex/report";

export const metadata: Metadata = {
  title: "Robo-Cortex · 导师精读 | Paper Atlas",
  description: "Robo-Cortex: A Self-Evolving Embodied Agent via Dual-Grain Cognitive Memory and Autonomous Knowledge Induction 官方来源说明、论文图表与 13 章精读报告。",
};

export default function RoboCortexPage() {
  return (
    <PaperReaderApp
      paperMeta={{
        slug: "robo-cortex",
        readerLabel: "ROBO-CORTEX \u00b7 READER",
        eyebrow: "EMBODIED NAVIGATION \u00b7 COGNITIVE MEMORY \u00b7 KNOWLEDGE INDUCTION \u00b7 2026",
        title: "Robo-Cortex: A Self-Evolving Embodied Agent via Dual-Grain Cognitive Memory and Autonomous Knowledge Induction",
        authors: "Nga Teng Chan \u00b7 Yi Zhang \u00b7 Yechi Liu \u00b7 Renwen Cui \u00b7 Fanhu Zeng \u00b7 Zeyuan Ding \u00b7 Xiancong Ren \u00b7 Zhang Zhang \u00b7 Qifeng Chen \u00b7 Jian Liu \u00b7 Yong Dai \u00b7 Xiaozhu Ju",
        affiliations: "HKUST \u00b7 Institute of Automation, CAS \u00b7 X-Humanoid \u00b7 Beihang University",
        pdfHref: "https://arxiv.org/pdf/2605.18729v1",
        pageCount: 15,
      }}
      sections={roboCortexPaperSections}
      reportMarkdown={roboCortexReportMarkdown}
      evidenceTargets={roboCortexEvidenceTargets}
    />
  );
}
