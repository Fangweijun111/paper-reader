import type { Metadata } from "next";
import { PaperReaderApp } from "../../components/PaperReaderApp";
import { vJepa2PaperSections } from "../../data/papers/v-jepa-2/paper";
import { vJepa2EvidenceTargets, vJepa2ReportMarkdown } from "../../data/papers/v-jepa-2/report";

export const metadata: Metadata = {
  title: "V-JEPA 2 · 双语精读 | Paper Atlas",
  description: "V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning 英文原文、中文翻译、论文图表与 13 章精读报告。",
};

export default function VJepa2Page() {
  return (
    <PaperReaderApp
      paperMeta={{
        slug: "v-jepa-2",
        readerLabel: "V-JEPA 2 \u00b7 READER",
        eyebrow: "VIDEO JEPA \u00b7 ROBOT PLANNING \u00b7 2025",
        title: "V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning",
        authors: "Mahmoud Assran \u00b7 Adrien Bardes \u00b7 David Fan \u00b7 Quentin Garrido \u00b7 Russell Howes \u00b7 Mojtaba Komeili \u00b7 Matthew Muckley \u00b7 Ammar Rizvi \u00b7 Claire Roberts \u00b7 Koustuv Sinha \u00b7 Artem Zholus \u00b7 Sergio Arnaud \u00b7 Abha Gejji \u00b7 Ada Martin \u00b7 Francois Robert Hogan \u00b7 Daniel Dugas \u00b7 Piotr Bojanowski \u00b7 Vasil Khalidov \u00b7 Patrick Labatut \u00b7 Francisco Massa \u00b7 Marc Szafraniec \u00b7 Kapil Krishnakumar \u00b7 Yong Li \u00b7 Xiaodong Ma \u00b7 Sarath Chandar \u00b7 Franziska Meier \u00b7 Yann LeCun \u00b7 Michael Rabbat \u00b7 Nicolas Ballas",
        affiliations: "FAIR at Meta \u00b7 Mila \u2013 Quebec AI Institute \u00b7 Polytechnique Montr\u00e9al",
        pdfHref: "/papers/v-jepa-2.pdf",
        pageCount: 48,
      }}
      sections={vJepa2PaperSections}
      reportMarkdown={vJepa2ReportMarkdown}
      evidenceTargets={vJepa2EvidenceTargets}
    />
  );
}
