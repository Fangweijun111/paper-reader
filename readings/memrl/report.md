> 公开仓库仅提供原创精读分析与来源链接；未转载本文全文、完整译文、PDF或原始图表。该决定表示尚未确认再发布许可，并非论文不能公开阅读。[官方原文](https://arxiv.org/abs/2601.03192v2)。

# 《MemRL: Self-Evolving Agents via Runtime Reinforcement Learning on Episodic Memory》中文精读报告

> **论文信息**：Shengtao Zhang et al. *MemRL: Self-Evolving Agents via Runtime Reinforcement Learning on Episodic Memory*. arXiv:2601.03192v2, 2026。
>
> 阅读约定：
> - “论文事实”表示论文正文、公式、图表或附录明确给出的内容。
> - “评价”表示基于论文证据的审稿式判断。
> - “这是推断”表示论文没有直接证明、但可由其设定合理推出的结论。
> - 信息不足时明确写“不确定”。

## 1. 这篇论文一句话在做什么

用最直白的话说：MemRL 研究的是“部署后的 LLM agent 怎样从成功和失败中继续学习”，它不训练 LLM 参数，而是给外部情景记忆中的每条经验维护一个可由环境奖励更新的 Q 值，先按语义相似度召回，再按“相似度 + 历史效用”选择真正值得放进提示词的经验。

**论文事实**：论文把 frozen LLM 的稳定推理与可变外部记忆解耦，提出 Intent-Experience-Utility 三元组、Two-Phase Retrieval 和 Runtime Utility Update 三个组件（§4、Figure 3）。

技术上更精确的一句话是：MemRL 在 Memory-based MDP 中固定 $p_{LLM}$，优化检索策略 $\mu(m\mid s,\mathcal M)$，并用环境回报对记忆效用 $Q(s,m)$ 做非参数更新（Eq. 1-7）。

## 2. 背景从 0 讲起

### 2.1 这个方向原来解决什么问题

LLM agent 不只回答一次问题，而是观察环境、调用工具、执行动作并接收反馈。部署后会不断遇到新任务：理想系统应当保存有用经验、避免重复犯错，并把旧任务学到的程序性策略迁移到相似新任务。这就是论文所说的 Runtime Continuous Learning，即从运行交互流中持续改善。

这里有一个“稳定性-可塑性矛盾”：模型既要保留预训练能力，又要吸收新经验。直接微调增加可塑性，却可能改变旧能力；完全冻结又无法把反馈变成可积累的行为改进。

### 2.2 之前主流方法怎么做

| 路线 | 做法 | 论文指出的不足 |
|---|---|---|
| Fine-tuning / RLHF / 在线参数更新 | 把经验写进模型权重 | 计算成本高，并有灾难性遗忘风险（§1-2） |
| RAG | 按 embedding 相似度检索文档或历史经验 | “语义相似”不等于“对完成任务有用” |
| Reflexion / procedural memory | 总结失败或成功轨迹，作为后续提示 | 多依赖启发式或相似度，缺少由环境回报学习的效用量尺 |
| Test-time scaling | Pass@$k$ 采样多个候选 | 增加单次计算，但经验不一定跨任务持久积累 |

### 2.3 为什么这篇论文的问题值得做

如果检索到一条“看起来很像但实际会误导”的经验，记忆反而会伤害 agent。MemRL 的核心问题因此不是“有没有记忆”，而是“哪条记忆值得复用”。这在 ALFWorld、OS 操作等长轨迹任务里更重要，因为一条经验可能只在开头相似，后续步骤却完全错误。Appendix B.2 把这种能力解释为 trajectory verifier：最终环境奖励反过来评价整条被检索策略。

**评价**：问题选择是成立的。论文把 agent memory 中常被忽略的 selection problem 单独形式化，比“再设计一种记忆摘要格式”更接近学习机制层面的贡献。

## 3. 论文的问题定义

### 3.1 输入、输出与环境

论文采用 Memory-based Markov Decision Process（M-MDP）六元组：

$$
(\mathcal S,\mathcal A,P,\mathcal R,\gamma,\mathcal M).
$$

- $s_t\in\mathcal S$：当前任务、查询或可见环境状态，方法中编码为 intent。
- $m\in\mathcal M_t$：外部记忆中的一条经验。
- $a_t\in\mathcal A$：frozen LLM 生成的回答或环境动作。
- $P$：环境转移。
- $r_t=\mathcal R(s_t,a_t)$：执行后的环境奖励或 verifier 分数。
- $\gamma$：折扣因子。
- 输出包括动作 $a_t$、更新后的记忆 Q 值，以及由当前轨迹总结出的新经验。

### 3.2 优化目标

LLM 推理策略 $p_{LLM}$ 不变；要优化的是检索策略 $\mu$：在当前状态下选择能使后续动作获得最大期望回报的记忆。Eq. (2) 写成 $\arg\max_m Q(s,m)$。

### 3.3 训练、测试和运行时分别发生什么

- **离线训练**：没有对 backbone 做梯度训练。
- **Runtime Learning**：同一任务集合运行 10 个 epoch；每轮检索、生成、获取奖励、更新 Q，并加入新经验。Table 1 报告最后一轮 SR 与整个过程 CSR。
- **Transfer Learning**：学习阶段结束后冻结 memory bank，在 held-out 任务上测试，Table 2 报告 SR。
- **推理时**：每个查询仍需 embedding、检索和 LLM 生成；若在线运行，则奖励回来后继续更新 Q。

### 3.4 frozen 与更新项

| 对象 | 是否更新 |
|---|---|
| Backbone LLM 参数 | Frozen |
| Embedding model 参数 | Frozen |
| Intent/experience 文本与向量 | 新增，可持久化 |
| 每条记忆的 $Q_i$ | 按奖励更新 |
| 检索候选集合 | 随查询动态变化 |

**不确定**：论文给出 API 模型与温度，但没有报告服务端模型的具体权重版本哈希，因此 API 后端未来变化会影响严格复现。

## 4. 方法总览

```text
当前任务/状态 s
  → 编码 intent embedding
  → Phase A：相似度阈值过滤并召回 top-k1
  → Phase B：相似度与 Q 值归一化联合打分，选 top-k2
  → 把经验放入提示词
  → frozen LLM 生成回答/动作 a
  → 环境或 verifier 返回 reward r
  → 更新本轮实际使用记忆的 Q 值
  → LLM 总结本轮轨迹，写入新 (intent, experience, Qinit)
  → 下一任务继续使用更新后的 memory bank
```

1. **结构化记忆**：把一条记忆从普通文本变成 $(z_i,e_i,Q_i)$；否则无法区分“像不像”和“有没有用”。
2. **语义召回**：先保证候选与当前任务相关；否则高 Q 的跨域经验可能污染上下文。
3. **效用重排**：用历史回报排除语义近但功能错误的 distractor。
4. **frozen LLM 执行**：基础推理能力保持稳定，所有学习状态在外部。
5. **奖励更新**：把一次交互结果变成可积累的检索偏好。
6. **经验写回**：只有更新旧 Q 而不加入新策略，记忆覆盖面不会扩大。

## 5. 核心机制精读

### 5.1 Intent-Experience-Utility 三元组

- **解决问题**：普通 key-value memory 没有可学习的功能效用。
- **输入**：当前意图 $z_i$、成功或失败轨迹总结 $e_i$、初始值 $Q_{init}$。
- **输出**：可检索、可排序、可由奖励更新的记忆条目。
- **连接**：intent 用于 Phase A，experience 注入 LLM，Q 用于 Phase B。
- **去掉后会怎样**：如果没有 Q，系统退化为 RAG/启发式程序记忆。Figure 5 的 $\lambda=0$ 是相近证据，但不是完全等价的三元组删除实验。

### 5.2 Two-Phase Retrieval

Phase A 用 cosine similarity 和阈值 $\delta$ 取 $k_1$ 个候选；Phase B 对 similarity 与 Q 做 z-score，再按联合分数取 $k_2$ 个上下文。

- **为什么两阶段而非一次排序**：纯相似度不能识别有害经验；纯 Q 值可能选到高回报但不相关的经验。
- **空候选分支**：若 $\mathcal C(s)=\varnothing$，只用 frozen LLM 探索。
- **输出**：$\mathcal M_{ctx}(s)$，即真正注入提示词的少量记忆。
- **消融证据**：Figure 5 显示 $\lambda=0.5$ 优于 0 或 1；Figure 6 显示 HLE 的 $k_1/k_2=5/3$ 优于 3/1 和 10/5；过少信息不足，过多引入噪声。

### 5.3 Runtime Utility Update

- **输入**：被实际使用的记忆、环境 reward、学习率 $\alpha$。
- **操作**：用 Eq. (4) 的指数移动平均把 $Q$ 向当前 reward 拉近。
- **输出**：更新后的 utility。
- **连接**：新 Q 会影响下一次 Phase B 排名，从而形成 feedback loop。
- **去掉后会怎样**：MemRL 失去 runtime RL，只剩静态/启发式检索。Figure 4 中 MemRL 与非 RL counterpart 的差距随 epoch 扩大，是支持证据。

### 5.4 Experience Summarization and Write-back

每个轨迹结束后由 LLM 总结经验，写成新三元组。Appendix I 给出各 benchmark 的具体提示词。

**评价**：这一步也是主要成本来源之一，而且摘要模型可能引入失真。论文将其与 Q 更新放在同一闭环中，但没有单独消融“原始轨迹 vs LLM 摘要质量”。

### 5.5 稳定性机制

论文的稳定性来自三层：模型参数冻结；相似度门控避免跨域污染；归一化 Q 避免尺度失控。§5.4.2 中平均 forgetting rate 为 0.041，MemP 为 0.051；去掉 normalization 和 gating 后升到 0.073。

**评价**：这证明 filtering 对实验中的行为稳定性重要，但“模型权重未遗忘”与“记忆检索不会遗忘”是两个概念，不能把 frozen backbone 自动等同于整个 agent 永不遗忘。

## 6. 公式与算法逐行解释

### 6.1 Eq. (1)：联合 agent policy

$$
\pi(a_t|s_t,\mathcal M_t)=\sum_{m\in\mathcal M_t}\mu(m|s_t,\mathcal M_t)p_{LLM}(a_t|s_t,m).
$$

$\mu$ 决定取哪条记忆，$p_{LLM}$ 在给定记忆后生成动作；求和表示把潜在检索选择边缘化。代码上就是“retriever 选上下文，generator 条件生成”。实际实现通常取 top-$k$ 近似，而非枚举整个 memory bank。

### 6.2 Eq. (2)：最优检索策略

$$
\mu^*(m|s,\mathcal M)=\arg\max_{m\in\mathcal M}Q(s,m).
$$

$Q(s,m)$ 不是 LLM action value，而是“在状态 $s$ 使用记忆 $m$ 后，生成动作能获得的期望回报”。它把检索变成 RL action selection。

### 6.3 Eq. (3)-(4)：TD 与单步 Monte Carlo 更新

$$
Q(s,m)\leftarrow Q(s,m)+\alpha[r+\gamma\max Q(s',m')-Q(s,m)]
$$

是一般 TD target；论文实现采用更简单的：

$$
Q_{new}\leftarrow Q_{old}+\alpha(r-Q_{old}).
$$

把下一状态看作终止状态后，target 只剩当前回报。$\alpha=0.3$（Table 8）。代码约为 `q += alpha * (reward - q)`。

### 6.4 Eq. (5)：记忆数据结构

$$
\mathcal M=\{(z_i,e_i,Q_i)\}_{i=1}^{|\mathcal M|}.
$$

$z_i$ 是 intent/key，$e_i$ 是经验文本或轨迹，$Q_i$ 是标量 utility。实现至少需要 `id, intent_text, embedding, experience, q, usage_count, source_task`。

### 6.5 Eq. (6)：Phase-A recall

$$
\mathcal C(s)=\operatorname{TopK}_{k_1}\{i\mid sim(Emb(s),Emb(z_i))>\delta\}.
$$

先过滤低于 $\delta$ 的条目，再按 similarity 取前 $k_1$。Table 8 中 $\delta$ 依据每个数据集任务相似度分布的 top-20% quantile 设定，不是统一常数。

### 6.6 Eq. (7)：Phase-B composite score

$$
score_i=(1-\lambda)\widehat{sim_i}+\lambda\widehat Q_i.
$$

帽子表示 z-score normalization；$\lambda=0.5$。归一化的作用是让两个不同尺度的量可比较。实现时要处理候选方差为零的情况，否则会除零；论文未明确写该工程分支。

### 6.7 Eq. (8) 与 Appendix A：局部稳定性

在 frozen policy、固定任务分布、某状态-记忆对被持续更新的条件下：

$$
\lim_{t\to\infty}\mathbb E[Q_t]=\beta(s,m),\qquad
\limsup_{t\to\infty}Var(Q_t)\leq\frac{\alpha}{2-\alpha}Var(r_t|s,m).
$$

Eq. (10)-(13) 展开证明：期望误差按 $(1-\alpha)^t$ 指数衰减，常数步长使方差有界。注意这是期望收敛和有界波动，不是每条随机样本路径都收敛到一个无噪声常数。

### 6.8 Eq. (9)：全局 memory utility

$$
\lim_{t\to\infty}\mathbb E[Q_t(m)]
=\sum_{s\in\mathcal S(m)}\mathbb E[r|s,m]P(s|m).
$$

论文把检索排名视为 GEM 的 policy-improvement/E-step，把 utility 更新视为 value-update/M-step，从而论证目标单调改善到 stationary point。

**评价**：把动态检索分布类比为 GEM 有启发性，但真实系统还包含持续新增记忆、近似 top-$k$、有限访问和非平稳 API 输出；这些条件与标准 GEM 不完全相同。因而“理论上防止灾难性遗忘”应限定在论文假设内。

### 6.9 实现伪代码

```python
for task in stream:
    s = task.text
    sims = cosine(embed(s), memory.embeddings)
    candidates = topk(where(sims > delta), k1)
    if candidates:
        score = (1-lam) * zscore(sims[candidates]) + lam * zscore(memory.q[candidates])
        used = topk(candidates, score, k2)
    else:
        used = []
    action = frozen_llm(prompt(s, memory[used]))
    reward = environment.verify(action)
    for i in used:
        memory[i].q += alpha * (reward - memory[i].q)
    experience = summarizer(task, action, reward)
    memory.add(intent=s, experience=experience, q=0.0)
```

论文没有单独的 Algorithm 环境；方法执行顺序由 Figure 3、§4.2-4.3 与 Appendix I 的提示词共同定义。

## 7. 实验部分精读

### 7.1 Benchmark、模型与数据规模

| Benchmark | 任务 | Backbone | Runtime / Transfer 数据 |
|---|---|---|---|
| BigCodeBench-I Full | 库级代码生成 | GPT-4o | 1,140 / 1,140，7:3 split |
| Lifelong Agent OS | 操作系统交互 | GPT-4o-mini | 500 / 500，7:3 split |
| Lifelong Agent DB | 数据库交互 | GPT-4o-mini | 500 / 500，7:3 split |
| ALFWorld | 多步文本具身任务 | GPT-5-mini | 3,553 / 140 valid_seen |
| HLE | 高难多学科问答 | Gemini-3-pro | 2,500，只有 runtime |

以上模型均通过官方 API 使用；embedding 是 Text-Embedding-3-Large（Appendix E.1）。不是在本地训练的开源模型。

### 7.2 Baseline 与 metric

- Pass@10：无持久记忆的 test-time scaling。
- RAG / Self-RAG：语义检索及带自批评的检索。
- Mem0 / MemP：agentic memory；MemP 是最强程序性记忆基线。
- SR：某 epoch 完成任务的比例。
- CSR：到当前为止至少成功过一次的任务比例。

CSR 单调不降，因此更像探索覆盖率；最后一轮 SR 更能反映当前策略是否稳定保持能力。读主表必须同时看二者。

### 7.3 Table 1：Runtime Learning

每列对应 BigCodeBench、OS、DB、ALFWorld、HLE；每格是 Last SR / CSR。MemRL 平均为 **0.772 / 0.798**，MemP 为 **0.736 / 0.760**。最明显的 CSR 增益在 OS（0.804 vs 0.742）和 ALFWorld（0.981 vs 0.919），均为 +6.2 个百分点；HLE 为 0.606 vs 0.570。

**最关键结果**：Table 4 显示多步任务增益更大，支持 Q 值在评价完整轨迹而非表面匹配。

### 7.4 Table 2：Transfer Learning

训练后冻结 memory，在 unseen tasks 测试。MemRL 平均 SR 为 **0.794**，MemP 为 **0.766**；ALFWorld 0.979 vs 0.921，OS 0.746 vs 0.720。它说明 memory 不只记住当前 epoch 的动作，还能迁移程序模式。

### 7.5 消融和机制分析

- Figure 4：runtime RL 曲线相较非 RL counterpart 逐渐拉开。
- Figure 5：$\lambda=0.5$ 最好，纯 similarity 或纯 Q 都较差。
- Table 3：cross-task 平均 0.798，single-task reflection 0.761；但 HLE 上 0.606 略低于 0.610。
- Figure 6：HLE 的 5/3 检索密度优于 3/1 与 10/5。
- Figure 7：Q bin 与成功率 Pearson $r=0.861$，最低 bin 21.5%，最高 bin 88.1%；高 Q bin 仍有约 12% failure memories，作者解释为有用 near-miss。
- Figure 8-9：MemRL 平均遗忘率 0.041，MemP 0.051，去 normalization/gating 为 0.073。
- Table 5：Gemini-3-pro 学到的 HLE memory 转给 Qwen3-235B，0.150→0.531；Gemini-3-flash 0.347→0.583；GPT-5.2(High) 0.354→0.571。
- Table 6：OS/DB memory 合并后 OS 0.788→0.784，DB 0.960→0.960，干扰很小。

### 7.6 需要警惕的结果

1. 主表按 benchmark 选择不同 backbone，虽然 Appendix E.4 给出理由和 GPT-4o-mini 补充实验，但跨列平均值仍混合了不同模型能力。
2. HLE runtime 会重复看到同一 2,500 题，Appendix B.3 也承认增益更像 runtime memorization；不能直接解释成 unseen knowledge generalization。
3. Table 3 中 HLE cross-task 不优于 single-task，说明方法依赖任务相似密度。
4. $r=0.861$ 说明 Q 与成功相关，但 Q 本来就是由 reward 更新；相关性不是独立校准证明。
5. **这是推断**：跨模型 HLE 转移若 memory 含题目级解法，需要更严格的去重/污染审计才能完全区分“可迁移策略”与“答案记忆”。

## 8. 训练和推理成本分析

- **是否训练模型参数**：否。backbone、embedding 都 frozen。
- **更新什么**：外部 memory 文本、embedding、usage metadata 与标量 Q。
- **GPU**：论文的 API 复现不要求本地 GPU；需要网络和相应 API。若改成本地模型，GPU 需求取决于模型，论文没有报告。
- **主要成本**：LLM 推理与经验总结 API，而不是检索或 Q 更新。
- **论文报告的 token**：HLE 10-epoch 轨迹中，MemRL 平均每题约 32K total tokens，与 MemP 接近（Appendix F.1）。
- **延迟**：dual-stage retrieval 是向量点积和标量加权，毫秒级；Q 更新为 $O(1)$。Figure 11 表明 epoch 时间主要受 API 网络与吞吐波动影响。

### 最小复现配置

最省事的版本可选 Lifelong Agent OS 的小子集、GPT-4o-mini 级 API 模型、一个 embedding API、SQLite/JSONL memory 与环境 verifier。先跑 3 个 epoch、$k_1=10,k_2=5,\alpha=0.3,\lambda=0.5$，比较 No Memory、RAG、MemRL。

如果使用你现有的 8×80GB A100：算力不是 MemRL 核心瓶颈，可以部署一个本地开源 LLM 和 embedding model 来替换 API；但这不再是论文原始模型配置，结果只能算方法复现而非数值复现。

**不确定**：论文没有给出完整美元费用、并发度、API rate limit 或 HLE 单 epoch 的精确平均小时数表格，不能可靠计算总预算。

## 9. 这篇论文真正的贡献

### 作者声称的贡献

1. 用 model-memory decoupling 缓解稳定性-可塑性矛盾。
2. 提出两阶段检索和效用驱动更新，实现非参数 runtime RL。
3. 在多 benchmark 上验证性能、稳定性和迁移。

### 实际站得住的贡献

- 把 memory selection 明确写成 $Q(s,m)$ 决策问题，这是最清晰的概念贡献。
- 两阶段“相关性门控 + 效用重排”简单、可实现，且有 $\lambda$、检索规模、过滤消融支持。
- 多步任务、跨模型转移和 memory merging 给出了比单一主表更丰富的行为证据。
- 不需要梯度训练，工程开销相对 LLM 调用确实很小。

### 更像工程组合的部分

Intent embedding、top-k RAG、轨迹总结、EMA Q update 都不是单独的新算法；新意主要在组合后的学习对象和闭环，而非任一组件。

### Reviewer 可能质疑

- 理论结论依赖 stationary tasks、frozen policy、无限访问，与持续新增 memory 的真实系统有差距。
- 多记忆同时注入时把同一 reward 赋给所有条目，信用分配粗糙。
- 主表异构 backbone 与 API 版本可复现性。
- HLE 重复暴露导致 memorization 与 generalization 混杂。
- reward hacking 和恶意 memory 污染可能被 Q 更新放大（Appendix G.4）。

## 10. 和相关论文的关系

### RAG / memory agent

RAG 只回答“什么内容最像”；MemRL 增加“过去使用后有没有成功”。与 Mem0、MemP 一样使用外部记忆，但多了可由环境反馈更新的 utility critic。

### Test-time adaptation

传统 TTA 常在测试分布上更新参数或统计量；MemRL 不改参数，只改 memory state，因此更接近 test-time non-parametric adaptation。

### Reinforcement learning

传统 RL 优化 action policy 或 value network；MemRL 把“选择记忆”当 action，把 Q 存成每条记忆的标量。它是 RL 原理在 retrieval policy 上的轻量实例，不是训练 LLM policy 的 RL。

### World model

MemRL 不学习环境转移模型，也不预测未来 observation，因此严格说不是 world model。它学习的是经验的检索价值。

### Agent planning

它不直接搜索 plan tree；通过检索历史程序或完整轨迹来改善 LLM 的行动生成。Appendix B.2 表明其优势在多步任务更大，所以是 planning support，而非显式 planner。

### Self-evolving agent

“self-evolving”体现在运行中 memory bank 和 Q 值持续改变、行为随经验改善；模型能力本体并未被重新训练。因而应称 memory-level behavioral evolution，而不是 parameter-level capability evolution。

### 具体 related work

- Reflexion：保存单任务反思；Table 3 的 single-task 设定与其概念接近，MemRL 增加跨任务复用。
- MemP：程序性 memory 强基线；MemRL 增加 value learning。
- Self-RAG：用自批评决定是否/如何检索；MemRL 使用外部环境 reward。
- Neural Episodic Control：同样用非参数 episodic value 支持快速学习，是更早的技术谱系。

## 11. 我应该怎么复现一个最小版本

### 环境与模型

- 选 100-500 个可自动判分的代码或 OS 任务。
- 一个 frozen instruction model；一个 frozen embedding model。
- deterministic verifier 返回 $r\in\{0,1\}$。

### 数据结构

```python
MemoryItem = {
  "id": str,
  "intent": str,
  "embedding": list[float],
  "experience": str,
  "q": float,
  "n_used": int,
  "source_task": str,
  "created_epoch": int,
}
```

论文最低要求是 intent/experience/Q；`n_used`、来源和版本是为审计增加的复现字段。

### 步骤

1. 用空 memory 跑第一批任务，保存轨迹和 reward。
2. LLM 把轨迹总结成可复用 experience，$Q_{init}=0$。
3. 新任务按 $\delta$、$k_1$ 做相似召回。
4. 候选内 z-score similarity/Q，$\lambda=0.5$ 取 $k_2$。
5. 注入经验、生成、执行、判分。
6. 只更新实际注入的 memory Q。
7. 重复 3-10 epoch；最后冻结 memory 测 held-out tasks。

### 必须记录的 log

task id、query、candidate ids、similarity、Q before/after、combined score、selected ids、完整 prompt hash、model/version、action、reward、latency、token、memory size、seed。

### 最小实验表

| 方法 | Last SR | CSR | Held-out SR | Tokens/task | Memory size |
|---|---:|---:|---:|---:|---:|
| No Memory | | | | | 0 |
| RAG | | | | | |
| MemRL | | | | | |
| MemRL $\lambda=0$ | | | | | |
| MemRL w/o gating/norm | | | | | |

至少用 3 个随机种子并给均值/方差；这是比论文单点表更稳妥的复现增强建议。

## 12. 如果我要基于它做新论文

以下都是研究提案，不是原论文已经完成的内容。

### 方向 1：反事实多记忆信用分配

- **Idea**：一次注入多条 memory 时，用 leave-one-out、Shapley 近似或 value decomposition 分配 reward。
- **改动**：把“所有使用项同奖惩”改成每条记忆独立 contribution。
- **为什么可能有效**：减少无关 memory 搭便车导致的 Q 污染。
- **实验**：不同 $k_2$、长轨迹、合成冲突记忆；比较收敛速度、Q 排名 AUROC 和 SR。
- **风险**：额外 LLM 调用或反事实 rollout 成本高。

### 方向 2：不确定性感知的自适应检索

- **Idea**：根据候选相似度密度、Q 方差和模型不确定性动态选择 $\lambda,k_1,k_2$。
- **改动**：替代论文固定 $\lambda=0.5$ 与人工 benchmark 超参数。
- **为什么可能有效**：低相似任务依赖语义门控，高重复任务可更多利用 Q。
- **实验**：跨 ALFWorld/HLE 分布、OOD 任务、延迟-性能 Pareto。
- **风险**：controller 本身可能过拟合或需要额外训练。

### 方向 3：鲁棒 reward 与 memory 安全

- **Idea**：为 Q 更新加入 verifier ensemble、置信下界、异常检测和可回滚版本。
- **改动**：针对 Appendix G.4 的 reward hacking/投毒风险。
- **为什么可能有效**：避免一次假阳性快速固化成高 Q 错误经验。
- **实验**：不同投毒率、假阳性率、恢复时间、污染扩散范围。
- **风险**：保守更新会减慢真实学习。

### 方向 4：分层抽象与周期性 consolidation

- **Idea**：把相似 episode 合并为高层 skill，并同时保留可追溯原始案例。
- **改动**：解决 memory 无限增长和低层匹配限制。
- **为什么可能有效**：提高低任务相似度场景下的结构迁移，并降低检索空间。
- **实验**：memory 大小、压缩率、长期 SR/FR、跨任务迁移、摘要失真审计。
- **风险**：错误合并会不可逆地丢失少数重要例外。

### 方向 5：跨模型/多 agent 的可信共享 memory

- **Idea**：为共享 memory 加模型适配分数、来源签名和选择性传播策略。
- **改动**：扩展 Table 5-6 与 Appendix G.5 的简单转移/合并。
- **为什么可能有效**：不同 agent 可共享程序知识，同时阻止任务特定噪声扩散。
- **实验**：异构模型、3 个以上 agent、非 IID 任务、负迁移和攻击场景。
- **风险**：utility 在不同模型和 reward scale 间不一定可直接比较。

## 13. 阅读检查题与参考答案

### 题 1：为什么 MemRL 不是普通 RAG？

**答案**：RAG 主要按语义相似度检索；MemRL 还根据环境 reward 学习每条经验的 Q 值，并用 similarity + Q 联合选择。

### 题 2：MemRL 的强化学习 action 和 reward 分别是什么？

**答案**：action 是选择哪条 memory；reward 是使用该 memory 后 LLM 行动在环境/verifier 中得到的反馈。

### 题 3：Eq. (4) 为什么可以看成 Eq. (3) 的简化？

**答案**：把下一状态设为 terminal 后，bootstrapped future value 消失，target 只剩当前 reward，形成 EMA/单步 Monte Carlo 更新。

### 题 4：为什么 Phase A 不能删除？

**答案**：Q 高只表示过去有用，不保证对当前任务相关；相似度门控阻止跨域高 Q memory 进入上下文。Figure 5 和 forgetting ablation 支持这一点。

### 题 5：Table 1 和 Table 2 的问题不同在哪里？

**答案**：Table 1 测同一运行流中边交互边学习，报告 Last SR/CSR；Table 2 冻结已学 memory，在 held-out tasks 测迁移 SR。

### 题 6：哪项结果最能说明适用条件？

**答案**：Table 3：结构相似的 OS/ALFWorld 中 cross-task 明显更好，但低相似 HLE 上略低于 single-task，说明方法依赖可复用经验密度。

### 题 7：论文所谓“无训练”是否等于“无成本”？

**答案**：不等于。无梯度训练，但仍需每题 LLM 推理、经验总结和 embedding；HLE 平均约 32K tokens/题。

### 题 8：稳定性理论不能直接覆盖哪些现实情况？

**答案**：非平稳任务流、API 模型变化、有限访问、持续新增/删除 memory、noisy reward 和多记忆信用分配。

### 题 9：复现时最容易漏记的日志是什么？

**答案**：每次 candidate/selected memory、similarity、Q before/after、联合分数与 prompt/model 版本；没有这些无法解释某条记忆为何被强化。

### 题 10：最核心的局限是什么？

**答案**：最终 reward 被粗略归因给所有注入 memory，且错误 verifier 会把错误经验推成高 Q；这同时影响学习效率与安全性。
