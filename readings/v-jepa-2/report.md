> V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning — Assran et al. (2025). Source: https://arxiv.org/abs/2506.09985v1. License: CC-BY-4.0 (https://creativecommons.org/licenses/by/4.0/). Chinese translations and figure/table extraction are adaptations; no author endorsement is implied.

# 《V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning》中文精读报告

> 论文：Mahmoud Assran 等，*V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning*，arXiv:2506.09985v1，2025。
> 阅读约定：
> - “论文事实”表示可由正文、公式、图表或附录直接核对。
> - “评价”表示对证据边界的分析。
> - “这是推断”表示论文未直接给出的研究判断；证据不足处写“不确定”。

## 1. 这篇论文一句话在做什么

V-JEPA 2 先从超过一百万小时的网络视频中学习“视频里什么会变化、怎样变化”的抽象表示，再冻结视觉编码器，用不到 62 小时机器人视频训练动作条件化预测器，最后不生成像素，而是在隐空间里搜索能让未来表示接近目标图像的机器人动作。

**论文事实**：论文研究的是从观察中学习可迁移的物理表征，提出扩展版 V-JEPA 2，并展示理解、动作预期、视频问答以及真实机器人规划；机器人部分 V-JEPA 2-AC 使用 DROID 的 23k 条轨迹，在两个未见实验室的 Franka 上零样本执行 reach、grasp、reach-with-object 和 pick-and-place（Figure 1、Section 3–4、Table 2）。

## 2. 背景从 0 讲起

传统视频模型常在像素空间预测下一帧。像素包含纹理、光照和背景等大量细节，精确重建昂贵，而且“画得像”不等于捕捉了与行动有关的物理规律。JEPA（Joint-Embedding Predictive Architecture，联合嵌入预测架构）换了目标：先把视频编码成抽象表示，再预测被遮挡或未来区域的表示，不强制还原每个像素。

V-JEPA 2 的第一阶段是 action-free observation pretraining：没有机器人动作标签，只从网络视频学习稳定、带时间结构的视觉表示。第二阶段才引入机器人动作，把冻结表示变成 action-conditioned world model。这样将“理解自然视频”和“理解机器人控制坐标”拆开，减少昂贵机器人数据需求。

此前机器人世界模型主要有三类：像素/视频生成模型，能可视化但规划慢；任务特定动力学模型，数据效率较高但泛化有限；VLA 行为克隆策略，直接输出动作但不显式预测候选动作后果。V-JEPA 2-AC 的价值在于：用统一隐空间把大规模观察学习与测试时 MPC（模型预测控制）连接起来，并真正部署到真实机械臂（Section 1、Related Work）。

## 3. 论文的问题定义

- **预训练输入**：完整视频 $y$ 及其随机丢弃部分图像块后的视图 $x$，另有标明遮蔽位置的 mask token；混入 1M ImageNet 图像训练。
- **预训练输出**：encoder $E_\theta$ 的时空 patch 表示和 predictor $P_\phi$ 对目标表示的预测。
- **机器人后训练输入**：当前/历史视频帧 $x_t$、7 维末端执行器状态 $s_t$、7 维相对动作 $a_t$。
- **机器人后训练输出**：未来帧的 latent representation $\hat z_{t+1}$，不是未来 RGB。
- **规划输入/输出**：当前表示 $z_k$、机器人状态 $s_k$、目标图像表示 $z_g$；输出最小化预测未来与目标距离的动作序列。
- **训练目标**：预训练用 masked representation L1；V-JEPA 2-AC 用 teacher-forcing loss 加 rollout loss。
- **冻结/更新**：机器人后训练冻结 V-JEPA 2 encoder，只训练新 action-conditioned predictor；CEM 规划时模型参数冻结，只优化动作分布。
- **环境/reward**：真实 Franka + RobotiQ，使用未标定单目 RGB；没有任务 reward，也没有任务专用训练，目标函数是与目标图像 latent 的 L1 距离。
- **运行时**：每步用 CEM 采样候选动作、预测未来、选第一步执行，再读取真实图像重规划。

