import type { Metadata } from "next";
import { PaperReaderApp } from "../../components/PaperReaderApp";
import { memrlPaperSections } from "../../data/papers/memrl/paper";
import {
  memrlEvidenceTargets,
  memrlReportMarkdown,
} from "../../data/papers/memrl/report";

export const metadata: Metadata = {
  title: "MemRL · 导师精读 | Paper Atlas",
  description:
    "MemRL: Self-Evolving Agents via Runtime Reinforcement Learning on Episodic Memory 官方来源说明、论文图表与 13 章精读报告。",
};

export default function MemRLPage() {
  return (
    <PaperReaderApp
      paperMeta={{
        slug: "memrl",
        readerLabel: "MEMRL · READER",
        eyebrow: "RUNTIME LEARNING · EPISODIC MEMORY · 2026",
        title:
          "MemRL: Self-Evolving Agents via Runtime Reinforcement Learning on Episodic Memory",
        authors:
          "Shengtao Zhang · Jiaqian Wang · Ruiwen Zhou · Junwei Liao · Yuchen Feng · Zhuo Li · Yujie Zheng · Weinan Zhang · Ying Wen · Zhiyu Li · Feiyu Xiong · Yutao Qi · Bo Tang · Muning Wen",
        affiliations:
          "Shanghai Jiao Tong University · Xidian University · National University of Singapore · Shanghai Innovation Institute · MemTensor (Shanghai) Technology · University of Science and Technology of China",
        pdfHref: "https://arxiv.org/pdf/2601.03192v2",
        pageCount: 41,
      }}
      sections={memrlPaperSections}
      reportMarkdown={memrlReportMarkdown}
      evidenceTargets={memrlEvidenceTargets}
    />
  );
}
