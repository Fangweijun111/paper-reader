import type { Metadata } from "next";
import { PaperReaderApp } from "../../components/PaperReaderApp";
import { zettaPaperSections } from "../../data/papers/zetta/paper";
import {
  zettaEvidenceTargets,
  zettaReportMarkdown,
} from "../../data/papers/zetta/report";

export const metadata: Metadata = {
  title: "Zetta ζ · 双语精读 | Paper Atlas",
  description:
    "Zetta 全文中英对照、15 张原图、5 张表、16 个公式与 13 章导师精读；拆解冻结策略的闭环恢复、累计演化证据和复现边界。",
};

export default function ZettaPage() {
  return (
    <PaperReaderApp
      paperMeta={{
        slug: "zetta",
        readerLabel: "ZETTA ζ · READER",
        eyebrow: "EMBODIED AGENTS · RUNTIME CRITICS · SELF-EVOLUTION · 2026",
        title:
          "Zetta ζ: An Efficient Closed-Loop Embodied Harness for Self-Evolving Physical Intelligence",
        authors:
          "Xin Ding · Liang Mi · Mingzhe Huang · Zixuan Wang · Chao Zhang · Zixu Hao · Fu Chen · Xiangyu Li · Yikai Zheng · Yaoyu Guo · Weijun Wang · Kun Li · Hao Wu · Yunxin Liu · Ting Cao",
        affiliations: "AIR, Tsinghua University · Z-Trans AI",
        pdfHref: "/papers/zetta.pdf",
        pageCount: 47,
      }}
      sections={zettaPaperSections}
      reportMarkdown={zettaReportMarkdown}
      evidenceTargets={zettaEvidenceTargets}
    />
  );
}