注意：视频问答分支会训练 LLM/projector，在部分设置还会解冻视觉 encoder；它与机器人 V-JEPA 2-AC 是不同下游分支，不能把“机器人训练只更新 predictor”扩展到整篇所有实验。

## 4. 方法总览

1. 构建 VideoMix22M：SSv2、Kinetics、HowTo100M、经检索清洗的 YT-Temporal-1B，再混入 ImageNet。
2. 对视频 patch 做 mask，online encoder 看不完整输入，predictor 回归 EMA target encoder 给出的完整目标表示。
3. 通过模型规模、分辨率、帧数、长训练和 cooldown 扩展 V-JEPA 2。
4. 冻结视觉 encoder，在 DROID 上加入 action/end-effector token，训练 block-causal action-conditioned predictor。
5. 同时优化逐步 teacher forcing 和多步 rollout loss，降低自回归误差累积。
6. 给定目标图像，在 latent space 定义能量；用 Cross-Entropy Method 反复采样并更新动作高斯分布。
7. 执行第一步动作，获取新观测后重新规划，形成 MPC 闭环。

文字流程图：`网络视频 → 无动作表示预训练 → 冻结 encoder → 少量机器人轨迹训练 predictor → 当前图像+候选动作 → 预测未来 latent → 与目标 latent 比较 → CEM 选动作 → 真实执行并重规划`。

## 5. 核心机制精读

### 5.1 Masked representation prediction

它解决像素重建把容量浪费在不可预测细节的问题。输入是不完整视频 token 与 mask 位置，输出目标 patch 的表示；target encoder 是 online encoder 的 EMA，并通过 stop-gradient 阻断坍塌式共同适配。若去掉它，就没有可从网络视频迁移的基础表示，机器人 predictor 需要从 62 小时数据重新学习视觉与动力学。

### 5.2 数据与规模扩展

Table 1 每一行给一个数据源，列出样本数、视频类型、总小时、是否清洗和训练采样权重。YT-Temporal-1B 提供 19M 样本、约 1.6M 小时，但训练权重仅 0.188；ImageNet 占 0.250，说明实际采样不是按原始规模比例。Figure 4 显示 VM22M 比 VM2M 平均约 +1，检索清洗 YT1B 约 +1.4；Figure 5 显示 300M→1B 平均约 +1.7，progressive resolution training 最多节约约 8×训练时间。

### 5.3 Action-conditioned predictor

输入当前 latent、历史动作和末端状态，输出未来 latent。block-causal attention 保证时刻 $k$ 只看当前及过去信息。teacher forcing 学一步准确性；rollout loss 把预测重新作为输入，直接约束长展开终点。Figure 6 解释两条路径。去掉 rollout loss 的具体机器人消融没有在主表给出，因此其独立效果**不确定**。

### 5.4 Latent energy 与 CEM

规划不训练新 policy，而是把动作当优化变量。CEM 初始化每个时刻动作的高斯分布，采样轨迹，用 Eq. (5) 打分，取 top-k 更新均值和方差，重复后返回均值轨迹。它输出 action sequence；MPC 只执行第一步。优点是任务切换只需新目标图像；缺点是每一步都要做大量模型前向。

### 5.5 目标图像与分阶段子目标

reach/grasp 使用一张目标图；pick-and-place 人工提供抓取、靠近目标、最终放置三个图像阶段，并在预定时刻切换。它把长任务分解成可贪心优化的短阶段。若没有这些子目标，Section 4.3 明确指出长时规划受自回归误差和指数级动作搜索空间限制。

## 6. 公式/算法逐行解释

**Eq. (1)**：

$$
\min_{\theta,\phi,\Delta_y}\|P_\phi(\Delta_y,E_\theta(x))-\operatorname{sg}(E_{\bar\theta}(y))\|_1.
$$

$x$ 是遮蔽后的可见视频视图，$y$ 是完整视频，损失仅计算被遮蔽块对应的预测，$E_\theta$ 为 online encoder，$E_{\bar\theta}$ 为 EMA target encoder，$P_\phi$ 是 predictor，$\Delta_y$ 表示目标位置，sg 是 stop-gradient。代码就是对预测 patch embedding 和 target embedding 做 L1。

