import type { Metadata } from "next";
import { PaperReaderApp } from "../../components/PaperReaderApp";
import { retrieveThenSteerPaperSections } from "../../data/papers/retrieve-then-steer/paper";
import { retrieveThenSteerEvidenceTargets, retrieveThenSteerReportMarkdown } from "../../data/papers/retrieve-then-steer/report";

export const metadata: Metadata = {
  title: "Retrieve-then-Steer · 导师精读 | Paper Atlas",
  description: "Retrieve-then-Steer: Online Success Memory for Test-Time Adaptation of Generative VLAs 官方来源说明、论文图表与 13 章精读报告。",
};

export default function RetrieveThenSteerPage() {
  return (
    <PaperReaderApp
      paperMeta={{
        slug: "retrieve-then-steer",
        readerLabel: "RETRIEVE-THEN-STEER \u00b7 READER",
        eyebrow: "GENERATIVE VLA \u00b7 ONLINE SUCCESS MEMORY \u00b7 TEST-TIME ADAPTATION \u00b7 2026",
        title: "Retrieve-then-Steer: Online Success Memory for Test-Time Adaptation of Generative VLAs",
        authors: "Jianchao Zhao \u00b7 Huoren Yang \u00b7 Yusong Hu \u00b7 Yuyang Gao \u00b7 Qiguan Ou \u00b7 Cong Wan \u00b7 SongLin Dong \u00b7 Zhiheng Ma \u00b7 Yihong Gong",
        affiliations: "Xi'an Jiaotong University \u00b7 One Robotics \u00b7 Shenzhen University of Advanced Technology",
        pdfHref: "https://arxiv.org/pdf/2605.10094v2",
        pageCount: 19,
      }}
      sections={retrieveThenSteerPaperSections}
      reportMarkdown={retrieveThenSteerReportMarkdown}
      evidenceTargets={retrieveThenSteerEvidenceTargets}
    />
  );
}
