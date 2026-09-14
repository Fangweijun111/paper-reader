> 公开仓库仅提供原创精读分析与来源链接；未转载本文全文、完整译文、PDF或原始图表。该决定表示尚未确认再发布许可，并非论文不能公开阅读。[官方原文](https://arxiv.org/abs/2602.11075v2)。

# 《RISE: Self-Improving Robot Policy with Compositional World Model》中文精读报告

> 论文：Jiazhi Yang 等，*RISE: Self-Improving Robot Policy with Compositional World Model*，arXiv:2602.11075v2，2026。
> 阅读约定：
> - “论文事实”表示可由正文、公式、图表或附录直接核对。
> - “评价”表示基于论文证据作出的审慎判断。
> - “这是推断”表示论文未直接声称、但可以由现有证据推导的分析。

## 1. 这篇论文一句话在做什么

用最直白的话说：RISE 不让机器人在昂贵而危险的真实环境里反复试错，而是训练一个能够根据机器人动作生成未来多视角画面的动力学模型，再用价值模型评价这些“想象轨迹”，最后用带优势条件的想象数据继续训练机器人策略。

**论文事实**：研究对象是接触丰富、长时程的真实机器人操作；问题是 VLA（视觉—语言—动作模型）靠模仿学习容易在偏离示范后累积错误，而真实世界在线强化学习又受硬件、复位和安全成本限制；方法是由可控动力学模型与进度价值模型组成的 Compositional World Model，以及在其中进行的策略自我改进循环（Abstract、Figure 1、Section III）。

技术上更精确地说：RISE 学习 $\mathcal D(o,a)$ 预测动作条件化未来，学习 $\mathcal V(o,\ell)$ 评价任务进度，由二者计算 action chunk 的 advantage，再更新 advantage-conditioned VLA；世界模型只用于训练，不参与最终真实机器人推理（Section III-A、Eq. (1)–(2)）。

## 2. 背景从 0 讲起

机器人策略接收摄像头、机器人状态和语言指令，输出关节或末端执行器动作。当前主流 VLA 通常从大量示范中做行为克隆：给定当前观测，模仿示范者的动作。这种方法简单稳定，但训练数据只覆盖有限状态；一旦执行误差把机器人带到示范分布之外，策略未必知道怎样恢复，这叫 exposure bias（暴露偏差，Section I）。

强化学习通过成功和失败反馈改善策略，理论上能学习恢复行为。但真实机器人 rollout 串行、速度慢、需要人工监控和复位，错误还可能损坏物体或硬件。仿真环境可以并行采样，却常与真实视觉和接触动力学存在 sim-to-real 差距。

世界模型试图学习环境转移：给定当前状态和动作，预测下一状态或未来序列。在机器人中，世界模型至少要满足两点：第一，未来必须真正服从动作，而不是只生成“看起来合理”的视频；第二，必须提供足够密集的学习信号，否则每个候选动作都要生成到任务终点才能判断好坏，长视频误差会迅速累积（Section I）。

RISE 的切入点是把两个难题拆开：动力学模型负责“会发生什么”，价值模型负责“这对任务有没有进展”。这样不必让视频生成器同时承担物理预测和奖励判断，也不必把每条想象轨迹展开到终点（Figure 4）。这个问题值得做，因为它把机器人 RL 的主要消耗从真实交互移向计算；但 Section VII 也明确承认，这只是成本转移，不是成本消失。

## 3. 论文的问题定义

- **输入**：时刻 $t$ 的 $n$ 路相机观测 $o_t=[m_t^1,\ldots,m_t^n]$、长度为 $N$ 的视觉历史 $\mathbf O_t$、语言任务 $\ell$、策略提出的长度为 $H$ 的动作块 $\mathbf a_t$。
- **世界模型输出**：动力学模型输出未来多视角观测 $\hat o_{t+1:t+H}$；价值模型输出每个观测相对任务的标量进度 $\mathcal V(o,\ell)$；二者合成动作块 advantage。
- **最终输出**：训练后的 VLA 策略直接输出 14 维、长度为 50 的 action chunk；真实部署时不调用世界模型（Table X、Section III-D）。
- **优化目标**：动力学模型用 flow matching 学动作条件化视频；价值模型最小化 progress regression 与 TD loss；策略用统一的 flow-matching 行为学习目标拟合带 advantage 标注的离线和想象动作（Section III）。
- **训练阶段**：先预训练/微调动力学模型，训练价值模型；再用真实离线经验 warm-up 策略；最后冻结世界模型，在想象环境中生成 on-policy 数据并更新策略。
- **测试/部署阶段**：冻结策略参数，真实机器人直接执行策略，不做在线视频生成或继续学习。
- **更新与冻结**：自我改进循环中，动力学模型和价值模型冻结，behavior policy 更新；rollout policy 是 behavior policy 的 EMA。最终部署时全部冻结（Section XI-C）。
- **环境、reward、feedback**：想象环境由 $\mathcal D$ 提供视觉状态；$\mathcal V$ 给出进度，终点成功/失败用于 TD 训练时取 $+1/-1$，中间 reward 为 0；策略学习信号是由预测进度变化得到的 advantage，而不是现实环境即时 reward。

## 4. 方法总览

1. **收集任务离线数据**：每个任务包含人类示范、成功/失败策略 rollout，部分任务还有 DAgger 人工纠正；用于把所有模型锚定在真实分布。
2. **训练可控动力学模型**：从 GE-Base 初始化，加入轻量动作编码器，在 Agibot World、Galaxea 和任务数据上学习从多视角历史与动作块生成未来 25 帧。
3. **训练进度价值模型**：从 $\pi_{0.5}$ VLA 初始化，以时间进度提供平滑监督，再用成功/失败轨迹的 TD 目标学习对细微失败敏感的价值。
4. **策略 warm-up**：把离线 rollout 用世界模型价值标为不同 advantage bin；专家与人工纠正直接放入最高 advantage bin，训练可接受 advantage 条件的策略。
5. **在想象中 rollout**：从真实离线状态出发，rollout policy 按“最优 advantage”提出动作；动力学模型生成未来，价值模型反算真实 advantage，并最多连续展开两次。
6. **更新 behavior policy**：将 $\langle o,\hat a,A\rangle$ 与一定比例的离线数据混合训练；用 EMA 刷新 rollout policy，重复约 10k steps。
7. **真实部署**：丢开世界模型，只部署改进后的 VLA。

流程可概括为：`真实离线状态 → 候选动作 → 动力学想象 → 价值评价 → advantage 标注 → 策略训练 → EMA rollout policy`。离线状态避免从任意生成状态起步；短展开控制视频误差；离线数据混合抑制灾难性遗忘。

## 5. 核心机制精读

### 5.1 可控动力学模型

它解决普通视频模型“画面漂亮但不听动作”的问题。输入三路历史 RGB 和未来 action chunk，输出 25 帧多视角未来。模型从 GE-Base 初始化，加入动作编码器，并采用 task-centric batching：同一 batch 更多覆盖同场景不同动作，优先学习动作差异。Table V 中完整模型在真实任务上 EPE 为 0.54，低于 GE 的 1.05 和 Cosmos 的 1.21；但 FVD 66.84 略差于去掉 task-centric 的 61.22，说明动作可控性与某些分布级画质指标并非同步改善。

若去掉预训练，Table IV 的 sorting completion 从 70% 降至 15%；去掉 task-centric，降至 40%。消融支持它不仅是展示视频的装饰模块。

### 5.2 Progress Value Model

它把每个图像状态映射为任务进度。输入观测和指令，输出一个标量。只用 $t/T$ 回归会得到平滑但对错误迟钝的单调曲线；只用 TD 又可能不稳定，因此作者相加两项。Table IV 中去 progress 时 completion 为 50%，去 TD 时为 35%，完整模型为 70%。Figure 15 的定性结果进一步说明 progress 提供数值稳定性，TD 提供关键步骤和失败敏感性。

### 5.3 Advantage-conditioned policy

策略不仅看观测和指令，还看离散化 advantage。warm-up 让同一个 VLA 学会区分高质量与低质量行为；自我改进时先要求 rollout policy 生成“高 advantage 意图”的动作，再由世界模型验证它实际对应的 advantage。输入是 $(A,o,\ell)$，输出 action chunk。去掉这种质量条件后，系统就难以在同一训练集中同时吸收成功和失败。

### 5.4 想象中的闭环自我改进

每轮从离线真实状态开始，产生动作和未来状态，再把 imagined state 作为下一轮输入，最多两轮。输出是带 advantage 的 on-policy 想象样本。Table III 显示：没有在线动作/状态时 completion 35%；加入在线动作 40%；再加入在线状态达到 70%。这说明提升不仅来自更多动作标签，也来自访问原离线数据未覆盖的状态。

### 5.5 离线数据混合

它解决想象 rollout 导致策略漂移和遗忘。Table II 表明离线比例 0.1 时 completion 只有 5%，0.6 时最高 50%，0.9 又降到 30%。因此离线数据既是稳定器，也可能在比例过高时限制探索。该结论是特定任务上的经验最优点，不应把 0.6 当成普遍常数。

## 6. 公式/算法逐行解释

**Eq. (1)**：$\hat o_{t+1:t+H}=\mathcal D(\mathbf O_t,\mathbf a_t)$。$\mathbf O_t$ 是历史多视角观测，$\mathbf a_t$ 是候选动作块，$\mathcal D$ 是动力学模型。代码上等价于 `future = dynamics(history, action_chunk)`。

**Eq. (2)**：

$$
A(o_t,\mathbf a_t,\ell)=\frac1H\sum_{k=1}^{H}\mathcal V(\hat o_{t+k},\ell)-\mathcal V(o_t,\ell).
$$

它计算“未来平均进度减当前进度”。若为正，动作总体推进任务。实现时生成 $H$ 帧，批量过 value model，求均值再减起点值。

**Eq. (3)**：目标策略由参考策略乘以“产生 improvement 的概率”的 $\beta$ 次幂。$\beta$ 控制偏离参考策略的强度，直觉上是保留原策略概率，同时偏好高优势动作。

**Eq. (4)**：作者用 Bayes 规则把 improvement likelihood 写成条件策略与原策略的密度比。当 $\beta=1$ 时，Eq. (3) 中的原策略项抵消，目标变成给定 improvement 的动作分布，因此工程上用 advantage conditioning 实现。

**Eq. (5)**：

$$
\mathcal L_{prog}=\mathbb E[(\mathcal V(o_t,\ell)-t/T)^2].
$$

$t/T$ 是示范轨迹内的归一化时间进度，提供稠密、稳定但粗糙的监督。

**Eq. (6)**：TD loss 令 $\mathcal V(o_t,\ell)$ 回归 $y_t=r_t+\gamma\mathcal V(o_{t+1},\ell)$。$r_t$ 在中间为 0，成功终点为 $+1$、失败终点为 $-1$；$\gamma$ 为折扣。代码是 `target = reward + gamma * next_value.detach()`。

**Eq. (7)**：$\hat{\mathbf a}_t=\pi_{rollout}(\mathds 1,o_t,\ell)$，即把最优 advantage token、当前观测和语言交给 rollout policy，得到候选动作。

**Eq. (8)**：训练行为策略学习从实际评估到的 advantage、当前观测和指令恢复动作：`loss = flow_matching(policy(A_actual, obs, lang), proposed_action)`。

核心循环伪代码：

```python
freeze(dynamics, value)
for step in range(10000):
    obs = sample_real_offline_state()
    action = rollout_policy(optimal_advantage, obs, instruction)
    future = dynamics(obs_history, action)
    advantage = mean(value(future, instruction)) - value(obs, instruction)
    online_batch.add(obs, action, discretize(advantage))
    behavior_policy.update(mix(online_batch, offline_batch, ratio=0.6))
    rollout_policy.ema_update(behavior_policy, decay=0.995)
```

## 7. 实验部分精读

实验使用双臂 AgileX 平台和三个真实任务：传送带动态砖块分类、可变形背包打包、精细双臂纸盒闭合（Figure 2、Figure 11）。指标包括完整 Success Rate 和按子目标累计的 0–10 Score；Table VII 给出了每个阶段如何计分。

**Table I 主结果**的每行分别是：仅示范微调的 $\pi_{0.5}$、DAgger、PPO、DSRL、离线 advantage conditioning 的 RECAP、完整 RISE。六个数值列是三个任务各自的 success 和 score。RISE 为 85%/9.78、85%/9.50、95%/9.88；主要对比基线 RECAP 分别为 50%/9.00、40%/6.13、60%/8.13；背包装填中 DAgger 的成功率为 50%，高于 RECAP 的 40%，因此 RECAP 并非每项任务上最强的基线。最关键证据是三类动力学难题上 success 都有较大绝对增益，而不仅是分数微调。

需要警惕：附录 X-A 明确说明每项评估基于 20 次自主试验；成功率以 5% 为粒度，论文没有给置信区间；三项任务来自作者自建平台，尚无跨实验室复现。PPO 和 DSRL 比初始化更差，证明现实在线 RL 不稳定，但也意味着这些对比高度依赖实现和有限 rollout 预算。

**Table II–IV 消融**分别验证离线数据比例、在线动作/状态、动力学和价值模块。Table V/VI 用 PSNR、LPIPS、SSIM、FVD 与光流 EPE 评价生成；其中 EPE 更接近动作可控性。Table VIII–X 给出训练步数、batch、学习率、折扣、EMA 和动作维度，是复现关键。

最强正面结果：Table I 的三项真实任务在数值上都明显超过 RECAP；论文未提供显著性检验，不能据此声称统计显著。最需要谨慎的结果：Table V 在真实任务上完整 RISE 的 FVD 并非所有变体中最佳，且生成指标不能自动证明策略提升；真正连接到策略的是 Table III/IV。

## 8. 训练和推理成本分析

- **训练哪些参数**：动力学模型、价值模型和 VLA 策略均需训练；自我改进阶段冻结前两者，只更新 policy。
- **动力学预训练**：16×H100、global batch 512、约 7 天；任务微调 8×H100、batch 64、约 3 天。
- **价值模型**：8 GPU、batch 64、50k steps、约 1 天。
- **策略**：warm-up 后自我改进约 10k steps，8 GPU、global batch 64。
- **数据成本**：三个任务分别含 3063/2478/2286 人类示范和 610/507/524 policy rollout；Box Closing 另有 540 条人类纠正（Appendix XI-A）。
- **部署成本**：世界模型完全移除，只有 VLA 推理，因此论文声称没有额外世界模型推理开销。
- **API**：论文方案是本地训练模型，不依赖商业 LLM API。

这是推断：你现有 8×A100 80GB 可作为任务级微调与缩小版自我改进的尝试配置，实际可行批大小和速度仍需测量；它不等同于论文 16×H100、七天预训练的原配置。最小复现应从公开 GE-Base 初始化，跳过大规模预训练，仅在单个 LIBERO/真实任务数据上微调；这是方法复现，不是数值复现。论文没有报告完整模型参数量、总 GPU-hours 和数据采集人工小时，因此这些成本**不确定**。

## 9. 这篇论文真正的贡献

作者声称的贡献是组合式世界模型、想象中的 on-policy RL，以及三项真实任务提升。实际最站得住的是：把快速动作条件化视频生成与独立的密集价值估计接成可运行的 VLA 后训练闭环，并用模块消融证明 imagined states、TD value 和离线数据锚定都影响策略结果。

更像工程组合的部分包括：GE-Base 初始化、VLA 初始化、progress regression、TD learning、EMA、离线/在线混合和 advantage conditioning；单个组件并不新。创新主要在系统组合和大规模真实机器人验证。

Reviewer 可能质疑：自建任务与有限 trial 缺少统计区间；世界模型错误可能被策略放大；现实数据量仍大；计算成本高；只展开两轮说明还没有解决真正长时世界模型；“on-policy”发生在固定世界模型中，对真实环境并非严格 on-policy。最后一点是**评价**：它更准确地说是相对于 learned simulator 的 on-policy。

## 10. 和相关论文的关系

- **RAG / memory agent**：RISE 不检索历史文本或情景记忆；经验通过梯度写入动力学、价值和策略参数。
- **Test-time adaptation**：它不是测试时适配；自我改进发生在离线训练/后训练阶段，部署时冻结。
- **Reinforcement learning**：它用 advantage 评价想象动作并更新策略，但实现更接近 advantage-conditioned behavior learning，而不是直接对世界模型反向传播或标准 actor-critic。
- **World model**：与只生成视频的 WEM 不同，RISE 明确给世界模型接入 action、value 和 policy improvement；与 V-JEPA 2 的隐空间预测不同，它生成多视角像素未来。
- **Agent planning**：RISE 最终部署的是反应式/动作块 VLA，不在运行时用世界模型搜索计划。
- **Self-evolving agent**：它通过多轮想象 rollout 更新 policy parameters，是参数级自我改进；不同于 MemRL/WorldEvolver 的冻结模型、外部记忆级演化。
- **RECAP**：同样使用 advantage-conditioned policy，但 RECAP 主要从离线经验学习；RISE 用世界模型补充新的 on-policy action/state。
- **Cosmos/Genie Envisioner**：它们是生成基础；RISE 强调任务动作可控性和高吞吐，并额外学习 value。

## 11. 我应该怎么复现一个最小版本

以下是缩小规模的复现提案，属于推断：环境可选 LIBERO 或单个桌面拾取放置任务，模型采用较小视频预测器、可接受优势条件且允许参数更新的动作策略，以及轻量价值网络。若完全冻结动作策略，就无法复现 RISE 通过训练改进策略的核心循环。存储结构至少包括真实 episode、当前/未来多视角帧、语言、action chunk、terminal reward、progress、数据来源和模型版本。

```python
train_dynamics(real_episodes)
train_value(success_and_failure_episodes)
warmup_policy(label_offline_advantages(real_episodes))
freeze(dynamics, value)
for iteration in range(K):
    imagined = rollout_from_real_states(policy_ema, dynamics, max_depth=2)
    scored = attach_advantage(imagined, value)
    train_policy(mix(scored, real_episodes, offline_ratio))
```

必须记录：生成视频与真实 next frame 的 EPE/LPIPS；value 与成功、子目标进度的相关性；advantage bin 分布；imagined rollout 深度；离线/在线比例；策略成功率；世界模型失败类型；每千条想象样本耗时。

最小实验表应包含：BC、BC+真实失败数据、RISE w/o imagined state、RISE full；列出 success、stage score、EPE、planning/training throughput 和真实数据量。先在仿真验证后再做小规模真实机器人安全评估。

## 12. 如果我要基于它做新论文

以下五项均为研究提案，不是原论文已经完成的内容。

### 方向 1：不确定性感知的想象门控
Idea 是估计动力学不确定性，只让低不确定 rollout 更新策略；相对原文固定展开两轮，增加选择性 foresight。可能减少幻觉状态污染。实验需比较 ensemble/flow uncertainty、校准误差和真实成功率；风险是过度保守导致覆盖不足。

### 方向 2：冻结大模型的非参数残差记忆
保持动力学和 VLA 冻结，把“预测—现实偏差”存成可检索的物理残差和失败规则，在下一次想象时修正预测或 advantage。它把 WorldEvolver/MemRL 引入机器人，成本小于反复训练。实验需做长期重复任务和分布漂移；风险是记忆检索延迟和错误迁移。

### 方向 3：对象与接触结构化世界模型
在像素视频之外显式预测物体、接触和约束图，针对拉链、纸盒等精细接触。验证应加入接触事件准确率、OOD 物体和几何约束违反率；风险是标注与传感器要求高。

### 方向 4：真实—想象自适应配比
用世界模型误差、策略不确定性和任务阶段动态决定离线比例，替代固定 0.6。需要跨任务、跨训练阶段的 Pareto 实验；风险是配比控制器本身不稳定。

### 方向 5：反事实信用分配
同一状态生成多条动作分支，用 pairwise preference 或 counterfactual value 分辨哪一维动作导致成功。它比单标量 chunk advantage 更细。实验需测样本效率和失败恢复；风险是分支数量造成计算爆炸。

## 13. 阅读检查题与参考答案

### 题 1：RISE 为什么不用一个视频模型同时输出 reward？
**答案**：生成未来和判断任务进度需要不同归纳偏置；拆分后可分别优化速度、动作可控性、稠密进度和失败敏感性。

### 题 2：Eq. (2) 的 advantage 表示什么？
**答案**：预测未来 $H$ 帧的平均任务价值相对当前价值的提升，衡量整个 action chunk 是否推进任务。

### 题 3：为什么价值模型同时需要 progress loss 和 TD loss？
**答案**：progress 稳定稠密但对细微失败不敏感；TD 利用成功/失败区分关键错误但可能更不稳定，二者互补。

### 题 4：自我改进时哪些模型被冻结？
**答案**：动力学和价值模型冻结；behavior policy 更新，rollout policy 用其 EMA 更新。

### 题 5：Table III 证明了什么？
**答案**：仅加入在线动作提升有限，而加入 imagined online states 后 completion 从 40% 到 70%，说明状态覆盖是关键来源。

### 题 6：为什么离线比例不是越低越好？
**答案**：想象数据分布会漂移；Table II 中 0.1 导致严重遗忘，真实离线数据承担锚定作用。

### 题 7：RISE 的“自我改进”与 MemRL 有何不同？
**答案**：RISE 用梯度更新 VLA 参数；MemRL 冻结 LLM，通过环境反馈更新外部记忆 Q 值。

### 题 8：世界模型是否在真实部署时实时规划？
**答案**：否。它只在策略训练阶段产生和评价想象数据，最终部署只运行 VLA。

### 题 9：主实验最需要警惕什么？
**答案**：任务为自建平台、trial 数有限且无置信区间，world-model on-policy 不等于真实环境 on-policy。

### 题 10：最小复现为什么不应从头预训练动力学模型？
**答案**：原论文预训练需要 16×H100 约七天；MVP 应使用公开初始化并在单任务微调，先验证闭环机制。