**Eq. (2)** teacher forcing：对 $k=1\ldots T$，用截至 $k$ 的真实 latent、动作和状态预测 $z_{k+1}$，再平均 L1。它让每一步都见到正确历史。

**Eq. (3)** rollout：从初始 $z_1,s_1$ 和整段动作 $a_{1:T}$ 自回归到终点，只约束预测终点与 $z_{T+1}$。中间输入来自模型自身，因此专门训练误差累积场景。

**Eq. (4)**：$L(\phi)=L_{teacher-forcing}+L_{rollout}$。两项等权相加，encoder 已冻结，优化变量主要是 $\phi$。

**Eq. (5)**：

$$
\mathcal E(\hat a_{1:T};z_k,s_k,z_g)=\|P(\hat a_{1:T};s_k,z_k)-z_g\|_1.
$$

$z_g$ 是目标图像表示，$P$ 展开候选动作后的未来表示；能量越低越好。它对应 Figure 7 的 CEM 打分。

附录还用最小二乘 $W^*=\arg\min_W\|AW-B\|$ 分析相机视角下推断动作坐标与真实动作之间的线性变换；目的不是在线校准控制器，而是诊断相机位置敏感性。

```python
mu, sigma = zeros(T, 7), ones(T, 7)
for _ in range(10):
    actions = sample_gaussian(mu, sigma, population=800)
    actions = project_to_l1_ball(actions, radius=0.075)
    future_z = world_model.rollout(z_now, robot_state, actions)
    energy = l1(future_z, z_goal)
    elite = actions[energy.argsort()[:k]]
    mu, sigma = elite.mean(0), elite.std(0)
execute(mu[0])
```

## 7. 实验部分精读

论文实验实际上有四组：视觉分类、动作预期、视频问答、机器人规划。backbone 为 V-JEPA 2 ViT-L/H/g（约 300M/600M/1B）；机器人用冻结 encoder + 新 predictor，本地模型；视频问答接 Qwen2-7B-Instruct 或 Llama 3.1 8B。

**Table 2** 的行是 Octo 与 V-JEPA 2-AC，在 Lab 1、Lab 2 和平均值比较；列依次为 reach、cup/box grasp、cup/box reach-with-object、cup/box pick-and-place。V-JEPA 2-AC 平均为 100%、65/25%、75/75%、80/65%，Octo 为 100%、15/0%、15/70%、15/10%。reach 已饱和，最有信息量的是接触操作；但每格只有 10 trials，5–10 个百分点差异不稳健。

**Table 3** 固定 Lab 2，比 Cosmos 与 V-JEPA 2-AC 的样本数、迭代数、horizon、时间及五项技能。Cosmos 80 samples/10 iterations/horizon 1，每动作 4 分钟；V-JEPA 2-AC 800 samples、同样 10/1，每动作 16 秒。后者即使采样数为 10× 仍更快；到达、杯子抓取和两项拾取放置更好，盒子抓取则同为 20%。最强结论不是“latent 一定比像素好”，而是在这组实现和单卡 4090 预算下，latent MPC 的速度—成功率明显更优。

**Table 4** 的列为参数量、六任务平均、三项 motion understanding（SSv2、Diving-48、Jester）和三项 appearance understanding（K400、COIN、IN1K）；V-JEPA 2 ViT-g384 平均 88.2，SSv2 77.3。不同方法部分数值来自文献、部分按统一协议重测，横向时要看分组。

**Table 5** 在 EK100 报 verb/noun/action mean-class recall@5。V-JEPA 2 随 300M→1B 增长，g384 为 63.6/57.1/39.7；这里 predictor 只带来小幅一致增益（Table 20），encoder 本身贡献很大。

**Table 6–8** 是视频问答。Table 6 固定冻结视觉 encoder 与 Qwen2-7B，V-JEPA 2 平均 52.3，高于三个图像 encoder；Table 7 端到端训练从 L256 的 51.7 增至 g512 的 54.4；Table 8 使用 88.5M 对齐样本与 Llama 3.1 8B，平均 59.5、PerceptionTest 84.0、TempCompass 76.9，但 TVBench/MVBench 并非所有列都最好。这部分证明视频表示通用性，不直接证明机器人规划。

