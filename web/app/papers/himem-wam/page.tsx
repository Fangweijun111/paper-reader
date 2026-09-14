import type { Metadata } from "next";
import { PaperReaderApp } from "../../components/PaperReaderApp";
import { hiMemWamPaperSections } from "../../data/papers/himem-wam/paper";
import { hiMemWamEvidenceTargets, hiMemWamReportMarkdown } from "../../data/papers/himem-wam/report";

export const metadata: Metadata = {
  title: "HiMem-WAM · 导师精读 | Paper Atlas",
  description: "HiMem-WAM: Hierarchical Memory-Gated World Action Models for Robotic Manipulation 官方来源说明、论文图表与 13 章精读报告。",
};

export default function HiMemWamPage() {
  return (
    <PaperReaderApp
      paperMeta={{
        slug: "himem-wam",
        readerLabel: "HiMem-WAM \u00b7 READER",
        eyebrow: "ROBOT MANIPULATION \u00b7 WORLD ACTION MODEL \u00b7 MEMORY \u00b7 2026",
        title: "HiMem-WAM: Hierarchical Memory-Gated World Action Models for Robotic Manipulation",
        authors: "Xiaoquan Sun \u00b7 Ruijian Zhang \u00b7 Chen Cao \u00b7 Yihan Sun \u00b7 Jiahui Chen \u00b7 Zetian Xu \u00b7 Bo Chen \u00b7 Haijier Chen \u00b7 Zhen Yang \u00b7 Jiarun Zhu \u00b7 Yijun Hong \u00b7 JingZhe Xu \u00b7 Jingrui Pang \u00b7 Mingqi Yuan \u00b7 Jiayu Chen",
        affiliations: "The University of Hong Kong \u00b7 INFIFORCE \u00b7 Huazhong University of Science and Technology \u00b7 Tsinghua University \u00b7 Wuhan University \u00b7 Southern University of Science and Technology",
        pdfHref: "https://arxiv.org/pdf/2606.10363v1",
        pageCount: 19,
      }}
      sections={hiMemWamPaperSections}
      reportMarkdown={hiMemWamReportMarkdown}
      evidenceTargets={hiMemWamEvidenceTargets}
    />
  );
}
