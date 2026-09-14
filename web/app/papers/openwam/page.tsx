import type { Metadata } from "next";
import { PaperReaderApp } from "../../components/PaperReaderApp";
import { openwamPaperSections } from "../../data/papers/openwam/paper";
import { openwamEvidenceTargets, openwamReportMarkdown } from "../../data/papers/openwam/report";

export const metadata: Metadata = {
  title: "OpenWAM · 双语精读 | Paper Atlas",
  description: "OpenWAM 43页全文中英对照、21张原图、20张表与13章导师精读；拆解世界—动作模型预训练、受控消融和8卡A100复现边界。",
};

export default function OpenWamPage() {
  return <PaperReaderApp
    paperMeta={{
      slug: "openwam", readerLabel: "OPENWAM · READER",
      eyebrow: "WORLD ACTION MODELS · PRETRAINING · CONTROLLED EXPERIMENTS · 2026",
      title: "OpenWAM: An Open, Modular Exploration Towards Systematic World-Action Model Pretraining",
      authors: "Yuran Wang · Siqiao Huang · Mingleyang Li · Chenhao Zhang · Jiaqi Liang · Weiyang Jin · Yue Chen · Xuemin Chi · Donghao Zhou · Qize Yu · Yu-Kai Wang · Yuhan Rui · Shenzhe Yao · Zhen Yuan · Zhenhao Shen · Kefei Zhu · Zijie Zhu · Ning Gao · Xiaowei Chi · Guanqi He · Shanghang Zhang · Hao Dong · Lin Shao · Hang Zhao",
      affiliations: "National University of Singapore · Tsinghua University · Peking University · The University of Hong Kong · Zhejiang University · The Chinese University of Hong Kong · Shanghai Jiao Tong University",
      pdfHref: "/papers/openwam.pdf", pageCount: 43,
    }}
    sections={openwamPaperSections}
    reportMarkdown={openwamReportMarkdown}
    evidenceTargets={openwamEvidenceTargets}
  />;
}