主要警惕点：机器人任务需要人工目标图和 pick-place 子目标；相机位置是人工试出来的；规划 16 秒/动作仍远非实时；仅两个实验室、两类物体；没有任务语言目标、动态障碍或长时非贪心任务。Section 4.3 对这些限制写得较坦诚。

## 8. 训练和推理成本分析

- **预训练**：最大 V-JEPA 2 为约 1B encoder，数据超过 1M 小时；Figure 5 报 GPU-days 曲线但正文没有一个简单总 GPU-hour 数。完整从头复现成本非常高。
- **机器人后训练**：冻结 encoder，使用 DROID 左侧外部相机、23k trajectories、少于 62 小时视频；batch 256，4500 warmup + 85500 constant + 4500 decay iterations（Appendix 11.1）。
- **机器人推理**：论文在单张 RTX 4090 上，V-JEPA 2-AC 使用 800 samples、10 次 CEM refinement、horizon 1，为 16 秒/动作；Cosmos 为 4 分钟/动作。
- **视频问答**：受控实验使用 128×H100；大规模 Stage 2/3 使用 512×H100。这不是机器人 V-JEPA 2-AC 的必要成本。
- **API**：不需要商业 API，代码和权重为本地运行路线。

你现有 8×A100 80GB 更适合直接使用公开 encoder，复现 V-JEPA 2-AC 后训练和仿真/离线规划，不适合从 22M 数据重做预训练。最小版本可把 predictor、分辨率、CEM population 和数据子集缩小。机器人后训练确切 GPU 数和总时长在论文正文中没有明确汇总，因此**不确定**。

## 9. 这篇论文真正的贡献

作者声称统一理解、预测和规划。最站得住的贡献有三点：大规模无动作视频预训练的高质量通用表示；冻结 encoder 后用很少机器人视频获得动作条件化隐动力学；在两个未见实验室用同一权重做零样本真实 MPC，并与 Octo/Cosmos 对比。

工程组合包括 EMA teacher、masked prediction、CEM、MPC、目标图与 DROID，这些单独都非新技术。真正有研究价值的组合是“互联网观察学习 → 少量动作对齐 → latent planning”。

Reviewer 可能质疑：机器人任务规模小；人工选相机位置和子目标削弱开放世界泛化；16 秒控制频率；无语言目标；world model 的物理一致性主要用任务成功间接检验；大规模数据和算力使预训练难复现。论文标题中的“planning”成立，但目前是短 horizon、图像目标、采样式控制，不等于通用长时机器人规划。

## 10. 和相关论文的关系

- **RAG / memory agent**：V-JEPA 2 不检索经验，不保留任务级记忆。
- **Test-time adaptation**：规划时不改参数，只优化动作；严格说是 test-time optimization，不是参数 TTA。
- **Reinforcement learning**：机器人部分没有 reward 或 policy RL；CEM 在 world model 中做轨迹优化。
- **World model**：它预测与控制相关的潜表示，机器人 MPC 直接在该表示空间计算能量；本文这一路径不需要像 Cosmos 那样生成未来像素。附录 11.3 另外训练逐帧解码器，将潜表示还原为图像以分析预测；该解码器用于可视化，并非 MPC 的必要环节。
- **Agent planning**：显式评估候选动作后果，属于模型预测控制；但高层任务分解由人工目标图承担。
- **Self-evolving agent**：不属于持续自进化；部署过程中既不更新记忆也不更新参数。
- **DINO-WM**：都在预训练视觉特征上学 latent dynamics；V-JEPA 2 更强调互联网视频扩展、DROID 对齐和真实机器人。
- **Octo/VLA**：Octo 直接行为克隆输出动作；V-JEPA 2-AC 在测试时搜索动作，没有训练任务 policy。
- **Cosmos**：像素生成可解释，但规划吞吐低；Table 3 是论文最直接的两类 world model 对照。

## 11. 我应该怎么复现一个最小版本

