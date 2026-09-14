import type { PaperSection } from "../../../lib/content";

export const hiMemWamPaperSections: PaperSection[] = [
  {
    "id": "source-notice",
    "number": "·",
    "titleEn": "Source and reuse notice",
    "titleZh": "原文与转载说明",
    "collapsedByDefault": false,
    "blocks": [
      {
        "id": "himem-wam-source-notice",
        "sectionId": "source-notice",
        "kind": "paragraph",
        "label": "版权说明（非论文原文）",
        "english": "Full text is not redistributed in this public repository because a suitable reuse permission has not been confirmed. Read the original paper at [the official source](https://arxiv.org/abs/2606.10363v1). The report is independently written reading analysis.",
        "chinese": "本公开仓库尚未确认可转载本论文全文译本及原图的授权，因此此处只显示来源说明，不冒充论文原文。请访问[官方原文](https://arxiv.org/abs/2606.10363v1)；右侧保留独立撰写的精读分析。",
        "evidenceKeys": []
      }
    ]
  }
];