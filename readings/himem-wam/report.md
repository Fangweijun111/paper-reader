> 公开仓库仅提供原创精读分析与来源链接；未转载本文全文、完整译文、PDF或原始图表。该决定表示尚未确认再发布许可，并非论文不能公开阅读。[官方原文](https://arxiv.org/abs/2606.10363v1)。

# 《HiMem-WAM: Hierarchical Memory-Gated World Action Models for Robotic Manipulation》中文精读报告

> 论文：Xiaoquan Sun 等，*HiMem-WAM: Hierarchical Memory-Gated World Action Models for Robotic Manipulation*，arXiv:2606.10363v1，2026。
> 阅读约定：
> - “论文事实”表示可由正文、公式、图表或附录直接核对。
> - “评价”表示基于论文证据作出的审慎判断。
> - “这是推断”表示论文未直接声称、但可以由现有证据推导的分析。
> - 论文材料不足以支持可靠判断时，明确写“不确定”。

**论文信息**：arXiv:2606.10363v1，cs.RO，提交于 2026-06-09，共 19 页；主要作者单位包括香港大学、华中科技大学、清华大学、武汉大学、南方科技大学与 INFIFORCE。

## 1. 这篇论文一句话在做什么

用最直白的话说：这篇论文让机器人先把连续动作压缩成“低层运动单位”，再把若干运动单位组织成“高层技能”，并只在技能发生切换时把关键状态写入记忆，从而让机器人在长任务里既知道现在该做哪个阶段，也能记住已经看不见的历史信息。

**论文事实**：研究对象是语言条件的长时程机器人操作；问题是现有视觉—语言—动作模型和世界动作模型对部署扰动不够稳健，并且固定观察窗口难以保留任务相关历史；作者提出由低层潜动作、高层技能潜变量、Qwen3-VL-4B-Instruct 规划器、执行器、动作解码器以及读写门控外部记忆组成的 HiMem-WAM（Abstract、Figure 1、Section 3）。

技术上更精确地说：HiMem-WAM 把动作策略分解为“技能规划 $p(z_t^h)$ → 低层潜动作展开 $p(\mathbf Z^l\mid z_t^h)$ → 机器人控制解码 $p(\mathbf a\mid\mathbf Z^l)$”，并用离线发现的技能边界标签监督写门，在部署时依据预测的门值稀疏写入记忆；光流和未来帧只用于离线训练监督，部署时不生成未来视频（Eq. (1)、Table 5、Appendix A.7）。

## 2. 背景从 0 讲起

机器人策略通常接收相机图像、语言指令和自身关节状态，然后输出关节位置或末端执行器位姿。主流 VLA（Vision-Language-Action，视觉—语言—动作模型）直接从示范中学习“看见什么就做什么”，优点是端到端，缺点是容易把任务阶段压在短窗口里：物体一旦被遮挡、某个子任务已经完成但不再可见，策略可能忘记过去发生了什么（Section 1、Section 2）。

WAM（World Action Model，世界动作模型）把视觉动力学和动作学习结合起来。它可以通过预测未来图像、隐状态或视频—动作联合序列，学到“动作会怎样改变世界”。但现有 WAM 仍有两个缺口：一是单尺度 action chunk 难以表达“抓取—移动—放置”等层级结构；二是预测未来并不等于拥有长期记忆，固定窗口或持续堆叠历史会带来计算和噪声（Section 1）。

以前的应对路线包括：动作块策略（ACT、Diffusion Policy）；视频—动作联合模型（WorldVLA、LingBot-VA、MotuBrain）；固定窗口或稠密历史记忆（MemoryVLA、MemER、SAM2Act、CronusVLA）；以及专门面向记忆任务的 MEM-0。HiMem-WAM 的切入点是把技能分段和记忆写入绑定：只有当低层运动发生显著变化、模型判断进入新技能时，才记录一个连续记忆 token（Section 2、Figure 2）。

这个问题值得做，因为真实长任务的关键状态经常离开当前视野。例如“刚才试过哪个电池”“两个按钮中先按了哪个”“早餐做到哪一步”都不能仅从当前帧恢复。若机器人每一步都保存全部历史，记忆会迅速增长；若完全不保存，又会出现阶段遗忘。事件驱动的稀疏记忆正好针对这组矛盾。

## 3. 论文的问题定义

- **输入**：时刻 $t$ 的多视角 RGB $o_t=\{I_t^{(v)}\}_{v=1}^{V}$、本体状态 $p_t$、语言指令 $\ell$、外部记忆库 $\mathcal M_t$。
- **输出**：长度为 $K$ 的动作块 $\mathbf a_{t:t+K-1}$。内部中间输出是高层技能潜变量 $\hat z_t^h$、边界分数 $\hat b_t$ 和低层潜动作块 $\hat{\mathbf Z}_{t:t+K-1}^l$（Eq. (1)、Section 3）。
- **优化目标**：Stage I 学低层变分 tokenizer；Stage II 学技能、边界和潜动作预测；Stage III 在动作示范上联合优化动作、规划、执行、边界和门控损失（Eq. (3)、(7)–(9)、Appendix Eq. (33)–(40)）。
- **训练时**：DPFlow 从相邻帧提取多视角光流；tokenizer 学重建光流并可选地对齐真实动作；冻结 tokenizer 后离线生成 $Z^l$；层次分段器生成技能与边界伪标签；最后启用外部记忆进行 SFT。
- **测试/运行时**：只读取当前 RGB、本体状态、指令和已有记忆；规划器预测技能与边界，执行器展开低层潜动作，动作头输出控制；写门超过阈值才更新记忆。没有未来视频生成，也没有 DPFlow（Appendix A.1、A.7）。
- **冻结/更新**：Stage I 只训练 tokenizer；Stage II tokenizer 冻结，训练技能发现、规划器和执行器，记忆关闭；Stage III 启用并训练动作解码器、规划/执行辅助头和记忆门控。论文没有明确给出 Qwen3-VL-4B 和 Wan2.2-TI2V-5B 的逐层冻结比例，因此更细的可训练参数范围**不确定**。
- **environment / reward / feedback**：这不是强化学习论文。环境是 LIBERO、LIBERO-PLUS、RMBench 仿真与双臂真实平台；反馈是示范动作、光流重建、技能伪标签和边界伪标签；没有在线 reward 或 test-time feedback 更新。

## 4. 方法总览

1. **从视频提取运动监督**：对每对相邻多视角帧运行 DPFlow，得到归一化光流。
2. **训练低层潜动作 tokenizer**：把视觉运动压缩为 $z_t^l$，用光流重建、可选动作对齐和 KL 正则学习运动空间。
3. **离线标注所有轨迹**：冻结 tokenizer，把机器人轨迹和无动作视频转换为低层潜动作序列 $Z^l$。
4. **发现技能边界**：比较相邻潜动作表示的相似度，超过差异阈值时开启新段；对变长段做注意力池化，得到高层技能 $Z^h$。
5. **展开伪标签**：把每个高层技能重新映射到原始时间轴，得到每一步的技能目标 $\bar z_t^h$ 与边界标签 $\bar b_t$。
6. **预训练层次潜策略**：Qwen3-VL-4B 规划器预测当前技能和边界；执行器把技能展开为低层潜动作块；此时外部记忆关闭。
7. **接入读写门记忆并动作落地**：读门把检索到的历史 token 注入当前状态；动作解码器产生控制；写门用技能边界决定是否写入新 token。
8. **因果部署**：重复“读记忆 → 选技能 → 展开动作 → 执行 → 必要时写记忆”，不预测未来帧。

流程图式文字：`视频/机器人示范 → DPFlow → 低层潜动作 Z^l → 技能分段与池化 → 高层技能 Z^h + 边界标签 → Qwen 规划器 → 潜动作执行器 → 动作解码器 → 机器人控制`；外部记忆在规划器前读取，在动作产生后按边界稀疏写入（Figure 1、Figure 2）。

## 5. 核心机制精读

### 5.1 低层潜动作 tokenizer

它解决“不同机器人动作标注不统一、无动作视频不能直接用于控制”的问题。输入是相邻多视角图像、光流、本体状态和指令；输出是连续潜动作 $z_t^l$。变分后验用 $\mu_t,\sigma_t$ 采样潜变量；解码器重建多视角光流，有动作标签时再预测真实动作（Eq. (2)–(3)、Appendix A.2）。如果去掉这一阶段，Stage II 就没有运动伪标签。Table 2/3 的 `w/o Stage II` 并非完全去掉 Stage I，因此论文没有单独量化 tokenizer 本身的贡献。

### 5.2 高层技能发现

它解决低层动作过细、长任务缺少阶段结构的问题。输入是 $Z^l$；边界分数由相邻归一化 query/key 的余弦差异得到；达到或超过阈值 $\delta_s$ 就开启新段；段内用注意力池化生成下一级 token。输出是稀疏技能序列 $Z^h$ 和原时间轴上的边界伪标签（Eq. (4)、Appendix Eq. (14)–(26)）。若边界全部为 0 或 1，层次会退化，所以作者加入目标边界比例与段内一致性损失（Eq. (20)–(21)）。

### 5.3 Qwen3-VL-4B 规划器与执行器

规划器接收当前多视角图像、指令、本体摘要和记忆上下文，输出高层技能与边界；执行器再输出未来 $K$ 步低层潜动作。它把“做哪一段任务”和“这一段怎样运动”分开（Appendix A.5）。Figure 1 显示 Stage II 以 Wan2.2-TI2V-5B 的视频—语言表示和动作头为基础，但正文没有给出执行器的完整层数、潜变量维度或 $K$，因此独立重建网络结构仍**不确定**。

### 5.4 读门与写门

读门通过 attention 从连续 token 集合 $\mathcal M_t$ 取回上下文，再用标量 $\alpha_t^r$ 控制注入量；写门根据当前状态、技能和边界输出 $\alpha_t^w$，超过阈值 $\eta$ 时才追加记忆。记忆超过 $N_{\max}$ 时会压缩（Eq. (5)–(6)、Appendix Eq. (29)–(32)）。它不存文本，也不是 RAG 数据库，而是任务级连续状态。若去掉写门，记忆会逐步密集增长；若去掉读门，历史 token 无法影响规划。论文没有分别报告 read-only、write-only 或随机边界消融，这是关键证据缺口。

### 5.5 三阶段训练与 teacher-forced warmup

Stage I 训练 tokenizer；Stage II 关闭记忆，先学会正确技能和动作；Stage III 才启用记忆和动作落地。附录 A.6 提出一种稳定训练的可选做法：预热时用离线发现的边界伪标签 $\bar b_t$ 决定写入，再切换到预测门。原文使用 can，未明确说所有报告实验都启用了这项预热。这个课程式设计降低耦合训练难度。**这是推断**：它也意味着最终性能依赖 Stage II 伪标签质量，一旦技能发现有系统偏差，记忆写入错误会被放大。

## 6. 公式/算法逐行解释

论文没有独立 Algorithm 环境，但 Appendix A.7 给出 7 步推理过程。42 个编号公式可按数据流完整分组理解：

1. **策略分解，Eq. (1)**：对高层技能 $z^h$ 和低层潜动作 $\mathbf Z^l$ 积分，把最终动作概率写成动作解码、执行器和规划器三个条件分布的乘积。代码直觉是 `skill = planner(state, memory); latent = executor(state, skill); action = decoder(state, latent)`。
2. **低层 tokenizer，Eq. (2)–(3)**：Eq. (2) 用重参数化 $z=\mu+\sigma\odot\epsilon$ 让潜变量可反传；Eq. (3) 的第一项重建光流，第二项只在有动作标签时对齐控制，第三项 KL 把后验约束到标准高斯。
3. **层次分段，Eq. (4)**：`Chunk` 按边界把当前层序列变短，反复 $H$ 层后得到技能 $Z^h$。
4. **记忆读写，Eq. (5)–(6)**：Eq. (5) 用当前状态作 query、记忆作 key/value，并以读门控制残差注入；Eq. (6) 用写门阈值选择更新或保持记忆。
5. **Stage II/III 主目标，Eq. (7)–(9)**：Eq. (7) 同时回归技能、低层潜动作块和边界；Eq. (8) 在动作损失外保留规划、执行、边界与门控辅助损失；Eq. (9) 用边界 BCE 监督写门，并对读写门做 $\ell_1$ 稀疏正则。
6. **离线运动监督，Eq. (10)–(13)**：Eq. (10) 按图像宽高归一化光流；Eq. (11) 分视角编码运动和语义并加入 view embedding；Eq. (12) 跨视角融合；Eq. (13) 用 $\mathbb I_t^{act}$ 屏蔽无动作视频的控制对齐损失。
7. **边界和池化，Eq. (14)–(16)**：Eq. (14) 把相邻 token 的余弦不相似度映射到 $[0,1]$；Eq. (15) 与阈值比较生成边界；Eq. (16) 在每个变长段内 softmax 加权池化。
8. **技能发现目标，Eq. (17)–(21)**：总损失由 next-latent、motion、ratio、consistency 四项组成；Eq. (18) 预测下一个低层潜动作；Eq. (19) 经冻结 flow decoder 检查其运动语义；Eq. (20) 约束边界比例接近 $\rho_s$；Eq. (21) 拉近同段 token 与段表示。
9. **技能展开，Eq. (22)–(26)**：Eq. (22) 初始化原时间索引；Eq. (23) 在每次层次压缩后传递段起点；Eq. (24) 把最终段起点投回原时间轴生成 $\bar b_t$；Eq. (25) 用累计边界数找到时刻所属技能；Eq. (26) 构造执行器监督的长度 $K$ 低层潜动作块。
10. **规划器和记忆接口，Eq. (27)–(32)**：Eq. (27) 形成 Qwen hidden state；Eq. (28) 的两个连续头输出技能和边界；Eq. (29) attention 检索记忆；Eq. (30) 门控注入；Eq. (31) 同时生成写门概率和候选 token；Eq. (32) 执行追加/压缩或保持。
11. **精确训练损失，Eq. (33)–(40)**：Eq. (33) 是 Stage II 加权总损失；Eq. (34) 是逐时刻技能 MSE；Eq. (35) 是动作块潜变量 MSE；Eq. (36) 是边界 BCE；Eq. (37) 是 Stage III 总损失；Eq. (38)/(39) 分别适用于确定性策略的动作 MSE和随机策略的负对数似然；Eq. (40) 是时间平均后的门控损失。
12. **teacher forcing，Eq. (41)–(42)**：Eq. (41) 用伪真值边界选择写入；Eq. (42) 用真实技能和真实低层潜动作构造教师记忆 token，warmup 后再换成预测值。

对应推理伪代码：

```python
memory = []
while not done:
    state = encode(rgb_views, proprioception, instruction)
    memory_ctx = attention(state, memory) if memory else zeros()
    adapted = state + read_gate(state, memory_ctx) * project(memory_ctx)
    skill, boundary = qwen_planner(adapted, memory_ctx)
    latent_chunk = executor(adapted, skill)
    action_chunk = action_decoder(latent_chunk, adapted)
    execute(action_chunk)
    if write_gate(adapted, skill, boundary) > eta:
        memory = append_and_compress(memory, make_token(adapted, skill, latent_chunk))
```

## 7. 实验部分精读

实验覆盖三个仿真 benchmark 和一个真实平台。LIBERO 含 Spatial、Object、Goal、Long 四套语言条件操作任务；LIBERO-PLUS 在相机、初始状态、语言、光照、背景、噪声、布局七类部署扰动下做零样本评估；RMBench 专门测试必须记住历史的 $M(1)$ 和 $M(n)$ 任务。LIBERO/PLUS 每任务 50 次 rollout，RMBench 每任务 100 次，指标都是 Success Rate（Section 4.1）。

**Backbone 与训练类型**：规划器为本地 Qwen3-VL-4B-Instruct；Figure 1 标出 Wan2.2-TI2V-5B；DPFlow 提供离线光流。它们不是商业 API。模型需要多阶段训练，不是只更新 memory/context/cache。

**Table 2（LIBERO）**每列分别是 Spatial、Object、Goal、Long 与平均 SR；HiMem-WAM 为 98.2/99.8/98.4/94.5，平均 97.7。`w/o Stage II` 平均 96.6，因此 Stage II 增益为 +1.1；它与 Fast-WAM 的 97.6 基本持平，只高 0.1。

**Table 3（LIBERO-PLUS）**比较七类扰动；HiMem-WAM 为 78.2/38.1/76.6/92.2/91.0/80.7/74.9，平均 76.0；`w/o Stage II` 为 72.2，增益 +3.8。最弱一列是 Init 38.1，明显低于 HoloBrain-0 的 58.2；最强证据是 Noise 从 73.2 提至 80.7，且整体超过 HoloBrain-0 的 75.3，但优势只有 0.7。

**Table 1（RMBench）**每行是具体记忆任务，每列是 DP、ACT、$\pi_{0.5}$、X-VLA 与 HiMem-WAM。HiMem-WAM 总平均 26.3，高于 X-VLA 9.8 和 $\pi_{0.5}$ 10.8；$M(1)$ 平均 31.6，$M(n)$ 仅 19.8。论文正文承认它仍低于专门记忆方法 MEM-0；但 MEM-0 未出现在 Table 1 数值列，无法由该表直接量化差距。

**真实实验**使用两台 AgileX Piper 6-DoF 机械臂、四台 RealSense D435i，相机含两腕、一头、一前。10 个任务各 400 条示范，SFT 5 epochs；每任务 20 次测试。Standard（ST）保持训练条件，Generalization（GE）引入物体位置、干扰物、布局/高度、光照和语言变化（Section 4.3、Appendix B）。Figure 3 汇总为 ST 69%→80%、GE 58%→66%；正文称 Hard 类相对 $\pi_{0.5}$ 提升 +25 ST、+20 GE。

**Table 4**比较动作表示与 Stage II：Hard 任务 Joint Position 从 15 提至 35，EE Pose 从 10 提至 30；Easy 已接近饱和。说明层次运动先验对长任务的帮助大于简单任务，也说明结果并非只靠某一种控制表示。

最强正面结果是 RMBench 相对通用 VLA/WAM 基线的大幅提升和真实 Hard 类增益。最需要警惕的是：没有 read/write gate、随机边界、固定间隔写入、不同记忆预算等核心消融；RMBench 总 SR 仍只有 26.3，$M(n)$ 只有 19.8；LIBERO 与 Fast-WAM 几乎持平；真实实验每任务 20 次且未报告置信区间。这些限制使“记忆门控机制本身”与“更强 backbone/三阶段训练”的因果归因不够干净。

## 8. 训练和推理成本分析

- **是否训练模型参数**：是。Stage I 训练 tokenizer；Stage II 训练技能发现、规划器/执行器；Stage III 训练动作落地和门控模块。不是 test-time adaptation。
- **是否只更新 memory/context/cache**：否。外部记忆只在运行时按门控更新；训练仍要做参数优化。
- **GPU**：论文明确承认计算量大，但没有报告 GPU 型号、数量、训练时长、batch size、学习率、潜变量维度、$K$、$H$、$N_{\max}$ 或总 GPU-hours，因此精确硬件需求**不确定**（Section 6、Appendix A）。
- **API**：不需要商业模型 API；公开实现使用本地 Qwen/Wan/DPFlow 体系。
- **主要成本**：DPFlow 全量离线抽取、多视角视频/潜动作学习、4B 规划器微调、5B 视频 backbone、三阶段数据和真实机器人 10×400 条示范。推理端不运行 DPFlow 或未来视频，主要是 Qwen 规划器、视频表示/动作头和连续记忆 attention。
- **最小复现**：一台 80GB GPU 可先做单任务、小分辨率、短 action chunk 的模块验证；完整数值复现很可能需要多卡。你现有 8×A100 80GB 在显存层面具备做论文级多卡实验的基础，但由于论文没给训练配方，是否能复现原数值仍**不确定**。

## 9. 这篇论文真正的贡献

作者声称三项贡献：层次潜动作；技能边界触发的门控记忆；跨 LIBERO、PLUS、RMBench 与真实机器人验证。实际站得住的贡献是把“运动表征—技能抽象—记忆事件”连接成一个端到端可训练的 WAM/VLA 系统，并明确把昂贵的光流与未来信息限制在离线监督，保持部署因果性（Figure 1、Table 5）。

更像工程组合的部分包括：VAE tokenizer、余弦边界、注意力池化、Qwen 多模态规划器、外部 attention memory、BCE 门控监督、teacher forcing 和三阶段课程学习。每项单独都不新，组合后的“用技能边界控制记忆写入”才是核心设计。

Reviewer 可能质疑：门控缺少针对性消融；边界质量没有 precision/recall 或可视化统计；超参数和算力披露不足；真实结果 trial 少；RMBench 绝对成功率低；与 MEM-0 的比较不在同一主表；公开代码/检查点是否覆盖完整训练流程需要另外核验。**评价**：这是一篇系统型机器人论文，最强价值是可操作的结构设计，而不是已充分证明的新学习定律。

## 10. 和相关论文的关系

- **RAG / memory agent**：RAG 检索文本/文档；HiMem-WAM 检索连续技能状态 token，写入触发由动作边界学习，不依赖语义向量数据库。
- **Test-time adaptation**：它运行时更新记忆内容但不更新模型参数，因此属于有状态推理，不是梯度型测试时适配。
- **Reinforcement learning**：论文使用监督学习、伪标签和重建损失，没有 reward、return 或 policy gradient；“world action model”不等于 RL world model。
- **World model**：它确实从未来视觉/光流监督中学习动作相关动力学表示，但部署时不做显式未来 rollout；更接近 representation-based WAM，而不是在线规划的视频生成器。
- **Agent planning**：Qwen 规划器输出连续技能潜变量，而不是自然语言子计划或搜索树；规划是策略内部的高层表示选择。
- **Self-evolving agent**：运行时记忆会随任务轨迹改变，但不会依据成功/失败长期积累跨 episode 的 Q 值；它不等同于 MemRL 那种运行时强化记忆。
- **MemoryVLA / MemER / CronusVLA**：这些方法聚合多帧或检索经验；HiMem-WAM 的区别是将记忆写入时机绑定到学习到的技能边界。
- **WorldVLA / LingBot-VA / MotuBrain / Fast-WAM**：它们强调视频—动作联合建模或高效因果执行；HiMem-WAM额外加入层次技能和显式外部记忆，但标准 LIBERO 上只与 Fast-WAM 基本持平。
- **MEM-0**：更专门针对记忆推理，使用更大的 8B planner；HiMem-WAM试图在统一 WAM 中同时保留运动先验和记忆，因此范围更广，但 $M(n)$ 仍弱。

## 11. 我应该怎么复现一个最小版本

最小环境选 LIBERO 的一个 Long 任务或 RMBench 的 `Observe and Pick Up`。模型先用较小视觉编码器替代完整 Wan2.2，用 1–4B VLM/Transformer 做 planner；如果要贴近论文，可从公开 HiMem-WAM checkpoint 开始，而不是从头训练 5B backbone。

需要存储的数据结构：`Episode{rgb[V,T], proprio[T], instruction, action[T]}`；离线 `LowLatent{episode_id,t,z_l}`；`SkillLabel{episode_id,t,z_h,boundary}`；运行时 `MemoryBank[{key,value,skill,timestep}]`；训练日志包含每项 loss 与门值。

```python
# Stage I
flow = dpflow(rgb[:, :-1], rgb[:, 1:])
tokenizer.fit(rgb, proprio, instruction, flow, optional_action)
z_low = tokenizer.encode_all(dataset)

# Stage II
skills, boundaries = discover_skills(z_low)
planner_executor.fit(rgb, proprio, instruction, z_low, skills, boundaries)

# Stage III
for episode in demonstrations:
    memory = []
    for t in episode:
        context = retrieve(memory, current_state(t))
        z_high, boundary = planner(current_state(t), context)
        z_chunk = executor(current_state(t), z_high)
        action = decoder(z_chunk, current_state(t))
        optimize(action, z_high, z_chunk, boundary)
        if warmup_truth_boundary(t) or write_gate(...) > eta:
            memory = update(memory, make_token(...))
```

必须记录：光流重建误差、动作对齐误差、边界率与平均段长、边界稳定性、planner/exec/action loss、读写门分布、每 episode 写入数、记忆命中 attention、SR、每步延迟和显存。最小实验表应比较：BC；BC+low latent；hierarchical w/o memory；fixed-interval memory；random-boundary memory；HiMem-WAM gate。列包括任务 SR、长任务 SR、写入数、延迟和参数量。

## 12. 如果我要基于它做新论文

以下五项是研究提案，不是原论文已经完成的内容。

### 方向 1：可学习的记忆预算与遗忘
Idea：不只在超预算时压缩，而是学习每个 token 的保留价值。相对原文的 append-and-compress，加入删除/合并策略。可能减少错误历史和注意力成本。实验比较固定 FIFO、聚类压缩和价值门；风险是删除监督难获得。

### 方向 2：边界不确定性感知写入
Idea：对技能边界做校准，只有高置信边界直接写，模糊边界保留短暂缓冲。可能降低错误写入的级联。实验需要边界人工标注、ECE、写入 precision/recall 与下游 SR；风险是额外标注成本。

### 方向 3：跨 episode 的成功/失败效用记忆
Idea：把 MemRL 的效用更新加到机器人连续 memory token 上，跨 episode 保留“这个状态—技能是否成功”。相对原文只在单次执行中更新状态，引入长期经验。实验需重复任务、环境漂移和安全回滚；风险是旧经验污染新场景。

### 方向 4：对象—接触图记忆
Idea：把连续 token 拆成对象、接触、已完成子任务图，以结构化记忆替代单向量。可能提升 $M(n)$ 多次尝试和组合任务。实验测对象状态准确率、接触事件和 RMBench $M(n)$；风险是感知误差与图维护复杂。

### 方向 5：世界模型一致性驱动的自纠错门
Idea：执行动作后比较预测潜运动与真实观测，若不一致则触发记忆写入和技能重规划。相对原文只按技能边界写，增加异常事件。实验需扰动恢复、失败检测和额外延迟；风险是世界模型误差导致频繁误报。

## 13. 阅读检查题与参考答案

### 题 1：为什么低层潜动作不能直接解决长任务记忆？
**答案**：低层潜动作表达局部运动，但不知道哪些运动组成同一技能，也不决定哪些历史状态应长期保留；因此还需要技能分段和外部记忆。

### 题 2：训练和推理分别需要哪些信号？
**答案**：Stage I 需要未来帧/光流，可选动作；Stage II/III 使用离线潜变量和边界监督；推理只需当前 RGB、本体状态、指令和记忆，不需要光流或未来帧。

### 题 3：Eq. (1) 的三个概率项分别对应什么？
**答案**：技能规划器、低层潜动作执行器和动作解码器，依次回答“做什么技能、怎样运动、如何变成机器人控制”。

### 题 4：边界分数为什么使用相邻 token 的余弦不相似度？
**答案**：相邻运动表示方向变化大时更可能进入新技能；归一化余弦差异减少幅值影响，并映射到 $[0,1]$ 便于阈值化。

### 题 5：读门和写门有什么不同？
**答案**：读门控制历史上下文注入当前状态的强度；写门控制是否把当前技能事件存入记忆，两者分别解决使用历史和控制记忆增长。

### 题 6：哪项结果最能支持 Stage II 的鲁棒性作用？
**答案**：LIBERO-PLUS 平均从 72.2 提到 76.0，增益 +3.8，高于标准 LIBERO 的 +1.1；Hard 真实任务在两种动作表示下都提高 20 个点。

### 题 7：为什么不能仅凭 RMBench 26.3 就断言门控优于所有记忆方法？
**答案**：主表未给 MEM-0 数值，且没有 fixed/random/read-only/write-only 消融；提升可能同时来自 backbone、潜动作和训练流程。

### 题 8：这篇论文是强化学习或 test-time adaptation 吗？
**答案**：都不是。它主要使用监督、重建和伪标签训练；运行时只更新外部记忆，不做 reward 驱动的梯度更新。

### 题 9：复现最缺失的材料是什么？
**答案**：完整超参数、可训练层范围、训练算力/时长、潜变量维度、chunk 长度、层次数、门阈值与记忆预算；这些决定数值复现但论文未充分报告。

### 题 10：最小实验怎样证明“边界门控”而非“有记忆就行”？
**答案**：在相同 backbone、数据、预算下比较无记忆、固定间隔、随机边界、oracle 边界和学习边界，并同时报告 SR、写入数、边界质量和延迟。