最小环境可用 Push-T、LIBERO 单任务或 Franka 仿真；使用公开 V-JEPA 2 ViT-L/H encoder，冻结参数，训练一个较小 transformer predictor。数据存储 `(frame, ee_state, delta_action, next_frame, trajectory_id, camera_id)`，必须按 trajectory 切分。

```python
encoder = load_vjepa2().freeze()
for clip in robot_dataset:
    z = encoder(clip.frames)
    loss_tf = teacher_forcing(predictor, z, clip.actions, clip.ee_states)
    loss_ro = rollout_loss(predictor, z, clip.actions, clip.ee_states)
    update(predictor, loss_tf + loss_ro)

while not done:
    action_seq = cem_plan(predictor, encoder(obs), encoder(goal))
    obs = env.step(action_seq[0])
```

日志至少记录：一步/多步 latent error、horizon 曲线、CEM population/iterations、每动作耗时、目标距离、成功率、相机姿态、动作越界率。最小表比较 BC policy、pixel world model、latent world model；列出 reach、grasp、pick-place、time/action 和 long-horizon degradation。

## 12. 如果我要基于它做新论文

以下五项都是研究提案。

### 方向 1：语言目标到 latent goal
用语言或 VLM 生成/检索目标表示，替代人工目标图和子目标。实验需测未见语言组合和长任务；风险是语言—状态对齐模糊。

### 方向 2：分层 latent planning
高层提出对象/接触子目标，低层 V-JEPA 2-AC 做 MPC，解决 horizon=1 和人工切换。需要无子目标 pick-place 与长时任务；风险是高层错误传播。

### 方向 3：相机等变世界模型
显式输入相机外参或学习 SE(3) 等变表示，解决 Section 4.3 的视角敏感性。需跨视角、跨实验室标定实验；风险是额外传感/标定要求。

### 方向 4：不确定性与安全 MPC
对 latent rollout 给置信区间，遇到 OOD 动作降低步长或请求恢复策略。需做校准、碰撞率和成功率；风险是过保守与计算增加。

### 方向 5：经验残差记忆
冻结大模型，把真实执行与预测差异存为任务/物体条件化残差，运行时检索修正能量。它与 MemRL/WorldEvolver衔接，需长期重复任务和遗忘实验；风险是错误记忆污染和跨物体负迁移。

## 13. 阅读检查题与参考答案

### 题 1：JEPA 为什么不要求重建像素？
**答案**：目标是预测抽象表示，避免把容量浪费在纹理等难预测且未必与控制相关的细节。

### 题 2：V-JEPA 2 和 V-JEPA 2-AC 的训练数据有什么不同？
**答案**：前者用大规模无动作网络视频/图像；后者冻结 encoder，用少于 62 小时带机器人状态和动作的 DROID 视频训练 predictor。

### 题 3：teacher forcing 与 rollout loss 各解决什么？
**答案**：前者保证逐步预测准确；后者让模型面对自己的预测输入，降低多步误差累积。

### 题 4：Eq. (5) 在优化什么？
**答案**：优化动作序列，使 world model 预测的未来 latent 与目标图像 latent 的 L1 距离最小。

### 题 5：为什么它不属于强化学习？
**答案**：机器人部分没有 reward，也不训练 policy；测试时用 CEM 对动作做模型预测优化。

### 题 6：Table 2 最有说服力的列是哪类？
**答案**：grasp 和 pick-and-place，因为 reach 两种方法都接近饱和，接触任务更能区分世界模型与 VLA。

### 题 7：latent planning 相对 Cosmos 的主要优势是什么？
**答案**：单卡 4090 上即使采样数 10×，仍由 4 分钟/动作降至 16 秒，并在接触任务成功率更高。

### 题 8：为什么 pick-and-place 还不算真正长时自主规划？
**答案**：作者人工提供三个目标图并按预定步数切换，解决了高层分解问题。

### 题 9：运行时会更新 V-JEPA 2 参数吗？
**答案**：不会；模型冻结，CEM 只更新候选动作分布。

### 题 10：8×A100 的最现实复现边界是什么？
**答案**：使用公开 encoder 做 V-JEPA 2-AC 后训练和 MPC；不从 22M 数据重做基础预训练。
