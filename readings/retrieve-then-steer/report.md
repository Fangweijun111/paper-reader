> 公开仓库仅提供原创精读分析与来源链接；未转载本文全文、完整译文、PDF或原始图表。该决定表示尚未确认再发布许可，并非论文不能公开阅读。[官方原文](https://arxiv.org/abs/2605.10094v2)。

# 《Retrieve-then-Steer: Online Success Memory for Test-Time Adaptation of Generative VLAs》中文精读报告

> 论文：Jianchao Zhao 等，*Retrieve-then-Steer: Online Success Memory for Test-Time Adaptation of Generative VLAs*，arXiv:2605.10094v2，2026。
> 阅读约定：
> - “论文事实”表示可由正文、公式、图表或附录直接核对。
> - “评价”表示基于论文证据作出的审慎判断。
> - “这是推断”表示论文未直接声称、但可由证据推导的分析。
> - 证据不足时写“不确定”。

## 1. 这篇论文一句话在做什么

它让一个已经训练好且部署时冻结的生成式 VLA，把自己偶尔成功的测试轨迹存成在线记忆；遇到相似状态时先检索成功动作片段，再把聚合后的动作先验注入 flow-matching/diffusion 采样中间态，从而在不更新参数的情况下逐渐提高重复部署的可靠性（Abstract、Figure 2、Section 4）。

## 2. 背景从 0 讲起

VLA 根据多视角 RGB、机器人本体状态和语言生成一段连续动作。$\pi_0/\pi_{0.5}$ 等生成式策略从噪声逐步生成 action chunk，表达力强，但采样噪声、视角与标定偏移会让近似场景产生不同结果。传统 benchmark 把每个 test episode 当独立样本；真实机器人却常在同一工位重复任务，成功一次已经提供了当前相机、几何和执行偏差下的环境验证证据（Sections 1、3）。

常见修正路线有训练前微调、在线 RL、人类反馈，以及测试时多采样再筛选。前两者更新参数且成本高；后者通常只改当前决策，生成后即丢弃。本文的问题是：能否把跨 episode 成功经验变成生成器的软先验，同时保留模型对当前观察的条件修正能力（Section 2）。

## 3. 论文的问题定义

- 输入：观察 $o_t=(I_t^{1:N_c},q_t)$、指令 $l$、冻结生成式策略 $\pi_{vla}$、在线成功记忆 $\mathcal M$。
- 输出：长度 $H$ 的动作块 $a_t$；成功 episode 的峰值进度前缀也会写入 $\mathcal M$。
- 训练时：基础 VLA 先按各 benchmark 示范微调；VLAC critic 是预训练外部进度估计器。真实任务每项用 100 条示范、batch 64、学习率 $2.5\times10^{-5}$、8k–10k steps（Appendix D）。
- 测试时：VLA 参数冻结，无梯度或在线微调；memory 从连续测试 rollout 中增长。
- feedback：预训练 VLAC 根据相邻帧、语言与一条成功参考视频估计有符号进度；环境标签只用于 oracle/评测对照。
- 目标：提高持续部署下的成功率与闭环稳定性，不定义新的训练 loss；核心是非参数检索与采样初值改变（Sections 3–4）。

## 4. 方法总览

1. 冻结 VLA，在目标环境连续执行。
2. 每隔 $\Delta$ 帧用 VLAC 估计局部进度，并递推累计完成度。
3. 若最大进度超过阈值，只保存峰值之前的观察—动作前缀，过滤失败、回退和成功后的冗余动作。
4. 当前观察到来时，用视觉相似度检索 top-$K$ 记忆项。
5. 用动作轨迹 DTW 距离去掉与多数候选不一致的片段。
6. 对剩余候选做 softmax 加权，形成 elite action prior。
7. 用检索相似度与 DTW 离散度计算置信度，决定采样起点 $t_0$。
8. 在中间噪声态把 elite prior 与高斯噪声混合，再由原 VLA 在当前观察条件下完成生成；无可靠候选时退回原采样器。

流程：`连续 rollout → 高精度成功前缀筛选 → 在线 memory → 相似检索 → DTW 一致性过滤 → elite prior → 置信度映射 → 中间态采样 → 动作`（Figure 2）。

## 5. 核心机制精读

### 5.1 Progress-calibrated success memory

它解决“存整个 episode 会混入失败和成功后乱动”的问题。VLAC 输出区间进度，系统取累计进度峰值并截断前缀。输入是相邻观察、语言与一条参考成功视频；输出是可信观察—动作条目。去掉验证，LIBERO 平均从 base 92.4% 降到 87.6%；预测成功前缀达到 94.4%，接近 oracle 94.8%（Table 5）。

### 5.2 检索与 trajectory-consistency filtering

视觉相似度先召回候选，再以 action chunk 间 DTW 距离寻找一致簇，避免同样外观下混入不同阶段/方向动作。输入是当前视觉特征和候选动作；输出是一致索引集 $\mathcal I$。只取 top-1 为 93.6%，soft top-$K$ 为 94.0%，加入 DTW 的完整方法 94.4%（Table 4）。

### 5.3 Elite prior aggregation

相似度经温度 softmax 得权重，再对平移、旋转、夹爪分别聚合。旋转不能直接欧氏平均，因此在 $SO(3)$ 上求加权 Fréchet mean；离散夹爪用加权投票（Appendix C）。输出是整段 $a_{elite}$。

### 5.4 Confidence-adaptive prior guidance

它解决“直接 replay 无法适应当前细小变化”。高相似、低 DTW 离散时取较小 $t_0$，更接近历史成功动作；置信度低时增加噪声，让原 VLA 有更大修正空间。直接 replay 87.8%，输出后插值 93.0%，中间态注入 94.4%（Table 4），说明关键不是有 memory，而是如何进入生成过程。

## 6. 公式/算法逐行解释

Eqs. (1)–(2)：$c_{\tau_m}^{(i)}=\Phi_\psi(o_{\tau_{m-1}}^{(i)},o_{\tau_m}^{(i)},l^{(i)};R)$ 是局部进度；$v$ 用剩余到 100 的比例递推，使正进度逐渐逼近 100。取 $v$ 最大时刻作为可复用前缀终点。

Eqs. (3)–(5)：$d_{ij}=DTW(a_i,a_j)$ 衡量候选动作时序距离；$w_i$ 是减去最大相似度后的温度 softmax；$a_{elite}=\sum_iw_ia_i$ 是加权先验。

Eqs. (6)–(10)：$x_{t_0}=(1-t_0)a_{elite}+t_0\epsilon$ 把先验放到 flow 路径中间；标准化相似度 $\tilde s$ 被 clip，$c=\alpha\tilde s-\beta\sigma_{DTW}$ 同时奖励状态近、惩罚动作分歧；sigmoid 把 $c$ 映射到 $t_0$；最后用冻结速度场 $v_\theta$ 从 $t_0$ 积分到 0。$c$ 越大，$t_0$ 越小，先验越强。

Eqs. (11)–(13)：VLAC 训练标签 $\Delta t/(T-i)$ 用时间前进构造进度监督；Eq. 12 是含参考过程和初始帧的 critic 调用；Eq. 13 回到测试轨迹的区间评分（Appendix A）。

Eqs. (14)–(21)：标准 diffusion 从 $x_N\sim\mathcal N(0,I)$ 经 $p_\theta$ 去噪到 $x_0$；前向噪声式由 $\bar\alpha_n$ 控制。本文以 $a_{elite}$ 代替干净 $x_0$ 构造 $x_{n_0}$，只执行剩余去噪步骤；最终 $x_0$ 仍是当前条件下生成动作，不是原样 replay（Appendix B）。

Eqs. (22)–(31)：单步动作含平移 $\Delta p$、旋转 $\Delta r$、夹爪 $g$；平移/连续夹爪加权平均；旋转先 Exp 到 $SO(3)$，求最小加权对数距离的均值再 Log 回旋转向量；离散夹爪按 $P_h(c)$ 加权投票；各步拼成长度 $H$ 的 elite chunk（Appendix C）。

实现伪代码：

```python
if progress_peak(trajectory, critic, reference) >= eta:
    memory.add(trajectory.prefix_through_peak())
cands = visual_topk(memory, obs, K=10, threshold=0.9992)
consistent = dtw_filter(cands)
if not consistent: return frozen_vla.sample(obs, lang)
prior, dispersion = componentwise_weighted_mean(consistent)
confidence = alpha * scaled_similarity(cands) - beta * dispersion
t0 = confidence_to_start(confidence)
x = (1-t0) * prior + t0 * randn_like(prior)
return frozen_vla.flow_integrate(x, start=t0, condition=(obs, lang))
```

## 7. 实验部分精读

LIBERO-10 每任务 50 trials，复现实验报告 3 seeds。$\pi_0$ 81.6±0.8，+TACO 83.8±0.2，+本文 84.4±0.4；$\pi_{0.5}$ 92.4±0.2，+本文 94.4±0.3（Table 1）。提升为 2–2.8 个百分点，基线已高，因此绝对增益有限但较稳定；Book in Caddy 从 100 降到 92，说明 memory 会负迁移。

SIMPLER 上以 CogACT 为底座，四类任务平均 75.8±0.3→79.5±0.2，各任务提升 2.5–5.5 点（Table 2）。真实 test-tube 长任务上，完成 4/4 的比例从 $\pi_{0.5}$ 18% 到 24%，平均完成长度 1.54→1.94；Table 3 表头层级不清，但正文任务定义可确认这些是依次放置 1–4 根试管的完成比例。

Table 4 表明 direct replay 反而低于 base；Table 5 表明未验证 memory 也显著伤害；两者共同证明“记忆质量 + 生成式注入”缺一不可。成功 discriminator Accuracy 0.676、Recall 0.678，但 Precision 0.970；该取舍适合 memory，因为漏存只减慢增长，误存会污染先验。

最接近用户关心的累积曲线是 Moka Pots on Stove 的 300 test trajectories。容量 0 的最终 cumulative SR 61.0%，1k–5k 分别 64.0、66.2、68.5、70.2、70.8%，unlimited 71.2%（Table 6）。Table 6 比较的是不同记忆容量下，完成 300 条测试轨迹后的累计成功率；Figure 4(a) 才展示随部署推进的累计曲线。二者支持该单任务上的在线经验复用，但没有任务顺序 permutation 或跨任务纵向 slope 对照，不能回答“通用技能越积越多是否让新任务更容易”。

推理相对耗时：只看先验引导采样为 0.95×，完整检索链 1.10×（Table 7）。超参默认 $K=10,\tau=0.05,\gamma_{sim}=0.9992,\eta=0.95$，Table 8 显示邻近范围较稳，但这些仍是在同一 LIBERO-10 上调出的结果。

## 8. 训练和推理成本分析

基础 VLA 与 VLAC 在部署时冻结；在线只写 memory、做向量检索/DTW/聚合和较短生成。真实任务基础策略仍需每任务 100 示范和 8k–10k 微调，因此“training-free”只描述部署适应层，不代表整个系统无需训练。完整推理约 base 1.10×；论文未报告 GPU 型号、显存、总训练小时或 memory 存储字节，故绝对成本不确定。

最小复现可用单 GPU 跑 LIBERO 与开源 $\pi_{0.5}$ 类 flow VLA，外加冻结 progress critic、FAISS/矩阵 top-k 和 CPU DTW；若只验证机制，可用较小 diffusion policy。主要成本是先得到偶发成功和运行数百连续 trajectories，而非在线反向传播。

## 9. 这篇论文真正的贡献

作者声称：在线 progress-calibrated success memory、retrieve-then-steer 非参数 TTA、仿真与真实机器人验证。站得住的贡献是把成功片段作为生成 sampler 的中间态先验，并用 strong ablation 证明 direct replay/脏 memory 会变差。工程组合包括 VLAC、视觉检索、DTW、soft aggregation 与原生成头。

Reviewer 会质疑：LIBERO 增益只有 2 点且已有 92.4% 天花板；依赖预训练 critic 与一条成功参考视频；快速场景变化会使记忆失效；300-trajectory 曲线只有一个任务，缺少 matched no-update trajectory-order 对照与多任务 permutation；视觉相似仍有 state aliasing；真实试验完整统计和更多任务结果需要更清楚披露（Appendix I）。

## 10. 和相关论文的关系

- RAG/memory agent：不是把文本拼进 prompt，而是检索动作块并改生成分布。
- test-time adaptation：是典型非参数 TTA；测试状态跨 episode 持久，但模型权重不变。
- RL：不从 reward 更新 policy；成功估计仅控制写入与检索先验。
- world model：没有学习预测未来世界；VLAC 是进度 critic，VLA 是动作生成器。
- agent planning：没有高层自由规划器，主要改低层 action sampler。
- self-evolving agent：memory 会增长、效果可随 trajectory 上升，但能力受基础策略偶发成功上限约束。
- TACO/MG-Select/RoboMonkey：它们偏 generate-then-select；本文在生成前检索并 steering，且跨 episode 保留经验（Section 2）。
- STRAP/离线轨迹检索：后者依赖离线示范或用于训练；本文记忆来自目标部署成功，并在冻结推理时使用。

## 11. 我应该怎么复现一个最小版本

环境选 LIBERO-10 的 Moka Pots on Stove；底座固定同一个 checkpoint。存储 `obs_embedding, action_chunk, task_id, progress_peak, timestamp`，容量分别 0/1k/3k/5k/unlimited。

至少记录每个 trajectory 的 seed、是否写入、critic 分数、截断点、top-k 相似度、DTW 离散度、$t_0$、是否 fallback、成功、时延和 memory size。最小表比较 base、unverified memory、top-1、top-k、direct replay、完整方法；最小曲线用相同 trajectory order 的可写 memory 与只读/空 memory paired rollout，3+ seeds 和置信带。

## 12. 如果我要基于它做新论文

以下五项是研究提案。

### 方向 1：跨任务受控累积曲线
固定底座和预算，随机排列相关任务并测新任务学习斜率；补足本文单任务 300 trajectories 的外推不足。需 permutation、matched memory-off、置信区间；风险是任务非交换性。

### 方向 2：不确定性感知的 memory quarantine
新条目先隔离，只有反复成功后才进入 steering；可能降低 3% false positive 的连锁污染。验证污染恢复速度；风险是 memory 增长变慢。

### 方向 3：因果状态而非纯视觉相似检索
加入对象姿态、接触、任务阶段和 proprioception，减少 state aliasing。验证遮挡/接触变化集；风险是跨本体表征难统一。

### 方向 4：可学习但预算匹配的 prior strength
用小型校准器预测 $t_0$，与现有手工映射在相同训练和推理预算下比较。风险是破坏 training-free 叙事并过拟合。

### 方向 5：失败与恢复双记忆
除成功先验外，存失败动作禁区和成功 recovery，形成正负约束。验证长时任务的重复错误率；风险是负记忆误杀可行行为。

## 13. 阅读检查题与参考答案

### 题 1：为什么成功轨迹适合作为本地部署先验？
**答案**：它隐含验证了当前相机、几何、标定和控制偏差下某种行为能工作。
### 题 2：为什么不能存全部 rollout？
**答案**：失败/回退会污染检索；未验证 memory 把 92.4% 降到 87.6%。
### 题 3：为什么截断到进度峰值？
**答案**：去掉接近成功后的碰撞、过冲和冗余动作。
### 题 4：DTW 在哪里起作用？
**答案**：过滤视觉相似但动作轨迹与一致簇冲突的候选。
### 题 5：$t_0$ 小意味着什么？
**答案**：更接近 elite prior、噪声更少、历史引导更强。
### 题 6：为什么 direct replay 会差？
**答案**：它不能根据当前观察修正历史动作，Table 4 只有 87.8%。
### 题 7：部署时训练参数吗？
**答案**：不训练；只更新 memory 并改变采样初态。
### 题 8：最关键主结果是多少？
**答案**：LIBERO $\pi_{0.5}$ 92.4±0.2→94.4±0.3；SIMPLER CogACT 75.8±0.3→79.5±0.2。
### 题 9：300-trajectory 曲线证明了什么、没证明什么？
**答案**：证明单任务 bounded memory 随积累提升并饱和；没证明跨任务、跨顺序的受控 lifelong scaling。
### 题 10：最低复现公平性要求是什么？
**答案**：相同 checkpoint、初始状态、trajectory order 和预算，memory-on/off 多 seed 配对比较，并报告置信区间与污染失败。
