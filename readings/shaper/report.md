> 公开仓库仅提供原创精读分析与来源链接；未转载本文全文、完整译文、PDF或原始图表。该决定表示尚未确认再发布许可，并非论文不能公开阅读。[官方原文](https://arxiv.org/abs/2608.11350v1)。

# 《Self-Evolving Embodied Agents via Skill-Harness Evolution》中文精读报告

> 论文：Peidong Wang 等，*Self-Evolving Embodied Agents via Skill-Harness Evolution*，arXiv:2608.11350v1，2026。
> 阅读约定：“论文事实”可核对；“评价”为证据约束判断；“这是推断”为外推；不足处写“不确定”。

## 1. 这篇论文一句话在做什么

SHAPER 冻结上层 LLM 与底层执行器，只用少量环境 rollout 的文字反馈，依次改写“规划技能提示”和“怎样选择/组织历史视觉上下文的代码 harness”，把一次性优化结果复用于 held-out episodes（Sections 3–4）。

## 2. 背景从 0 讲起

具身系统表现不只由模型权重决定，还由 system prompt、允许动作、历史窗口、证据排序和恢复逻辑决定。SFT/RL 改权重且贵，test-time scaling 每个 episode 多采样，代码型 Agent 又常假设可编程 API。SHAPER 问：在 VLA 固定接口或 active-perception API 下，能否只演化外围“skill+harness”（Sections 1–2）。

## 3. 论文的问题定义

输入 seed skill、context-builder 代码、冻结 planner/executor、训练/验证 rollout 与环境 outcome；输出一个替换后的文本 skill 和 `build_context(history)` harness。VLABench 上 planner 为 Qwen3.6-27B，executor 为官方 $\pi_0$ checkpoint；ESI-Bench 用同 planner 和固定交互 API。模型参数全冻；更新的是文本与代码 artifact。环境 reward/accuracy 是最终裁判，LLM judger 只生成诊断反馈（Section 3、Appendix A）。

## 4. 方法总览

1. 用 seed system 跑小批 episodes；2. judger 对每轮可观察进展/证据/失败归因；3. summarizer 压成 batch-level textual gradient；4. beam search 改写 skill；5. 固定验证集选 skill；6. 锁定 skill，再以同流程改 harness；7. 做接口/沙箱验证；8. 将最终 artifacts 固定用于 held-out 测试。

流程：`rollouts→结构化诊断→批量总结→skill optimizer/beam→validation→freeze skill→harness optimizer/beam→validation→held-out reuse`。

## 5. 核心机制精读

- Skill：规划器持久文字指令，学习 executor 偏好的 canonical command、精确实体名、一步一 primitive、进展检查与失败换路。Figure 3 固定 planner/executor/harness，仅换 skill 后 400 steps/reward .5 变 297 steps/reward 1。
- Harness：可执行上下文构造器，选择视觉帧、crop、历史压缩和循环检测。Figure 4 固定 skill 后，保留早期镜像证据使答案从 not sure 变 middle。
- Staged optimization：先 skill 后 harness，减少同时搜索耦合；但顺序本身无反向/联合消融。
- Textual gradient：judger 不直接改 artifact，只报告证据支持的模式，再由 optimizer 改完整文件，降低单案例过拟合。

## 6. 公式/算法逐行解释

论文主要是离散 artifact search，而非神经 loss。候选在每轮由 beam width 3、branch factor 2 产生，四轮；以 validation outcome 排名。VLABench 训练 15 episodes、验证 24；ESI 各 10 questions。算法实现：

```python
skill = beam_optimize(seed_skill, train_rollouts, val_set, rounds=4, width=3, branch=2)
harness = beam_optimize(seed_harness, train_rollouts,
                        val_set, frozen_skill=skill, validate_code=True)
evaluate(frozen_planner, frozen_executor, skill, harness, held_out)
```

Appendix prompts中的 progress score 只作诊断；episode success/official exact match 才是优化选择依据。所有 crop 由官方 RGB 决定，不读取 pose/depth/segmentation/答案元数据。

## 7. 实验部分精读

VLABench 自建 C1–C4 四个 200-episode split：in-domain、未见目标、未见任务形式、两者都未见，共 800。Seed Agent 28.25%，Skill 33.50，Harness 30.50，Full 34.50；Direct VLA 23.25，同数据 SFT 24.00，MG-Select/VOTE 低于 direct（Table 2）。Full 对 seed +6.25 点；主要贡献来自 skill +5.25，harness 在 skill 后只再 +1。

ESI-Bench 231-question 官方比例子集：Seed micro/macro 32.5/31.2，Skill 41.1/38.6，Full 49.8/42.9（Table 3）。Specular Reflection 20→60、Spatial 37.3→54.9；但 Enumerative 33.3→27.8、Action Sequencing 40→20（后者仅 n=5）。GPT-5 PS macro 40.3 来自完整 passive single-view 集，和本文子集/active setting 不是 paired 对照。

论文未报告多 seed、置信区间或显著性，且 C1–C4 是自建 split；结论应是描述性提升。最强证据是两个受控案例确实隔离 skill/harness；最弱处是没有证明 artifact 继续随长期 deployment 单调演化，也没有真实机器人验证。

## 8. 训练和推理成本分析

planner/executor 无梯度更新；一次 evolution 需要 rollout、judging、summarization、beam artifacts 与 validation。按 API 价格换算，每次演化成本约为 VLABench 2.25 美元、ESI-Bench 2.83 美元，按 Qwen3.6-27B 价格计算，不含最终评测、GPU/仿真器（Section 4.4、Appendix A）。部署后无需每 episode search。最小复现需能服务 27B 或较小 LLM、VLABench/ESI 和 $\pi_0$ executor；GPU绝对配置未报告。

## 9. 这篇论文真正的贡献

作者声称 training-free skill-harness evolution 和跨接口泛化。站得住的是把 prompt 与 context code 拆成两个可审计优化对象，并用 held-out splits 与 same-data SFT/TTS 比较。工程组合是 LLM-as-judge、总结、beam search、代码沙箱和 RGB crop。Reviewer 会质疑单次/无 seed、judger同源偏差、自建 split、外部 GPT-5 不可比、harness增益小且类别负迁移、无真实机器人/跨 embodiment。

## 10. 和相关论文的关系

RAG：harness 做的是选择和组织轨迹证据，但同时是可执行代码；TTA：artifact 在小训练 rollout 上先演化，评测时固定，更像 deployment-time system adaptation；RL：环境分数选候选但无梯度 policy update；world model：无；agent planning：skill 约束上层子目标；self-evolving：外围 artifacts 更新而权重冻结。与 test-time voting 相比成本一次性；与 SFT 相比修改透明、可回滚；与 Voyager 类技能库相比 skill 是规划策略提示，不是任务可执行程序集合。

## 11. 我应该怎么复现一个最小版本

选 VLABench 2 个 family，冻结 planner/$\pi_0$。把 `skill.md` 与 `build_context.py` 版本化；每次候选记录 parent hash、训练反馈、验证 SR、token、失败与接口测试。表格至少含 Seed、Skill-only、Harness-only、Full、same-data SFT、matched extra-sampling；3+ seeds 和 bootstrap CI。保留 train/val/test 严格不交叉。

## 12. 如果我要基于它做新论文

以下五项是研究提案。

### 方向 1：持续多轮 artifact evolution
跨任务流周期性更新并测遗忘；风险是反馈漂移。
### 方向 2：联合但可归因搜索
用因子化设计估计 skill×harness 交互；风险是搜索成本。
### 方向 3：安全类型化 harness DSL
限制生成代码在可证明的操作集；风险是表达力降低。
### 方向 4：跨 executor 可移植 skill
同 skill 在多 VLA 上只学 adapter；风险是命令分布差异。
### 方向 5：真实机器人受控评测
把环境步骤、wall time、故障和人工接管纳入；风险是硬件安全。

## 13. 阅读检查题与参考答案

### 题 1：skill 与 harness 区别？
**答案**：前者是规划策略文字，后者是选择/格式化历史证据的代码。
### 题 2：模型权重更新吗？
**答案**：不更新 planner 或 executor。
### 题 3：为什么两阶段？
**答案**：隔离优化对象，先确定行为策略再优化输入上下文。
### 题 4：VLABench 主结果？
**答案**：Seed 28.25→Full 34.50。
### 题 5：ESI 主结果？
**答案**：micro 32.5→49.8，macro 31.2→42.9。
### 题 6：harness 贡献多大？
**答案**：在 evolved skill 后总体 +1.0 点，类别差异很大。
### 题 7：GPT-5 比较为何谨慎？
**答案**：数据集规模与 passive/active setting 不同，非 paired。
### 题 8：API成本包含什么？
**答案**：rollout、judging、总结、优化；不含最终评测和基础设施。
### 题 9：证明长期自演化了吗？
**答案**：没有，只做一次小集 artifact acquisition 后固定评测。
### 题 10：公平复现要记录什么？
**答案**：版本/parent hash、rollout、token、验证选择、held-out SR、seed 与 CI。

