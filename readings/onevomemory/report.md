> 公开仓库仅提供原创精读分析与来源链接；未转载本文全文、完整译文、PDF或原始图表。该决定表示尚未确认再发布许可，并非论文不能公开阅读。[官方原文](https://arxiv.org/abs/2608.08749v1)。

# 《OnEvoMemory: Evolving Memory through Online Robot Rollouts for Pretrained Robot Policies》中文精读报告

> 论文：Zhongxi Chen, Shenqi Zong，*OnEvoMemory*，arXiv:2608.08749v1，2026。
> 阅读约定：“论文事实”可由原文核对；“评价”为证据约束的判断；“这是推断”为外推；不足处写“不确定”。

## 1. 这篇论文一句话在做什么

OnEvoMemory 给预训练 VLA 接上短期、精英和转折三类记忆，用可训练 value estimator 学习“什么值得记”，先从离线示范初始化，再用一轮在线成功/失败 rollout 只更新记忆相关模块、冻结基础策略（Figure 1、Section 3）。

## 2. 背景从 0 讲起

长时机器人任务需要知道哪些子任务已完成。固定窗口会忘远处关键事件，相似度检索不一定知道哪些事件重要，外部 VLM 选帧又与底层策略价值脱节。本文把记忆选择写成 action-conditioned value 学习：高价值状态进入 elite bank，价值突变进入 transition bank（Sections 1–2）。

## 3. 论文的问题定义

输入 $o_t=(I_t^{1:V},s_t,\ell)$；冻结编码器产生 $Q_t\in\mathbb R^{H\times d}$。输出为 gated memory 增强后的 action chunk。离线阶段用示范的动作与轨迹结果训练 memory read/write/injection；在线用 20 条/任务 LIBERO rollout、10 条/任务 RMBench rollout 更新 value 与 memory 模块。基础视觉语言 backbone 和 action policy 冻结；因此不是“完全无参数更新”（Section 3.2、4）。

## 4. 方法总览

1. 先读旧 memory；2. 用 $Q_t$ 从三库取历史；3. gated cross-attention 注入；4. decoder 出动作；5. value writer 给当前真实动作打分并生成 key/value；6. 高值写 elite、大变化写 transition、最近项进 FIFO；7. 用离线示范初始化；8. 用在线成败更新 writer。

流程：`观察→冻结 VLA query→三库检索→门控注意力→动作→结果监督 value/writer→三库更新`。

## 5. 核心机制精读

- Short-term FIFO：保留最近上下文；去掉会损失连续动作信息。
- Elite bank：保存稳定抓取/已完成阶段等高价值经验；去掉会失去跨长间隔锚点。
- Transition bank：按 $|V_t-V_{t-1}|$ 保存接触丢失、失败、恢复和阶段切换；去掉会漏掉“价值变化”而只留下高峰。
- Retrieval：每个长时库取语义 top-k 与 recent-k 的并集，兼顾相关性和新鲜度。
- Gated injection：$\tilde Q_t=Q_t+g_tMHA(Q_t,C_t,C_t)$；门控避免无用记忆压过当前策略。

论文没有逐模块消融，所以上述“去掉后”是结构直觉，不是已验证因果结果。

## 6. 公式/算法逐行解释

$Q_t=E_\theta(o_t)$ 是冻结策略的动作查询；$C_t=Retrieve(Q_t,\mathcal M_t)$；$\tilde Q_t=Q_t+g_tMHA(Q_t,C_t,C_t)$；$\hat A_t=D_\theta(\tilde Q_t)$。writer $F_\phi(\tilde Q_t,A_t)$ 输出 $V_t,k_t,v_t$。长期检索 $\mathcal R_t^b=TopK_{sim}\cup RecentK$，$b\in\{E,T\}$。这些公式在 HTML 中未编号，代码顺序必须是 read-before-write，避免当前状态当步自检索。

## 7. 实验部分精读

底座 QwenOFT；LiberoLong-10 平均 Base 86.2、Offline 88.6、Online 90.2；RMBench SwapBlocks 为 0→10→14，SwapT 为 0→8→10（Table 1）。正面证据是在线更新在三项均继续提升；警告是只做一轮、LIBERO 增益 1.6 点、RMBench 最终仍仅 14/10%，且论文未报告 seed、方差、显著性、逐模块消融或累积曲线。

## 8. 训练和推理成本分析

基础 VLA 冻结，但 $F_\phi$、memory reading/writing/injection 模块会梯度更新。是否需要 API 未报告；QwenOFT 是本地可训练模型路线。GPU 型号、显存、训练步数和耗时未披露，成本不确定。最小复现需一张能运行 QwenOFT 的 GPU、离线示范和每任务 10–20 条在线 rollout。

## 9. 这篇论文真正的贡献

作者声称三库结构、可学习 value writer、在线演化。站得住的是把高值与价值突变分开保存，并明确冻结基础 policy。工程组合是 FIFO、top-k/recent-k、MHA 门控和值网络。Reviewer 最可能质疑短稿只有 6 页/1 图/1 表、实验规模小、无统计和消融，以及“evolving memory”实际是辅助模块梯度训练而非长期非参数累积。

## 10. 和相关论文的关系

它不是纯 RAG：memory 是中间 action representation；属于参数化 test-time adaptation；不是 RL，因为没有策略 return 优化；不学习 world dynamics；agent planning 很弱，主要是策略内部记忆；与 MemoryWAM/事件 keyframe 方法相比，写入规则由 rollout outcome 学习；与 Retrieve-then-Steer 相比，后者冻结全部 VLA 且非参数存成功动作，本方法会训练 memory/value 模块并同时利用失败。

## 11. 我应该怎么复现一个最小版本

选 LiberoLong 两任务，冻结 QwenOFT；用容量固定的三张 tensor bank。记录每步 $V_t$、value change、写入库、检索索引、gate、动作、成功和显存。最小表比较 Base、+FIFO、+Elite、+Transition、Offline full、Online full，3 seeds，并画随 rollout 轮数的 paired 曲线。

## 12. 如果我要基于它做新论文

以下五项是研究提案。

### 方向 1：多轮纵向演化
从一轮扩成 10+ checkpoint，验证收益/遗忘曲线；风险是在线数据昂贵。
### 方向 2：冻结 writer 的非参数版本
用 outcome-calibrated reservoir 替代梯度更新，与同预算训练版比较；风险是表达力下降。
### 方向 3：跨任务 value calibration
统一不同任务 $V_t$ 尺度；验证跨任务检索；风险是奖励不可比。
### 方向 4：可解释转折标签
把 transition 分成 grasp/loss/recovery/stage；验证诊断与性能；风险是标注成本。
### 方向 5：遗忘与污染控制
加入反事实贡献驱逐；测错误 memory 注入恢复；风险是估计成本。

## 13. 阅读检查题与参考答案

### 题 1：三类 memory 各存什么？
**答案**：最近上下文、高价值经验、价值突变事件。
### 题 2：为什么 read-before-write？
**答案**：防止当前状态在同一步被当作历史检索。
### 题 3：什么参数冻结？
**答案**：基础视觉语言 backbone 与 action policy。
### 题 4：什么参数更新？
**答案**：value estimator 和 memory read/write/injection 模块。
### 题 5：它是 training-free 吗？
**答案**：不是；只对基础策略冻结，辅助模块在线训练。
### 题 6：Table 1 最强数字？
**答案**：LiberoLong-10 86.2→88.6→90.2。
### 题 7：RMBench 是否解决？
**答案**：没有，最终仅 14% 与 10%。
### 题 8：在线用了多少轨迹？
**答案**：LIBERO 每任务 20，RMBench 每任务 10。
### 题 9：最大证据缺口？
**答案**：无多轮曲线、seed/方差/显著性和逐模块消融。
### 题 10：公平纵向复现需什么？
**答案**：固定底座与 rollout 顺序，多 seed 比较 memory frozen、online update 与无 memory。

