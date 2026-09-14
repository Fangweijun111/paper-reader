> 公开仓库仅提供原创精读分析与来源链接；未转载本文全文、完整译文、PDF或原始图表。该决定表示尚未确认再发布许可，并非论文不能公开阅读。[官方原文](https://arxiv.org/abs/2607.06988v2)。

# 《WAM-TTT: Steering World-Action Models by Watching Human Play at Test Time》中文精读报告

> 论文：Yusen Feng 等，*WAM-TTT: Steering World-Action Models by Watching Human Play at Test Time*，arXiv:2607.06988v2，2026。
> 阅读约定：
> - “论文事实”表示可由正文、公式、表格或附录直接核对。
> - “评价”表示基于论文证据作出的审慎判断。
> - “这是推断”表示原文没有直接证明、但可由证据推导的分析。
> - 证据不足时明确写“不确定”。

**版本与身份**：论文共 28 页，v2 修订于 2026-07-10；作者单位包括北京大学、Galbot、中科院自动化所和清华大学。目前只确认 arXiv 预印本，未确认会议或期刊录用；也未从论文或作者页确认官方代码仓库。

## 1. 这篇论文一句话在做什么

用最直白的话说：用户到新场景后先亲自做几遍任务，机器人不去照抄人的手部轨迹，而是把人类第一视角视频通过一次轻量梯度更新写进 WAM 的快速权重；随后主 WAM 和动作专家保持冻结，这份新写入的视觉记忆通过共享的视频—动作动态引导机器人动作。

技术上，WAM-TTT 在 LDA 世界动作模型的视频分支加入 TTT residual。离线阶段使用 2,286 对人机 episode 学会“怎样从人类视频写入可供机器人读取的 Key/Value 记忆”；部署阶段只凭目标场景的无标注人类视频更新 fast weights $W$，再固定 $W_N$ 执行机器人任务（Figure 1–2、§3、Eqs. 1–9）。

> **导师解读**：这不是“机器人看一遍就自然学会”的零准备系统。真正的前提是先用成对的人机数据做元训练，提前造好一个可写入、可读取的适配接口；测试时的人类视频只是填充这个接口。

## 2. 背景从 0 讲起

机器人基础模型通常把能力固化在参数里。部署后遇到新物体、新场景或用户偏好的操作方式，常见选择是补采机器人示范、微调整个模型，或把人类视频直接塞进上下文。三种做法分别面临机器人数据昂贵、微调可能遗忘、视频上下文不断增长的问题（§1–2）。

从人类视频学习的困难并不主要是看不懂画面，而是 **embodiment gap（形态差异）**：人的手腕、手指和机器人夹爪没有统一动作坐标。手部姿态估计、MANO 拟合和 retargeting 看似能补动作标签，但单目遮挡与跨形态映射会累积误差。WAM-TTT 因此只学习视频中的视觉变化，不在人类侧制造机器人动作标签。

WAM 同时建模未来视觉和动作，理论上提供了一条间接通路：人类视频先修改视频动态表示，视频分支再通过 WAM 原有的联合注意力影响动作分支。论文研究的不是“怎样训练更大的 WAM”，而是“预训练 WAM 部署后如何被用户快速引导”。

> **导师解读**：作者避开了最脆弱的人到机器人动作重定向，把共享接口放在视觉动态上。人和机器人虽然动作不同，但“杯子被拿起、液体被倒出、物体到达目标位置”这些视觉变化可以共享。

## 3. 论文的问题定义

- **离线输入**：预训练 LDA WAM，以及阶段配对的人类第一视角视频和机器人观察—动作轨迹。
- **离线输出**：经过元训练的 WAM 参数 $\Theta_{\mathrm{WAM}}$、TTT 慢投影 $\theta_{K,V,Q,O}$ 和快速权重初始化 $W_{\mathrm{init}}$。
- **测试时输入**：目标场景中少量无标注、无动作的人类视频批次 $\mathcal B_h$。
- **测试时更新**：只更新视频侧 fast weights $W$；WAM、动作专家、慢投影与 $W_{\mathrm{init}}$ 均冻结（§3.3、Eqs. 7–8）。
- **执行输出**：在当前观察 $o_t$ 和目标 $g$ 条件下生成动作块 $a_{t:t+k}$（Eq. 9）。
- **environment**：三种真实机器人形态和九项双臂/灵巧操作任务。
- **reward / feedback**：训练不是强化学习；离线外层使用机器人视频与动作扩散目标，测试时使用人类视频预测与 KVM 重建损失。真实执行只用于评估 Progress。
- **记忆持续时间**：论文主协议是从 $W_{\mathrm{init}}$ 写入当前任务人类视频，再固定执行；没有证明多个任务长期连续写入和抗遗忘。

> **导师解读**：必须区分“部署时主 WAM 冻结”和“整篇论文不训练”。离线元训练会更新 WAM 和 VLM 接口；真正部署后仍有梯度，只是梯度被限制在 fast weights。

## 4. 方法总览

1. 用 LDA 作为同时预测视频与动作的 WAM 骨干。
2. 在每个视频专家 block 旁加入小型 TTT fast-weight residual，动作专家结构不变。
3. 把成对的人类和机器人 episode 按归一化进度 $\phi=t/T$ 对齐。
4. 用人类视频计算自监督视频预测损失和逐层 Key/Value 重建损失。
5. 从 $W_{\mathrm{init}}$ 出发，用内层 SGD 把当前人类视频写进 $W_N$。
6. 让机器人视觉 token 作为 Query，通过 $W_N$ 读取人类 Key/Value 记忆。
7. 在机器人侧计算标准 WAM 视频+动作外层损失，梯度穿过内层更新，教会慢参数怎样支持未来适配。
8. 部署到新场景时重置 fast weights，只看无标注人类视频并进行一次测试时更新。
9. 固定适配后的 $W_N$，再由 WAM 生成机器人动作块。

流程：预训练 WAM → 插入视频侧快速记忆 → 人机配对元训练 → 新场景人类演示 → 视频预测/KVM 写入 fast weights → 固定记忆 → 机器人 Query 读取 → 动作生成（Figure 2）。

> **导师解读**：内层回答“如何把这段人类视频记住”，外层回答“记住以后能否帮助机器人”。只有内层会得到一个会做视频重建的记忆；只有外层又没有内层，则无法在新任务到来时快速写入。

## 5. 核心机制精读

### 5.1 视频侧 TTT residual

原 LDA block 输出视频 token $\hat z^{(\ell+1)}$ 和动作 token $\hat x^{(\ell+1)}$。WAM-TTT 只给视频输出增加 $\Delta z_{\mathrm{TTT}}^{(\ell)}$，动作输出保持不变（Eq. 1）。输入是当前视频 Query 和 fast weights，输出是一项视频特征修正（Eq. 2）。

如果直接更新动作专家，目标场景中的少量人类视频可能覆盖原来的机器人动作先验；只改视频侧则把分布变化限制在更容易从无动作视频监督的模态中。去掉 TTT residual 就退化为冻结 LDA；Table 2 的 w/o TTT 在 Table Bussing 上从 100.0 降到 40.0，但在 Swap Place 只从 88.9 降到 74.1，说明收益随任务变化。

> **导师解读**：这一步像在主模型旁边加一个“可擦写批注层”。人类视频只能批注机器人应该怎样理解当前视觉动态，不能直接重写动作专家。

### 5.2 Key–Value fast-weight memory

人类 token 经 $\theta_K,\theta_V$ 得到 $K_h,V_h$，机器人视频 token 经 $\theta_Q$ 得到 $Q_r$。KVM loss 要求 $f_W(K_h)\approx V_h$（Eq. 3）；执行时把 $Q_r$ 输入同一 $f_W$，再由 $\theta_O$ 写回视频流（Eq. 2）。

输入是人类视频表示，输出是可以按机器人 Query 读取的参数化记忆。去掉 memory reconstruction 后，Table Bussing/Swap Place 从 100.0/88.9 变为 66.7/72.0（Table 2），说明视频预测本身不足以保证记忆具有合适的读取结构。

> **导师解读**：KVM 不是把完整视频缓存下来，而是训练一个 Key→Value 函数。它用固定大小的参数吸收演示，代价是容量有限，而且新演示可能覆盖旧映射。

### 5.3 人机元训练

每个训练样本先把 $W$ 重置为 $W_{\mathrm{init}}$，在人类视频上做内层更新；随后机器人 Query 使用 $W_N$，外层机器人 WAM loss 再穿过内层步骤更新慢参数（Eqs. 4–6、Algorithm 1）。

其作用是让模型事先学会一种更新规则：只要未来人类视频呈现相似视觉阶段，更新后的 fast weights 就能向机器人动作提供有用残差。去掉 meta-training 后，Table Bussing/Swap Place 为 9.0/0.0，说明普通自监督 TTT 不会自动跨越 human–robot gap。

> **导师解读**：测试时人类视频之所以能控制机器人，并不是 KVM 自己创造了跨形态对齐；真正的桥梁是外层机器人损失，它迫使慢投影把人类 Key/Value 和机器人 Query 组织到兼容空间。

### 5.4 测试时写入与执行

新任务到来时，系统只用目标场景人类视频计算 $\mathcal L_{\mathrm{vg}}+\lambda\sum_\ell\mathcal L_{\mathrm{KVM}}^{(\ell)}$，执行一次 inner SGD（主设置 $N=1$、学习率 0.01），然后固定 $W_N$ 执行整段机器人 rollout（Eqs. 7–9、Table B.1）。

这不是边执行边从失败学习，也没有 reward 或在线机器人探索。优点是部署适配轻、可缓存；缺点是错误或不相关的人类视频会在任务开始前一次性写进记忆。

> **导师解读**：论文标题中的 Test Time 指“机器人执行前看人类演示并更新”，不是“机器人一边做一边持续自我进化”。

## 6. 公式与算法逐行解释

**Eq. 1**：视频分支加 TTT 残差，动作分支保持原输出。$\ell$ 是 block 编号，$z$ 是视频 token，$x$ 是动作 token。

**Eq. 2**：$Q=\theta_Q(z)$ 形成机器人 Query；$f_W$ 用快速权重读取记忆；$\theta_O$ 把读取结果投回视频隐藏空间。

**Eq. 3**：对 batch $B$、人类 token 长度 $L_h$、头维 $d$ 做均方误差，训练 $f_W(K_h)$ 重建 $V_h$。

**Eqs. 4–5**：内层损失等于人类视频预测加 $\lambda$ 倍 KVM；$\eta$ 控制 fast-weight SGD 步长。

**Eq. 6**：外层使用机器人侧原始 WAM 多任务目标，同时包含视频和动作 diffusion/flow-matching target。

**Eqs. 7–8**：部署时对人类视频批次求平均，只更新 $W$，不需要人类动作和机器人监督。

**Eq. 9**：完成 TTT 后，固定的 $W_N$ 与冻结的 WAM、慢投影共同定义动作块分布。

**Appendix Eqs. A.1–A.4**：作者在线性特例下证明，KVM 最小二乘解近似 $W^*\propto\sum_i v_i k_i^\top$；机器人 Query 得到 $\sum_i(k_i^\top Q_r)v_i$，等价于不带 softmax 的线性注意力读取。该等式只在线性与各向同性近似下严格成立，实际使用的是非线性 MLP，故这是机制见证，不是完整理论保证。

Algorithm 1 伪代码：

~~~python
for human_video, robot_traj in paired_batch:
    human_video = phase_align(human_video, robot_traj)
    fast = clone(fast_init)

    for _ in range(inner_steps):
        video_loss = predict_human_video(human_video, fast)
        k, v = human_key_value(human_video)
        memory_loss = mse(fast(k), v)
        fast = differentiable_sgd(fast, video_loss + lam * memory_loss)

    robot_video, robot_action = wam(robot_traj.obs, fast_weights=fast)
    outer_loss = robot_video_loss(robot_video) + action_loss(robot_action)
    outer_loss.backward()  # 反向穿过 inner update
    slow_optimizer.step()
~~~

> **导师解读**：公式的核心不是九个独立技巧，而是一条闭环：人类 loss 写入 $W$，机器人 loss 决定这种写入是否对控制有价值，测试时再重放同一种写入过程。

## 7. 实验部分精读

### 7.1 数据、机器人与指标

论文使用 Unitree G1、Galbot gripper、Galbot sharpa 三种形态，覆盖 Transfer Bottle、Table Bussing、Deliver Drink、Swap Place、Pour Water、Stamp Paper、Flip Steak、Pyramid Stacking 和 Multi-step Steak 九任务。元训练数据有 2,286 对人机 episode：G1 600、gripper 544、sharpa 1,142（§4.1、Appendix B）。

Orig. 是采机器人数据的标准隔间；New 是光照、桌高、物体共同变化的家庭环境。每个 task×setting 评估 25 次。主指标 Progress 将任务拆为加权子目标，最终完成得 1.0，提前失败也可能得到部分分数（Appendix D）。因此 46.2% 不是二值成功率。

> **导师解读**：New 对冻结 LDA 是纯 OOD，但 WAM-TTT 会先看到该场景的人类演示；它衡量的是“有现场教学后的适配”，不是完全没有目标域信息的 zero-shot。

### 7.2 Table 1 主结果

New 平均 Progress：WAM-TTT 46.2、LDA 32.5、WAM-Cotrain 25.3、EgoScale 15.0、$\pi_{0.5}$ 14.8、WAM-ICL 7.1。WAM-TTT 相比同骨干 LDA +13.7，接收相同测试时人类视频但只做上下文条件的 WAM-ICL 低 39.1 点（Table 1）。

WAM-TTT 九任务中七项单独领先，Flip Steak 与其他方法并列；Stamp Paper 则只有 8.3，低于 LDA 的 33.3，暴露了目标位置与紧几何约束下的负迁移。

> **导师解读**：最有说服力的基线不是 $\pi_{0.5}$，而是 WAM-ICL，因为只有它拿到相同的人类视频。主表支持“写进 fast weights 比直接放进 context 更有效”，但不能单独证明 WAM-TTT 比所有无教学模型更公平。

### 7.3 Table 2 机制消融

Table Bussing 上，完整方法 100.0，WAM-LoRA 30.0，无 meta-training 9.0，无 KVM 66.7，无 TTT 40.0。Swap Place 上分别是 88.9、0、0、72.0、74.1。说明 meta-training 是必要条件，KVM 和 TTT 有任务相关增益，通用 LoRA 不能替代专门快速记忆。

该表每格只有 10 次 trial，且论文没有报告多 seed、置信区间或显著性检验。

> **导师解读**：消融证明的是整套训练接口有效，而不是每个模块都有同样强的独立贡献；Swap Place 中无 TTT 仍有 74.1，说明离线元训练本身已经带来不少能力。

### 7.4 数据比例、架构和伪动作

Table E.1 三任务平均：$(100r,0h)=59.5$，$(100r,100h)=74.1$，$(200r,0h)=73.7$，$(10r,190h)=51.4$。人类视频能替代一部分机器人采集，但无法替代动作 grounding。作者称 74.1 与 73.7 统计上不可区分，但未给检验或区间，应视为描述性接近。

Table E.2 在 Table Bussing 上：DiT-only 72，未预训练 VLM 80，冻结 VLM 54，可训练的预训练 VLM 100。这里的 VLM “open”发生在离线元训练，不代表部署时也更新。

Table E.3 把 MediaPipe+MANO+retargeting 伪动作加入 forward-dynamics loss 后，四任务平均从 72.3 降到 28.9。该负结果支持作者保持 human video action-free 的选择。

> **导师解读**：论文最有实践价值的结论之一是“错误动作监督比没有动作监督更糟”。视觉预测虽然信息较弱，却避免了跨形态伪动作的系统偏差。

## 8. 训练和推理成本分析

- **基础 WAM**：LDA，配置为 Qwen3-VL-4B-Instruct 加 DiT-L MMDiT action head。
- **元训练**：100k steps，8×NVIDIA H800，DeepSpeed ZeRO-2，per-device batch 16、global batch 128。
- **网络**：16 个 MMDiT blocks，hidden dim 1536，32 heads；TTT head dim 48，fast-weight hidden width 128。
- **内层更新**：meta-training $\eta=0.1$，test-time $\eta=0.01$，主设置 $N=1$。
- **数据**：2,286 对人机 episode，且需要三种真实机器人和家庭场景人类视频。
- **API**：论文路线是本地模型训练，不要求商业 LLM API。
- **主要成本**：不是测试时那一步 SGD，而是 LDA 底座、成对人机数据、100k-step 可微元训练和真实机器人评测。

你有 8×A100 80GB，显存规模上接近论文的 8 卡设置，但 H800 吞吐更高。**不确定**：没有官方代码、权重、训练时长和 I/O 统计时，无法可靠估算 A100 的 wall-clock 时间。最现实的路线是复用 LDA 权重，在一到两个仿真任务上验证 fast-weight 分支，而不是从头复现三种真机。

> **导师解读**：这不是“几段人类视频+一张卡就能复现”的轻量方法。测试时很轻，但轻量性的前提是已经完成昂贵元训练。

## 9. 这篇论文真正的贡献

作者声称三点：把人类视频引导表述为 TTT；提出 fast-weight memory 与人机对齐；展示无需人类动作标注和全模型部署期微调的有效引导。

实际最站得住的是：把长视频上下文压缩成可查询快速权重；用外层机器人 loss 学会人类 Key/Value 到机器人 Query 的接口；在三种真实形态九任务上证明这种接口比视频 ICL 更有效；用伪动作负结果说明 action-free 设计的必要性。

工程组合包括 LDA、Spatial-TTT-style residual、视频预测、KVM、可微内层 SGD 和 phase alignment。单项并非都新，贡献在于将它们闭合成“人类演示→参数化记忆→机器人动作”的部署接口。

Reviewer 可能质疑：主指标不是 SR；缺 seed/CI；New 场景提供现场人类视频；简单 $t/T$ phase alignment 可能错；远离元训练配对分布的边界没测；fast-weight 容量与多任务干扰没测；Stamp Paper 负迁移；无官方代码使复现困难。

> **导师解读**：论文证明了任务级 steering，不应升级成“持续自进化机器人”。其记忆是短期可写参数，尚未验证跨任务积累、冲突处理和旧技能保持。

## 10. 和相关论文的关系

- **RAG / memory agent**：RAG 检索外部条目；WAM-TTT 把视频压缩进神经网络 fast weights，不做显式检索。
- **test-time adaptation**：属于真正的参数型 TTT，只是参数范围被严格限制。
- **reinforcement learning**：没有 reward、value 或 policy gradient；测试时监督来自视频自身。
- **world model**：LDA 同时生成视频和动作，属于 WAM；适配只发生在视频分支，动作通过共享动态被间接引导。
- **agent planning**：没有 LLM Agent 分解、工具调用或搜索树；它直接生成动作块。
- **self-evolving agent**：不属于长期演化；没有连续任务流和跨 episode memory growth 实验。
- **WAM-ICL**：保留显式视频 token；WAM-TTT 将视频压进固定大小权重。
- **WAM-LoRA**：LoRA 是通用低秩参数适配；fast-weight memory 有专门 Key/Value 写入与 Query 读取结构。
- **EgoScale/EgoMimic**：依赖人类姿态或跨形态动作处理；WAM-TTT 刻意保持人类视频无动作。
- **HiMem-WAM**：后者记忆 episode 内任务状态；WAM-TTT 在执行前从人类示范写入任务记忆。
- **RISE**：RISE 用世界模型想象继续优化 policy；WAM-TTT 部署时不更新动作 policy。

> **导师解读**：它处在 WAM、human-video learning 和 TTT 的交叉点。理解它时最重要的分类标准是“更新什么”：不是文本 memory，不是完整 WAM，也不是动作 policy，而是视频侧 fast weights。

## 11. 我应该怎么复现一个最小版本

最小环境可以用 LIBERO/Pick-and-Place 仿真，两项任务、一个固定相机、一个小型 video-action transformer。先准备少量成对人机视频；如果没有真人数据，可用不同 embodiment 的仿真 avatar 代替人类，但这只能验证机制。

数据结构：

~~~text
Pair {task_id, phase, human_frames, robot_frames, robot_actions}
FastState {layer_id, W_init_hash, W_adapted, inner_loss, grad_norm}
Trial {task_id, scene_id, demo_ids, progress, success, latency}
Checkpoint {wam_hash, slow_projection_hash, meta_step, data_manifest_hash}
~~~

实验步骤：冻结/加载 WAM；加入 1–2 层 fast MLP；实现 K/V/Q/O 投影；做一次可微 inner update；外层预测机器人动作；测试时只更新 $W$。至少比较 Frozen、Video ICL、LoRA-TTT、w/o KVM、w/o meta-training 和完整方法。

日志记录：人机 phase mismatch、视频 loss、KVM loss、动作 loss、每层 residual norm、fast-weight norm、更新前后动作差异、TTT 时间、Progress、二值 SR、旧任务保持与多演示干扰。

> **导师解读**：最小复现的关键不是追求九项真机数字，而是证明三件事：人类视频确实写进了 $W$；机器人 Query 确实读到了这份信息；提升在相同视频、相同 WAM 和相同计算预算下优于 ICL/LoRA。

## 12. 如果我要基于它做新论文

以下五项均为研究提案，不是原论文已完成内容。

### 方向 1：事件驱动的人机阶段对齐

Idea：用接触事件、物体状态变化或可学习 DTW 替代 $t/T$。相对原文解决不同速度、停顿和重复动作造成的错配。实验需构造速度扰动、动作重排和错配比例曲线；风险是事件检测本身可能不准。

> **导师解读**：先修“写入地址”，再谈更强 memory；若人类 Key 与机器人 Query 从训练阶段就错位，后续 TTT 只会更快地写错。

### 方向 2：跨任务持续 fast-weight memory

Idea：允许多个任务依次写入同一记忆，并加入容量控制、路由、合并和回滚。验证连续任务曲线、旧技能保持和顺序 permutation；风险是快速权重干扰与灾难遗忘。

> **导师解读**：这能把任务级 steering 推进到真正 self-evolving，但也会暴露当前论文完全没有处理的长期稳定性问题。

### 方向 3：不确定性门控的选择性写入

Idea：根据视频质量、OOD 程度和梯度冲突选择帧、层与更新幅度。比较全写入、随机写入和置信门控；风险是过度保守导致适配不足。

> **导师解读**：当前方法默认用户视频都值得写入；现实中遮挡、失败示范和无关动作会把一次更新机会变成污染源。

### 方向 4：无动作但更物理的监督

Idea：在人类侧加入对象相对位姿、接触事件或稠密 object flow，而不是 MANO 伪动作。验证是否保留 action-free 鲁棒性又提高接触任务；风险是新监督可能再次引入检测噪声。

> **导师解读**：Table E.3 否定的是当前伪动作流水线，不是所有物理线索；研究空间在于找到比关节重定向更稳定的中间表征。

### 方向 5：等信息、等计算的因果对照

Idea：固定同一人类视频和总 FLOPs，比 ICL、fast-weight、LoRA、显式检索 memory 和直接 goal-video conditioning。报告 SR、Progress、延迟和内存。风险是严格对齐各方法预算较难。

> **导师解读**：主表最强差距来自 WAM-ICL，但仍需排除上下文长度、实现质量和计算预算不一致，才能把提升可靠归因于 fast-weight memory。

## 13. 阅读检查题与参考答案

### 题 1：WAM-TTT 为什么不直接模仿人类动作？
**答案**：人的手和机器人执行器动作空间不同，单目姿态估计与 retargeting 会产生系统噪声；论文 Table E.3 的伪动作方案使平均 Progress 从 72.3 降到 28.9。

### 题 2：fast weights 与 slow weights 有何区别？
**答案**：slow weights 在离线元训练中学习，部署时冻结；fast weights 从 $W_{init}$ 出发，在目标场景人类视频上做测试时梯度更新。

### 题 3：KVM loss 在计算什么？
**答案**：计算 $f_W(K_h)$ 与 $V_h$ 的均方误差，让 fast-weight 网络记住人类 Key 到 Value 的映射。

### 题 4：机器人 Query 为什么能读取人类记忆？
**答案**：外层机器人 WAM loss 反向穿过内层更新，训练 Q/K/V/O 投影和 $W_{init}$，使人类写入的映射对机器人 Query 有用。

### 题 5：部署时 WAM 是否完全不做梯度？
**答案**：主 WAM 不做梯度更新，但 fast weights 会做一次 inner SGD，因此它是真正的参数型 TTT。

### 题 6：WAM-TTT 是不是长期 self-evolving agent？
**答案**：不是。主实验是任务开始前写入一次 fast weights，再固定执行；没有跨任务持续积累与抗遗忘实验。

### 题 7：主表最公平的机制基线是谁？
**答案**：WAM-ICL，因为它接收同样的测试时人类视频，只是把视频作为显式上下文而不是写入 fast weights。

### 题 8：46.2% 是否表示 46.2% 的任务完全成功？
**答案**：不是。它是带部分里程碑得分的平均 Progress；论文主表没有单独报告二值 Success Rate。

### 题 9：元训练最脆弱的假设是什么？
**答案**：使用归一化时间 $t/T$ 对齐人机阶段，默认两段轨迹在相同比例位置语义相同；不同速度、停顿或步骤顺序会破坏该假设。

### 题 10：你有 8×A100 时最现实的复现目标是什么？
**答案**：复用 LDA 或更小 WAM，在少量仿真任务上复现可微 inner update、KVM 写入和 ICL/LoRA 对照；没有官方代码与数据时，不应承诺复刻三种真机和完整数值。

> **导师解读**：真正读懂这篇论文，应能同时说清三句话：它把人类视频写进参数化记忆；这种写入能力来自昂贵人机元训练；现有证据支持任务级引导，但尚不支持长期自进化。
