> 公开仓库仅提供原创精读分析与来源链接；未转载本文全文、完整译文、PDF或原始图表。该决定表示尚未确认再发布许可，并非论文不能公开阅读。[官方原文](https://arxiv.org/abs/2606.30639v1)。

# 《Self-Evolving World Models for LLM Agent Planning》中文精读报告

> 论文：Xuan Zhang, Wenxuan Zhang, See-Kiong Ng, Yang Deng. *Self-Evolving World Models for LLM Agent Planning*. arXiv:2606.30639v1, 2026.
> 方法名：**WorldEvolver**
> 阅读约定：
> - “论文事实”表示论文正文、表格、图或附录明确给出。
> - “评价”表示基于论文证据的审稿式判断。
> - “这是推断”表示论文没有直接证明，不能当作作者结论。

---

## 1. 这篇论文一句话在做什么

这篇论文研究的是：**LLM agent 在执行动作前，怎样用一个“世界模型”预测动作后果，并让这个世界模型在部署过程中越用越准。**

非常直白地说：

- 对象：在 ALFWorld、ScienceWorld 这类文字交互环境中执行长任务的 LLM agent。
- 问题：世界模型给 agent 的未来预测可能错误，错误预测反而会把 agent 带偏；但上线后反复训练大模型参数又太贵、还可能破坏原能力。
- 方法：作者提出 **WorldEvolver**。它不训练任何模型参数，而是在线积累真实转移案例、从预测错误中总结“什么通常不会改变”的规则，并只把高置信度预测交给 agent。

一句更精确的话是：

> WorldEvolver 是一个**参数冻结、上下文自更新**的文本世界模型框架：用 Episodic Memory（具体转移案例）、Semantic Memory（预测错误提炼出的持久规则）和 Selective Foresight（低置信度拒答）来改善下一状态预测和 agent 规划。（摘要、§3、Figure 3）

这里最重要的阅读边界是：**“self-evolving”指外部 memory/context 在进化，不是神经网络权重在进化。**

---

## 2. 背景从 0 讲起

### 2.1 这个方向原来在解决什么问题

LLM agent 不只是回答问题，而是反复执行：

1. 读取环境观察；
2. 思考；
3. 选择动作；
4. 接收新观察；
5. 继续执行，直到完成任务。

例如在 ALFWorld 中，任务可能是“把冷却后的苹果放到桌上”。agent 必须依次找到苹果、拿起苹果、找到冰箱、打开冰箱、放入、等待、取出、再放到目标位置。一个早期动作错了，后面会连续失败。

因此，长程规划需要一种“执行前预演”能力：

> 如果我现在做动作 $a_t$，环境接下来大概会变成什么？

回答这个问题的模型就是这里的 **world model（世界模型）**。传统 model-based reinforcement learning 中，世界模型学习环境动态；在本文中，它是一个 LLM，根据当前文字状态和候选动作生成下一条环境观察。

### 2.2 之前主流方法怎么做

论文 §1、§2 将相关路线分为几类：

1. **直接让同一个 LLM 既规划又模拟**
   如 Hao et al. (2023)：把推理看成在语言世界模型中规划。

2. **训练下一状态预测器**
   如 Chae et al. (2025) 的 web world model：从网页交互数据中训练环境动态预测。

3. **行动前显式预测**
   如 PreAct（Fu et al., 2025）：先预测再执行，让 agent 把未来后果纳入行动选择。

4. **任务级世界知识模型**
   如 Qiao et al. (2024)：为文字游戏提供可用于规划的世界知识。

5. **离线训练、联合训练或 RL**
   如 agent/world model 联合训练、检索增强世界模型学习、合成环境训练。

6. **agent memory / self-evolving agent**
   保存反馈、经验、技能或持久上下文，使 agent 随交互改进。但这类工作通常更新的是 agent 的行为上下文，不一定专门修正“动作后果预测器”。

### 2.3 这些方法哪里不够

论文提出三个连续的问题：

1. **冻结的世界模型会遇到分布偏移**
   新任务、新对象、新环境动态可能不在原训练分布中，所以预测会错。（§1，Figure 1）

2. **每次出错都更新权重不适合在线部署**
   对大模型做梯度更新昂贵，并可能过度编辑或灾难性遗忘。（§1）

3. **错误 foresight 可能比没有 foresight 更糟**
   Figure 2 的预实验固定 agent 和 backbone，比较无 foresight、噪声 foresight 和 oracle foresight；噪声 foresight 降低动作准确率，完美 foresight 提升动作准确率。因此关键不只是“有没有预测”，还包括“预测是否值得信”。
   注意：Figure 2 用的是相对 teacher action 的 exact action accuracy，不是完整任务成功率，所以它只是动机证据。

### 2.4 为什么值得做

真实部署天然产生两类监督信号：

- 实际执行后的 $(o_t,a_t,o_{t+1})$：告诉系统“真实发生了什么”；
- 预测 $\hat{o}_{t+1}$ 和实际 $o_{t+1}$ 的差异：告诉系统“世界模型误解了什么”。

如果能把这些信号变成可检索、可审计、无需梯度的上下文，就可能同时获得：

- 比固定 prompt 更强的环境适应性；
- 比在线训练更低的部署门槛；
- 比无条件暴露预测更安全的 agent 规划。

这正是 WorldEvolver 的立论。

---

## 3. 论文的问题定义

### 3.1 环境与可见状态

论文把任务写成部分可观测交互过程：

$$
(\mathcal S,\mathcal A,\mathcal O,\mathcal T),
$$

其中：

- $\mathcal S$：环境真实状态空间；
- $\mathcal A$：动作空间；
- $\mathcal O$：观察空间；
- $\mathcal T:\mathcal S\times\mathcal A\rightarrow\mathcal S$：环境转移函数。

agent 看不到隐藏状态，只看到截至时间 $t$ 的文字历史：

$$
s_t=(o_1,a_1,\ldots,o_{t-1},a_{t-1},o_t).
$$

注意论文虽然用 $s_t$ 表示“state”，它实际是 **agent-visible textual interaction state**，不是环境隐藏真状态。

### 3.2 输入是什么

一个闭环步骤的主要输入是：

- 当前 agent 可见状态 $s_t$；
- 当前观察 $o_t$；
- 任务目标；
- 冻结的 agent policy $\pi_\theta$；
- 冻结的世界模型 $W_\theta$；
- 当前 Episodic Memory $M_E^t$；
- 当前 Semantic Memory $M_S^t$；
- 检索数 $k_{M_E}$；
- 语义规则更新 batch 大小 $k_{M_S}$；
- 置信度阈值 $\tau$。

### 3.3 输出是什么

每一步输出：

- 实际执行动作 $a_t$；
- 更新后的 episodic memory $M_E^{t+1}$；
- 更新后的 semantic memory $M_S^{t+1}$；
- 中间还产生预测下一观察 $\hat{o}_{t+1}$、置信度 $q_t$ 和可选 foresight $F_t$。

完整任务的最终输出是环境中的行动轨迹，以及是否在步数预算内完成任务。

### 3.4 优化目标是什么

论文没有定义可微训练损失，也不进行梯度优化。它有两个评价目标：

1. **预测目标**：使世界模型生成的 $\hat{o}_{t+1}$ 更接近真实 $o_{t+1}$；
2. **规划目标**：提高 agent 在允许交互步数内完成任务的 Success Rate。

§3.1 的正式表述是：通过部署时持续演化来选择并改进 $\hat{o}_{t+1}$，同时冻结 $\pi_\theta$ 和 $W_\theta$。

### 3.5 训练、测试、运行时分别发生什么

| 阶段 | 发生的事 |
|---|---|
| 离线训练 | 本文方法不训练 agent、world model、critic 或 factorizer 的参数。backbone 使用已有 LLM。 |
| 配置/校准 | Selective Foresight 的每个 agent×模型×环境阈值 $\tau$ 由置信度校准曲线选择（Appendix B、Table 3）。论文未明确说明是否使用独立验证集。 |
| 测试/部署开始 | $M_E,M_S$ 初始化为空（Table 1 caption）。 |
| 在线运行 | 每次动作后把真实转移加入 $M_E$；预测与观察不匹配时，用同一 backbone 充当 factorizer 和 critic，生成或调整 $M_S$ 中的规则。 |
| 跨任务持续 | memory 在同一环境内跨 task、trial 持久化（Appendix B）。 |

### 3.6 哪些参数 frozen，哪些东西更新

**冻结：**

- agent policy $\pi_\theta$；
- world model $W_\theta$；
- observation factorizer；
- mismatch critic；
- 所有 backbone 参数。

**更新：**

- $M_E$：不断追加真实 $(o_t,a_t,o_{t+1})$；
- $M_S$：不断追加/更新规则及 evidence score；
- 每次 prompt 中实际渲染的 memory context；
- 运行轨迹。

### 3.7 environment、reward、feedback 分别是什么

- **Environment**：ALFWorld 或 ScienceWorld 的文字交互环境。
- **Reward**：方法本身没有用 reward 做训练，也没有 policy gradient。评估时只看任务是否在预算内完成。
- **Feedback**：
  - 直接反馈是动作后真实观察 $o_{t+1}$；
  - 学习信号是 $\hat{o}_{t+1}$ 与 $o_{t+1}$ 经结构化后的 mismatch；
  - 任务完成信号只用于 Success Rate 评估，论文没有说它被用于 memory 更新。

---

## 4. 方法总览

### 4.1 不看公式的闭环流程

**step 1：agent 先提出草稿动作**
冻结 agent 根据当前历史 $s_t$ 生成 $a_t^{(0)}$。

**step 2：从 Episodic Memory 找相似动作案例**
从以前真实执行过的转移中，按动作 token 的 Jaccard 相似度取 top-$k_{M_E}$。

**step 3：把具体案例和抽象规则交给 world model**
冻结 world model 同时看到当前状态、草稿动作、检索案例和 Semantic Memory 规则，预测下一观察 $\hat{o}_{t+1}$。

**step 4：判断这条预测是否可信**
用生成 token 的几何平均概率得到 $q_t$。若 $q_t\ge \tau$，把预测作为 $F_t$；否则令 $F_t=\varnothing$。

**step 5：agent 看过可选 foresight 后重新决定动作**
冻结 agent 根据 $(s_t,F_t)$ 生成最终动作 $a_t^{(1)}$，并执行它。

**step 6：如果最终动作变了，重新预测**
若 $a_t^{(1)}\neq a_t^{(0)}$，必须对实际要执行的动作重新调用 world model。否则后面的“预测误差”对应的是旧动作，memory 会学错因果对应关系。

**step 7：环境返回真实下一观察**
执行 $a_t$，得到 $o_{t+1}$。

**step 8：更新 Episodic Memory**
追加 $(o_t,a_t,o_{t+1})$。

**step 9：结构化比较预测和现实**
把 $\hat{o}_{t+1}$ 与 $o_{t+1}$ 都转成 subject-predicate-object triples。

**step 10：从 mismatch 中更新 Semantic Memory**
如果结构化状态不同，critic 提炼可复用的 preservation rule，例如“检查物体不会改变其位置”，并维护 evidence score。

**step 11：进入下一轮**
后续预测会自动带上新积累的案例和有效规则。

### 4.2 三个模块为什么缺一不可

- Episodic Memory 回答：“以前做过相似动作时，真实发生了什么？”
- Semantic Memory 回答：“从过去的错误中，能总结出什么跨实例规律？”
- Selective Foresight 回答：“即使生成了预测，这次是否应该给 agent 看？”

Figure 3 的信息流可概括为：

```text
历史真实转移 ──> Episodic Memory ─┐
                                  ├─> 冻结世界模型 ─> 预测 ─> 置信度过滤 ─> 冻结 agent ─> 动作
预测-现实 mismatch ─> Semantic Memory ┘                                  │
                                                                          v
                                                                       环境观察
                                                                          │
                                    <──────────── 更新两类 memory ─────────┘
```

---

## 5. 核心机制精读

### 5.1 Episodic Memory：用真实案例约束模拟

**它解决什么问题**
零样本 LLM 可能只凭语言先验“脑补”环境变化。具体真实转移可告诉它这个环境实际怎样响应某个动作。

**它怎么做**
保存所有此前执行过的三元组：

$$
M_E^t=\{(o_i,a_i,o_{i+1})\}_{i<t}.
$$

对候选动作 $a_t$，只用动作 token 集合的 Jaccard 相似度检索 top-$k_{M_E}$，再把旧观察、旧动作、旧下一观察原样放入 world-model prompt。

**依赖的输入**

- 当前候选动作 $a_t$；
- 过去真实转移库 $M_E^t$；
- 检索数量 $k_{M_E}$。

**产生的输出**

- 一个检索转移列表 $M_{E,k_{M_E}}^t(a_t)$；
- 作为 in-context examples 注入世界模型。

**和其他模块怎么连接**

- 与 $M_S$ 共同形成 $W_\theta$ 的外部上下文；
- 最终动作执行后，新转移再写回 $M_E$；
- 如果 Selective Foresight 改变了动作，则必须按新动作重新检索。

**去掉会怎样**

Table 1 中 “w/o $M_E$” 只剩 Semantic Memory，性能显著下降。例如：

- Gemma-4-26B-A4B / ALFWorld Exact Match：完整方法 52.88，去掉 $M_E$ 后 7.53；
- 同一模型 / ScienceWorld：51.55 降到 2.71；
- Qwen3.5-9B / ScienceWorld：29.82 降到 0.90。

因此，**预测准确率的主要增益来自 episodic retrieval**。Figure 5 也显示，把 $k_{M_E}$ 从 1 增加到 5，在六个 backbone×environment 组合上带来 7.6–23.5 个 Exact Match 点。

**需要警惕**

检索 key 只有动作 token，没有显式状态匹配。它简洁且实验证明有效，但可能检索到“动作文字相同、对象状态不相同”的案例。论文靠当前观察和 Semantic Memory 纠偏，没有专门验证这种冲突。

### 5.2 Semantic Memory：从错误中提炼持久规则

**它解决什么问题**
具体案例不一定覆盖新对象、新房间或新任务。需要把多次错误抽象成可跨实例使用的规则。

**它怎么做**

1. factorizer $g$ 把预测和真实观察转换成 triples；
2. 若两组 triples 不同，视为 mismatch；
3. LLM critic 从 mismatch 中提炼 preservation rule；
4. 规则以 $(r_i,e_i)$ 保存；
5. 新规则初始 $e_i=1$；
6. 后续观察支持/反驳规则时，以 $\pm 1/|M_S|$ 更新；
7. 只有 $e_i>0$ 的规则才渲染进 prompt。

Appendix D 的 prompt 明确把规则限制为“什么不应因该动作而改变”，例如：

> “Examining an object does not move it.”

它不是任意因果规则发现器，主要抽取 **frame axioms / preservation rules（框架公理或保持规则）**，用来抑制世界模型凭空改变无关状态。

**依赖的输入**

- 实际执行动作对应的预测 $\hat{o}_{t+1}$；
- 真实观察 $o_{t+1}$；
- 当前状态与动作；
- factorizer 和 critic；
- batch 大小 $k_{M_S}$。

**产生的输出**

- 新规则或规则证据更新 $\Delta M_S^t$；
- 过滤后可注入 prompt 的规则集。

**和其他模块怎么连接**

- 依赖实际执行动作对齐后的 world-model 预测；
- 与 Episodic Memory 一起约束后续预测；
- Selective Foresight 虽控制预测是否进入 agent，但无论是否展示，都可在实际结果出来后形成校正证据。

**去掉会怎样**

“w/o $M_S$” 保留 Episodic Memory。Table 1 显示它已经很强，但完整方法通常进一步提升：

- Gemma-4-26B-A4B / ScienceWorld EM：34.65 → 51.55；
- Gemma-4-31B / ScienceWorld EM：56.74 → 62.03；
- Qwen3.5-9B / ScienceWorld EM：28.92 → 29.82，提升较小。

因此 Semantic Memory 是**互补增益**，但其边际作用依赖 backbone 和环境，不能笼统说是主要贡献。

**需要警惕**

- Figure 5 表明 $k_{M_S}$ 通常不敏感，大多数变化在 2 点内；
- 规则如何去重、同 key 如何合并、支持/反驳如何精确判定，正文没有完全算法化；
- factorizer 和 critic 都由同一 LLM 完成，可能把一个 LLM 的解释偏差重新写回自己的上下文；
- 只提炼 preservation rules，覆盖不了“动作应当引起什么变化”的完整动态模型。

### 5.3 Selective Foresight：不确定时不给 agent 看

**它解决什么问题**
错误预测会改变 agent 的动作；有时不提供预测反而更安全。

**它怎么做**

- 用输出 token 平均 log probability 计算置信度；
- 高于阈值才把 $\hat{o}_{t+1}$ 放进 agent prompt；
- 低于阈值就 abstain，令 $F_t=\varnothing$。

**依赖的输入**

- 预测 token 的 log probabilities；
- 阈值 $\tau$。

**产生的输出**

- $F_t=\hat{o}_{t+1}$ 或空值。

**和其他模块怎么连接**

- 它位于 world model 与 agent 之间；
- 不改变 world-model prompt，只在生成后过滤（Figure 21 caption）；
- agent 再基于 $F_t$ 重新选动作。

**去掉会怎样**

Table 2 的 8 个 planning 设置中，w/ $F_t$ 相对 w/o $F_t$ 全部提升或持平趋势，实际表中均提升：

- Gemma / ReAct / ScienceWorld：46.67 → 52.22；
- Gemma / ReflAct / ALFWorld：24.63 → 27.61；
- GPT-5.4-mini / ReAct / ALFWorld：43.28 → 50.75。

但与“完全不使用 world model”相比，结果并非全胜：

- GPT-5.4-mini / ReAct / ScienceWorld：63.33 < 65.56；
- GPT-5.4-mini / ReflAct / ALFWorld：47.01 < 50.00。

所以可靠结论是：

> confidence gate 能改善 WorldEvolver 自己的 foresight 使用方式，但不能保证世界模型对强 agent 永远有净收益。

**需要警惕**

- Table 3 的阈值非常接近 1，例如 $1-10^{-4}$、$1-10^{-6}$；
- token probability 不等于事实正确概率；
- 论文明确承认某些闭源 API 不提供 token probability；
- 阈值是按模型、agent 和环境分别选择的，跨域泛化能力未证明；
- 论文没有清楚交代阈值校准是否与测试数据严格隔离。

### 5.4 Draft–Predict–Replan 与实际动作对齐

这是容易被忽略但很重要的机制：

1. agent 先给草稿动作；
2. world model 预测草稿动作后果；
3. agent 看到 foresight 后可能改动作；
4. 若动作变了，系统重新预测最终动作；
5. memory 更新只使用“最终动作对应预测 vs 实际观察”。

如果不做第 4 步，系统可能看到：

- 对动作 A 的预测；
- 实际执行动作 B；
- 然后把差异错误归因于世界模型不懂动作 A。

论文没有单独消融这个对齐步骤，但从因果配对角度它是算法正确性的必要条件。

---

## 6. 公式与 Algorithm 1 逐行解释

### 6.1 部分可观测状态

$$
s_t=(o_1,a_1,\ldots,o_{t-1},a_{t-1},o_t)
$$

- $t$：当前交互步；
- $o_i$：第 $i$ 次环境观察；
- $a_i$：第 $i$ 次动作；
- $s_t$：agent 当前可见的完整文字历史。

直觉：环境真实状态不可见，只能用“看见了什么、做了什么”近似。

代码近似：

```python
state = history + [{"observation": current_observation}]
```

### 6.2 agent policy

$$
a_t\sim\pi_\theta(\cdot\mid s_t)
$$

- $\pi_\theta$：冻结的 LLM agent；
- $\cdot\mid s_t$：条件是当前历史；
- $\sim$：从策略分布中生成动作。

论文实现 temperature=0，因此工程上接近确定性解码；公式仍用采样记号。

```python
action = agent.generate(render_agent_prompt(state), temperature=0)
```

### 6.3 世界模型的 K 步预测

$$
(\hat{o}_{t+1},\ldots,\hat{o}_{t+K})
\sim W_\theta(\cdot\mid s_t,a_t)
$$

- $W_\theta$：冻结 world model；
- $\hat{o}_{t+j}$：预测观察；
- $K$：想象 horizon。

本文主体聚焦 $K=1$，因为下一观察既直接影响当前决策，又会立刻得到真实监督。ITP-I 在 agent planning 中可选 $K\in\{0,\ldots,5\}$。

### 6.4 双 memory 状态

$$
M_t=(M_E^t,M_S^t)
$$

- $M_E^t$：具体经历；
- $M_S^t$：抽象规则。

它们不是模型参数，而是 prompt 外部存储。

### 6.5 Episodic Memory 与检索

$$
M_E^t=\{(o_i,a_i,o_{i+1})\}_{i<t}
$$

$$
M_{E,k_{M_E}}^t(a_t)
=
\operatorname{TopK}^{k_{M_E}}_{(o_i,a_i,o_{i+1})\in M_E^t}
\operatorname{sim}(a_t,a_i)
$$

- $\operatorname{sim}$：动作 token 集合的 Jaccard score；
- $k_{M_E}$：检索案例数，默认 5；
- 返回与当前候选动作最相似的过去真实转移。

Jaccard：

$$
J(A,B)=\frac{|A\cap B|}{|A\cup B|}.
$$

代码近似：

```python
def jaccard(action_a, action_b):
    a, b = set(tokenize(action_a)), set(tokenize(action_b))
    return len(a & b) / max(1, len(a | b))

retrieved = sorted(
    episodic_memory,
    key=lambda x: jaccard(current_action, x["action"]),
    reverse=True,
)[:k_me]
```

### 6.6 Episodic Memory 更新

$$
M_E^{t+1}=M_E^t\cup\{(o_t,a_t,o_{t+1})\}.
$$

这是 append-only 更新，不做梯度学习。

```python
episodic_memory.append({
    "observation": obs_t,
    "action": executed_action,
    "next_observation": obs_t1,
})
```

### 6.7 Semantic Memory

$$
M_S^t=\{(r_i,e_i)\}_{i=1}^{|M_S^t|}
$$

- $r_i$：文字规则；
- $e_i\in\mathbb R$：规则证据分数。

预测和真实观察先经过 factorizer：

$$
\hat{z}_{t+1}=g(\hat{o}_{t+1}),\quad
z_{t+1}=g(o_{t+1}).
$$

- $g$：把自由文本映射成 triples 的 LLM 函数；
- $\hat z,z$：结构化世界状态。

完整修正链：

$$
(s_t,a_t)\xrightarrow{W_\theta}\hat{o}_{t+1},
$$

$$
(\hat{o}_{t+1},o_{t+1})
\xrightarrow{g}
(\hat z_{t+1},z_{t+1})
\xrightarrow{\text{LLM critic}}
r_i.
$$

当 $\hat z_{t+1}\neq z_{t+1}$ 时才产生失败案例。规则初始分数 1，以后根据后续证据支持或反驳更新 $\pm1/|M_S|$，只有 $e_i>0$ 才进入 prompt。

更新：

$$
M_S^{t+1}=M_S^t\cup\Delta M_S^t.
$$

代码近似：

```python
pred_triples = factorize(prediction)
gold_triples = factorize(real_observation)
if set(pred_triples) != set(gold_triples):
    mismatch_buffer.append((state, action, prediction, real_observation))

if len(mismatch_buffer) >= k_ms:
    updates = critic.extract_preservation_rules(mismatch_buffer)
    merge_rule_updates(semantic_memory, updates)
    mismatch_buffer.clear()
```

### 6.8 置信度

若输出 token 为 $y_{1:n}$：

$$
\ell_t=\frac{1}{n}\sum_{i=1}^{n}
\log p_\theta(y_i\mid y_{<i},s_t,a_t,M_t).
$$

- $n$：预测输出 token 数；
- $p_\theta(y_i|\cdot)$：第 $i$ 个已生成 token 的条件概率；
- $\ell_t$：平均 token log probability。

再指数化：

$$
q_t=\exp(\ell_t)\in(0,1].
$$

因此 $q_t$ 是 token probability 的几何平均：

$$
q_t=
\left(\prod_{i=1}^n p_i\right)^{1/n}.
$$

几何平均减少了长度的直接影响，但仍会受输出风格、tokenization 和模型校准影响。

```python
mean_logprob = sum(generation.token_logprobs) / len(generation.token_logprobs)
confidence = math.exp(mean_logprob)
```

### 6.9 Selective Foresight

$$
F_t=
\begin{cases}
\hat{o}_{t+1}, & q_t\ge\tau\\
\varnothing, & q_t<\tau.
\end{cases}
$$

这就是一个 selective prediction / abstention 规则。

```python
foresight = prediction if confidence >= tau else None
```

### 6.10 Algorithm 1 逐行

1. **生成草稿动作** $a_t^{(0)}$：没有 foresight 的第一次 agent 调用。
2. **检索 episodic transitions**：按草稿动作找 top-$k_{M_E}$。
3. **world model 预测**：输入当前状态、草稿动作、episodic 和 semantic memory，输出 $(\hat{o}_{t+1},q_t)$。
4. **置信度门控**：决定 $F_t$ 是预测还是空。
5. **agent 二次决策**：让 agent 在可能的 foresight 条件下生成 $a_t^{(1)}$。
6. **确定执行动作**：$a_t\leftarrow a_t^{(1)}$。
7. **动作对齐**：若最终动作和草稿不同，对最终动作重新检索、重新预测。
8. **执行环境动作**：得到 $o_{t+1}$。
9. **更新 episodic memory**：写入真实转移。
10. **更新 semantic memory**：比较最终动作预测与真实观察，累计到 $k_{M_S}$ 个 mismatch 后提炼规则。
11. **返回**：动作和两类更新后的 memory。

一个实现细节：第 5 行意味着每个环境步骤至少有两次 agent policy 调用；第 7 行可能增加一次 world-model 调用，factorizer/critic 又会产生额外调用。论文 Table 4 报告的是 world-model prediction benchmark 的每 transition 时间，不等同于完整 agent loop 的端到端延迟。

---

## 7. 实验部分精读

### 7.1 数据集、benchmark 与环境

#### Word2World：测世界模型预测

- 包含 ALFWorld 和 ScienceWorld 的环境转移数据；
- test split 每个环境 195 条 trajectory；
- 目标是预测下一观察；
- memory 从空开始，按部署顺序在线更新。

#### AgentBoard：测 agent 规划

- ALFWorld：134 个任务；
- ScienceWorld：90 个任务；
- 每个配置每题 $L=5$ 次 trial；
- 每 trial 最多 30 步；
- 报告 best-of-$L$ Success Rate。

ALFWorld 是家庭场景文字任务；ScienceWorld 是科学学校环境，包含实验、物体状态和设备操作，动态通常更复杂。

### 7.2 backbone model

#### 世界模型预测实验

- Qwen3.5-9B；
- Gemma-4-26B-A4B；
- Gemma-4-31B。

#### agent planning 实验

- Gemma-4-26B-A4B；
- GPT-5.4-mini；
- agent 与 world model 使用同一个模型。

#### factorizer 与 critic

- 与 $W_\theta$ 共用同一个 backbone；
- 全部冻结。

#### API 还是本地模型

- Table 4 明确在单张 Nvidia H200 上测 Qwen/Gemma 的预测运行时间，说明这部分按本地 GPU 推理评估。
- GPT-5.4-mini 属于 OpenAI 闭源模型；**这是推断**：它大概率通过 API 使用，但论文没有写具体 API、endpoint、价格或 logprob 获取方式。
- 论文没有给出 Qwen/Gemma 的量化方式、推理框架或 tensor parallel 配置。

### 7.3 baselines

1. **Zero-Shot**
   只给任务描述、当前状态和动作，直接预测下一观察，无 memory。

2. **RAWM-$\phi$**
   RAWM 的 inference-only 复现，只保留检索 encoder，去掉 PPO 训练的 MLP head。
   它用 Qwen3-Embedding-8B 把当前 $(s_t,a_t)$ 与固定转移库做 cosine retrieval，取 top-1 作为示例。检索源是 Word2World test split 的 trajectories，并且提前固定。

3. **ITP-I**
   Imagine-then-Plan 的 training-free 版本。预测评估限制为一步；agent planning 时由模型选择 $k\in\{0,\ldots,5\}$ 的 imagination horizon。

4. **WorldEvolver w/o $M_E$**
   去掉 episodic，只剩 semantic memory。

5. **WorldEvolver w/o $M_S$**
   去掉 semantic，只剩 episodic memory。

6. **Agent planning 的 w/o / w $F_t$**
   WorldEvolver 不使用/使用 Selective Foresight。

### 7.4 agent

- **ReAct**：每步输出 Thought + Action；
- **ReflAct**：把 Thought 替换为与目标状态相关的 Reflection + Action；
- 两者均使用 AgentBoard in-context examples。

### 7.5 metrics

#### 世界模型预测

1. **Exact Match**：预测和参考观察规范化后的字符串完全匹配；
2. **Token F1**：token 级 lexical overlap，在所有样本上 micro-average；
3. **Cosine Similarity**：使用 Qwen3-Embedding-8B 嵌入后的语义余弦相似度。

论文没有给出字符串规范化和 tokenization 的全部细节，因此独立复现时这两项还需查代码；PDF 中未附代码链接。

#### agent planning

**Success Rate**：是否在允许交互预算内完成任务，并对 $L=5$ 次 trial 取 best-of-$L$。

best-of-5 衡量“多次尝试至少成功一次”的能力，不等于单次部署成功率。

### 7.6 Table 1：世界模型预测主表

每个模型块有两组环境列；每个环境包含：

- Exact Match；
- Token F1；
- Cosine Similarity。

完整关键数值如下：

| Backbone / 方法 | ALF EM | ALF F1 | ALF Cos | Sci EM | Sci F1 | Sci Cos |
|---|---:|---:|---:|---:|---:|---:|
| Gemma-4-26B-A4B Zero-Shot | 3.60 | 35.48 | 67.91 | 0.41 | 16.42 | 52.45 |
| RAWM-$\phi$ | 20.06 | 48.13 | 71.30 | 14.93 | 27.31 | 56.50 |
| ITP-I | 1.46 | 32.48 | 66.10 | 0.39 | 11.50 | 47.69 |
| WorldEvolver w/o $M_E$ | 7.53 | 38.08 | 69.06 | 2.71 | 19.29 | 55.04 |
| WorldEvolver w/o $M_S$ | 47.16 | 72.61 | 78.88 | 34.65 | 46.93 | 66.51 |
| **WorldEvolver** | **52.88** | **76.75** | **80.13** | **51.55** | **62.43** | **73.85** |
| Qwen3.5-9B Zero-Shot | 1.58 | 34.06 | 66.39 | 0.59 | 12.72 | 49.27 |
| RAWM-$\phi$ | 14.41 | 38.63 | 66.31 | 2.76 | 16.53 | 49.76 |
| ITP-I | 0.00 | 11.22 | 52.88 | 0.00 | 6.68 | 41.94 |
| WorldEvolver w/o $M_E$ | 2.04 | 33.80 | 65.81 | 0.90 | 13.98 | 50.40 |
| WorldEvolver w/o $M_S$ | 34.86 | 61.56 | 74.34 | 28.92 | 44.84 | 65.08 |
| **WorldEvolver** | **37.04** | **62.38** | **74.64** | **29.82** | **44.88** | **65.15** |
| Gemma-4-31B Zero-Shot | 2.71 | 38.42 | 69.90 | 7.58 | 25.28 | 58.55 |
| RAWM-$\phi$ | 34.33 | 57.49 | 72.66 | 32.84 | 42.38 | 64.84 |
| ITP-I | 1.36 | 33.61 | 67.64 | 0.56 | 11.91 | 49.63 |
| WorldEvolver w/o $M_E$ | 6.73 | 41.30 | 71.72 | 13.34 | 30.90 | 61.32 |
| WorldEvolver w/o $M_S$ | 56.27 | 80.02 | 81.21 | 56.74 | 66.50 | 76.00 |
| **WorldEvolver** | **56.41** | **80.87** | **81.39** | **62.03** | **71.60** | **78.42** |

最关键结论：

1. 完整 WorldEvolver 在 3 个 backbone × 2 个环境 × 3 个 metric 的 18 个格子中全部最高。
2. episodic-only 已经贡献绝大多数提升；
3. semantic-only 增益弱；
4. 两者结合在 ScienceWorld 的 Gemma 模型上有明显互补；
5. ITP-I 在一步预测上经常低于 Zero-Shot，作者归因于过度生成想象细节。

### 7.7 Table 2：agent planning 主表

| Agent | 方法 | ALF Gemma | ALF GPT | Sci Gemma | Sci GPT |
|---|---|---:|---:|---:|---:|
| ReAct | w/o World Model | 23.88 | 49.25 | 44.44 | **65.56** |
| ReAct | RAWM-$\phi$ | 22.39 | 41.79 | 43.33 | 57.78 |
| ReAct | ITP-I | 25.37 | 38.81 | 34.44 | 60.00 |
| ReAct | WorldEvolver w/o $F_t$ | 24.63 | 43.28 | 46.67 | 62.22 |
| ReAct | **WorldEvolver w/ $F_t$** | **26.12** | **50.75** | **52.22** | 63.33 |
| ReflAct | w/o World Model | 26.12 | **50.00** | 42.22 | 60.00 |
| ReflAct | RAWM-$\phi$ | 20.15 | 42.54 | 41.11 | 58.89 |
| ReflAct | ITP-I | 23.13 | 30.60 | 37.78 | 58.89 |
| ReflAct | WorldEvolver w/o $F_t$ | 24.63 | 44.78 | 48.89 | 62.22 |
| ReflAct | **WorldEvolver w/ $F_t$** | **27.61** | 47.01 | **50.00** | **63.33** |

如何读：

- 行是在固定 agent/backbone 下替换 world-model signal；
- 列是环境 × backbone；
- 粗体是所有 world-model-based 方法中最好；
- 下划线是包括“无 world model”在内的总体最好。

关键结论：

1. WorldEvolver w/ $F_t$ 是 8 个格子中最强的 world-model-based 方法。
2. 相比无 world model，它在 Gemma 的 4 个格子全胜。
3. 在 GPT-5.4-mini 的 4 个格子中只胜 2 个；强 agent 的收益不稳定。
4. WorldEvolver w/o $F_t$ 比 RAWM-$\phi$ 平均高 3.67 Success Rate 点（论文给出的平均）。
5. **这是根据表格计算**：完整 w/ $F_t$ 相比无 world model 的 8 格宏平均约提升 2.36 点，但论文没有报告显著性区间。

最值得记住的不是“世界模型全面提升 agent”，而是：

> 预测准确率可以大幅提升，但这些提升传导到最终规划时会被 agent 自身能力、任务饱和度和错误 foresight 风险显著削弱。

### 7.8 消融和分析证明了什么

#### Figure 5：memory 超参数

- $k_{M_E}:1\rightarrow5$ 是主导因素；
- $k_{M_S}$ 大多不敏感；
- 默认 $k_{M_E}=5,k_{M_S}=1$。

#### Figure 4：在线持续积累

- 从 trial 1 到 5，ScienceWorld + Gemma 上 WorldEvolver 与 baselines 的差距逐步拉开；
- 作者据此认为 memory 在多次尝试和跨任务中累积后更有价值；
- GPT-5.4-mini 增益较小，作者解释为强 planner 留给 world model 的提升空间更少。

#### Figure 7：部署顺序中的预测准确率

- WorldEvolver 的 trajectory-macro EM 在多数区间高于 baselines；
- ScienceWorld 有明显中段抬升；
- 但图是滑动/局部趋势，不能替代随机顺序和多 seed 检验。

#### Figure 8–10：难度与任务类型

- ALFWorld easy 基本饱和，hard 更有区分度；
- ScienceWorld 中 Lifespan、Thermom.、Chemistry 等需要追踪环境动态的类别受益更明显；
- StateChange 几乎所有方法都接近 0，说明稀疏或难积累的动态仍未解决。

#### Figure 6、11：confidence calibration

- 在多数设置中，保留范围扩大时 Exact Match 下降，即高置信度预测通常更准；
- 这支持 selective filtering 的方向；
- 但并未证明这个置信度经过严格概率校准，也没有跨环境固定阈值实验。

### 7.9 哪些结果比较弱或需要警惕

1. 下游 agent 增益远小于预测指标增益。
2. GPT-5.4-mini 上完整方法仍有 2/4 格低于无 world model。
3. 只报告一个随机 seed（Appendix B：seed 42），没有均值±方差或显著性检验。
4. Success Rate 用 best-of-5，可能掩盖单次可靠性。
5. memory 跨 task 持久化，结果依赖任务顺序；没有顺序随机化/多顺序实验。
6. 阈值按 cell 选择，但未明确独立 calibration split，存在阈值过拟合疑问。
7. 只测两个文字环境，作者也在 Limitations 明确承认没有 web、code、robotics、multimodal。
8. Table 4 不是完整 planning 端到端成本。
9. 没有与“把同样 memory 直接给 agent”做等预算比较，尚不能完全排除增益主要来自更多上下文或额外调用。

---

## 8. 训练和推理成本分析

### 8.1 是否训练模型参数

不训练。agent、world model、factorizer、critic 全部冻结；无反向传播、无 optimizer。

### 8.2 是否只更新 memory/context/cache

是。更新的是：

- append-only transition memory；
- semantic rule/evidence store；
- mismatch buffer；
- prompt 中渲染的 memory context。

这比普通 KV cache 更持久、更结构化；它是应用层外部 memory。

### 8.3 是否需要 GPU

- 精确复现 Qwen/Gemma 实验需要 GPU；
- Table 4 使用单张 Nvidia H200；
- 若改用支持 logprobs 的云端模型，可不自备 GPU，但会转化为 API 成本；
- CPU 运行 9B/26B/31B 模型理论上可行但不适合论文规模。

### 8.4 是否需要 API

- 只复现 Qwen/Gemma 路线：不一定需要 API；
- 复现 GPT-5.4-mini planning：很可能需要 OpenAI API，**这是推断**，论文未写调用接口；
- closed API 若不返回 token logprob，就不能原样实现 Selective Foresight，论文建议 self-consistency 或 learned calibration 替代。

### 8.5 成本主要在哪里

1. 每步至少两次 agent 生成；
2. 至少一次 world-model 生成；
3. 最终动作改变时再做一次 world-model 生成；
4. 预测和真实观察各需要 factorization；
5. mismatch 时需要 critic 生成规则；
6. memory 变长会增加 prompt token；
7. agent evaluation 有 224 个任务 × 5 trials × 最多 30 步。

### 8.6 Table 4 的实测成本

| Backbone | 方法 | 平均秒/transition | 总 GPU 小时 |
|---|---|---:|---:|
| Gemma-4-26B-A4B | Zero-Shot | 1.05 | 3.72 |
|  | RAWM-$\phi$ | 0.75 | 2.65 |
|  | ITP-I | 1.42 | 5.03 |
|  | WorldEvolver | 1.48 | 5.24 |
| Qwen3.5-9B | Zero-Shot | 0.66 | 2.32 |
|  | RAWM-$\phi$ | 0.72 | 2.55 |
|  | ITP-I | 1.23 | 4.36 |
|  | WorldEvolver | 0.96 | 3.38 |
| Gemma-4-31B | Zero-Shot | 0.75 | 2.66 |
|  | RAWM-$\phi$ | 0.52 | 1.84 |
|  | ITP-I | 1.19 | 4.21 |
|  | WorldEvolver | 1.34 | 4.73 |

RAWM 的 embedding 已离线预计算且不计入 runtime，所以其成本比较有一定口径优势。

### 8.7 最小复现配置

**严格论文级复现：**

- 1×H200 或同等级显存 GPU；
- Qwen3.5-9B / Gemma-4-26B-A4B；
- 32,768 context；
- ALFWorld、ScienceWorld、Word2World、AgentBoard；
- 能返回逐 token logprob 的推理后端。

**MVP：这是工程建议，不是论文配置**

- 只选 ALFWorld；
- 只跑 20–50 个任务或一小段 transition stream；
- 用 7B–9B instruct 模型；
- 4-bit 量化后可尝试单张 24GB GPU；
- 先只做 Zero-Shot、Episodic-only、完整 WorldEvolver；
- 若后端没有 logprobs，先把 Selective Foresight 改为多次采样一致性，但这不再是原论文的严格实现。

---

## 9. 这篇论文真正的贡献

### 9.1 作者声称的贡献

作者在 §1 明确列出三点：

1. 提出一个部署时更新 world-model context、但冻结 agent 和所有参数的 self-evolving framework；
2. 用 Episodic Memory、Semantic Memory、Selective Foresight 实例化；
3. 在 Word2World、ALFWorld、ScienceWorld 上比较 RAWM-$\phi$ 与 ITP-I，评估预测对齐和规划成功。

### 9.2 实际站得住的贡献

1. **把线上真实 transition 和 mismatch 组织成 world model 专用的双层 memory。**
   预测结果的提升在 3 个 backbone、2 个环境、3 个 metric 上非常一致，证据扎实。

2. **明确区分“具体经验”与“抽象保持规则”。**
   episodic 是主力，semantic 是互补，消融把两者作用基本分开了。

3. **把 foresight 变成可拒绝的信号。**
   Table 2 表明 gate 一致改善 WorldEvolver 的 agent performance，说明“预测是否展示”确实是独立设计维度。

4. **正确处理草稿动作与最终动作不一致。**
   这让 mismatch 对应实际执行动作，避免 memory 更新中的错误归因。

5. **给出了相对完整的 prompt 与运行细节。**
   Appendix D 提供 agent、baseline、factorizer、rule extractor prompt，复现信息比只写概念框图更充分。

### 9.3 可能只是工程组合的部分

以下组件本身都不是全新思想：

- episodic retrieval；
- 语言规则 memory；
- LLM critic；
- in-context adaptation；
- confidence threshold / abstention；
- predict-before-act。

真正的新意更像是：**把这些已有机制系统性地放到“冻结的 world model 上下文”这一位置，并形成可在线闭环更新的组合。**

因此若把贡献表述成“发明了新的 world-model learning 原理”会过强；表述成“提出并验证了一套 training-free deployment-time world-model adaptation framework”更稳。

### 9.4 reviewer 可能质疑什么

1. **这到底是 world model 在进化，还是 prompt memory 在增长？**
   权重不变，核心变化是外部上下文。“self-evolving world model”可能被认为命名偏大。

2. **预测提升是否主要就是 transition retrieval？**
   Table 1 显示 episodic-only 已占大部分增益，semantic 的独立增益不总是大。

3. **为什么不给 agent 直接检索同样的 memory？**
   缺少等 token、等调用预算的 direct-agent-memory baseline。

4. **校准是否泄漏测试信息？**
   每 cell 的 $\tau$ 如何选、是否来自独立 validation 数据，不清楚。

5. **结果是否稳定？**
   seed 42、无误差条、无显著性检验、跨 task memory 又依赖顺序。

6. **best-of-5 是否夸大实际收益？**
   部署往往只允许一次尝试；单次成功率和失败成本没有主表报告。

7. **成本比较是否完整？**
   Table 4 是 prediction runtime，不是包含双 agent 调用、factorizer、critic 的完整端到端 planning cost。

8. **强 agent 上为何仍会退化？**
   GPT-5.4-mini 有 2/4 格低于无 world model，说明“更准预测→更好动作”不是单调关系。

9. **规则可靠性与 memory 膨胀怎么控制？**
   规则去重、冲突消解、遗忘、容量上限、长期污染都没有充分实验。

10. **泛化范围窄。**
    只有两个文字环境；没有 web、代码、视觉、机器人真实噪声。

---

## 10. 和相关论文/方向的关系

### 10.1 与 RAG / memory agent

相同点：

- 都把外部记录检索进上下文；
- 都不必改模型参数。

不同点：

- 普通 RAG 检索文档知识；WorldEvolver 检索的是动作—状态转移；
- 普通 memory agent 直接帮助 agent 选动作；本文主要先帮助 world model 预测，再由预测影响 agent；
- 本文还有 prediction-observation mismatch 驱动的 semantic rule memory。

一句话：**它是针对环境动态预测的在线 RAG + rule memory，不是一般知识问答 RAG。**

### 10.2 与 test-time adaptation

相同点：

- 都在测试/部署阶段利用新数据适应分布。

不同点：

- 典型 test-time training 更新参数、归一化统计或 adapter；
- WorldEvolver 只更新非参数 memory 和 prompt；
- 监督信号不是标签，而是环境真实下一观察。

严格说，它属于 **context-only / non-parametric test-time adaptation**。

### 10.3 与 reinforcement learning

相同点：

- 都在 agent–environment 闭环中收集经验；
- 都关心长期任务成功。

不同点：

- 没有 reward maximization；
- 没有 value function、policy gradient、Q-learning 或 PPO；
- agent policy 不更新；
- memory 更新目标是预测现实、不是最大化累计 reward。

所以这不是 RL，只借用了 model-based RL 的“先预测环境后果再行动”思想。

### 10.4 与传统 world model

传统 world model：

- 通常学习潜在状态与转移；
- 通过训练参数逼近 $p(s_{t+1}|s_t,a_t)$；
- 可用于 imagined rollout 和控制。

本文：

- 状态与输出都是文字；
- 核心模型是已有 LLM；
- 主要预测一步观察；
- 不训练 dynamics weights；
- 用 memory prompt 在部署时校正。

因此它更像 **retrieval- and rule-conditioned textual simulator**。

### 10.5 与 agent planning

普通 ReAct：

```text
当前状态 -> 思考 -> 动作
```

WorldEvolver：

```text
当前状态 -> 草稿动作 -> 预测动作后果 -> 过滤 -> 再决定最终动作
```

这属于两阶段、world-model-assisted planning。它不是搜索树，也没有比较多个候选动作；每步主要围绕一个草稿动作做一次 lookahead。

### 10.6 与 self-evolving agent

常见 self-evolving agent 更新：

- verbal feedback；
- skill library；
- agent memory；
- task curriculum；
- agent policy。

WorldEvolver 特意冻结 agent，把变化放在 world-model evidence 上。它强调：

> agent 不学新的行动策略，但它所依赖的“环境模拟器上下文”会持续学习。

### 10.7 与论文明确讨论的具体工作

| 工作 | 核心做法 | 与 WorldEvolver 的区别 |
|---|---|---|
| Hao et al. 2023 | LLM 同时作 planner/simulator | 本文将 world-model 模块和 agent 决策流程显式分开，并在线更新外部 memory |
| Chae et al. 2025 | 训练 web next-state predictor | 本文不更新参数，且只测文字环境 |
| PreAct | 行动前显式预测 | 本文增加在线双 memory 和 confidence gate |
| Qiao et al. 2024 | 学习任务级 world knowledge | 本文从实际 transition/mismatch 在部署时构建知识 |
| WebEvolver | agent 与 world model co-evolve | 本文 agent 和模型参数都冻结 |
| WALL-E 2.0 | training-free neural-symbolic world alignment | 更接近本文，但本文强调 episodic transition + semantic preservation rule + agent-facing gate |
| AutoManual | 从交互轨迹在线构建规则/manual | 本文把规则用于 world-model prediction，并与具体 transition retrieval 结合 |
| RAWM-$\phi$ | 固定库 embedding retrieval | 本文按动作 token 检索在线真实转移，并随部署持续积累 |
| ITP-I | 自适应 imagination horizon | 本文主体做一步预测，重点是 memory revision 和低置信度 abstention |
| CoEx / RL world model / neuro-symbolic synergy | 探索中更新抽象状态、重训 world model 或交替更新组件 | 本文完全不改模型权重，只改 context memory |

---

## 11. 最小版本复现方案

### 11.1 最小环境

建议先用 ALFWorld 的一个任务子集，因为：

- 动作空间离散且 prompt 已在 Appendix D 给出；
- transition 规则较稳定；
- 不必先处理 ScienceWorld 的复杂命令。

最小阶段可以只做 offline transition replay：按 Word2World 的部署顺序逐条读 $(o_t,a_t,o_{t+1})$，先验证 prediction，不接 agent planning。

### 11.2 最小模型

- 一个支持 chat completion 和 token logprob 的 7B–9B instruct 模型；
- 同一个模型承担 world model、factorizer、critic；
- 第二阶段再加 ReAct agent；
- 严格靠近论文可选 Qwen3.5-9B。

### 11.3 数据结构

```python
episodic_memory: list[Transition]

Transition = {
    "env": str,
    "task_id": str,
    "step": int,
    "observation": str,
    "action": str,
    "next_observation": str,
}

semantic_memory: dict[str, Rule]

Rule = {
    "key": str,
    "text": str,
    "evidence": float,
    "support_count": int,
    "contradict_count": int,
    "provenance": list[dict],
}

mismatch_buffer: list[Mismatch]

Mismatch = {
    "state": str,
    "action": str,
    "prediction": str,
    "gold_next": str,
    "pred_triples": list[tuple],
    "gold_triples": list[tuple],
}
```

论文 prompt 只要求 key、text、evidence；`provenance` 和计数是复现时建议加的审计字段。

### 11.4 MVP 伪代码

```python
episodic = []
semantic = {}

for transition in deployment_stream:
    state = transition.state
    action = transition.action

    retrieved = topk_by_action_jaccard(
        episodic, action, k=5
    )
    active_rules = [
        rule for rule in semantic.values()
        if rule["evidence"] > 0
    ]

    prediction, token_logprobs = world_model(
        state=state,
        action=action,
        episodic_examples=retrieved,
        semantic_rules=active_rules,
    )

    confidence = exp(mean(token_logprobs))
    gold_next = transition.next_observation

    pred_triples = factorizer(prediction)
    gold_triples = factorizer(gold_next)

    log_prediction_metrics(prediction, gold_next, confidence)

    episodic.append(
        make_transition(state, action, gold_next)
    )

    if set(pred_triples) != set(gold_triples):
        mismatch_buffer.append(
            make_mismatch(
                state, action, prediction, gold_next,
                pred_triples, gold_triples
            )
        )

    if len(mismatch_buffer) >= k_ms:
        proposed_rules = critic(mismatch_buffer)
        update_rule_evidence(semantic, proposed_rules)
        mismatch_buffer.clear()
```

加上 agent planning：

```python
draft_action = agent(state, foresight=None)
prediction, confidence = predict_with_memory(state, draft_action)
foresight = prediction if confidence >= tau else None
final_action = agent(state, foresight=foresight)

if final_action != draft_action:
    prediction, confidence = predict_with_memory(state, final_action)

next_observation = env.step(final_action)
update_memories(
    state, final_action, prediction, next_observation
)
```

### 11.5 必须记录的 log

每一步至少记录：

- env、task_id、trial_id、step；
- 原始观察、草稿动作、最终动作；
- 检索到的 transition IDs 和相似度；
- 注入的 rule keys/evidence；
- world-model 原始预测；
- 每 token logprob、$q_t$、$\tau$、是否 abstain；
- 若动作改变，第二次预测；
- 真实下一观察；
- pred/gold triples；
- mismatch 类型；
- 新增/更新/删除的规则；
- prompt tokens、completion tokens、每个调用延迟；
- 是否任务成功、累计步数；
- 当前 $M_E,M_S$ 大小。

没有这些 log，就很难排查增益来自哪一层，也无法判断 memory 污染。

### 11.6 最小实验表

先做 3 个方法：

1. Zero-Shot；
2. Episodic-only；
3. Episodic + Semantic；

再加 Selective Foresight 做 planning。

#### 表 A：预测

| 方法 | EM | Token F1 | Cosine | 平均延迟 | prompt tokens |
|---|---:|---:|---:|---:|---:|
| Zero-Shot | | | | | |
| Episodic $k=1$ | | | | | |
| Episodic $k=5$ | | | | | |
| Episodic + Semantic | | | | | |

#### 表 B：规划

| 方法 | 单次 SR | best-of-5 SR | 平均成功步数 | 调用数/task | 成本/task |
|---|---:|---:|---:|---:|---:|
| ReAct 无 WM | | | | | |
| ReAct + WM 无 gate | | | | | |
| ReAct + WM + gate | | | | | |

#### 最少的可信性要求

- 至少 3 个任务顺序 seed；
- 报均值和 95% CI；
- 阈值只在 validation split 选择；
- 同时报告单次和 best-of-5；
- memory 容量和 token budget 对所有方法可比。

---

## 12. 基于它做新论文的 5 个方向

以下均是研究建议，不是原论文内容。

### 方向 1：风险可控的自适应置信度，而不是固定 token-probability 阈值

**新 idea**
学习或校准 $P(\text{prediction correct}\mid q,\text{state},\text{action type},\text{memory coverage})$，用 conformal risk control 或在线 calibration 保证暴露 foresight 时的错误率上界。

**比原文改哪里**
替换固定、per-cell 的 $\tau$；把 action type、检索相似度、模型一致性加入置信度。

**为什么可能有效**
原文 token confidence 与准确率只是在多数设置相关，且阈值非常接近 1、跨模型不统一。

**实验**

- calibration ECE/Brier score；
- selective risk–coverage curve；
- 固定阈值 vs held-out calibration vs online conformal；
- 跨环境阈值迁移；
- planning SR 与错误 foresight 率。

**风险**
校准需要额外数据；在线分布持续变化时 coverage 可能骤降。

### 方向 2：状态—动作联合的结构化检索与冲突感知

**新 idea**
检索 key 不只看 action token，而是结合当前结构化状态、对象类型、动作参数和预期前置条件，并对互相矛盾的 transitions 做聚类或加权。

**比原文改哪里**
替换 action-only Jaccard；引入 hybrid retrieval：

$$
\alpha\,\text{action-sim}
+\beta\,\text{state-sim}
+\gamma\,\text{precondition-match}.
$$

**为什么可能有效**
“open fridge”在 fridge 已开/已关状态下后果不同；action-only retrieval 可能选到表面相同但条件冲突的案例。

**实验**

- action-only vs embedding vs structured hybrid；
- 控制 $k$ 和 prompt token 后比较；
- 按 state ambiguity 分桶；
- 检索 precision、预测 EM、planning SR。

**风险**
factorizer 错误会污染检索；复杂检索可能增加延迟，并让简单 Jaccard 的优势消失。

### 方向 3：可验证、可遗忘、有 provenance 的规则 memory

**新 idea**
把 semantic rule 变成带适用条件、反例、来源、置信区间和 TTL 的对象；只有在多次独立支持后激活，环境变化后自动降权。

**比原文改哪里**
原文只有 $r_i,e_i$ 和简单正负更新；新方法增加 scope、precondition、provenance、conflict graph、forgetting。

**为什么可能有效**
可防止 LLM critic 一次错误总结长期污染 prompt，也能适应真正变化的环境。

**实验**

- 人工插入错误规则；
- 环境中途改变 transition；
- 比较恢复时间、错误规则存活率、prediction SR；
- rule precision/recall 的人工标注子集。

**风险**
规则 schema 复杂、人工标注成本高；过度保守会导致规则几乎不激活。

### 方向 4：从单候选一步预测升级为不确定性感知的多候选 MPC

**新 idea**
让 agent 提出多个候选动作；world model 对每个动作做短 horizon rollout，并基于任务相关 progress、uncertainty 和预计成本排序，只在模型可靠的分支上向前展开。

**比原文改哪里**
原文只对一个草稿动作预测，看到 foresight 后再改动作；新方法显式比较多个动作，类似 language-model model predictive control。

**为什么可能有效**
世界模型最有价值的用途不是描述一个动作后果，而是区分候选动作。多候选比较可能让预测精度更直接转化为规划收益。

**实验**

- 1 个候选 vs 3/5 个候选；
- horizon 1/2/动态；
- 相同调用预算下比较；
- regret、SR、步数和成本 Pareto curve。

**风险**
调用成本快速增长；world model 对多个动作可能有系统性排序偏差。

### 方向 5：严格拆分“世界模型适应”与“agent memory 增益”的因果实验

**新 idea**
建立四象限：

1. memory 只给 world model；
2. memory 只给 agent；
3. 两者都给；
4. 两者都不给；

并固定总 token、总模型调用和数据访问范围。

**比原文改哪里**
补上 direct-agent-memory 和等预算控制，随机化 deployment order。

**为什么可能有效**
这能回答 reviewer 最核心的问题：WorldEvolver 的增益是否真的来自“world-model adaptation”，而不只是更多上下文与计算。

**实验**

- 两个现有环境 + 一个 web/code 环境；
- 3–5 个 order seeds；
- 单次 SR 和 best-of-5；
- mediation analysis：预测提升有多少传导到动作质量。

**风险**
可能发现 world-model 专用 memory 并不优于直接 agent memory，削弱原框架叙事；但若结果成立，贡献会更强、更难被质疑。

---

## 13. 阅读检查题与参考答案

### 题 1：WorldEvolver 中“self-evolving”的东西到底是什么？

**答案**：不是模型参数，而是部署时的外部上下文：Episodic Memory、Semantic Memory 以及由此渲染进 world-model prompt 的证据。agent、world model、factorizer 和 critic 参数都冻结。

### 题 2：为什么世界模型只预测得更准还不够？

**答案**：预测会作为条件改变 agent 动作。错误 foresight 可能比无 foresight 更差；而且 Table 1 的大幅预测提升只转化为 Table 2 中较小、在强 agent 上混合的规划收益。

### 题 3：$M_E$ 与 $M_S$ 的本质区别是什么？

**答案**：$M_E$ 保存具体真实转移 $(o_t,a_t,o_{t+1})$，用于类比；$M_S$ 保存从预测—观察 mismatch 中提炼出的抽象 preservation rules 及 evidence，用于约束不应发生的状态变化。

### 题 4：为什么最终动作变了以后必须重新调用 world model？

**答案**：否则用于 memory 更新的预测对应草稿动作，而真实观察对应最终动作，会把两个不同动作的后果错误配对，产生错误规则。

### 题 5：$q_t=\exp(\frac1n\sum_i\log p_i)$ 的直觉是什么？

**答案**：它等于生成 token probability 的几何平均，用一个长度相对归一化的数表示模型对整条预测文本的生成置信度。它不是严格校准的“预测正确概率”。

### 题 6：Table 1 最强的实验证据是什么？

**答案**：完整 WorldEvolver 在 3 个 backbone、2 个环境和 3 个预测 metric 的全部 18 个格子中最高；同时 w/o $M_E$ 大幅退化，说明 episodic retrieval 是主要增益来源。

### 题 7：Table 2 为什么不能支持“WorldEvolver 总能帮助 agent”？

**答案**：虽然它是所有 8 个格子里最强的 world-model 方法，但在 GPT-5.4-mini 的 ReAct/ScienceWorld 和 ReflAct/ALFWorld 上仍低于无 world model；没有普遍净收益。

### 题 8：本文是不是 reinforcement learning？

**答案**：不是。它不以 reward 更新 policy/value，不做梯度或 PPO。环境提供的真实下一观察用于修正 memory，Success Rate 只用于评估。

### 题 9：最影响复现可信度的三个缺口是什么？

**答案**：可答：（1）只有 seed 42、无方差/显著性；（2）memory 跨 task 持久化但没有多部署顺序；（3）阈值校准是否独立于 test 不清楚。也可补充无代码链接、端到端成本不完整。

### 题 10：复现时最少要做哪几个 baseline，才能证明完整框架有意义？

**答案**：至少包括 Zero-Shot、Episodic-only、Episodic+Semantic，以及 planning 中的无 gate/有 gate；更严格还应加入等预算的 direct-agent-memory baseline，并报告单次 SR 与 best-of-5。

---

## 导师式最终判断

这篇论文最值得学的不是一个复杂公式，而是一个很实用的系统思想：

> 把环境执行后自然产生的“真实转移”和“预测错误”变成 world model 下一次推理时可直接使用的证据，同时允许模型在不确定时不发言。

它在**下一观察预测**上的证据很强、很一致；在**最终 agent 规划**上的证据则是正向但不普遍，尤其强 agent 上提升有限。最稳妥的贡献表述是：

> WorldEvolver 证明了无需更新参数的部署时 memory revision，可以显著改善文本世界模型的预测对齐，并在部分长程规划设置中带来可测的下游收益。

不应进一步夸成：

> 它已经解决了通用 self-evolving world model，或可靠地让所有 LLM agent 获得更强规划能力。
