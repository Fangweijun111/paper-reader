import type { Metadata } from "next";
import { PaperReaderApp } from "../../components/PaperReaderApp";
import { robomemoryPaperSections } from "../../data/papers/robomemory/paper";
import { robomemoryEvidenceTargets, robomemoryReportMarkdown } from "../../data/papers/robomemory/report";

export const metadata: Metadata = {
  title: "RoboMemory · 双语精读 | Paper Atlas",
  description: "RoboMemory: A Brain-inspired Multi-memory Agentic Framework for Interactive Environmental Learning in Physical Embodied Systems 英文原文、中文翻译、论文图表与 13 章精读报告。",
};

export default function RoboMemoryPage() {
  return (
    <PaperReaderApp
      paperMeta={{
        slug: "robomemory",
        readerLabel: "ROBOMEMORY \u00b7 READER",
        eyebrow: "EMBODIED MEMORY \u00b7 LIFELONG LEARNING \u00b7 2026",
        title: "RoboMemory: A Brain-inspired Multi-memory Agentic Framework for Interactive Environmental Learning in Physical Embodied Systems",
        authors: "Mingcong Lei \u00b7 Honghao Cai \u00b7 Yuyuan Yang \u00b7 Yimou Wu \u00b7 Jinke Ren \u00b7 Zezhou Cui \u00b7 Liangchen Tan \u00b7 Junkun Hong \u00b7 Gehan Hu \u00b7 Shuangyu Zhu \u00b7 Shaohan Jiang \u00b7 Ge Wang \u00b7 Junyuan Tan \u00b7 Zhenglin Wan \u00b7 Zheng Li \u00b7 Zhen Li \u00b7 Shuguang Cui \u00b7 Yiming Zhao \u00b7 Yatong Han",
        affiliations: "FNii-Shenzhen \u00b7 SSE, CUHK-Shenzhen \u00b7 The Chinese University of Hong Kong, Shenzhen \u00b7 The University of Hong Kong \u00b7 National University of Singapore \u00b7 The Chinese University of Hong Kong \u00b7 Ising AI",
        pdfHref: "/papers/robomemory.pdf",
        pageCount: 24,
      }}
      sections={robomemoryPaperSections}
      reportMarkdown={robomemoryReportMarkdown}
      evidenceTargets={robomemoryEvidenceTargets}
    />
  );
}
