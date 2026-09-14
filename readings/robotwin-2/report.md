> 公开仓库仅提供原创精读分析与来源链接；未转载本文全文、完整译文、PDF或原始图表。该决定表示尚未确认再发布许可，并非论文不能公开阅读。[官方原文](https://arxiv.org/abs/2506.18088v2)。

# 《RoboTwin 2.0: A Scalable Data Generator and Benchmark with Strong Domain Randomization for Robust Bimanual Robotic Manipulation》中文精读报告

> 论文：Tianxing Chen 等，*RoboTwin 2.0: A Scalable Data Generator and Benchmark with Strong Domain Randomization for Robust Bimanual Robotic Manipulation*，arXiv:2506.18088v2，2025。
> 阅读约定：
> - “论文事实”表示可由正文、图表或附录直接核对。
> - “评价”表示基于论文证据作出的审慎判断。
> - “这是推断”表示论文未直接声称、但可以由现有证据推导的分析。
> - 材料不足以支持可靠判断时，明确写“不确定”。

**论文信息**：arXiv v2 修订于 2025-08-27，共 24 页；论文发布 RoboTwin-OD、自动专家代码生成器、10 万级合成轨迹、50 任务 benchmark、代码和文档。

## 1. 这篇论文一句话在做什么

用最直白的话说：RoboTwin 2.0 不是提出一个新的机器人策略，而是造了一套“自动出题—自动写专家程序—在仿真里反复运行和修错—随机改变场景—批量采集双臂轨迹—统一测策略”的基础设施。

**论文事实**：研究对象是大规模双臂机器人训练数据与评测；问题是新任务的专家轨迹难以自动、可靠地生成，现有仿真场景又过于干净，导致策略遇到杂物、光照、背景、桌高、语言或机器人形态变化时失效；方法由 RoboTwin-OD 物体库、DeepSeek-V3 代码生成器、仿真执行日志、Moonshot/Kimi 视觉—语言观察器、五类域随机化以及形态感知抓取适配组成（Abstract、Figure 1–6、Section 2）。

技术上更精确地说：系统把自然语言任务映射为技能 API 组成的 Python 专家程序，对每个候选程序每轮运行 10 次，用执行日志和多模态诊断迭代修复，随后在域随机化环境和五种双臂形态上生成轨迹；这些轨迹用于训练/微调 ACT、DP、DP3、RDT 与 $\pi_0$ 并在 Easy/Hard 与真实环境中评测（Section 2、Section 4、Appendix D/G）。

## 2. 背景从 0 讲起

双臂操作比单臂操作多一层协调难题：两个机械臂既可能独立行动，也可能交接同一物体；抓取姿态还受自由度、工作空间和夹爪结构影响。训练 VLA（Vision-Language-Action，视觉—语言—动作模型）需要覆盖任务、物体、场景、语言和机器人形态的大量轨迹，但真实示范昂贵、慢且难规模化（Section 1）。

仿真数据是一条可扩展路线。传统做法通常由人写任务脚本、在固定场景采集，再用少量纹理或相机扰动做 domain randomization（域随机化）。三个不足是：脚本开发仍依赖人工；运行失败未被系统筛除；随机化过浅，合成数据和真实部署差异仍大。对双臂系统而言，一个在 Franka 上可行的俯视抓取，在低自由度 Piper 上可能根本无法规划（Section 1、2.3）。

RoboTwin 1.0 已提供双向数字孪生和 14 个任务；RoboTwin 2.0 扩展为 50+ 任务，加入 MLLM 代码生成—执行—反馈闭环、系统化域随机化、物体可供性标注和跨形态候选抓取。与 Meta-World、ManiSkill2、RoboCasa 等平台相比，作者强调它同时具备 50 任务、域随机化、自动数据生成和 VLA 训练评测（Appendix Table 6）。

这个问题值得做，因为机器人算法的瓶颈往往不是“没有模型”，而是缺少可审计、可扩展、能暴露真实分布偏移的数据。RoboTwin 2.0 把数据生成质量、环境复杂度和 benchmark 协议放到同一系统里，使后续方法能够比较“在干净场景会做”与“环境变化后仍会做”。

## 3. 论文的问题定义

- **输入**：任务名和自然语言目标、通用技能 API、示例函数调用、层次约束、RoboTwin-OD 物体资产与可供性标注、机器人形态配置。
- **自动生成输出**：可执行 Python 专家程序，以及由该程序在清洁/随机化仿真中产生的多视角观测、语言、本体状态和动作轨迹。
- **benchmark 输出**：每个策略在 50 个任务、Easy/Hard 环境下的 Success Rate；另有真实 COBOT-Magic 平台的四任务结果。
- **代码生成优化目标**：没有可微训练损失；代码 agent 依据执行日志和 VLM 诊断迭代修改程序，直到成功率超过终止阈值或达到最多五次修正（Section 2.1、Appendix G）。
- **策略训练目标**：论文复用各 baseline 的原始行为克隆/扩散/VLA 训练目标，没有提出统一新 loss。RDT、$\pi_0$、ACT、DP、DP3 均更新模型参数（Appendix D）。
- **训练时**：生成代码、运行仿真、域随机化采集；RDT/$\pi_0$ 可先在 9,600 条随机化轨迹上预训练，再用新任务 50 条清洁示范微调。
- **测试时**：代码生成器本身接受仿真反馈；下游策略评测时模型冻结，不会继续学习。Easy 使用清洁环境，Hard 使用域随机化环境。
- **environment / reward / feedback**：环境是 SAPIEN/RoboTwin 双臂仿真与 COBOT-Magic 真实平台；任务是否完成形成二元 success；代码修正反馈由结构化执行日志和 VLM 图像诊断组成。
- **API**：论文的代码生成实验使用 DeepSeek-V3 与 `moonshot-v1-32k-vision-preview`，并按 Kimi API token 估算观察器成本；精确复现这一部分需要模型服务或等价本地模型（Appendix F/G）。

## 4. 方法总览

1. **建立 RoboTwin-OD**：汇总 731 个物体、147 个类别；为物体添加放置点、功能点、抓取点和抓取轴。
2. **定义任务和技能 API**：任务由语言目标、对象和技能调用约束组成，使代码模型不是从裸 Python 空间盲目搜索。
3. **生成初始专家代码**：DeepSeek-V3 根据 API、few-shot 示例和层次约束生成逐步双臂程序。
4. **仿真执行 10 次**：每轮用多次运行覆盖控制、动力学和感知随机性；记录语法错误、左右臂抓取失败、放置错误等原因。
5. **多模态观察和错误定位**：VLM 检查关键帧，判断任务是否完成，并尝试定位失败步骤和错误类型。
6. **迭代修复**：代码 agent 同时读取定量日志和视觉诊断，替换失败指令；达到成功阈值或五次修正后停止。
7. **做五类域随机化**：改变场景杂物、背景纹理、光照、桌面高度和语言描述，生成更宽的数据分布。
8. **做机器人形态适配**：根据物体可供性产生多个抓取候选，用 Curobo 在不同运动学约束下寻找可行轨迹。
9. **批量采集和评测**：覆盖 50 任务、五种形态和 10 万+轨迹；策略在 50 条清洁训练示范下分别测试 Easy/Hard。

流程图式文字：`语言任务 + 物体/技能 API → 初始 Python 程序 → 10 次仿真执行 → 日志 + VLM 观察 → 程序修复循环 → 可用专家程序 → 域随机化 + 形态适配 → 大规模轨迹 → VLA/策略训练与 benchmark`（Figure 1–6）。

## 5. 核心机制精读

### 5.1 RoboTwin-OD

它解决仿真物体既缺数量、又缺操作语义的问题。731 个物体包括自建的 534 个/111 类、Objaverse 的 153 个/27 类、PartNet-Mobility 的 44 个关节物体/9 类。输入是网格、纹理和类别；输出是带碰撞体、放置点、功能点、抓取点和抓取轴的资产（Section 3.1、Figure 7）。去掉这些标注，通用技能 API 难以在新物体上选择几何上合理的抓取和放置姿态。

### 5.2 MLLM + simulation-in-the-loop 代码生成

它解决“语言模型会写看似合理但不可执行的代码”。代码 agent 生成程序后不直接收录，而是在仿真中每轮执行 10 次；日志提供可执行性和控制错误，VLM 提供视觉语义诊断；修复循环最多五轮（Section 2.1、Figure 3）。输入是任务/API/示例/约束与失败反馈；输出是稳定专家代码。Table 1 中 R2.0 Vanilla ASR 62.1，加入日志反馈为 66.7，再加入多模态反馈为 71.3，支持闭环有效。

但 Appendix G 给出重要反例：VLM 观察器在 130 条人工标注序列上 Accuracy 0.431、Precision 0.208、Recall 0.552、F1 0.302；在 40 个正确识别的失败样本中只有 12 个定位对，定位准确率 30%。因此它是“有帮助但不可靠的诊断器”，不是高精度自动裁判。

### 5.3 五维域随机化

它解决策略对干净仿真过拟合。场景杂乱从 RoboTwin-OD 放入无关物体并避免与目标高度相似的干扰项；背景和表面纹理由生成式纹理库提供；光照随机化颜色、类型、强度和位置；桌高最多变化 3 cm；语言从模板与多种物体描述组合采样（Section 2.2、Figure 4、Appendix C）。输出是视觉、几何和语言共同变化的轨迹。Table 3 中 RDT+Rand 平均 24.8、$\pi_0$+Rand 29.1，高于其 clean 版本 14.6/24.9，说明随机化预训练对未见随机环境有帮助。

### 5.4 形态感知抓取适配

它解决同一抓取策略无法跨机械臂运动学直接复用。系统从物体的抓取点/轴生成多个候选，再用 GPU 加速的 Curobo 为当前双臂形态筛选可行解。Table 2 中平均采集成功率从 52.2 到 60.5；Piper 从 2.4 到 25.1，而 Franka/UR5 几乎不变甚至 -0.1/-0.5，说明收益主要来自运动空间受限的 6-DoF 形态（Section 2.3、Appendix E）。

### 5.5 统一 benchmark

它解决不同工作训练量、场景和评测难度不一致。所有方法每任务只用 50 条清洁示范训练，用 Aloha-AgileX 在每任务 100 次 rollout 上评测；Easy 是清洁环境，Hard 是域随机化环境（Section 4.5、Appendix J/K）。如果去掉 Hard，benchmark 会主要测记忆/拟合能力而非环境鲁棒性；如果训练也随机化，就无法把“模型自带鲁棒性”和“训练增强”分开。

## 6. 公式/算法逐行解释

论文没有编号的神经网络损失公式，也没有独立 Algorithm 环境；核心“算法”是可执行的数据生成闭环。附录只给出代码成功率定义：

$$
R_i=\frac{1}{M}\sum_{j=1}^{M}s_{i,j},\qquad
R_{\text{task}}=\frac{1}{N}\sum_{i=1}^{N}R_i.
$$

$s_{i,j}\in\{0,1\}$ 表示第 $i$ 个候选程序第 $j$ 次执行是否成功；$M=10$ 是每轮执行次数；$N$ 是该任务生成的候选程序数。先对单程序的随机执行求平均，再对一个任务的候选程序求平均。ASR 再对 10 个评测任务的 $R_{task}$ 求平均；Top5-ASR 只选每个任务最好的五个候选；CR-Iter 是成功率超过 50% 或耗尽预算前的平均修正轮数；Token 是生成策略代码的平均 token 数（Appendix G.1–G.2）。

逐行算法伪代码：

```python
for task in task_specs:
    code = deepseek_v3.generate(api, examples, constraints, instruction)
    for repair_round in range(5):
        trials = [simulate(code, randomized_seed=k) for k in range(10)]
        success_rate = mean(trial.success for trial in trials)
        if success_rate > 0.50:
            break

        log_feedback = summarize_execution_errors(trials)
        visual_feedback = moonshot_vlm.inspect(
            instruction=instruction,
            frames=collect_keyframes(trials),
            code=code,
        )
        code = deepseek_v3.repair(code, log_feedback, visual_feedback)

    if success_rate > 0.50:
        for embodiment in robot_configurations:
            for domain_seed in randomized_domains:
                grasp = select_feasible_grasp(object_affordances, embodiment)
                trajectory = execute_and_record(code, grasp, domain_seed)
                dataset.append(trajectory)
```

第一行初始化任务；第二行只生成一次初始程序；内层最多五轮防止无限 API 消耗；每轮 10 次用于估计随机执行成功率；未达标时日志反馈处理可观察的程序/控制错误，VLM 反馈处理视觉语义错误；通过后才在多形态和域随机化组合上扩充轨迹。实现时必须记录每轮代码版本、随机种子、日志、VLM 判断和实际 success，才能审计自动修复是否真的改善。

## 7. 实验部分精读

### 数据、环境和模型

RoboTwin-OD 有 731 物体/147 类；平台支持 50+ 双臂任务、Franka/Piper/UR5/ARX-X5/Aloha-AgileX 五种手臂和 10 万+轨迹。代码生成评测用 10 个任务；策略鲁棒性预训练用 32 任务×300=9,600 条轨迹；真实实验用 Stack Bowls、Handover Block、Pick Bottle、Click Bell 四任务和 COBOT-Magic。Baseline 包括 ACT、Diffusion Policy、DP3、RDT、$\pi_0$（Section 3–4）。

### Table 1：代码生成

列是 ASR、Top5-ASR、修正轮数和代码 token；行区分 RoboTwin 1.0/2.0 与 Vanilla、日志反馈 FB、多模态反馈 MM FB。R2.0+MM FB 最好，ASR 71.3、Top5 78.6、CR-Iter 1.76；R1.0+MM FB 为 63.9/74.2/2.42。**评价**：Abstract 的“+10.9%”在表中并不是同配置的 R2.0−R1.0（同为 MM FB 时是 +7.4 点）；71.3−60.4 恰为 10.9，但比较了 R2.0+MM FB 与 R1.0+FB。论文没有把该基线选择解释清楚，不能把 10.9 全归因于架构升级。

### Table 2：跨形态数据采集

列是五种机械臂与平均成功率。2.0 相对 1.0 平均 +8.3；Piper +22.7、Aloha +13.7、ARX-X5 +5.6，Franka -0.1、UR5 -0.5。最关键含义是形态适配帮助受限平台，但不是所有形态普遍提升。

### Table 3：域随机化预训练

八个未见任务上，ACT/DP 平均 2.0/0；RDT/$\pi_0$ 预训练权重为 18.8/22.5；clean 数据后为 14.6/24.9；Rand 数据后为 24.8/29.1。作者报告 RDT 和 $\pi_0$ 相对提升 31.9% 与 29.3%。部分单任务仍下降，例如 Pick Dual Bottles 的 $\pi_0$ 从 15 到 Rand 7，因此随机化不是逐任务单调改进。

### Table 4：真实 sim-to-real

每行是四任务×背景 seen/unseen×是否 clutter；三列训练条件是 10 条真实、10 真实+1,000 合成、仅 1,000 合成。最困难的 unseen+clutter 平均从 9.0 到 42.0，绝对 +33、相对约 367%；合成-only 为 29.5，相对 9.0 约 +228%。这两个百分数只对应最困难配置，不是所有设置平均。四配置平均从 17.0 提至约 41.4，绝对 +24.4（Section 4.4）。Click Bell 的 seen-clean 从 36 降到 24、Handover seen-clutter 从 16 降到 12，说明合成增强也有负迁移案例。

### Table 5 与 Appendix Table 10：50 任务 benchmark

每个模型有 Easy/Hard 两列。平均值：RDT 34.5/13.7，$\pi_0$ 46.4/16.3，ACT 29.7/1.7，DP 28.0/0.6，DP3 55.2/5.0。所有模型在 Hard 都大幅下降；RDT、$\pi_0$ 的绝对跌幅为 20.8、30.1。DP3 Easy 很强但 Hard 只有 5.0，且依赖完美点云和干净背景分割，不能直接视为现实优势。

### 附录表

Table 6 比较 benchmark 功能；Table 7 显示代码长度从 1236.6 降到 569.4、AST 相似度从 23.72% 到 44.78%；Table 8 展示代码生成逐任务并非全部改进；Table 9 给出 50 任务自动代码平均成功率 43.34%，很多任务仍为 0；Table 10 是全 benchmark；Table 11 表明跨形态采集仍存在大量低成功任务。

最强证据是 Table 4 的真实 unseen+clutter 提升。最强警告是 Hard benchmark 平均最高仅 16.3、自动代码全任务平均 43.34%，以及 VLM 观察器 F1 仅 0.302。论文证明的是“数据基础设施显著有用但尚不可靠”，不是已经解决鲁棒双臂操作。

## 8. 训练和推理成本分析

- **是否训练模型参数**：是。RDT/$\pi_0$/ACT/DP/DP3 都训练或微调；代码生成 agent 本身通过 API 推理，不在本文中微调。
- **RDT**：随机化预训练 100,000 steps，8 GPU、每 GPU batch 16；单任务微调 10,000 steps，4 GPU、每 GPU batch 16。
- **$\pi_0$**：预训练 100,000 steps，batch 32；微调 30,000 steps，batch 32。GPU 数未报告，因而总 GPU-hours **不确定**。
- **ACT**：单 GPU、chunk 50、batch 8、6,000 epochs；部署使用 temporal aggregation。
- **DP/DP3**：DP 600 epochs、batch 128、horizon 8；DP3 3,000 epochs、batch 256、horizon 8、点云 1,024。
- **数据生成成本**：DeepSeek-V3 生成/修代码；Moonshot/Kimi VLM 只在失败时触发。Appendix Table 7 报告每次观察平均 6,295 input + 599 output = 6,894 tokens，图片按 1,024 token 估算。
- **仿真成本**：每候选每轮 10 次、最多五轮，再乘任务×形态×随机化组合；Curobo 需要 GPU 加速规划。论文没有报告单轨迹秒数、总仿真小时和 API 费用，因此完整成本**不确定**。
- **最小复现**：不需要 8×A100 起步。单任务数据生成器可用 1 张支持仿真/Curobo 的 GPU，加一个代码 LLM 与可选 VLM；策略层可先训练 ACT/DP。你现有 8×A100 80GB 足以覆盖论文报告的 RDT 8-GPU 配置，但是否匹配作者吞吐仍取决于仿真并行、存储和 CPU。

## 9. 这篇论文真正的贡献

作者声称四项贡献：自动专家数据生成、系统域随机化、形态感知适配、开放物体库/数据/benchmark。实际最站得住的是一套端到端、开源、规模化的双臂数据基础设施，以及用真实 unseen+clutter 对照证明合成随机化数据能显著减少真实示范需求。

工程组合包括 DeepSeek 代码生成、执行日志、Kimi VLM 观察、SAPIEN 仿真、Curobo 规划、生成式纹理和现有策略训练。单模块并不新，贡献在统一 API、闭环质量控制、资产标注和规模化评测。

Reviewer 可能质疑：Abstract 的 10.9 对比口径不清；VLM 观察器准确性弱却承担诊断角色；Hard 成功率整体低；一些真实任务负迁移；域随机化主要是视觉/空间/语言，力、触觉、接触材料、控制延迟等物理差距不充分；API 成本和仿真总时长未报告；50 任务来自同一平台生态，跨仿真器泛化不确定。

**评价**：这篇论文更像“数据与 benchmark 系统论文”而不是“新策略论文”。它真正改变的是研究者获取双臂数据和定义鲁棒性对照的方式。

## 10. 和相关论文的关系

- **RAG / memory agent**：无关。RoboTwin 2.0 不在部署时检索记忆；它生成训练数据和 benchmark。
- **Test-time adaptation**：不是。策略在测试时冻结；域随机化发生在数据生成/训练阶段。
- **Reinforcement learning**：不是核心。专家程序由仿真 success 和语言反馈修复，但下游主要是 imitation learning/VLA 微调，没有 policy gradient。
- **World model**：仿真器是真实可执行的环境模型，而不是从数据学习的视频/隐空间 world model。它提供可控真值动力学，但仍有 sim-to-real gap。
- **Agent planning**：代码生成 agent 产生结构化 API 计划并根据执行反馈修正，是离线任务程序合成；最终 VLA 不一定显式执行该代码。
- **Self-evolving agent**：代码闭环会自我修复，但修复的是每个任务程序，不是跨任务持续更新模型权重或长期记忆。
- **RoboTwin 1.0**：1.0 强调数字孪生和较小任务集；2.0 加入自动闭环代码生成、系统域随机化、五形态适配和 50 任务。
- **GenSim2 / RoboGen**：同样用语言模型生成任务/程序；RoboTwin 2.0 强调复杂双臂、10 次仿真验证、日志+视觉双反馈和统一 benchmark。
- **Meta-World / ManiSkill2 / RoboCasa / LIBERO**：它们各自侧重多任务、仿真、厨房或终身学习；RoboTwin 2.0 的交集是双臂、自动数据生成、域随机化和 VLA 评测同时成立。

## 11. 我应该怎么复现一个最小版本

最小环境选择 `Stack Bowls Two` 或 `Pick Dual Bottles`，单一 Aloha/Piper 形态。准备 5–10 个带抓取点/轴和放置点的物体，提供 `grasp_actor`、`place_actor`、双臂并行执行等技能 API。

需要存储：`TaskSpec{name,instruction,objects,constraints}`；`CodeVersion{round,source,prompt_tokens}`；`Trial{seed,success,error,frames}`；`VlmDiagnosis{success,failed_step,cause}`；`Trajectory{rgb,proprio,action,language,domain_params,embodiment}`。

```python
code = code_llm(task, skill_api, examples)
for round in range(5):
    trials = parallel_simulate(code, seeds=range(10))
    if success_rate(trials) > 0.5:
        break
    diagnosis = vlm_observer(task, code, keyframes(trials))
    code = repair_llm(code, execution_logs(trials), diagnosis)

for i in range(500):
    domain = sample_domain(clutter=True, lighting=True, background=True,
                           table_height=(-0.03, 0.03), language=True)
    grasp = embodiment_aware_grasp(task.objects, robot)
    save(execute(code, grasp, domain))
```

必须记录：每轮 ASR/Top5-ASR/CR-Iter/token；VLM 混淆矩阵和定位准确率；代码编译/规划/抓取/任务失败分解；轨迹生成速度；域参数；Easy/Hard SR；API 与 GPU 成本。最小实验表比较 Vanilla、日志反馈、日志+VLM；Clean 数据、Rand 数据；固定抓取、自适应抓取。不要只展示生成成功案例。

## 12. 如果我要基于它做新论文

以下五项是研究提案，不是原论文已经完成的内容。

### 方向 1：可校准的多模态自动裁判
Idea：用真实 success 传感器、规则检查器和 VLM ensemble 联合判断，而不是单 VLM。相对原文解决 F1=0.302 和定位 30% 的弱点。实验测 ECE、F1、错误定位和最终代码 ASR；风险是标注与传感器集成成本。

### 方向 2：难度自适应域随机化课程
Idea：根据策略失败分布逐步增加杂物、光照、语言和几何扰动，而不是独立均匀采样。可能减少过强随机化导致的负迁移。实验比较固定、curriculum、adversarial DR；风险是控制器追逐噪声。

### 方向 3：接触与触觉数字孪生
Idea：加入材质、摩擦、柔顺性、力/触觉和控制延迟随机化。相对原文从视觉—空间 DR 扩展到接触动力学。实验需真实力传感器和软体/滑移任务；风险是仿真标定困难。

### 方向 4：跨仿真器一致性 benchmark
Idea：同一专家程序在 SAPIEN、Isaac Sim、MuJoCo 中执行，用一致性筛选过度依赖单一引擎的轨迹。实验测跨引擎 SR 和真实迁移；风险是 API 对齐与资产转换工作量大。

### 方向 5：失败驱动的数据价值选择
Idea：不再均匀保存 10 万轨迹，而是估计哪些随机化/失败恢复轨迹对下游策略边际价值最大。实验比较相同数据预算下的均匀、uncertainty、influence 采样；风险是价值估计本身昂贵且可能偏置。

## 13. 阅读检查题与参考答案

### 题 1：RoboTwin 2.0 的研究对象是策略还是数据基础设施？
**答案**：核心是数据生成器、物体库和 benchmark；策略用于验证数据价值，不是本文的新架构。

### 题 2：为什么每轮要把同一程序执行 10 次？
**答案**：估计控制、动力学和感知随机性下的真实成功率，避免一次偶然成功被当作可靠专家程序。

### 题 3：日志反馈和 VLM 反馈分别看见什么？
**答案**：日志擅长语法、API、规划和控制错误；VLM尝试识别视觉语义失败和失败步骤，但准确率有限。

### 题 4：五类域随机化是什么？
**答案**：场景杂物、背景纹理、光照、桌面高度和语言指令。

### 题 5：367% 的绝对数值是什么？
**答案**：在 unseen background + clutter 最困难配置中，10 条真实示范基线 9.0%，加入 1,000 条合成轨迹后 42.0%；相对提升约 367%，绝对提升 33 点。

### 题 6：Table 2 为什么说明形态适配不是普遍增益？
**答案**：Piper/Aloha 提升很大，但 Franka/UR5 分别 -0.1/-0.5；收益集中在运动学受限形态。

### 题 7：Hard benchmark 说明什么？
**答案**：所有模型在随机环境大幅下降，最高平均仅 $\pi_0$ 的 16.3%，鲁棒双臂操作仍远未解决。

### 题 8：精确复现代码生成是否需要 API？
**答案**：原实验使用 DeepSeek-V3 和 Moonshot/Kimi 视觉模型；可用等价本地模型替代，但那是机制复现，不是相同系统复现。

### 题 9：VLM 观察器的主要局限是什么？
**答案**：Accuracy 0.431、Precision 0.208、F1 0.302，且错误定位只有 30%；会把失败误判为成功，也会忽略细微姿态和不可见参数错误。需注意：原文混淆矩阵中成功是正类（TP+FN=29），因此 FP=61 表示失败被判成功；原文将其解释为“过度预测错误”与自己的计数不一致。

### 题 10：最小实验怎样证明域随机化有用？
**答案**：在相同任务、示范数、模型和训练步数下，只改变 Clean vs Rand 预训练数据，并同时在 Clean/Easy 与 Randomized/Hard、最好再在真实 unseen+clutter 上报告 SR。

