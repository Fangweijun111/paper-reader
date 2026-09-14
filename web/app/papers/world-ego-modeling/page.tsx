import type { Metadata } from "next";
import { PaperReaderApp } from "../../components/PaperReaderApp";
import { wemPaperSections } from "../../data/wem-paper";
import {
  wemEvidenceTargets,
  wemReportMarkdown,
} from "../../data/wem-report";

export const metadata: Metadata = {
  title: "World-Ego Modeling · 双语精读 | Paper Atlas",
  description:
    "World-Ego Modeling for Long-Horizon Evolution in Hybrid Embodied Tasks 英文原文、中文翻译与 13 章证据绑定精读报告。",
};

export default function WorldEgoModelingPage() {
  return (
    <PaperReaderApp
      evidenceTargets={wemEvidenceTargets}
      paperMeta={{
        slug: "world-ego-modeling",
        readerLabel: "WEM · READER",
        eyebrow: "EMBODIED WORLD MODELS · HYBRID TASKS · 2026",
        title:
          "World-Ego Modeling for Long-Horizon Evolution in Hybrid Embodied Tasks",
        authors:
          "Zuyao Lin · Jianhui Zhang · Peidong Jia · Xiaoguang Zhao · Shanghang Zhang · Xingyu Chen",
        affiliations:
          "Institute of Automation, Chinese Academy of Sciences · University of Chinese Academy of Sciences · Zhongguancun Academy · Shanghai Jiaotong University · Peking University",
        pdfHref: "/papers/world-ego-modeling.pdf",
        pageCount: 22,
      }}
      reportMarkdown={wemReportMarkdown}
      sections={wemPaperSections}
    />
  );
}
