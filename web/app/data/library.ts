import type { LibraryPaper } from "../lib/library";

export const libraryPapers: LibraryPaper[] = [
  {
    "slug": "openwam",
    "collection": "world-models",
    "titleEn": "OpenWAM: An Open, Modular Exploration Towards Systematic World-Action Model Pretraining",
    "titleZh": "OpenWAM：以开放模块化实验系统研究世界—动作模型预训练",
    "authors": "Yuran Wang et al.",
    "year": 2026,
    "domains": [
      "World Action Models",
      "Robot Pretraining",
      "Controlled Experiments"
    ],
    "publication": {
      "kind": "preprint",
      "status": "preprint",
      "venue": "arXiv",
      "year": 2026,
      "url": "https://arxiv.org/abs/2609.07398v1"
    },
    "status": "completed",
    "progress": 100,
    "stage": "43页全文校译 · 21张原图 · 20张表 · 13章导师解读",
    "summary": "拆开视频先验、动作容量、信息流和数据配方，通过受控实验形成预训练方案，并检验仿真与真机泛化。",
    "updatedAt": "2026-09-14",
    "href": "/papers/openwam",
    "codeUrl": "https://github.com/OpenWAM-Official/OpenWAM"
  },
  {
    "slug": "zetta",
    "collection": "world-models",
    "titleEn": "Zetta ζ: An Efficient Closed-Loop Embodied Harness for Self-Evolving Physical Intelligence",
    "titleZh": "Zetta ζ：面向物理智能自进化的高效闭环具身执行框架",
    "authors": "Xin Ding et al.",
    "year": 2026,
    "domains": [
      "Embodied AI",
      "Self-Evolving Agents",
      "Runtime Critics"
    ],
    "publication": {
      "kind": "preprint",
      "status": "preprint",
      "venue": "arXiv",
      "year": 2026,
      "url": "https://arxiv.org/abs/2608.16590v1"
    },
    "status": "completed",
    "progress": 100,
    "stage": "正文与附录逐段校译 · 15 张原图 · 13 章导师解读",
    "summary": "冻结机器人策略，跨回合演化运行时检查器与恢复技能；精读拆解累计曲线、匹配对照、长程弱点及 8 卡 A100 复现边界。",
    "updatedAt": "2026-09-10",
    "href": "/papers/zetta",
    "codeUrl": "https://github.com/air-embodied-brain/Zetta-Embodiment"
  },
  {
    "slug": "worldevolver",
    "collection": "world-models",
    "titleEn": "Self-Evolving World Models for LLM Agent Planning",
    "titleZh": "面向大语言模型智能体规划的自进化世界模型",
    "authors": "Zhang et al.",
    "year": 2026,
    "domains": [
      "World Models",
      "Agent Planning",
      "Test-Time Adaptation"
    ],
    "publication": {
      "kind": "conference",
      "status": "accepted",
      "venue": "Findings of EMNLP",
      "year": 2026,
      "url": "https://arxiv.org/abs/2606.30639"
    },
    "status": "completed",
    "progress": 100,
    "stage": "原创导师报告已完成 · 原文请访问官方来源",
    "summary": "研究世界模型如何在冻结参数的前提下，通过情景记忆、语义记忆与选择性前瞻持续修正部署时预测。",
    "updatedAt": "2026-09-08",
    "href": "/papers/worldevolver"
  },
  {
    "slug": "world-ego-modeling",
    "collection": "world-models",
    "titleEn": "World-Ego Modeling for Long-Horizon Evolution in Hybrid Embodied Tasks",
    "titleZh": "面向混合具身任务长时程演化的世界—自我建模",
    "authors": "Lin et al.",
    "year": 2026,
    "domains": [
      "World Models",
      "Embodied AI",
      "Video Diffusion"
    ],
    "publication": {
      "kind": "preprint",
      "status": "preprint",
      "venue": "arXiv",
      "year": 2026,
      "url": "https://arxiv.org/abs/2605.19957"
    },
    "status": "completed",
    "progress": 100,
    "stage": "正文与附录逐句校译完成 · 含导师解读",
    "summary": "将长期场景规律与指令驱动的机器人交互拆为 world/ego 状态，并用语义路由的 CP-MoE 生成混合导航—操作长视频。",
    "updatedAt": "2026-09-08",
    "href": "/papers/world-ego-modeling",
    "codeUrl": "https://github.com/ZGCA-HMI-Lab/WEM"
  },
  {
    "slug": "memrl",
    "collection": "world-models",
    "titleEn": "MemRL: Self-Evolving Agents via Runtime Reinforcement Learning on Episodic Memory",
    "titleZh": "MemRL：通过情景记忆上的运行时强化学习实现自进化智能体",
    "authors": "Zhang et al.",
    "year": 2026,
    "domains": [
      "Agent Memory",
      "Runtime Learning",
      "Reinforcement Learning"
    ],
    "publication": {
      "kind": "preprint",
      "status": "preprint",
      "venue": "arXiv",
      "year": 2026,
      "url": "https://arxiv.org/abs/2601.03192"
    },
    "status": "completed",
    "progress": 100,
    "stage": "原创导师报告已完成 · 原文请访问官方来源",
    "summary": "在冻结 LLM 参数的前提下，为情景记忆学习 Q 值，并通过两阶段检索把语义相关性与历史效用结合起来。",
    "updatedAt": "2026-09-08",
    "href": "/papers/memrl",
    "codeUrl": "https://github.com/MemTensor/MemRL"
  },
  {
    "slug": "rise",
    "collection": "world-models",
    "titleEn": "RISE: Self-Improving Robot Policy with Compositional World Models",
    "titleZh": "RISE：通过组合式世界模型实现自我改进机器人策略",
    "authors": "Yang et al.",
    "year": 2026,
    "domains": [
      "Robot Learning",
      "World Models",
      "Reinforcement Learning"
    ],
    "publication": {
      "kind": "conference",
      "status": "published",
      "venue": "RSS",
      "year": 2026,
      "url": "https://www.roboticsproceedings.org/rss22/p012.html"
    },
    "status": "completed",
    "progress": 100,
    "stage": "原创导师报告已完成 · 原文请访问官方来源",
    "summary": "把可组合的多视角动力学模型与价值模型用于想象 rollout，在冻结世界模型后持续更新机器人策略。",
    "updatedAt": "2026-09-08",
    "href": "/papers/rise",
    "codeUrl": "https://github.com/OpenDriveLab/RISE"
  },
  {
    "slug": "v-jepa-2",
    "collection": "world-models",
    "titleEn": "V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning",
    "titleZh": "V-JEPA 2：自监督视频模型赋能理解、预测与规划",
    "authors": "Assran et al.",
    "year": 2025,
    "domains": [
      "World Models",
      "Robot Planning",
      "Self-Supervised Learning"
    ],
    "publication": {
      "kind": "preprint",
      "status": "preprint",
      "venue": "arXiv",
      "year": 2025,
      "url": "https://arxiv.org/abs/2506.09985"
    },
    "status": "completed",
    "progress": 100,
    "stage": "正文与附录逐句校译完成 · 含导师解读",
    "summary": "先从海量无动作视频学习抽象物理表征，再用少量机器人轨迹训练隐空间动力学模型，并以 CEM 做目标图像规划。",
    "updatedAt": "2026-09-08",
    "href": "/papers/v-jepa-2",
    "codeUrl": "https://github.com/facebookresearch/vjepa2"
  },
  {
    "slug": "robomemory",
    "collection": "world-models",
    "titleEn": "RoboMemory: A Brain-inspired Multi-memory Agentic Framework for Interactive Environmental Learning in Physical Embodied Systems",
    "titleZh": "RoboMemory：面向物理具身系统交互式环境学习的类脑多记忆智能体框架",
    "authors": "Lei et al.",
    "year": 2025,
    "domains": [
      "Embodied AI",
      "Agent Memory",
      "Lifelong Learning"
    ],
    "publication": {
      "kind": "conference",
      "status": "published",
      "venue": "NeurIPS",
      "year": 2025,
      "url": "https://openreview.net/forum?id=HHGzG1Choi",
      "note": "正式会议版本使用早期题名 Lifelong Learning in Physical Embodied Systems"
    },
    "status": "completed",
    "progress": 100,
    "stage": "正文与附录逐句校译完成 · 含导师解读",
    "summary": "用短期、长期、空间和工作记忆协同保存真实机器人经验，让冻结的上层 VLM 在后续任务中检索经验并修正规划。",
    "updatedAt": "2026-09-08",
    "href": "/papers/robomemory"
  },
  {
    "slug": "himem-wam",
    "collection": "world-models",
    "titleEn": "HiMem-WAM: Hierarchical Memory-Gated World Action Models for Robotic Manipulation",
    "titleZh": "HiMem-WAM：面向机器人操作的层次记忆门控世界动作模型",
    "authors": "Sun et al.",
    "year": 2026,
    "domains": [
      "Robot Learning",
      "World Action Models",
      "Memory"
    ],
    "publication": {
      "kind": "preprint",
      "status": "preprint",
      "venue": "arXiv",
      "year": 2026,
      "url": "https://arxiv.org/abs/2606.10363"
    },
    "status": "completed",
    "progress": 100,
    "stage": "原创导师报告已完成 · 原文请访问官方来源",
    "summary": "通过低层运动潜变量、高层技能潜变量与技能边界触发的记忆写入，增强长时程机器人操作中的任务相关记忆。",
    "updatedAt": "2026-09-08",
    "href": "/papers/himem-wam",
    "codeUrl": "https://github.com/Agentic-Intelligence-Lab/HiMem-WAM"
  },
  {
    "slug": "robotwin-2",
    "collection": "world-models",
    "titleEn": "RoboTwin 2.0: A Scalable Data Generator and Benchmark with Strong Domain Randomization for Robust Bimanual Robotic Manipulation",
    "titleZh": "RoboTwin 2.0：面向鲁棒双臂机器人操作的强域随机化可扩展数据生成器与基准",
    "authors": "Chen et al.",
    "year": 2025,
    "domains": [
      "Robot Learning",
      "Simulation",
      "Domain Randomization"
    ],
    "publication": {
      "kind": "conference",
      "status": "published",
      "venue": "ICML",
      "year": 2026,
      "url": "https://robotwin-platform.github.io/doc/"
    },
    "status": "completed",
    "progress": 100,
    "stage": "原创导师报告已完成 · 原文请访问官方来源",
    "summary": "构建可扩展双臂任务与专家数据生成流水线，并通过五类结构化域随机化提高策略对环境变化和 sim-to-real 的鲁棒性。",
    "updatedAt": "2026-09-08",
    "href": "/papers/robotwin-2",
    "codeUrl": "https://github.com/RoboTwin-Platform/RoboTwin"
  },
  {
    "slug": "teach-and-grow",
    "collection": "world-models",
    "titleEn": "Teach and Grow: An Agent-Centered Architecture for General Robot Learning",
    "titleZh": "Teach-and-Grow：面向通用机器人学习的智能体中心架构",
    "authors": "Nie et al.",
    "year": 2026,
    "domains": [
      "Robot Learning",
      "Agent Memory",
      "Skill Library"
    ],
    "publication": {
      "kind": "preprint",
      "status": "preprint",
      "venue": "arXiv",
      "year": 2026,
      "url": "https://arxiv.org/abs/2608.17209"
    },
    "status": "completed",
    "progress": 100,
    "stage": "原创导师报告已完成 · 原文请访问官方来源",
    "summary": "冻结基础模型权重，把少量成功示范组织成可复用 Skill Blocks，并以技能库和结构化经验记忆支持新任务组合与执行修正。",
    "updatedAt": "2026-09-08",
    "href": "/papers/teach-and-grow"
  },
  {
    "slug": "retrieve-then-steer",
    "collection": "world-models",
    "titleEn": "Retrieve-then-Steer: Online Success Memory for Test-Time Adaptation of Generative VLAs",
    "titleZh": "Retrieve-then-Steer：面向生成式 VLA 测试时适应的在线成功记忆",
    "authors": "Zhao et al.",
    "year": 2026,
    "domains": [
      "Robot Learning",
      "Agent Memory",
      "Test-Time Adaptation"
    ],
    "publication": {
      "kind": "preprint",
      "status": "preprint",
      "venue": "arXiv",
      "year": 2026,
      "url": "https://arxiv.org/abs/2605.10094"
    },
    "status": "completed",
    "progress": 100,
    "stage": "原创导师报告已完成 · 原文请访问官方来源",
    "summary": "冻结 VLA 参数，积累成功观察—动作片段并检索一致候选，将其作为先验引导 flow-matching 动作采样。",
    "updatedAt": "2026-09-08",
    "href": "/papers/retrieve-then-steer"
  },
  {
    "slug": "memoir",
    "collection": "world-models",
    "titleEn": "Dream to Recall: Imagination-Guided Experience Retrieval for Memory-Persistent Vision-and-Language Navigation",
    "titleZh": "Dream to Recall：想象引导的记忆持久视觉语言导航经验检索",
    "authors": "Xu et al.",
    "year": 2026,
    "domains": [
      "Vision-Language Navigation",
      "World Models",
      "Agent Memory"
    ],
    "publication": {
      "kind": "journal",
      "status": "accepted",
      "venue": "IEEE TPAMI",
      "year": 2026,
      "url": "https://arxiv.org/abs/2510.08553"
    },
    "status": "completed",
    "progress": 100,
    "stage": "正文与附录逐句校译完成 · 含导师解读",
    "summary": "Memoir 用世界模型想象未来状态作为检索查询，从环境观察与导航行为两类长期记忆中选择相关经验。",
    "updatedAt": "2026-09-08",
    "href": "/papers/memoir",
    "codeUrl": "https://github.com/xyz9911/Memoir"
  },
  {
    "slug": "robo-cortex",
    "collection": "world-models",
    "titleEn": "Robo-Cortex: A Self-Evolving Embodied Agent via Dual-Grain Cognitive Memory and Autonomous Knowledge Induction",
    "titleZh": "Robo-Cortex：通过双粒度认知记忆与自主知识归纳实现自进化具身智能体",
    "authors": "Chan et al.",
    "year": 2026,
    "domains": [
      "Embodied AI",
      "Agent Memory",
      "Robot Navigation"
    ],
    "publication": {
      "kind": "preprint",
      "status": "preprint",
      "venue": "arXiv",
      "year": 2026,
      "url": "https://arxiv.org/abs/2605.18729"
    },
    "status": "completed",
    "progress": 100,
    "stage": "原创导师报告已完成 · 原文请访问官方来源",
    "summary": "从多模态导航轨迹中归纳自然语言启发式，并结合短期反思记忆、长期原则记忆和想象—验证规划循环。",
    "updatedAt": "2026-09-08",
    "href": "/papers/robo-cortex"
  },
  {
    "slug": "onevomemory",
    "collection": "world-models",
    "titleEn": "OnEvoMemory: Evolving Memory through Online Robot Rollouts for Pretrained Robot Policies",
    "titleZh": "OnEvoMemory：通过在线机器人 rollout 演化预训练机器人策略的记忆",
    "authors": "Chen and Zong",
    "year": 2026,
    "domains": [
      "Robot Learning",
      "Agent Memory",
      "Online Adaptation"
    ],
    "publication": {
      "kind": "workshop",
      "status": "accepted",
      "venue": "EMR @ ECCV",
      "year": 2026,
      "url": "https://arxiv.org/abs/2608.08749",
      "note": "Poster"
    },
    "status": "completed",
    "progress": 100,
    "stage": "原创导师报告已完成 · 原文请访问官方来源",
    "summary": "用离线示范初始化价值引导记忆，再以在线成功和失败轨迹学习应保留的近期、高价值与关键转折经验。",
    "updatedAt": "2026-09-08",
    "href": "/papers/onevomemory"
  },
  {
    "slug": "shaper",
    "collection": "world-models",
    "titleEn": "Self-Evolving Embodied Agents via Skill-Harness Evolution",
    "titleZh": "SHAPER：通过技能—执行框架演化实现自进化具身智能体",
    "authors": "Wang et al.",
    "year": 2026,
    "domains": [
      "Embodied AI",
      "Skill Library",
      "Test-Time Adaptation"
    ],
    "publication": {
      "kind": "preprint",
      "status": "preprint",
      "venue": "arXiv",
      "year": 2026,
      "url": "https://arxiv.org/abs/2608.11350"
    },
    "status": "completed",
    "progress": 100,
    "stage": "原创导师报告已完成 · 原文请访问官方来源",
    "summary": "保持模型参数冻结，让同一个模型充当规划器与优化器，通过目标环境 rollout 演化外部技能及上下文—代码执行框架。",
    "updatedAt": "2026-09-08",
    "href": "/papers/shaper"
  },
  {
    "slug": "labevolver",
    "collection": "world-models",
    "titleEn": "LabEvolver: Training-Free Experience Evolution for Safe and Grounded Wet-Lab Agents",
    "titleZh": "LabEvolver：面向安全且具环境依据的湿实验室智能体的免训练经验演化",
    "authors": "Wang et al.",
    "year": 2026,
    "domains": [
      "Agent Memory",
      "Scientific Agents",
      "Test-Time Adaptation"
    ],
    "publication": {
      "kind": "preprint",
      "status": "preprint",
      "venue": "arXiv",
      "year": 2026,
      "url": "https://arxiv.org/abs/2607.27690"
    },
    "status": "completed",
    "progress": 100,
    "stage": "原创导师报告已完成 · 原文请访问官方来源",
    "summary": "以内层状态落地执行循环和外层经验演化循环，把完成轨迹蒸馏为可复用的技能、策略与安全经验。",
    "updatedAt": "2026-09-08",
    "href": "/papers/labevolver",
    "codeUrl": "https://github.com/AndyGao6186/LabEvolver"
  },
  {
    "slug": "wam-ttt",
    "collection": "world-models",
    "titleEn": "WAM-TTT: Steering World-Action Models by Watching Human Play at Test Time",
    "titleZh": "WAM-TTT：测试时观看人类操作以引导世界动作模型",
    "authors": "Feng et al.",
    "year": 2026,
    "domains": [
      "World Action Models",
      "Test-Time Training",
      "Robot Learning"
    ],
    "publication": {
      "kind": "preprint",
      "status": "preprint",
      "venue": "arXiv",
      "year": 2026,
      "url": "https://arxiv.org/abs/2607.06988"
    },
    "status": "completed",
    "progress": 100,
    "stage": "原创导师报告已完成 · 原文请访问官方来源",
    "summary": "先用成对人机数据训练可写入的快速权重接口，部署时只凭无标注人类视频更新视频侧记忆，在冻结主 WAM 的条件下引导机器人动作。",
    "updatedAt": "2026-09-08",
    "href": "/papers/wam-ttt"
  }
];
