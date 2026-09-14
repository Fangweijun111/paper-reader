import type { Metadata } from "next";
import { PaperReaderApp } from "../../components/PaperReaderApp";
import { labEvolverPaperSections } from "../../data/papers/labevolver/paper";
import { labEvolverEvidenceTargets, labEvolverReportMarkdown } from "../../data/papers/labevolver/report";

export const metadata: Metadata = {
  title: "LabEvolver · 导师精读 | Paper Atlas",
  description: "LabEvolver: Training-Free Experience Evolution for Safe and Grounded Wet-Lab Agents 官方来源说明、论文图表与 13 章精读报告。",
};

export default function LabEvolverPage() {
  return (
    <PaperReaderApp
      paperMeta={{
        slug: "labevolver",
        readerLabel: "LABEVOLVER \u00b7 READER",
        eyebrow: "WET-LAB AGENTS \u00b7 EXPERIENCE EVOLUTION \u00b7 TRAINING-FREE \u00b7 2026",
        title: "LabEvolver: Training-Free Experience Evolution for Safe and Grounded Wet-Lab Agents",
        authors: "Jingya Wang \u00b7 Yuyang Gao \u00b7 Liuzhenghao Lv \u00b7 Yonghong Tian \u00b7 Yuyang Liu",
        affiliations: "Peking University",
        pdfHref: "https://arxiv.org/pdf/2607.27690v2",
        pageCount: 12,
      }}
      sections={labEvolverPaperSections}
      reportMarkdown={labEvolverReportMarkdown}
      evidenceTargets={labEvolverEvidenceTargets}
    />
  );
}
