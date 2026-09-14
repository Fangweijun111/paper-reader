import type { Metadata } from "next";
import { PaperReaderApp } from "../../components/PaperReaderApp";
import { risePaperSections } from "../../data/papers/rise/paper";
import { riseEvidenceTargets, riseReportMarkdown } from "../../data/papers/rise/report";

export const metadata: Metadata = {
  title: "RISE · 导师精读 | Paper Atlas",
  description: "RISE: Self-Improving Robot Policy with Compositional World Model 官方来源说明、论文图表与 13 章精读报告。",
};

export default function RisePage() {
  return (
    <PaperReaderApp
      paperMeta={{
        slug: "rise",
        readerLabel: "RISE \u00b7 READER",
        eyebrow: "ROBOT RL \u00b7 WORLD MODEL \u00b7 2026",
        title: "RISE: Self-Improving Robot Policy with Compositional World Model",
        authors: "Jiazhi Yang \u00b7 Kunyang Lin \u00b7 Jinwei Li \u00b7 Wencong Zhang \u00b7 Tianwei Lin \u00b7 Longyan Wu \u00b7 Zhizhong Su \u00b7 Hao Zhao \u00b7 Ya-Qin Zhang \u00b7 Li Chen \u00b7 Ping Luo \u00b7 Xiangyu Yue \u00b7 Hongyang Li",
        affiliations: "The Chinese University of Hong Kong \u00b7 Kinetix AI \u00b7 The University of Hong Kong \u00b7 Shanghai Innovation Institute \u00b7 Horizon Robotics \u00b7 Tsinghua University",
        pdfHref: "https://arxiv.org/pdf/2602.11075v2",
        pageCount: 21,
      }}
      sections={risePaperSections}
      reportMarkdown={riseReportMarkdown}
      evidenceTargets={riseEvidenceTargets}
    />
  );
}
