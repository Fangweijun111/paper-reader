import type { Metadata } from "next";
import { PaperReaderApp } from "../../components/PaperReaderApp";
import { roboTwin2PaperSections } from "../../data/papers/robotwin-2/paper";
import { roboTwin2EvidenceTargets, roboTwin2ReportMarkdown } from "../../data/papers/robotwin-2/report";

export const metadata: Metadata = {
  title: "RoboTwin 2.0 · 导师精读 | Paper Atlas",
  description: "RoboTwin 2.0: A Scalable Data Generator and Benchmark with Strong Domain Randomization for Robust Bimanual Robotic Manipulation 官方来源说明、论文图表与 13 章精读报告。",
};

export default function RoboTwin2Page() {
  return (
    <PaperReaderApp
      paperMeta={{
        slug: "robotwin-2",
        readerLabel: "RoboTwin 2.0 \u00b7 READER",
        eyebrow: "BIMANUAL ROBOTICS \u00b7 DATA GENERATOR \u00b7 DOMAIN RANDOMIZATION \u00b7 2025",
        title: "RoboTwin 2.0: A Scalable Data Generator and Benchmark with Strong Domain Randomization for Robust Bimanual Robotic Manipulation",
        authors: "Tianxing Chen \u00b7 Zanxin Chen \u00b7 Baijun Chen \u00b7 Zijian Cai \u00b7 Yibin Liu \u00b7 Zixuan Li \u00b7 Qiwei Liang \u00b7 Xianliang Lin \u00b7 Yiheng Ge \u00b7 Zhenyu Gu \u00b7 Weiliang Deng \u00b7 Yubin Guo \u00b7 Tian Nian \u00b7 Xuanbing Xie \u00b7 Qiangyu Chen \u00b7 Kailun Su \u00b7 Tianling Xu \u00b7 Guodong Liu \u00b7 Mengkang Hu \u00b7 Huan-ang Gao \u00b7 Kaixuan Wang \u00b7 Zhixuan Liang \u00b7 Yusen Qin \u00b7 Xiaokang Yang \u00b7 Ping Luo \u00b7 Yao Mu",
        affiliations: "Shanghai Jiao Tong University \u00b7 The University of Hong Kong \u00b7 Shanghai AI Laboratory \u00b7 D-Robotics \u00b7 Shenzhen University \u00b7 Tsinghua University \u00b7 TeleAI \u00b7 Fudan University \u00b7 USTC \u00b7 SUSTech \u00b7 Sun Yat-sen University \u00b7 Central South University \u00b7 Northeastern University \u00b7 Nanjing University \u00b7 Lumina EAI",
        pdfHref: "https://arxiv.org/pdf/2506.18088v2",
        pageCount: 24,
      }}
      sections={roboTwin2PaperSections}
      reportMarkdown={roboTwin2ReportMarkdown}
      evidenceTargets={roboTwin2EvidenceTargets}
    />
  );
}
