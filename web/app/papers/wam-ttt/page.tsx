import type { Metadata } from "next";
import { PaperReaderApp } from "../../components/PaperReaderApp";
import { wamTttPaperSections } from "../../data/papers/wam-ttt/paper";
import {
  wamTttEvidenceTargets,
  wamTttReportMarkdown,
} from "../../data/papers/wam-ttt/report";

export const metadata: Metadata = {
  title: "WAM-TTT · 导师精读 | Paper Atlas",
  description:
    "WAM-TTT 英文原文、自然中文翻译、论文图表与 13 章导师精读报告。",
};

export default function WamTttPage() {
  return (
    <PaperReaderApp
      paperMeta={{
        slug: "wam-ttt",
        readerLabel: "WAM-TTT · READER",
        eyebrow:
          "WORLD ACTION MODEL · TEST-TIME TRAINING · HUMAN VIDEO · 2026",
        title:
          "WAM-TTT: Steering World-Action Models by Watching Human Play at Test Time",
        authors:
          "Yusen Feng · Bingchen Han · Jiangran Lyu · Kai Liu · Yixin Zheng · Yuxuan Wan · Weiheng Liu · Sun Han · Ruiqin Li · Yulong Zhang · Fangfu Liu · Xuesong Shi · Libin Liu · Yizhou Wang · Zhizheng Zhang · He Wang",
        affiliations:
          "Peking University · Galbot · Chinese Academy of Sciences · Tsinghua University",
        pdfHref: "https://arxiv.org/pdf/2607.06988v2",
        pageCount: 28,
      }}
      sections={wamTttPaperSections}
      reportMarkdown={wamTttReportMarkdown}
      evidenceTargets={wamTttEvidenceTargets}
    />
  );
}
