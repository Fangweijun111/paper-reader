import type { Metadata } from "next";
import { PaperReaderApp } from "../../components/PaperReaderApp";
import { paperSections } from "../../data/paper";
import { reportMarkdown } from "../../data/report";

export const metadata: Metadata = {
  title: "WorldEvolver · 导师精读 | Paper Atlas",
  description:
    "Self-Evolving World Models for LLM Agent Planning 官方来源说明与 13 章证据绑定精读报告。",
};

export default function WorldEvolverPage() {
  return (
    <PaperReaderApp
      paperMeta={{
        slug: "worldevolver",
        readerLabel: "WORLDEVOLVER · READER",
        eyebrow: "SELF-EVOLVING AGENTS · WORLD MODELS · 2026",
        title: "Self-Evolving World Models for LLM Agent Planning",
        authors: "Xuan Zhang · Wenxuan Zhang · See-Kiong Ng · Yang Deng",
        affiliations:
          "National University of Singapore · Singapore University of Technology and Design · Singapore Management University",
        pdfHref: "https://arxiv.org/pdf/2606.30639v1",
        pageCount: 20,
      }}
      sections={paperSections}
      reportMarkdown={reportMarkdown}
    />
  );
}
