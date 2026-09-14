// Paper content and translation: CC-BY-4.0; see THIRD_PARTY_NOTICES.md.
import type { PaperSection } from "../../../lib/content";

export const vJepa2PaperSections: PaperSection[] = [
  {
    "id": "frontmatter",
    "number": "·",
    "titleEn": "Paper",
    "titleZh": "论文信息",
    "collapsedByDefault": false,
    "blocks": [
      {
        "id": "v-jepa-2-abstract-1",
        "sectionId": "frontmatter",
        "kind": "paragraph",
        "label": "Abstract",
        "english": "A major challenge for modern AI is to learn to understand the world and learn to act largely by observation (LeCun, 2022). This paper explores a self-supervised approach that combines internet-scale video data with a small amount of interaction data (robot trajectories), to develop models capable of understanding, predicting, and planning in the physical world. We first pre-train an action-free joint-embedding-predictive architecture, V-JEPA 2, on a video and image dataset comprising over 1 million hours of internet video. V-JEPA 2 achieves strong performance on motion understanding (77.3 top-1 accuracy on Something-Something v2) and state-of-the-art performance on human action anticipation (39.7 recall-at-5 on Epic-Kitchens-100) surpassing previous task-specific models. Additionally, after aligning V-JEPA 2 with a large language model, we demonstrate state-of-the-art performance on multiple video question-answering tasks at the 8 billion parameter scale (e.g., 84.0 on PerceptionTest, 76.9 on TempCompass). Finally, we show how self-supervised learning can be applied to robotic planning tasks by post-training a latent action-conditioned world model, V-JEPA 2-AC, using less than 62 hours of unlabeled robot videos from the Droid dataset. We deploy V-JEPA 2-AC zero-shot on Franka arms in two different labs and enable picking and placing of objects using planning with image goals. Notably, this is achieved without collecting any data from the robots in these environments, and without any task-specific training or reward. This work demonstrates how self-supervised learning from web-scale data and a small amount of robot interaction data can yield a world model capable of planning in the physical world.",
        "chinese": "现代 AI 面临的一项重大挑战，是主要通过观察学会理解世界并采取行动（LeCun, 2022）。本文探索一条自监督路线：将互联网规模视频与少量交互数据（机器人轨迹）结合，训练能够理解、预测并在物理世界中规划的模型。我们首先在视频与图像数据集上，预训练无需动作信息的联合嵌入预测架构 V-JEPA 2，其中视频总时长超过 100 万小时。V-JEPA 2 在运动理解上表现较强，在 Something-Something v2 上达到 77.3 的 top-1 准确率；在人类动作预判上达到当时最佳水平，在 Epic-Kitchens-100 上的 Recall@5 为 39.7，超过此前针对该任务设计的模型。此外，将 V-JEPA 2 与大语言模型对齐后，在 80 亿参数规模的多项视频问答任务上也取得最佳表现，例如 PerceptionTest 为 84.0、TempCompass 为 76.9。最后，我们使用 Droid 数据集中不足 62 小时的无标注机器人视频，对潜空间动作条件世界模型 V-JEPA 2-AC 进行后训练，展示自监督学习如何用于机器人规划。我们将 V-JEPA 2-AC 零样本部署到两个不同实验室的 Franka 机械臂上，通过目标图像规划完成物体抓取和放置。这一结果不需要从这些环境中的机器人采集任何数据，也不需要任务专用训练或奖励。该工作表明，互联网规模数据上的自监督学习结合少量机器人交互数据，能够得到可在物理世界中规划的世界模型。",
        "evidenceKeys": [
          "abstract-1"
        ]
      }
    ]
  },
  {
    "id": "1-introduction",
    "number": "1",
    "titleEn": "Introduction",
    "titleZh": "引言",
    "collapsedByDefault": false,
    "blocks": [
      {
        "id": "v-jepa-2-s1-p1-1",
        "sectionId": "1-introduction",
        "kind": "paragraph",
        "label": "1 Introduction",
        "english": "Humans have the ability to adapt and generalize when taking on new tasks and operating in unfamiliar environments. Several cognitive learning theories suggest that humans learn an internal model of the world by integrating low-level sensory inputs to represent and predict future states (Craik, 1967; Rao and Ballard, 1999), and they further posit that this world model shapes our perception at any given moment, playing a crucial role in informing our understanding of reality (Friston, 2010; Clark, 2013; Nortmann et al., 2015). Moreover, our ability to predict the effects of our actions on future states of the world is also essential for goal-oriented planning (Sutton and Barto, 1981, 1998; Ha and Schmidhuber, 2018; Wolpert and Ghahramani, 2000). Building artificial agents that learn a world model from sensory data, such as video, could enable them to understand the physical world, predict future states, and effectively — like humans — plan in new situations, resulting in systems capable of tackling tasks that have not been encountered before.",
        "chinese": "人类面对新任务、身处陌生环境时，能够适应并泛化。一些认知学习理论认为，人通过整合低层感官输入，学习世界的内部模型，以表示并预测未来状态（Craik, 1967; Rao and Ballard, 1999）；这些理论进一步提出，世界模型不断塑造我们的当下感知，是理解现实的重要基础（Friston, 2010; Clark, 2013; Nortmann et al., 2015）。同时，预测自身行动如何影响世界未来状态，也是目标导向规划不可缺少的能力（Sutton and Barto, 1981, 1998; Ha and Schmidhuber, 2018; Wolpert and Ghahramani, 2000）。如果人工智能体能从视频等感官数据中学习世界模型，就可能理解物理世界、预测未来状态，并像人一样在新情境中有效规划，从而处理此前未遇到过的任务。",
        "evidenceKeys": [
          "S1.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s1-f1",
        "sectionId": "1-introduction",
        "kind": "figure-caption",
        "label": "1 Introduction",
        "english": "Figure 1: V-JEPA 2 Overview. Leveraging 1M hours of internet-scale video and 1M images, we pretrain the V-JEPA 2 video model using a visual mask denoising objective (Bardes et al., 2024; Assran et al., 2023), and leverage this model for downstream tasks such as action classification, object recognition, action anticipation, and Video Question Answering by aligning the model with an LLM backbone. After pretraining, we can also freeze the video encoder and train a new action-conditioned predictor with a small amount of robot interaction data on top of the learned representations, and leverage this action-conditioned model, V-JEPA 2-AC, for downstream robot manipulation tasks using planning within a model predictive control loop.",
        "chinese": "图 1：V-JEPA 2 概览。我们利用 100 万小时的互联网规模视频和 100 万张图像，以视觉掩码去噪目标预训练 V-JEPA 2（Bardes et al., 2024; Assran et al., 2023）。随后将它用于动作分类、物体识别、动作预判等下游任务，并通过与大语言模型骨干对齐来完成视频问答。预训练后，还可以冻结视频编码器，用少量机器人交互数据，在学得表示之上训练新的动作条件预测器 V-JEPA 2-AC，再在模型预测控制循环中进行规划，完成下游机器人操作任务。",
        "evidenceKeys": [
          "S1.F1"
        ],
        "imageSrc": "/papers/v-jepa-2/x1.webp",
        "imageAlt": "1 简介"
      },
      {
        "id": "v-jepa-2-s1-p2-1",
        "sectionId": "1-introduction",
        "kind": "paragraph",
        "label": "1 Introduction",
        "english": "Previous works have explored the development of predictive world models from interaction data consisting of state-action sequences, often also relying on explicit reward feedback from the environment to infer goals (Sutton and Barto, 1981; Fragkiadaki et al., 2015; Ha and Schmidhuber, 2018; Hafner et al., 2019b; Hansen et al., 2022). However, the limited availability of real-world interaction data constrains the scalability of these methods. To address this limitation, more recent works have leveraged both internet-scale video and interaction data towards training action-conditioned video generation models for robot control, but only demonstrate limited results in robot execution using model-based control (Hu et al., 2023; Yang et al., 2024b; Bruce et al., 2024; Agarwal et al., 2025). In particular, this line of research often emphasizes the evaluation of the faithfulness of the predictions and visual quality instead of planning capabilities, perhaps due to the computational cost of planning by generating video.",
        "chinese": "以往工作探索了从状态—动作序列组成的交互数据中学习预测式世界模型，往往还依赖环境提供的显式奖励反馈来确定目标（Sutton and Barto, 1981; Fragkiadaki et al., 2015; Ha and Schmidhuber, 2018; Hafner et al., 2019b; Hansen et al., 2022）。但真实交互数据有限，制约了这类方法的扩展。近期研究为此结合互联网规模视频与交互数据，训练用于机器人控制的动作条件视频生成模型，不过使用基于模型的控制来实际执行机器人任务，已有结果仍较有限（Hu et al., 2023; Yang et al., 2024b; Bruce et al., 2024; Agarwal et al., 2025）。这条路线尤其重视预测是否忠实、视觉质量如何，对规划能力的评估相对较少，原因可能在于通过生成视频来规划计算昂贵。",
        "evidenceKeys": [
          "S1.p2.1"
        ]
      },
      {
        "id": "v-jepa-2-s1-p3-1",
        "sectionId": "1-introduction",
        "kind": "paragraph",
        "label": "1 Introduction",
        "english": "In this work, we build upon the self-supervised hypothesis as a means to learn world models that capture background knowledge of the world largely from observation. Specifically, we leverage the joint-embedding predictive architecture (JEPA) (LeCun, 2022), which learns by making predictions in a learned representation space. In contrast to approaches that focus on learning entirely from interaction data, self-supervised learning enables us to make use of internet-scale video — depicting sequences of states without direct observations of the actions — to learn to both represent video observations and learn a predictive model for world dynamics in this learned representation space. Furthermore, in contrast to approaches based on video generation, the JEPA approach focuses on learning representations for predictable aspects of a scene (e.g., the trajectory of an object in motion) while ignoring unpredictable details that generative objectives emphasize, since they make pixel-level predictions (e.g., the precise location of each blade of grass in a field, or each leaf on a tree). By scaling JEPA pretraining, we demonstrate that it yields video representations with state-of-the-art understanding and prediction capabilities, and that such representations can be leveraged as a basis for action-conditioned predictive models and enable zero-shot planning.",
        "chinese": "本文以自监督学习假说为出发点，希望主要通过观察学习世界的背景知识。具体采用联合嵌入预测架构（JEPA）（LeCun, 2022），在学得的表示空间中进行预测。不同于完全依赖交互数据的路线，自监督学习能够利用互联网规模视频：视频呈现了一系列状态，却不直接提供动作观测。模型据此既学习如何表示视频，也学习在这一表示空间中预测世界动态。与视频生成路线相比，JEPA 聚焦场景中可预测的部分，例如运动物体的轨迹，而忽略难以预测的细节；生成目标必须逐像素预测，因此也会强调田野中每片草叶、树上每片叶子的精确位置等细节。我们表明，扩大 JEPA 预训练规模，可以得到理解与预测能力达到最佳水平的视频表示；这些表示还能作为动作条件预测模型的基础，支持零样本规划。",
        "evidenceKeys": [
          "S1.p3.1"
        ]
      },
      {
        "id": "v-jepa-2-s1-p4-1",
        "sectionId": "1-introduction",
        "kind": "paragraph",
        "label": "1 Introduction",
        "english": "Our approach, V-JEPA 2, utilizes a stage-wise training procedure, beginning with action-free pre-training on internet-scale video, followed by post-training with a small amount of interaction data (see Figure˜1). In the first stage, we use a mask-denoising feature prediction objective (Assran et al., 2023; Bardes et al., 2024), where the model predicts masked segments of a video in a learned representation space. We train the V-JEPA 2 encoder with up to 1 billion parameters and with more than 1 million hours of video. Our experiments confirm that scaling self-supervised video pretraining enhances the encoder’s ability to achieve visual understanding, including broad motion and appearance recognition capabilities, through probe-based evaluations and by aligning the encoder with a language model for video question-answering (Krojer et al., 2024; Pătrăucean et al., 2023; Liu et al., 2024c; Cai et al., 2024; Shangguan et al., 2024).",
        "chinese": "V-JEPA 2 采用分阶段训练：先用互联网规模视频进行不依赖动作的预训练，再用少量交互数据后训练（图 1）。第一阶段采用掩码去噪式特征预测目标（Assran et al., 2023; Bardes et al., 2024），要求模型在学得的表示空间中预测被遮蔽的视频片段。我们将编码器扩展到最多 10 亿参数，训练视频超过 100 万小时。实验通过探针评估，以及与语言模型对齐后的视频问答评估，确认扩大自监督视频预训练规模能够增强视觉理解，包括广泛的运动和外观识别能力（Krojer et al., 2024; Pătrăucean et al., 2023; Liu et al., 2024c; Cai et al., 2024; Shangguan et al., 2024）。",
        "evidenceKeys": [
          "S1.p4.1"
        ]
      },
      {
        "id": "v-jepa-2-s1-p5-1",
        "sectionId": "1-introduction",
        "kind": "paragraph",
        "label": "1 Introduction",
        "english": "Following pretraining on internet-scale video, we train an action-conditioned world model, V-JEPA 2-AC, on a small set of interaction data using the representations learned in the first stage. Our action-conditioned world model is a 300M-parameter transformer network employing a block-causal attention mechanism, which autoregressively predicts the representation of the next video frame conditioned on an action and previous states. With as little as 62 hours of unlabeled interaction data from the Droid dataset (Khazatsky et al., 2024), we demonstrate the feasibility of training a latent world model that, given sub-goals, can be leveraged to plan actions on a Franka robot arm and perform prehensile manipulation tasks from a monocular RGB camera zero-shot in a new environment.",
        "chinese": "完成互联网视频预训练后，我们利用第一阶段的表示，在少量交互数据上训练动作条件世界模型 V-JEPA 2-AC。它是一个 300M 参数的 Transformer，采用块因果注意力，根据动作和此前状态，自回归预测下一视频帧的表示。仅用 Droid 数据集（Khazatsky et al., 2024）的 62 小时无标注交互数据，我们就展示了这种潜空间世界模型的可行性：给定子目标后，它能为 Franka 机械臂规划动作，仅凭单目 RGB 相机，在新环境中零样本完成以抓持为基础的操作任务。",
        "evidenceKeys": [
          "S1.p5.1"
        ]
      },
      {
        "id": "v-jepa-2-s1-p6-1",
        "sectionId": "1-introduction",
        "kind": "paragraph",
        "label": "1 Introduction",
        "english": "To summarize, we show that joint-embedding predictive architectures learning from videos can be used to build a world model that enables understanding the physical world, predicting future states, and effectively planning in new situations; this is achieved by leveraging internet-scale video and a small amount of interaction data. Specifically:",
        "chinese": "我们表明，借助互联网规模视频和少量交互数据，从视频学习的联合嵌入预测架构可以构建世界模型，支持理解物理世界、预测未来状态，并在新情境中有效规划。具体结果如下：",
        "evidenceKeys": [
          "S1.p6.1"
        ]
      },
      {
        "id": "v-jepa-2-s1-i1-i1-p1-1",
        "sectionId": "1-introduction",
        "kind": "paragraph",
        "label": "1 Introduction",
        "english": "Understanding — Probe-based Classification: Scaling self-supervised video pretraining results in video representations applicable to many tasks. V-JEPA 2 excels at encoding fine-grained motion information, achieving strong performance on tasks requiring motion understanding, such as Something-Something v2, with $77.3$ top-1 accuracy using an attentive probe.",
        "chinese": "理解——探针分类。扩大自监督视频预训练规模，能得到适用于多种任务的视频表示。V-JEPA 2 尤其善于编码细粒度运动信息，在需要运动理解的任务上表现较强，例如仅使用注意力探针，就在 Something-Something v2 上达到 $77.3$ 的 top-1 准确率。",
        "evidenceKeys": [
          "S1.I1.i1.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s1-i1-i2-p1-5",
        "sectionId": "1-introduction",
        "kind": "paragraph",
        "label": "1 Introduction",
        "english": "Understanding — Video Question-Answering: V-JEPA 2 encoder can be used to train a multi-modal large language model, to tackle video-question answering tasks. We observe state-of-the-art performance on 8B language model class on multiple benchmarks that require physical world understanding and temporal reasoning, such as MVP ($44.5$ paired accuracy), PerceptionTest ($84.0$ test set accuracy), TempCompass ($76.9$ multi-choice accuracy), TemporalBench ($36.7$ multi-binary short-QA accuracy) and TOMATO ($40.3$ accuracy). In particular, we show that a video encoder pre-trained without language supervision can be aligned with a language model and achieve state-of-the-art performance, contrary to conventional wisdom (Yuan et al., 2025; Wang et al., 2024b).",
        "chinese": "理解——视频问答。V-JEPA 2 编码器可用于训练多模态大语言模型，处理视频问答。在需要物理世界理解和时间推理的多项基准上，它在 8B 语言模型规模中达到最佳表现：MVP 配对准确率 $44.5$、PerceptionTest 测试准确率 $84.0$、TempCompass 多选准确率 $76.9$、TemporalBench 多二元短问答准确率 $36.7$，以及 TOMATO 准确率 $40.3$。尤其是，我们证明了即使视频编码器预训练时完全没有语言监督，也能与语言模型对齐并达到最佳表现，这与以往常见观点不同（Yuan et al., 2025; Wang et al., 2024b）。",
        "evidenceKeys": [
          "S1.I1.i2.p1.5"
        ]
      },
      {
        "id": "v-jepa-2-s1-i1-i3-p1-2",
        "sectionId": "1-introduction",
        "kind": "paragraph",
        "label": "1 Introduction",
        "english": "Prediction: Large-scale self-supervised video pretraining enhances prediction capabilities. V-JEPA 2 achieves state-of-the-art performance on the Epic-Kitchens-100 human-action anticipation task using an attentive probe, with $39.7$ recall-at-5, which is a $44$% relative improvement over the previous best model.",
        "chinese": "预测。大规模自监督视频预训练增强了预测能力。V-JEPA 2 使用注意力探针，在 Epic-Kitchens-100 人类动作预判任务上取得最佳表现：Recall@5 为 $39.7$，相比此前最佳模型相对提升 $44$%。",
        "evidenceKeys": [
          "S1.I1.i3.p1.2"
        ]
      },
      {
        "id": "v-jepa-2-s1-i1-i4-p1-1",
        "sectionId": "1-introduction",
        "kind": "paragraph",
        "label": "1 Introduction",
        "english": "Planning: We demonstrate that V-JEPA 2-AC, obtained by post-training V-JEPA 2 with only $62$ hours of unlabeled robot manipulation data from the popular Droid dataset, can be deployed in new environments to solve prehensile manipulation tasks using planning with given subgoals. Without training on any additional data from robots in our labs, and without any task-specific training or reward, the model successfully handles prehensile manipulation tasks, such as Grasp and Pick-and-Place with novel objects and in new environments.",
        "chinese": "规划。仅用常用 Droid 数据集中的 $62$ 小时无标注机器人操作数据对 V-JEPA 2 后训练，得到的 V-JEPA 2-AC 就能部署到新环境，依据给定子目标进行规划，完成以抓持为基础的操作。它无需使用我们实验室机器人产生的额外数据训练，也无需任务专用训练或奖励，就能在新环境中对新物体完成抓取、拾取放置等任务。",
        "evidenceKeys": [
          "S1.I1.i4.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s1-p7-1",
        "sectionId": "1-introduction",
        "kind": "paragraph",
        "label": "1 Introduction",
        "english": "The remainder of this paper is organized as follows. Section˜2 describes the V-JEPA 2 pretraining procedure, including the key ingredients enabling scaling beyond the original V-JEPA recipe of Bardes et al. (2024). Section˜3 then introduces our approach to training a task-agnostic action-conditioned world model, V-JEPA 2-AC, leveraging the pretrained V-JEPA 2 model. Section˜4 demonstrates using V-JEPA 2-AC for robot control via model-based planning. Because V-JEPA 2-AC models world dynamics in a learned representation space, its capabilities fundamentally depend on the information captured in the V-JEPA 2 representation space, and so we further explore the performance of V-JEPA 2 for video understanding in Section˜5 and prediction tasks in Section˜6. Finally, in Section˜7 we show that V-JEPA 2 can be aligned with a language model for video question answering. Section˜8 discusses related work, and we conclude in Section˜9.",
        "chinese": "下文安排如下。第 2 节介绍 V-JEPA 2 的预训练流程，以及如何在 Bardes et al.（2024）的原始 V-JEPA 方案上继续扩大规模。第 3 节说明如何利用预训练 V-JEPA 2，训练不针对特定任务的动作条件世界模型 V-JEPA 2-AC。第 4 节展示它如何通过基于模型的规划控制机器人。由于 V-JEPA 2-AC 在学得的表示空间中建模世界动态，其能力根本上取决于 V-JEPA 2 表示包含的信息，因此第 5 节进一步考察视频理解，第 6 节考察预测。第 7 节展示如何与语言模型对齐完成视频问答，第 8 节讨论相关工作，第 9 节作结。",
        "evidenceKeys": [
          "S1.p7.1"
        ]
      },
      {
        "id": "v-jepa-2-s1-f2-panel-1",
        "sectionId": "1-introduction",
        "kind": "figure-caption",
        "label": "1 Introduction",
        "english": "Figure 2: Multistage training. (Left) We first pretrain the V-JEPA 2 video encoder on internet-scale image and video data using a visual mask denoising objective (Bardes et al., 2024; Assran et al., 2023). A video clip is patchified into a sequence of tokens and a mask is applied by dropping a subset of the tokens. The encoder then processes the masked video sequence and outputs an embedding vector for each input token. Next, the outputs of the encoder are concatenated with a set of learnable mask tokens that specify the position of the masked patches, and subsequently processed by the predictor. The outputs of the predictor are then regressed to the prediction targets using an L1 loss. The prediction targets are computed by an ema-encoder, the weights of which are defined as an exponential moving average of the encoder weights. (Right) After pretraining, we freeze the video encoder and learn a new action-conditioned predictor, V-JEPA 2-AC, on top of the learned representation. We leverage an autoregressive feature prediction objective that involves predicting the representations of future video frames conditioned on past video frames, actions, and end-effector states. Our action-conditioned predictor uses a block-causal attention pattern such that each patch feature at a given time step can attend to the patch features, actions, and end-effector states from current and previous time steps. (Panel 1/2)",
        "chinese": "图 2：多阶段训练。左侧：先以视觉掩码去噪目标，在互联网规模图像和视频上预训练视频编码器（Bardes et al., 2024; Assran et al., 2023）。视频切分成图像块并转换为 token 序列，再丢弃其中一部分 token 形成掩码。编码器处理遮蔽后的序列，为每个输入 token 输出嵌入向量。随后，将这些输出与一组可学习的掩码 token 拼接，后者标明被遮蔽块的位置，再送入预测器。用 L1 损失使预测器输出拟合预测目标；目标由 EMA 编码器计算，其权重是主编码器权重的指数移动平均。右侧：预训练后冻结视频编码器，在已有表示之上学习新的动作条件预测器 V-JEPA 2-AC。训练采用自回归特征预测，根据历史视频帧、动作和末端执行器状态预测未来帧表示。预测器采用块因果注意力，使某时间步的每个图像块特征能够关注当前及此前时间步的图像块特征、动作和末端执行器状态。（分图 1/2）",
        "evidenceKeys": [
          "S1.F2-panel-1"
        ],
        "imageSrc": "/papers/v-jepa-2/x2.webp",
        "imageAlt": "1 简介"
      },
      {
        "id": "v-jepa-2-s1-f2-panel-2",
        "sectionId": "1-introduction",
        "kind": "figure-caption",
        "label": "1 Introduction",
        "english": "Figure 2: Multistage training. (Left) We first pretrain the V-JEPA 2 video encoder on internet-scale image and video data using a visual mask denoising objective (Bardes et al., 2024; Assran et al., 2023). A video clip is patchified into a sequence of tokens and a mask is applied by dropping a subset of the tokens. The encoder then processes the masked video sequence and outputs an embedding vector for each input token. Next, the outputs of the encoder are concatenated with a set of learnable mask tokens that specify the position of the masked patches, and subsequently processed by the predictor. The outputs of the predictor are then regressed to the prediction targets using an L1 loss. The prediction targets are computed by an ema-encoder, the weights of which are defined as an exponential moving average of the encoder weights. (Right) After pretraining, we freeze the video encoder and learn a new action-conditioned predictor, V-JEPA 2-AC, on top of the learned representation. We leverage an autoregressive feature prediction objective that involves predicting the representations of future video frames conditioned on past video frames, actions, and end-effector states. Our action-conditioned predictor uses a block-causal attention pattern such that each patch feature at a given time step can attend to the patch features, actions, and end-effector states from current and previous time steps. (Panel 2/2)",
        "chinese": "图 2：多阶段训练。左侧：先以视觉掩码去噪目标，在互联网规模图像和视频上预训练视频编码器（Bardes et al., 2024; Assran et al., 2023）。视频切分成图像块并转换为 token 序列，再丢弃其中一部分 token 形成掩码。编码器处理遮蔽后的序列，为每个输入 token 输出嵌入向量。随后，将这些输出与一组可学习的掩码 token 拼接，后者标明被遮蔽块的位置，再送入预测器。用 L1 损失使预测器输出拟合预测目标；目标由 EMA 编码器计算，其权重是主编码器权重的指数移动平均。右侧：预训练后冻结视频编码器，在已有表示之上学习新的动作条件预测器 V-JEPA 2-AC。训练采用自回归特征预测，根据历史视频帧、动作和末端执行器状态预测未来帧表示。预测器采用块因果注意力，使某时间步的每个图像块特征能够关注当前及此前时间步的图像块特征、动作和末端执行器状态。（分图 2/2）",
        "evidenceKeys": [
          "S1.F2-panel-2"
        ],
        "imageSrc": "/papers/v-jepa-2/x3.webp",
        "imageAlt": "1 简介"
      }
    ]
  },
  {
    "id": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
    "number": "2",
    "titleEn": "V-JEPA 2: Scaling Self-Supervised Video Pretraining",
    "titleZh": "V-JEPA 2：扩大自监督视频预训练规模",
    "collapsedByDefault": false,
    "blocks": [
      {
        "id": "v-jepa-2-s2-p1-1",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "paragraph",
        "label": "2 V-JEPA 2: Scaling Self-Supervised Video Pretraining",
        "english": "We pretrain V-JEPA 2 on a visual dataset that includes over 1 million hours of video. The self-supervised training task is based on mask denoising in representation space and builds upon the V-JEPA framework (Bardes et al., 2024). In this paper, we extend the V-JEPA framework by exploring larger-scale models, increasing the size of the pretraining data, and introducing a spatial and temporal progressive resolution training strategy that enables us to efficiently pretrain models beyond short 16-frame video clips.",
        "chinese": "我们在包含超过 100 万小时视频的视觉数据集上预训练 V-JEPA 2。自监督任务沿用 V-JEPA 框架（Bardes et al., 2024），在表示空间中进行掩码去噪。本文进一步扩大模型与预训练数据规模，并引入逐步提高空间、时间分辨率的训练策略，使预训练能够高效突破短短 16 帧的视频片段。",
        "evidenceKeys": [
          "S2.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s2-ss1-sss0-px1-p1-4",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "paragraph",
        "label": "Mask-Denoising in Representation Space.",
        "english": "The V-JEPA objective aims to predict the learned representation of a video $y$ from a view $x$ of that video that has been masked, i.e., from which patches have been randomly dropped (Figure˜2, left). The task meta-architecture consists of an encoder, $E_{\\theta}(\\cdot)$, which extracts video representations, and a predictor, $P_{\\phi}(\\cdot)$, which predicts the representation of masked video parts. The encoder and predictor are trained simultaneously using the objective,",
        "chinese": "V-JEPA 的目标，是根据视频 $y$ 被遮蔽后的视图 $x$，预测该视频的学得表示；遮蔽通过随机丢弃图像块实现（图 2 左）。整体架构包含提取视频表示的编码器 $E_{\\theta}(\\cdot)$，以及预测被遮蔽部分表示的预测器 $P_{\\phi}(\\cdot)$。两者共同优化以下目标：",
        "evidenceKeys": [
          "S2.SS1.SSS0.Px1.p1.4"
        ]
      },
      {
        "id": "v-jepa-2-s2-e1",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "equation",
        "label": "Mask-Denoising in Representation Space.",
        "english": "$$\n\\text{minimize}_{\\theta,\\phi,\\Delta_{y}}\\quad\\lVert P_{\\phi}(\\Delta_{y},E_{\\theta}(x))-\\text{sg}(E_{\\overline{\\theta}}(y))\\rVert_{1},\n$$\n\n (1)",
        "chinese": "公式（符号保持不变）：\n\n$$\n\\text{minimize}_{\\theta,\\phi,\\Delta_{y}}\\quad\\lVert P_{\\phi}(\\Delta_{y},E_{\\theta}(x))-\\text{sg}(E_{\\overline{\\theta}}(y))\\rVert_{1},\n$$\n\n (1)",
        "evidenceKeys": [
          "S2.E1"
        ]
      },
      {
        "id": "v-jepa-2-s2-ss1-sss0-px1-p1-8",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "paragraph",
        "label": "Mask-Denoising in Representation Space.",
        "english": "where $\\Delta_{y}$ is a learnable mask token that indicates the locations of the dropped patches. The loss uses a stop-gradient operation, $\\text{sg}(\\cdot)$, and an exponential moving average, $\\overline{\\theta}$, of the weights $\\theta$ of the encoder network to prevent representation collapse. The loss is applied only to the predictions of the masked patches.",
        "chinese": "其中，$\\Delta_{y}$ 是可学习的掩码 token，标明被丢弃图像块的位置。为防止表示坍塌，损失采用停止梯度操作 $\\text{sg}(\\cdot)$，并以编码器参数 $\\theta$ 的指数移动平均 $\\overline{\\theta}$ 计算目标。损失只作用于被遮蔽块的预测。",
        "evidenceKeys": [
          "S2.SS1.SSS0.Px1.p1.8"
        ]
      },
      {
        "id": "v-jepa-2-s2-ss1-sss0-px2-p1-4",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "paragraph",
        "label": "Architecture.",
        "english": "The encoder, $E_{\\theta}(\\cdot)$, and predictor, $P_{\\phi}(\\cdot)$, are each parameterized as a vision transformer (Dosovitskiy et al., 2020) (or ViT). To encode relative position information in the vision transformer, we leverage RoPE (Rotary Position Embedding) instead of the absolute sincos position embedding used in Bardes et al. (2024). We use a 3D extension of traditional 1D-RoPE (Su et al., 2024) by partitioning the feature dimension into three approximately equal segments (for the temporal, height, and width axes) and applying the 1D rotations separately to the segment for each axis. We found that using 3D-RoPE instead of absolute sincos position embeddings (Vaswani et al., 2017) helps stabilize training for the largest models. To process a video with our transformer encoder, we first patchify it as a sequence of tubelets of size $2\\times 16\\times 16$ ($T\\times H\\times W$) and employ the same multiblock masking strategy as in Bardes et al. (2024).",
        "chinese": "编码器 $E_{\\theta}(\\cdot)$ 和预测器 $P_{\\phi}(\\cdot)$ 均采用视觉 Transformer（ViT）（Dosovitskiy et al., 2020）。位置编码使用旋转位置嵌入 RoPE，替代 Bardes et al.（2024）的绝对正弦余弦位置嵌入，以编码相对位置。具体将传统一维 RoPE（Su et al., 2024）扩展到三维：把特征维度近似均分为三段，分别对应时间、高度和宽度，对各段独立施加一维旋转。我们发现，相比绝对正弦余弦位置嵌入（Vaswani et al., 2017），三维 RoPE 有助于稳定最大模型的训练。视频输入先切成大小为 $2\\times 16\\times 16$（$T\\times H\\times W$）的时空小块序列，再采用与 Bardes et al.（2024）相同的多块遮蔽策略。",
        "evidenceKeys": [
          "S2.SS1.SSS0.Px2.p1.4"
        ]
      },
      {
        "id": "v-jepa-2-s2-ss1-sss0-px3-p1-1",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "paragraph",
        "label": "Key Scaling Ingredients.",
        "english": "In this section we introduce and study four additional key ingredients which enable scaling the V-JEPA pre-training principle to obtain our V-JEPA 2 model.",
        "chinese": "本节介绍并研究四项额外的关键设计，以扩大 V-JEPA 预训练规模，得到 V-JEPA 2。",
        "evidenceKeys": [
          "S2.SS1.SSS0.Px3.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s2-i1-i1-p1-1",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "paragraph",
        "label": "Key Scaling Ingredients.",
        "english": "Data scaling: We increase the dataset size from 2 million to 22 million videos by leveraging and curating additional data sources.",
        "chinese": "扩大数据规模：引入并筛选更多数据来源，将视频数量从 200 万增加到 2200 万。",
        "evidenceKeys": [
          "S2.I1.i1.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s2-i1-i2-p1-1",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "paragraph",
        "label": "Key Scaling Ingredients.",
        "english": "Model scaling: We scale the encoder architecture from 300 million to over 1 billion parameters, going from a ViT-L to a ViT-g (Zhai et al., 2022).",
        "chinese": "扩大模型规模：将编码器从 ViT-L 扩展到 ViT-g（Zhai et al., 2022），参数量从 3 亿增加到超过 10 亿。",
        "evidenceKeys": [
          "S2.I1.i2.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s2-i1-i3-p1-1",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "paragraph",
        "label": "Key Scaling Ingredients.",
        "english": "Longer training: Adopting a warmup-constant-decay learning rate schedule simplifies hyperparameter tuning and enables us to extend training from 90 thousand up to 252 thousand iterations, effectively leveraging the additional data.",
        "chinese": "延长训练：采用“预热—恒定—衰减”学习率调度，简化超参数调整，并将训练从 9 万次延长到最多 25.2 万次迭代，充分利用新增数据。",
        "evidenceKeys": [
          "S2.I1.i3.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s2-i1-i4-p1-1",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "paragraph",
        "label": "Key Scaling Ingredients.",
        "english": "Higher resolution: We leverage the warmup-constant-decay schedule to efficiently scale to higher resolution video and longer video clips by training on shorter, lower-resolution clips during the warmup and constant phases, and then increasing resolution and/or clip-length during the final decay phase.",
        "chinese": "提高分辨率：借助“预热—恒定—衰减”调度，在预热和恒定阶段使用较短、分辨率较低的视频，仅在最后的衰减阶段提高空间分辨率和/或片段长度，从而高效训练更长、更清晰的视频。",
        "evidenceKeys": [
          "S2.I1.i4.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s2-ss1-sss0-px3-p1-2",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "paragraph",
        "label": "Key Scaling Ingredients.",
        "english": "The remainder of this section describes each of these ingredients in further detail and also quantifies the impact of each ingredient using the evaluation protocol described next.",
        "chinese": "下文逐项说明这些设计，并用接下来介绍的评估方案量化各自影响。",
        "evidenceKeys": [
          "S2.SS1.SSS0.Px3.p1.2"
        ]
      },
      {
        "id": "v-jepa-2-s2-f3",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "figure-caption",
        "label": "Key Scaling Ingredients.",
        "english": "Figure 3: Scaling Ingredients. The effects of scaling interventions on average accuracy across 6 image and video classification tasks (SSv2, Diving-48, Jester, Kinetics, COIN, ImageNet) using a ViT-L/16 model as baseline.",
        "chinese": "图 3：扩大规模的关键因素。以 ViT-L/16 为基线，展示各项扩展措施对六个图像与视频分类任务（SSv2、Diving-48、Jester、Kinetics、COIN、ImageNet）平均准确率的影响。",
        "evidenceKeys": [
          "S2.F3"
        ],
        "imageSrc": "/papers/v-jepa-2/x4.webp",
        "imageAlt": "关键的扩展因素。"
      },
      {
        "id": "v-jepa-2-s2-ss1-sss0-px4-p1-1",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "paragraph",
        "label": "Evaluation Protocol.",
        "english": "Our goal with model pretraining is to infuse general visual understanding into our encoder. We therefore evaluate our model and data design choices by assessing the quality of the model’s learned representation on a set of six motion and appearance classification tasks: Something-Something v2 (Goyal et al., 2017), Diving-48 (Li et al., 2018), Jester (Materzynska et al., 2019), Kinetics (Kay et al., 2017), COIN (Tang et al., 2019), and ImageNet (Deng et al., 2009). We use a frozen evaluation protocol: we freeze the encoder weights and train a task-specific 4-layers attentive probe on its representation to output a predicted class. In this section, we focus mainly on the average accuracy across the six understanding tasks. Refer to Section˜5 for additional details about the tasks, evaluation protocol, and results.",
        "chinese": "预训练旨在让编码器获得通用视觉理解能力。因此，我们用六项运动和外观分类任务评估表示质量，检验模型与数据设计：Something-Something v2（Goyal et al., 2017）、Diving-48（Li et al., 2018）、Jester（Materzynska et al., 2019）、Kinetics（Kay et al., 2017）、COIN（Tang et al., 2019）及 ImageNet（Deng et al., 2009）。评估时冻结编码器，仅在其表示上训练特定任务的四层注意力探针，输出类别预测。本节主要关注六项任务的平均准确率。任务、评估流程和详细结果见第 5 节。",
        "evidenceKeys": [
          "S2.SS1.SSS0.Px4.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s2-ss2-p1-2",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "paragraph",
        "label": "2.2 Scaling Self-Supervised Video Learning",
        "english": "We first present a summary of the key findings of our scaling analysis, where we investigate the impact of the four key ingredients on downstream task average performance. Figure˜3 illustrates the effects of these scaling interventions on average accuracy across 6 classification tasks, using a ViT-L/16 model pretrained on 2 million videos with the V-JEPA objective as our baseline. Increasing the dataset from 2 million to 22 million videos (VM22M) yields a 1.0-point improvement. Scaling the model from 300 million to 1 billion parameters (ViT-g/16) provides an additional 1.5-point gain. Extending training from 90K to 252K iterations contributes another 0.8-point improvement. Finally, enhancing both spatial resolution ($256\\rightarrow 384$) and temporal duration ($16\\rightarrow 64$ frames), during both pretraining and evaluation, boosts performance to 88.2%, representing a cumulative 4.0-point improvement over the ViT-L/16 baseline. Each individual change provides a positive impact, confirming the potential of scaling in video self-supervised learning (SSL).",
        "chinese": "先概括规模分析的主要发现：我们考察四项关键设计对下游平均表现的影响。图 3 以在 200 万视频上采用 V-JEPA 目标预训练的 ViT-L/16 为基线，展示六项分类任务的平均准确率变化。数据扩展至 2200 万视频（VM22M）后，提高 1.0 个百分点；模型从 3 亿扩展至 10 亿参数（ViT-g/16），再提高 1.5 个百分点；训练从 90K 延长到 252K 次迭代，又提高 0.8 个百分点。最后，在预训练和评估中同时提高空间分辨率（$256\\rightarrow 384$）及片段长度（$16\\rightarrow 64$ 帧），表现达到 88.2%，相对 ViT-L/16 累计提高 4.0 个百分点。每项变化都有正向作用，表明视频自监督学习（SSL）具有规模扩展潜力。",
        "evidenceKeys": [
          "S2.SS2.p1.2"
        ]
      },
      {
        "id": "v-jepa-2-s2-ss3-p1-1",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "paragraph",
        "label": "2.3 Pretraining Dataset",
        "english": "Next, we describe the sources of videos and images that make up our pretraining dataset, and our approach to curating the dataset.",
        "chinese": "接下来介绍预训练数据中的视频与图像来源，以及数据筛选方式。",
        "evidenceKeys": [
          "S2.SS3.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s2-t1",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "table",
        "label": "2.3 Pretraining Dataset",
        "english": "**Table 1: VideoMix22M (VM22M) Pretraining Dataset. To build our observation pretraining dataset, we combined four different video sources and one image dataset. We use a source-specific sampling probability during training and apply retrieval-based curation on YT1B to reduce noisy content (e.g., cartoon- or clipart-style).**\n\n| Source | Samples | Type | Total Hours | Apply Curation | Weight |\n| --- | --- | --- | --- | --- | --- |\n| SSv2 (Goyal et al., 2017) | 168K | EgoVideo | 168 | No | 0.056 |\n| Kinetics (Carreira et al., 2019) | 733K | ExoVideo | 614 | No | 0.188 |\n| Howto100M (Miech et al., 2019) | 1.1M | ExoVideo | 134K | No | 0.318 |\n| YT-Temporal-1B (Zellers et al., 2022) | 19M | ExoVideo | 1.6M | Yes | 0.188 |\n| ImageNet (Deng et al., 2009) | 1M | Images | n/a | No | 0.250 |",
        "chinese": "**表 1：VideoMix22M（VM22M）预训练数据集。我们结合四个视频来源和一个图像数据集，构建观察式预训练数据。训练时，各来源采用不同采样概率；对 YT1B 进行基于检索的筛选，以减少卡通、剪贴画等噪声内容。**\n\n| 来源 | 样本数 | 类型 | 总时长（小时） | 是否筛选 | 权重 |\n| --- | --- | --- | --- | --- | --- |\n| SSv2（Goyal et al., 2017） | 168K | 第一视角视频 | 168 | 否 | 0.056 |\n| Kinetics（Carreira et al., 2019） | 733K | 第三视角视频 | 614 | 否 | 0.188 |\n| Howto100M（Miech et al., 2019） | 1.1M | 第三视角视频 | 134K | 否 | 0.318 |\n| YT-Temporal-1B（Zellers et al., 2022） | 19M | 第三视角视频 | 1.6M | 是 | 0.188 |\n| ImageNet（Deng et al., 2009） | 1M | 图像 | 不适用 | 否 | 0.250 |",
        "evidenceKeys": [
          "S2.T1"
        ]
      },
      {
        "id": "v-jepa-2-s2-ss3-sss0-px1-p1-1",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "paragraph",
        "label": "Scaling Dataset Size.",
        "english": "We construct a large-scale video dataset by combining publicly available data sources. Using publicly-available sources in this work enables other researchers to reproduce these results. The overall dataset includes ego-centric videos from the Something-Something v2 dataset (SSv2) introduced in Goyal et al. (2017), exo-centric action videos from the Kinetics 400, 600, and 700 datasets (Kay et al., 2017; Carreira et al., 2018, 2019), YouTube tutorial videos from HowTo100M (Miech et al., 2019), and general YouTube videos from YT-Temporal-1B (Zellers et al., 2022), which we refer to as YT1B. We also include images from the ImageNet dataset (Deng et al., 2009) to increase the visual coverage of the pretraining data. To enable joint image and video pretraining, we duplicate an image temporally and treat it as a 16-frame video where all frames are identical. During training, we sample from each data source with a weighting coefficient that we determined empirically via manual tuning. The resulting dataset, which we refer to as VideoMix22M (or VM22M), consists of 22 million samples. Table˜1 lists these data sources and their weights.",
        "chinese": "我们将公开数据来源结合成大规模视频数据集，以便其他研究者复现。数据包括 Something-Something v2（SSv2）的第一视角视频（Goyal et al., 2017），Kinetics 400、600、700 的第三视角动作视频（Kay et al., 2017; Carreira et al., 2018, 2019），HowTo100M 的 YouTube 教程视频（Miech et al., 2019），以及 YT-Temporal-1B 的一般 YouTube 视频（Zellers et al., 2022），后者简称 YT1B。我们还加入 ImageNet 图像（Deng et al., 2009），扩大视觉覆盖范围。为联合预训练图像与视频，将一张图像沿时间维复制，视为所有帧相同的 16 帧视频。各来源的采样权重通过人工调参、依据实验确定。最终数据集共有 2200 万样本，命名为 VideoMix22M（VM22M）。来源及权重见表 1。",
        "evidenceKeys": [
          "S2.SS3.SSS0.Px1.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s2-ss3-sss0-px1-p2-1",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "paragraph",
        "label": "Scaling Dataset Size.",
        "english": "Figure˜4 (Left) compares the performance of a ViT-L/16 pretrained on VM22M with a similar model trained on the smaller (2 million) VideoMix2M dataset from Bardes et al. (2024). Training on VM22M leads to a $+1$ point improvement on average performance on visual understanding tasks, compared to VM2M. Performance improvement is more prominent on appearance-based tasks such as Kinetics-400, COIN, and ImageNet, showing the importance of increasing visual coverage for those tasks.",
        "chinese": "图 4 左比较了在 VM22M 上预训练的 ViT-L/16，以及在 Bardes et al.（2024）较小的 200 万视频 VideoMix2M 数据集上训练的同类模型。VM22M 使视觉理解任务平均表现提高 $+1$ 个百分点。提升在 Kinetics-400、COIN、ImageNet 等主要依赖外观的任务上更明显，说明扩大视觉覆盖对这些任务很重要。",
        "evidenceKeys": [
          "S2.SS3.SSS0.Px1.p2.1"
        ]
      },
      {
        "id": "v-jepa-2-s2-f4-panel-1",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "figure-caption",
        "label": "Scaling Dataset Size.",
        "english": "Figure 4: Data Scaling & Curation. We train and compare models on different data-mixes. Models are ViT-L/16 trained for 90K iterations using a cosine learning schedule following Bardes et al. (2024). (Left) We compare the performance of a ViT-L/16 model pretrained on the VM2M dataset and our VM22M dataset. Training on the VM22M dataset leads to a $+1$ point improvement in average performance. Performance improvement is more pronounced on appearance-based tasks such as Kinetics-400, COIN, and ImageNet (Right) We compare the performance of a ViT-L/16 model pretrained on YT1B and a model pretrained on our Curated-YT1B dataset, which leverages our cluster-based curation. Training on the curated dataset leads to a $+1.4$ point improvement on average performances, showing the effectiveness of data-curation. (Panel 1/2)",
        "chinese": "图 4：扩大数据规模与数据筛选。我们在不同数据组合上训练和比较 ViT-L/16，均沿用 Bardes et al.（2024）的余弦学习率调度，训练 90K 次迭代。左：比较 VM2M 与 VM22M 预训练，VM22M 带来平均 $+1$ 个百分点的提升，在 Kinetics-400、COIN、ImageNet 等外观类任务上尤为明显。右：比较原始 YT1B 与经过聚类筛选的 Curated-YT1B 预训练，筛选后平均提高 $+1.4$ 个百分点，说明数据筛选有效。（分图 1/2）",
        "evidenceKeys": [
          "S2.F4-panel-1"
        ],
        "imageSrc": "/papers/v-jepa-2/x5.webp",
        "imageAlt": "缩放数据集大小。"
      },
      {
        "id": "v-jepa-2-s2-f4-panel-2",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "figure-caption",
        "label": "Scaling Dataset Size.",
        "english": "Figure 4: Data Scaling & Curation. We train and compare models on different data-mixes. Models are ViT-L/16 trained for 90K iterations using a cosine learning schedule following Bardes et al. (2024). (Left) We compare the performance of a ViT-L/16 model pretrained on the VM2M dataset and our VM22M dataset. Training on the VM22M dataset leads to a $+1$ point improvement in average performance. Performance improvement is more pronounced on appearance-based tasks such as Kinetics-400, COIN, and ImageNet (Right) We compare the performance of a ViT-L/16 model pretrained on YT1B and a model pretrained on our Curated-YT1B dataset, which leverages our cluster-based curation. Training on the curated dataset leads to a $+1.4$ point improvement on average performances, showing the effectiveness of data-curation. (Panel 2/2)",
        "chinese": "图 4：扩大数据规模与数据筛选。我们在不同数据组合上训练和比较 ViT-L/16，均沿用 Bardes et al.（2024）的余弦学习率调度，训练 90K 次迭代。左：比较 VM2M 与 VM22M 预训练，VM22M 带来平均 $+1$ 个百分点的提升，在 Kinetics-400、COIN、ImageNet 等外观类任务上尤为明显。右：比较原始 YT1B 与经过聚类筛选的 Curated-YT1B 预训练，筛选后平均提高 $+1.4$ 个百分点，说明数据筛选有效。（分图 2/2）",
        "evidenceKeys": [
          "S2.F4-panel-2"
        ],
        "imageSrc": "/papers/v-jepa-2/x6.webp",
        "imageAlt": "缩放数据集大小。"
      },
      {
        "id": "v-jepa-2-s2-ss3-sss0-px2-p1-1",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "paragraph",
        "label": "Data Curation.",
        "english": "YT1B is a large video dataset, consisting of 1.4 million video-hours, with no curation and minimal filtering compared to smaller video datasets (like Kinetics and Something-Something v2). Because uncurated and unbalanced data can hinder model performance (Assran et al., 2022; Oquab et al., 2023), we filter YT1B by adapting an existing retrieval-based curation pipeline to handle videos. Specifically, we extract scenes from YT1B videos, compute an embedding vector for each scene, and then use a cluster-based retrieval process (Oquab et al., 2023) to select video scenes according to a target distribution, which is composed of the Kinetics, Something-Something v2, COIN and EpicKitchen training datasets. We describe the details of the dataset construction procedure in Section˜10.2. Similar to Oquab et al. (2023), we ensure that none of the videos from the target validation sets are contained in the initial, uncurated data pool.",
        "chinese": "YT1B 是总计 140 万小时的大型视频集，相比 Kinetics、Something-Something v2 等较小数据集，它未经整理，只做了极少过滤。未经筛选且不均衡的数据可能损害性能（Assran et al., 2022; Oquab et al., 2023），因此我们将已有检索式筛选流程适配到视频。具体先从 YT1B 提取场景，为每个场景计算嵌入，再用基于聚类的检索（Oquab et al., 2023），按照 Kinetics、Something-Something v2、COIN 和 EpicKitchen 训练集组成的目标分布，选取视频场景。构建细节见第 10.2 节。与 Oquab et al.（2023）类似，我们确保最初未经筛选的数据池中不含任何目标验证集视频。",
        "evidenceKeys": [
          "S2.SS3.SSS0.Px2.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s2-ss3-sss0-px2-p2-1",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "paragraph",
        "label": "Data Curation.",
        "english": "In Figure˜4 (Right), we compare the average performance on visual understanding evaluations between a ViT-L model pretrained on uncurated YT-1B data and a comparable model trained on our Curated-YT-1B dataset. Training with the curated dataset yields a $+1.4$ point average performance improvement over the uncurated baseline. Notably, the Curated-YT-1B-trained model achieves competitive performance relative to the full VM22M dataset at the ViT-L scale. However, larger-scale models benefit more from VM22M training (see Section˜10.2), suggesting that combining Curated-YT-1B with other data sources enhances scalability.",
        "chinese": "图 4 右比较了在原始 YT-1B 和 Curated-YT-1B 上预训练的同类 ViT-L 模型。筛选后，视觉理解平均表现比未筛选基线提高 $+1.4$ 个百分点。在 ViT-L 规模上，仅用 Curated-YT-1B 就能与完整 VM22M 取得相近竞争力；但更大模型从 VM22M 获益更多（第 10.2 节），提示将筛选后的 YT-1B 与其他来源结合，更有利于规模扩展。",
        "evidenceKeys": [
          "S2.SS3.SSS0.Px2.p2.1"
        ]
      },
      {
        "id": "v-jepa-2-s2-ss4-sss0-px1-p1-3",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "paragraph",
        "label": "Scaling Model Size.",
        "english": "To explore the scaling behavior of our model, we trained a family of encoder models with parameter counts ranging from 300 million (ViT-L) to 1 billion (ViT-g) parameters. All encoder architecture details are provided in Table˜12 in the appendix. Note that each encoder uses the same predictor architecture, similar to a ViT-small. We report the average performance of these encoders on visual understanding tasks in Figure˜5 (Left). Scaling the model size from 300 million (ViT-L) to 1 billion (ViT-g) parameters yields a $+1.5$ points average performance improvement. Both motion and appearance understanding tasks benefit from scaling, with SSv2 improving by $+1.6$ points and Kinetics by $+1.5$ points (cf.Table˜4). These results confirm that self-supervised video pretraining effectively leverages larger model capacities, up to the 1B-parameter ViT-g.",
        "chinese": "为考察规模效应，我们训练了从 3 亿参数 ViT-L 到 10 亿参数 ViT-g 的一组编码器，架构细节见附录表 12。所有编码器使用相同的预测器，其架构近似 ViT-small。图 5 左报告视觉理解平均表现：模型从 3 亿扩大到 10 亿参数，平均提高 $+1.5$ 个百分点。运动与外观任务均获益，其中 SSv2 提高 $+1.6$，Kinetics 提高 $+1.5$ 个百分点（表 4）。这表明，自监督视频预训练能够有效利用更大容量，至少可扩展到 1B 参数 ViT-g。",
        "evidenceKeys": [
          "S2.SS4.SSS0.Px1.p1.3"
        ]
      },
      {
        "id": "v-jepa-2-s2-f5-panel-1",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "figure-caption",
        "label": "Scaling Model Size.",
        "english": "Figure 5: Model Scaling. We explore the impact of scaling model size and input video resolution. All models are trained on the VideoMix22M pretraining dataset. (Left) Average performance across six understanding tasks as a function of model scale. Models are trained with a constant learning rate until performance plateaus on downstream tasks. We then cool down the model using 64 frames at $256\\times 256$ resolution and report post-cooldown performance. Scaling the model size from 300M to 1B parameters yields a $+1.7$ point average improvement. (Middle) Training times (GPU-days) for ViT-g on A100 GPUs when training videos at $384\\times 384$ resolution with different numbers of frames per clip. We compare progressive resolution training (252K iterations at 16 frames / $256\\times 256$ resolution, followed by 12K cooldown iterations at $384\\times 384$ resolution) to the projected time for full-resolution training. Progressive training provides up to 8$\\times$ speedup, significantly reducing the pretraining compute requirement. (Right) Effect of inscreasing video duration at cooldown on downstream performance for ViT-g. Even when only using 16-frame clips during inference/evaluation, increasing video duration during the cooldown phase of training improves average task performance by $+0.7$ points. (Panel 1/3)",
        "chinese": "图 5：模型规模扩展。所有模型都在 VideoMix22M 上训练，用于考察模型大小与输入视频分辨率的影响。左：六项理解任务的平均表现随模型规模的变化。先以恒定学习率训练至下游表现趋稳，再用 64 帧、$256\\times 256$ 视频进行最终衰减训练，报告衰减后表现。从 300M 扩展到 1B 参数，平均提高 $+1.7$ 个百分点。中：ViT-g 在 A100 上以 $384\\times 384$ 分辨率、不同帧数训练的耗时（GPU 天）。比较渐进训练——先以 16 帧、$256\\times 256$ 训练 252K 次迭代，再以 $384\\times 384$ 进行 12K 次衰减迭代——与估算的全分辨率训练耗时。渐进训练最多加速 8$\\times$，显著降低预训练算力需求。右：衰减阶段增加片段长度对 ViT-g 下游表现的影响。即使推理评估只用 16 帧，延长训练片段也能使平均表现提高 $+0.7$ 个百分点。（分图 1/3）",
        "evidenceKeys": [
          "S2.F5-panel-1"
        ],
        "imageSrc": "/papers/v-jepa-2/x7.webp",
        "imageAlt": "缩放模型尺寸。"
      },
      {
        "id": "v-jepa-2-s2-f5-panel-2",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "figure-caption",
        "label": "Scaling Model Size.",
        "english": "Figure 5: Model Scaling. We explore the impact of scaling model size and input video resolution. All models are trained on the VideoMix22M pretraining dataset. (Left) Average performance across six understanding tasks as a function of model scale. Models are trained with a constant learning rate until performance plateaus on downstream tasks. We then cool down the model using 64 frames at $256\\times 256$ resolution and report post-cooldown performance. Scaling the model size from 300M to 1B parameters yields a $+1.7$ point average improvement. (Middle) Training times (GPU-days) for ViT-g on A100 GPUs when training videos at $384\\times 384$ resolution with different numbers of frames per clip. We compare progressive resolution training (252K iterations at 16 frames / $256\\times 256$ resolution, followed by 12K cooldown iterations at $384\\times 384$ resolution) to the projected time for full-resolution training. Progressive training provides up to 8$\\times$ speedup, significantly reducing the pretraining compute requirement. (Right) Effect of inscreasing video duration at cooldown on downstream performance for ViT-g. Even when only using 16-frame clips during inference/evaluation, increasing video duration during the cooldown phase of training improves average task performance by $+0.7$ points. (Panel 2/3)",
        "chinese": "图 5：模型规模扩展。所有模型都在 VideoMix22M 上训练，用于考察模型大小与输入视频分辨率的影响。左：六项理解任务的平均表现随模型规模的变化。先以恒定学习率训练至下游表现趋稳，再用 64 帧、$256\\times 256$ 视频进行最终衰减训练，报告衰减后表现。从 300M 扩展到 1B 参数，平均提高 $+1.7$ 个百分点。中：ViT-g 在 A100 上以 $384\\times 384$ 分辨率、不同帧数训练的耗时（GPU 天）。比较渐进训练——先以 16 帧、$256\\times 256$ 训练 252K 次迭代，再以 $384\\times 384$ 进行 12K 次衰减迭代——与估算的全分辨率训练耗时。渐进训练最多加速 8$\\times$，显著降低预训练算力需求。右：衰减阶段增加片段长度对 ViT-g 下游表现的影响。即使推理评估只用 16 帧，延长训练片段也能使平均表现提高 $+0.7$ 个百分点。（分图 2/3）",
        "evidenceKeys": [
          "S2.F5-panel-2"
        ],
        "imageSrc": "/papers/v-jepa-2/x8.webp",
        "imageAlt": "缩放模型尺寸。"
      },
      {
        "id": "v-jepa-2-s2-f5-panel-3",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "figure-caption",
        "label": "Scaling Model Size.",
        "english": "Figure 5: Model Scaling. We explore the impact of scaling model size and input video resolution. All models are trained on the VideoMix22M pretraining dataset. (Left) Average performance across six understanding tasks as a function of model scale. Models are trained with a constant learning rate until performance plateaus on downstream tasks. We then cool down the model using 64 frames at $256\\times 256$ resolution and report post-cooldown performance. Scaling the model size from 300M to 1B parameters yields a $+1.7$ point average improvement. (Middle) Training times (GPU-days) for ViT-g on A100 GPUs when training videos at $384\\times 384$ resolution with different numbers of frames per clip. We compare progressive resolution training (252K iterations at 16 frames / $256\\times 256$ resolution, followed by 12K cooldown iterations at $384\\times 384$ resolution) to the projected time for full-resolution training. Progressive training provides up to 8$\\times$ speedup, significantly reducing the pretraining compute requirement. (Right) Effect of inscreasing video duration at cooldown on downstream performance for ViT-g. Even when only using 16-frame clips during inference/evaluation, increasing video duration during the cooldown phase of training improves average task performance by $+0.7$ points. (Panel 3/3)",
        "chinese": "图 5：模型规模扩展。所有模型都在 VideoMix22M 上训练，用于考察模型大小与输入视频分辨率的影响。左：六项理解任务的平均表现随模型规模的变化。先以恒定学习率训练至下游表现趋稳，再用 64 帧、$256\\times 256$ 视频进行最终衰减训练，报告衰减后表现。从 300M 扩展到 1B 参数，平均提高 $+1.7$ 个百分点。中：ViT-g 在 A100 上以 $384\\times 384$ 分辨率、不同帧数训练的耗时（GPU 天）。比较渐进训练——先以 16 帧、$256\\times 256$ 训练 252K 次迭代，再以 $384\\times 384$ 进行 12K 次衰减迭代——与估算的全分辨率训练耗时。渐进训练最多加速 8$\\times$，显著降低预训练算力需求。右：衰减阶段增加片段长度对 ViT-g 下游表现的影响。即使推理评估只用 16 帧，延长训练片段也能使平均表现提高 $+0.7$ 个百分点。（分图 3/3）",
        "evidenceKeys": [
          "S2.F5-panel-3"
        ],
        "imageSrc": "/papers/v-jepa-2/x9.webp",
        "imageAlt": "缩放模型尺寸。"
      },
      {
        "id": "v-jepa-2-s2-ss4-sss0-px2-p1-1",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "paragraph",
        "label": "Training Schedule.",
        "english": "V-JEPA 2 model training employs a warmup-constant learning rate schedule followed by a cooldown phase (Zhai et al., 2022; Hägele et al., 2024). Similarly to Hägele et al. (2024), we found that this schedule performs comparably to a half-cosine schedule (Loshchilov and Hutter, 2016); it also makes exploring long training runs more cost-effective, since multiple cooldown runs can be started from different checkpoints of the constant phase. We simplified the recipe from Bardes et al. (2024) by maintaining fixed teacher EMA and weight decay coefficients instead of using ramp-up schedule, as these variations showed minimal impact on downstream understanding tasks. Figure˜3 shows that extending the training schedule from 90K to 252K iterations yields a +0.8 average performance improvement with ViT-g models, validating the benefits of extended training durations. This schedule also facilitates progressive training by incrementally increasing video resolution during the cooldown phase.",
        "chinese": "V-JEPA 2 采用“预热—恒定”学习率调度，最后进入学习率衰减阶段（Zhai et al., 2022; Hägele et al., 2024）。与 Hägele et al.（2024）的观察类似，其表现与半余弦调度相当（Loshchilov and Hutter, 2016），但探索更长训练更省成本，因为可从恒定阶段不同检查点分别启动衰减训练。我们还简化了 Bardes et al.（2024）的方案：教师 EMA 系数和权重衰减系数固定，不再逐步增大，因为这些变化对下游理解任务影响很小。图 3 显示，ViT-g 从 90K 延长到 252K 次迭代，平均表现提高 +0.8，支持延长训练的益处。该调度也方便在最后衰减阶段逐步提高视频分辨率。",
        "evidenceKeys": [
          "S2.SS4.SSS0.Px2.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s2-ss4-sss0-px3-p1-5",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "paragraph",
        "label": "Efficient Progressive-Resolution Training.",
        "english": "While most previous video encoders focus on short clips of 16 frames (roughly seconds) (Bardes et al., 2024; Wang et al., 2024b, 2023), we explore training with longer clips of up to 64 frames (16 seconds) at higher spatial resolutions. However, training time increases dramatically with longer durations and higher resolutions — training our ViT-g model on $64\\times 384\\times 384$ inputs would require roughly $60$ GPU-years (see Figure˜5, Middle). To reduce this, we adopt a progressive resolution strategy (Touvron et al., 2019; Oquab et al., 2023) that boosts training efficiency while maintaining downstream performance. Our training process begins with a warmup phase where we train on 16-frame, $256\\times 256$-resolution videos with linear learning rate warmup over 12K iterations, followed by a main training phase with a constant learning rate for 228K iterations. Then, during the cooldown phase, we increase video duration and resolution while linearly decaying the learning rate over 12K iterations. Hence the additional computational overhead associated with training on longer-duration, higher-resolution videos is only incurred during the final cooldown phase. This approach enables efficient high-resolution training: as shown in Figure˜5 (Middle), we achieve an $8.4\\times$ reduction in GPU time for a model that can ingest 64-frame, $384\\times 384$ resolution inputs, compared to directly training such a model from scratch at full resolution throughout all phases of training. Furthermore, we still observe the benefits of a model that can process longer-duration and higher-resolution inputs as discussed next.",
        "chinese": "以往多数视频编码器侧重约数秒的 16 帧短片段（Bardes et al., 2024; Wang et al., 2024b, 2023），我们则探索以更高空间分辨率训练最多 64 帧、约 16 秒的视频。但更长、更清晰的输入会大幅增加训练时间：ViT-g 若全程采用 $64\\times 384\\times 384$ 输入，约需 $60$ GPU 年（图 5 中）。为降低成本，我们采用渐进分辨率策略（Touvron et al., 2019; Oquab et al., 2023），提高效率并保持下游表现。首先用 16 帧、$256\\times 256$ 视频训练，线性预热学习率 12K 次迭代；随后以恒定学习率训练 228K 次；最后在 12K 次迭代中线性衰减学习率，同时提高视频长度和分辨率。因此，长片段与高分辨率带来的额外开销只发生在最后阶段。图 5 中显示，相比从头到尾以完整分辨率训练，这种方式让能够处理 64 帧、$384\\times 384$ 输入的模型减少 $8.4\\times$ GPU 时间，同时仍保留下文所述的长时程、高分辨率收益。",
        "evidenceKeys": [
          "S2.SS4.SSS0.Px3.p1.5"
        ]
      },
      {
        "id": "v-jepa-2-s2-ss4-sss0-px4-p1-1",
        "sectionId": "2-v-jepa-2-scaling-self-supervised-video-pretraining",
        "kind": "paragraph",
        "label": "Scaling temporal and spatial video resolution.",
        "english": "Figure˜5 examines how input video resolution affects downstream task performance. When increasing clip duration from 16 to 64 frames during pretraining while maintaining a fixed 16-frame evaluation duration, we observe a $+0.7$ percentage point average performance improvement (Figure˜5, Right). Additionally, we see that increasing the video duration and resolution during evaluation leads to a significant improvement across the tasks (refer to Table˜4 and Section˜10.4.2). These results demonstrate that video self-supervised pretraining benefits from increased temporal resolution during both training and evaluation. Although we experimented with scaling to even longer video clips (128 and 256 frames), we did not observe any further improvement beyond 64 frames on this set of understanding tasks.",
        "chinese": "图 5 考察输入视频分辨率对下游任务的影响。预训练片段从 16 帧增加到 64 帧，即使评估仍固定用 16 帧，平均表现也提高 $+0.7$ 个百分点（图 5 右）。此外，评估时增加片段长度和分辨率，会进一步显著改善各任务（表 4、第 10.4.2 节）。这表明，训练与评估中的更高时间分辨率都有助于视频自监督预训练。我们也尝试过 128 帧、256 帧，但在这组理解任务上，超过 64 帧后未观察到额外收益。",
        "evidenceKeys": [
          "S2.SS4.SSS0.Px4.p1.1"
        ]
      }
    ]
  },
  {
    "id": "3-v-jepa-2-ac-learning-an-action-conditioned-world-model",
    "number": "3",
    "titleEn": "V-JEPA 2-AC: Learning an Action-Conditioned World Model",
    "titleZh": "V-JEPA 2-AC：学习动作条件世界模型",
    "collapsedByDefault": false,
    "blocks": [
      {
        "id": "v-jepa-2-s3-p1-1",
        "sectionId": "3-v-jepa-2-ac-learning-an-action-conditioned-world-model",
        "kind": "paragraph",
        "label": "3 V-JEPA 2-AC: Learning an Action-Conditioned World Model",
        "english": "After pre-training, the V-JEPA 2 model can make predictions about missing part in videos. However, these predictions do not directly take into account the causal effect of actions that an agent might take. In the next stage of training, described in this section, we focus on making the model useful for planning by leveraging a small amount of interaction data. To that end, we learn a frame-causal action-conditioned predictor on top of the frozen V-JEPA 2 video encoder (Figure˜2, right). We train our model on data from the Droid dataset (Khazatsky et al., 2024) consisting of data from experiments with a table-top Franka Panda robot arm collected through teleoperation. We refer to the resulting action-conditioned model as V-JEPA 2-AC, and in Section˜4 we show that V-JEPA 2-AC can be used within a model-predictive control planning loop to plan actions in new environments.",
        "chinese": "预训练后，V-JEPA 2 能预测视频中缺失的部分，但这些预测尚未直接考虑智能体动作的因果影响。本节介绍下一阶段：用少量交互数据，让模型能够服务于规划。具体是在冻结的视频编码器之上，学习按视频帧保持因果性的动作条件预测器（图 2 右）。训练数据来自 Droid（Khazatsky et al., 2024），由遥操作桌面 Franka Panda 机械臂收集。得到的动作条件模型称为 V-JEPA 2-AC。第 4 节将展示如何将它接入模型预测控制循环，在新环境中规划动作。",
        "evidenceKeys": [
          "S3.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s3-ss1-p1-1",
        "sectionId": "3-v-jepa-2-ac-learning-an-action-conditioned-world-model",
        "kind": "paragraph",
        "label": "3.1 Action-Conditioned World Model Training",
        "english": "Our goal is to take the V-JEPA 2 model after pre-training and obtain a latent world model that can be used for control of an embodied agentic system via closed-loop model-predictive control. To achieve this, we train V-JEPA 2-AC, an autoregressive model that predicts representations of future video observations conditioned on control actions and proprioceptive observations.",
        "chinese": "我们希望以预训练 V-JEPA 2 为基础，得到可通过闭环模型预测控制来操纵具身智能体的潜空间世界模型。为此，训练自回归模型 V-JEPA 2-AC，以控制动作和本体感知观测为条件，预测未来视频观测的表示。",
        "evidenceKeys": [
          "S3.SS1.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s3-ss1-p2-1",
        "sectionId": "3-v-jepa-2-ac-learning-an-action-conditioned-world-model",
        "kind": "paragraph",
        "label": "3.1 Action-Conditioned World Model Training",
        "english": "In this section we describe a concrete instantiation of this framework for a tabletop arm with a fixed exocentric camera, and where control actions correspond to end-effector commands. The model is trained using approximately 62 hours of unlabeled video from the raw Droid dataset, which consists of short videos, typically 3–4 seconds long, of a 7-DoF Franka Emika Panda arm equipped with a two-finger gripper. Here, unlabeled video refers to the fact that we do not use additional meta-data indicating any reward, what type of task was being performed in each demonstration, or whether the demonstration was successful or not in completing the task being attempted. Rather, we only use the raw video and end-effector state signals from the dataset (each video in the dataset is accompanied by meta-data indicating the end-effector state in each frame — three dimensions for position, three for orientation, and one for the gripper state).",
        "chinese": "本节给出一个具体实例：固定第三视角相机观察桌面机械臂，控制动作对应末端执行器指令。训练使用原始 Droid 数据集约 62 小时的无标注视频，内容是配有两指夹爪的 7 自由度 Franka Emika Panda 机械臂，短片通常长 3–4 秒。这里“无标注”特指不使用奖励、示范任务类型，以及任务是否成功等额外元数据。我们只用原始视频和末端执行器状态信号；数据集中每个视频都附有逐帧状态元数据，包括三维位置、三维姿态和一维夹爪状态。",
        "evidenceKeys": [
          "S3.SS1.p2.1"
        ]
      },
      {
        "id": "v-jepa-2-s3-ss1-sss0-px1-p1-10",
        "sectionId": "3-v-jepa-2-ac-learning-an-action-conditioned-world-model",
        "kind": "paragraph",
        "label": "Model inputs.",
        "english": "In each iteration of training we randomly sample a mini-batch of 4 second video clips from the Droid dataset, and, for simplicity, discard any videos shorter than 4 seconds, leaving us with a smaller subset of the dataset comprising under 62 hours of video. The video clips are sampled with resolution $256\\times 256$ and a frame-rate of 4 frames-per-second (fps), yielding 16 frame clips denoted by $(x_{k})_{k\\in[16]}$, where each $x_{k}$ represents a single video frame. The robot’s end-effector state in each observation is denoted by the sequence $(s_{k})_{k\\in[16]}$, where $s_{k}$ is a real-valued 7D vector defined relative to the base of the robot. The first three dimensions of $s_{k}$ encode the cartesian position of the end-effector, the next three dimensions encode its orientation in the form of extrinsic Euler angles, and the last dimension encodes the gripper state. We construct a sequence of actions $(a_{k})_{k\\in[15]}$ by computing the change in end-effector state between adjacent frames. Specifically, each action $a_{k}$ is a real-valued 7-dimensional vector representing the change in end-effector state between frames $k$ and $k+1$. We apply random-resize-crop augmentations to the sampled video clips with the aspect-ratio sampled in the range (0.75, 1.35).",
        "chinese": "每次训练迭代，从 Droid 随机采样一小批 4 秒视频。为简化处理，丢弃短于 4 秒的视频，最终子集总时长不足 62 小时。视频以 $256\\times 256$ 分辨率、每秒 4 帧采样，得到 16 帧片段 $(x_{k})_{k\\in[16]}$，每个 $x_{k}$ 是一帧。对应末端执行器状态为 $(s_{k})_{k\\in[16]}$；$s_{k}$ 是相对机器人基座定义的七维实向量，前三维表示笛卡尔位置，接下来的三维用固定轴欧拉角表示姿态，最后一维表示夹爪状态。通过相邻帧状态之差，构造动作序列 $(a_{k})_{k\\in[15]}$。每个 $a_{k}$ 同样为七维实向量，表示第 $k$ 帧到第 $k+1$ 帧的末端执行器状态变化。视频还进行随机缩放裁剪增强，宽高比在 (0.75, 1.35) 中采样。",
        "evidenceKeys": [
          "S3.SS1.SSS0.Px1.p1.10"
        ]
      },
      {
        "id": "v-jepa-2-s3-ss1-sss0-px2-p1-9",
        "sectionId": "3-v-jepa-2-ac-learning-an-action-conditioned-world-model",
        "kind": "paragraph",
        "label": "Loss function.",
        "english": "We use V-JEPA 2 encoder $E(\\cdot)$ as an image encoder and encode each frame independently in a given clip to obtain a sequence of feature maps $(z_{k})_{k\\in[16]}$, where $z_{k}\\coloneqq E(x_{k})\\in\\mathbb{R}^{H\\times W\\times D}$ with $H\\times W$ denoting the spatial resolution of the feature map, and $D$ the embedding dimension. In practice, our feature maps are encoded using the ViT-g encoder and have the shape $16\\times 16\\times 1408$. Note that the encoder is kept frozen during this post-training phase. The sequence of feature maps, end-effector states, and actions are temporally interleaved as $(a_{k},s_{k},z_{k})_{k\\in[15]}$ and processed with the transformer predictor network $P_{\\phi}(\\cdot)$ to obtain a sequence of next state representation predictions $(\\hat{z}_{k+1})_{k\\in[15]}$. The scalar-valued teacher-forcing loss function is finally computed as",
        "chinese": "将 V-JEPA 2 编码器 $E(\\cdot)$ 当作图像编码器，对每帧独立编码，得到特征图序列 $(z_{k})_{k\\in[16]}$。其中 $z_{k}\\coloneqq E(x_{k})\\in\\mathbb{R}^{H\\times W\\times D}$，$H\\times W$ 是特征图空间分辨率，$D$ 是嵌入维数。实际使用 ViT-g，特征图形状为 $16\\times 16\\times 1408$。后训练期间编码器保持冻结。将动作、末端执行器状态与特征图按时间交错排列为 $(a_{k},s_{k},z_{k})_{k\\in[15]}$，送入 Transformer 预测器 $P_{\\phi}(\\cdot)$，得到下一状态表示的预测序列 $(\\hat{z}_{k+1})_{k\\in[15]}$。最后计算标量形式的教师强制损失：",
        "evidenceKeys": [
          "S3.SS1.SSS0.Px2.p1.9"
        ]
      },
      {
        "id": "v-jepa-2-s3-e2",
        "sectionId": "3-v-jepa-2-ac-learning-an-action-conditioned-world-model",
        "kind": "equation",
        "label": "Loss function.",
        "english": "$$\n\\mathcal{L}_{\\text{teacher-forcing}}(\\phi)\\coloneqq\\frac{1}{T}\\sum^{T}_{k=1}\\lVert\\hat{z}_{k+1}-z_{k+1}\\rVert_{1}=\\frac{1}{T}\\sum^{T}_{k=1}\\left\\lVert P_{\\phi}\\left(\\left(a_{t},s_{t},E(x_{t})\\right)_{t\\leq k}\\right)-E(x_{k+1})\\right\\rVert_{1},\n$$\n\n (2)",
        "chinese": "公式（符号保持不变）：\n\n$$\n\\mathcal{L}_{\\text{teacher-forcing}}(\\phi)\\coloneqq\\frac{1}{T}\\sum^{T}_{k=1}\\lVert\\hat{z}_{k+1}-z_{k+1}\\rVert_{1}=\\frac{1}{T}\\sum^{T}_{k=1}\\left\\lVert P_{\\phi}\\left(\\left(a_{t},s_{t},E(x_{t})\\right)_{t\\leq k}\\right)-E(x_{k+1})\\right\\rVert_{1},\n$$\n\n (2)",
        "evidenceKeys": [
          "S3.E2"
        ]
      },
      {
        "id": "v-jepa-2-s3-ss1-sss0-px2-p1-14",
        "sectionId": "3-v-jepa-2-ac-learning-an-action-conditioned-world-model",
        "kind": "paragraph",
        "label": "Loss function.",
        "english": "with $T=15$. We also compute a two-step rollout loss to improve the model’s ability to perform autoregressive rollouts at inference time. For simplicity of exposition and with slight overloading of notation, let $P_{\\phi}(\\hat{a}_{1:T};s_{k},z_{k})\\in\\mathbb{R}^{H\\times W\\times D}$ denote the final predicted state representation obtained by autoregressively running V-JEPA 2-AC with an action sequence $(\\hat{a}_{i})_{i\\in[T]}$, starting from ($s_{k}$, $z_{k}$). We can now denote the rollout loss as:",
        "chinese": "其中 $T=15$。此外，我们计算两步展开损失，增强模型在推理时自回归展开的能力。为便于说明，这里略微复用记号：令 $P_{\\phi}(\\hat{a}_{1:T};s_{k},z_{k})\\in\\mathbb{R}^{H\\times W\\times D}$ 表示从（$s_{k}$，$z_{k}$）出发，依次输入动作序列 $(\\hat{a}_{i})_{i\\in[T]}$、自回归运行 V-JEPA 2-AC 后，最终预测的状态表示。展开损失写为：",
        "evidenceKeys": [
          "S3.SS1.SSS0.Px2.p1.14"
        ]
      },
      {
        "id": "v-jepa-2-s3-e3",
        "sectionId": "3-v-jepa-2-ac-learning-an-action-conditioned-world-model",
        "kind": "equation",
        "label": "Loss function.",
        "english": "$$\n\\mathcal{L}_{\\text{rollout}}(\\phi)\\coloneqq\\lVert P_{\\phi}(a_{1:T},s_{1},z_{1})-z_{T+1}\\rVert_{1}.\n$$\n\n (3)",
        "chinese": "公式（符号保持不变）：\n\n$$\n\\mathcal{L}_{\\text{rollout}}(\\phi)\\coloneqq\\lVert P_{\\phi}(a_{1:T},s_{1},z_{1})-z_{T+1}\\rVert_{1}.\n$$\n\n (3)",
        "evidenceKeys": [
          "S3.E3"
        ]
      },
      {
        "id": "v-jepa-2-s3-ss1-sss0-px2-p1-15",
        "sectionId": "3-v-jepa-2-ac-learning-an-action-conditioned-world-model",
        "kind": "paragraph",
        "label": "Loss function.",
        "english": "In practice we use $T=2$ for computing the rollout loss, such that we only differentiate the predictor through one recurrent step.",
        "chinese": "实际计算展开损失时取 $T=2$，因此只需让梯度通过预测器的一次循环展开。",
        "evidenceKeys": [
          "S3.SS1.SSS0.Px2.p1.15"
        ]
      },
      {
        "id": "v-jepa-2-s3-ss1-sss0-px2-p2-3",
        "sectionId": "3-v-jepa-2-ac-learning-an-action-conditioned-world-model",
        "kind": "paragraph",
        "label": "Loss function.",
        "english": "The overall training objective is thus given by",
        "chinese": "因此，总训练目标为：",
        "evidenceKeys": [
          "S3.SS1.SSS0.Px2.p2.3"
        ]
      },
      {
        "id": "v-jepa-2-s3-e4",
        "sectionId": "3-v-jepa-2-ac-learning-an-action-conditioned-world-model",
        "kind": "equation",
        "label": "Loss function.",
        "english": "$$\nL(\\phi)\\coloneqq\\mathcal{L}_{\\text{teacher-forcing}}(\\phi)+\\mathcal{L}_{\\text{rollout}}(\\phi),\n$$\n\n (4)",
        "chinese": "公式（符号保持不变）：\n\n$$\nL(\\phi)\\coloneqq\\mathcal{L}_{\\text{teacher-forcing}}(\\phi)+\\mathcal{L}_{\\text{rollout}}(\\phi),\n$$\n\n (4)",
        "evidenceKeys": [
          "S3.E4"
        ]
      },
      {
        "id": "v-jepa-2-s3-ss1-sss0-px2-p2-2",
        "sectionId": "3-v-jepa-2-ac-learning-an-action-conditioned-world-model",
        "kind": "paragraph",
        "label": "Loss function.",
        "english": "and is minimized with respect to the predictor weights $\\phi$. For illustrative purposes, the training procedure is depicted in Figure˜6 with $T=4$ for both the teacher forcing and rollout loss.",
        "chinese": "通过更新预测器参数 $\\phi$ 最小化该目标。为便于示意，图 6 将教师强制损失和展开损失都画成 $T=4$ 的情况。",
        "evidenceKeys": [
          "S3.SS1.SSS0.Px2.p2.2"
        ]
      },
      {
        "id": "v-jepa-2-s3-f6-panel-1",
        "sectionId": "3-v-jepa-2-ac-learning-an-action-conditioned-world-model",
        "kind": "figure-caption",
        "label": "Loss function.",
        "english": "Figure 6: V-JEPA 2-AC training. V-JEPA 2-AC is trained in an autoregressive fashion, utilizing a teacher forcing loss and a rollout loss. (Left) In the teacher forcing loss, the predictor takes the encoding of the current frame representation as input and learns to predict the representation of the next timestep. (Right) The rollout loss involves feeding the predictor’s output back as input, allowing the model to be trained to predict several timesteps ahead. By optimizing the sum of these two losses, V-JEPA 2-AC enhances its ability to accurately forecast the future by reducing error accumulation during rollouts. (Panel 1/2)",
        "chinese": "图 6：V-JEPA 2-AC 的训练。模型以自回归方式训练，结合教师强制损失和展开损失。左：教师强制使用当前真实帧的编码表示作输入，学习预测下一时间步的表示。右：展开损失把预测器输出重新送回输入，让模型学习预测多个未来时间步。共同优化两项损失，可以减少展开时的误差累积，提高未来预测准确性。（分图 1/2）",
        "evidenceKeys": [
          "S3.F6-panel-1"
        ],
        "imageSrc": "/papers/v-jepa-2/x10.webp",
        "imageAlt": "损失函数。"
      },
      {
        "id": "v-jepa-2-s3-f6-panel-2",
        "sectionId": "3-v-jepa-2-ac-learning-an-action-conditioned-world-model",
        "kind": "figure-caption",
        "label": "Loss function.",
        "english": "Figure 6: V-JEPA 2-AC training. V-JEPA 2-AC is trained in an autoregressive fashion, utilizing a teacher forcing loss and a rollout loss. (Left) In the teacher forcing loss, the predictor takes the encoding of the current frame representation as input and learns to predict the representation of the next timestep. (Right) The rollout loss involves feeding the predictor’s output back as input, allowing the model to be trained to predict several timesteps ahead. By optimizing the sum of these two losses, V-JEPA 2-AC enhances its ability to accurately forecast the future by reducing error accumulation during rollouts. (Panel 2/2)",
        "chinese": "图 6：V-JEPA 2-AC 的训练。模型以自回归方式训练，结合教师强制损失和展开损失。左：教师强制使用当前真实帧的编码表示作输入，学习预测下一时间步的表示。右：展开损失把预测器输出重新送回输入，让模型学习预测多个未来时间步。共同优化两项损失，可以减少展开时的误差累积，提高未来预测准确性。（分图 2/2）",
        "evidenceKeys": [
          "S3.F6-panel-2"
        ],
        "imageSrc": "/papers/v-jepa-2/x11.webp",
        "imageAlt": "损失函数。"
      },
      {
        "id": "v-jepa-2-s3-ss1-sss0-px3-p1-2",
        "sectionId": "3-v-jepa-2-ac-learning-an-action-conditioned-world-model",
        "kind": "paragraph",
        "label": "Architecture.",
        "english": "The predictor network $P_{\\phi}(\\cdot)$ is a $\\sim$300M parameter transformer network with 24-layers, 16 heads, 1024 hidden dimension, and GELU activations. The action, end-effector state, and flattened feature maps input to the predictor are processed with separate learnable affine transformations to map them to the hidden dimension of the predictor. Similarly, the outputs of the last attention block of the predictor go through a learnable affine transformation to map them back to the embedding dimension of the encoder. We use our 3D-RoPE implementation to represent the spatiotemporal position of each video patch in the flattened feature map, while only applying the temporal rotary positional embeddings to the action and pose tokens. We use a block-causal attention pattern in the predictor so that each patch feature at a given time step can attend to the action, end-effector state, and other patch features from the same timestep, as well as those from previous time steps.",
        "chinese": "预测器 $P_{\\phi}(\\cdot)$ 是参数量 $\\sim$300M 的 Transformer，包含 24 层、16 个注意力头，隐藏维数为 1024，使用 GELU 激活。动作、末端执行器状态和展平后的特征图分别通过独立、可学习的仿射变换，映射到预测器隐藏维度；最后一层注意力输出也通过可学习仿射变换，映射回编码器嵌入维度。视频块在展平特征图中的时空位置用三维 RoPE 编码，动作 token 和位姿 token 则只使用时间轴的旋转位置嵌入。块因果注意力允许每个时间步的图像块特征关注同一步及此前各步的动作、末端执行器状态和其他图像块特征。",
        "evidenceKeys": [
          "S3.SS1.SSS0.Px3.p1.2"
        ]
      },
      {
        "id": "v-jepa-2-s3-ss2-sss0-px1-p1-7",
        "sectionId": "3-v-jepa-2-ac-learning-an-action-conditioned-world-model",
        "kind": "paragraph",
        "label": "Energy minimization.",
        "english": "Given an image of the goal state, we leverage V-JEPA 2-AC for downstream tasks by planning. Specifically, at each time step, we plan an action sequence for a fixed time horizon by minimizing a goal-conditioned energy function. We then execute the first action, observe the new state, and repeat the process. Let $s_{k}$ denote the current end-effector state, and $x_{k}$ and $x_{g}$ denote the current observed frame and goal image, respectively, which are separately encoded with the video encoder to obtain the feature maps $z_{k}$ and $z_{g}$. Given a planning horizon, $T$, we optimize a sequence of robot actions, $(a^{\\star}_{i})_{i\\in[T]}$, by minimizing a goal-conditioned energy function,",
        "chinese": "给定目标状态图像，我们通过规划将 V-JEPA 2-AC 用于下游任务。每个时间步，先最小化以目标为条件的能量函数，规划固定时域的动作序列；只执行第一个动作，观察新状态后重复。令 $s_{k}$ 为当前末端执行器状态，$x_{k}$ 和 $x_{g}$ 分别为当前观测帧与目标图像，独立编码后得到特征图 $z_{k}$、$z_{g}$。给定规划时域 $T$，通过最小化以下目标条件能量函数，优化动作序列 $(a^{\\star}_{i})_{i\\in[T]}$：",
        "evidenceKeys": [
          "S3.SS2.SSS0.Px1.p1.7"
        ]
      },
      {
        "id": "v-jepa-2-s3-e5",
        "sectionId": "3-v-jepa-2-ac-learning-an-action-conditioned-world-model",
        "kind": "equation",
        "label": "Energy minimization.",
        "english": "$$\n\\mathcal{E}(\\hat{a}_{1:T};\\ z_{k},s_{k},z_{g})\\coloneqq\\lVert P(\\hat{a}_{1:T};s_{k},z_{k})-z_{g}\\rVert_{1},\n$$\n\n (5)",
        "chinese": "公式（符号保持不变）：\n\n$$\n\\mathcal{E}(\\hat{a}_{1:T};\\ z_{k},s_{k},z_{g})\\coloneqq\\lVert P(\\hat{a}_{1:T};s_{k},z_{k})-z_{g}\\rVert_{1},\n$$\n\n (5)",
        "evidenceKeys": [
          "S3.E5"
        ]
      },
      {
        "id": "v-jepa-2-s3-ss2-sss0-px1-p1-10",
        "sectionId": "3-v-jepa-2-ac-learning-an-action-conditioned-world-model",
        "kind": "paragraph",
        "label": "Energy minimization.",
        "english": "such that $(a^{\\star}_{i})_{i\\in[T]}\\coloneqq\\text{argmin}_{\\hat{a}_{1:T}}\\ \\mathcal{E}(\\hat{a}_{1:T};\\ z_{k},s_{k},z_{g})$. As illustrated in Figure˜7, the model infers an action sequence $(a^{\\star}_{i})_{i\\in[T]}$ by selecting a trajectory that minimizes the L1 distance between the world model’s imagined state representation $T$ steps into the future and its goal representation. In practice, we minimize (5) in each planning step using the Cross-Entropy Method (Rubinstein, 1997), and only execute the first action on the robot before re-planning, as in receding horizon control.",
        "chinese": "即 $(a^{\\star}_{i})_{i\\in[T]}\\coloneqq\\text{argmin}_{\\hat{a}_{1:T}}\\ \\mathcal{E}(\\hat{a}_{1:T};\\ z_{k},s_{k},z_{g})$。如图 7 所示，模型选择这样一条轨迹来得到 $(a^{\\star}_{i})_{i\\in[T]}$：使世界模型想象的 $T$ 步后状态表示，与目标表示之间的 L1 距离最小。实际每次规划用交叉熵方法（Rubinstein, 1997）优化式（5），随后仅执行第一个动作，再重新规划，也就是滚动时域控制。",
        "evidenceKeys": [
          "S3.SS2.SSS0.Px1.p1.10"
        ]
      }
    ]
  },
  {
    "id": "4-planning-zero-shot-robot-control",
    "number": "4",
    "titleEn": "Planning: Zero-shot Robot Control",
    "titleZh": "规划：零样本机器人控制",
    "collapsedByDefault": false,
    "blocks": [
      {
        "id": "v-jepa-2-s4-p1-1",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "paragraph",
        "label": "4 Planning: Zero-shot Robot Control",
        "english": "In this section we demonstrate how V-JEPA 2-AC can be used to implement basic robot skills like reaching, grasping, and pick-and-place via model-predictive control. We focus on tasks with visual goal specification and show that V-JEPA 2-AC generalizes zero-shot to new environments.",
        "chinese": "本节展示 V-JEPA 2-AC 如何通过模型预测控制，实现到达、抓取和拾取放置等基本机器人技能。任务以视觉图像指定目标，我们考察模型能否零样本泛化到新环境。",
        "evidenceKeys": [
          "S4.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s4-f7",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "figure-caption",
        "label": "4 Planning: Zero-shot Robot Control",
        "english": "Figure 7: Planning. We plan an action sequence for a fixed time horizon $T$ by minimizing the L1 distance between the world model’s imagined state representation $T$ steps into the future and its goal representation. The L1 loss is optimized with respect to the actions $(a_{k})_{k\\in[T]}$ using the cross-entropy method (Rubinstein, 1997). Specifically, in each planning step, we sample the action coordinates at each point in the planning horizon from a sequence of Gaussian distributions initialized with zero mean and unit variance. The population statistics of the top-k actions trajectories are used to update the mean and variance of the Gaussian distributions. This process is repeated for several iterations before finally returning the mean of the sequence of Gaussians as the selected action trajectory.",
        "chinese": "图 7：规划。给定固定时域 $T$，通过最小化世界模型想象的 $T$ 步后状态表示与目标表示的 L1 距离，规划动作序列。交叉熵方法（Rubinstein, 1997）针对动作 $(a_{k})_{k\\in[T]}$ 优化该损失：每轮从一系列初始均值为零、方差为一的高斯分布中，采样各规划时间步的动作坐标；再用最优 top-k 条动作轨迹的群体统计量，更新这些高斯分布的均值与方差。重复多轮后，返回高斯分布序列的均值，作为选定动作轨迹。",
        "evidenceKeys": [
          "S4.F7"
        ],
        "imageSrc": "/papers/v-jepa-2/x12.webp",
        "imageAlt": "4 规划：零样本机器人控制"
      },
      {
        "id": "v-jepa-2-s4-ss1-sss0-px1-p1-1",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "paragraph",
        "label": "Baselines.",
        "english": "We compare the performance of V-JEPA 2-AC with two baselines, one vision-language-action model trained with behavior cloning, and one video generation-based world model.",
        "chinese": "我们比较 V-JEPA 2-AC 与两个基线：一个通过行为克隆训练的视觉—语言—动作模型，以及一个基于视频生成的世界模型。",
        "evidenceKeys": [
          "S4.SS1.SSS0.Px1.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s4-ss1-sss0-px1-p2-1",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "paragraph",
        "label": "Baselines.",
        "english": "The first baseline is based on the Octo video-language-action model that allows for goal-image conditioning (Octo Model Team et al., 2024). We start from the open-source weights of the octo-base-1.5 version of the model, which is pretrained on the Open-X Embodiment dataset containing over 1M trajectories.111In comparison, we train V-JEPA 2-AC on 23k trajectories from Droid, including successes and failures. We fine-tune the Octo model with behaviour cloning on the entire Droid dataset using hindsight relabeling (Andrychowicz et al., 2017; Ghosh et al., 2019) with image goals and end-effector states. In particular, we sample random segments of trajectories from the Droid dataset during training, and uniformly sample goal images up to 20 timesteps forward in the trajectory. We use the official open-source code for fine-tuning, including all standard Droid optimization hyperparameters, and leverage single side image view inputs at $256\\times 256$ resolution, a context of two previous frames, and a horizon of 4 future actions.",
        "chinese": "第一个基线为支持目标图像条件的 Octo 视频—语言—动作模型（Octo Model Team et al., 2024）。我们从 octo-base-1.5 开源权重开始，该模型已在超过 1M 条轨迹的 Open-X Embodiment 上预训练。〔原文脚注 1：相比之下，V-JEPA 2-AC 在 Droid 的 23k 条轨迹上训练，包括成功和失败。〕随后，在完整 Droid 上使用图像目标、末端执行器状态及事后重标注（Andrychowicz et al., 2017; Ghosh et al., 2019），通过行为克隆微调 Octo。训练时随机截取轨迹片段，并在往后最多 20 个时间步内均匀采样目标图像。微调使用官方开源代码与全部标准 Droid 优化超参数，输入为 $256\\times 256$ 的单侧视角图像，以上两帧为上下文，预测未来 4 个动作。",
        "evidenceKeys": [
          "S4.SS1.SSS0.Px1.p2.1"
        ]
      },
      {
        "id": "v-jepa-2-s4-ss1-sss0-px1-p3-1",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "paragraph",
        "label": "Baselines.",
        "english": "The second baseline we compare with is based on the Cosmos video generation model (Agarwal et al., 2025). We start with the open-source weights for the action-free Cosmos model (latent diffusion-7B with continuous tokenizer), which was trained on 20M hours of video, and we fine-tune the model on Droid using the officially-released action-conditioned fine-tuning code.222https://github.com/nvidia-cosmos/cosmos-predict1 To improve performance when training on Droid, we (i) lowered the learning rate to match that used in the video-conditioned Cosmos recipe, (ii) removed the dropout in the video conditioning to improve the training dynamics, and (iii) increased the noise level by a factor of $e^{2}$, as we observed that the model trained with a lower noise factor struggled to leverage the information in the conditioning frame. Although the Cosmos technical report (Agarwal et al., 2025) mentions using world models for planning or model-predictive control as a future application, to the best of our knowledge this is the first reported attempt using Cosmos models for robot control.",
        "chinese": "第二个基线采用 Cosmos 视频生成模型（Agarwal et al., 2025）。我们从不依赖动作的 Cosmos 开源权重开始，即采用连续 tokenizer 的 latent diffusion-7B，它已在 20M 小时视频上训练；再用官方动作条件微调代码在 Droid 上微调。〔原文脚注 2：https://github.com/nvidia-cosmos/cosmos-predict1。〕为改善 Droid 上的表现，我们：（i）降低学习率，使其与视频条件 Cosmos 方案一致；（ii）去掉视频条件中的 dropout，改善训练过程；（iii）将噪声水平提高 $e^{2}$ 倍，因为较低噪声系数训练的模型难以利用条件帧信息。Cosmos 技术报告（Agarwal et al., 2025）将规划和模型预测控制列为未来应用；据我们所知，本文是首次报告用 Cosmos 控制机器人的尝试。",
        "evidenceKeys": [
          "S4.SS1.SSS0.Px1.p3.1"
        ]
      },
      {
        "id": "v-jepa-2-s4-ss1-sss0-px2-p1-1",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "paragraph",
        "label": "Robot deployment.",
        "english": "All models are deployed zero-shot on Franka Emika Panda arms with RobotiQ grippers, located in two different labs, neither of which appears in the Droid dataset. Visual input is provided through an uncalibrated low-resolution monocular RGB camera. The robots use the same exact model weights and inference code, and similar low-level controllers based on operational space control. We use blocking control for both the V-JEPA 2-AC world model and Cosmos world model (i.e., the system waits for the last commanded action to be completed before sending a new action to the controller) and experiment with both blocking and non-blocking control for Octo, and report the best performance across the two options. When planning with V-JEPA 2-AC and Cosmos, we constrain each sampled action to the L1-Ball of radius $0.075$ centered at the origin, which corresponds to a maximum end-effector displacement of approximately 13 cm for each individual action, since large actions are relatively out-of-distribution for the models.",
        "chinese": "所有模型均零样本部署在两个实验室的 Franka Emika Panda 机械臂上，配 RobotiQ 夹爪；两处环境都未出现在 Droid 中。视觉输入来自未经标定的低分辨率单目 RGB 相机。两个实验室使用完全相同的模型权重和推理代码，以及类似的操作空间低层控制器。V-JEPA 2-AC 和 Cosmos 采用阻塞控制，即上一条动作指令完成后才发送新指令；Octo 则同时试验阻塞与非阻塞控制，并报告二者较好结果。由于大幅动作对模型而言较为分布外，V-JEPA 2-AC 和 Cosmos 规划时，将采样动作限制在以原点为中心、半径 $0.075$ 的 L1 球内；原文将其对应为单次动作末端位移最多约 13 cm。",
        "evidenceKeys": [
          "S4.SS1.SSS0.Px2.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s4-f8-panel-1",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "figure-caption",
        "label": "Robot deployment.",
        "english": "Figure 8: Single-Goal Reaching. Single-goal reaching involves moving the end-effector to a desired location in space based on a single goal image. This task measures for a basic understanding of actions as well as a 3D spatial understanding of the scene, including depth, from the monocular RGB camera. In each step, we use V-JEPA 2-AC to plan a sequence of actions by minimizing the L1 distance between the model’s imagined future state representations and its representation of the goal frame. The first action is then executed before re-planning in the next time step. During planning, we only sample individual actions in the L1-Ball of radius $0.075$ centered at the origin. Thus, the maximum achievable decrease in cartesian distance to the goal in a single step is $0.13$ ($\\sim$13 cm). (Panel 1/9)",
        "chinese": "图 8：单目标到达。根据单张目标图像，将末端执行器移至空间中的指定位置，考察模型对动作的基本理解，以及能否从单目 RGB 图像理解场景的三维空间关系（包括深度）。每步用 V-JEPA 2-AC 规划动作序列，使想象未来状态表示与目标帧表示的 L1 距离最小；执行第一个动作后，下一步重新规划。规划时，各动作只从以原点为中心、半径 $0.075$ 的 L1 球内采样，因此单步到目标的笛卡尔距离最多减少 $0.13$（$\\sim$13 cm）。（分图 1/9）",
        "evidenceKeys": [
          "S4.F8-panel-1"
        ],
        "imageSrc": "/papers/v-jepa-2/regret-x-start.webp",
        "imageAlt": "机器人部署。"
      },
      {
        "id": "v-jepa-2-s4-f8-panel-2",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "figure-caption",
        "label": "Robot deployment.",
        "english": "Figure 8: Single-Goal Reaching. Single-goal reaching involves moving the end-effector to a desired location in space based on a single goal image. This task measures for a basic understanding of actions as well as a 3D spatial understanding of the scene, including depth, from the monocular RGB camera. In each step, we use V-JEPA 2-AC to plan a sequence of actions by minimizing the L1 distance between the model’s imagined future state representations and its representation of the goal frame. The first action is then executed before re-planning in the next time step. During planning, we only sample individual actions in the L1-Ball of radius $0.075$ centered at the origin. Thus, the maximum achievable decrease in cartesian distance to the goal in a single step is $0.13$ ($\\sim$13 cm). (Panel 2/9)",
        "chinese": "图 8：单目标到达。根据单张目标图像，将末端执行器移至空间中的指定位置，考察模型对动作的基本理解，以及能否从单目 RGB 图像理解场景的三维空间关系（包括深度）。每步用 V-JEPA 2-AC 规划动作序列，使想象未来状态表示与目标帧表示的 L1 距离最小；执行第一个动作后，下一步重新规划。规划时，各动作只从以原点为中心、半径 $0.075$ 的 L1 球内采样，因此单步到目标的笛卡尔距离最多减少 $0.13$（$\\sim$13 cm）。（分图 2/9）",
        "evidenceKeys": [
          "S4.F8-panel-2"
        ],
        "imageSrc": "/papers/v-jepa-2/regret-x-goal.webp",
        "imageAlt": "机器人部署。"
      },
      {
        "id": "v-jepa-2-s4-f8-panel-3",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "figure-caption",
        "label": "Robot deployment.",
        "english": "Figure 8: Single-Goal Reaching. Single-goal reaching involves moving the end-effector to a desired location in space based on a single goal image. This task measures for a basic understanding of actions as well as a 3D spatial understanding of the scene, including depth, from the monocular RGB camera. In each step, we use V-JEPA 2-AC to plan a sequence of actions by minimizing the L1 distance between the model’s imagined future state representations and its representation of the goal frame. The first action is then executed before re-planning in the next time step. During planning, we only sample individual actions in the L1-Ball of radius $0.075$ centered at the origin. Thus, the maximum achievable decrease in cartesian distance to the goal in a single step is $0.13$ ($\\sim$13 cm). (Panel 3/9)",
        "chinese": "图 8：单目标到达。根据单张目标图像，将末端执行器移至空间中的指定位置，考察模型对动作的基本理解，以及能否从单目 RGB 图像理解场景的三维空间关系（包括深度）。每步用 V-JEPA 2-AC 规划动作序列，使想象未来状态表示与目标帧表示的 L1 距离最小；执行第一个动作后，下一步重新规划。规划时，各动作只从以原点为中心、半径 $0.075$ 的 L1 球内采样，因此单步到目标的笛卡尔距离最多减少 $0.13$（$\\sim$13 cm）。（分图 3/9）",
        "evidenceKeys": [
          "S4.F8-panel-3"
        ],
        "imageSrc": "/papers/v-jepa-2/x13.webp",
        "imageAlt": "机器人部署。"
      },
      {
        "id": "v-jepa-2-s4-f8-panel-4",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "figure-caption",
        "label": "Robot deployment.",
        "english": "Figure 8: Single-Goal Reaching. Single-goal reaching involves moving the end-effector to a desired location in space based on a single goal image. This task measures for a basic understanding of actions as well as a 3D spatial understanding of the scene, including depth, from the monocular RGB camera. In each step, we use V-JEPA 2-AC to plan a sequence of actions by minimizing the L1 distance between the model’s imagined future state representations and its representation of the goal frame. The first action is then executed before re-planning in the next time step. During planning, we only sample individual actions in the L1-Ball of radius $0.075$ centered at the origin. Thus, the maximum achievable decrease in cartesian distance to the goal in a single step is $0.13$ ($\\sim$13 cm). (Panel 4/9)",
        "chinese": "图 8：单目标到达。根据单张目标图像，将末端执行器移至空间中的指定位置，考察模型对动作的基本理解，以及能否从单目 RGB 图像理解场景的三维空间关系（包括深度）。每步用 V-JEPA 2-AC 规划动作序列，使想象未来状态表示与目标帧表示的 L1 距离最小；执行第一个动作后，下一步重新规划。规划时，各动作只从以原点为中心、半径 $0.075$ 的 L1 球内采样，因此单步到目标的笛卡尔距离最多减少 $0.13$（$\\sim$13 cm）。（分图 4/9）",
        "evidenceKeys": [
          "S4.F8-panel-4"
        ],
        "imageSrc": "/papers/v-jepa-2/regret-y-start.webp",
        "imageAlt": "机器人部署。"
      },
      {
        "id": "v-jepa-2-s4-f8-panel-5",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "figure-caption",
        "label": "Robot deployment.",
        "english": "Figure 8: Single-Goal Reaching. Single-goal reaching involves moving the end-effector to a desired location in space based on a single goal image. This task measures for a basic understanding of actions as well as a 3D spatial understanding of the scene, including depth, from the monocular RGB camera. In each step, we use V-JEPA 2-AC to plan a sequence of actions by minimizing the L1 distance between the model’s imagined future state representations and its representation of the goal frame. The first action is then executed before re-planning in the next time step. During planning, we only sample individual actions in the L1-Ball of radius $0.075$ centered at the origin. Thus, the maximum achievable decrease in cartesian distance to the goal in a single step is $0.13$ ($\\sim$13 cm). (Panel 5/9)",
        "chinese": "图 8：单目标到达。根据单张目标图像，将末端执行器移至空间中的指定位置，考察模型对动作的基本理解，以及能否从单目 RGB 图像理解场景的三维空间关系（包括深度）。每步用 V-JEPA 2-AC 规划动作序列，使想象未来状态表示与目标帧表示的 L1 距离最小；执行第一个动作后，下一步重新规划。规划时，各动作只从以原点为中心、半径 $0.075$ 的 L1 球内采样，因此单步到目标的笛卡尔距离最多减少 $0.13$（$\\sim$13 cm）。（分图 5/9）",
        "evidenceKeys": [
          "S4.F8-panel-5"
        ],
        "imageSrc": "/papers/v-jepa-2/regret-y-goal.webp",
        "imageAlt": "机器人部署。"
      },
      {
        "id": "v-jepa-2-s4-f8-panel-6",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "figure-caption",
        "label": "Robot deployment.",
        "english": "Figure 8: Single-Goal Reaching. Single-goal reaching involves moving the end-effector to a desired location in space based on a single goal image. This task measures for a basic understanding of actions as well as a 3D spatial understanding of the scene, including depth, from the monocular RGB camera. In each step, we use V-JEPA 2-AC to plan a sequence of actions by minimizing the L1 distance between the model’s imagined future state representations and its representation of the goal frame. The first action is then executed before re-planning in the next time step. During planning, we only sample individual actions in the L1-Ball of radius $0.075$ centered at the origin. Thus, the maximum achievable decrease in cartesian distance to the goal in a single step is $0.13$ ($\\sim$13 cm). (Panel 6/9)",
        "chinese": "图 8：单目标到达。根据单张目标图像，将末端执行器移至空间中的指定位置，考察模型对动作的基本理解，以及能否从单目 RGB 图像理解场景的三维空间关系（包括深度）。每步用 V-JEPA 2-AC 规划动作序列，使想象未来状态表示与目标帧表示的 L1 距离最小；执行第一个动作后，下一步重新规划。规划时，各动作只从以原点为中心、半径 $0.075$ 的 L1 球内采样，因此单步到目标的笛卡尔距离最多减少 $0.13$（$\\sim$13 cm）。（分图 6/9）",
        "evidenceKeys": [
          "S4.F8-panel-6"
        ],
        "imageSrc": "/papers/v-jepa-2/x14.webp",
        "imageAlt": "机器人部署。"
      },
      {
        "id": "v-jepa-2-s4-f8-panel-7",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "figure-caption",
        "label": "Robot deployment.",
        "english": "Figure 8: Single-Goal Reaching. Single-goal reaching involves moving the end-effector to a desired location in space based on a single goal image. This task measures for a basic understanding of actions as well as a 3D spatial understanding of the scene, including depth, from the monocular RGB camera. In each step, we use V-JEPA 2-AC to plan a sequence of actions by minimizing the L1 distance between the model’s imagined future state representations and its representation of the goal frame. The first action is then executed before re-planning in the next time step. During planning, we only sample individual actions in the L1-Ball of radius $0.075$ centered at the origin. Thus, the maximum achievable decrease in cartesian distance to the goal in a single step is $0.13$ ($\\sim$13 cm). (Panel 7/9)",
        "chinese": "图 8：单目标到达。根据单张目标图像，将末端执行器移至空间中的指定位置，考察模型对动作的基本理解，以及能否从单目 RGB 图像理解场景的三维空间关系（包括深度）。每步用 V-JEPA 2-AC 规划动作序列，使想象未来状态表示与目标帧表示的 L1 距离最小；执行第一个动作后，下一步重新规划。规划时，各动作只从以原点为中心、半径 $0.075$ 的 L1 球内采样，因此单步到目标的笛卡尔距离最多减少 $0.13$（$\\sim$13 cm）。（分图 7/9）",
        "evidenceKeys": [
          "S4.F8-panel-7"
        ],
        "imageSrc": "/papers/v-jepa-2/regret-z-start.webp",
        "imageAlt": "机器人部署。"
      },
      {
        "id": "v-jepa-2-s4-f8-panel-8",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "figure-caption",
        "label": "Robot deployment.",
        "english": "Figure 8: Single-Goal Reaching. Single-goal reaching involves moving the end-effector to a desired location in space based on a single goal image. This task measures for a basic understanding of actions as well as a 3D spatial understanding of the scene, including depth, from the monocular RGB camera. In each step, we use V-JEPA 2-AC to plan a sequence of actions by minimizing the L1 distance between the model’s imagined future state representations and its representation of the goal frame. The first action is then executed before re-planning in the next time step. During planning, we only sample individual actions in the L1-Ball of radius $0.075$ centered at the origin. Thus, the maximum achievable decrease in cartesian distance to the goal in a single step is $0.13$ ($\\sim$13 cm). (Panel 8/9)",
        "chinese": "图 8：单目标到达。根据单张目标图像，将末端执行器移至空间中的指定位置，考察模型对动作的基本理解，以及能否从单目 RGB 图像理解场景的三维空间关系（包括深度）。每步用 V-JEPA 2-AC 规划动作序列，使想象未来状态表示与目标帧表示的 L1 距离最小；执行第一个动作后，下一步重新规划。规划时，各动作只从以原点为中心、半径 $0.075$ 的 L1 球内采样，因此单步到目标的笛卡尔距离最多减少 $0.13$（$\\sim$13 cm）。（分图 8/9）",
        "evidenceKeys": [
          "S4.F8-panel-8"
        ],
        "imageSrc": "/papers/v-jepa-2/regret-z-goal.webp",
        "imageAlt": "机器人部署。"
      },
      {
        "id": "v-jepa-2-s4-f8-panel-9",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "figure-caption",
        "label": "Robot deployment.",
        "english": "Figure 8: Single-Goal Reaching. Single-goal reaching involves moving the end-effector to a desired location in space based on a single goal image. This task measures for a basic understanding of actions as well as a 3D spatial understanding of the scene, including depth, from the monocular RGB camera. In each step, we use V-JEPA 2-AC to plan a sequence of actions by minimizing the L1 distance between the model’s imagined future state representations and its representation of the goal frame. The first action is then executed before re-planning in the next time step. During planning, we only sample individual actions in the L1-Ball of radius $0.075$ centered at the origin. Thus, the maximum achievable decrease in cartesian distance to the goal in a single step is $0.13$ ($\\sim$13 cm). (Panel 9/9)",
        "chinese": "图 8：单目标到达。根据单张目标图像，将末端执行器移至空间中的指定位置，考察模型对动作的基本理解，以及能否从单目 RGB 图像理解场景的三维空间关系（包括深度）。每步用 V-JEPA 2-AC 规划动作序列，使想象未来状态表示与目标帧表示的 L1 距离最小；执行第一个动作后，下一步重新规划。规划时，各动作只从以原点为中心、半径 $0.075$ 的 L1 球内采样，因此单步到目标的笛卡尔距离最多减少 $0.13$（$\\sim$13 cm）。（分图 9/9）",
        "evidenceKeys": [
          "S4.F8-panel-9"
        ],
        "imageSrc": "/papers/v-jepa-2/x15.webp",
        "imageAlt": "机器人部署。"
      },
      {
        "id": "v-jepa-2-s4-ss2-sss0-px1-p1-1",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "paragraph",
        "label": "Single-goal reaching.",
        "english": "First, we evaluate on the task of single-goal reaching, which involves moving the end-effector to a desired location in space based on a single goal image. This task measures for a basic understanding of actions as well as a 3D spatial understanding of the scene (including depth) from the monocular RGB camera.",
        "chinese": "首先评估单目标到达：根据一张目标图像，将末端执行器移至指定空间位置。这考察模型对动作的基本理解，以及从单目 RGB 图像理解三维场景（包括深度）的能力。",
        "evidenceKeys": [
          "S4.SS2.SSS0.Px1.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s4-ss2-sss0-px1-p2-1",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "paragraph",
        "label": "Single-goal reaching.",
        "english": "Figure˜8 shows the Euclidean distance between the end-effector and its goal position during robot execution for three different single-goal reaching tasks. In all cases, the model is able to move the end-effector within less than 4 cm of its goal position, and select actions that lead to a monotonic decrease in the error. This can be seen as a form of visual servoing (Hill, 1979), wherein visual feedback from a camera is used to control a robot’s motion. However, unlike classical approaches in visual servoing, V-JEPA 2-AC achieves this by training on unlabeled, real-world video data.",
        "chinese": "图 8 给出三个单目标到达任务执行过程中，末端执行器与目标位置的欧氏距离。所有情况下，模型都能将末端移动至距目标不足 4 cm，并选出使误差单调下降的动作。这可以视为视觉伺服（Hill, 1979）：用相机视觉反馈控制机器人运动。但与经典视觉伺服不同，V-JEPA 2-AC 通过无标注真实视频训练获得该能力。",
        "evidenceKeys": [
          "S4.SS2.SSS0.Px1.p2.1"
        ]
      },
      {
        "id": "v-jepa-2-s4-ss2-sss0-px1-p3-4",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "paragraph",
        "label": "Single-goal reaching.",
        "english": "In Figure˜9, we visualize the V-JEPA 2-AC energy landscape from equation (5) for the $\\Delta y$ reaching task as a function of a single cartesian-control action, sweeping $\\Delta x$ and $\\Delta y$ while holding $\\Delta z=0$ fixed. The energy function achieves its minimum near the ground-truth action, providing further evidence that the model has learned to reasonably infer the effect of actions without requiring precision sensing. It is also interesting to observe that the energy landscape induced by V-JEPA 2-AC is relatively smooth and locally convex, which should facilitate planning.",
        "chinese": "图 9 展示 $\\Delta y$ 到达任务中式（5）的能量曲面：固定 $\\Delta z=0$，扫描单次笛卡尔控制动作的 $\\Delta x$、$\\Delta y$。能量在真实动作附近最小，进一步说明模型无需精密传感，也能较合理地推断动作效果。该能量曲面还相对平滑、局部凸，理论上有利于规划。",
        "evidenceKeys": [
          "S4.SS2.SSS0.Px1.p3.4"
        ]
      },
      {
        "id": "v-jepa-2-s4-f9",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "figure-caption",
        "label": "Single-goal reaching.",
        "english": "Figure 9: V-JEPA 2-AC Energy Landscape. Energy landscape for single-goal reaching task with respect to end-effector cartesian-control action (sweeping $\\Delta x$ and $\\Delta y$ while holding $\\Delta z=0$ fixed); ground truth action relating goal image to start frame is located at $(\\Delta x,\\Delta y)=(0,-0.1)$. We see that the energy function achieves its minimum around $(\\Delta x,\\Delta y)\\approx(0,-0.05)$, indicating that the model has learned to reasonably infer the effect of actions without requiring precision sensing.",
        "chinese": "图 9：V-JEPA 2-AC 的能量曲面。单目标到达任务中，固定 $\\Delta z=0$，扫描末端执行器笛卡尔动作的 $\\Delta x$、$\\Delta y$。起始帧到目标图像对应的真实动作位于 $(\\Delta x,\\Delta y)=(0,-0.1)$，模型能量函数在 $(\\Delta x,\\Delta y)\\approx(0,-0.05)$ 附近最小，说明它无需精密传感，也已能较合理地推断动作效果。",
        "evidenceKeys": [
          "S4.F9"
        ],
        "imageSrc": "/papers/v-jepa-2/x16.webp",
        "imageAlt": "单一目标达成。"
      },
      {
        "id": "v-jepa-2-s4-ss2-sss0-px2-p1-1",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "paragraph",
        "label": "Prehensile manipulation.",
        "english": "Next, we evaluate all models on more challenging prehensile object manipulation tasks, namely grasp, reach with object, and pick-and-place. Success rates are reported in Table˜2 and Table˜3, and averaged across 10 trials with various permutations to the task across trials (e.g., object location, starting pose, etc.). For the grasp and reach with object tasks the model is shown a single goal image. For the pick-and-place tasks we present two sub-goal images to the model in addition to the final goal. The first goal image shows the object being grasped, the second goal image shows the object in the vicinity of the goal position. The model first optimizes actions with respect to the first sub-goal for 4 time-steps before automatically switching to the second sub-goal for the next 10 time-steps, and finally the third goal for the last 4 time-steps. Examples of robot execution for the pick-and-place task are shown in Figure˜10. Start and goal frames for all individual tasks in Lab 1 are shown in Section˜11.2. The grasp task requires precise control from visual feedback to correctly grip the object. The reach with object task requires the model to navigate while holding an object, which necessitates a basic understanding of intuitive physics to avoid dropping the object. Finally, the pick-and-place task tests for the ability to compose these atomic skills.",
        "chinese": "接着评估更难的抓持类操作：抓取、持物到达和拾取放置。表 2、表 3 报告各任务 10 次测试的平均成功率，测试间改变物体位置、起始姿态等配置。抓取与持物到达只提供一张目标图像。拾取放置除最终目标外，还提供两张子目标图像：第一张表示物体已被抓住，第二张表示已移动到目标位置附近。模型先针对第一子目标优化动作 4 步，再自动切换到第二子目标执行 10 步，最后针对第三目标执行 4 步。拾取放置执行示例见图 10，实验室 1 各任务起始与目标帧见第 11.2 节。抓取要求模型依据视觉反馈精确控制夹爪；持物到达要求在移动时保持抓持，需要基本的直觉物理理解，以免物体掉落；拾取放置则考察这些原子技能的组合能力。",
        "evidenceKeys": [
          "S4.SS2.SSS0.Px2.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s4-ss2-sss0-px2-p2-1",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "paragraph",
        "label": "Prehensile manipulation.",
        "english": "While all models achieve a high success-rate on reach, differences in performance are more apparent on tasks involving object interaction. We observe that the success-rate for all models depends on the type of object being manipulated. For instance, we find that the cup is mostly easily grasped by placing one finger inside the object and gripping around the rim, however if the control actions produced by the model are not accurate enough, the robot will miss the rim of the cup and fail to grasp the object. When manipulating the box, there are many more feasible grasping configurations, however, the model requires more precise gripper control to ensure that the fingers are open wide enough to grasp the object. We see that, for all models, the variation in success-rate with respect to the object type is due to the combination of sub-optimal actions and the unique challenges associated with manipulating each respective object. Nonetheless, we see that the V-JEPA 2-AC model achieves the highest success-rate across all tasks, highlighting the feasibility of latent planning for robot manipulation.",
        "chinese": "所有模型在到达任务上成功率都很高，但一旦涉及物体交互，差距就更明显。各模型的成功率也随物体类型变化。例如，抓杯子通常较容易的方式，是将一指伸入杯内，夹住杯沿；但控制不够准确时，会错过杯沿而抓取失败。盒子有更多可行的抓取姿态，却要求更精确地控制夹爪张开幅度，确保足够宽。对所有模型，物体间成功率差异都来自次优动作与各物体特有操作难点的共同影响。总体而言，V-JEPA 2-AC 在各任务上成功率最高，表明潜空间规划用于机器人操作是可行的。",
        "evidenceKeys": [
          "S4.SS2.SSS0.Px2.p2.1"
        ]
      },
      {
        "id": "v-jepa-2-s4-ss2-sss0-px2-p3-1",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "paragraph",
        "label": "Prehensile manipulation.",
        "english": "In Table˜3, we compare planning performance when using V-JEPA 2-AC versus the Cosmos action-conditioned video generation model based on latent diffusion. In both cases we leverage the cross-entropy method (Rubinstein, 1997) for optimizing the sequence of actions using a single NVIDIA RTX 4090 GPU, and construct the energy function by encoding the goal frame in the latent space of the model, as in equation (5). With 80 samples, 10 refinement steps, and a planning horizon of 1, it takes 4 minutes to compute a single action in each planning step with Cosmos. While we achieve a high success rate of 80% on the reach tasks when using Cosmos, performance on object interaction tasks is weaker. Note that under a planning time of 4 minutes per action, a full pick & place trajectory requires over one hour of robot execution. By contrast, with 10$\\times$ more samples in each refinement step, the V-JEPA 2-AC world model requires only 16 seconds per action and leads to higher performance across all considered robot skills. We can potentially reduce the planning time for both models in future work by leveraging additional computing resources for planning, reducing the number of samples and refinement steps used at each time step, training a feed-froward policy in the world-models’ imagination to initialize the planning problem, or potentially leveraging gradient-based planning in the case of V-JEPA 2-AC.",
        "chinese": "表 3 比较 V-JEPA 2-AC 与基于潜在扩散的动作条件 Cosmos 视频生成模型的规划表现。两者都使用单张 NVIDIA RTX 4090，以交叉熵方法（Rubinstein, 1997）优化动作序列，并按式（5）将目标帧编码到各自潜空间来构造能量函数。Cosmos 在 80 个样本、10 次细化、规划时域为 1 的设置下，每次规划一个动作需要 4 分钟。其到达成功率为 80%，但物体交互任务较弱；按每动作 4 分钟计算，完整拾取放置轨迹耗时超过一小时。相比之下，V-JEPA 2-AC 每轮细化的样本多 10$\\times$，每动作仍只需 16 秒，且所有考察技能都取得更高表现。未来可通过增加规划算力、减少各步样本和细化次数、在世界模型想象中训练前馈策略以初始化规划，或对 V-JEPA 2-AC 使用梯度规划，进一步缩短两者耗时。",
        "evidenceKeys": [
          "S4.SS2.SSS0.Px2.p3.1"
        ]
      },
      {
        "id": "v-jepa-2-s4-f10-panel-1",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "figure-caption",
        "label": "Prehensile manipulation.",
        "english": "Figure 10: Pick-&-Place. Closed-loop robot execution of V-JEPA 2-AC for multi-goal pick-&-place tasks. Highlighted frames indicate when the model achieves a sub-goal and switches to the next goal. The first goal image shows the object being grasped, the second goal image shows the object in the vicinity of the desired location, and the third goal image shows the object placed in the desired position. The model first optimizes actions with respect to the first sub-goal for 4 time-steps before automatically switching to the second sub-goal for the next 10 time-steps, and finally the third goal for the last 4 time-steps. Robot actions are inferred through goal-conditioned planning. The V-JEPA 2-AC model is able to perform zero-shot pick-&-place tasks on two Franka arms in different labs, with various object configurations and cluttered environments. (Panel 1/3)",
        "chinese": "图 10：拾取放置。V-JEPA 2-AC 以闭环方式执行多目标拾取放置任务，高亮帧标明达到子目标、切换到下一目标的时刻。第一张目标图像表示物体已被抓住，第二张表示物体已到达目标位置附近，第三张表示物体已放到指定位置。模型先针对第一子目标优化动作 4 步，再自动切换到第二子目标执行 10 步，最后针对第三目标执行 4 步。机器人动作通过目标条件规划获得。V-JEPA 2-AC 能在不同实验室的两台 Franka 机械臂上，面对多种物体布局和杂乱环境，零样本完成拾取放置。（分图 1/3）",
        "evidenceKeys": [
          "S4.F10-panel-1"
        ],
        "imageSrc": "/papers/v-jepa-2/traj-pnp-0.webp",
        "imageAlt": "预先操纵。"
      },
      {
        "id": "v-jepa-2-s4-f10-panel-2",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "figure-caption",
        "label": "Prehensile manipulation.",
        "english": "Figure 10: Pick-&-Place. Closed-loop robot execution of V-JEPA 2-AC for multi-goal pick-&-place tasks. Highlighted frames indicate when the model achieves a sub-goal and switches to the next goal. The first goal image shows the object being grasped, the second goal image shows the object in the vicinity of the desired location, and the third goal image shows the object placed in the desired position. The model first optimizes actions with respect to the first sub-goal for 4 time-steps before automatically switching to the second sub-goal for the next 10 time-steps, and finally the third goal for the last 4 time-steps. Robot actions are inferred through goal-conditioned planning. The V-JEPA 2-AC model is able to perform zero-shot pick-&-place tasks on two Franka arms in different labs, with various object configurations and cluttered environments. (Panel 2/3)",
        "chinese": "图 10：拾取放置。V-JEPA 2-AC 以闭环方式执行多目标拾取放置任务，高亮帧标明达到子目标、切换到下一目标的时刻。第一张目标图像表示物体已被抓住，第二张表示物体已到达目标位置附近，第三张表示物体已放到指定位置。模型先针对第一子目标优化动作 4 步，再自动切换到第二子目标执行 10 步，最后针对第三目标执行 4 步。机器人动作通过目标条件规划获得。V-JEPA 2-AC 能在不同实验室的两台 Franka 机械臂上，面对多种物体布局和杂乱环境，零样本完成拾取放置。（分图 2/3）",
        "evidenceKeys": [
          "S4.F10-panel-2"
        ],
        "imageSrc": "/papers/v-jepa-2/traj-pnp-2.webp",
        "imageAlt": "预先操纵。"
      },
      {
        "id": "v-jepa-2-s4-f10-panel-3",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "figure-caption",
        "label": "Prehensile manipulation.",
        "english": "Figure 10: Pick-&-Place. Closed-loop robot execution of V-JEPA 2-AC for multi-goal pick-&-place tasks. Highlighted frames indicate when the model achieves a sub-goal and switches to the next goal. The first goal image shows the object being grasped, the second goal image shows the object in the vicinity of the desired location, and the third goal image shows the object placed in the desired position. The model first optimizes actions with respect to the first sub-goal for 4 time-steps before automatically switching to the second sub-goal for the next 10 time-steps, and finally the third goal for the last 4 time-steps. Robot actions are inferred through goal-conditioned planning. The V-JEPA 2-AC model is able to perform zero-shot pick-&-place tasks on two Franka arms in different labs, with various object configurations and cluttered environments. (Panel 3/3)",
        "chinese": "图 10：拾取放置。V-JEPA 2-AC 以闭环方式执行多目标拾取放置任务，高亮帧标明达到子目标、切换到下一目标的时刻。第一张目标图像表示物体已被抓住，第二张表示物体已到达目标位置附近，第三张表示物体已放到指定位置。模型先针对第一子目标优化动作 4 步，再自动切换到第二子目标执行 10 步，最后针对第三目标执行 4 步。机器人动作通过目标条件规划获得。V-JEPA 2-AC 能在不同实验室的两台 Franka 机械臂上，面对多种物体布局和杂乱环境，零样本完成拾取放置。（分图 3/3）",
        "evidenceKeys": [
          "S4.F10-panel-3"
        ],
        "imageSrc": "/papers/v-jepa-2/traj-pnp-1.webp",
        "imageAlt": "预先操纵。"
      },
      {
        "id": "v-jepa-2-s4-t2",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "table",
        "label": "Prehensile manipulation.",
        "english": "**Table 2: Zero-Shot Robot Manipulation. All models are deployed zero-shot on two Franka arms with RobotiQ grippers located in different labs. Given image-goals for each considered task, all models run closed loop to infer a sequence of actions to achieve the goal. Success rates are reported out of 10 trials with various permutations to the task across trials (e.g., object location, starting pose, etc.).**\n\n|  |  |  | Grasp | Reach w/ Obj. | Pick-&-Place |  |  |  |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| Method |  | Reach | Cup | Box | Cup | Box | Cup | Box |\n| Octo (Octo Model Team et al., 2024) | Lab 1 | 100% | 20% | 0% | 20% | 70% | 20% | 10% |\n| Lab 2 | 100% | 10% | 0% | 10% | 70% | 10% | 10% |  |\n| Avg | 100% | 15% | 0% | 15% | 70% | 15% | 10% |  |\n| V-JEPA 2-AC (ours) | Lab 1 | 100% | 70% | 30% | 90% | 80% | 80% | 80% |\n| Lab 2 | 100% | 60% | 20% | 60% | 70% | 80% | 50% |  |\n| Avg | 100% | 65% | 25% | 75% | 75% | 80% | 65% |  |",
        "chinese": "**表 2：零样本机器人操作。模型部署在两个不同实验室、配 RobotiQ 夹爪的 Franka 机械臂上。给定任务目标图像，模型闭环推断达成目标的动作序列。各成功率基于 10 次测试，测试间改变物体位置、起始姿态等配置。**\n\n| 方法 | 实验室 | 到达 | 抓取：杯子 | 抓取：盒子 | 持物到达：杯子 | 持物到达：盒子 | 拾取放置：杯子 | 拾取放置：盒子 |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| Octo（Octo Model Team et al., 2024） | Lab 1 | 100% | 20% | 0% | 20% | 70% | 20% | 10% |\n| Octo | Lab 2 | 100% | 10% | 0% | 10% | 70% | 10% | 10% |\n| Octo | 平均 | 100% | 15% | 0% | 15% | 70% | 15% | 10% |\n| V-JEPA 2-AC（本文） | Lab 1 | 100% | 70% | 30% | 90% | 80% | 80% | 80% |\n| V-JEPA 2-AC | Lab 2 | 100% | 60% | 20% | 60% | 70% | 80% | 50% |\n| V-JEPA 2-AC | 平均 | 100% | 65% | 25% | 75% | 75% | 80% | 65% |",
        "evidenceKeys": [
          "S4.T2"
        ]
      },
      {
        "id": "v-jepa-2-s4-t3",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "table",
        "label": "Prehensile manipulation.",
        "english": "**Table 3: Planning Performance. Comparing closed-loop robot manipulation using MPC with V-JEPA 2-AC world model and Cosmos world model. In both cases we leverage the cross-entropy method (Rubinstein, 1997) for optimizing the sequence of actions using a single NVIDIA RTX 4090 GPU. For each robot skill, we evaluate each model across 10 tasks and average the results. With 80 samples, 10 refinement steps, and a planning horizon of 1, it takes 4 minutes to compute a single action in each planning step with Cosmos, which is an action-conditioned video generation model based on latent diffusion. Note that under a planning time of 4 minutes per action, a full pick & place trajectory takes over one hour. By contrast, with 10$\\times$ more samples in each refinement step, the V-JEPA 2-AC world model requires only 16 seconds per action and leads to higher performance across all considered robot skills.**\n\n| Lab 2 | Planning Details |  | Grasp | Pick-&-Place |  |  |  |  |  |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| Method | #Samples | Iter. | Horizon | Time | Reach | Cup | Box | Cup | Box |\n| Cosmos (Agarwal et al., 2025) | 80 | 10 | 1 | 4 min. | 80% | 0% | 20% | 0% | 0% |\n| V-JEPA 2-AC (ours) | 800 | 10 | 1 | 16 sec. | 100% | 60% | 20% | 80% | 50% |",
        "chinese": "**表 3：规划表现。比较使用 V-JEPA 2-AC 和 Cosmos 世界模型进行 MPC 闭环操作。两者都在单张 NVIDIA RTX 4090 上用交叉熵方法（Rubinstein, 1997）优化动作序列；每项技能评估 10 个任务后取平均。Cosmos 是基于潜在扩散的动作条件视频生成模型，在 80 个样本、10 轮细化、规划时域 1 的设置下，每动作需 4 分钟，因此完整拾取放置超过一小时。V-JEPA 2-AC 每轮使用多 10$\\times$ 的样本，每动作仅需 16 秒，并在所考察的技能上取得更高表现。**\n\n| 方法（Lab 2） | 样本数 | 细化轮数 | 规划时域 | 每动作耗时 | 到达 | 抓取：杯子 | 抓取：盒子 | 拾取放置：杯子 | 拾取放置：盒子 |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| Cosmos（Agarwal et al., 2025） | 80 | 10 | 1 | 4 min. | 80% | 0% | 20% | 0% | 0% |\n| V-JEPA 2-AC（本文） | 800 | 10 | 1 | 16 sec. | 100% | 60% | 20% | 80% | 50% |",
        "evidenceKeys": [
          "S4.T3"
        ]
      },
      {
        "id": "v-jepa-2-s4-ss3-sss0-px1-p1-1",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "paragraph",
        "label": "Sensitivity to camera positioning.",
        "english": "Since the V-JEPA 2-AC model is trained to predict representations of the next video frame given an end-effector Cartesian control action, without any explicit camera calibration, it must therefore implicitly infer the action coordinate axis from the monocular RGB camera input. However, in many cases, the robot base is not visible in the camera frame, and thus the problem of inferring the action coordinate axis is not well defined, leading to errors in the world model. In practice, we manually tried different camera positions before settling on one that worked well across all of our experiments. We conduct a quantitative analysis of the V-JEPA 2-AC world model’s sensitivity to camera position in Section˜11.4.",
        "chinese": "V-JEPA 2-AC 根据末端执行器笛卡尔动作预测下一帧表示，却没有显式相机标定，因此必须从单目 RGB 输入中隐式推断动作坐标轴。但许多画面看不到机器人基座，此时坐标轴推断本身就不充分确定，容易导致世界模型出错。实际实验中，我们人工尝试了不同相机位置，最终选取一个在所有实验上都较好用的位置。第 11.4 节定量分析了模型对相机位置的敏感性。",
        "evidenceKeys": [
          "S4.SS3.SSS0.Px1.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s4-ss3-sss0-px2-p1-1",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "paragraph",
        "label": "Long horizon planning.",
        "english": "Long horizon planning with world models is limited by a number of factors. First, autoregressive prediction suffers from error accumulation: the accuracy of the representation-space predictions decreases with longer autoregressive rollouts, thereby making it more difficult to reliably plan over long horizons. Second, long-horizon planning increases the size of the search space: the number of possible action trajectories increases exponentially given a linear increase in the planning horizon, thereby making it computationally challenging to plan over long horizons. On the other hand, long-horizon planning is necessary for solving non-greedy prediction tasks, e.g., pick-and-place without image sub-goals. Future work exploring world models for long-horizon planning will enable the solution of many more complex and interesting tasks.",
        "chinese": "世界模型的长时域规划受到多种限制。第一，自回归预测会累积误差：展开越长，表示空间预测越不准确，越难可靠规划。第二，时域加长会扩大搜索空间：规划长度线性增加，可能的动作轨迹数量却指数增长，计算因而困难。另一方面，无法靠贪心决策解决的任务，例如没有图像子目标的拾取放置，又需要长时域规划。未来研究这一方向，有望处理更多复杂而有意义的任务。",
        "evidenceKeys": [
          "S4.SS3.SSS0.Px2.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s4-ss3-sss0-px3-p1-1",
        "sectionId": "4-planning-zero-shot-robot-control",
        "kind": "paragraph",
        "label": "Image goals.",
        "english": "Following many previous works in goal-conditioned robot manipulation (Finn and Levine, 2017; Lynch et al., 2020; Chebotar et al., 2021; Jang et al., 2022; Liu et al., 2022; Gupta et al., 2022), our current formulation of the optimization target assumes that we have access to visual goals. However, when deploying robots in-the-wild, it may be more natural to express goals in other forms, such as with language. Future work that aligns latent action-conditioned world models with language models will step towards more general task specification via natural language.",
        "chinese": "与许多目标条件机器人操作工作一样（Finn and Levine, 2017; Lynch et al., 2020; Chebotar et al., 2021; Jang et al., 2022; Liu et al., 2022; Gupta et al., 2022），当前优化目标假定能够获得视觉目标。但机器人在开放真实环境中部署时，用语言等其他形式表达目标可能更自然。未来将潜空间动作条件世界模型与语言模型对齐，有望支持更通用的自然语言任务指定方式。",
        "evidenceKeys": [
          "S4.SS3.SSS0.Px3.p1.1"
        ]
      }
    ]
  },
  {
    "id": "5-understanding-probe-based-classification",
    "number": "5",
    "titleEn": "Understanding: Probe-based Classification",
    "titleZh": "理解：探针分类",
    "collapsedByDefault": false,
    "blocks": [
      {
        "id": "v-jepa-2-s5-p1-1",
        "sectionId": "5-understanding-probe-based-classification",
        "kind": "paragraph",
        "label": "5 Understanding: Probe-based Classification",
        "english": "The capabilities of a representation-space world model, such as V-JEPA 2-AC discussed above, are inherently limited by the state information encoded in the learned representation space. In this section and subsequent sections, we probe the representations learned by V-JEPA 2 and compare the V-JEPA 2 encoder to other vision encoders on visual classification.",
        "chinese": "像前述 V-JEPA 2-AC 这样的表示空间世界模型，其能力根本上受限于表示中编码了哪些状态信息。本节及后续章节用探针检验 V-JEPA 2 的表示，并在视觉分类上与其他视觉编码器比较。",
        "evidenceKeys": [
          "S5.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s5-p2-1",
        "sectionId": "5-understanding-probe-based-classification",
        "kind": "paragraph",
        "label": "5 Understanding: Probe-based Classification",
        "english": "Visual classification tasks can focus either on appearance understanding or motion understanding. While appearance understanding tasks can generally be solved using information visible in a single frame of an input video clip (even when the classification labels describe actions), motion understanding tasks require several frames to correctly classify a video (Goyal et al., 2017). To ensure a balanced evaluation of both motion and appearance, we have selected three motion understanding tasks, namely Something-Something v2 (SSv2), Diving-48, and Jester, which require the model to understand human gestures and movements. For appearance understanding, we have chosen Kinetics400 (K400), COIN, and ImageNet (IN1K), which involve recognizing actions, scenes, and objects. Empirically, we show that V-JEPA 2 outperforms state-of-the-art visual encoders on motion understanding tasks, while being competitive on appearance understanding tasks.",
        "chinese": "视觉分类可以侧重外观，也可以侧重运动。外观任务通常仅凭单帧可见信息就能完成，即使类别标签描述的是动作；运动任务则需要结合多帧才能正确分类（Goyal et al., 2017）。为均衡评估，我们选择三个要求理解人类手势与运动的任务：Something-Something v2（SSv2）、Diving-48、Jester；再选 Kinetics400（K400）、COIN 和 ImageNet（IN1K），考察动作、场景与物体的外观识别。实验表明，V-JEPA 2 在运动理解上优于先进视觉编码器，在外观理解上也具有竞争力。",
        "evidenceKeys": [
          "S5.p2.1"
        ]
      },
      {
        "id": "v-jepa-2-s5-ss0-sss0-px1-p1-1",
        "sectionId": "5-understanding-probe-based-classification",
        "kind": "paragraph",
        "label": "Attentive Probe.",
        "english": "We train an 4-layers attentive probe on top of the frozen encoder output using the training data from each task. Our attentive probe is composed of four transformer blocks, the last of which replaces standard self-attention with a cross-attention layer using a learnable query token. Following standard practice, several clips with a fixed number of frames are sampled from a video during inference. The classification logits are then averaged across clips. We keep the resolution similar to the one used for V-JEPA 2 pretraining. We ablate the number of layers of our attentive probe in Section˜12.2, and also provide full details on the number of clips, clip size, and other hyperparameters used in the downstream tasks.",
        "chinese": "使用各任务训练数据，在冻结编码器输出之上训练四层注意力探针。探针由四个 Transformer 块组成，最后一块将标准自注意力替换为交叉注意力，并使用可学习查询 token。按常规评估方式，推理时从每个视频采样多个固定帧数的片段，再平均各片段的分类 logits。输入分辨率与预训练大致一致。第 12.2 节消融探针层数，并给出下游任务的片段数量、长度及其他超参数细节。",
        "evidenceKeys": [
          "S5.SS0.SSS0.Px1.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s5-t4",
        "sectionId": "5-understanding-probe-based-classification",
        "kind": "table",
        "label": "Attentive Probe.",
        "english": "**Table 4: Action and Object Classification. We report the classification performance of V-JEPA 2 models pretrained on 64 frames at resolution $256\\times 256$ for all models, except V-JEPA 2 ViT-g384 which was pretrained at resolution $384\\times 384$, on action and object classification, and compare their performance with state-of-art image and video encoders. All models follow the same evaluation protocol except for V-JEPA 2 ViT-g384. We use $256\\times 256$ resolution with $16\\times 2\\times 3$ inputs for SSv2 (16 frames clip, 2 temporal crops, 3 spatial crops), $16\\times 8\\times 3$ for K400, $32\\times 8\\times 3$ for COIN and $32\\times 4\\times 3$ for Diving-48 and Jester. V-JEPA 2 ViT-g384 uses a higher resolution of $384\\times 384$ for all six tasks, and additionally uses $64\\times 2\\times 3$ inputs for SSv2 and 32x8x3 inputs for COIN. Our V-JEPA 2 ViT-g significantly outperforms other vision encoders on motion understanding tasks and is competitive on appearance tasks. It achieves the best average performance of $87.5$ across all image and videos encoders. V-JEPA 2 ViT-g384 further improves results consistently across tasks, reaching $88.2$ average performance. $*$: PEcoreG achieves an accuracy $89.8\\%$ on ImageNet using an attentive probe and input resoluton of $448$px (Bolya et al., 2025). We use an input resolution of $256$px and a different probe architecture in our case.**\n\n|  |  |  | Motion Understanding | Appearance Understanding |  |  |  |  |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| Method | Param. | Avg. | SSv2 | Diving-48 | Jester | K400 | COIN | IN1K |\n| Results Reported in the Literature |  |  |  |  |  |  |  |  |\n| VideoMAEv2 (Wang et al., 2023) | 1B | – | 56.1 | – | – | 82.8 | – | 71.4 |\n| InternVideo2-1B (Wang et al., 2024b) | 1B | – | 67.3 | – | – | 87.9 | – | – |\n| InternVideo2-6B (Wang et al., 2024b) | 6B | – | 67.7 | – | – | 88.8 | – | – |\n| VideoPrism (Zhao et al., 2024) | 1B | – | 68.5 | 71.3 | – | 87.6 | – | – |\n| Image Encoders Evaluated Using the Same Protocol |  |  |  |  |  |  |  |  |\n| DINOv2 (Darcet et al., 2024) | 1.1B | 81.1 | 50.7 | 82.5 | 93.4 | 83.6 | 90.7 | 86.1 |\n| PEcoreG (Bolya et al., 2025) | 1.9B | 82.3 | 55.4 | 76.9 | 90.0 | 88.5 | 95.3 | 87.6∗ |\n| SigLIP2 (Tschannen et al., 2025) | 1.2B | 81.1 | 49.9 | 75.3 | 91.0 | 87.3 | 95.1 | 88.0 |\n| Video Encoders Evaluated Using the Same Protocol |  |  |  |  |  |  |  |  |\n| V-JEPA ViT-H (Bardes et al., 2024) | 600M | 85.2 | 74.3 | 87.9 | 97.7 | 84.5 | 87.1 | 80.0 |\n| InternVideo2s2-1B (Wang et al., 2024b) | 1B | 87.0 | 69.7 | 86.4 | 97.0 | 89.4 | 93.8 | 85.8 |\n| V-JEPA 2 ViT-L | 300M | 86.0 | 73.7 | 89.0 | 97.6 | 85.1 | 86.8 | 83.5 |\n| V-JEPA 2 ViT-H | 600M | 86.4 | 74.0 | 89.8 | 97.7 | 85.3 | 87.9 | 83.8 |\n| V-JEPA 2 ViT-g | 1B | 87.5 | 75.3 | 90.1 | 97.7 | 86.6 | 90.7 | 84.6 |\n| V-JEPA 2 ViT-g384 | 1B | 88.2 | 77.3 | 90.2 | 97.8 | 87.3 | 91.1 | 85.1 |",
        "chinese": "**表 4：动作与物体分类。V-JEPA 2 各模型都用 64 帧视频预训练，分辨率为 $256\\times 256$；ViT-g384 例外，使用 $384\\times 384$。表中比较其与先进图像、视频编码器的分类表现。除 ViT-g384 外，所有模型采用同一评估协议：分辨率 $256\\times 256$，SSv2 输入 $16\\times 2\\times 3$（16 帧、2 个时间裁剪、3 个空间裁剪），K400 为 $16\\times 8\\times 3$，COIN 为 $32\\times 8\\times 3$，Diving-48 和 Jester 为 $32\\times 4\\times 3$。ViT-g384 六项任务都用 $384\\times 384$，SSv2 还改用 $64\\times 2\\times 3$，COIN 为 32x8x3。ViT-g 在运动理解上明显更好，外观任务也有竞争力，六项平均 $87.5$，为各图像与视频编码器中最高；ViT-g384 进一步改善各任务，平均达到 $88.2$。$*$：PEcoreG 在 ImageNet 上使用注意力探针、$448$px 输入可达 $89.8\\%$（Bolya et al., 2025）；本表使用 $256$px 输入和不同探针架构。**\n\n| 方法 | 参数量 | 平均 | SSv2（运动） | Diving-48（运动） | Jester（运动） | K400（外观） | COIN（外观） | IN1K（外观） |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| 文献报告结果 |  |  |  |  |  |  |  |  |\n| VideoMAEv2（Wang et al., 2023） | 1B | – | 56.1 | – | – | 82.8 | – | 71.4 |\n| InternVideo2-1B（Wang et al., 2024b） | 1B | – | 67.3 | – | – | 87.9 | – | – |\n| InternVideo2-6B（Wang et al., 2024b） | 6B | – | 67.7 | – | – | 88.8 | – | – |\n| VideoPrism（Zhao et al., 2024） | 1B | – | 68.5 | 71.3 | – | 87.6 | – | – |\n| 同一协议评估的图像编码器 |  |  |  |  |  |  |  |  |\n| DINOv2（Darcet et al., 2024） | 1.1B | 81.1 | 50.7 | 82.5 | 93.4 | 83.6 | 90.7 | 86.1 |\n| PEcoreG（Bolya et al., 2025） | 1.9B | 82.3 | 55.4 | 76.9 | 90.0 | 88.5 | 95.3 | 87.6∗ |\n| SigLIP2（Tschannen et al., 2025） | 1.2B | 81.1 | 49.9 | 75.3 | 91.0 | 87.3 | 95.1 | 88.0 |\n| 同一协议评估的视频编码器 |  |  |  |  |  |  |  |  |\n| V-JEPA ViT-H（Bardes et al., 2024） | 600M | 85.2 | 74.3 | 87.9 | 97.7 | 84.5 | 87.1 | 80.0 |\n| InternVideo2s2-1B（Wang et al., 2024b） | 1B | 87.0 | 69.7 | 86.4 | 97.0 | 89.4 | 93.8 | 85.8 |\n| V-JEPA 2 ViT-L | 300M | 86.0 | 73.7 | 89.0 | 97.6 | 85.1 | 86.8 | 83.5 |\n| V-JEPA 2 ViT-H | 600M | 86.4 | 74.0 | 89.8 | 97.7 | 85.3 | 87.9 | 83.8 |\n| V-JEPA 2 ViT-g | 1B | 87.5 | 75.3 | 90.1 | 97.7 | 86.6 | 90.7 | 84.6 |\n| V-JEPA 2 ViT-g384 | 1B | 88.2 | 77.3 | 90.2 | 97.8 | 87.3 | 91.1 | 85.1 |",
        "evidenceKeys": [
          "S5.T4"
        ]
      },
      {
        "id": "v-jepa-2-s5-ss0-sss0-px2-p1-1",
        "sectionId": "5-understanding-probe-based-classification",
        "kind": "paragraph",
        "label": "Evaluation protocol.",
        "english": "We compare the performance of V-JEPA 2 on motion and appearance tasks with several other visual encoders: DINOv2 with registers (Darcet et al., 2024) is the current state-of-the-art model for self-supervised learning with images, while SigLIP2 (Tschannen et al., 2025) and the Perception Encoder PEcoreG (Bolya et al., 2025) are two state-of-the-art models for image-text contrastive pretraining. We also consider two video encoders: the self-supervised V-JEPA (Bardes et al., 2024), and InternVideo2s2-1B (Wang et al., 2024b) which relies primarily on vision-text contrastive pretraining.",
        "chinese": "我们比较了若干视觉编码器：带 register token 的 DINOv2（Darcet et al., 2024）是当时领先的图像自监督模型；SigLIP2（Tschannen et al., 2025）和 Perception Encoder PEcoreG（Bolya et al., 2025）是先进的图文对比预训练模型。视频编码器则包括自监督 V-JEPA（Bardes et al., 2024），以及主要依靠视觉—文本对比预训练的 InternVideo2s2-1B（Wang et al., 2024b）。",
        "evidenceKeys": [
          "S5.SS0.SSS0.Px2.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s5-ss0-sss0-px2-p2-1",
        "sectionId": "5-understanding-probe-based-classification",
        "kind": "paragraph",
        "label": "Evaluation protocol.",
        "english": "We use the same evaluation protocol for every baseline and for V-JEPA 2, learning an attentive probe on top of the frozen encoder, similar to Bardes et al. (2024). We adapt image-based models to video following the procedure used in Oquab et al. (2023), concatenating the features of each input frame. For InternVideo2s2-1B, we use its image positional embedding for the ImageNet task, and for video tasks we interpolate its positional embedding from 4 frames to 8, producing a token count similar to V-JEPA 2. Despite using a common evaluation protocol, the baseline encoders are trained on different data (e.g., DINOv2 on LVD-142M, PEcoreG on MetaCLIP) and are thus not directly comparable. We can therefore only compare different approaches at a system level; i.e., with a consistent evaluation protocol despite differences in training protocol and data. We also include existing results from the literature using a similar frozen protocol, but with potentially different attentive head architecture. In particular, we share reported results of VideoMAEv2 (Wang et al., 2023), InternVideo-1B and 6B (Wang et al., 2024b), and VideoPrism (Zhang et al., 2024c) on the classification tasks we consider, when available. We provide complete evaluation and hyperparameters in Section˜12.1.",
        "chinese": "所有基线与 V-JEPA 2 均采用相同评估方式，类似 Bardes et al.（2024），在冻结编码器上训练注意力探针。图像模型按 Oquab et al.（2023）的方式适配视频：拼接各输入帧的特征。InternVideo2s2-1B 在 ImageNet 上使用图像位置嵌入；视频任务则将位置嵌入从 4 帧插值到 8 帧，得到与 V-JEPA 2 接近的 token 数。尽管评估统一，各编码器训练数据不同，例如 DINOv2 用 LVD-142M、PEcoreG 用 MetaCLIP，因而无法直接隔离比较方法本身。这里能做的是系统层比较：训练方案和数据不同，但评估协议相同。我们也纳入文献中类似冻结评估的结果，不过其注意力头架构可能不同，包括 VideoMAEv2（Wang et al., 2023）、InternVideo-1B 与 6B（Wang et al., 2024b）和 VideoPrism（Zhang et al., 2024c）在可获取任务上的结果。完整设置及超参数见第 12.1 节。",
        "evidenceKeys": [
          "S5.SS0.SSS0.Px2.p2.1"
        ]
      },
      {
        "id": "v-jepa-2-s5-ss0-sss0-px3-p1-4",
        "sectionId": "5-understanding-probe-based-classification",
        "kind": "paragraph",
        "label": "Results.",
        "english": "Table˜4 reports the classification performance of V-JEPA 2, the other encoders we evaluated, and other notable results reported in the literature. V-JEPA 2 ViT-g (at 256 resolution) significantly outperforms other vision encoders on motion understanding tasks. It achieves a top-1 accuracy of 75.3 on SSv2 compared to 69.7 for InternVideo and 55.4 for PECoreG. V-JEPA 2 is also competitive on appearance tasks, reaching 84.6 on ImageNet (a $+4.6$ point improvement over V-JEPA). Overall, V-JEPA 2 obtains the best average performance across all six tasks, compared to other video and image encoders. The higher-resolution, longer-duration V-JEPA 2 ViT-g384 shows further improvement across all tasks, reaching $88.2$ average performance.",
        "chinese": "表 4 汇总了 V-JEPA 2、其他实测编码器及文献代表性结果。256 分辨率的 ViT-g 在运动理解上明显优于其他视觉编码器：SSv2 的 top-1 准确率为 75.3，而 InternVideo 为 69.7、PECoreG 为 55.4。它在外观任务上也有竞争力，ImageNet 达到 84.6，比 V-JEPA 提高 $+4.6$ 个百分点。六项任务的平均表现超过其他图像与视频编码器。使用更高分辨率、更长视频的 ViT-g384 又在各任务上进一步提升，平均达到 $88.2$。",
        "evidenceKeys": [
          "S5.SS0.SSS0.Px3.p1.4"
        ]
      }
    ]
  },
  {
    "id": "6-prediction-probe-based-action-anticipation",
    "number": "6",
    "titleEn": "Prediction: Probe-based Action Anticipation",
    "titleZh": "预测：基于探针的动作预判",
    "collapsedByDefault": false,
    "blocks": [
      {
        "id": "v-jepa-2-s6-t5",
        "sectionId": "6-prediction-probe-based-action-anticipation",
        "kind": "table",
        "label": "6 Prediction: Probe-based Action Anticipation",
        "english": "**Table 5: Prediction: Human Action Anticipation. Comparison with the state-of-the-art on the EK100 Action Anticipation benchmark. We report mean-class recall-at-5 for verb, noun and action on the validation set of EK100. V-JEPA 2 performance scales linearly with model size and outperforms previous state-of-the-art across all model sizes.**\n\n| Method | Param. | Action Anticipation |  |  |\n| --- | --- | --- | --- | --- |\n|  |  | Verb | Noun | Action |\n| InAViT (Roy et al., 2024) | 160M | 51.9 | 52.0 | 25.8 |\n| Video-LLaMA (Zhang et al., 2023) | 7B | 52.9 | 52.0 | 26.0 |\n| PlausiVL (Mittal et al., 2024) | 8B | 55.6 | 54.2 | 27.6 |\n| Frozen Backbone |  |  |  |  |\n| V-JEPA 2 ViT-L | 300M | 57.8 | 53.8 | 32.7 |\n| V-JEPA 2 ViT-H | 600M | 59.2 | 54.6 | 36.5 |\n| V-JEPA 2 ViT-g | 1B | 61.2 | 55.7 | 38.0 |\n| V-JEPA 2 ViT-g384 | 1B | 63.6 | 57.1 | 39.7 |",
        "chinese": "**表 5：预测——人类动作预判。与 EK100 动作预判基准上的先进方法比较，报告验证集动词、名词和动作的类别平均 Recall@5。V-JEPA 2 的表现随模型规模近似线性提高，各规模均超过此前最佳结果。**\n\n| 方法 | 参数量 | 动词 Recall@5 | 名词 Recall@5 | 动作 Recall@5 |\n| --- | --- | --- | --- | --- |\n| InAViT（Roy et al., 2024） | 160M | 51.9 | 52.0 | 25.8 |\n| Video-LLaMA（Zhang et al., 2023） | 7B | 52.9 | 52.0 | 26.0 |\n| PlausiVL（Mittal et al., 2024） | 8B | 55.6 | 54.2 | 27.6 |\n| 以下冻结骨干 |  |  |  |  |\n| V-JEPA 2 ViT-L | 300M | 57.8 | 53.8 | 32.7 |\n| V-JEPA 2 ViT-H | 600M | 59.2 | 54.6 | 36.5 |\n| V-JEPA 2 ViT-g | 1B | 61.2 | 55.7 | 38.0 |\n| V-JEPA 2 ViT-g384 | 1B | 63.6 | 57.1 | 39.7 |",
        "evidenceKeys": [
          "S6.T5"
        ]
      },
      {
        "id": "v-jepa-2-s6-p1-1",
        "sectionId": "6-prediction-probe-based-action-anticipation",
        "kind": "paragraph",
        "label": "6 Prediction: Probe-based Action Anticipation",
        "english": "Action anticipation consists in predicting the future action given a contextual video clip leading up to some time before the action. Using the Epic-Kitchens-100 (EK100) benchmark (Damen et al., 2022), we demonstrate that V-JEPA 2 action anticipation performance increases consistently with model size. Furthermore, despite only using an attentive probe trained on top of V-JEPA 2 representations, we show that V-JEPA 2 significantly outperforms prior state-of-the-art approaches that were specifically designed for this task.",
        "chinese": "动作预判的输入，是在某动作开始前一段时间就结束的上下文视频，目标是预测随后将发生什么动作。通过 Epic-Kitchens-100（EK100）（Damen et al., 2022），我们发现 V-JEPA 2 的预判表现随模型规模持续提高。即使只在 V-JEPA 2 表示上训练注意力探针，也明显超过了此前专为该任务设计的最佳方法。",
        "evidenceKeys": [
          "S6.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s6-ss0-sss0-px1-p1-1",
        "sectionId": "6-prediction-probe-based-action-anticipation",
        "kind": "paragraph",
        "label": "Task.",
        "english": "The EK100 dataset is comprised of 100 hours of cooking activities recorded from an egocentric perspective across 45 kitchen environments. Each video in EK100 is annotated with action segments, which include a start timestamp, an end timestamp, and an action label. There are 3,568 unique action labels, each consisting of a verb and a noun category, with a total of 97 verb categories and 300 noun categories. The EK100 action anticipation task involves predicting noun, verb, and action (i.e., predicting verb and noun jointly) from a video clip, referred to as context, that occurs before the start timestamp of an action segment. The interval between the end of the context and the beginning of the action segment is the anticipation time, which is set to 1 second by default. Given that different future actions may be possible from a given context, mean-class recall-at-5 is used as the metric to measure performance (Damen et al., 2022).",
        "chinese": "EK100 包含在 45 个厨房中以第一视角录制的 100 小时烹饪活动。每个视频标注动作片段，包含起止时间与动作标签。共有 3,568 种动作标签，每种由一个动词类别和一个名词类别组成，总计 97 类动词、300 类名词。预判任务从动作片段开始之前的上下文视频，预测名词、动词及二者联合构成的动作。上下文结束到目标动作开始之间的间隔称为预判时间，默认 1 秒。同一上下文后可能出现多种动作，因此采用类别平均 Recall@5 评估（Damen et al., 2022）。",
        "evidenceKeys": [
          "S6.SS0.SSS0.Px1.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s6-ss0-sss0-px2-p1-1",
        "sectionId": "6-prediction-probe-based-action-anticipation",
        "kind": "paragraph",
        "label": "Anticipation Probe.",
        "english": "An attentive probe is trained on top of the frozen V-JEPA 2 encoder and predictor to anticipate future actions. Specifically, we sample a video clip that ends 1 second before an action starts. This video context is fed to the V-JEPA 2 encoder. The predictor takes the encoder representation, along with the mask tokens corresponding to the frame 1 second into the future, and predicts the representation of the future video frame. The outputs of the predictor and encoder are concatenated along the token dimension and fed to an attentive probe with a similar architecture to those used in Section˜5, with the difference being that the anticipation probe’s final cross-attention layer learns three query tokens (as opposed to one), and each query output is fed to a different linear classifier to predict the action category, the verb category, and the noun category respectively. A focal loss (Lin et al., 2017) is applied to each classifier independently and then summed before backpropagating through the shared attention blocks of the probe. We provide additional details and evaluation hyperparameters in Section˜13.1.",
        "chinese": "冻结 V-JEPA 2 编码器和预测器，在它们之上训练注意力探针来预判动作。具体先采样一段在目标动作开始前 1 秒结束的视频，送入编码器；预测器接收编码表示，以及对应未来 1 秒处视频帧的掩码 token，预测该未来帧表示。将编码器与预测器输出沿 token 维拼接，送入结构类似第 5 节的注意力探针。区别是最后的交叉注意力层学习三个查询 token，而不是一个；三个输出分别接入不同线性分类器，预测动作、动词和名词类别。每个分类器独立计算 focal loss（Lin et al., 2017），求和后通过共享注意力块反向传播。更多细节及超参数见第 13.1 节。",
        "evidenceKeys": [
          "S6.SS0.SSS0.Px2.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s6-ss0-sss0-px3-p1-1",
        "sectionId": "6-prediction-probe-based-action-anticipation",
        "kind": "paragraph",
        "label": "Baselines.",
        "english": "We compare our model with three baselines that are trained specifically for action anticipation: InAViT (Roy et al., 2024) is a a supervised approach that leverages explicit hand-object interaction modeling, and Video-LLaMA (Zhang et al., 2023) and PlausiVL (Mittal et al., 2024) are both approaches that leverage a large language model, with up to 7 billion parameters.",
        "chinese": "我们比较三个专门训练用于动作预判的基线。InAViT（Roy et al., 2024）是显式建模手—物交互的监督方法；Video-LLaMA（Zhang et al., 2023）与 PlausiVL（Mittal et al., 2024）则都借助大语言模型，原文此处称参数量最多为 70 亿。",
        "evidenceKeys": [
          "S6.SS0.SSS0.Px3.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s6-ss0-sss0-px4-p1-11",
        "sectionId": "6-prediction-probe-based-action-anticipation",
        "kind": "paragraph",
        "label": "Results.",
        "english": "Table˜5 summarizes the results on the EK100 action anticipation benchmark. We compare V-JEPA 2 ViT-L, ViT-H and ViT-g encoders, increasing parameter count from 300 millions to 1 billion. All three leverage 32 frames with 8 frames per second at resolution $256\\times 256$ as video context. We also report results of ViT-g384 which uses a resolution of $384\\times 384$. V-JEPA 2 demonstrates a linear scaling behavior with respect to model size, in terms of action prediction recall-at-5. V-JEPA 2 ViT-L with $300$ million parameters achieves $32.7$ recall-at-5. Increasing the size of the model to 1 billion parameters leads to a $+5.3$ point improvement with an action recall-at-5 of $38.0$. Furthermore, V-JEPA 2 benefits from using a context with higher resolution, and V-JEPA 2 ViT-g384 at resolution $384\\times 384$ improves recall-at-5 by an additional $+1.7$ points over the other models using $256\\times 256$ resolution.",
        "chinese": "表 5 汇总 EK100 结果。比较的 ViT-L、ViT-H、ViT-g 从 3 亿扩展至 10 亿参数，都以每秒 8 帧采样 32 帧、$256\\times 256$ 视频作上下文；另报告 $384\\times 384$ 分辨率 ViT-g384。动作 Recall@5 随模型规模近似线性增长：$300$ 百万参数的 ViT-L 达到 $32.7$，扩展至 10 亿参数后达到 $38.0$，提高 $+5.3$ 个百分点。更高分辨率也有帮助，采用 $384\\times 384$ 的 ViT-g384 相比 $256\\times 256$ 模型，Recall@5 又提高 $+1.7$ 个百分点。",
        "evidenceKeys": [
          "S6.SS0.SSS0.Px4.p1.11"
        ]
      },
      {
        "id": "v-jepa-2-s6-ss0-sss0-px4-p2-3",
        "sectionId": "6-prediction-probe-based-action-anticipation",
        "kind": "paragraph",
        "label": "Results.",
        "english": "V-JEPA 2 outperforms the previous state-of-the-art model PlausiVL by a significant margin, even with its 300 million parameters compared to the 8 billion parameters used in PlausiVL. In particular, V-JEPA 2 ViT-g384 demonstrates a $+12.1$ points improvement over PlausiVL on action recall-at-5, corresponding to a $44\\%$ relative improvement.",
        "chinese": "即使只用 3 亿参数，V-JEPA 2 也明显优于拥有 80 亿参数的此前最佳模型 PlausiVL。ViT-g384 的动作 Recall@5 比 PlausiVL 高 $+12.1$ 个百分点，对应 $44\\%$ 的相对提升。",
        "evidenceKeys": [
          "S6.SS0.SSS0.Px4.p2.3"
        ]
      },
      {
        "id": "v-jepa-2-s6-f11",
        "sectionId": "6-prediction-probe-based-action-anticipation",
        "kind": "figure-caption",
        "label": "Results.",
        "english": "Figure 11: Visualization of EK100 prediction. (Left): four selected frames from the context frames. (Middle): model predictions, ordered by likelihood. (Right): following frame after the 1 second anticipation time. We show two examples where the model is successful and one example where the model fails.",
        "chinese": "图 11：EK100 预判示例。左：从上下文选出的四帧；中：按可能性排序的模型预测；右：经过 1 秒预判间隔后的画面。展示两个成功样例和一个失败样例。",
        "evidenceKeys": [
          "S6.F11"
        ],
        "imageSrc": "/papers/v-jepa-2/x17.webp",
        "imageAlt": "结果。"
      },
      {
        "id": "v-jepa-2-s6-ss0-sss0-px4-p3-1",
        "sectionId": "6-prediction-probe-based-action-anticipation",
        "kind": "paragraph",
        "label": "Results.",
        "english": "In Figure˜11 we visualize V-JEPA 2 predictions on three samples from the EK100 validation set, two where the model is successful and one where the model fails. For both successful examples, V-JEPA 2 not only retrieves the correct action correctly with top 1 confidence, but also proposes coherent top 2 to 5 actions, based on the given context. For example, in the top row, the correct action is \"wash sink\", but \"turn on water\" or \"clean wall\" would both have been valid actions given the presence of a tap and a wall. The model also predicts \"rinse sponge\", which is the current action being performed, probably assuming that this action could still be going on after 1 second. For the failure case, V-JEPA 2 still proposes coherent actions such as \"close door\" and \"put down spices package\", but misses the exact nature of the object: \"tea package\".",
        "chinese": "图 11 展示 EK100 验证集的三个样例，其中两个成功、一个失败。成功样例中，V-JEPA 2 不仅把正确动作排在第一，也根据上下文给出合理的第二至第五候选。例如第一行真实动作是“清洗水槽”，但画面有水龙头和墙面，“打开水龙头”或“清洁墙面”也合理；模型还预测了当前正在进行的“冲洗海绵”，可能认为 1 秒后该动作仍会继续。失败样例中，模型提出“关门”“放下调料包”等合理动作，却认错了物体，真实对象是“茶包”。",
        "evidenceKeys": [
          "S6.SS0.SSS0.Px4.p3.1"
        ]
      },
      {
        "id": "v-jepa-2-s6-ss0-sss0-px5-p1-1",
        "sectionId": "6-prediction-probe-based-action-anticipation",
        "kind": "paragraph",
        "label": "Limitations.",
        "english": "V-JEPA 2 and the EK100 benchmark have several limitations. First, V-JEPA 2 does not fully solve EK100, there are failure cases where the model either gets the verb, the noun, or both wrong. We study the distribution of these failures in Section˜13.2. Second, we focus here on predicting actions with a 1 second anticipation time. The accuracy of V-JEPA 2 degrades when predicting at longer time horizons, see Section˜13.2. Third, the EK100 benchmark is limited to kitchen environments, with a closed well-defined vocabulary, and we do not know how well V-JEPA 2 generalizes to other environments. This limits the utility and applicability of models trained on EK100. Lastly, actions in EK100 are chosen from a fixed set of categories, making it impossible to generalize to action categories not present in the training set.",
        "chinese": "V-JEPA 2 和 EK100 均有局限。第一，模型尚未完全解决 EK100，仍会认错动词、名词或两者，错误分布见第 13.2 节。第二，本文主要评估提前 1 秒预判；预测更远未来时准确率下降，见第 13.2 节。第三，EK100 只覆盖厨房环境，词汇封闭且定义明确，模型在其他环境中的泛化情况未知，限制了其适用范围。最后，动作只能从固定类别中选择，无法泛化到训练集未包含的动作类别。",
        "evidenceKeys": [
          "S6.SS0.SSS0.Px5.p1.1"
        ]
      }
    ]
  },
  {
    "id": "7-understanding-video-question-answering",
    "number": "7",
    "titleEn": "Understanding: Video Question Answering",
    "titleZh": "理解：视频问答",
    "collapsedByDefault": false,
    "blocks": [
      {
        "id": "v-jepa-2-s7-p1-1",
        "sectionId": "7-understanding-video-question-answering",
        "kind": "paragraph",
        "label": "7 Understanding: Video Question Answering",
        "english": "In this section, we explore V-JEPA 2’s ability to perform open-language video question answering (VidQA). To enable language capabilities, we train a Multimodal Large Language Model (MLLM) using V-JEPA 2 as the visual encoder in the non-tokenized early fusion (Wadekar et al., 2024) setup popularized by the LLaVA family of models (Li et al., 2024b). In this family of MLLMs, a visual encoder is aligned with a large language model by projecting the output patch embeddings of the vision encoder to the input embedding space of the LLM. The MLLM is then trained either end-to-end, or with a frozen vision encoder. The majority of the encoders used in MLLMs for VidQA are typically image encoders, which are applied independently per-frame for video inputs (Qwen Team et al., 2025; Zhang et al., 2024b). Popular instances of such encoders are CLIP (Radford et al., 2021), SigLIP (Tschannen et al., 2025), and Perception Encoder (Bolya et al., 2025), which are chosen primarily due to their semantic alignment with language, obtained by pretraining with image-caption pairs. To the best of our knowledge, our work is the first to use a video encoder that is pretrained without any language supervision, to train an MLLM for VidQA.",
        "chinese": "本节考察 V-JEPA 2 的开放语言视频问答（VidQA）能力。为赋予语言能力，我们采用 LLaVA 系列推广的非离散 token 化早期融合方式（Wadekar et al., 2024; Li et al., 2024b），将 V-JEPA 2 作为视觉编码器训练多模态大语言模型（MLLM）。这类模型把视觉编码器输出的图像块嵌入投影到 LLM 输入嵌入空间，实现视觉—语言对齐，再选择端到端训练或冻结视觉编码器。现有 VidQA MLLM 大多用图像编码器，对视频逐帧独立编码（Qwen Team et al., 2025; Zhang et al., 2024b）。常见选择包括 CLIP（Radford et al., 2021）、SigLIP（Tschannen et al., 2025）和 Perception Encoder（Bolya et al., 2025），主要因为它们通过图像—描述配对预训练，已经与语言语义对齐。据我们所知，本文首次使用预训练时完全没有语言监督的视频编码器，训练用于 VidQA 的 MLLM。",
        "evidenceKeys": [
          "S7.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s7-p2-1",
        "sectionId": "7-understanding-video-question-answering",
        "kind": "paragraph",
        "label": "7 Understanding: Video Question Answering",
        "english": "MLLM performance on downstream tasks is also highly dependent on the alignment data. In these experiments we use a dataset of 88.5 million image- and video-text pairs, similar to what was used to train PerceptionLM (Cho et al., 2025). To demonstrate the effectiveness of the V-JEPA 2 encoder, first we compare V-JEPA 2 with other state-of-the-art vision encoders in a controlled data setup in Section˜7.2, using a subset of 18 million samples. Then, in the same controlled setup, we show that scaling the vision encoder and input resolution size both consistently improve VidQA performance in Section˜7.3. Finally, we scale the alignment data, using the full 88.5 million samples to test the limits of language alignment with V-JEPA 2 in Section˜7.4. Our results demonstrate that in a controlled data setup, V-JEPA 2 obtains competitive performance on open-ended VidQA tasks compared to other vision encoders. Upon scaling the alignment data, V-JEPA 2 achieves state-of-the-art performance on several VidQA benchmarks.",
        "chinese": "MLLM 下游表现也高度依赖对齐数据。本文使用 8850 万图像或视频—文本配对，类似 PerceptionLM 的训练数据（Cho et al., 2025）。为考察编码器本身的作用，第 7.2 节先用其中 1800 万样本，在控制数据条件下比较 V-JEPA 2 与其他先进视觉编码器；第 7.3 节再保持相同条件，考察增加编码器规模和输入分辨率，两者都能持续改善 VidQA。最后，第 7.4 节使用完整 8850 万样本，探索更大规模语言对齐的能力上限。结果表明，在控制数据的设置中，V-JEPA 2 在开放式 VidQA 上具有竞争力；扩大对齐数据后，在多个基准上达到最佳表现。",
        "evidenceKeys": [
          "S7.p2.1"
        ]
      },
      {
        "id": "v-jepa-2-s7-ss1-sss0-px1-p1-1",
        "sectionId": "7-understanding-video-question-answering",
        "kind": "paragraph",
        "label": "Video Question Answering Tasks.",
        "english": "We evaluate on PerceptionTest (Pătrăucean et al., 2023), which assesses model performance across different skills such as memory, abstraction, physics, and semantics. Additionally, we evaluate on the MVP dataset (Krojer et al., 2024) for physical world understanding, which utilizes a minimal-video pair evaluation framework to mitigate text and appearance biases. We also evaluate on TempCompass, TemporalBench and TOMATO (Liu et al., 2024c; Cai et al., 2024; Shangguan et al., 2024) to investigate temporal understanding, and memory capabilities of models. Finally, we report results on general understanding ability using MVBench (Li et al., 2024c), which has a bias towards single-frame appearance features (Krojer et al., 2024; Cores et al., 2024), and TVBench (Cores et al., 2024), which is proposed in the literature as an alternative for general and temporal understanding, mitigating those biases.",
        "chinese": "我们使用 PerceptionTest（Pătrăucean et al., 2023）评估记忆、抽象、物理和语义等能力；使用 MVP（Krojer et al., 2024）评估物理世界理解，其最小差异视频对设计能减轻文本和外观偏差。TempCompass、TemporalBench、TOMATO（Liu et al., 2024c; Cai et al., 2024; Shangguan et al., 2024）用于考察时间理解与记忆。通用理解则采用 MVBench（Li et al., 2024c）和 TVBench（Cores et al., 2024）：前者偏向单帧外观线索（Krojer et al., 2024; Cores et al., 2024），后者作为替代基准，旨在缓解这些偏差，同时评估通用和时间理解。",
        "evidenceKeys": [
          "S7.SS1.SSS0.Px1.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s7-ss1-sss0-px2-p1-1",
        "sectionId": "7-understanding-video-question-answering",
        "kind": "paragraph",
        "label": "Visual Instruction Tuning.",
        "english": "To evaluate the V-JEPA 2 representations on visual-question answering tasks, we align V-JEPA 2 with an LLM using the visual instruction tuning procedure from the LLaVA framework (Liu et al., 2024a). This process involves converting the visual encoder outputs (or visual tokens) into LLM inputs using a learnable projector module, which is typically an MLP. We train MLLMs through a progressive three-stage process following Liu et al. (2024b): Stage 1, where we train the projector solely on image captioning data; Stage 2, where we train the full model on large-scale image question answering, and Stage 3, where we further train the model on large-scale video captioning and question answering. Through this staged training approach, the LLM incrementally improves its understanding of visual tokens. The vision encoder can either be frozen or finetuned along with the rest of the MLLM. We explore both settings as freezing the vision encoder gives a cleaner signal about the quality of the visual features, while finetuning the vision encoder yields better overall performance. Further details of the visual instruction training are described in Section˜14.",
        "chinese": "为评估 V-JEPA 2 表示的视频问答能力，我们沿用 LLaVA 的视觉指令微调流程（Liu et al., 2024a），使它与 LLM 对齐。一个可学习投影模块（通常为 MLP）将视觉编码器输出，也就是视觉 token，转为 LLM 输入。按照 Liu et al.（2024b），MLLM 分三阶段渐进训练：阶段 1 仅在图像描述数据上训练投影器；阶段 2 在大规模图像问答上训练整个模型；阶段 3 再用大规模视频描述及问答继续训练。这样 LLM 逐步学会理解视觉 token。视觉编码器既可以冻结，也可以与其余模块一起微调。我们都进行了探索：冻结设置更能单独反映视觉特征质量，联合微调则总体表现更好。细节见第 14 节。",
        "evidenceKeys": [
          "S7.SS1.SSS0.Px2.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s7-t6",
        "sectionId": "7-understanding-video-question-answering",
        "kind": "table",
        "label": "Visual Instruction Tuning.",
        "english": "**Table 6: Comparison between off-the-shelf image encoders and V-JEPA 2 in frozen encoder setting. All experiments use the same LLM backbone (Qwen2-7B-Instruct), data, and training setup with a frozen vision encoder. PerceptionTest accuracy is reported on the validation set post SFT.**\n\n| Method | Params Enc / LLM | Avg. | PerceptionTest SFT / Acc | MVP Paired-Acc | TempCompass multi-choice | TemporalBench (MBA-short QA) | TVBench Acc | TOMATO Acc | MVBench Acc |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| Off-the-shelf image encoders |  |  |  |  |  |  |  |  |  |\n| DINOv2 ViT-g518 | 1.1B/7B | 45.7 | 67.1 | 22.4 | 62.3 | 26.8 | 47.6 | 32.0 | 61.8 |\n| SigLIP2 ViT-g384 | 1.1B/7B | 48.1 | 72.4 | 26.2 | 66.8 | 25.7 | 48.7 | 33.2 | 64.0 |\n| PE ViT-G/14448 | 1.9B/7B | 49.1 | 72.3 | 26.7 | 67.0 | 27.5 | 51.6 | 34.0 | 64.7 |\n| V-JEPA 2 ViT-g512 | 1B/7B | 52.3 | 72.0 | 31.1 | 69.2 | 33.3 | 55.9 | 37.0 | 67.7 |",
        "chinese": "**表 6：冻结视觉编码器时，现成图像编码器与 V-JEPA 2 的比较。所有实验采用相同的 Qwen2-7B-Instruct 骨干、数据和训练设置。PerceptionTest 报告 SFT 后的验证集准确率。**\n\n| 方法 | 参数量：编码器 / LLM | 平均 | PerceptionTest：SFT 后准确率 | MVP：配对准确率 | TempCompass：多选 | TemporalBench：多二元短问答 | TVBench：准确率 | TOMATO：准确率 | MVBench：准确率 |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| 现成图像编码器 |  |  |  |  |  |  |  |  |  |\n| DINOv2 ViT-g518 | 1.1B/7B | 45.7 | 67.1 | 22.4 | 62.3 | 26.8 | 47.6 | 32.0 | 61.8 |\n| SigLIP2 ViT-g384 | 1.1B/7B | 48.1 | 72.4 | 26.2 | 66.8 | 25.7 | 48.7 | 33.2 | 64.0 |\n| PE ViT-G/14448 | 1.9B/7B | 49.1 | 72.3 | 26.7 | 67.0 | 27.5 | 51.6 | 34.0 | 64.7 |\n| V-JEPA 2 ViT-g512 | 1B/7B | 52.3 | 72.0 | 31.1 | 69.2 | 33.3 | 55.9 | 37.0 | 67.7 |",
        "evidenceKeys": [
          "S7.T6"
        ]
      },
      {
        "id": "v-jepa-2-s7-t7",
        "sectionId": "7-understanding-video-question-answering",
        "kind": "table",
        "label": "Visual Instruction Tuning.",
        "english": "**Table 7: Scaling Vision Encoder Size and Resolution. We scale the vision encoder from 300 million to 1 billion parameters and input resolution from 256 pixels to 512 pixels. All experiments use the same LLM backbone (Qwen2-7B-Instruct), data, and end-to-end training (unfrozen vision encoder) setup. PerceptionTest accuracy is reported on the validation set post SFT. Increasing V-JEPA 2 encoder scale and resolution improve average performances on VidQA tasks.**\n\n| Method | Params Enc / LLM | Avg. | PerceptionTest SFT / Acc | MVP Paired-Acc | TempCompass multi-choice | TemporalBench (MBA-short QA) | TVBench Acc | TOMATO Acc | MVBench Acc |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| End-to-end Evaluation |  |  |  |  |  |  |  |  |  |\n| V-JEPA 2 ViT-L256 | 300M/7B | 51.7 | 74.6 | 32.3 | 70.1 | 30.2 | 50.9 | 36.5 | 67.1 |\n| V-JEPA 2 ViT-H256 | 600M/7B | 52.0 | 74.7 | 30.6 | 70.9 | 29.8 | 54.6 | 35.1 | 68.0 |\n| V-JEPA 2 ViT-g256 | 1B/7B | 52.3 | 75.5 | 31.9 | 70.7 | 28.3 | 54.2 | 37.3 | 68.3 |\n| V-JEPA 2 ViT-g384 | 1B/7B | 54.0 | 76.5 | 33.0 | 71.7 | 33.1 | 56.5 | 39.0 | 68.5 |\n| V-JEPA 2 ViT-g512 | 1B/7B | 54.4 | 77.7 | 33.7 | 71.6 | 32.3 | 57.5 | 38.5 | 69.5 |",
        "chinese": "**表 7：扩大视觉编码器与输入分辨率。编码器从 3 亿扩展至 10 亿参数，分辨率从 256 提高至 512 像素。所有实验使用同一 Qwen2-7B-Instruct、相同数据，并端到端训练（不冻结视觉编码器）。PerceptionTest 报告 SFT 后验证集准确率。增大 V-JEPA 2 和分辨率，都改善了 VidQA 平均表现。**\n\n| 方法 | 参数量：编码器 / LLM | 平均 | PerceptionTest：SFT 后准确率 | MVP：配对准确率 | TempCompass：多选 | TemporalBench：多二元短问答 | TVBench：准确率 | TOMATO：准确率 | MVBench：准确率 |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| 端到端评估 |  |  |  |  |  |  |  |  |  |\n| V-JEPA 2 ViT-L256 | 300M/7B | 51.7 | 74.6 | 32.3 | 70.1 | 30.2 | 50.9 | 36.5 | 67.1 |\n| V-JEPA 2 ViT-H256 | 600M/7B | 52.0 | 74.7 | 30.6 | 70.9 | 29.8 | 54.6 | 35.1 | 68.0 |\n| V-JEPA 2 ViT-g256 | 1B/7B | 52.3 | 75.5 | 31.9 | 70.7 | 28.3 | 54.2 | 37.3 | 68.3 |\n| V-JEPA 2 ViT-g384 | 1B/7B | 54.0 | 76.5 | 33.0 | 71.7 | 33.1 | 56.5 | 39.0 | 68.5 |\n| V-JEPA 2 ViT-g512 | 1B/7B | 54.4 | 77.7 | 33.7 | 71.6 | 32.3 | 57.5 | 38.5 | 69.5 |",
        "evidenceKeys": [
          "S7.T7"
        ]
      },
      {
        "id": "v-jepa-2-s7-ss2-p1-1",
        "sectionId": "7-understanding-video-question-answering",
        "kind": "paragraph",
        "label": "7.2 Comparing with Image Encoders",
        "english": "To isolate the contribution of vision encoders to MLLM performance and compare with V-JEPA 2, we introduce a controlled setup: we train individual MLLMs with different state-of-the-art encoders using the same LLM backbone and training setup. In this controlled setup, we use Qwen2-7B-Instruct (Yang et al., 2024a) and freeze the vision encoder. We use 18 million image and video-text aligned samples. We first compare V-JEPA 2, pretrained at resolution 512$\\times$512 with DINOv2 (Oquab et al., 2023), SigLIP-2 (Tschannen et al., 2025), and Perception Encoder (Bolya et al., 2025).",
        "chinese": "为隔离视觉编码器对 MLLM 的贡献，我们设置受控比较：更换不同先进编码器，LLM 骨干与训练流程保持一致。统一采用 Qwen2-7B-Instruct（Yang et al., 2024a），冻结视觉编码器，使用 1800 万图像或视频—文本对齐样本。首先比较在 512$\\times$512 分辨率预训练的 V-JEPA 2，与 DINOv2（Oquab et al., 2023）、SigLIP-2（Tschannen et al., 2025）、Perception Encoder（Bolya et al., 2025）。",
        "evidenceKeys": [
          "S7.SS2.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s7-ss2-p2-1",
        "sectionId": "7-understanding-video-question-answering",
        "kind": "paragraph",
        "label": "7.2 Comparing with Image Encoders",
        "english": "We observe that V-JEPA 2 exhibits competitive performance in the frozen setup, outperforming DINOv2, SigLIP, and Perception Encoder (PE) in all of the tested benchmarks (Table 6) except PerceptionTest where V-JEPA 2 slightly underperforms SigLIP and PE. The improvement is especially noticeable on MVP, TemporalBench, and TVBench — benchmarks that are primarily focused on temporal understanding. Additionally, since we only change the vision encoder, we provide evidence that a video encoder trained without language supervision can outperform encoders trained with language supervision, in contrast to conventional wisdom (Tong et al., 2024; Li et al., 2024b; Liu et al., 2024d; Yuan et al., 2025). The results also indicate that using a video encoder instead of an image encoder for VidQA improves spatiotemporal understanding, highlighting the need to develop better video encoders.",
        "chinese": "冻结设置下，V-JEPA 2 表现较强：除 PerceptionTest 略低于 SigLIP、PE 外，在表 6 的所有基准都超过 DINOv2、SigLIP 和 Perception Encoder。优势在侧重时间理解的 MVP、TemporalBench、TVBench 上尤其明显。由于这里只更换视觉编码器，这提供了证据：没有语言监督的视频编码器也能优于经过语言监督的编码器，与常见看法不同（Tong et al., 2024; Li et al., 2024b; Liu et al., 2024d; Yuan et al., 2025）。结果也表明，VidQA 使用视频而非图像编码器，能增强时空理解，说明发展更好的视频编码器很有必要。",
        "evidenceKeys": [
          "S7.SS2.p2.1"
        ]
      },
      {
        "id": "v-jepa-2-s7-ss3-p1-1",
        "sectionId": "7-understanding-video-question-answering",
        "kind": "paragraph",
        "label": "7.3 Scaling Vision Encoder Size and Input Resolution",
        "english": "Prior work (Fan et al., 2025) suggests that scaling the vision encoder and input resolution significantly improves VQA performance for self-supervised image encoders. Thus, we scale V-JEPA 2 from 300M to 1B parameters and the input resolution from 256 to 512 pixels, and show the results in Table 7. When increasing vision encoder capacity from 300M to 1B parameters for a fixed input resolution of 256 pixels, we observe improvements of 0.9 points on PerceptionTest, 3.3 points on TVBench, and 1.2 points on MVBench. Additionally, increasing the input resolution to 512 pixels yields further improvements across all downstream tasks, such as an improvement of 2.2 points on PerceptionTest, 4.0 points on TemporalBench, and 3.3 points on TVBench. These results suggest that further scaling the vision encoder and input resolution is a promising direction for improving VidQA performance.",
        "chinese": "Fan et al.（2025）发现，对自监督图像编码器，扩大模型和输入分辨率能显著改善 VQA。因此，我们将 V-JEPA 2 从 300M 扩展到 1B 参数，分辨率从 256 提高到 512 像素，结果见表 7。固定 256 像素时，模型增大使 PerceptionTest 提高 0.9、TVBench 提高 3.3、MVBench 提高 1.2 个百分点。再将分辨率提高至 512，各下游任务进一步改善，例如 PerceptionTest 提高 2.2、TemporalBench 提高 4.0、TVBench 提高 3.3 个百分点。这提示继续扩大编码器和输入分辨率，是改善 VidQA 的可行方向。",
        "evidenceKeys": [
          "S7.SS3.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s7-t8",
        "sectionId": "7-understanding-video-question-answering",
        "kind": "table",
        "label": "7.3 Scaling Vision Encoder Size and Input Resolution",
        "english": "**Table 8: Comparison with state-of-the-art. We use the full 88.5M-sample alignment dataset and train using the same methodology as PLM 8B Cho et al. (2025), using a Llama 3.1 backbone. We observe significant improvements in downstream evaluations, obtaining state-of-the-art results in the 8B model class. PerceptionTest accuracy is reported on the test set with SFT for V-JEPA 2; all other results are zero-shot.**\n\n| Method | Params Enc / LLM | Avg. | PerceptionTest Test Acc | MVP Paired-Acc | TempCompass multi-choice | TemporalBench (MBA-short QA) | TOMATO Acc | TVBench Acc | MVBench Acc |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| $\\leq 8B$ Video Language Models Results Reported in the Literature |  |  |  |  |  |  |  |  |  |\n| InternVL-2.5 (Chen et al., 2024) | 300M/7B | 52.1 | 68.9 | 39.9 | 68.3 | 24.3 | 29.4 | 61.6 | 72.6 |\n| Qwen2VL (Wang et al., 2024a) | 675M/7B | 47.0 | 66.9 | 29.2 | 67.9 | 20.4 | 31.5 | 46.0 | 67.0 |\n| Qwen2.5VL (Qwen Team et al., 2025) | 1B/7B | 49.7 | 70.5 | 36.7 | 71.7 | 24.5 | 24.6 | 50.5 | 69.6 |\n| PLM 8B (Cho et al., 2025) | 1B/8B | 56.7 | 82.7 | 39.7 | 72.7 | 28.3 | 33.2 | 63.5 | 77.1 |\n| V-JEPA 2 ViT-g384 LLama 3.1 8B | 1B/8B | 59.5 | 84.0 | 44.5 | 76.9 | 36.7 | 40.3 | 60.6 | 73.5 |",
        "chinese": "**表 8：与先进方法比较。使用完整 88.5M 对齐样本，采用与 PLM 8B（Cho et al., 2025）相同的训练方法及 Llama 3.1 骨干，下游表现显著提高，在 8B 规模达到最佳结果。V-JEPA 2 的 PerceptionTest 数值为 SFT 后测试集准确率，其余结果均为零样本。**\n\n| 方法 | 参数量：编码器 / LLM | 平均 | PerceptionTest：测试准确率 | MVP：配对准确率 | TempCompass：多选 | TemporalBench：多二元短问答 | TOMATO：准确率 | TVBench：准确率 | MVBench：准确率 |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| 文献中 $\\leq 8B$ 视频语言模型 |  |  |  |  |  |  |  |  |  |\n| InternVL-2.5（Chen et al., 2024） | 300M/7B | 52.1 | 68.9 | 39.9 | 68.3 | 24.3 | 29.4 | 61.6 | 72.6 |\n| Qwen2VL（Wang et al., 2024a） | 675M/7B | 47.0 | 66.9 | 29.2 | 67.9 | 20.4 | 31.5 | 46.0 | 67.0 |\n| Qwen2.5VL（Qwen Team et al., 2025） | 1B/7B | 49.7 | 70.5 | 36.7 | 71.7 | 24.5 | 24.6 | 50.5 | 69.6 |\n| PLM 8B（Cho et al., 2025） | 1B/8B | 56.7 | 82.7 | 39.7 | 72.7 | 28.3 | 33.2 | 63.5 | 77.1 |\n| V-JEPA 2 ViT-g384 LLama 3.1 8B | 1B/8B | 59.5 | 84.0 | 44.5 | 76.9 | 36.7 | 40.3 | 60.6 | 73.5 |",
        "evidenceKeys": [
          "S7.T8"
        ]
      },
      {
        "id": "v-jepa-2-s7-ss4-p1-3",
        "sectionId": "7-understanding-video-question-answering",
        "kind": "paragraph",
        "label": "7.4 Improving the State-of-the-art by Scaling Data",
        "english": "After developing a better understanding of the capabilities of V-JEPA 2 for training an MLLM in the controlled setup, we study the effect of increasing alignment dataset size to improve the state-of-the-art of VidQA. Step changes on downstream task performance are often achieved by increasing the scale of the training data, as observed by Cho et al. (2025). To that end, we increase the scale of MLLM training data from 18 million to the full 88.5 million (4.7$\\times$). While increasing the model resolution helps in downstream performance, it comes with the challenge of accommodating a large number of visual tokens in the LLM input. We therefore choose V-JEPA 2 ViT-g384, leading to 288 visual tokens per frame. We follow the same recipe as Cho et al. (2025) to train V-JEPA 2 ViT-g384, using Llama 3.1 as the backbone. To simplify the training process, we use an MLP projector without pooling. Details on the scaling training setup are described in Section˜14.",
        "chinese": "在受控设置中了解 V-JEPA 2 训练 MLLM 的能力后，我们研究扩大对齐数据能否进一步推进 VidQA。Cho et al.（2025）观察到，增加训练数据常带来下游表现的明显跃升。为此，我们把数据从 1800 万扩大到完整 8850 万，即 4.7$\\times$。虽然更高分辨率有益，但也会使 LLM 输入承载大量视觉 token，因此选择每帧产生 288 个视觉 token 的 ViT-g384。训练沿用 Cho et al.（2025）的方案，以 Llama 3.1 为骨干；为简化流程，投影器采用不含池化的 MLP。大规模训练细节见第 14 节。",
        "evidenceKeys": [
          "S7.SS4.p1.3"
        ]
      },
      {
        "id": "v-jepa-2-s7-ss4-p2-1",
        "sectionId": "7-understanding-video-question-answering",
        "kind": "paragraph",
        "label": "7.4 Improving the State-of-the-art by Scaling Data",
        "english": "Scaling the data uniformly improves the downstream benchmark performance, resulting in state-of-the-art results (Table 8) on multiple benchmarks — PerceptionTest, MVP, TempCompass, TemporalBench and TOMATO. Compared to the current state-of-the-art PerceptionLM 8B (Cho et al., 2025), we observe an increase of 1.3 points on accuracy for PerceptionTest test set, 4.8 points on paired accuracy for MVP, 4.2 points on accuracy for TempCompass, 8.4 points on Multi-binary accuracy for short-QA segment for TemporalBench and 7.1 points on accuracy for TOMATO. V-JEPA 2 does not outperform PerceptionLM on TVBench and MVBench, however it still significantly outperforms other related baselines (InternVL 2.5, Qwen2VL and Qwen2.5VL). These results underscore the need to scale training data for vision-language alignment and provide evidence that an encoder pretrained without language supervision, such as V-JEPA 2, can achieve state-of-the-art results with sufficient scale.",
        "chinese": "扩大数据后，各下游基准均改善，在 PerceptionTest、MVP、TempCompass、TemporalBench 和 TOMATO 上达到最佳表现（表 8）。相比 PerceptionLM 8B（Cho et al., 2025），PerceptionTest 测试准确率提高 1.3、MVP 配对准确率提高 4.8、TempCompass 准确率提高 4.2、TemporalBench 短问答部分的多二元准确率提高 8.4、TOMATO 准确率提高 7.1 个百分点。V-JEPA 2 在 TVBench、MVBench 上未超过 PerceptionLM，但仍明显优于其他相关基线 InternVL 2.5、Qwen2VL、Qwen2.5VL。结果强调了扩大视觉—语言对齐数据的重要性，也说明 V-JEPA 2 这种预训练不使用语言监督的编码器，在足够规模下能够达到最佳水平。",
        "evidenceKeys": [
          "S7.SS4.p2.1"
        ]
      }
    ]
  },
  {
    "id": "8-related-work",
    "number": "8",
    "titleEn": "Related Work",
    "titleZh": "相关工作",
    "collapsedByDefault": false,
    "blocks": [
      {
        "id": "v-jepa-2-s8-ss0-sss0-px1-p1-1",
        "sectionId": "8-related-work",
        "kind": "paragraph",
        "label": "World models and planning.",
        "english": "As early as the work of Sutton and Barto (1981) and Chatila and Laumond (1985), AI researchers have sought to build agents that use internal models of the world — modeling both dynamics of the world, as well as mapping the static environment — to enable efficient planning and control. Previous work has investigated world models in simulated tasks (Fragkiadaki et al., 2015; Ha and Schmidhuber, 2018; Hafner et al., 2019b, a; Hansen et al., 2022, 2023; Hafner et al., 2023; Schrittwieser et al., 2020; Samsami et al., 2024), as well as real-world locomotion and manipulation tasks (Lee et al., 2020; Nagabandi et al., 2020; Finn et al., 2016; Ebert et al., 2017, 2018; Yen-Chen et al., 2020). World model approaches either learn predictive models directly in pixel-space (Finn et al., 2016; Ebert et al., 2017, 2018; Yen-Chen et al., 2020), in a learned representation space (Watter et al., 2015; Agrawal et al., 2016; Ha and Schmidhuber, 2018; Hafner et al., 2019b; Nair et al., 2022; Wu et al., 2023b; Tomar et al., 2024; Hu et al., 2024; Lancaster et al., 2024), or utilizing more structured representation spaces such as keypoint representations (Manuelli et al., 2020; Das et al., 2020). Previous approaches that have demonstrated real world performance on robotics tasks have trained task-specific world models, and they rely on interaction data from the environment in which the robot is deployed. Evaluation is focused on demonstrating performance of world modeling approaches within the explored task space, instead of generalization to new environments or unseen objects. In this work we train a task-agnostic world model, and demonstrate generalization to new environments and objects.",
        "chinese": "早在 Sutton and Barto（1981）及 Chatila and Laumond（1985），AI 研究者就尝试让智能体用内部世界模型支持高效规划与控制，包括建模世界动态、绘制静态环境地图。既有研究涵盖仿真任务（Fragkiadaki et al., 2015; Ha and Schmidhuber, 2018; Hafner et al., 2019b, a; Hansen et al., 2022, 2023; Hafner et al., 2023; Schrittwieser et al., 2020; Samsami et al., 2024），也涵盖真实移动与操作（Lee et al., 2020; Nagabandi et al., 2020; Finn et al., 2016; Ebert et al., 2017, 2018; Yen-Chen et al., 2020）。世界模型可以直接在像素空间预测（Finn et al., 2016; Ebert et al., 2017, 2018; Yen-Chen et al., 2020），在学得的表示空间预测（Watter et al., 2015; Agrawal et al., 2016; Ha and Schmidhuber, 2018; Hafner et al., 2019b; Nair et al., 2022; Wu et al., 2023b; Tomar et al., 2024; Hu et al., 2024; Lancaster et al., 2024），或使用关键点等更结构化的表示（Manuelli et al., 2020; Das et al., 2020）。此前展示真实机器人效果的方法，通常训练任务专用世界模型，并依赖部署环境中的交互数据；评估侧重已探索任务空间内的表现，较少考察新环境或未见物体。本文训练不针对特定任务的世界模型，并展示了对新环境、新物体的泛化。",
        "evidenceKeys": [
          "S8.SS0.SSS0.Px1.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s8-ss0-sss0-px1-p2-1",
        "sectionId": "8-related-work",
        "kind": "paragraph",
        "label": "World models and planning.",
        "english": "Some recent works leverage both internet-scale video and interaction data towards training general purpose (task-agnostic) action-conditioned video generation models for autonomous robots (Bruce et al., 2024; Agarwal et al., 2025; Russell et al., 2025). However, thus far these approaches only demonstrate the ability to generate visually valid-looking plans given actions of the robot, but they have not demonstrated the ability to use those models to actually control the robot.",
        "chinese": "一些近期工作结合互联网规模视频与交互数据，为自主机器人训练通用、任务无关的动作条件视频生成模型（Bruce et al., 2024; Agarwal et al., 2025; Russell et al., 2025）。但截至本文，这些方法主要展示给定机器人动作后生成视觉合理计划的能力，尚未展示用这些模型真正控制机器人的能力。",
        "evidenceKeys": [
          "S8.SS0.SSS0.Px1.p2.1"
        ]
      },
      {
        "id": "v-jepa-2-s8-ss0-sss0-px1-p3-1",
        "sectionId": "8-related-work",
        "kind": "paragraph",
        "label": "World models and planning.",
        "english": "Other works have explored the integration of generative modeling into policy learning (Du et al., 2024; Wu et al., 2023a; Zhao et al., 2025; Zhu et al., 2025; Du et al., 2023; Zheng et al., 2025; Rajasegaran et al., 2025). Differently from this line of work, our goal is to leverage a world model through model-predictive control instead of policy learning to avoid the imitation learning phase that requires expert trajectories. Both approaches are orthogonal and could be combined in future works. Closest to our work, Zhou et al. (2024); Sobal et al. (2025) show that you can learn a world model stage-wise or end-to-end and use it to solve planning tasks zero-shot. While those previous works focus on small-scale planning evaluation, we show that similar principles can be scaled and used to solve real-world robotic tasks.",
        "chinese": "另一些工作将生成建模融入策略学习（Du et al., 2024; Wu et al., 2023a; Zhao et al., 2025; Zhu et al., 2025; Du et al., 2023; Zheng et al., 2025; Rajasegaran et al., 2025）。本文则通过模型预测控制使用世界模型，避免了策略学习中需要专家轨迹的模仿学习阶段。两条路线并不冲突，未来可以结合。与本文最接近的是 Zhou et al.（2024）和 Sobal et al.（2025）：它们表明世界模型可分阶段或端到端学习，并用于零样本规划。但那些工作主要在较小规模上评估规划，本文则证明类似原则可以扩大规模，并解决真实机器人任务。",
        "evidenceKeys": [
          "S8.SS0.SSS0.Px1.p3.1"
        ]
      },
      {
        "id": "v-jepa-2-s8-ss0-sss0-px2-p1-1",
        "sectionId": "8-related-work",
        "kind": "paragraph",
        "label": "Vision-Language-Action models for Robotic Control.",
        "english": "Recent imitation learning approaches in real-world robotic control have made significant progress towards learning policies that show increasingly good generalization capabilities. This is achieved by leveraging video-languange models that have been pre-trained on internet scale video and text data, which are then fine-tuned (or adapted) to also predict actions by using behavior cloning from expert demonstrations (Driess et al., 2023; Brohan et al., 2023; Black et al., 2024; Kim et al., 2024; Bjorck et al., 2025; Black et al., 2025). Although these approaches show promising generalization results, it is unclear whether they will be able to learn to predict behaviors that were not demonstrated in the training data since they lack an explicit predictive model of the world and do leverage inference-time computation for planning. They require high-quality large scale teleoperation data, and can only utilize successful trajectories. In contrast, we focus on leveraging any interaction data whether it comes from a successful or failed interaction with the environment.",
        "chinese": "近期真实机器人控制的模仿学习方法，在学习具有更好泛化能力的策略方面取得了显著进展。它们利用互联网规模视频和文本预训练的视频语言模型，再用专家示范做行为克隆，通过微调或适配使模型预测动作（Driess et al., 2023; Brohan et al., 2023; Black et al., 2024; Kim et al., 2024; Bjorck et al., 2025; Black et al., 2025）。尽管泛化结果可观，它们能否学会预测训练数据中未示范的行为，仍不清楚；原文给出的表述是，这些方法缺乏显式世界预测模型，并会利用推理时计算进行规划。它们需要大规模、高质量遥操作数据，而且只能使用成功轨迹。本文则关注利用所有交互数据，无论与环境的交互最终成功还是失败。",
        "evidenceKeys": [
          "S8.SS0.SSS0.Px2.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s8-ss0-sss0-px3-p1-1",
        "sectionId": "8-related-work",
        "kind": "paragraph",
        "label": "Vision Foundation Models.",
        "english": "Video foundation models in computer vision have shown that large-scale observation datasets comprised of images and/or videos can be leveraged to learn generalist vision encoders that perform well along a wide range of downstream tasks using self-supervised learning approaches from images (Grill et al., 2020; Assran et al., 2023; Oquab et al., 2023; Fan et al., 2025), videos (Bardes et al., 2024; Carreira et al., 2024; Wang et al., 2023; Rajasegaran et al., 2025), with weak language supervision (Wang et al., 2024b; Bolya et al., 2025), or a combination thereof (Tschannen et al., 2025; Fini et al., 2024). Previous works, however, tend to focus on understanding evaluation using probe-based evaluation or visual question answering tasks after aligning with a large-language model. While such tasks have served to drive progress, it remains an important goal of a visual system to enable an agent to interact with the physical world (Gibson, 1979). Beyond results on visual understanding tasks, we investigate how large-scale self-supervised learning from video can enable solving planning tasks in new environments in a zero-shot manner.",
        "chinese": "计算机视觉的视频基础模型已经表明，可利用大规模图像和/或视频观察数据，学习在多种下游任务上表现良好的通用视觉编码器。训练可以采用图像自监督（Grill et al., 2020; Assran et al., 2023; Oquab et al., 2023; Fan et al., 2025）、视频自监督（Bardes et al., 2024; Carreira et al., 2024; Wang et al., 2023; Rajasegaran et al., 2025）、弱语言监督（Wang et al., 2024b; Bolya et al., 2025），或其组合（Tschannen et al., 2025; Fini et al., 2024）。但以往工作多以探针，或与 LLM 对齐后的视频问答，评估理解能力。这些任务推动了进步，但让智能体与物理世界交互仍是视觉系统的重要目标（Gibson, 1979）。本文在视觉理解结果之外，进一步研究大规模视频自监督学习如何支持新环境中的零样本规划。",
        "evidenceKeys": [
          "S8.SS0.SSS0.Px3.p1.1"
        ]
      }
    ]
  },
  {
    "id": "9-conclusion",
    "number": "9",
    "titleEn": "Conclusion",
    "titleZh": "结论",
    "collapsedByDefault": false,
    "blocks": [
      {
        "id": "v-jepa-2-s9-p1-1",
        "sectionId": "9-conclusion",
        "kind": "paragraph",
        "label": "9 Conclusion",
        "english": "This study demonstrates how joint-embedding predictive architectures, learning in a self-supervised manner from web-scale data and a small amount of robot interaction data, can yield a world model capable of understanding, predicting, and planning in the physical world. V-JEPA 2 achieves state-of-art performances on action classification requiring motion understanding and human action anticipation. V-JEPA 2 also outperforms previous vision encoders on video questions-answering tasks when aligned with a large-language model. Additionally, post-training an action-conditioned world model, V-JEPA 2-AC, using V-JEPA 2’s representation, enables successful zero-shot prehensile manipulation tasks, such as Pick-and-Place, with real-world robots. These findings indicate V-JEPA 2 is a step towards developing advanced AI systems that can effectively perceive and act in their environment.",
        "chinese": "本研究表明，联合嵌入预测架构能够从互联网规模数据及少量机器人交互数据中自监督学习，构建可在物理世界中理解、预测和规划的世界模型。V-JEPA 2 在需要运动理解的动作分类及人类动作预判上达到最佳表现；与大语言模型对齐后，视频问答也优于以往视觉编码器。此外，基于其表示后训练动作条件世界模型 V-JEPA 2-AC，可以使真实机器人零样本完成拾取放置等抓持类操作。这些发现使我们朝着能够有效感知环境并在其中行动的先进 AI 系统迈进一步。",
        "evidenceKeys": [
          "S9.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s9-ss0-sss0-px1-p1-1",
        "sectionId": "9-conclusion",
        "kind": "paragraph",
        "label": "Future work.",
        "english": "There are several important avenues for future work to address limitations of V-JEPA 2. First, in this work we have focused on tasks requiring predictions up to roughly 16 seconds into the future. This enables planning for simpler manipulation tasks, like grasp and reach-with-object, from a single goal image. However, to extend this to longer-horizon tasks such as pick-and-place or even more complex tasks, without requiring sub-goals will require further innovations in modeling. Developing approaches for hierarchical models capable of making predictions across multiple spatial and temporal scales, at different levels of abstraction, is a promising direction.",
        "chinese": "为解决 V-JEPA 2 的局限，未来有几个重要方向。首先，本文聚焦的任务最多需要预测约 16 秒后的未来，足以根据单张目标图像规划抓取、持物到达等较简单操作。但若不提供子目标，还要完成拾取放置乃至更复杂的长时程任务，就需要进一步改进建模。一个可行方向是发展分层模型，在不同抽象层次上，跨多个空间和时间尺度预测。",
        "evidenceKeys": [
          "S9.SS0.SSS0.Px1.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s9-ss0-sss0-px1-p2-1",
        "sectionId": "9-conclusion",
        "kind": "paragraph",
        "label": "Future work.",
        "english": "Second, as mentioned in Section˜4, V-JEPA 2-AC currently relies upon tasks specified as image goals. Although this may be natural for some tasks, there are other situations where language-based goal specification may be preferable. Extending the V-JEPA 2-AC to accept language-based goals, e.g., by having a model that can embed language-based goals into the V-JEPA 2-AC representation space, is another important direction for future work. The results described in Section˜7, aligning V-JEPA 2 with a language model, may serve as a starting point.",
        "chinese": "其次，如第 4 节所述，V-JEPA 2-AC 目前通过目标图像指定任务。这对部分任务自然，但其他场景可能更适合语言目标。因此，让 V-JEPA 2-AC 接受语言目标，例如训练模型将语言目标嵌入它的表示空间，是另一个重要方向。第 7 节中 V-JEPA 2 与语言模型对齐的结果，可以作为起点。",
        "evidenceKeys": [
          "S9.SS0.SSS0.Px1.p2.1"
        ]
      },
      {
        "id": "v-jepa-2-s9-ss0-sss0-px1-p3-1",
        "sectionId": "9-conclusion",
        "kind": "paragraph",
        "label": "Future work.",
        "english": "Finally, in this work we scaled V-JEPA 2 models up to a modest 1B parameters. The results in Section˜2 demonstrated consistent performance improvements while scaling to this level. Previous work has investigated scaling vision encoders to as large as 20B parameters (Zhai et al., 2022; Carreira et al., 2024). Additional work is needed in this direction to develop scalable pre-training recipes that lead to sustained performance improvements with scale.",
        "chinese": "最后，本文仅将 V-JEPA 2 扩展到相对适中的 1B 参数规模，第 2 节表明在此范围内性能持续改善。已有研究曾将视觉编码器扩展到 20B 参数（Zhai et al., 2022; Carreira et al., 2024）。未来还需探索能继续扩展的预训练方案，让性能随规模持续提高。",
        "evidenceKeys": [
          "S9.SS0.SSS0.Px1.p3.1"
        ]
      }
    ]
  },
  {
    "id": "acknowledgements",
    "number": "A",
    "titleEn": "Acknowledgements",
    "titleZh": "致谢",
    "collapsedByDefault": true,
    "blocks": [
      {
        "id": "v-jepa-2-sx1-p1-1",
        "sectionId": "acknowledgements",
        "kind": "paragraph",
        "label": "Acknowledgements",
        "english": "We thank Rob Fergus, Joelle Pineau, Stephane Kasriel, Naila Murray, Mrinal Kalakrishnan, Jitendra Malik, Randall Balestriero, Julen Urain, Gabriel Synnaeve, Michel Meyer, Pascale Fung, Justine Kao, Florian Bordes, Aaron Foss, Nikhil Gupta, Cody Ohlsen, Kalyan Saladi, Ananya Saxena, Mack Ward, Parth Malani, Shubho Sengupta, Leo Huang, Kamila Benzina, Rachel Kim, Ana Paula Kirschner Mofarrej, Alyssa Newcomb, Nisha Deo, Yael Yungster, Kenny Lehmann, Karla Martucci, and the PerceptionLM team, including Christoph Feichtenhofer, Andrea Madotto, Tushar Nagarajan, and Piotr Dollar for their feedback and support of this project.",
        "chinese": "感谢 Rob Fergus、Joelle Pineau、Stephane Kasriel、Naila Murray、Mrinal Kalakrishnan、Jitendra Malik、Randall Balestriero、Julen Urain、Gabriel Synnaeve、Michel Meyer、Pascale Fung、Justine Kao、Florian Bordes、Aaron Foss、Nikhil Gupta、Cody Ohlsen、Kalyan Saladi、Ananya Saxena、Mack Ward、Parth Malani、Shubho Sengupta、Leo Huang、Kamila Benzina、Rachel Kim、Ana Paula Kirschner Mofarrej、Alyssa Newcomb、Nisha Deo、Yael Yungster、Kenny Lehmann、Karla Martucci，以及 PerceptionLM 团队的 Christoph Feichtenhofer、Andrea Madotto、Tushar Nagarajan、Piotr Dollar，为本项目提供反馈与支持。",
        "evidenceKeys": [
          "Sx1.p1.1"
        ]
      }
    ]
  },
  {
    "id": "references",
    "number": "R",
    "titleEn": "References",
    "titleZh": "参考",
    "collapsedByDefault": true,
    "blocks": [
      {
        "id": "v-jepa-2-bib-bib1",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Agarwal et al. (2025) Niket Agarwal, Arslan Ali, Maciej Bala, Yogesh Balaji, Erik Barker, Tiffany Cai, Prithvijit Chattopadhyay, Yongxin Chen, Yin Cui, Yifan Ding, Daniel Dworakowski, Jiaojiao Fan, Michele Fenzi, Francesco Ferroni, Sanja Fidler, Dieter Fox, Songwei Ge, Yunhao Ge, Jinwei Gu, Siddharth Gururani, Ethan He, Jiahui Huang, Jacob Huffman, Pooya Jannaty, Jingyi Jin, Seung Wook Kim, Gergely Klár, Grace Lam, Shiyi Lan, Laura Leal-Taixe, Anqi Li, Zhaoshuo Li, Chen-Hsuan Lin, Tsung-Yi Lin, Huan Ling, Ming-Yu Liu, Xian Liu, Alice Luo, Qianli Ma, Hanzi Mao, Kaichun Mo, Arsalan Mousavian, Seungjun Nah, Sriharsha Niverty, David Page, Despoina Paschalidou, Zeeshan Patel, Lindsey Pavao, Morteza Ramezanali, Fitsum Reda, Xiaowei Ren, Vasanth Rao Naik Sabavat, Ed Schmerling, Stella Shi, Bartosz Stefaniak, Shitao Tang, Lyne Tchapmi, Przemek Tredak, Wei-Cheng Tseng, Jibin Varghese, Hao Wang, Haoxiang Wang, Heng Wang, Ting-Chun Wang, Fangyin Wei, Xinyue Wei, Jay Zhangjie Wu, Jiashu Xu, Wei Yang, Lin Yen-Chen, Xiaohui Zeng, Yu Zeng, Jing Zhang, Qinsheng Zhang, Yuxuan Zhang, Qingqing Zhao, and Artur Zolkowski. Cosmos world foundation model platform for physical AI. arXiv preprint arXiv:2501.03575, 2025.",
        "chinese": "Agarwal et al. (2025) Niket Agarwal, Arslan Ali, Maciej Bala, Yogesh Balaji, Erik Barker, Tiffany Cai, Prithvijit Chattopadhyay, Yongxin Chen, Yin Cui, Yifan Ding, Daniel Dworakowski, Jiaojiao Fan, Michele Fenzi, Francesco Ferroni, Sanja Fidler, Dieter Fox, Songwei Ge, Yunhao Ge, Jinwei Gu, Siddharth Gururani, Ethan He, Jiahui Huang, Jacob Huffman, Pooya Jannaty, Jingyi Jin, Seung Wook Kim, Gergely Klár, Grace Lam, Shiyi Lan, Laura Leal-Taixe, Anqi Li, Zhaoshuo Li, Chen-Hsuan Lin, Tsung-Yi Lin, Huan Ling, Ming-Yu Liu, Xian Liu, Alice Luo, Qianli Ma, Hanzi Mao, Kaichun Mo, Arsalan Mousavian, Seungjun Nah, Sriharsha Niverty, David Page, Despoina Paschalidou, Zeeshan Patel, Lindsey Pavao, Morteza Ramezanali, Fitsum Reda, Xiaowei Ren, Vasanth Rao Naik Sabavat, Ed Schmerling, Stella Shi, Bartosz Stefaniak, Shitao Tang, Lyne Tchapmi, Przemek Tredak, Wei-Cheng Tseng, Jibin Varghese, Hao Wang, Haoxiang Wang, Heng Wang, Ting-Chun Wang, Fangyin Wei, Xinyue Wei, Jay Zhangjie Wu, Jiashu Xu, Wei Yang, Lin Yen-Chen, Xiaohui Zeng, Yu Zeng, Jing Zhang, Qinsheng Zhang, Yuxuan Zhang, Qingqing Zhao, and Artur Zolkowski. Cosmos world foundation model platform for physical AI. arXiv preprint arXiv:2501.03575, 2025.",
        "evidenceKeys": [
          "bib.bib1"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib2",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Agrawal et al. (2016) Pulkit Agrawal, Ashvin V Nair, Pieter Abbeel, Jitendra Malik, and Sergey Levine. Learning to poke by poking: Experiential learning of intuitive physics. Advances in Neural Information Processing Systems, 29, 2016.",
        "chinese": "Agrawal et al. (2016) Pulkit Agrawal, Ashvin V Nair, Pieter Abbeel, Jitendra Malik, and Sergey Levine. Learning to poke by poking: Experiential learning of intuitive physics. Advances in Neural Information Processing Systems, 29, 2016.",
        "evidenceKeys": [
          "bib.bib2"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib3",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Andrychowicz et al. (2017) Marcin Andrychowicz, Filip Wolski, Alex Ray, Jonas Schneider, Rachel Fong, Peter Welinder, Bob McGrew, Josh Tobin, OpenAI Pieter Abbeel, and Wojciech Zaremba. Hindsight experience replay. Advances in Neural Information Processing Systems, 30, 2017.",
        "chinese": "Andrychowicz et al. (2017) Marcin Andrychowicz, Filip Wolski, Alex Ray, Jonas Schneider, Rachel Fong, Peter Welinder, Bob McGrew, Josh Tobin, OpenAI Pieter Abbeel, and Wojciech Zaremba. Hindsight experience replay. Advances in Neural Information Processing Systems, 30, 2017.",
        "evidenceKeys": [
          "bib.bib3"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib4",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Assran et al. (2022) Mahmoud Assran, Randall Balestriero, Quentin Duval, Florian Bordes, Ishan Misra, Piotr Bojanowski, Pascal Vincent, Michael Rabbat, and Nicolas Ballas. The hidden uniform cluster prior in self-supervised learning. arXiv preprint arXiv:2210.07277, 2022.",
        "chinese": "Assran et al. (2022) Mahmoud Assran, Randall Balestriero, Quentin Duval, Florian Bordes, Ishan Misra, Piotr Bojanowski, Pascal Vincent, Michael Rabbat, and Nicolas Ballas. The hidden uniform cluster prior in self-supervised learning. arXiv preprint arXiv:2210.07277, 2022.",
        "evidenceKeys": [
          "bib.bib4"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib5",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Assran et al. (2023) Mahmoud Assran, Quentin Duval, Ishan Misra, Piotr Bojanowski, Pascal Vincent, Michael Rabbat, Yann LeCun, and Nicolas Ballas. Self-supervised learning from images with a joint-embedding predictive architecture. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 15619–15629, 2023.",
        "chinese": "Assran et al. (2023) Mahmoud Assran, Quentin Duval, Ishan Misra, Piotr Bojanowski, Pascal Vincent, Michael Rabbat, Yann LeCun, and Nicolas Ballas. Self-supervised learning from images with a joint-embedding predictive architecture. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 15619–15629, 2023.",
        "evidenceKeys": [
          "bib.bib5"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib6",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Bardes et al. (2024) Adrien Bardes, Quentin Garrido, Jean Ponce, Xinlei Chen, Michael Rabbat, Yann LeCun, Mahmoud Assran, and Nicolas Ballas. Revisiting feature prediction for learning visual representations from video. arXiv preprint arXiv:2404.08471, 2024.",
        "chinese": "Bardes et al. (2024) Adrien Bardes, Quentin Garrido, Jean Ponce, Xinlei Chen, Michael Rabbat, Yann LeCun, Mahmoud Assran, and Nicolas Ballas. Revisiting feature prediction for learning visual representations from video. arXiv preprint arXiv:2404.08471, 2024.",
        "evidenceKeys": [
          "bib.bib6"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib7",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Bjorck et al. (2025) Johan Bjorck, Fernando Castañeda, Nikita Cherniadev, Xingye Da, Runyu Ding, Linxi “Jim” Fan, Yu Fang, Dieter Fox, Fengyuan Hu, Spencer Huang, Joel Jang, Zhenyu Jiang, Jan Kautz, Kaushil Kundalia, Lawrence Lao, Zhiqi Li, Zongyu Lin, Kevin Lin, Guilin Liu, Edith Llontop, Loic Magne, Ajay Mandlekar, Avnish Narayan, Soroush Nasiriany, Scott Reed, You Liang Tan, Guanzhi Wang, Zu Wang, Jing Wang, Qi Wang, Jiannan Xiang, Yuqi Xie, Yinzhen Xu, Zhenjia Xu, Seonghyeon Ye, Zhiding Yu, Ao Zhang, Hao Zhang, Yizhou Zhao, Ruijie Zheng, and Yuke Zhu. Gr00t n1: An open foundation model for generalist humanoid robots. arXiv preprint arXiv:2503.14734, 2025.",
        "chinese": "Bjorck et al. (2025) Johan Bjorck, Fernando Castañeda, Nikita Cherniadev, Xingye Da, Runyu Ding, Linxi “Jim” Fan, Yu Fang, Dieter Fox, Fengyuan Hu, Spencer Huang, Joel Jang, Zhenyu Jiang, Jan Kautz, Kaushil Kundalia, Lawrence Lao, Zhiqi Li, Zongyu Lin, Kevin Lin, Guilin Liu, Edith Llontop, Loic Magne, Ajay Mandlekar, Avnish Narayan, Soroush Nasiriany, Scott Reed, You Liang Tan, Guanzhi Wang, Zu Wang, Jing Wang, Qi Wang, Jiannan Xiang, Yuqi Xie, Yinzhen Xu, Zhenjia Xu, Seonghyeon Ye, Zhiding Yu, Ao Zhang, Hao Zhang, Yizhou Zhao, Ruijie Zheng, and Yuke Zhu. Gr00t n1: An open foundation model for generalist humanoid robots. arXiv preprint arXiv:2503.14734, 2025.",
        "evidenceKeys": [
          "bib.bib7"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib8",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Black et al. (2024) Kevin Black, Noah Brown, Danny Driess, Adnan Esmail, Michael Equi, Chelsea Finn, Niccolo Fusai, Lachy Groom, Karol Hausman, Brian Ichter, Szymon Jakubczak, Tim Jones, Liyiming Ke, Sergey Levine, Adrian Li-Bell, Mohith Mothukuri, Suraj Nair, Karl Pertsch, Lucy Xiaoyang Shi, James Tanner, Quan Vuong, Anna Walling, Haohuan Wang, and Ury Zhilinsky. $\\pi$0: A vision-language-action flow model for general robot control, 2024. arXiv preprint arXiv:2410.24164, 2024.",
        "chinese": "Black et al. (2024) Kevin Black, Noah Brown, Danny Driess, Adnan Esmail, Michael Equi, Chelsea Finn, Niccolo Fusai, Lachy Groom, Karol Hausman, Brian Ichter, Szymon Jakubczak, Tim Jones, Liyiming Ke, Sergey Levine, Adrian Li-Bell, Mohith Mothukuri, Suraj Nair, Karl Pertsch, Lucy Xiaoyang Shi, James Tanner, Quan Vuong, Anna Walling, Haohuan Wang, and Ury Zhilinsky. $\\pi$0: A vision-language-action flow model for general robot control, 2024. arXiv preprint arXiv:2410.24164, 2024.",
        "evidenceKeys": [
          "bib.bib8"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib9",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Black et al. (2025) Kevin Black, Noah Brown, James Darpinian, Karan Dhabalia, Danny Driess, Adnan Esmail, Michael Equi, Chelsea Finn, Niccolo Fusai, Manuel Y. Galliker, Dibya Ghosh, Lachy Groom, Karol Hausman, Brian Ichter, Szymon Jakubczak, Tim Jones, Liyiming Ke, Devin LeBlanc, Sergey Levine, Adrian Li-Bell, Mohith Mothukuri, Suraj Nair, Karl Pertsch, Allen Z. Ren, Lucy Xiaoyang Shi, Laura Smith, Jost Tobias Springenberg, Kyle Stachowicz, James Tanner, Quan Vuong, Homer Walke, Anna Walling, Haohuan Wang, Lili Yu, and Ury Zhilinsky. $\\pi_{0.5}$: a vision-language-action model with open-world generalization. arXiv preprint arXiv:2504.16054, 2025.",
        "chinese": "Black et al. (2025) Kevin Black, Noah Brown, James Darpinian, Karan Dhabalia, Danny Driess, Adnan Esmail, Michael Equi, Chelsea Finn, Niccolo Fusai, Manuel Y. Galliker, Dibya Ghosh, Lachy Groom, Karol Hausman, Brian Ichter, Szymon Jakubczak, Tim Jones, Liyiming Ke, Devin LeBlanc, Sergey Levine, Adrian Li-Bell, Mohith Mothukuri, Suraj Nair, Karl Pertsch, Allen Z. Ren, Lucy Xiaoyang Shi, Laura Smith, Jost Tobias Springenberg, Kyle Stachowicz, James Tanner, Quan Vuong, Homer Walke, Anna Walling, Haohuan Wang, Lili Yu, and Ury Zhilinsky. $\\pi_{0.5}$: a vision-language-action model with open-world generalization. arXiv preprint arXiv:2504.16054, 2025.",
        "evidenceKeys": [
          "bib.bib9"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib10",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Bolya et al. (2025) Daniel Bolya, Po-Yao Huang, Peize Sun, Jang Hyun Cho, Andrea Madotto, Chen Wei, Tengyu Ma, Jiale Zhi, Jathushan Rajasegaran, Hanoona Rasheed, Junke Wang, Marco Monteiro, Hu Xu, Shiyu Dong, Nikhila Ravi, Daniel Li, Piotr Dollár, and Christoph Feichtenhofer. Perception encoder: The best visual embeddings are not at the output of the network. arXiv preprint arXiv:2504.13181, 2025.",
        "chinese": "Bolya et al. (2025) Daniel Bolya, Po-Yao Huang, Peize Sun, Jang Hyun Cho, Andrea Madotto, Chen Wei, Tengyu Ma, Jiale Zhi, Jathushan Rajasegaran, Hanoona Rasheed, Junke Wang, Marco Monteiro, Hu Xu, Shiyu Dong, Nikhila Ravi, Daniel Li, Piotr Dollár, and Christoph Feichtenhofer. Perception encoder: The best visual embeddings are not at the output of the network. arXiv preprint arXiv:2504.13181, 2025.",
        "evidenceKeys": [
          "bib.bib10"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib11",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Brohan et al. (2023) Anthony Brohan, Noah Brown, Justice Carbajal, Yevgen Chebotar, Xi Chen, Krzysztof Choromanski, Tianli Ding, Danny Driess, Avinava Dubey, Chelsea Finn, Pete Florence, Chuyuan Fu, Montse Gonzalez Arenas, Keerthana Gopalakrishnan, Kehang Han, Karol Hausman, Alexander Herzog, Jasmine Hsu, Brian Ichter, Alex Irpan, Nikhil Joshi, Ryan Julian, Dmitry Kalashnikov, Yuheng Kuang, Isabel Leal, Lisa Lee, Tsang-Wei Edward Lee, Sergey Levine, Yao Lu, Henryk Michalewski, Igor Mordatch, Karl Pertsch, Kanishka Rao, Krista Reymann, Michael Ryoo, Grecia Salazar, Pannag Sanketi, Pierre Sermanet, Jaspiar Singh, Anikait Singh, Radu Soricut, Huong Tran, Vincent Vanhoucke, Quan Vuong, Ayzaan Wahid, Stefan Welker, Paul Wohlhart, Jialin Wu, Fei Xia, Ted Xiao, Peng Xu, Sichun Xu, Tianhe Yu, and Brianna Zitkovich. Rt-2: Vision-language-action models transfer web knowledge to robotic control. arXiv preprint arXiv:2307.15818, 2023.",
        "chinese": "Brohan et al. (2023) Anthony Brohan, Noah Brown, Justice Carbajal, Yevgen Chebotar, Xi Chen, Krzysztof Choromanski, Tianli Ding, Danny Driess, Avinava Dubey, Chelsea Finn, Pete Florence, Chuyuan Fu, Montse Gonzalez Arenas, Keerthana Gopalakrishnan, Kehang Han, Karol Hausman, Alexander Herzog, Jasmine Hsu, Brian Ichter, Alex Irpan, Nikhil Joshi, Ryan Julian, Dmitry Kalashnikov, Yuheng Kuang, Isabel Leal, Lisa Lee, Tsang-Wei Edward Lee, Sergey Levine, Yao Lu, Henryk Michalewski, Igor Mordatch, Karl Pertsch, Kanishka Rao, Krista Reymann, Michael Ryoo, Grecia Salazar, Pannag Sanketi, Pierre Sermanet, Jaspiar Singh, Anikait Singh, Radu Soricut, Huong Tran, Vincent Vanhoucke, Quan Vuong, Ayzaan Wahid, Stefan Welker, Paul Wohlhart, Jialin Wu, Fei Xia, Ted Xiao, Peng Xu, Sichun Xu, Tianhe Yu, and Brianna Zitkovich. Rt-2: Vision-language-action models transfer web knowledge to robotic control. arXiv preprint arXiv:2307.15818, 2023.",
        "evidenceKeys": [
          "bib.bib11"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib12",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Bruce et al. (2024) Jake Bruce, Michael Dennis, Ashley Edwards, Jack Parker-Holder, Yuge Shi, Edward Hughes, Matthew Lai, Aditi Mavalankar, Richie Steigerwald, Chris Apps, Yusuf Aytar, Sarah Bechtle, Feryal Behbahani, Stephanie Chan, Nicolas Heess, Lucy Gonzalez, Simon Osindero, Sherjil Ozair, Scott Reed, Jingwei Zhang, Konrad Zolna, Jeff Clune, Nando de Freitas, Satinder Singh, and Tim Rocktäschel. Genie: Generative interactive environments. In International Conference on Machine Learning, 2024.",
        "chinese": "Bruce et al. (2024) Jake Bruce, Michael Dennis, Ashley Edwards, Jack Parker-Holder, Yuge Shi, Edward Hughes, Matthew Lai, Aditi Mavalankar, Richie Steigerwald, Chris Apps, Yusuf Aytar, Sarah Bechtle, Feryal Behbahani, Stephanie Chan, Nicolas Heess, Lucy Gonzalez, Simon Osindero, Sherjil Ozair, Scott Reed, Jingwei Zhang, Konrad Zolna, Jeff Clune, Nando de Freitas, Satinder Singh, and Tim Rocktäschel. Genie: Generative interactive environments. In International Conference on Machine Learning, 2024.",
        "evidenceKeys": [
          "bib.bib12"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib13",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Cai et al. (2024) Mu Cai, Reuben Tan, Jianrui Zhang, Bocheng Zou, Kai Zhang, Feng Yao, Fangrui Zhu, Jing Gu, Yiwu Zhong, Yuzhang Shang, Yao Dou, Jaden Park, Jianfeng Gao, Yong Jae Lee, and Jianwei Yang. Temporalbench: Benchmarking fine-grained temporal understanding for multimodal video models. arXiv preprint arXiv:2410.10818, 2024.",
        "chinese": "Cai et al. (2024) Mu Cai, Reuben Tan, Jianrui Zhang, Bocheng Zou, Kai Zhang, Feng Yao, Fangrui Zhu, Jing Gu, Yiwu Zhong, Yuzhang Shang, Yao Dou, Jaden Park, Jianfeng Gao, Yong Jae Lee, and Jianwei Yang. Temporalbench: Benchmarking fine-grained temporal understanding for multimodal video models. arXiv preprint arXiv:2410.10818, 2024.",
        "evidenceKeys": [
          "bib.bib13"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib14",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Carreira et al. (2018) Joao Carreira, Eric Noland, Andras Banki-Horvath, Chloe Hillier, and Andrew Zisserman. A short note about kinetics-600. arXiv preprint arXiv:1808.01340, 2018.",
        "chinese": "Carreira et al. (2018) Joao Carreira, Eric Noland, Andras Banki-Horvath, Chloe Hillier, and Andrew Zisserman. A short note about kinetics-600. arXiv preprint arXiv:1808.01340, 2018.",
        "evidenceKeys": [
          "bib.bib14"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib15",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Carreira et al. (2019) Joao Carreira, Eric Noland, Chloe Hillier, and Andrew Zisserman. A short note on the kinetics-700 human action dataset. arXiv preprint arXiv:1907.06987, 2019.",
        "chinese": "Carreira et al. (2019) Joao Carreira, Eric Noland, Chloe Hillier, and Andrew Zisserman. A short note on the kinetics-700 human action dataset. arXiv preprint arXiv:1907.06987, 2019.",
        "evidenceKeys": [
          "bib.bib15"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib16",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Carreira et al. (2024) João Carreira, Dilara Gokay, Michael King, Chuhan Zhang, Ignacio Rocco, Aravindh Mahendran, Thomas Albert Keck, Joseph Heyward, Skanda Koppula, Etienne Pot, Goker Erdogan, Yana Hasson, Yi Yang, Klaus Greff, Guillaume Le Moing, Sjoerd van Steenkiste, Daniel Zoran, Drew A. Hudson, Pedro Vélez, Luisa Polanía, Luke Friedman, Chris Duvarney, Ross Goroshin, Kelsey Allen, Jacob Walker, Rishabh Kabra, Eric Aboussouan, Jennifer Sun, Thomas Kipf, Carl Doersch, Viorica Pătrăucean, Dima Damen, Pauline Luc, Mehdi S. M. Sajjadi, and Andrew Zisserman. Scaling 4d representations. arXiv preprint arXiv:2412.15212, 2024.",
        "chinese": "Carreira et al. (2024) João Carreira, Dilara Gokay, Michael King, Chuhan Zhang, Ignacio Rocco, Aravindh Mahendran, Thomas Albert Keck, Joseph Heyward, Skanda Koppula, Etienne Pot, Goker Erdogan, Yana Hasson, Yi Yang, Klaus Greff, Guillaume Le Moing, Sjoerd van Steenkiste, Daniel Zoran, Drew A. Hudson, Pedro Vélez, Luisa Polanía, Luke Friedman, Chris Duvarney, Ross Goroshin, Kelsey Allen, Jacob Walker, Rishabh Kabra, Eric Aboussouan, Jennifer Sun, Thomas Kipf, Carl Doersch, Viorica Pătrăucean, Dima Damen, Pauline Luc, Mehdi S. M. Sajjadi, and Andrew Zisserman. Scaling 4d representations. arXiv preprint arXiv:2412.15212, 2024.",
        "evidenceKeys": [
          "bib.bib16"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib17",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Chatila and Laumond (1985) Raja Chatila and Jean-Paul Laumond. Position referencing and consistent world modeling for mobile robots. In Proceedings of the IEEE International Conference on Robotics and Automation, volume 2, pages 138–145, 1985.",
        "chinese": "Chatila and Laumond (1985) Raja Chatila and Jean-Paul Laumond. Position referencing and consistent world modeling for mobile robots. In Proceedings of the IEEE International Conference on Robotics and Automation, volume 2, pages 138–145, 1985.",
        "evidenceKeys": [
          "bib.bib17"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib18",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Chebotar et al. (2021) Yevgen Chebotar, Karol Hausman, Yao Lu, Ted Xiao, Dmitry Kalashnikov, Jake Varley, Alex Irpan, Benjamin Eysenbach, Ryan Julian, Chelsea Finn, and Sergey Levine. Actionable models: Unsupervised offline reinforcement learning of robotic skills. arXiv preprint arXiv:2104.07749, 2021.",
        "chinese": "Chebotar et al. (2021) Yevgen Chebotar, Karol Hausman, Yao Lu, Ted Xiao, Dmitry Kalashnikov, Jake Varley, Alex Irpan, Benjamin Eysenbach, Ryan Julian, Chelsea Finn, and Sergey Levine. Actionable models: Unsupervised offline reinforcement learning of robotic skills. arXiv preprint arXiv:2104.07749, 2021.",
        "evidenceKeys": [
          "bib.bib18"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib19",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Chen et al. (2024) Zhe Chen, Weiyun Wang, Yue Cao, Yangzhou Liu, Zhangwei Gao, Erfei Cui, Jinguo Zhu, Shenglong Ye, Hao Tian, Zhaoyang Liu, Lixin Gu, Xuehui Wang, Qingyun Li, Yimin Ren, Zixuan Chen, Jiapeng Luo, Jiahao Wang, Tan Jiang, Bo Wang, Conghui He, Botian Shi, Xingcheng Zhang, Han Lv, Yi Wang, Wenqi Shao, Pei Chu, Zhongying Tu, Tong He, Zhiyong Wu, Huipeng Deng, Jiaye Ge, Kai Chen, Kaipeng Zhang, Limin Wang, Min Dou, Lewei Lu, Xizhou Zhu, Tong Lu, Dahua Lin, Yu Qiao, Jifeng Dai, and Wenhai Wang. Expanding performance boundaries of open-source multimodal models with model, data, and test-time scaling. arXiv preprint arXiv:2412.05271, 2024.",
        "chinese": "Chen et al. (2024) Zhe Chen, Weiyun Wang, Yue Cao, Yangzhou Liu, Zhangwei Gao, Erfei Cui, Jinguo Zhu, Shenglong Ye, Hao Tian, Zhaoyang Liu, Lixin Gu, Xuehui Wang, Qingyun Li, Yimin Ren, Zixuan Chen, Jiapeng Luo, Jiahao Wang, Tan Jiang, Bo Wang, Conghui He, Botian Shi, Xingcheng Zhang, Han Lv, Yi Wang, Wenqi Shao, Pei Chu, Zhongying Tu, Tong He, Zhiyong Wu, Huipeng Deng, Jiaye Ge, Kai Chen, Kaipeng Zhang, Limin Wang, Min Dou, Lewei Lu, Xizhou Zhu, Tong Lu, Dahua Lin, Yu Qiao, Jifeng Dai, and Wenhai Wang. Expanding performance boundaries of open-source multimodal models with model, data, and test-time scaling. arXiv preprint arXiv:2412.05271, 2024.",
        "evidenceKeys": [
          "bib.bib19"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib20",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Cho et al. (2025) Jang Hyun Cho, Andrea Madotto, Effrosyni Mavroudi, Triantafyllos Afouras, Tushar Nagarajan, Muhammad Maaz, Yale Song, Tengyu Ma, Shuming Hu, Suyog Jain, Miguel Martin, Huiyu Wang, Hanoona Rasheed, Peize Sun, Po-Yao Huang, Daniel Bolya, Nikhila Ravi, Shashank Jain, Tammy Stark, Shane Moon, Babak Damavandi, Vivian Lee, Andrew Westbury, Salman Khan, Philipp Krähenbühl, Piotr Dollár, Lorenzo Torresani, Kristen Grauman, and Christoph Feichtenhofer. Perceptionlm: Open-access data and models for detailed visual understanding. arXiv preprint arXiv:2504.13180, 2025.",
        "chinese": "Cho et al. (2025) Jang Hyun Cho, Andrea Madotto, Effrosyni Mavroudi, Triantafyllos Afouras, Tushar Nagarajan, Muhammad Maaz, Yale Song, Tengyu Ma, Shuming Hu, Suyog Jain, Miguel Martin, Huiyu Wang, Hanoona Rasheed, Peize Sun, Po-Yao Huang, Daniel Bolya, Nikhila Ravi, Shashank Jain, Tammy Stark, Shane Moon, Babak Damavandi, Vivian Lee, Andrew Westbury, Salman Khan, Philipp Krähenbühl, Piotr Dollár, Lorenzo Torresani, Kristen Grauman, and Christoph Feichtenhofer. Perceptionlm: Open-access data and models for detailed visual understanding. arXiv preprint arXiv:2504.13180, 2025.",
        "evidenceKeys": [
          "bib.bib20"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib21",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Clark (2013) Andy Clark. Whatever next? predictive brains, situated agents, and the future of cognitive science. Behavioral and brain sciences, 36(3):181–204, 2013.",
        "chinese": "Clark (2013) Andy Clark. Whatever next? predictive brains, situated agents, and the future of cognitive science. Behavioral and brain sciences, 36(3):181–204, 2013.",
        "evidenceKeys": [
          "bib.bib21"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib22",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Cores et al. (2024) Daniel Cores, Michael Dorkenwald, Manuel Mucientes, Cees GM Snoek, and Yuki M Asano. Tvbench: Redesigning video-language evaluation. arXiv preprint arXiv:2410.07752, 2024.",
        "chinese": "Cores et al. (2024) Daniel Cores, Michael Dorkenwald, Manuel Mucientes, Cees GM Snoek, and Yuki M Asano. Tvbench: Redesigning video-language evaluation. arXiv preprint arXiv:2410.07752, 2024.",
        "evidenceKeys": [
          "bib.bib22"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib23",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Craik (1967) Kenneth James Williams Craik. The Nature of Explanation, volume 445. CUP Archive, 1967.",
        "chinese": "Craik (1967) Kenneth James Williams Craik. The Nature of Explanation, volume 445. CUP Archive, 1967.",
        "evidenceKeys": [
          "bib.bib23"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib24",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Damen et al. (2022) Dima Damen, Hazel Doughty, Giovanni Maria Farinella, Antonino Furnari, Jian Ma, Evangelos Kazakos, Davide Moltisanti, Jonathan Munro, Toby Perrett, Will Price, and Michael Wray. Rescaling egocentric vision: Collection, pipeline and challenges for epic-kitchens-100. International Journal of Computer Vision (IJCV), 130:33–55, 2022. https://doi.org/10.1007/s11263-021-01531-2.",
        "chinese": "Damen et al. (2022) Dima Damen, Hazel Doughty, Giovanni Maria Farinella, Antonino Furnari, Jian Ma, Evangelos Kazakos, Davide Moltisanti, Jonathan Munro, Toby Perrett, Will Price, and Michael Wray. Rescaling egocentric vision: Collection, pipeline and challenges for epic-kitchens-100. International Journal of Computer Vision (IJCV), 130:33–55, 2022. https://doi.org/10.1007/s11263-021-01531-2.",
        "evidenceKeys": [
          "bib.bib24"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib25",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Darcet et al. (2024) Timothée Darcet, Maxime Oquab, Julien Mairal, and Piotr Bojanowski. Vision transformers need registers. In The Twelfth International Conference on Learning Representations, 2024.",
        "chinese": "Darcet et al. (2024) Timothée Darcet, Maxime Oquab, Julien Mairal, and Piotr Bojanowski. Vision transformers need registers. In The Twelfth International Conference on Learning Representations, 2024.",
        "evidenceKeys": [
          "bib.bib25"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib26",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Das et al. (2020) Neha Das, Sarah Bechtle, Todor Davchev, Dinesh Jayaraman, Akshara Rai, and Franziska Meier. Model-based inverse reinforcement learning from visual demonstration. In Conference on Robot Learning (CoRL), 2020.",
        "chinese": "Das et al. (2020) Neha Das, Sarah Bechtle, Todor Davchev, Dinesh Jayaraman, Akshara Rai, and Franziska Meier. Model-based inverse reinforcement learning from visual demonstration. In Conference on Robot Learning (CoRL), 2020.",
        "evidenceKeys": [
          "bib.bib26"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib27",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Deng et al. (2009) Jia Deng, Wei Dong, Richard Socher, Li-Jia Li, Kai Li, and Li Fei-Fei. Imagenet: A large-scale hierarchical image database. In Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition, pages 248–255, 2009.",
        "chinese": "Deng et al. (2009) Jia Deng, Wei Dong, Richard Socher, Li-Jia Li, Kai Li, and Li Fei-Fei. Imagenet: A large-scale hierarchical image database. In Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition, pages 248–255, 2009.",
        "evidenceKeys": [
          "bib.bib27"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib28",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Dosovitskiy et al. (2020) Alexey Dosovitskiy, Lucas Beyer, Alexander Kolesnikov, Dirk Weissenborn, Xiaohua Zhai, Thomas Unterthiner, Mostafa Dehghani, Matthias Minderer, Georg Heigold, Sylvain Gelly, Jakob Uszkoreit, and Neil Houlsby. An image is worth 16x16 words: Transformers for image recognition at scale. arXiv preprint arXiv:2010.11929, 2020.",
        "chinese": "Dosovitskiy et al. (2020) Alexey Dosovitskiy, Lucas Beyer, Alexander Kolesnikov, Dirk Weissenborn, Xiaohua Zhai, Thomas Unterthiner, Mostafa Dehghani, Matthias Minderer, Georg Heigold, Sylvain Gelly, Jakob Uszkoreit, and Neil Houlsby. An image is worth 16x16 words: Transformers for image recognition at scale. arXiv preprint arXiv:2010.11929, 2020.",
        "evidenceKeys": [
          "bib.bib28"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib29",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Driess et al. (2023) Danny Driess, Fei Xia, Mehdi S. M. Sajjadi, Corey Lynch, Aakanksha Chowdhery, Brian Ichter, Ayzaan Wahid, Jonathan Tompson, Quan Vuong, Tianhe Yu, Wenlong Huang, Yevgen Chebotar, Pierre Sermanet, Daniel Duckworth, Sergey Levine, Vincent Vanhoucke, Karol Hausman, Marc Toussaint, Klaus Greff, Andy Zeng, Igor Mordatch, and Pete Florence. PaLM-E: An embodied multimodal language model. arXiv preprint arXiv:2023.03378, 2023.",
        "chinese": "Driess et al. (2023) Danny Driess, Fei Xia, Mehdi S. M. Sajjadi, Corey Lynch, Aakanksha Chowdhery, Brian Ichter, Ayzaan Wahid, Jonathan Tompson, Quan Vuong, Tianhe Yu, Wenlong Huang, Yevgen Chebotar, Pierre Sermanet, Daniel Duckworth, Sergey Levine, Vincent Vanhoucke, Karol Hausman, Marc Toussaint, Klaus Greff, Andy Zeng, Igor Mordatch, and Pete Florence. PaLM-E: An embodied multimodal language model. arXiv preprint arXiv:2023.03378, 2023.",
        "evidenceKeys": [
          "bib.bib29"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib30",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Du et al. (2023) Yilun Du, Sherry Yang, Bo Dai, Hanjun Dai, Ofir Nachum, Josh Tenenbaum, Dale Schuurmans, and Pieter Abbeel. Learning universal policies via text-guided video generation. Advances in Neural Information Processing Systems, 36:9156–9172, 2023.",
        "chinese": "Du et al. (2023) Yilun Du, Sherry Yang, Bo Dai, Hanjun Dai, Ofir Nachum, Josh Tenenbaum, Dale Schuurmans, and Pieter Abbeel. Learning universal policies via text-guided video generation. Advances in Neural Information Processing Systems, 36:9156–9172, 2023.",
        "evidenceKeys": [
          "bib.bib30"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib31",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Du et al. (2024) Yilun Du, Sherry Yang, Pete Florence, Fei Xia, Ayzaan Wahid, Brian Ichter, Pierre Sermanet, Tianhe Yu, Pieter Abbeel, Joshua B. Tenenbaum, Leslie Pack Kaelbling, Andy Zeng, and Jonathan Tompson. Video language planning. ICLR, 2024.",
        "chinese": "Du et al. (2024) Yilun Du, Sherry Yang, Pete Florence, Fei Xia, Ayzaan Wahid, Brian Ichter, Pierre Sermanet, Tianhe Yu, Pieter Abbeel, Joshua B. Tenenbaum, Leslie Pack Kaelbling, Andy Zeng, and Jonathan Tompson. Video language planning. ICLR, 2024.",
        "evidenceKeys": [
          "bib.bib31"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib32",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Ebert et al. (2017) Frederik Ebert, Chelsea Finn, Alex X Lee, and Sergey Levine. Self-supervised visual planning with temporal skip connections. CoRL, 12(16):23, 2017.",
        "chinese": "Ebert et al. (2017) Frederik Ebert, Chelsea Finn, Alex X Lee, and Sergey Levine. Self-supervised visual planning with temporal skip connections. CoRL, 12(16):23, 2017.",
        "evidenceKeys": [
          "bib.bib32"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib33",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Ebert et al. (2018) Frederik Ebert, Chelsea Finn, Sudeep Dasari, Annie Xie, Alex Lee, and Sergey Levine. Visual foresight: Model-based deep reinforcement learning for vision-based robotic control. arXiv preprint arXiv:1812.00568, 2018.",
        "chinese": "Ebert et al. (2018) Frederik Ebert, Chelsea Finn, Sudeep Dasari, Annie Xie, Alex Lee, and Sergey Levine. Visual foresight: Model-based deep reinforcement learning for vision-based robotic control. arXiv preprint arXiv:1812.00568, 2018.",
        "evidenceKeys": [
          "bib.bib33"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib34",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Fan et al. (2025) David Fan, Shengbang Tong, Jiachen Zhu, Koustuv Sinha, Zhuang Liu, Xinlei Chen, Michael Rabbat, Nicolas Ballas, Yann LeCun, Amir Bar, and Saining Xie. Scaling language-free visual representation learning. arXiv preprint arXiv:2504.01017, 2025.",
        "chinese": "Fan et al. (2025) David Fan, Shengbang Tong, Jiachen Zhu, Koustuv Sinha, Zhuang Liu, Xinlei Chen, Michael Rabbat, Nicolas Ballas, Yann LeCun, Amir Bar, and Saining Xie. Scaling language-free visual representation learning. arXiv preprint arXiv:2504.01017, 2025.",
        "evidenceKeys": [
          "bib.bib34"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib35",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Fini et al. (2024) Enrico Fini, Mustafa Shukor, Xiujun Li, Philipp Dufter, Michal Klein, David Haldimann, Sai Aitharaju, Victor Guilherme Turrisi da Costa, Louis Béthune, Zhe Gan, Alexander T Toshev, Marcin Eichner, Moin Nabi, Yinfei Yang, Joshua M. Susskind, and Alaaeldin El-Nouby. Multimodal autoregressive pre-training of large vision encoders. arXiv preprint arXiv:2411.14402, 2024.",
        "chinese": "Fini et al. (2024) Enrico Fini, Mustafa Shukor, Xiujun Li, Philipp Dufter, Michal Klein, David Haldimann, Sai Aitharaju, Victor Guilherme Turrisi da Costa, Louis Béthune, Zhe Gan, Alexander T Toshev, Marcin Eichner, Moin Nabi, Yinfei Yang, Joshua M. Susskind, and Alaaeldin El-Nouby. Multimodal autoregressive pre-training of large vision encoders. arXiv preprint arXiv:2411.14402, 2024.",
        "evidenceKeys": [
          "bib.bib35"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib36",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Finn and Levine (2017) Chelsea Finn and Sergey Levine. Deep visual foresight for planning robot motion. In 2017 IEEE international conference on robotics and automation (ICRA), pages 2786–2793. IEEE, 2017.",
        "chinese": "Finn and Levine (2017) Chelsea Finn and Sergey Levine. Deep visual foresight for planning robot motion. In 2017 IEEE international conference on robotics and automation (ICRA), pages 2786–2793. IEEE, 2017.",
        "evidenceKeys": [
          "bib.bib36"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib37",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Finn et al. (2016) Chelsea Finn, Ian Goodfellow, and Sergey Levine. Unsupervised learning for physical interaction through video prediction. Advances in Neural Information Processing Systems, 29, 2016.",
        "chinese": "Finn et al. (2016) Chelsea Finn, Ian Goodfellow, and Sergey Levine. Unsupervised learning for physical interaction through video prediction. Advances in Neural Information Processing Systems, 29, 2016.",
        "evidenceKeys": [
          "bib.bib37"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib38",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Fragkiadaki et al. (2015) Katerina Fragkiadaki, Pulkit Agrawal, Sergey Levine, and Jitendra Malik. Learning visual predictive models of physics for playing billiards. arXiv preprint arXiv:1511.07404, 2015.",
        "chinese": "Fragkiadaki et al. (2015) Katerina Fragkiadaki, Pulkit Agrawal, Sergey Levine, and Jitendra Malik. Learning visual predictive models of physics for playing billiards. arXiv preprint arXiv:1511.07404, 2015.",
        "evidenceKeys": [
          "bib.bib38"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib39",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Friston (2010) Karl Friston. The free-energy principle: a unified brain theory? Nature Reviews Neuroscience, 11(2):127–138, 2010.",
        "chinese": "Friston (2010) Karl Friston. The free-energy principle: a unified brain theory? Nature Reviews Neuroscience, 11(2):127–138, 2010.",
        "evidenceKeys": [
          "bib.bib39"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib40",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Gao et al. (2024) Leo Gao, Jonathan Tow, Baber Abbasi, Stella Biderman, Sid Black, Anthony DiPofi, Charles Foster, Laurence Golding, Jeffrey Hsu, Alain Le Noac’h, Haonan Li, Kyle McDonell, Niklas Muennighoff, Chris Ociepa, Jason Phang, Laria Reynolds, Hailey Schoelkopf, Aviya Skowron, Lintang Sutawika, Eric Tang, Anish Thite, Ben Wang, Kevin Wang, and Andy Zou. A framework for few-shot language model evaluation, 07 2024. https://zenodo.org/records/12608602.",
        "chinese": "Gao et al. (2024) Leo Gao, Jonathan Tow, Baber Abbasi, Stella Biderman, Sid Black, Anthony DiPofi, Charles Foster, Laurence Golding, Jeffrey Hsu, Alain Le Noac’h, Haonan Li, Kyle McDonell, Niklas Muennighoff, Chris Ociepa, Jason Phang, Laria Reynolds, Hailey Schoelkopf, Aviya Skowron, Lintang Sutawika, Eric Tang, Anish Thite, Ben Wang, Kevin Wang, and Andy Zou. A framework for few-shot language model evaluation, 07 2024. https://zenodo.org/records/12608602.",
        "evidenceKeys": [
          "bib.bib40"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib41",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Ghosh et al. (2019) Dibya Ghosh, Abhishek Gupta, Ashwin Reddy, Justin Fu, Coline Devin, Benjamin Eysenbach, and Sergey Levine. Learning to reach goals via iterated supervised learning. arXiv preprint arXiv:1912.06088, 2019.",
        "chinese": "Ghosh et al. (2019) Dibya Ghosh, Abhishek Gupta, Ashwin Reddy, Justin Fu, Coline Devin, Benjamin Eysenbach, and Sergey Levine. Learning to reach goals via iterated supervised learning. arXiv preprint arXiv:1912.06088, 2019.",
        "evidenceKeys": [
          "bib.bib41"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib42",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Gibson (1979) James J Gibson. The ecological approach to visual perception: classic edition. Psychology press, 1979.",
        "chinese": "Gibson (1979) James J Gibson. The ecological approach to visual perception: classic edition. Psychology press, 1979.",
        "evidenceKeys": [
          "bib.bib42"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib43",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Goyal et al. (2017) Raghav Goyal, Samira Ebrahimi Kahou, Vincent Michalski, Joanna Materzyńska, Susanne Westphal, Heuna Kim, Valentin Haenel, Ingo Fruend, Peter Yianilos, Moritz Mueller-Freitag, Florian Hoppe, Christian Thurau, Ingo Bax, and Roland Memisevic. The \"something something\" video database for learning and evaluating visual common sense. In Proceedings of the IEEE international conference on computer vision, pages 5842–5850, 2017.",
        "chinese": "Goyal et al. (2017) Raghav Goyal, Samira Ebrahimi Kahou, Vincent Michalski, Joanna Materzyńska, Susanne Westphal, Heuna Kim, Valentin Haenel, Ingo Fruend, Peter Yianilos, Moritz Mueller-Freitag, Florian Hoppe, Christian Thurau, Ingo Bax, and Roland Memisevic. The \"something something\" video database for learning and evaluating visual common sense. In Proceedings of the IEEE international conference on computer vision, pages 5842–5850, 2017.",
        "evidenceKeys": [
          "bib.bib43"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib44",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Grattafiori et al. (2024) Aaron Grattafiori, Abhimanyu Dubey, Abhinav Jauhri, Abhinav Pandey, Abhishek Kadian, Ahmad Al-Dahle, Aiesha Letman, Akhil Mathur, Alan Schelten, Alex Vaughan, et al. The llama 3 herd of models. arXiv preprint arXiv:2407.21783, 2024.",
        "chinese": "Grattafiori et al. (2024) Aaron Grattafiori, Abhimanyu Dubey, Abhinav Jauhri, Abhinav Pandey, Abhishek Kadian, Ahmad Al-Dahle, Aiesha Letman, Akhil Mathur, Alan Schelten, Alex Vaughan, et al. The llama 3 herd of models. arXiv preprint arXiv:2407.21783, 2024.",
        "evidenceKeys": [
          "bib.bib44"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib45",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Grill et al. (2020) Jean-Bastien Grill, Florian Strub, Florent Altché, Corentin Tallec, Pierre H. Richemond, Elena Buchatskaya, Carl Doersch, Bernardo Avila Pires, Zhaohan Daniel Guo, Mohammad Gheshlaghi Azar, Bilal Piot, Koray Kavukcuoglu, Rémi Munos, and Michal Valko. Bootstrap your own latent-a new approach to self-supervised learning. Advances in Neural Information Processing Systems, 33:21271–21284, 2020.",
        "chinese": "Grill et al. (2020) Jean-Bastien Grill, Florian Strub, Florent Altché, Corentin Tallec, Pierre H. Richemond, Elena Buchatskaya, Carl Doersch, Bernardo Avila Pires, Zhaohan Daniel Guo, Mohammad Gheshlaghi Azar, Bilal Piot, Koray Kavukcuoglu, Rémi Munos, and Michal Valko. Bootstrap your own latent-a new approach to self-supervised learning. Advances in Neural Information Processing Systems, 33:21271–21284, 2020.",
        "evidenceKeys": [
          "bib.bib45"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib46",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Gupta et al. (2022) Agrim Gupta, Stephen Tian, Yunzhi Zhang, Jiajun Wu, Roberto Martín-Martín, and Li Fei-Fei. Maskvit: Masked visual pre-training for video prediction. arXiv preprint arXiv:2206.11894, 2022.",
        "chinese": "Gupta et al. (2022) Agrim Gupta, Stephen Tian, Yunzhi Zhang, Jiajun Wu, Roberto Martín-Martín, and Li Fei-Fei. Maskvit: Masked visual pre-training for video prediction. arXiv preprint arXiv:2206.11894, 2022.",
        "evidenceKeys": [
          "bib.bib46"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib47",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Ha and Schmidhuber (2018) David Ha and Jürgen Schmidhuber. World models. arXiv preprint arXiv:1803.10122, 2018.",
        "chinese": "Ha and Schmidhuber (2018) David Ha and Jürgen Schmidhuber. World models. arXiv preprint arXiv:1803.10122, 2018.",
        "evidenceKeys": [
          "bib.bib47"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib48",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Hafner et al. (2019a) Danijar Hafner, Timothy Lillicrap, Jimmy Ba, and Mohammad Norouzi. Dream to control: Learning behaviors by latent imagination. arXiv preprint arXiv:1912.01603, 2019a.",
        "chinese": "Hafner et al. (2019a) Danijar Hafner, Timothy Lillicrap, Jimmy Ba, and Mohammad Norouzi. Dream to control: Learning behaviors by latent imagination. arXiv preprint arXiv:1912.01603, 2019a.",
        "evidenceKeys": [
          "bib.bib48"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib49",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Hafner et al. (2019b) Danijar Hafner, Timothy Lillicrap, Ian Fischer, Ruben Villegas, David Ha, Honglak Lee, and James Davidson. Learning latent dynamics for planning from pixels. In International conference on machine learning, pages 2555–2565. PMLR, 2019b.",
        "chinese": "Hafner et al. (2019b) Danijar Hafner, Timothy Lillicrap, Ian Fischer, Ruben Villegas, David Ha, Honglak Lee, and James Davidson. Learning latent dynamics for planning from pixels. In International conference on machine learning, pages 2555–2565. PMLR, 2019b.",
        "evidenceKeys": [
          "bib.bib49"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib50",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Hafner et al. (2023) Danijar Hafner, Jurgis Pasukonis, Jimmy Ba, and Timothy Lillicrap. Mastering diverse domains through world models. arXiv preprint arXiv:2301.04104, 2023.",
        "chinese": "Hafner et al. (2023) Danijar Hafner, Jurgis Pasukonis, Jimmy Ba, and Timothy Lillicrap. Mastering diverse domains through world models. arXiv preprint arXiv:2301.04104, 2023.",
        "evidenceKeys": [
          "bib.bib50"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib51",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Hägele et al. (2024) Alex Hägele, Elie Bakouch, Atli Kosson, Loubna Ben Allal, Leandro Von Werra, and Martin Jaggi. Scaling laws and compute-optimal training beyond fixed training durations. Advances in Neural Information Processing Systems, 37:76232–76264, 2024.",
        "chinese": "Hägele et al. (2024) Alex Hägele, Elie Bakouch, Atli Kosson, Loubna Ben Allal, Leandro Von Werra, and Martin Jaggi. Scaling laws and compute-optimal training beyond fixed training durations. Advances in Neural Information Processing Systems, 37:76232–76264, 2024.",
        "evidenceKeys": [
          "bib.bib51"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib52",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Hansen et al. (2022) Nicklas Hansen, Xiaolong Wang, and Hao Su. Temporal difference learning for model predictive control. arXiv preprint arXiv:2203.04955, 2022.",
        "chinese": "Hansen et al. (2022) Nicklas Hansen, Xiaolong Wang, and Hao Su. Temporal difference learning for model predictive control. arXiv preprint arXiv:2203.04955, 2022.",
        "evidenceKeys": [
          "bib.bib52"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib53",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Hansen et al. (2023) Nicklas Hansen, Hao Su, and Xiaolong Wang. Td-mpc2: Scalable, robust world models for continuous control. arXiv preprint arXiv:2310.16828, 2023.",
        "chinese": "Hansen et al. (2023) Nicklas Hansen, Hao Su, and Xiaolong Wang. Td-mpc2: Scalable, robust world models for continuous control. arXiv preprint arXiv:2310.16828, 2023.",
        "evidenceKeys": [
          "bib.bib53"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib54",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Hill (1979) John Hill. Real time control of a robot with a mobile camera. In Proc. 9th Int. Symp. on Industrial Robots, pages 233–245, 1979.",
        "chinese": "Hill (1979) John Hill. Real time control of a robot with a mobile camera. In Proc. 9th Int. Symp. on Industrial Robots, pages 233–245, 1979.",
        "evidenceKeys": [
          "bib.bib54"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib55",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Hu et al. (2023) Anthony Hu, Lloyd Russell, Hudson Yeo, Zak Murez, George Fedoseev, Alex Kendall, Jamie Shotton, and Gianluca Corrado. Gaia-1: A generative world model for autonomous driving. arXiv preprint arXiv:2309.17080, 2023.",
        "chinese": "Hu et al. (2023) Anthony Hu, Lloyd Russell, Hudson Yeo, Zak Murez, George Fedoseev, Alex Kendall, Jamie Shotton, and Gianluca Corrado. Gaia-1: A generative world model for autonomous driving. arXiv preprint arXiv:2309.17080, 2023.",
        "evidenceKeys": [
          "bib.bib55"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib56",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Hu et al. (2024) Edward S Hu, Kwangjun Ahn, Qinghua Liu, Haoran Xu, Manan Tomar, Ada Langford, Dinesh Jayaraman, Alex Lamb, and John Langford. Learning to achieve goals with belief state transformers. arXiv preprint arXiv:2410.23506, 2024.",
        "chinese": "Hu et al. (2024) Edward S Hu, Kwangjun Ahn, Qinghua Liu, Haoran Xu, Manan Tomar, Ada Langford, Dinesh Jayaraman, Alex Lamb, and John Langford. Learning to achieve goals with belief state transformers. arXiv preprint arXiv:2410.23506, 2024.",
        "evidenceKeys": [
          "bib.bib56"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib57",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Jaegle et al. (2021) Andrew Jaegle, Sebastian Borgeaud, Jean-Baptiste Alayrac, Carl Doersch, Catalin Ionescu, David Ding, Skanda Koppula, Daniel Zoran, Andrew Brock, Evan Shelhamer, Olivier Hénaff, Matthew M. Botvinick, Andrew Zisserman, Oriol Vinyals, and Joāo Carreira. Perceiver io: A general architecture for structured inputs & outputs. arXiv preprint arXiv:2107.14795, 2021.",
        "chinese": "Jaegle et al. (2021) Andrew Jaegle, Sebastian Borgeaud, Jean-Baptiste Alayrac, Carl Doersch, Catalin Ionescu, David Ding, Skanda Koppula, Daniel Zoran, Andrew Brock, Evan Shelhamer, Olivier Hénaff, Matthew M. Botvinick, Andrew Zisserman, Oriol Vinyals, and Joāo Carreira. Perceiver io: A general architecture for structured inputs & outputs. arXiv preprint arXiv:2107.14795, 2021.",
        "evidenceKeys": [
          "bib.bib57"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib58",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Jang et al. (2022) Eric Jang, Alex Irpan, Mohi Khansari, Daniel Kappler, Frederik Ebert, Corey Lynch, Sergey Levine, and Chelsea Finn. Bc-z: Zero-shot task generalization with robotic imitation learning. In Conference on Robot Learning, pages 991–1002. PMLR, 2022.",
        "chinese": "Jang et al. (2022) Eric Jang, Alex Irpan, Mohi Khansari, Daniel Kappler, Frederik Ebert, Corey Lynch, Sergey Levine, and Chelsea Finn. Bc-z: Zero-shot task generalization with robotic imitation learning. In Conference on Robot Learning, pages 991–1002. PMLR, 2022.",
        "evidenceKeys": [
          "bib.bib58"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib59",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Kay et al. (2017) Will Kay, Joao Carreira, Karen Simonyan, Brian Zhang, Chloe Hillier, Sudheendra Vijayanarasimhan, Fabio Viola, Tim Green, Trevor Back, Paul Natsev, Mustafa Suleyman, and Andrew Zisserman. The kinetics human action video dataset. arXiv preprint arXiv:1705.06950, 2017.",
        "chinese": "Kay et al. (2017) Will Kay, Joao Carreira, Karen Simonyan, Brian Zhang, Chloe Hillier, Sudheendra Vijayanarasimhan, Fabio Viola, Tim Green, Trevor Back, Paul Natsev, Mustafa Suleyman, and Andrew Zisserman. The kinetics human action video dataset. arXiv preprint arXiv:1705.06950, 2017.",
        "evidenceKeys": [
          "bib.bib59"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib60",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Khazatsky et al. (2024) Alexander Khazatsky, Karl Pertsch, Suraj Nair, Ashwin Balakrishna, Sudeep Dasari, Siddharth Karamcheti, Soroush Nasiriany, Mohan Kumar Srirama, Lawrence Yunliang Chen, Kirsty Ellis, Peter David Fagan, Joey Hejna, Masha Itkina, Marion Lepert, Yecheng Jason Ma, Patrick Tree Miller, Jimmy Wu, Suneel Belkhale, Shivin Dass, Huy Ha, Arhan Jain, Abraham Lee, Youngwoon Lee, Marius Memmel, Sungjae Park, Ilija Radosavovic, Kaiyuan Wang, Albert Zhan, Kevin Black, Cheng Chi, Kyle Beltran Hatch, Shan Lin, Jingpei Lu, Jean Mercat, Abdul Rehman, Pannag R Sanketi, Archit Sharma, Cody Simpson, Quan Vuong, Homer Rich Walke, Blake Wulfe, Ted Xiao, Jonathan Heewon Yang, Arefeh Yavary, Tony Z. Zhao, Christopher Agia, Rohan Baijal, Mateo Guaman Castro, Daphne Chen, Qiuyu Chen, Trinity Chung, Jaimyn Drake, Ethan Paul Foster, Jensen Gao, Vitor Guizilini, David Antonio Herrera, Minho Heo, Kyle Hsu, Jiaheng Hu, Muhammad Zubair Irshad, Donovon Jackson, Charlotte Le, Yunshuang Li, Kevin Lin, Roy Lin, Zehan Ma, Abhiram Maddukuri, Suvir Mirchandani, Daniel Morton, Tony Nguyen, Abigail O’Neill, Rosario Scalise, Derick Seale, Victor Son, Stephen Tian, Emi Tran, Andrew E. Wang, Yilin Wu, Annie Xie, Jingyun Yang, Patrick Yin, Yunchu Zhang, Osbert Bastani, Glen Berseth, Jeannette Bohg, Ken Goldberg, Abhinav Gupta, Abhishek Gupta, Dinesh Jayaraman, Joseph J Lim, Jitendra Malik, Roberto Martín-Martín, Subramanian Ramamoorthy, Dorsa Sadigh, Shuran Song, Jiajun Wu, Michael C. Yip, Yuke Zhu, Thomas Kollar, Sergey Levine, and Chelsea Finn. Droid: A large-scale in-the-wild robot manipulation dataset. arXiv preprint arXiv:2403.12945, 2024.",
        "chinese": "Khazatsky et al. (2024) Alexander Khazatsky, Karl Pertsch, Suraj Nair, Ashwin Balakrishna, Sudeep Dasari, Siddharth Karamcheti, Soroush Nasiriany, Mohan Kumar Srirama, Lawrence Yunliang Chen, Kirsty Ellis, Peter David Fagan, Joey Hejna, Masha Itkina, Marion Lepert, Yecheng Jason Ma, Patrick Tree Miller, Jimmy Wu, Suneel Belkhale, Shivin Dass, Huy Ha, Arhan Jain, Abraham Lee, Youngwoon Lee, Marius Memmel, Sungjae Park, Ilija Radosavovic, Kaiyuan Wang, Albert Zhan, Kevin Black, Cheng Chi, Kyle Beltran Hatch, Shan Lin, Jingpei Lu, Jean Mercat, Abdul Rehman, Pannag R Sanketi, Archit Sharma, Cody Simpson, Quan Vuong, Homer Rich Walke, Blake Wulfe, Ted Xiao, Jonathan Heewon Yang, Arefeh Yavary, Tony Z. Zhao, Christopher Agia, Rohan Baijal, Mateo Guaman Castro, Daphne Chen, Qiuyu Chen, Trinity Chung, Jaimyn Drake, Ethan Paul Foster, Jensen Gao, Vitor Guizilini, David Antonio Herrera, Minho Heo, Kyle Hsu, Jiaheng Hu, Muhammad Zubair Irshad, Donovon Jackson, Charlotte Le, Yunshuang Li, Kevin Lin, Roy Lin, Zehan Ma, Abhiram Maddukuri, Suvir Mirchandani, Daniel Morton, Tony Nguyen, Abigail O’Neill, Rosario Scalise, Derick Seale, Victor Son, Stephen Tian, Emi Tran, Andrew E. Wang, Yilin Wu, Annie Xie, Jingyun Yang, Patrick Yin, Yunchu Zhang, Osbert Bastani, Glen Berseth, Jeannette Bohg, Ken Goldberg, Abhinav Gupta, Abhishek Gupta, Dinesh Jayaraman, Joseph J Lim, Jitendra Malik, Roberto Martín-Martín, Subramanian Ramamoorthy, Dorsa Sadigh, Shuran Song, Jiajun Wu, Michael C. Yip, Yuke Zhu, Thomas Kollar, Sergey Levine, and Chelsea Finn. Droid: A large-scale in-the-wild robot manipulation dataset. arXiv preprint arXiv:2403.12945, 2024.",
        "evidenceKeys": [
          "bib.bib60"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib61",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Kim et al. (2024) Moo Jin Kim, Karl Pertsch, Siddharth Karamcheti, Ted Xiao, Ashwin Balakrishna, Suraj Nair, Rafael Rafailov, Ethan Foster, Grace Lam, Pannag Sanketi, Quan Vuong, Thomas Kollar, Benjamin Burchfiel, Russ Tedrake, Dorsa Sadigh, Sergey Levine, Percy Liang, and Chelsea Finn. Openvla: An open-source vision-language-action model. arXiv preprint arXiv:2406.09246, 2024.",
        "chinese": "Kim et al. (2024) Moo Jin Kim, Karl Pertsch, Siddharth Karamcheti, Ted Xiao, Ashwin Balakrishna, Suraj Nair, Rafael Rafailov, Ethan Foster, Grace Lam, Pannag Sanketi, Quan Vuong, Thomas Kollar, Benjamin Burchfiel, Russ Tedrake, Dorsa Sadigh, Sergey Levine, Percy Liang, and Chelsea Finn. Openvla: An open-source vision-language-action model. arXiv preprint arXiv:2406.09246, 2024.",
        "evidenceKeys": [
          "bib.bib61"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib62",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Krojer et al. (2024) Benno Krojer, Mojtaba Komeili, Candace Ross, Quentin Garrido, Koustuv Sinha, Nicolas Ballas, and Mido Assran. A shortcut-aware video-qa benchmark for physical understanding via minimal video pairs. preprint, 2024.",
        "chinese": "Krojer et al. (2024) Benno Krojer, Mojtaba Komeili, Candace Ross, Quentin Garrido, Koustuv Sinha, Nicolas Ballas, and Mido Assran. A shortcut-aware video-qa benchmark for physical understanding via minimal video pairs. preprint, 2024.",
        "evidenceKeys": [
          "bib.bib62"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib63",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Lancaster et al. (2024) Patrick Lancaster, Nicklas Hansen, Aravind Rajeswaran, and Vikash Kumar. Modem-v2: Visuo-motor world models for real-world robot manipulation. In IEEE International Conference on Robotics and Automation (ICRA), pages 7530–7537, 2024.",
        "chinese": "Lancaster et al. (2024) Patrick Lancaster, Nicklas Hansen, Aravind Rajeswaran, and Vikash Kumar. Modem-v2: Visuo-motor world models for real-world robot manipulation. In IEEE International Conference on Robotics and Automation (ICRA), pages 7530–7537, 2024.",
        "evidenceKeys": [
          "bib.bib63"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib64",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "LeCun (2022) Yann LeCun. A path towards autonomous machine intelligence version 0.9.2, 2022-06-27. Open Review, 62(1):1–62, 2022.",
        "chinese": "LeCun (2022) Yann LeCun. A path towards autonomous machine intelligence version 0.9.2, 2022-06-27. Open Review, 62(1):1–62, 2022.",
        "evidenceKeys": [
          "bib.bib64"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib65",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Lee et al. (2020) Joonho Lee, Jemin Hwangbo, Lorenz Wellhausen, Vladlen Koltun, and Marco Hutter. Learning quadrupedal locomotion over challenging terrain. Science Robotics, 5(47):eabc5986, 2020.",
        "chinese": "Lee et al. (2020) Joonho Lee, Jemin Hwangbo, Lorenz Wellhausen, Vladlen Koltun, and Marco Hutter. Learning quadrupedal locomotion over challenging terrain. Science Robotics, 5(47):eabc5986, 2020.",
        "evidenceKeys": [
          "bib.bib65"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib66",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Li et al. (2024a) Bo Li, Peiyuan Zhang, Kaichen Zhang, Fanyi Pu, Xinrun Du, Yuhao Dong, Haotian Liu, Yuanhan Zhang, Ge Zhang, Chunyuan Li, and Ziwei Liu. Lmms-eval: Accelerating the development of large multimoal models, March 2024a. https://github.com/EvolvingLMMs-Lab/lmms-eval.",
        "chinese": "Li et al. (2024a) Bo Li, Peiyuan Zhang, Kaichen Zhang, Fanyi Pu, Xinrun Du, Yuhao Dong, Haotian Liu, Yuanhan Zhang, Ge Zhang, Chunyuan Li, and Ziwei Liu. Lmms-eval: Accelerating the development of large multimoal models, March 2024a. https://github.com/EvolvingLMMs-Lab/lmms-eval.",
        "evidenceKeys": [
          "bib.bib66"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib67",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Li et al. (2024b) Bo Li, Yuanhan Zhang, Dong Guo, Renrui Zhang, Feng Li, Hao Zhang, Kaichen Zhang, Peiyuan Zhang, Yanwei Li, Ziwei Liu, and Chunyuan Li. Llava-onevision: Easy visual task transfer. arXiv preprint arXiv:2408.03326, 2024b.",
        "chinese": "Li et al. (2024b) Bo Li, Yuanhan Zhang, Dong Guo, Renrui Zhang, Feng Li, Hao Zhang, Kaichen Zhang, Peiyuan Zhang, Yanwei Li, Ziwei Liu, and Chunyuan Li. Llava-onevision: Easy visual task transfer. arXiv preprint arXiv:2408.03326, 2024b.",
        "evidenceKeys": [
          "bib.bib67"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib68",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Li et al. (2024c) Kunchang Li, Yali Wang, Yinan He, Yizhuo Li, Yi Wang, Yi Liu, Zun Wang, Jilan Xu, Guo Chen, Ping Luo, Limin Wang, and Yu Qiao. Mvbench: A comprehensive multi-modal video understanding benchmark. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 22195–22206, 2024c.",
        "chinese": "Li et al. (2024c) Kunchang Li, Yali Wang, Yinan He, Yizhuo Li, Yi Wang, Yi Liu, Zun Wang, Jilan Xu, Guo Chen, Ping Luo, Limin Wang, and Yu Qiao. Mvbench: A comprehensive multi-modal video understanding benchmark. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 22195–22206, 2024c.",
        "evidenceKeys": [
          "bib.bib68"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib69",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Li et al. (2018) Yingwei Li, Yi Li, and Nuno Vasconcelos. Resound: Towards action recognition without representation bias. In Proceedings of the European Conference on Computer Vision (ECCV), pages 513–528, 2018.",
        "chinese": "Li et al. (2018) Yingwei Li, Yi Li, and Nuno Vasconcelos. Resound: Towards action recognition without representation bias. In Proceedings of the European Conference on Computer Vision (ECCV), pages 513–528, 2018.",
        "evidenceKeys": [
          "bib.bib69"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib70",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Lin et al. (2017) Tsung-Yi Lin, Priya Goyal, Ross Girshick, Kaiming He, and Piotr Dollár. Focal loss for dense object detection. In Proceedings of the IEEE international conference on computer vision, pages 2980–2988, 2017.",
        "chinese": "Lin et al. (2017) Tsung-Yi Lin, Priya Goyal, Ross Girshick, Kaiming He, and Piotr Dollár. Focal loss for dense object detection. In Proceedings of the IEEE international conference on computer vision, pages 2980–2988, 2017.",
        "evidenceKeys": [
          "bib.bib70"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib71",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Liu et al. (2022) Fangchen Liu, Hao Liu, Aditya Grover, and Pieter Abbeel. Masked autoencoding for scalable and generalizable decision making. Advances in Neural Information Processing Systems, 35:12608–12618, 2022.",
        "chinese": "Liu et al. (2022) Fangchen Liu, Hao Liu, Aditya Grover, and Pieter Abbeel. Masked autoencoding for scalable and generalizable decision making. Advances in Neural Information Processing Systems, 35:12608–12618, 2022.",
        "evidenceKeys": [
          "bib.bib71"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib72",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Liu et al. (2024a) Haotian Liu, Chunyuan Li, Yuheng Li, and Yong Jae Lee. Improved baselines with visual instruction tuning. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 26296–26306, 2024a.",
        "chinese": "Liu et al. (2024a) Haotian Liu, Chunyuan Li, Yuheng Li, and Yong Jae Lee. Improved baselines with visual instruction tuning. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 26296–26306, 2024a.",
        "evidenceKeys": [
          "bib.bib72"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib73",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Liu et al. (2024b) Haotian Liu, Chunyuan Li, Yuheng Li, Bo Li, Yuanhan Zhang, Sheng Shen, and Yong Jae Lee. Llava-next: Improved reasoning, ocr, and world knowledge, January 2024b. https://llava-vl.github.io/blog/2024-01-30-llava-next/.",
        "chinese": "Liu et al. (2024b) Haotian Liu, Chunyuan Li, Yuheng Li, Bo Li, Yuanhan Zhang, Sheng Shen, and Yong Jae Lee. Llava-next: Improved reasoning, ocr, and world knowledge, January 2024b. https://llava-vl.github.io/blog/2024-01-30-llava-next/.",
        "evidenceKeys": [
          "bib.bib73"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib74",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Liu et al. (2024c) Yuanxin Liu, Shicheng Li, Yi Liu, Yuxiang Wang, Shuhuai Ren, Lei Li, Sishuo Chen, Xu Sun, and Lu Hou. TempCompass: Do video LLMs really understand videos? arXiv preprint arXiv:2403.00476, 2024c.",
        "chinese": "Liu et al. (2024c) Yuanxin Liu, Shicheng Li, Yi Liu, Yuxiang Wang, Shuhuai Ren, Lei Li, Sishuo Chen, Xu Sun, and Lu Hou. TempCompass: Do video LLMs really understand videos? arXiv preprint arXiv:2403.00476, 2024c.",
        "evidenceKeys": [
          "bib.bib74"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib75",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Liu et al. (2024d) Zhijian Liu, Ligeng Zhu, Baifeng Shi, Zhuoyang Zhang, Yuming Lou, Shang Yang, Haocheng Xi, Shiyi Cao, Yuxian Gu, Dacheng Li, Xiuyu Li, Yunhao Fang, Yukang Chen, Cheng-Yu Hsieh, De-An Huang, An-Chieh Cheng, Vishwesh Nath, Jinyi Hu, Sifei Liu, Ranjay Krishna, Daguang Xu, Xiaolong Wang, Pavlo Molchanov, Jan Kautz, Hongxu Yin, Song Han, and Yao Lu. NVILA: Efficient frontier visual language models. arXiv preprint arXiv:2412.04468, 2024d.",
        "chinese": "Liu et al. (2024d) Zhijian Liu, Ligeng Zhu, Baifeng Shi, Zhuoyang Zhang, Yuming Lou, Shang Yang, Haocheng Xi, Shiyi Cao, Yuxian Gu, Dacheng Li, Xiuyu Li, Yunhao Fang, Yukang Chen, Cheng-Yu Hsieh, De-An Huang, An-Chieh Cheng, Vishwesh Nath, Jinyi Hu, Sifei Liu, Ranjay Krishna, Daguang Xu, Xiaolong Wang, Pavlo Molchanov, Jan Kautz, Hongxu Yin, Song Han, and Yao Lu. NVILA: Efficient frontier visual language models. arXiv preprint arXiv:2412.04468, 2024d.",
        "evidenceKeys": [
          "bib.bib75"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib76",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Loshchilov and Hutter (2016) Ilya Loshchilov and Frank Hutter. SGDR: Stochastic gradient descent with warm restarts. arXiv preprint arXiv:1608.03983, 2016.",
        "chinese": "Loshchilov and Hutter (2016) Ilya Loshchilov and Frank Hutter. SGDR: Stochastic gradient descent with warm restarts. arXiv preprint arXiv:1608.03983, 2016.",
        "evidenceKeys": [
          "bib.bib76"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib77",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Loshchilov and Hutter (2017) Ilya Loshchilov and Frank Hutter. Decoupled weight decay regularization. arXiv preprint arXiv:1711.05101, 2017.",
        "chinese": "Loshchilov and Hutter (2017) Ilya Loshchilov and Frank Hutter. Decoupled weight decay regularization. arXiv preprint arXiv:1711.05101, 2017.",
        "evidenceKeys": [
          "bib.bib77"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib78",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Lynch et al. (2020) Corey Lynch, Mohi Khansari, Ted Xiao, Vikash Kumar, Jonathan Tompson, Sergey Levine, and Pierre Sermanet. Learning latent plans from play. In Conference on Robot Learning, pages 1113–1132. PMLR, 2020.",
        "chinese": "Lynch et al. (2020) Corey Lynch, Mohi Khansari, Ted Xiao, Vikash Kumar, Jonathan Tompson, Sergey Levine, and Pierre Sermanet. Learning latent plans from play. In Conference on Robot Learning, pages 1113–1132. PMLR, 2020.",
        "evidenceKeys": [
          "bib.bib78"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib79",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Manuelli et al. (2020) Lucas Manuelli, Yunzhu Li, Pete Florence, and Russ Tedrake. Keypoints into the future: Self-supervised correspondence in model-based reinforcement learning. arXiv preprint arXiv:2009.05085, 2020.",
        "chinese": "Manuelli et al. (2020) Lucas Manuelli, Yunzhu Li, Pete Florence, and Russ Tedrake. Keypoints into the future: Self-supervised correspondence in model-based reinforcement learning. arXiv preprint arXiv:2009.05085, 2020.",
        "evidenceKeys": [
          "bib.bib79"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib80",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Materzynska et al. (2019) Joanna Materzynska, Guillaume Berger, Ingo Bax, and Roland Memisevic. The jester dataset: A large-scale video dataset of human gestures. In Proceedings of the IEEE/CVF international conference on computer vision workshops, pages 0–0, 2019.",
        "chinese": "Materzynska et al. (2019) Joanna Materzynska, Guillaume Berger, Ingo Bax, and Roland Memisevic. The jester dataset: A large-scale video dataset of human gestures. In Proceedings of the IEEE/CVF international conference on computer vision workshops, pages 0–0, 2019.",
        "evidenceKeys": [
          "bib.bib80"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib81",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Miech et al. (2019) Antoine Miech, Dimitri Zhukov, Jean-Baptiste Alayrac, Makarand Tapaswi, Ivan Laptev, and Josef Sivic. HowTo100m: Learning a text-video embedding by watching hundred million narrated video clips. In Proceedings of the IEEE/CVF International Conference on Computer Vision, pages 2630–2640, 2019.",
        "chinese": "Miech et al. (2019) Antoine Miech, Dimitri Zhukov, Jean-Baptiste Alayrac, Makarand Tapaswi, Ivan Laptev, and Josef Sivic. HowTo100m: Learning a text-video embedding by watching hundred million narrated video clips. In Proceedings of the IEEE/CVF International Conference on Computer Vision, pages 2630–2640, 2019.",
        "evidenceKeys": [
          "bib.bib81"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib82",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Mittal et al. (2024) Himangi Mittal, Nakul Agarwal, Shao-Yuan Lo, and Kwonjoon Lee. Can’t make an omelette without breaking some eggs: Plausible action anticipation using large video-language models. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 18580–18590, 2024.",
        "chinese": "Mittal et al. (2024) Himangi Mittal, Nakul Agarwal, Shao-Yuan Lo, and Kwonjoon Lee. Can’t make an omelette without breaking some eggs: Plausible action anticipation using large video-language models. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 18580–18590, 2024.",
        "evidenceKeys": [
          "bib.bib82"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib83",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Nagabandi et al. (2020) Anusha Nagabandi, Kurt Konolige, Sergey Levine, and Vikash Kumar. Deep dynamics models for learning dexterous manipulation. In Conference on robot learning, pages 1101–1112. PMLR, 2020.",
        "chinese": "Nagabandi et al. (2020) Anusha Nagabandi, Kurt Konolige, Sergey Levine, and Vikash Kumar. Deep dynamics models for learning dexterous manipulation. In Conference on robot learning, pages 1101–1112. PMLR, 2020.",
        "evidenceKeys": [
          "bib.bib83"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib84",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Nair et al. (2022) Suraj Nair, Aravind Rajeswaran, Vikash Kumar, Chelsea Finn, and Abhinav Gupta. R3m: A universal visual representation for robot manipulation. In Conference on Robot Learning (CoRL), 2022.",
        "chinese": "Nair et al. (2022) Suraj Nair, Aravind Rajeswaran, Vikash Kumar, Chelsea Finn, and Abhinav Gupta. R3m: A universal visual representation for robot manipulation. In Conference on Robot Learning (CoRL), 2022.",
        "evidenceKeys": [
          "bib.bib84"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib85",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Nortmann et al. (2015) Nora Nortmann, Sascha Rekauzke, Selim Onat, Peter König, and Dirk Jancke. Primary visual cortex represents the difference between past and present. Cerebral Cortex, 25(6):1427–1440, 2015.",
        "chinese": "Nortmann et al. (2015) Nora Nortmann, Sascha Rekauzke, Selim Onat, Peter König, and Dirk Jancke. Primary visual cortex represents the difference between past and present. Cerebral Cortex, 25(6):1427–1440, 2015.",
        "evidenceKeys": [
          "bib.bib85"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib86",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Octo Model Team et al. (2024) Octo Model Team, Dibya Ghosh, Homer Walke, Karl Pertsch, Kevin Black, Oier Mees, Sudeep Dasari, Joey Hejna, Tobias Kreiman, Charles Xu, Jianlan Luo, You Liang Tan, Lawrence Yunliang Chen, Pannag Sanketi, Quan Vuong, Ted Xiao, Dorsa Sadigh, Chelsea Finn, and Sergey Levine. Octo: An open-source generalist robot policy. arXiv preprint arXiv:2405.12213, 2024.",
        "chinese": "Octo Model Team et al. (2024) Octo Model Team, Dibya Ghosh, Homer Walke, Karl Pertsch, Kevin Black, Oier Mees, Sudeep Dasari, Joey Hejna, Tobias Kreiman, Charles Xu, Jianlan Luo, You Liang Tan, Lawrence Yunliang Chen, Pannag Sanketi, Quan Vuong, Ted Xiao, Dorsa Sadigh, Chelsea Finn, and Sergey Levine. Octo: An open-source generalist robot policy. arXiv preprint arXiv:2405.12213, 2024.",
        "evidenceKeys": [
          "bib.bib86"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib87",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Oquab et al. (2023) Maxime Oquab, Timothée Darcet, Théo Moutakanni, Huy Vo, Marc Szafraniec, Vasil Khalidov, Pierre Fernandez, Daniel Haziza, Francisco Massa, Alaaeldin El-Nouby, Mahmoud Assran, Nicolas Ballas, Wojciech Galuba, Russell Howes, Po-Yao Huang, Shang-Wen Li, Ishan Misra, Michael Rabbat, Vasu Sharma, Gabriel Synnaeve, Hu Xu, Hervé Jégou, Julien Mairal, Patrick Labatut, Armand Joulin, and Piotr Bojanowski. DINOv2: Learning robust visual features without supervision. arXiv preprint arXiv:2304.07193, 2023.",
        "chinese": "Oquab et al. (2023) Maxime Oquab, Timothée Darcet, Théo Moutakanni, Huy Vo, Marc Szafraniec, Vasil Khalidov, Pierre Fernandez, Daniel Haziza, Francisco Massa, Alaaeldin El-Nouby, Mahmoud Assran, Nicolas Ballas, Wojciech Galuba, Russell Howes, Po-Yao Huang, Shang-Wen Li, Ishan Misra, Michael Rabbat, Vasu Sharma, Gabriel Synnaeve, Hu Xu, Hervé Jégou, Julien Mairal, Patrick Labatut, Armand Joulin, and Piotr Bojanowski. DINOv2: Learning robust visual features without supervision. arXiv preprint arXiv:2304.07193, 2023.",
        "evidenceKeys": [
          "bib.bib87"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib88",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Pătrăucean et al. (2023) Viorica Pătrăucean, Lucas Smaira, Ankush Gupta, Adrià Recasens Continente, Larisa Markeeva, Dylan Banarse, Skanda Koppula, Joseph Heyward, Mateusz Malinowski, Yi Yang, Carl Doersch, Tatiana Matejovicova, Yury Sulsky, Antoine Miech, Alex Frechette, Hanna Klimczak, Raphael Koster, Junlin Zhang, Stephanie Winkler, Yusuf Aytar, Simon Osindero, Dima Damen, Andrew Zisserman, and João Carreira. Perception test: A diagnostic benchmark for multimodal video models. Advances in Neural Information Processing Systems, 36:42748–42761, 2023.",
        "chinese": "Pătrăucean et al. (2023) Viorica Pătrăucean, Lucas Smaira, Ankush Gupta, Adrià Recasens Continente, Larisa Markeeva, Dylan Banarse, Skanda Koppula, Joseph Heyward, Mateusz Malinowski, Yi Yang, Carl Doersch, Tatiana Matejovicova, Yury Sulsky, Antoine Miech, Alex Frechette, Hanna Klimczak, Raphael Koster, Junlin Zhang, Stephanie Winkler, Yusuf Aytar, Simon Osindero, Dima Damen, Andrew Zisserman, and João Carreira. Perception test: A diagnostic benchmark for multimodal video models. Advances in Neural Information Processing Systems, 36:42748–42761, 2023.",
        "evidenceKeys": [
          "bib.bib88"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib89",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Qwen Team et al. (2025) Qwen Team, Shuai Bai, Keqin Chen, Xuejing Liu, Jialin Wang, Wenbin Ge, Sibo Song, Kai Dang, Peng Wang, Shijie Wang, Jun Tang, Humen Zhong, Yuanzhi Zhu, Mingkun Yang, Zhaohai Li, Jianqiang Wan, Pengfei Wang, Wei Ding, Zheren Fu, Yiheng Xu, Jiabo Ye, Xi Zhang, Tianbao Xie, Zesen Cheng, Hang Zhang, Zhibo Yang, Haiyang Xu, Junyang Lin, An Yang, Binyuan Hui, Bowen Yu, Chen Cheng, Dayiheng Liu, Fan Hong, Fei Huang, Jiawei Liu, Jin Xu, Jianhong Tu, Jianyuan Zeng, Jie Zhang, Jinkai Wang, Jianwei Zhang, Jingren Zhou, Kexin Yang, Mei Li, Ming Yan, Na Ni, Rui Men, Songtao Jiang, Xiaodong Deng, Xiaoming Huang, Ximing Zhou, Xingzhang Ren, Yang Fan, Yichang Zhang, Yikai Zhu, Yuqiong Liu, and Zhifang Guo. Qwen2.5-vl technical report. arXiv preprint arXiv:2502.13923, 2025.",
        "chinese": "Qwen Team et al. (2025) Qwen Team, Shuai Bai, Keqin Chen, Xuejing Liu, Jialin Wang, Wenbin Ge, Sibo Song, Kai Dang, Peng Wang, Shijie Wang, Jun Tang, Humen Zhong, Yuanzhi Zhu, Mingkun Yang, Zhaohai Li, Jianqiang Wan, Pengfei Wang, Wei Ding, Zheren Fu, Yiheng Xu, Jiabo Ye, Xi Zhang, Tianbao Xie, Zesen Cheng, Hang Zhang, Zhibo Yang, Haiyang Xu, Junyang Lin, An Yang, Binyuan Hui, Bowen Yu, Chen Cheng, Dayiheng Liu, Fan Hong, Fei Huang, Jiawei Liu, Jin Xu, Jianhong Tu, Jianyuan Zeng, Jie Zhang, Jinkai Wang, Jianwei Zhang, Jingren Zhou, Kexin Yang, Mei Li, Ming Yan, Na Ni, Rui Men, Songtao Jiang, Xiaodong Deng, Xiaoming Huang, Ximing Zhou, Xingzhang Ren, Yang Fan, Yichang Zhang, Yikai Zhu, Yuqiong Liu, and Zhifang Guo. Qwen2.5-vl technical report. arXiv preprint arXiv:2502.13923, 2025.",
        "evidenceKeys": [
          "bib.bib89"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib90",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Radford et al. (2021) Alec Radford, Jong Wook Kim, Chris Hallacy, Aditya Ramesh, Gabriel Goh, Sandhini Agarwal, Girish Sastry, Amanda Askell, Pamela Mishkin, Jack Clark, Gretchen Krueger, and Ilya Sutskever. Learning transferable visual models from natural language supervision. In International Conference on Machine Learning, pages 8748–8763, 2021.",
        "chinese": "Radford et al. (2021) Alec Radford, Jong Wook Kim, Chris Hallacy, Aditya Ramesh, Gabriel Goh, Sandhini Agarwal, Girish Sastry, Amanda Askell, Pamela Mishkin, Jack Clark, Gretchen Krueger, and Ilya Sutskever. Learning transferable visual models from natural language supervision. In International Conference on Machine Learning, pages 8748–8763, 2021.",
        "evidenceKeys": [
          "bib.bib90"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib91",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Rajasegaran et al. (2025) Jathushan Rajasegaran, Ilija Radosavovic, Rahul Ravishankar, Yossi Gandelsman, Christoph Feichtenhofer, and Jitendra Malik. An empirical study of autoregressive pre-training from videos. arXiv preprint arXiv:2501.05453, 2025.",
        "chinese": "Rajasegaran et al. (2025) Jathushan Rajasegaran, Ilija Radosavovic, Rahul Ravishankar, Yossi Gandelsman, Christoph Feichtenhofer, and Jitendra Malik. An empirical study of autoregressive pre-training from videos. arXiv preprint arXiv:2501.05453, 2025.",
        "evidenceKeys": [
          "bib.bib91"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib92",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Rao and Ballard (1999) Rajesh PN Rao and Dana H Ballard. Predictive coding in the visual cortex: a functional interpretation of some extra-classical receptive-field effects. Nature Neuroscience, 2(1):79–87, 1999.",
        "chinese": "Rao and Ballard (1999) Rajesh PN Rao and Dana H Ballard. Predictive coding in the visual cortex: a functional interpretation of some extra-classical receptive-field effects. Nature Neuroscience, 2(1):79–87, 1999.",
        "evidenceKeys": [
          "bib.bib92"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib93",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Roy et al. (2024) Debaditya Roy, Ramanathan Rajendiran, and Basura Fernando. Interaction region visual transformer for egocentric action anticipation. In Proceedings of the IEEE/CVF Winter Conference on Applications of Computer Vision, pages 6740–6750, 2024.",
        "chinese": "Roy et al. (2024) Debaditya Roy, Ramanathan Rajendiran, and Basura Fernando. Interaction region visual transformer for egocentric action anticipation. In Proceedings of the IEEE/CVF Winter Conference on Applications of Computer Vision, pages 6740–6750, 2024.",
        "evidenceKeys": [
          "bib.bib93"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib94",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Rubinstein (1997) Reuven Y. Rubinstein. Optimization of computer simulation models with rare events. European Journal of Operations Research, 99:89–112, 1997.",
        "chinese": "Rubinstein (1997) Reuven Y. Rubinstein. Optimization of computer simulation models with rare events. European Journal of Operations Research, 99:89–112, 1997.",
        "evidenceKeys": [
          "bib.bib94"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib95",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Russell et al. (2025) Lloyd Russell, Anthony Hu, Lorenzo Bertoni, George Fedoseev, Jamie Shotton, Elahe Arani, and Gianluca Corrado. Gaia-2: A controllable multi-view generative world model for autonomous driving. arXiv preprint arXiv:2503.20523, 2025.",
        "chinese": "Russell et al. (2025) Lloyd Russell, Anthony Hu, Lorenzo Bertoni, George Fedoseev, Jamie Shotton, Elahe Arani, and Gianluca Corrado. Gaia-2: A controllable multi-view generative world model for autonomous driving. arXiv preprint arXiv:2503.20523, 2025.",
        "evidenceKeys": [
          "bib.bib95"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib96",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Samsami et al. (2024) Mohammad Reza Samsami, Artem Zholus, Janarthanan Rajendran, and Sarath Chandar. Mastering memory tasks with world models. In International Conference on Learning Representations, 2024.",
        "chinese": "Samsami et al. (2024) Mohammad Reza Samsami, Artem Zholus, Janarthanan Rajendran, and Sarath Chandar. Mastering memory tasks with world models. In International Conference on Learning Representations, 2024.",
        "evidenceKeys": [
          "bib.bib96"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib97",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Schrittwieser et al. (2020) Julian Schrittwieser, Ioannis Antonoglou, Thomas Hubert, Karen Simonyan, Laurent Sifre, Simon Schmitt, Arthur Guez, Edward Lockhart, Demis Hassabis, Thore Graepel, Timothy Lillicrap, and David Silver. Mastering atari, go, chess and shogi by planning with a learned model. Nature, 588(7839):604–609, 2020.",
        "chinese": "Schrittwieser et al. (2020) Julian Schrittwieser, Ioannis Antonoglou, Thomas Hubert, Karen Simonyan, Laurent Sifre, Simon Schmitt, Arthur Guez, Edward Lockhart, Demis Hassabis, Thore Graepel, Timothy Lillicrap, and David Silver. Mastering atari, go, chess and shogi by planning with a learned model. Nature, 588(7839):604–609, 2020.",
        "evidenceKeys": [
          "bib.bib97"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib98",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Shangguan et al. (2024) Ziyao Shangguan, Chuhan Li, Yuxuan Ding, Yanan Zheng, Yilun Zhao, Tesca Fitzgerald, and Arman Cohan. Tomato: Assessing visual temporal reasoning capabilities in multimodal foundation models. arXiv preprint arXiv:2410.23266, 2024.",
        "chinese": "Shangguan et al. (2024) Ziyao Shangguan, Chuhan Li, Yuxuan Ding, Yanan Zheng, Yilun Zhao, Tesca Fitzgerald, and Arman Cohan. Tomato: Assessing visual temporal reasoning capabilities in multimodal foundation models. arXiv preprint arXiv:2410.23266, 2024.",
        "evidenceKeys": [
          "bib.bib98"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib99",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Sobal et al. (2025) Vlad Sobal, Wancong Zhang, Kynghyun Cho, Randall Balestriero, Tim GJ Rudner, and Yann LeCun. Learning from reward-free offline data: A case for planning with latent dynamics models. arXiv preprint arXiv:2502.14819, 2025.",
        "chinese": "Sobal et al. (2025) Vlad Sobal, Wancong Zhang, Kynghyun Cho, Randall Balestriero, Tim GJ Rudner, and Yann LeCun. Learning from reward-free offline data: A case for planning with latent dynamics models. arXiv preprint arXiv:2502.14819, 2025.",
        "evidenceKeys": [
          "bib.bib99"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib100",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Su et al. (2024) Jianlin Su, Murtadha Ahmed, Yu Lu, Shengfeng Pan, Wen Bo, and Yunfeng Liu. Roformer: Enhanced transformer with rotary position embedding. Neurocomputing, 568:127063, 2024.",
        "chinese": "Su et al. (2024) Jianlin Su, Murtadha Ahmed, Yu Lu, Shengfeng Pan, Wen Bo, and Yunfeng Liu. Roformer: Enhanced transformer with rotary position embedding. Neurocomputing, 568:127063, 2024.",
        "evidenceKeys": [
          "bib.bib100"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib101",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Sutton and Barto (1981) Richard S Sutton and Andrew G. Barto. An adaptive network that constructs and uses and internal model of its world. Cognition and Brain Theory, 4(3):217–246, 1981.",
        "chinese": "Sutton and Barto (1981) Richard S Sutton and Andrew G. Barto. An adaptive network that constructs and uses and internal model of its world. Cognition and Brain Theory, 4(3):217–246, 1981.",
        "evidenceKeys": [
          "bib.bib101"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib102",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Sutton and Barto (1998) Richard S Sutton and Andrew G Barto. Reinforcement learning: An introduction, volume 1. MIT Press, Cambridge, USA, 1998.",
        "chinese": "Sutton and Barto (1998) Richard S Sutton and Andrew G Barto. Reinforcement learning: An introduction, volume 1. MIT Press, Cambridge, USA, 1998.",
        "evidenceKeys": [
          "bib.bib102"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib103",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Tang et al. (2019) Yansong Tang, Dajun Ding, Yongming Rao, Yu Zheng, Danyang Zhang, Lili Zhao, Jiwen Lu, and Jie Zhou. CoIN: A large-scale dataset for comprehensive instructional video analysis. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 1207–1216, 2019.",
        "chinese": "Tang et al. (2019) Yansong Tang, Dajun Ding, Yongming Rao, Yu Zheng, Danyang Zhang, Lili Zhao, Jiwen Lu, and Jie Zhou. CoIN: A large-scale dataset for comprehensive instructional video analysis. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 1207–1216, 2019.",
        "evidenceKeys": [
          "bib.bib103"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib104",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Tomar et al. (2024) Manan Tomar, Philippe Hansen-Estruch, Philip Bachman, Alex Lamb, John Langford, Matthew E Taylor, and Sergey Levine. Video occupancy models. arXiv preprint arXiv:2407.09533, 2024.",
        "chinese": "Tomar et al. (2024) Manan Tomar, Philippe Hansen-Estruch, Philip Bachman, Alex Lamb, John Langford, Matthew E Taylor, and Sergey Levine. Video occupancy models. arXiv preprint arXiv:2407.09533, 2024.",
        "evidenceKeys": [
          "bib.bib104"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib105",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Tong et al. (2024) Shengbang Tong, Ellis Brown, Penghao Wu, Sanghyun Woo, Manoj Middepogu, Sai Charitha Akula, Jihan Yang, Shusheng Yang, Adithya Iyer, Xichen Pan, Ziteng Wang, Rob Fergus, Yann LeCun, and Saining Xie. Cambrian-1: A fully open, vision-centric exploration of multimodal llms. Advances in Neural Information Processing Systems, 37:87310–87356, 2024.",
        "chinese": "Tong et al. (2024) Shengbang Tong, Ellis Brown, Penghao Wu, Sanghyun Woo, Manoj Middepogu, Sai Charitha Akula, Jihan Yang, Shusheng Yang, Adithya Iyer, Xichen Pan, Ziteng Wang, Rob Fergus, Yann LeCun, and Saining Xie. Cambrian-1: A fully open, vision-centric exploration of multimodal llms. Advances in Neural Information Processing Systems, 37:87310–87356, 2024.",
        "evidenceKeys": [
          "bib.bib105"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib106",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Touvron et al. (2019) Hugo Touvron, Andrea Vedaldi, Matthijs Douze, and Hervé Jégou. Fixing the train-test resolution discrepancy. Advances in Neural Information Processing Systems, 32, 2019.",
        "chinese": "Touvron et al. (2019) Hugo Touvron, Andrea Vedaldi, Matthijs Douze, and Hervé Jégou. Fixing the train-test resolution discrepancy. Advances in Neural Information Processing Systems, 32, 2019.",
        "evidenceKeys": [
          "bib.bib106"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib107",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Tschannen et al. (2025) Michael Tschannen, Alexey Gritsenko, Xiao Wang, Muhammad Ferjad Naeem, Ibrahim Alabdulmohsin, Nikhil Parthasarathy, Talfan Evans, Lucas Beyer, Ye Xia, Basil Mustafa, Olivier Hénaff, Jeremiah Harmsen, Andreas Steiner, and Xiaohua Zhai. SigLIP 2: Multilingual vision-language encoders with improved semantic understanding, localization, and dense features. arXiv preprint arXiv:2502.14786, 2025.",
        "chinese": "Tschannen et al. (2025) Michael Tschannen, Alexey Gritsenko, Xiao Wang, Muhammad Ferjad Naeem, Ibrahim Alabdulmohsin, Nikhil Parthasarathy, Talfan Evans, Lucas Beyer, Ye Xia, Basil Mustafa, Olivier Hénaff, Jeremiah Harmsen, Andreas Steiner, and Xiaohua Zhai. SigLIP 2: Multilingual vision-language encoders with improved semantic understanding, localization, and dense features. arXiv preprint arXiv:2502.14786, 2025.",
        "evidenceKeys": [
          "bib.bib107"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib108",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Vaswani et al. (2017) Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N Gomez, Łukasz Kaiser, and Illia Polosukhin. Attention is all you need. Advances in Neural Information Processing Systems, 30, 2017.",
        "chinese": "Vaswani et al. (2017) Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N Gomez, Łukasz Kaiser, and Illia Polosukhin. Attention is all you need. Advances in Neural Information Processing Systems, 30, 2017.",
        "evidenceKeys": [
          "bib.bib108"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib109",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Videau et al. (2024) Mathurin Videau, Badr Youbi Idrissi, Daniel Haziza, Luca Wehrstedt, Jade Copet, Olivier Teytaud, and David Lopez-Paz. Meta Lingua: A minimal PyTorch LLM training library, 2024. https://github.com/facebookresearch/lingua.",
        "chinese": "Videau et al. (2024) Mathurin Videau, Badr Youbi Idrissi, Daniel Haziza, Luca Wehrstedt, Jade Copet, Olivier Teytaud, and David Lopez-Paz. Meta Lingua: A minimal PyTorch LLM training library, 2024. https://github.com/facebookresearch/lingua.",
        "evidenceKeys": [
          "bib.bib109"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib110",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Wadekar et al. (2024) Shakti N Wadekar, Abhishek Chaurasia, Aman Chadha, and Eugenio Culurciello. The evolution of multimodal model architectures. arXiv preprint arXiv:2405.17927, 2024.",
        "chinese": "Wadekar et al. (2024) Shakti N Wadekar, Abhishek Chaurasia, Aman Chadha, and Eugenio Culurciello. The evolution of multimodal model architectures. arXiv preprint arXiv:2405.17927, 2024.",
        "evidenceKeys": [
          "bib.bib110"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib111",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Wang et al. (2023) Limin Wang, Bingkun Huang, Zhiyu Zhao, Zhan Tong, Yinan He, Yi Wang, Yali Wang, and Yu Qiao. Videomae v2: Scaling video masked autoencoders with dual masking. In Proceedings of the IEEE/CVF conference on computer vision and pattern recognition, pages 14549–14560, 2023.",
        "chinese": "Wang et al. (2023) Limin Wang, Bingkun Huang, Zhiyu Zhao, Zhan Tong, Yinan He, Yi Wang, Yali Wang, and Yu Qiao. Videomae v2: Scaling video masked autoencoders with dual masking. In Proceedings of the IEEE/CVF conference on computer vision and pattern recognition, pages 14549–14560, 2023.",
        "evidenceKeys": [
          "bib.bib111"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib112",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Wang et al. (2024a) Peng Wang, Shuai Bai, Sinan Tan, Shijie Wang, Zhihao Fan, Jinze Bai, Keqin Chen, Xuejing Liu, Jialin Wang, Wenbin Ge, Yang Fan, Kai Dang, Mengfei Du, Xuancheng Ren, Rui Men, Dayiheng Liu, Chang Zhou, Jingren Zhou, and Junyang Lin. Qwen2-vl: Enhancing vision-language model’s perception of the world at any resolution. arXiv preprint arXiv:2409.12191, 2024a.",
        "chinese": "Wang et al. (2024a) Peng Wang, Shuai Bai, Sinan Tan, Shijie Wang, Zhihao Fan, Jinze Bai, Keqin Chen, Xuejing Liu, Jialin Wang, Wenbin Ge, Yang Fan, Kai Dang, Mengfei Du, Xuancheng Ren, Rui Men, Dayiheng Liu, Chang Zhou, Jingren Zhou, and Junyang Lin. Qwen2-vl: Enhancing vision-language model’s perception of the world at any resolution. arXiv preprint arXiv:2409.12191, 2024a.",
        "evidenceKeys": [
          "bib.bib112"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib113",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Wang et al. (2024b) Yi Wang, Kunchang Li, Xinhao Li, Jiashuo Yu, Yinan He, Chenting Wang, Guo Chen, Baoqi Pei, Ziang Yan, Rongkun Zheng, Jilan Xu, Zun Wang, Yansong Shi, Tianxiang Jiang, Songze Li, Hongjie Zhang, Yifei Huang, Yu Qiao, Yali Wang, and Limin Wang. Internvideo2: Scaling foundation models for multimodal video understanding. In European Conference on Computer Vision, pages 396–416. Springer, 2024b.",
        "chinese": "Wang et al. (2024b) Yi Wang, Kunchang Li, Xinhao Li, Jiashuo Yu, Yinan He, Chenting Wang, Guo Chen, Baoqi Pei, Ziang Yan, Rongkun Zheng, Jilan Xu, Zun Wang, Yansong Shi, Tianxiang Jiang, Songze Li, Hongjie Zhang, Yifei Huang, Yu Qiao, Yali Wang, and Limin Wang. Internvideo2: Scaling foundation models for multimodal video understanding. In European Conference on Computer Vision, pages 396–416. Springer, 2024b.",
        "evidenceKeys": [
          "bib.bib113"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib114",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Watter et al. (2015) Manuel Watter, Jost Springenberg, Joschka Boedecker, and Martin Riedmiller. Embed to control: A locally linear latent dynamics model for control from raw images. Advances in Neural Information Processing Systems, 28, 2015.",
        "chinese": "Watter et al. (2015) Manuel Watter, Jost Springenberg, Joschka Boedecker, and Martin Riedmiller. Embed to control: A locally linear latent dynamics model for control from raw images. Advances in Neural Information Processing Systems, 28, 2015.",
        "evidenceKeys": [
          "bib.bib114"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib115",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Wolpert and Ghahramani (2000) Daniel M Wolpert and Zoubin Ghahramani. Computational principles of movement neuroscience. Nature neuroscience, 3(11):1212–1217, 2000.",
        "chinese": "Wolpert and Ghahramani (2000) Daniel M Wolpert and Zoubin Ghahramani. Computational principles of movement neuroscience. Nature neuroscience, 3(11):1212–1217, 2000.",
        "evidenceKeys": [
          "bib.bib115"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib116",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Wu et al. (2023a) Hongtao Wu, Ya Jing, Chilam Cheang, Guangzeng Chen, Jiafeng Xu, Xinghang Li, Minghuan Liu, Hang Li, and Tao Kong. Unleashing large-scale video generative pre-training for visual robot manipulation. arXiv preprint arXiv:2312.13139, 2023a.",
        "chinese": "Wu et al. (2023a) Hongtao Wu, Ya Jing, Chilam Cheang, Guangzeng Chen, Jiafeng Xu, Xinghang Li, Minghuan Liu, Hang Li, and Tao Kong. Unleashing large-scale video generative pre-training for visual robot manipulation. arXiv preprint arXiv:2312.13139, 2023a.",
        "evidenceKeys": [
          "bib.bib116"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib117",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Wu et al. (2023b) Philipp Wu, Alejandro Escontrela, Danijar Hafner, Pieter Abbeel, and Ken Goldberg. Daydreamer: World models for physical robot learning. In Conference on robot learning, pages 2226–2240. PMLR, 2023b.",
        "chinese": "Wu et al. (2023b) Philipp Wu, Alejandro Escontrela, Danijar Hafner, Pieter Abbeel, and Ken Goldberg. Daydreamer: World models for physical robot learning. In Conference on robot learning, pages 2226–2240. PMLR, 2023b.",
        "evidenceKeys": [
          "bib.bib117"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib118",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Yang et al. (2024a) An Yang, Baosong Yang, Binyuan Hui, Bo Zheng, Bowen Yu, Chang Zhou, Chengpeng Li, Chengyuan Li, Dayiheng Liu, Fei Huang, Guanting Dong, Haoran Wei, Huan Lin, Jialong Tang, Jialin Wang, Jian Yang, Jianhong Tu, Jianwei Zhang, Jianxin Ma, Jianxin Yang, Jin Xu, Jingren Zhou, Jinze Bai, Jinzheng He, Junyang Lin, Kai Dang, Keming Lu, Keqin Chen, Kexin Yang, Mei Li, Mingfeng Xue, Na Ni, Pei Zhang, Peng Wang, Ru Peng, Rui Men, Ruize Gao, Runji Lin, Shijie Wang, Shuai Bai, Sinan Tan, Tianhang Zhu, Tianhao Li, Tianyu Liu, Wenbin Ge, Xiaodong Deng, Xiaohuan Zhou, Xingzhang Ren, Xinyu Zhang, Xipin Wei, Xuancheng Ren, Xuejing Liu, Yang Fan, Yang Yao, Yichang Zhang, Yu Wan, Yunfei Chu, Yuqiong Liu, Zeyu Cui, Zhenru Zhang, Zhifang Guo, and Zhihao Fan. Qwen2 technical report. arXiv preprint arXiv:2407.10671, 2024a.",
        "chinese": "Yang et al. (2024a) An Yang, Baosong Yang, Binyuan Hui, Bo Zheng, Bowen Yu, Chang Zhou, Chengpeng Li, Chengyuan Li, Dayiheng Liu, Fei Huang, Guanting Dong, Haoran Wei, Huan Lin, Jialong Tang, Jialin Wang, Jian Yang, Jianhong Tu, Jianwei Zhang, Jianxin Ma, Jianxin Yang, Jin Xu, Jingren Zhou, Jinze Bai, Jinzheng He, Junyang Lin, Kai Dang, Keming Lu, Keqin Chen, Kexin Yang, Mei Li, Mingfeng Xue, Na Ni, Pei Zhang, Peng Wang, Ru Peng, Rui Men, Ruize Gao, Runji Lin, Shijie Wang, Shuai Bai, Sinan Tan, Tianhang Zhu, Tianhao Li, Tianyu Liu, Wenbin Ge, Xiaodong Deng, Xiaohuan Zhou, Xingzhang Ren, Xinyu Zhang, Xipin Wei, Xuancheng Ren, Xuejing Liu, Yang Fan, Yang Yao, Yichang Zhang, Yu Wan, Yunfei Chu, Yuqiong Liu, Zeyu Cui, Zhenru Zhang, Zhifang Guo, and Zhihao Fan. Qwen2 technical report. arXiv preprint arXiv:2407.10671, 2024a.",
        "evidenceKeys": [
          "bib.bib118"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib119",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Yang et al. (2024b) Mengjiao Yang, Yilun Du, Kamyar Ghasemipour, Jonathan Tompson, Dale Schuurmans, and Pieter Abbeel. Learning interactive real-world simulators. In International Conference on Learning Representations, 2024b.",
        "chinese": "Yang et al. (2024b) Mengjiao Yang, Yilun Du, Kamyar Ghasemipour, Jonathan Tompson, Dale Schuurmans, and Pieter Abbeel. Learning interactive real-world simulators. In International Conference on Learning Representations, 2024b.",
        "evidenceKeys": [
          "bib.bib119"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib120",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Yen-Chen et al. (2020) Lin Yen-Chen, Maria Bauza, and Phillip Isola. Experience-embedded visual foresight. In Conference on Robot Learning, pages 1015–1024. PMLR, 2020.",
        "chinese": "Yen-Chen et al. (2020) Lin Yen-Chen, Maria Bauza, and Phillip Isola. Experience-embedded visual foresight. In Conference on Robot Learning, pages 1015–1024. PMLR, 2020.",
        "evidenceKeys": [
          "bib.bib120"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib121",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Yuan et al. (2025) Liping Yuan, Jiawei Wang, Haomiao Sun, Yuchen Zhang, and Yuan Lin. Tarsier2: Advancing large vision-language models from detailed video description to comprehensive video understanding. arXiv preprint arXiv:2501.07888, 2025.",
        "chinese": "Yuan et al. (2025) Liping Yuan, Jiawei Wang, Haomiao Sun, Yuchen Zhang, and Yuan Lin. Tarsier2: Advancing large vision-language models from detailed video description to comprehensive video understanding. arXiv preprint arXiv:2501.07888, 2025.",
        "evidenceKeys": [
          "bib.bib121"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib122",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Zellers et al. (2022) Rowan Zellers, Jiasen Lu, Ximing Lu, Youngjae Yu, Yanpeng Zhao, Mohammadreza Salehi, Aditya Kusupati, Jack Hessel, Ali Farhadi, and Yejin Choi. Merlot reserve: Neural script knowledge through vision and language and sound. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 16375–16387, 2022.",
        "chinese": "Zellers et al. (2022) Rowan Zellers, Jiasen Lu, Ximing Lu, Youngjae Yu, Yanpeng Zhao, Mohammadreza Salehi, Aditya Kusupati, Jack Hessel, Ali Farhadi, and Yejin Choi. Merlot reserve: Neural script knowledge through vision and language and sound. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 16375–16387, 2022.",
        "evidenceKeys": [
          "bib.bib122"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib123",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Zhai et al. (2022) Xiaohua Zhai, Alexander Kolesnikov, Neil Houlsby, and Lucas Beyer. Scaling vision transformers. In Proceedings of the IEEE/CVF conference on computer vision and pattern recognition, pages 12104–12113, 2022.",
        "chinese": "Zhai et al. (2022) Xiaohua Zhai, Alexander Kolesnikov, Neil Houlsby, and Lucas Beyer. Scaling vision transformers. In Proceedings of the IEEE/CVF conference on computer vision and pattern recognition, pages 12104–12113, 2022.",
        "evidenceKeys": [
          "bib.bib123"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib124",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Zhang et al. (2023) Hang Zhang, Xin Li, and Lidong Bing. Video-llama: An instruction-tuned audio-visual language model for video understanding. arXiv preprint arXiv:2306.02858, 2023.",
        "chinese": "Zhang et al. (2023) Hang Zhang, Xin Li, and Lidong Bing. Video-llama: An instruction-tuned audio-visual language model for video understanding. arXiv preprint arXiv:2306.02858, 2023.",
        "evidenceKeys": [
          "bib.bib124"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib125",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Zhang et al. (2024a) Kaichen Zhang, Bo Li, Peiyuan Zhang, Fanyi Pu, Joshua Adrian Cahyono, Kairui Hu, Shuai Liu, Yuanhan Zhang, Jingkang Yang, Chunyuan Li, and Ziwei Liu. Lmms-eval: Reality check on the evaluation of large multimodal models. arXiv preprint arXiv:2407.12772, 2024a.",
        "chinese": "Zhang et al. (2024a) Kaichen Zhang, Bo Li, Peiyuan Zhang, Fanyi Pu, Joshua Adrian Cahyono, Kairui Hu, Shuai Liu, Yuanhan Zhang, Jingkang Yang, Chunyuan Li, and Ziwei Liu. Lmms-eval: Reality check on the evaluation of large multimodal models. arXiv preprint arXiv:2407.12772, 2024a.",
        "evidenceKeys": [
          "bib.bib125"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib126",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Zhang et al. (2024b) Yuanhan Zhang, Bo Li, Haotian Liu, Yong jae Lee, Liangke Gui, Di Fu, Jiashi Feng, Ziwei Liu, and Chunyuan Li. LLaVA-NeXT: A strong zero-shot video understanding model, April 2024b. https://llava-vl.github.io/blog/2024-04-30-llava-next-video/.",
        "chinese": "Zhang et al. (2024b) Yuanhan Zhang, Bo Li, Haotian Liu, Yong jae Lee, Liangke Gui, Di Fu, Jiashi Feng, Ziwei Liu, and Chunyuan Li. LLaVA-NeXT: A strong zero-shot video understanding model, April 2024b. https://llava-vl.github.io/blog/2024-04-30-llava-next-video/.",
        "evidenceKeys": [
          "bib.bib126"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib127",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Zhang et al. (2024c) Yuanhan Zhang, Jinming Wu, Wei Li, Bo Li, Zejun Ma, Ziwei Liu, and Chunyuan Li. Video instruction tuning with synthetic data. arXiv preprint arXiv:2410.02713, 2024c.",
        "chinese": "Zhang et al. (2024c) Yuanhan Zhang, Jinming Wu, Wei Li, Bo Li, Zejun Ma, Ziwei Liu, and Chunyuan Li. Video instruction tuning with synthetic data. arXiv preprint arXiv:2410.02713, 2024c.",
        "evidenceKeys": [
          "bib.bib127"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib128",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Zhao et al. (2024) Long Zhao, Nitesh B. Gundavarapu, Liangzhe Yuan, Hao Zhou, Shen Yan, Jennifer J. Sun, Luke Friedman, Rui Qian, Tobias Weyand, Yue Zhao, Rachel Hornung, Florian Schroff, Ming-Hsuan Yang, David A. Ross, Huisheng Wang, Hartwig Adam, Mikhail Sirotenko, Ting Liu, and Boqing Gong. VideoPrism: A foundational visual encoder for video understanding. arXiv preprint arXiv:2402.13217, 2024.",
        "chinese": "Zhao et al. (2024) Long Zhao, Nitesh B. Gundavarapu, Liangzhe Yuan, Hao Zhou, Shen Yan, Jennifer J. Sun, Luke Friedman, Rui Qian, Tobias Weyand, Yue Zhao, Rachel Hornung, Florian Schroff, Ming-Hsuan Yang, David A. Ross, Huisheng Wang, Hartwig Adam, Mikhail Sirotenko, Ting Liu, and Boqing Gong. VideoPrism: A foundational visual encoder for video understanding. arXiv preprint arXiv:2402.13217, 2024.",
        "evidenceKeys": [
          "bib.bib128"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib129",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Zhao et al. (2025) Qingqing Zhao, Yao Lu, Moo Jin Kim, Zipeng Fu, Zhuoyang Zhang, Yecheng Wu, Zhaoshuo Li, Qianli Ma, Song Han, Chelsea Finn, Ankur Handa, Ming-Yu Liu, Donglai Xiang, Gordon Wetzstein, and Tsung-Yi Lin. CoT-VLA: Visual chain-of-thought reasoning for vision-language-action models. arXiv preprint arXiv:2503.22020, 2025.",
        "chinese": "Zhao et al. (2025) Qingqing Zhao, Yao Lu, Moo Jin Kim, Zipeng Fu, Zhuoyang Zhang, Yecheng Wu, Zhaoshuo Li, Qianli Ma, Song Han, Chelsea Finn, Ankur Handa, Ming-Yu Liu, Donglai Xiang, Gordon Wetzstein, and Tsung-Yi Lin. CoT-VLA: Visual chain-of-thought reasoning for vision-language-action models. arXiv preprint arXiv:2503.22020, 2025.",
        "evidenceKeys": [
          "bib.bib129"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib130",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Zheng et al. (2025) Ruijie Zheng, Jing Wang, Scott Reed, Johan Bjorck, Yu Fang, Fengyuan Hu, Joel Jang, Kaushil Kundalia, Zongyu Lin, Loic Magne, Avnish Narayan, You Liang Tan, Guanzhi Wang, Qi Wang, Jiannan Xiang, Yinzhen Xu, Seonghyeon Ye, Jan Kautz, Furong Huang, Yuke Zhu, and Linxi Fan. FLARE: Robot learning with implicit world modeling. arXiv preprint arXiv:2505.15659, 2025.",
        "chinese": "Zheng et al. (2025) Ruijie Zheng, Jing Wang, Scott Reed, Johan Bjorck, Yu Fang, Fengyuan Hu, Joel Jang, Kaushil Kundalia, Zongyu Lin, Loic Magne, Avnish Narayan, You Liang Tan, Guanzhi Wang, Qi Wang, Jiannan Xiang, Yinzhen Xu, Seonghyeon Ye, Jan Kautz, Furong Huang, Yuke Zhu, and Linxi Fan. FLARE: Robot learning with implicit world modeling. arXiv preprint arXiv:2505.15659, 2025.",
        "evidenceKeys": [
          "bib.bib130"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib131",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Zhou et al. (2024) Gaoyue Zhou, Hengkai Pan, Yann LeCun, and Lerrel Pinto. DINO-WM: World models on pre-trained visual features enable zero-shot planning. arXiv preprint arXiv:2411.04983, 2024.",
        "chinese": "Zhou et al. (2024) Gaoyue Zhou, Hengkai Pan, Yann LeCun, and Lerrel Pinto. DINO-WM: World models on pre-trained visual features enable zero-shot planning. arXiv preprint arXiv:2411.04983, 2024.",
        "evidenceKeys": [
          "bib.bib131"
        ]
      },
      {
        "id": "v-jepa-2-bib-bib132",
        "sectionId": "references",
        "kind": "paragraph",
        "label": "References",
        "english": "Zhu et al. (2025) Chuning Zhu, Raymond Yu, Siyuan Feng, Benjamin Burchfiel, Paarth Shah, and Abhishek Gupta. Unified world models: Coupling video and action diffusion for pretraining on large robotic datasets. arXiv preprint arXiv:2504.02792, 2025.",
        "chinese": "Zhu et al. (2025) Chuning Zhu, Raymond Yu, Siyuan Feng, Benjamin Burchfiel, Paarth Shah, and Abhishek Gupta. Unified world models: Coupling video and action diffusion for pretraining on large robotic datasets. arXiv preprint arXiv:2504.02792, 2025.",
        "evidenceKeys": [
          "bib.bib132"
        ]
      }
    ]
  },
  {
    "id": "10-v-jepa-2-pretraining",
    "number": "10",
    "titleEn": "V-JEPA 2 Pretraining",
    "titleZh": "10 V-JEPA 2 预训练细节",
    "collapsedByDefault": false,
    "blocks": [
      {
        "id": "v-jepa-2-s10-ss1-p1-1",
        "sectionId": "10-v-jepa-2-pretraining",
        "kind": "paragraph",
        "label": "10.1 Pretraining Hyperparameters",
        "english": "As detailed in Section˜2.4, our training pipeline consisted of two phases: 1) a constant learning rate phase and 2) a cooldown phase. For all models, we trained in the first phase until we observed plateauing or diminishing performance on the IN1K, COIN, and SSv2 tasks. At this point, we initiated the cooldown phase.",
        "chinese": "如第 2.4 节所述，训练分为恒定学习率阶段和降温阶段。各模型先进行第一阶段训练，直到 IN1K、COIN 和 SSv2 的评测表现趋于平台或收益递减，再启动降温阶段。",
        "evidenceKeys": [
          "S10.SS1.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s10-t9",
        "sectionId": "10-v-jepa-2-pretraining",
        "kind": "table",
        "label": "10.1 Pretraining Hyperparameters",
        "english": "**Table 9: Pretraining Hyperparameters. Common parameters for pretraining large computer vision models. We report these parameters for both the primary training phase and the cooldown phase.**\n\n| Parameter | Primary Phase | Cooldown Phase |\n| --- | --- | --- |\n| Number of frames | 16 | 64 |\n| Frames per Second | 4.0 | 4.0 |\n| Crop Size | 256 | [256, 384, 512] |\n| Random Resize Aspect Ratio | [0.75 1.35] | [0.75, 1.35] |\n| Random Resize Scale | [0.3, 1.0] | [0.3, 1.0] |\n| Steps | Variable | 12000 |\n| Warmup Steps | 12000 | N/A |\n| Batch Size (global) | 3072 | 3072 |\n| Starting Learning Rate | 1e-4 | 5.25e-4 |\n| Final Learning Rate | 5.25e-4 | 1e-6 |\n| Weight Decay | 0.04 | 0.04 |\n| EMA | 0.99925 | 0.99925 |\n| Spatial Mask Scale | [0.15, 0.7] | [0.15, 0.7] |\n| Temporal Mask Scale | [1.0, 1.0] | [1.0, 1.0] |\n| Mask Aspect Ratio | [0.75 1.5] | [0.75, 1.5] |\n| Tubelet Size | 2 | 2 |\n| Patch Size | 16 | 16 |",
        "chinese": "**表 9：预训练超参数。列出大型视觉模型在主体训练和降温阶段使用的共同参数。**\n\n| 参数 | 主体阶段 | 降温阶段 |\n| --- | --- | --- |\n| 帧数 | 16 | 64 |\n| 帧率 | 4.0 | 4.0 |\n| 裁剪尺寸 | 256 | [256, 384, 512] |\n| 随机缩放宽高比 | [0.75 1.35] | [0.75, 1.35] |\n| 随机缩放比例 | [0.3, 1.0] | [0.3, 1.0] |\n| 训练步数 | 可变 | 12000 |\n| 预热步数 | 12000 | 不适用 |\n| 全局批大小 | 3072 | 3072 |\n| 初始学习率 | 1e-4 | 5.25e-4 |\n| 最终学习率 | 5.25e-4 | 1e-6 |\n| 权重衰减 | 0.04 | 0.04 |\n| EMA | 0.99925 | 0.99925 |\n| 空间掩码比例 | [0.15, 0.7] | [0.15, 0.7] |\n| 时间掩码比例 | [1.0, 1.0] | [1.0, 1.0] |\n| 掩码宽高比 | [0.75 1.5] | [0.75, 1.5] |\n| 时间 tubelet 大小 | 2 | 2 |\n| 空间 patch 大小 | 16 | 16 |",
        "evidenceKeys": [
          "S10.T9"
        ]
      },
      {
        "id": "v-jepa-2-s10-ss1-p2-1",
        "sectionId": "10-v-jepa-2-pretraining",
        "kind": "paragraph",
        "label": "10.1 Pretraining Hyperparameters",
        "english": "Training in the first phase began with a learning rate warmup for 12,000 steps followed by a constant learning rate for the rest of the phase. We checked evaluations every 60,000 steps. The cooldown phase began with a learning rate at 5.25e-4, which was linearly ramped down to the final learning rate. Throughout both phases, all other hyperparameters were kept constant.",
        "chinese": "第一阶段先预热学习率 12,000 步，其余时间保持恒定；每 60,000 步检查一次评测结果。降温阶段从 5.25e-4 的学习率开始，线性下降至最终值。两个阶段的其他超参数保持不变。",
        "evidenceKeys": [
          "S10.SS1.p2.1"
        ]
      },
      {
        "id": "v-jepa-2-s10-ss1-p3-1",
        "sectionId": "10-v-jepa-2-pretraining",
        "kind": "paragraph",
        "label": "10.1 Pretraining Hyperparameters",
        "english": "In the cooldown phase we increased the number of frames per clip while keeping the frames-per-second constant, as we saw a substantial benefit from feeding the model more frames (see Figure˜5). In addition, we also increased the crop size of the model in this phase, which gave a substantial benefit to tasks like IN1K, which goes from 84.6 at a 256 crop to 85.1 at a 384 crop. Hyperparameters for both phases are summarized in Table˜9.",
        "chinese": "降温阶段增加每个片段的帧数，但保持帧率不变，因为提供更多帧带来了明显收益（图 5）。该阶段还增大裁剪尺寸，对 IN1K 等任务很有帮助：裁剪从 256 增至 384 时，IN1K 从 84.6 提至 85.1。两阶段参数汇总于表 9。",
        "evidenceKeys": [
          "S10.SS1.p3.1"
        ]
      },
      {
        "id": "v-jepa-2-s10-t10",
        "sectionId": "10-v-jepa-2-pretraining",
        "kind": "table",
        "label": "10.1 Pretraining Hyperparameters",
        "english": "**Table 10: Abbreviated Pretraining Hyperparameters. Common parameters for pretraining large computer vision models, targeting our abbreviated recipe.**\n\n| Parameter | Abbreviated Recipe |\n| --- | --- |\n| Number of frames | 16 |\n| Frames per Second | 4.0 |\n| Crop Size | 256 |\n| Random Resize Aspect Ratio | [0.75 1.35] |\n| Random Resize Scale | [0.3, 1.0] |\n| Steps | 90000 |\n| Warmup Steps | 12000 |\n| Batch Size (global) | 3072 |\n| Starting Learning Rate | 2e-4 |\n| Larning Rate | 6.25e-4 |\n| Final Learning Rate | 1e-6 |\n| Starting Weight Decay | 0.04 |\n| Final Weight Decay | 0.4 |\n| Starting EMA | 0.999 |\n| Final EMA | 1.0 |\n| Spatial Mask Scale | [0.15, 0.7] |\n| Temporal Mask Scale | [1.0, 1.0] |\n| Mask Aspect Ratio | [0.75 1.5] |\n| Tubelet Size | 2 |\n| Patch Size | 16 |",
        "chinese": "**表 10：缩短版预训练方案的共同超参数。**\n\n| 参数 | 缩短版方案 |\n| --- | --- |\n| 帧数 | 16 |\n| 帧率 | 4.0 |\n| 裁剪尺寸 | 256 |\n| 随机缩放宽高比 | [0.75 1.35] |\n| 随机缩放比例 | [0.3, 1.0] |\n| 训练步数 | 90000 |\n| 预热步数 | 12000 |\n| 全局批大小 | 3072 |\n| 初始学习率 | 2e-4 |\n| 学习率 | 6.25e-4 |\n| 最终学习率 | 1e-6 |\n| 初始权重衰减 | 0.04 |\n| 最终权重衰减 | 0.4 |\n| 初始 EMA | 0.999 |\n| 最终 EMA | 1.0 |\n| 空间掩码比例 | [0.15, 0.7] |\n| 时间掩码比例 | [1.0, 1.0] |\n| 掩码宽高比 | [0.75 1.5] |\n| tubelet 大小 | 2 |\n| patch 大小 | 16 |",
        "evidenceKeys": [
          "S10.T10"
        ]
      },
      {
        "id": "v-jepa-2-s10-ss1-p4-1",
        "sectionId": "10-v-jepa-2-pretraining",
        "kind": "paragraph",
        "label": "10.1 Pretraining Hyperparameters",
        "english": "Throughout the Appendix, we refer to a “abbreviated” training recipe that corresponds to a 90,000-step training following the procedure of Bardes et al. (2024). There are a few key differences with the abbreviated recipe. The first is the learning rate: the abbreviated recipe begins with a linear warmup followed by a cosine decay. The second are the schedules for weight decay and EMA, which are linearly ramped from a starting to a final value. The last is the total number of steps, which is restricted to 90,000. We use the abbreviated schedule for several of our ablations on data mixtures, as this allows us to interrogate the effects of data curation on a shorter compute budget.",
        "chinese": "附录中的“缩短版”训练方案沿用 Bardes et al. (2024)，总共训练 90,000 步。它与本文完整方案有几处区别：学习率先线性预热，再余弦衰减；权重衰减与 EMA 从初始值线性变化到最终值；总步数固定为 90,000。若干数据混合消融采用这一方案，以便在较少计算预算下分析数据筛选的影响。",
        "evidenceKeys": [
          "S10.SS1.p4.1"
        ]
      },
      {
        "id": "v-jepa-2-s10-ss2-p1-1",
        "sectionId": "10-v-jepa-2-pretraining",
        "kind": "paragraph",
        "label": "10.2 Pretraining data",
        "english": "We began curation of YT1B by applying scene extraction via the PySceneDetect library,333https://github.com/Breakthrough/PySceneDetect which splits videos into clips at scene transitions. We discard scenes shorter than 4 seconds, retaining 316 million scenes. The DINOv2 ViT-L model is then applied on the middle frame of each clip to extract scene embeddings. YT1B embeddings are then clustered into 1.5 million clusters, using the same clustering strategy as Oquab et al. (2023). Embeddings are also extracted in the same manner for all videos in the target distribution, then assigned to the closest YT1B cluster. We only keep those clusters to which at least one target video was assigned—about 210k clusters out of the original 1.5 million. The retained clusters contain 115 million scenes.",
        "chinese": "构建 YT1B 时，先用 PySceneDetect 库（https://github.com/Breakthrough/PySceneDetect）在场景切换处将视频分段。剔除不足 4 秒的场景后，保留 3.16 亿个场景。随后用 DINOv2 ViT-L 编码每段中间帧，得到场景嵌入，并按 Oquab et al. (2023) 的策略聚成 150 万个簇。对目标分布中的全部视频也以相同方式提取嵌入，并分配到最近的 YT1B 簇。最终只保留至少被一个目标视频匹配到的簇，约为原来 150 万簇中的 21 万簇，包含 1.15 亿个场景。",
        "evidenceKeys": [
          "S10.SS2.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s10-ss2-p2-11",
        "sectionId": "10-v-jepa-2-pretraining",
        "kind": "paragraph",
        "label": "10.2 Pretraining data",
        "english": "Cluster-based retrieval matches the support, but not the weighting, of the target distribution. We use a weighted sampling scheme to rebalance the data to better match the target distribution. W sample from the clusters using a weighted sampling strategy: $w_{c}=\\sum_{d=1}^{D}w_{d}\\times\\frac{N_{d,c}}{N_{d}}$ where $w_{c}$ is the weighting coefficient for the $c$th cluster, $w_{d}$ is the weighting coefficient for the $d$th target dataset (from Table˜11, $N_{d,c}$ is the number of samples from the $d$th dataset in the $c$th cluster, $N_{d}$ is the total number of samples in the $d$th dataset, and $D$ is the total count of target datasets. We assigned the retrieval weights approximately based on how many scenes were retrieved by each target dataset, with some extra weighting assigned to EpicKitchen. This gave a final curated dataset with statistics more closely matching those of handcrafted datasets from the literature. We found that in isolation, using curated YT1B in place of its uncurated counterpart gave much better results on downstream understanding tasks (see Figure˜4).",
        "chinese": "基于聚类的检索只能匹配目标分布的覆盖范围，不能匹配各部分的权重。因此，还需加权采样重新平衡数据。簇权重为 $w_{c}=\\sum_{d=1}^{D}w_{d}\\times\\frac{N_{d,c}}{N_{d}}$：$w_{c}$ 是第 $c$ 个簇的权重，$w_{d}$ 是第 $d$ 个目标数据集的权重（表 11），$N_{d,c}$ 是该数据集落在第 $c$ 簇中的样本数，$N_{d}$ 是该数据集的总样本数，$D$ 是目标数据集数量。检索权重大致按各目标数据集检索到的场景数确定，并额外提高 EpicKitchen 的权重。所得数据的统计特征更接近已有人工整理的数据集。单独比较 YT1B 时，筛选版相对未筛选版在下游理解任务上好得多（图 4）。",
        "evidenceKeys": [
          "S10.SS2.p2.11"
        ]
      },
      {
        "id": "v-jepa-2-s10-t11",
        "sectionId": "10-v-jepa-2-pretraining",
        "kind": "table",
        "label": "10.2 Pretraining data",
        "english": "**Table 11: Data Curation Statistics. We summarized the number of extracted scenes and hours of videos across clusters extracted from YT1B. The final line includes duplicates among retrievals of K710, SSv2, COIN, and EpicKitchen.**\n\n| Retrieval Target | Cluster Count | Number of Scenes | Retrieval Weight |\n| --- | --- | --- | --- |\n| Uncurated YT1B | 1.5M | 316M |  |\n| K710 | 170k | 100M | 0.7 |\n| SSv2 | 41k | 19M | 0.125 |\n| COIN | 37k | 21M | 0.125 |\n| EpicKitchen | 4k | 13k | 0.05 |\n| Final Curated (includes duplicates) | 210k | 115M |  |",
        "chinese": "**表 11：数据筛选统计。汇总 YT1B 检索簇及场景规模。最后一行包含 K710、SSv2、COIN、EpicKitchen 检索结果之间的重复。**\n\n| 检索目标 | 簇数 | 场景数 | 检索权重 |\n| --- | --- | --- | --- |\n| 未筛选 YT1B | 1.5M | 316M | |\n| K710 | 170k | 100M | 0.7 |\n| SSv2 | 41k | 19M | 0.125 |\n| COIN | 37k | 21M | 0.125 |\n| EpicKitchen | 4k | 13k | 0.05 |\n| 最终筛选集（含重复） | 210k | 115M | |\n\n译注：原图注还提到视频小时数，但当前表格没有这一列。",
        "evidenceKeys": [
          "S10.T11"
        ]
      },
      {
        "id": "v-jepa-2-s10-ss2-p3-1",
        "sectionId": "10-v-jepa-2-pretraining",
        "kind": "paragraph",
        "label": "10.2 Pretraining data",
        "english": "The overall statistics from how many clusters and scenes were retrieved with this strategy are summarized in Table˜11. The overall dataset is weighted towards clusters retrieved with K710. This, combined with its retrieval weight of 0.7, gives the overall curated dataset a heavy Kinetics weighting that we saw reflected in K400 performance for our ablation experiments (see Section˜10.4.1). As shown in Table˜1 in the main body, we combined this Curated YT1B with SSv2, Kinetics, HowTo100M, and ImageNet to create our final VM22M dataset.",
        "chinese": "表 11 汇总该策略检索到的簇与场景数。数据整体偏向由 K710 检索得到的簇，再叠加 0.7 的检索权重，最终筛选数据带有很强的 Kinetics 倾向；这一点也反映在消融实验的 K400 表现中（第 10.4.1 节）。如正文表 1 所示，作者将筛选后的 YT1B 与 SSv2、Kinetics、HowTo100M、ImageNet 混合，构成最终 VM22M 数据集。",
        "evidenceKeys": [
          "S10.SS2.p3.1"
        ]
      },
      {
        "id": "v-jepa-2-s10-ss3-p1-1",
        "sectionId": "10-v-jepa-2-pretraining",
        "kind": "paragraph",
        "label": "10.3 Scaling Model Size",
        "english": "Details of the model architecture are shown in Table˜12. All models are parameterized as vision transformers Dosovitskiy et al. (2020), using the standard $16\\times 16$ patch size. When scaling model size, we increase the encoder from a ViT-L (300M parameters) to a ViT-g (1B parameters), while the predictor size is kept fixed across all pre-training experiments.",
        "chinese": "架构细节见表 12。所有模型均采用视觉 Transformer（Dosovitskiy et al., 2020）和标准 $16\\times16$ patch。扩展规模时，将编码器由 ViT-L（300M 参数）增大至 ViT-g（1B 参数），而全部预训练实验的预测器大小保持固定。",
        "evidenceKeys": [
          "S10.SS3.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s10-t12",
        "sectionId": "10-v-jepa-2-pretraining",
        "kind": "table",
        "label": "10.3 Scaling Model Size",
        "english": "**Table 12: Model architecture details. Family of encoders and predictor architectures used during V-JEPA 2 pretraining, with some of the major parameters.**\n\n| Model | Params | Width | Depth | Heads | MLP | Embedder |\n| --- | --- | --- | --- | --- | --- | --- |\n| Encoders: $E_{\\theta}(\\cdot)$ |  |  |  |  |  |  |\n| ViT-L | 300M | 1024 | 24 | 16 | 4096 | $2\\times 16\\times 16$ strided conv |\n| ViT-H | 600M | 1280 | 32 | 16 | 5120 | $2\\times 16\\times 16$ strided conv |\n| ViT-g | 1B | 1408 | 40 | 22 | 6144 | $2\\times 16\\times 16$ strided conv |\n| Predictor: $P_{\\phi}(\\cdot)$ |  |  |  |  |  |  |\n| ViT-s | 22M | 384 | 12 | 12 | 1536 | N.A. |",
        "chinese": "**表 12：V-JEPA 2 预训练所用编码器、预测器架构及主要参数。**\n\n| 模型 | 参数量 | 宽度 | 深度 | 头数 | MLP | 嵌入层 |\n| --- | --- | --- | --- | --- | --- | --- |\n| 编码器 $E_{\\theta}(\\cdot)$ | | | | | | |\n| ViT-L | 300M | 1024 | 24 | 16 | 4096 | $2\\times16\\times16$ 带步长卷积 |\n| ViT-H | 600M | 1280 | 32 | 16 | 5120 | $2\\times16\\times16$ 带步长卷积 |\n| ViT-g | 1B | 1408 | 40 | 22 | 6144 | $2\\times16\\times16$ 带步长卷积 |\n| 预测器 $P_{\\phi}(\\cdot)$ | | | | | | |\n| ViT-s | 22M | 384 | 12 | 12 | 1536 | 不适用 |",
        "evidenceKeys": [
          "S10.T12"
        ]
      },
      {
        "id": "v-jepa-2-s10-ss4-sss1-p1-1",
        "sectionId": "10-v-jepa-2-pretraining",
        "kind": "paragraph",
        "label": "10.4.1 Effect of Data Curation",
        "english": "Table˜13 shows the results of data curation on a subset of downstream classification tasks. For this table, we trained models at the ViT-L and ViT-g scale using the abbreviated training recipe of the original V-JEPA (Bardes et al., 2024). When training smaller scale models (ViT-L), training a model on the curated variant of YT1B leads to across-the-board improvements over the uncurated variant. However, when moving to a mixed data setting (i.e., adding images and hand-selected videos), performance actually drops for a subset of tasks when using curated data, with performance on SSv2 at 72.8 for VM22M (Mixed+Curated YT1B) vs. 73.3 for Mixed+Uncurated YT1B. In some cases, the model trained with Curated YT1B alone is better than the one with mixed data, such as on the COIN (86.5 vs. 86.25) and K400 (84.6 vs. 83.7) evaluation tasks. This result is somewhat surprising, as despite including the K710 training data in the Mixed setting, we find that it does not improve performance over Curated YT1B for the K400 evaluation task.",
        "chinese": "表 13 比较数据筛选对部分下游分类任务的影响。ViT-L 与 ViT-g 均采用原版 V-JEPA 的缩短训练方案（Bardes et al., 2024）。对于较小的 ViT-L，仅用 YT1B 时，筛选版在所有任务上都优于未筛选版；但混入图像和人工选取视频后，部分任务反而下降。例如，SSv2 上 VM22M（混合数据＋筛选 YT1B）为 72.8，而混合数据＋未筛选 YT1B 为 73.3。有些情况下，只用筛选 YT1B 比混合数据还好：正文举出 COIN 的 86.5 对 86.25，以及 K400 的 84.6 对 83.7。这个结果有些出人意料，因为混合设置即便加入了 K710 训练数据，在 K400 上仍未超过仅用筛选 YT1B。\n\n译注：本段 86.25 对应表 13 的 Mixed+Uncurated 行，83.7 对应 VM22M 行；原文此处比较对象并未统一。",
        "evidenceKeys": [
          "S10.SS4.SSS1.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s10-t13",
        "sectionId": "10-v-jepa-2-pretraining",
        "kind": "table",
        "label": "10.4.1 Effect of Data Curation",
        "english": "**Table 13: Effects of Data Curation on Video Understanding. Results are reported at both the ViT-L and ViT-g model scales. Models at both scales were pretrained using the abbreviated schedule of Bardes et al. (2024).**\n\n| Training Data | IN1K | COIN | SSv2 | K400 |\n| --- | --- | --- | --- | --- |\n| ViT-L |  |  |  |  |\n| Uncurated YT1B | 80.6 | 83.2 | 70.9 | 82.9 |\n| Curated YT1B | 80.8 | 86.5 | 73.1 | 84.6 |\n| Mixed+Uncurated YT1B | 82.9 | 86.25 | 73.3 | 83.0 |\n| VM22M | 82.9 | 86.0 | 72.8 | 83.7 |\n| ViT-g |  |  |  |  |\n| Uncurated YT1B | 81.8 | 86.4 | 73.6 | 85.1 |\n| Curated YT1B | 81.7 | 88.4 | 74.8 | 86.5 |\n| Mixed+Uncurated YT1B | 83.7 | 88.5 | 75.5 | 85.9 |\n| VM22M | 83.9 | 89.2 | 75.6 | 86.2 |",
        "chinese": "**表 13：数据筛选对视频理解的影响。ViT-L、ViT-g 均按 Bardes et al. (2024) 的缩短方案预训练。**\n\n| 训练数据 | IN1K | COIN | SSv2 | K400 |\n| --- | --- | --- | --- | --- |\n| ViT-L | | | | |\n| 未筛选 YT1B | 80.6 | 83.2 | 70.9 | 82.9 |\n| 筛选 YT1B | 80.8 | 86.5 | 73.1 | 84.6 |\n| 混合＋未筛选 YT1B | 82.9 | 86.25 | 73.3 | 83.0 |\n| VM22M | 82.9 | 86.0 | 72.8 | 83.7 |\n| ViT-g | | | | |\n| 未筛选 YT1B | 81.8 | 86.4 | 73.6 | 85.1 |\n| 筛选 YT1B | 81.7 | 88.4 | 74.8 | 86.5 |\n| 混合＋未筛选 YT1B | 83.7 | 88.5 | 75.5 | 85.9 |\n| VM22M | 83.9 | 89.2 | 75.6 | 86.2 |",
        "evidenceKeys": [
          "S10.T13"
        ]
      },
      {
        "id": "v-jepa-2-s10-ss4-sss1-p2-1",
        "sectionId": "10-v-jepa-2-pretraining",
        "kind": "paragraph",
        "label": "10.4.1 Effect of Data Curation",
        "english": "However, this behavior is not constant across scales. At the ViT-g scale, VM22M (Mixed+Curated YT1B) outperforms Mixed+Uncurated YT1B on all tasks.",
        "chinese": "这一现象并不适用于所有模型规模。在 ViT-g 上，VM22M（混合数据＋筛选 YT1B）在全部任务上都优于混合数据＋未筛选 YT1B。",
        "evidenceKeys": [
          "S10.SS4.SSS1.p2.1"
        ]
      },
      {
        "id": "v-jepa-2-s10-f12",
        "sectionId": "10-v-jepa-2-pretraining",
        "kind": "figure-caption",
        "label": "10.4.1 Effect of Data Curation",
        "english": "Figure 12: Effect of data curation for V-JEPA 2 pre-training. We show model performance averaged across the IN1K, COIN, SSv2, and K400 tasks as a function of pre-training “epochs” (equivalent to 300 optimization steps). Models trained with and without uncurated data achieve similar performance until epoch 600, at which point the performance of the model trained with uncurated YT1B beings degrading.",
        "chinese": "图 12：数据筛选对 V-JEPA 2 预训练的影响。纵轴为 IN1K、COIN、SSv2、K400 的平均表现，横轴为预训练“epoch”（此处每个 epoch 等于 300 次优化步）。是否使用未筛选数据的两种模型在第 600 个 epoch 前表现相近；此后，使用未筛选 YT1B 的模型开始退化。",
        "evidenceKeys": [
          "S10.F12"
        ],
        "imageSrc": "/papers/v-jepa-2/x18.webp",
        "imageAlt": "10.4.1 数据管理的影响"
      },
      {
        "id": "v-jepa-2-s10-ss4-sss1-p3-1",
        "sectionId": "10-v-jepa-2-pretraining",
        "kind": "paragraph",
        "label": "10.4.1 Effect of Data Curation",
        "english": "When following these tasks with the long training schedule, we continue to see differences between VM22M and Mixed+Uncurated YT1B at the ViT-g model scale, as shown in Figure˜12, which compares the performance of the models while averaging across the IN1K, COIN, SSv2, and K400 image understanding tasks. Initially, the two models improve at roughly the same rate, but their performance diverges after epoch 600 where the model using uncurated data fails to continue improving.",
        "chinese": "采用更长训练方案时，ViT-g 上 VM22M 与混合＋未筛选 YT1B 的差别仍然存在。图 12 比较 IN1K、COIN、SSv2、K400 的平均表现：初期两模型以相近速度改善，但第 600 个 epoch 后开始分化，使用未筛选数据的模型无法继续提升。",
        "evidenceKeys": [
          "S10.SS4.SSS1.p3.1"
        ]
      },
      {
        "id": "v-jepa-2-s10-ss4-sss2-p1-1",
        "sectionId": "10-v-jepa-2-pretraining",
        "kind": "paragraph",
        "label": "10.4.2 Effect of Long Training Schedule and cooldown",
        "english": "In Table˜14 we demonstrate the effects of the two-stage training process. When comparing to the ViT-g results in Table˜13, we see that the abbreviated schedule is superior to the constant learning rate schedule prior to the cooldown phase. The primary benefits are achieved during the cooldown phase, which uses 64 frames for pretraining in combination with a ramped down learning rate. This leads to a large benefit of over a full point across all evaluations.",
        "chinese": "表 14 展示两阶段训练的作用。与表 13 的 ViT-g 结果比较，在降温前，缩短方案优于恒定学习率方案。主要收益出现在降温阶段：将预训练片段增加到 64 帧，同时降低学习率。作者在这里将收益描述为各评测超过一个百分点。\n\n译注：表 14 中不同列的实际增幅并非全部超过一个百分点，具体应以表中数值为准。",
        "evidenceKeys": [
          "S10.SS4.SSS2.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s10-t14",
        "sectionId": "10-v-jepa-2-pretraining",
        "kind": "table",
        "label": "10.4.2 Effect of Long Training Schedule and cooldown",
        "english": "**Table 14: Effects of Long Training and cooldown. Results are reported at ViT-g model with cooldown at different resolutions.**\n\n| Training Stage | IN1K | COIN | SSv2 | K400 |\n| --- | --- | --- | --- | --- |\n| Phase 1 (epoch 800, no cooldown) | 83.8 | 89.1 | 75.1 | 85.8 |\n| Phase 2 (annealed, $256\\times 256$ resolution) | 84.6 | 90.7 | 75.3 | 86.6 |\n| Phase 2 (annealed, $384\\times 384$ resolution) | 85.1 | 90.2 | 76.5 | 87.3 |",
        "chinese": "**表 14：延长训练与降温的影响。报告 ViT-g 在不同分辨率下降温后的结果。**\n\n| 训练阶段 | IN1K | COIN | SSv2 | K400 |\n| --- | --- | --- | --- | --- |\n| 阶段 1（epoch 800，未降温） | 83.8 | 89.1 | 75.1 | 85.8 |\n| 阶段 2（退火，$256\\times256$） | 84.6 | 90.7 | 75.3 | 86.6 |\n| 阶段 2（退火，$384\\times384$） | 85.1 | 90.2 | 76.5 | 87.3 |",
        "evidenceKeys": [
          "S10.T14"
        ]
      },
      {
        "id": "v-jepa-2-s10-f13",
        "sectionId": "10-v-jepa-2-pretraining",
        "kind": "figure-caption",
        "label": "10.4.3 Effect of Video Length at Evaluation.",
        "english": "Figure 13: Effect of video duration during evaluation. Task performance further improves by running inference on longer video clips. All evaluations use ViT-g models that were annealed with 64 frames at resolution $256\\times 256$. Due to memory constraints, results are reported using a single clip evaluation protocol. Increasing the number of frames processed at inference time boosts average performance by up to $+9.7$ points.",
        "chinese": "图 13：评测视频时长的影响。对更长视频片段进行推理，可以进一步改善任务表现。模型均是在 $256\\times256$ 分辨率、64 帧条件下完成退火的 ViT-g。受显存限制，结果使用单片段评测协议。增加推理帧数后，平均表现最多提升 $+9.7$ 个百分点。",
        "evidenceKeys": [
          "S10.F13"
        ],
        "imageSrc": "/papers/v-jepa-2/x19.webp",
        "imageAlt": "10.4.3 评估时视频长度的影响。"
      },
      {
        "id": "v-jepa-2-s10-ss4-sss3-p1-1",
        "sectionId": "10-v-jepa-2-pretraining",
        "kind": "paragraph",
        "label": "10.4.3 Effect of Video Length at Evaluation.",
        "english": "Figure˜13 examines how input video duration affects downstream task performance during evaluation. Using a model pretrained on 64-frame clips, we observe a $+9.7$ percentage point average improvement when increasing the video duration from 16 to 64 frames during evaluation. Note that this ablation uses a single clip evaluation protocol (i.e. we sample only one clip per video) instead of the standard multiclip evaluations due to memory constraints.",
        "chinese": "图 13 考察评测输入时长对下游任务的影响。使用在 64 帧片段上预训练的模型，将评测时长从 16 帧增加到 64 帧，平均提高 $+9.7$ 个百分点。受显存限制，这项消融对每个视频只采一个片段，未采用标准多片段评测。",
        "evidenceKeys": [
          "S10.SS4.SSS3.p1.1"
        ]
      }
    ]
  },
  {
    "id": "11-v-jepa-2-ac-post-training",
    "number": "11",
    "titleEn": "V-JEPA 2-AC Post-training",
    "titleZh": "11 V-JEPA 2-AC 后训练细节",
    "collapsedByDefault": false,
    "blocks": [
      {
        "id": "v-jepa-2-s11-ss1-p1-5",
        "sectionId": "11-v-jepa-2-ac-post-training",
        "kind": "paragraph",
        "label": "11.1 Post-Training Hyperparameters",
        "english": "The V-JEPA 2-AC model is trained with the AdamW (Loshchilov and Hutter, 2017) optimizer using a warmup-constant-decay learning-rate schedule, and a constant weight-decay of $0.04$. We linearly warmup the learning rate from $7.5\\times 10^{-5}$ to $4.25\\times 10^{-4}$ over 4500 iterations, then hold it constant for 85500 iterations, and finally decay it to $0$ over 4500 iterations. We use a batch size of $256$ comprising 4 second video clips sampled randomly from trajectories in the Droid raw dataset at a frame rate of 4 fps. We train on the left extrinsic camera views from Droid — one could also train on videos from right camera views, however we found that training on both left and right camera views, without additionally conditioning on the camera position, degraded performance. For simplicity, we discard any videos shorter than 4 seconds, leaving us with less than 62 hours of video for training. We apply random-resize-crop augmentations to the sampled video clips with the aspect-ratio sampled in the range (0.75, 1.35).",
        "chinese": "V-JEPA 2-AC 使用 AdamW（Loshchilov and Hutter, 2017）训练，学习率按“预热—恒定—衰减”变化，权重衰减固定为 $0.04$。前 4500 次迭代将学习率从 $7.5\\times10^{-5}$ 线性提高至 $4.25\\times10^{-4}$，随后保持 85500 次迭代，最后用 4500 次迭代衰减到 $0$。批大小为 $256$，样本来自 DROID 原始轨迹中随机截取的 4 秒视频，采样帧率为 4 fps。训练只使用左侧外部相机视角；也可以只用右侧，但作者发现，若不额外提供相机位置条件，混用左右视角会降低表现。为简化处理，剔除不足 4 秒的视频，最终训练视频少于 62 小时。视频使用随机缩放裁剪增强，宽高比在 (0.75, 1.35) 中采样。",
        "evidenceKeys": [
          "S11.SS1.p1.5"
        ]
      },
      {
        "id": "v-jepa-2-s11-ss2-p1-1",
        "sectionId": "11-v-jepa-2-ac-post-training",
        "kind": "paragraph",
        "label": "11.2 Robot Task Definitions",
        "english": "Figure˜14 shows examples of start and goal frames for prehensile manipulation task with a cup in Lab 1. For the grasp and reach with object tasks the model is shown a single goal image. For the pick-and-place tasks we present two sub-goal images to the model in addition to the final goal. The first goal image shows the object being grasped, the second goal image shows the object in the vicinity of the goal position. The model first optimizes actions with respect to the first sub-goal for 4 time-steps before automatically switching to the second sub-goal for the next 10 time-steps, and finally the third goal for the last 4 time-steps. When planning with V-JEPA 2-AC, we use 800 samples, 10 refinement steps based on the top 10 samples from the previous iteration, and a planning horizon of $1$. Since all considered tasks are relatively greedy, we found a short planning horizon to be sufficient for our setup. While longer planning horizons also worked reasonably well, they require more planning time.",
        "chinese": "图 14 展示实验室 1 中杯子操作任务的起始帧和目标帧。抓取及持物移动任务只给模型一张目标图。取放任务除最终目标外，还提供两张子目标图：第一张为抓住物体，第二张为物体接近目标位置。模型先针对第一子目标优化并执行 4 步，再自动切换到第二子目标执行 10 步，最后针对最终目标执行 4 步。V-JEPA 2-AC 规划时每轮采样 800 个候选，进行 10 次细化，每次依据上一轮最好的 10 个样本更新，规划长度为 $1$。本文任务大体可通过贪心推进完成，因此短规划长度已足够；更长规划也能得到合理结果，但耗时增加。",
        "evidenceKeys": [
          "S11.SS2.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s11-f14-panel-1",
        "sectionId": "11-v-jepa-2-ac-post-training",
        "kind": "figure-caption",
        "label": "11.2 Robot Task Definitions",
        "english": "(a) Grasp Cup (Panel 1/3)",
        "chinese": "（a）抓取杯子（面板 1/3）。",
        "evidenceKeys": [
          "S11.F14-panel-1"
        ],
        "imageSrc": "/papers/v-jepa-2/graspcup.webp",
        "imageAlt": "11.2 机器人任务定义"
      },
      {
        "id": "v-jepa-2-s11-f14-panel-2",
        "sectionId": "11-v-jepa-2-ac-post-training",
        "kind": "figure-caption",
        "label": "11.2 Robot Task Definitions",
        "english": "(a) Grasp Cup (Panel 2/3)",
        "chinese": "（a）抓取杯子（面板 2/3）。",
        "evidenceKeys": [
          "S11.F14-panel-2"
        ],
        "imageSrc": "/papers/v-jepa-2/reachcup.webp",
        "imageAlt": "11.2 机器人任务定义"
      },
      {
        "id": "v-jepa-2-s11-f14-panel-3",
        "sectionId": "11-v-jepa-2-ac-post-training",
        "kind": "figure-caption",
        "label": "11.2 Robot Task Definitions",
        "english": "(a) Grasp Cup (Panel 3/3)",
        "chinese": "（a）抓取杯子（面板 3/3）。",
        "evidenceKeys": [
          "S11.F14-panel-3"
        ],
        "imageSrc": "/papers/v-jepa-2/pnpcup.webp",
        "imageAlt": "11.2 机器人任务定义"
      },
      {
        "id": "v-jepa-2-s11-f15-panel-1",
        "sectionId": "11-v-jepa-2-ac-post-training",
        "kind": "figure-caption",
        "label": "11.3 Visualizing World Model Predictions",
        "english": "(a) Comparing accuracy of predictions to ground truth trajectory. (Top Row) Video frames of a ground-truth trajectory from a robot in our lab. (Middle row) Each frame is encoded by V-JEPA 2 encoder, and then decoded using the feedforward frame decoder. Reconstructions of the V-JEPA 2 representations show that the encoder captures the salient parts of the scene necessary for vision-based control; blurry background generation can be partially attributed to the low-capacity of our feedforward frame decoder. (Bottom Row) Autoregressive rollout produced by V-JEPA 2-AC world model using the ground-truth action sequence given first frame as context, and then decoded using feedforward frame decoder. Reconstructions of the V-JEPA 2-AC rollout show that the action-conditioned world model successfully animates the robot while keeping the background and non-interactated objects (e.g., the shelf) unaffected. However, we do observe error accumulation as the world model predicts the location of the cup to be slightly lower than that of the real trajectory in the final frame. (Panel 1/2)",
        "chinese": "（a）比较预测与真实轨迹。上行是实验室机器人的真实视频帧。中行将各帧经 V-JEPA 2 编码，再用前馈帧解码器重建；结果表明编码器保留了视觉控制所需的显著场景信息，背景模糊部分可归因于解码器容量较小。下行以首帧为上下文、真实动作序列为条件，由 V-JEPA 2-AC 自回归预测，再经同一帧解码器还原。模型能预测机器人运动，同时保持背景和未参与交互的物体（如架子）不变。不过仍有误差积累：最后一帧的预测杯子位置略低于真实轨迹。（面板 1/2）",
        "evidenceKeys": [
          "S11.F15-panel-1"
        ],
        "imageSrc": "/papers/v-jepa-2/wm_grid_correction.webp",
        "imageAlt": "11.3 可视化世界模型预测"
      },
      {
        "id": "v-jepa-2-s11-f15-panel-2",
        "sectionId": "11-v-jepa-2-ac-post-training",
        "kind": "figure-caption",
        "label": "11.3 Visualizing World Model Predictions",
        "english": "(a) Comparing accuracy of predictions to ground truth trajectory. (Top Row) Video frames of a ground-truth trajectory from a robot in our lab. (Middle row) Each frame is encoded by V-JEPA 2 encoder, and then decoded using the feedforward frame decoder. Reconstructions of the V-JEPA 2 representations show that the encoder captures the salient parts of the scene necessary for vision-based control; blurry background generation can be partially attributed to the low-capacity of our feedforward frame decoder. (Bottom Row) Autoregressive rollout produced by V-JEPA 2-AC world model using the ground-truth action sequence given first frame as context, and then decoded using feedforward frame decoder. Reconstructions of the V-JEPA 2-AC rollout show that the action-conditioned world model successfully animates the robot while keeping the background and non-interactated objects (e.g., the shelf) unaffected. However, we do observe error accumulation as the world model predicts the location of the cup to be slightly lower than that of the real trajectory in the final frame. (Panel 2/2)",
        "chinese": "（a）比较预测与真实轨迹。上行是实验室机器人的真实视频帧。中行将各帧经 V-JEPA 2 编码，再用前馈帧解码器重建；结果表明编码器保留了视觉控制所需的显著场景信息，背景模糊部分可归因于解码器容量较小。下行以首帧为上下文、真实动作序列为条件，由 V-JEPA 2-AC 自回归预测，再经同一帧解码器还原。模型能预测机器人运动，同时保持背景和未参与交互的物体（如架子）不变。不过仍有误差积累：最后一帧的预测杯子位置略低于真实轨迹。（面板 2/2）",
        "evidenceKeys": [
          "S11.F15-panel-2"
        ],
        "imageSrc": "/papers/v-jepa-2/wm_grid_open_close.webp",
        "imageAlt": "11.3 可视化世界模型预测"
      },
      {
        "id": "v-jepa-2-s11-ss3-p1-5",
        "sectionId": "11-v-jepa-2-ac-post-training",
        "kind": "paragraph",
        "label": "11.3 Visualizing World Model Predictions",
        "english": "To visualize the model’s predictions, we train a frame decoder on the Droid dataset that maps the V-JEPA 2 representations to human-interpretable pixels. Specifically, we process 4 frame clips with the frozen V-JEPA 2 video encoder, decode each frame separately using our decoder network, and then update the weights of the decoder using a mean-squared error (L2) pixel reconstruction loss. The decoder is a feedforward network (fully deterministic regression model that does not use any sampling internally) with output dimension $256\\times 256\\times 3$, parameterized as a ViT-L. We train the decoder for 150000 optimization steps using AdamW with a fixed weight decay of $0.1$, gradient clipping of $1.0$, and a batch size of $1024$ frames. We linearly warmup the learning rate for 2000 steps to a peak value of $5\\times 10^{-4}$ and then decay it following a cosine schedule. For inference, we take the decoder trained on the V-JEPA 2 encoder and apply it off-the-shelf to the representations produced by the V-JEPA 2-AC predictor. The decision to only use use a simple feedforward architecture and decode representations at the frame level (as opposed to video level), is to better leverage the decoder as an interpretability tool to analyze the V-JEPA 2-AC rollouts for a set of robot action sequences.",
        "chinese": "为观察模型预测，在 DROID 上训练一个帧解码器，将 V-JEPA 2 表示映射为人可以查看的像素图像。具体做法是：冻结视频编码器，输入四帧片段，分别解码各帧，以均方误差（L2）像素重建损失更新解码器。解码器为 ViT-L 结构的前馈网络，是内部不采样的确定性回归模型，输出维度为 $256\\times256\\times3$。用 AdamW 训练 150000 步，权重衰减 $0.1$、梯度裁剪 $1.0$、批大小 $1024$ 帧。学习率前 2000 步线性预热至 $5\\times10^{-4}$，随后余弦衰减。推理时，将在编码器真实表示上训练的解码器直接用于 V-JEPA 2-AC 预测器的输出。采用简单前馈结构、逐帧而非整段视频解码，是为了将其作为解释工具，分析不同机器人动作序列下的世界模型预测。",
        "evidenceKeys": [
          "S11.SS3.p1.5"
        ]
      },
      {
        "id": "v-jepa-2-s11-ss3-p2-1",
        "sectionId": "11-v-jepa-2-ac-post-training",
        "kind": "paragraph",
        "label": "11.3 Visualizing World Model Predictions",
        "english": "In Figure˜15(a), we show the video frames of a ground-truth trajectory from a robot in our lab (top row), the decoded V-JEPA 2 encoder representations of each frame (middle row), and the decoded V-JEPA 2-AC world model rollout using the ground-truth action sequence and a single starting frame as context (bottom row). Reconstructions of the V-JEPA 2 representations (middle row) show that the encoder captures the salient parts of the scene necessary for vision-based control; blurry background generation can be partially attributed to the low-capacity of our feedforward frame decoder. Reconstructions of the V-JEPA 2-AC rollout show that the action-conditioned world model successfully animates the robot while keeping the background and non-interactated objects (e.g., the shelf) unaffected. We also see that, with a closed gripper, the model correctly predicts the movement of the cup with the arm, suggesting a reasonable understanding of intuitive physics (e.g., object constancy, shape constancy, and gravity), but we do observe error accumulation as the world model predicts the location of the cup to be slightly lower than that of the real trajectory in the final frame. In Figure˜15(b) we explore how the V-JEPA 2-AC predictions change when driving the model with identical action sequences, but in one cause using a closed gripper (top row) and in the other with an open gripper (bottom row). The world model predicts the location of the cup to be unchanged across time steps when using an open gripper action sequence.",
        "chinese": "图 15(a) 的上行是真实机器人轨迹，中行是 V-JEPA 2 各帧编码表示的解码结果，下行是以真实动作序列和单张起始帧为条件的 V-JEPA 2-AC 自回归预测。中行说明编码器保留了视觉控制需要的显著信息；背景模糊部分来自前馈帧解码器容量有限。下行说明动作条件世界模型能预测机器人运动，同时保持背景和未交互物体不变。夹爪闭合时，模型还能正确预测杯子随机械臂移动，提示它对物体恒常性、形状恒常性和重力等直观物理有一定理解。不过误差仍会积累，最后一帧预测杯子比真实位置略低。图 15(b) 进一步对比相同运动序列下的闭合夹爪（上行）与张开夹爪（下行）条件；夹爪张开时，模型预测杯子始终留在原位。",
        "evidenceKeys": [
          "S11.SS3.p2.1"
        ]
      },
      {
        "id": "v-jepa-2-s11-f16",
        "sectionId": "11-v-jepa-2-ac-post-training",
        "kind": "figure-caption",
        "label": "11.4 Assessing Sensitivity to Camera Position",
        "english": "Figure 16: Sensitivity to camera position. Rotation error (in the x-y plane) of the action coordinate axis inferred by V-JEPA 2-AC as a function of camera position, with 0 degrees corresponding to a camera located at the robot base, and 90 degrees corresponding to a camera located left of the robot base. While ideally, the model’s inferred coordinate axis would be invariant to camera position, here we observe that the model’s inferred coordinate axis is sensitive to the camera position.",
        "chinese": "图 16：对相机位置的敏感性。横轴为相机位置，纵轴为 V-JEPA 2-AC 推断动作坐标轴在 x-y 平面内的旋转误差。0 度表示相机位于机器人底座处，90 度表示位于底座左侧。理想情况下推断坐标轴应不随相机位置改变，但实验显示模型对此敏感。",
        "evidenceKeys": [
          "S11.F16"
        ],
        "imageSrc": "/papers/v-jepa-2/x20.webp",
        "imageAlt": "11.4 评估对相机位置的敏感度"
      },
      {
        "id": "v-jepa-2-s11-ss4-p1-1",
        "sectionId": "11-v-jepa-2-ac-post-training",
        "kind": "paragraph",
        "label": "11.4 Assessing Sensitivity to Camera Position",
        "english": "In practice, we manually tried different camera positions before settling on one that worked best for our experiments; then the camera is kept in the same location for all experiments, across all tasks. In this section, we conduct a quantitative analysis of the V-JEPA 2-AC world model’s sensitivity to camera position. While ideally, the model’s inferred coordinate axis would be invariant to camera position, here we observe that the model’s inferred coordinate axis is sensitive to the camera position; this is problematic as large errors in the inferred coordinate axis can degrade success rate on downstream tasks.",
        "chinese": "实际实验前，作者手动尝试了不同相机位置，选定效果最好的一处，随后在全部任务和实验中固定该位置。本节定量分析 V-JEPA 2-AC 的相机位置敏感性。理想情况下，模型推断的动作坐标轴应具有相机位置不变性；实际却随位置变化，较大的坐标轴误差会损害下游成功率。",
        "evidenceKeys": [
          "S11.SS4.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s11-ss4-p2-7",
        "sectionId": "11-v-jepa-2-ac-post-training",
        "kind": "paragraph",
        "label": "11.4 Assessing Sensitivity to Camera Position",
        "english": "We sweep several camera positions around the robot base, which we describe as a clockwise angular position around the center of the table, with 0 degrees being located at the robot base, and 90 degrees being left of the robot base. Since we train on the left exocentric camera views from the Droid dataset, we sweep camera positions between roughly 35 degrees and 85 degrees. Next, for each camera position, we collect a 201 step trajectory of random robot movements within the horizontal x-y plane. For each pair of adjacent frames in this 201 step trajectory, we compute the optimal action inferred by V-JEPA 2-AC, i.e., the action that minimizes the energy function in eq. (5) given a 1-step rollout. This allows us to construct a dataset for each camera position consisting of real action versus inferred action pairs. We only focus on the $\\Delta x$ and $\\Delta y$ cartesian control actions (first two dimensions of the action vector) for our analysis. Let $A\\in\\mathbb{R}^{200\\times 2}$ denote the inferred actions and $B\\in\\mathbb{R}^{200\\times 2}$ denote the ground truth actions. Based on this, we can solve a linear least squares problem to identify the linear transformation $W^{\\star}\\in\\mathbb{R}^{2\\times 2}$ that maps inferred actions $A$ to real actions $B$,",
        "chinese": "作者在机器人周围选择多个相机位置，以桌面中心为参照，用顺时针方位角描述：底座处为 0 度，底座左侧为 90 度。由于模型用 DROID 左侧外部相机训练，测试位置约在 35–85 度。每个位置收集一条机器人在水平 x-y 平面随机运动的 201 步轨迹。对每对相邻帧，通过一步预测寻找使公式 (5) 能量最小的动作，得到该相机位置下的“真实动作—模型推断动作”配对数据。分析只关注笛卡尔控制的 $\\Delta x$、$\\Delta y$，即动作向量前两维。令 $A\\in\\mathbb{R}^{200\\times2}$ 为推断动作，$B\\in\\mathbb{R}^{200\\times2}$ 为真实动作，求解线性最小二乘得到将 $A$ 映射到 $B$ 的 $W^{\\star}\\in\\mathbb{R}^{2\\times2}$：",
        "evidenceKeys": [
          "S11.SS4.p2.7"
        ]
      },
      {
        "id": "v-jepa-2-s11-ex1",
        "sectionId": "11-v-jepa-2-ac-post-training",
        "kind": "equation",
        "label": "11.4 Assessing Sensitivity to Camera Position",
        "english": "$$\nW^{\\star}=\\underset{W\\in\\mathbb{R}^{2\\times 2}}{\\text{argmin}}\\ \\lVert AW-B\\rVert_{2}.\n$$",
        "chinese": "公式（符号保持不变）：\n\n$$\nW^{\\star}=\\underset{W\\in\\mathbb{R}^{2\\times 2}}{\\text{argmin}}\\ \\lVert AW-B\\rVert_{2}.\n$$",
        "evidenceKeys": [
          "S11.Ex1"
        ]
      },
      {
        "id": "v-jepa-2-s11-ss4-p2-12",
        "sectionId": "11-v-jepa-2-ac-post-training",
        "kind": "paragraph",
        "label": "11.4 Assessing Sensitivity to Camera Position",
        "english": "The mean absolute prediction error for all camera position is roughly $1.6$cm (compared to a ground truth delta pose of roughly $5$cm), suggesting that the error is systematic. In addition, we observe that for each camera position, the matrix $W^{\\star}$ has condition number $\\approx 1.5$, i.e., modulo a fixed scalar coefficient, $W^{\\star}$ is approximately a rotation matrix, and thus we can compute the rotation error in the inferred coordinate axis by using",
        "chinese": "各相机位置的平均绝对预测误差约为 $1.6$ cm，而真实位移约为 $5$ cm，提示存在系统性误差。此外，每个位置下 $W^{\\star}$ 的条件数约为 $\\approx1.5$，即去掉固定缩放系数后近似旋转矩阵，因此可按下式计算推断坐标轴的旋转误差：",
        "evidenceKeys": [
          "S11.SS4.p2.12"
        ]
      },
      {
        "id": "v-jepa-2-s11-ex2",
        "sectionId": "11-v-jepa-2-ac-post-training",
        "kind": "equation",
        "label": "11.4 Assessing Sensitivity to Camera Position",
        "english": "$$\nW^{\\star}\\approx\\overline{W}^{\\star}=\\begin{bmatrix}\\cos\\theta&-\\sin\\theta\\\\\n\\sin\\theta&\\cos\\theta\\end{bmatrix},\n$$",
        "chinese": "公式（符号保持不变）：\n\n$$\nW^{\\star}\\approx\\overline{W}^{\\star}=\\begin{bmatrix}\\cos\\theta&-\\sin\\theta\\\\\n\\sin\\theta&\\cos\\theta\\end{bmatrix},\n$$",
        "evidenceKeys": [
          "S11.Ex2"
        ]
      },
      {
        "id": "v-jepa-2-s11-ss4-p2-16",
        "sectionId": "11-v-jepa-2-ac-post-training",
        "kind": "paragraph",
        "label": "11.4 Assessing Sensitivity to Camera Position",
        "english": "with $\\overline{W}^{\\star}\\coloneq UV^{\\top}$ where $U$ and $V$ are the left and right singular vectors of $W^{\\star}$, respectively.",
        "chinese": "其中 $\\overline{W}^{\\star}\\coloneq UV^{\\top}$，$U$、$V$ 分别为 $W^{\\star}$ 的左、右奇异向量矩阵。",
        "evidenceKeys": [
          "S11.SS4.p2.16"
        ]
      },
      {
        "id": "v-jepa-2-s11-ss4-p3-1",
        "sectionId": "11-v-jepa-2-ac-post-training",
        "kind": "paragraph",
        "label": "11.4 Assessing Sensitivity to Camera Position",
        "english": "Figure˜16 shows the camera position plotted against the rotation error in the V-JEPA 2-AC inferred coordinate axis. We observe that the rotation error in the inferred coordinate axis is almost a linear function of the camera position. We can most clearly see the effects of rotation errors in the inferred coordinate axis in our single-goal reaching experiments in Figure˜8. While the model is always able to move the arm within $4$ cm of the goal based on visual feedback from the monocular RGB camera, rotation errors in the inferred coordinate axis result in relatively suboptimal actions at each planning step, yielding a non-maximal, albeit monotonic, decrease in the distance to goal at each step.",
        "chinese": "图 16 显示，推断坐标轴的旋转误差几乎随相机位置线性变化。其影响在图 8 的单目标到达实验中最明显：虽然模型依靠单目 RGB 反馈总能将机械臂移到距目标 $4$ cm 以内，但坐标轴旋转误差使各规划步的动作并非最优，因此目标距离虽逐步单调缩小，每一步却没有取得最大可能降幅。",
        "evidenceKeys": [
          "S11.SS4.p3.1"
        ]
      },
      {
        "id": "v-jepa-2-s11-ss4-p4-1",
        "sectionId": "11-v-jepa-2-ac-post-training",
        "kind": "paragraph",
        "label": "11.4 Assessing Sensitivity to Camera Position",
        "english": "Interestingly, since errors in the inferred coordinate axis are primarily rotation-based, one can use this approach to “calibrate” their world model by simply rotating all inferred actions by $W^{\\star}$, and thereby introduce the desired invariance to camera position. Such an unsupervised calibration phase would involve the robot performing random actions, solving a linear least squares problem by comparing its inferred optimal actions to the actual actions it executed, and then multiplying its inferred actions by the rotation matrix before sending them to the controller during task execution. While such an approach is interesting, we emphasize that we do no such calibration in our experiments.",
        "chinese": "由于坐标轴误差主要表现为旋转，原则上可以用 $W^{\\star}$ 修正全部推断动作，为世界模型引入期望的相机位置不变性。这种无监督校准需要机器人先随机动作，比较模型推断的最优动作与实际执行动作，通过最小二乘求解修正矩阵；任务执行时，先乘该旋转矩阵，再将动作发送给控制器。不过，作者明确强调：本文实验没有采用这种校准。",
        "evidenceKeys": [
          "S11.SS4.p4.1"
        ]
      }
    ]
  },
  {
    "id": "12-visual-classification",
    "number": "12",
    "titleEn": "Visual Classification",
    "titleZh": "12 视觉分类",
    "collapsedByDefault": false,
    "blocks": [
      {
        "id": "v-jepa-2-s12-p1-1",
        "sectionId": "12-visual-classification",
        "kind": "paragraph",
        "label": "12 Visual Classification",
        "english": "We describe in more detail the evaluation procedure used for the classification tasks described in Section˜5.",
        "chinese": "本节详细说明第 5 节分类任务的评测流程。",
        "evidenceKeys": [
          "S12.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s12-ss1-sss0-px1-p1-1",
        "sectionId": "12-visual-classification",
        "kind": "paragraph",
        "label": "Probe Architecture.",
        "english": "We train an attentive probe on top of the frozen encoder output using the training data from each downstream task. Our attentive probe is composed of four transformer blocks, each using 16 heads in the attention layer. The first three blocks use standard self-attention; the final block uses a cross-attention layer with a learnable query token. The output of the cross-attention layer in the final block is added back to the query token as a residual connection before applying the rest of the block (LayerNorm, followed by MLP with a single GeLU activation). The transformer blocks are followed by a final linear classifier layer.",
        "chinese": "探针架构。在冻结编码器输出上，使用各下游任务的训练数据训练注意力探针。探针包含四个 Transformer 块，各有 16 个注意力头。前三块使用标准自注意力，最后一块使用带可学习查询 token 的交叉注意力。最后一块的交叉注意力输出先以残差连接加回查询 token，再通过其余层：LayerNorm，以及含单个 GeLU 激活的 MLP。最终接线性分类层。",
        "evidenceKeys": [
          "S12.SS1.SSS0.Px1.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s12-ss1-sss0-px2-p1-11",
        "sectionId": "12-visual-classification",
        "kind": "paragraph",
        "label": "Evaluation setup parameters.",
        "english": "All models follow the same evaluation protocol and use a resolution of $256\\times 256$, except our V-JEPA 2 ViT-g384. For video evaluations, we sampled multiple clip segments from each input video. During validation, we also extracted three spatial views from each segment (instead of one view during training). The number of clip segments, frame step parameter, and global batch size vary for each eval; parameters used for each evaluation can be found in Table˜15. By default, we use $16\\times 2\\times 3$ inputs for SSv2 (16 frames clip, 2 temporal crops, 3 spatial crops), $16\\times 8\\times 3$ for K400, $32\\times 8\\times 3$ for COIN, and $32\\times 4\\times 3$ for Diving-48 and Jester. V-JEPA 2 ViT-g384 uses a higher resolution of $384\\times 384$ for K400, COIN, Diving-48, and Jester, $512\\times 512$ for ImageNet and $384\\times 384$ with $64\\times 2\\times 3$ inputs for SSv2.",
        "chinese": "评测设置。除 V-JEPA 2 ViT-g384 外，全部模型采用相同协议和 $256\\times256$ 分辨率。视频评测从每条视频采多个片段；验证时每片段再取三个空间视图，训练时只取一个。片段数量、帧间隔和全局批大小依任务而定（表 15）。默认 SSv2 输入为 $16\\times2\\times3$，即每段 16 帧、两个时间片段、三个空间裁剪；K400 为 $16\\times8\\times3$，COIN 为 $32\\times8\\times3$，Diving-48、Jester 为 $32\\times4\\times3$。ViT-g384 在 K400、COIN、Diving-48、Jester 使用 $384\\times384$，ImageNet 使用 $512\\times512$，SSv2 使用 $384\\times384$ 分辨率及 $64\\times2\\times3$ 输入。",
        "evidenceKeys": [
          "S12.SS1.SSS0.Px2.p1.11"
        ]
      },
      {
        "id": "v-jepa-2-s12-ss1-sss0-px3-p1-1",
        "sectionId": "12-visual-classification",
        "kind": "paragraph",
        "label": "ImageNet evaluation.",
        "english": "For ImageNet, we repeat each input image to produce a 16-frame video clip. We also use a larger global batch size (1024 instead of 256 or 128), and do not use multiple clips or views per sample.",
        "chinese": "ImageNet 评测。将每张输入图像重复成 16 帧片段，全局批大小增至 1024（而非 256 或 128），每个样本只用一个片段和一个视图。",
        "evidenceKeys": [
          "S12.SS1.SSS0.Px3.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s12-ss1-sss0-px4-p1-1",
        "sectionId": "12-visual-classification",
        "kind": "paragraph",
        "label": "Jester and Diving-48 evaluation.",
        "english": "Our Jester and Diving-48 action classification evaluation tasks differ from the other understanding evaluations in several ways, primarily in that we employ a multilayer strategy. Instead of attending to the tokens from only the last layer of the encoder, we extract tokens from four encoder layers (the last layer and three intermediate layers) and attend to all of them. (Table˜16 shows the layers we used for each encoder size.) We also train the probes for these two evaluations with only three classification heads (instead of 20 for the other evaluations), but train for 100 epochs (instead of 20) as these evaluations benefit from longer training. We use a global batch size of 128 for both evaluations.",
        "chinese": "Jester 与 Diving-48 评测。主要区别是采用多层特征：不只关注编码器末层 token，而是取末层与三个中间层的 token，联合计算注意力；各模型所选层见表 16。这两个任务只训练三个分类头，其他任务为 20 个；但训练延长到 100 个 epoch，而非 20，因为更长训练有帮助。两项评测的全局批大小均为 128。",
        "evidenceKeys": [
          "S12.SS1.SSS0.Px4.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s12-ss1-sss0-px5-p1-1",
        "sectionId": "12-visual-classification",
        "kind": "paragraph",
        "label": "Optimization.",
        "english": "For each evaluation, we simultaneously train multiple classifier heads with different hyperparameters (learning rate and weight decay), reporting the accuracy of the best-performing classifier. For most of our evaluations (Kinetics, SSv2, COIN, and ImageNet), we train for 20 epochs and use 20 heads, each using one of five learning rate values and four weight decay values, and the learning rate decays according to a cosine schedule. We provide a summary of all hyperparameters in Table˜15.",
        "chinese": "优化。每项评测并行训练多组不同学习率和权重衰减的分类头，报告最佳分类器的准确率。Kinetics、SSv2、COIN、ImageNet 通常训练 20 个 epoch，使用五种学习率与四种权重衰减组合形成 20 个分类头，学习率余弦衰减。完整超参数见表 15。",
        "evidenceKeys": [
          "S12.SS1.SSS0.Px5.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s12-t15",
        "sectionId": "12-visual-classification",
        "kind": "table",
        "label": "Optimization.",
        "english": "**Table 15: Visual Classification eval params. Default parameters used for the visual classification evaluations, with non-default values for each eval (* denotes default). All attentive probes use 4 transformer blocks with 16 heads.**\n\n| Parameter | Default (K400) | ImageNet | SSv2 | COIN | Jester/Diving-48 |\n| --- | --- | --- | --- | --- | --- |\n| Number of frames | 16 | 16 | 16 | 32 | 32 |\n| Segments / Clip | 8 | 1 | 2 | 8 | 4 |\n| Views / Segment | 3 | 1 | * | * | * |\n| Frame Step | 4 | n/a | * | * | 2 |\n| Epochs | 20 | * | * | * | 100 |\n| Batch Size (global) | 256 | 1024 | * | 128 | 128 |\n| Resolution | $256\\times 256$ | * | * | * | * |\n| Classifier Heads | 20 (4x5) | * | * | * | 3 (3x1) |\n| Classifier Learning Rates | [5e-3 3e-3 1e-3 3e-4 1e-4] | * | * | * | [1e-3 3e-4 1e-4] |\n| Classifier Weight Decay | [.8 .4 .1 .01] | * | * | * | [.8] |",
        "chinese": "**表 15：视觉分类评测参数。默认配置为 K400，其他列列出各任务差异；* 表示沿用默认值。注意力探针均为四层 Transformer，每层 16 个注意力头。**\n\n| 参数 | 默认（K400） | ImageNet | SSv2 | COIN | Jester/Diving-48 |\n| --- | --- | --- | --- | --- | --- |\n| 帧数 | 16 | 16 | 16 | 32 | 32 |\n| 每视频的时间片段数 | 8 | 1 | 2 | 8 | 4 |\n| 每片段的空间视图数 | 3 | 1 | * | * | * |\n| 帧间隔 | 4 | 不适用 | * | * | 2 |\n| epoch 数 | 20 | * | * | * | 100 |\n| 全局批大小 | 256 | 1024 | * | 128 | 128 |\n| 分辨率 | $256\\times256$ | * | * | * | * |\n| 分类头数 | 20 (4x5) | * | * | * | 3 (3x1) |\n| 分类器学习率 | [5e-3 3e-3 1e-3 3e-4 1e-4] | * | * | * | [1e-3 3e-4 1e-4] |\n| 分类器权重衰减 | [.8 .4 .1 .01] | * | * | * | [.8] |\n\n译注：权重衰减的四个值已根据原始 HTML 表格恢复分隔，分别为 .8、.4、.1、.01。",
        "evidenceKeys": [
          "S12.T15"
        ]
      },
      {
        "id": "v-jepa-2-s12-t16",
        "sectionId": "12-visual-classification",
        "kind": "table",
        "label": "Optimization.",
        "english": "**Table 16: Input layers for Jester/Diving-48. For each encoder size, indices of the four encoder layers whose tokens are used as input to the linear classifier in the Jester and Diving-48 evaluations.**\n\n| Encoder | # Layers | Attended Layers |\n| --- | --- | --- |\n| ViT-L | 24 | 17, 19, 21, 23 |\n| ViT-H | 32 | 25, 27, 29, 31 |\n| ViT-g | 40 | 24, 29, 34, 39 |",
        "chinese": "**表 16：Jester/Diving-48 的输入层。列出各编码器所取四层的索引，其 token 用于这两项评测的分类器。**\n\n| 编码器 | 总层数 | 使用层索引 |\n| --- | --- | --- |\n| ViT-L | 24 | 17, 19, 21, 23 |\n| ViT-H | 32 | 25, 27, 29, 31 |\n| ViT-g | 40 | 24, 29, 34, 39 |",
        "evidenceKeys": [
          "S12.T16"
        ]
      },
      {
        "id": "v-jepa-2-s12-ss2-sss0-px1-p1-2",
        "sectionId": "12-visual-classification",
        "kind": "paragraph",
        "label": "Probe Size.",
        "english": "Since we use a four-layer attentive probe for these evaluations, we investigate whether using a smaller probe impacts evaluation performance. We re-run our six understanding evaluations (for two model sizes, ViT-L and ViT-g) with a smaller probe consisting of a single cross-attention block using 16 attention heads. Unlike in Section˜5, we use 16 frames for all evaluations, including Diving-48 and Jester. See Table˜18 for classification performance—we confirm that our four-layer probe outperforms a single-layer attentive probe across all understanding evaluations (except for Jester), by an average of $+1.4$ points accuracy for ViT-L and $+1.0$ points for ViT-g.",
        "chinese": "探针大小。作者检验能否用较小探针替代四层注意力探针：在 ViT-L、ViT-g 上重新运行六项理解评测，改用只有一个交叉注意力块、16 个头的探针。与第 5 节不同，此处全部任务（包括 Diving-48、Jester）都只输入 16 帧。表 18 显示，除 Jester 外，四层探针优于单层探针；正文报告 ViT-L 平均提高 $+1.4$ 个百分点，ViT-g 提高 $+1.0$。\n\n译注：表 18 的 ViT-L 平均列为 84.0 与 85.6，和正文的 +1.4 不完全一致。",
        "evidenceKeys": [
          "S12.SS2.SSS0.Px1.p1.2"
        ]
      },
      {
        "id": "v-jepa-2-s12-ss2-sss0-px2-p1-1",
        "sectionId": "12-visual-classification",
        "kind": "paragraph",
        "label": "Impact of encoder multilayer.",
        "english": "We study the impact of feeding tokens from multiple layers from the encoder to the attentive probe during evaluation. Table˜17 shows that Diving-48 and Jester strongly benefit from information from deeper layers of the encoder.",
        "chinese": "编码器多层特征的影响。评测时，将编码器多个层的 token 交给注意力探针。表 17 表明，利用更多深层信息对 Diving-48 和 Jester 有明显帮助。",
        "evidenceKeys": [
          "S12.SS2.SSS0.Px2.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s12-t17",
        "sectionId": "12-visual-classification",
        "kind": "table",
        "label": "Impact of encoder multilayer.",
        "english": "**Table 17: Encoder Multilayer Ablation. We vary the number of encoder layers fed to the attentive probe. We report the classification performances of attentive probes trained on top of V-JEPA 2 with 16 frames at $256\\times 256$ resolution.**\n\n| Model | Encoder Layers | Diving-48 | Jester |\n| --- | --- | --- | --- |\n| ViT-g | 1 | 82.9 | 96.1 |\n| ViT-g | 4 | 86.7 | 97.6 |",
        "chinese": "**表 17：编码器多层特征消融。改变输入注意力探针的编码器层数。输入为 16 帧、$256\\times256$，在 V-JEPA 2 上训练探针并报告分类表现。**\n\n| 模型 | 编码器特征层数 | Diving-48 | Jester |\n| --- | --- | --- | --- |\n| ViT-g | 1 | 82.9 | 96.1 |\n| ViT-g | 4 | 86.7 | 97.6 |",
        "evidenceKeys": [
          "S12.T17"
        ]
      },
      {
        "id": "v-jepa-2-s12-t18",
        "sectionId": "12-visual-classification",
        "kind": "table",
        "label": "Impact of encoder multilayer.",
        "english": "**Table 18: Probe Size Ablation. We vary the number of layers in the attentive probe. We report the classification performances of attentive probes trained on top of V-JEPA 2 with 16 frames at $256\\times 256$ resolution.**\n\n|  |  |  | Motion Understanding | Appearance Understanding |  |  |  |  |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| Model | Probe Layers | Avg. | SSv2 | Diving-48 | Jester | K400 | COIN | IN1K |\n| ViT-L | 1 | 84.0 | 72.0 | 83.2 | 97.7 | 83.3 | 85.9 | 81.8 |\n| ViT-L | 4 | 85.6 | 73.6 | 87.1 | 97.7 | 85.1 | 86.8 | 83.5 |\n| ViT-g | 1 | 86.0 | 74.8 | 85.3 | 97.8 | 85.6 | 88.9 | 83.5 |\n| ViT-g | 4 | 87.0 | 75.6 | 86.7 | 97.6 | 86.6 | 90.7 | 84.6 |",
        "chinese": "**表 18：探针大小消融。改变注意力探针层数；输入均为 16 帧、$256\\times256$。SSv2、Diving-48、Jester 衡量运动理解，K400、COIN、IN1K 衡量外观理解。**\n\n| 模型 | 探针层数 | 平均 | SSv2 | Diving-48 | Jester | K400 | COIN | IN1K |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| ViT-L | 1 | 84.0 | 72.0 | 83.2 | 97.7 | 83.3 | 85.9 | 81.8 |\n| ViT-L | 4 | 85.6 | 73.6 | 87.1 | 97.7 | 85.1 | 86.8 | 83.5 |\n| ViT-g | 1 | 86.0 | 74.8 | 85.3 | 97.8 | 85.6 | 88.9 | 83.5 |\n| ViT-g | 4 | 87.0 | 75.6 | 86.7 | 97.6 | 86.6 | 90.7 | 84.6 |",
        "evidenceKeys": [
          "S12.T18"
        ]
      }
    ]
  },
  {
    "id": "13-action-anticipation",
    "number": "13",
    "titleEn": "Action Anticipation",
    "titleZh": "13 动作预判",
    "collapsedByDefault": false,
    "blocks": [
      {
        "id": "v-jepa-2-s13-p1-1",
        "sectionId": "13-action-anticipation",
        "kind": "paragraph",
        "label": "13 Action Anticipation",
        "english": "We provide additional details, results, and ablations related to the Epic-Kitchen 100 action anticipation evaluation of Section˜6.",
        "chinese": "本节补充第 6 节 Epic-Kitchen 100 动作预判评测的细节、结果和消融。",
        "evidenceKeys": [
          "S13.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s13-ss1-sss0-px1-p1-1",
        "sectionId": "13-action-anticipation",
        "kind": "paragraph",
        "label": "Probe Architecture.",
        "english": "Our probe architecture for action anticipation follows the architecture of our classification probe described in Section˜12.1, consisting of four transformer blocks, including a last cross-attention layer with a set of learnable query tokens, followed by a final linear classifier layer for each query token.",
        "chinese": "预判探针沿用第 12.1 节分类探针架构，包含四个 Transformer 块；最后的交叉注意力层使用一组可学习查询 token，各查询后接独立线性分类层。",
        "evidenceKeys": [
          "S13.SS1.SSS0.Px1.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s13-ss1-sss0-px2-p1-12",
        "sectionId": "13-action-anticipation",
        "kind": "paragraph",
        "label": "Evaluation setup parameters.",
        "english": "We use a focal loss (Lin et al., 2017) with a $\\alpha=0.25$ and $\\gamma=2.0$ when training the probe; this loss is more suited for training with long-tailed imbalanced class distributions. We use a context of 32 frames with a frame-rate of 8 frames per second at resolution $256\\times 256$ for V-JEPA 2 ViT-L, ViT-H, and ViT-g; and resolution $384\\times 384$ for V-JEPA 2 ViT-g384. During probe training, we randomly sample an anticipation time between $0.25$ and $1.75$ seconds, and an anticipation point between $0.0$ and $0.25$. The anticipation point identifies a point in the action segment from which to perform anticipation; i.e., an anticipation point of $0$ means that we predict the representation of the first frame in the action segment using our V-JEPA 2 predictor before feeding it to the probe, whereas an anticipation point of $1$ means that we predict the representation of the last frame in the action segment before feeding it to the probe. The validation anticipation time is set to 1 second and the validation anticipation point is set to $0$. We provide a summary of the hyperparameters, including the optimization parameters in Table˜19.",
        "chinese": "探针采用 focal loss（Lin et al., 2017），参数为 $\\alpha=0.25$、$\\gamma=2.0$，更适合长尾、类别不平衡数据。上下文为 32 帧、8 fps；ViT-L、ViT-H、ViT-g 使用 $256\\times256$，ViT-g384 使用 $384\\times384$。训练时，提前预测时间在 $0.25$–$1.75$ 秒随机取值，动作片段内的预判位置在 $0.0$–$0.25$ 间随机取值。该位置表示预测动作片段中的哪一帧：$0$ 对应首帧，$1$ 对应末帧；先由 V-JEPA 2 预测该帧表示，再输入探针。验证时固定提前 1 秒、位置为 $0$。包括优化参数在内的完整设置见表 19。",
        "evidenceKeys": [
          "S13.SS1.SSS0.Px2.p1.12"
        ]
      },
      {
        "id": "v-jepa-2-s13-t19",
        "sectionId": "13-action-anticipation",
        "kind": "table",
        "label": "Evaluation setup parameters.",
        "english": "**Table 19: Action Anticipation Evaluation params. Default parameters used for the EK100 Action Anticipation evaluation.**\n\n| Parameter | EK100 |\n| --- | --- |\n| Train Anticipation time | 0.25s – 1.75s |\n| Train Anticipation point | 0.0 – 0.25 |\n| Val Anticipation time | 1s |\n| Val Anticipation point | 0.0 |\n| Number of frames | 32 |\n| Frames per second | 8 |\n| Epochs | 20 |\n| Warmup epochs | 0 |\n| Batch Size (global) | 128 |\n| Classifier Heads | 20 (4x5) |\n| Classifier Learning Rates | [5e-3 3e-3 1e-3 3e-4 1e-4] |\n| Classifier Weight Decay | [1e-4 1e-3 1e-2 1e-1] |",
        "chinese": "**表 19：EK100 动作预判的默认评测参数。**\n\n| 参数 | EK100 |\n| --- | --- |\n| 训练提前预测时间 | 0.25s – 1.75s |\n| 训练片段内预判位置 | 0.0 – 0.25 |\n| 验证提前预测时间 | 1s |\n| 验证片段内预判位置 | 0.0 |\n| 帧数 | 32 |\n| 帧率 | 8 |\n| epoch 数 | 20 |\n| 预热 epoch 数 | 0 |\n| 全局批大小 | 128 |\n| 分类头数 | 20 (4x5) |\n| 分类器学习率 | [5e-3 3e-3 1e-3 3e-4 1e-4] |\n| 分类器权重衰减 | [1e-4 1e-3 1e-2 1e-1] |",
        "evidenceKeys": [
          "S13.T19"
        ]
      },
      {
        "id": "v-jepa-2-s13-ss2-sss0-px1-p1-1",
        "sectionId": "13-action-anticipation",
        "kind": "paragraph",
        "label": "Impact of Architecture.",
        "english": "Table˜20 investigates the impact of providing the output of the V-JEPA 2 encoder, predictor, or both, to the action anticipation probe. Using encoder outputs already leads to competitive performance on the EK100 task. Adding the predictor provides a small but consistent improvement across action, verb, and object categories. In addition, using predictor outputs yields a non-trivial performance, but still at a much lower point compared to using the encoder, showing that the EK100 task mostly requires strong semantic understanding, as opposed to forecasting capabilities.",
        "chinese": "输入架构的影响。表 20 比较只给动作预判探针编码器输出、只给预测器输出，以及同时给两者。仅编码器输出已能在 EK100 取得较好表现；加入预测器后，动作、动词和物体类别均有小幅而一致的提升。只用预测器仍能获得非平凡结果，但明显弱于编码器，说明 EK100 更依赖强语义理解，而非单纯预测未来。",
        "evidenceKeys": [
          "S13.SS2.SSS0.Px1.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s13-t20",
        "sectionId": "13-action-anticipation",
        "kind": "table",
        "label": "Impact of Architecture.",
        "english": "**Table 20: EK100: Impact of Anticipation Probe Inputs. We investigate the impact of providing the outputs of the V-JEPA 2 encoder, predictor, or both, to the action anticipation probe. Using encoder outputs already leads to competitive performance on the EK100 task. Adding the predictor provides a small but consistent improvement across action, verb and object categories.**\n\n|  |  | Action Anticipation |  |  |\n| --- | --- | --- | --- | --- |\n| Encoder | Predictor | Verb | Noun | Action |\n| ✓ |  | 61.3 | 57.0 | 39.1 |\n|  | ✓ | 48.7 | 34.7 | 20.2 |\n| ✓ | ✓ | 63.6 | 57.1 | 39.7 |",
        "chinese": "**表 20：EK100 预判探针输入消融。仅编码器输出已具有竞争力，同时加入预测器在动词、名词和动作上都有小幅提升。**\n\n| 编码器 | 预测器 | 动词 | 名词 | 动作 |\n| --- | --- | --- | --- | --- |\n| ✓ | | 61.3 | 57.0 | 39.1 |\n| | ✓ | 48.7 | 34.7 | 20.2 |\n| ✓ | ✓ | 63.6 | 57.1 | 39.7 |",
        "evidenceKeys": [
          "S13.T20"
        ]
      },
      {
        "id": "v-jepa-2-s13-f17-panel-1",
        "sectionId": "13-action-anticipation",
        "kind": "figure-caption",
        "label": "Impact of Architecture.",
        "english": "Figure 17: Protocol ablation for action anticipation on EK100. (Left) Performance with respect to the number of context frames used for action anticipation. (Middle) Performance with respect to the frame rate (fps) used for inference; number of context frames fixed at 32. (Right) Performance with respect to the spatial resolution (height and width) of the context frames used for action anticipation. (Panel 1/3)",
        "chinese": "图 17：EK100 动作预判协议消融。左：上下文帧数的影响；中：固定 32 帧时，推理帧率的影响；右：上下文图像空间分辨率（高、宽）的影响。（面板 1/3）",
        "evidenceKeys": [
          "S13.F17-panel-1"
        ],
        "imageSrc": "/papers/v-jepa-2/x21.webp",
        "imageAlt": "建筑的影响。"
      },
      {
        "id": "v-jepa-2-s13-f17-panel-2",
        "sectionId": "13-action-anticipation",
        "kind": "figure-caption",
        "label": "Impact of Architecture.",
        "english": "Figure 17: Protocol ablation for action anticipation on EK100. (Left) Performance with respect to the number of context frames used for action anticipation. (Middle) Performance with respect to the frame rate (fps) used for inference; number of context frames fixed at 32. (Right) Performance with respect to the spatial resolution (height and width) of the context frames used for action anticipation. (Panel 2/3)",
        "chinese": "图 17：EK100 动作预判协议消融。左：上下文帧数的影响；中：固定 32 帧时，推理帧率的影响；右：上下文图像空间分辨率（高、宽）的影响。（面板 2/3）",
        "evidenceKeys": [
          "S13.F17-panel-2"
        ],
        "imageSrc": "/papers/v-jepa-2/x22.webp",
        "imageAlt": "建筑的影响。"
      },
      {
        "id": "v-jepa-2-s13-f17-panel-3",
        "sectionId": "13-action-anticipation",
        "kind": "figure-caption",
        "label": "Impact of Architecture.",
        "english": "Figure 17: Protocol ablation for action anticipation on EK100. (Left) Performance with respect to the number of context frames used for action anticipation. (Middle) Performance with respect to the frame rate (fps) used for inference; number of context frames fixed at 32. (Right) Performance with respect to the spatial resolution (height and width) of the context frames used for action anticipation. (Panel 3/3)",
        "chinese": "图 17：EK100 动作预判协议消融。左：上下文帧数的影响；中：固定 32 帧时，推理帧率的影响；右：上下文图像空间分辨率（高、宽）的影响。（面板 3/3）",
        "evidenceKeys": [
          "S13.F17-panel-3"
        ],
        "imageSrc": "/papers/v-jepa-2/x23.webp",
        "imageAlt": "建筑的影响。"
      },
      {
        "id": "v-jepa-2-s13-f18-panel-1",
        "sectionId": "13-action-anticipation",
        "kind": "figure-caption",
        "label": "Impact of Architecture.",
        "english": "Figure 18: (Left): Impact of longer-term anticipation times. Performance on EK100 action anticipation, at several recall values and anticipation times. (Right): Distribution of success and failure cases of V-JEPA 2. Calculated on the validation set of EK100. VNA means that verb, noun and action are all correctly classified by the model. An X symbol means that the corresponding attribute is not correctly classified by the model. Note: the probe is composed of 3 independent classifiers for verb, noun and action, hence why the model can have a different prediction for the action and for the verb/noun pair. (Panel 1/2)",
        "chinese": "图 18：左侧比较更长提前预测时间下的 EK100 表现，报告不同 Recall@k；右侧统计 EK100 验证集中的成功、失败组合。VNA 表示动词、名词、动作均预测正确，X 表示对应项错误。探针用三个独立分类器预测这些类别，因此动作类别预测可能与动词—名词组合不一致。（面板 1/2）",
        "evidenceKeys": [
          "S13.F18-panel-1"
        ],
        "imageSrc": "/papers/v-jepa-2/x24.webp",
        "imageAlt": "建筑的影响。"
      },
      {
        "id": "v-jepa-2-s13-f18-panel-2",
        "sectionId": "13-action-anticipation",
        "kind": "figure-caption",
        "label": "Impact of Architecture.",
        "english": "Figure 18: (Left): Impact of longer-term anticipation times. Performance on EK100 action anticipation, at several recall values and anticipation times. (Right): Distribution of success and failure cases of V-JEPA 2. Calculated on the validation set of EK100. VNA means that verb, noun and action are all correctly classified by the model. An X symbol means that the corresponding attribute is not correctly classified by the model. Note: the probe is composed of 3 independent classifiers for verb, noun and action, hence why the model can have a different prediction for the action and for the verb/noun pair. (Panel 2/2)",
        "chinese": "图 18：左侧比较更长提前预测时间下的 EK100 表现，报告不同 Recall@k；右侧统计 EK100 验证集中的成功、失败组合。VNA 表示动词、名词、动作均预测正确，X 表示对应项错误。探针用三个独立分类器预测这些类别，因此动作类别预测可能与动词—名词组合不一致。（面板 2/2）",
        "evidenceKeys": [
          "S13.F18-panel-2"
        ],
        "imageSrc": "/papers/v-jepa-2/x25.webp",
        "imageAlt": "建筑的影响。"
      },
      {
        "id": "v-jepa-2-s13-ss2-sss0-px2-p1-1",
        "sectionId": "13-action-anticipation",
        "kind": "paragraph",
        "label": "Impact of Input Resolution.",
        "english": "We report in Figure˜17, the impact of input resolution and frame sampling parameters. In summary, V-JEPA 2 benefits from a longer context, a higher frame rate, and higher resolution, up to a point where the performance saturates or slightly decreases. The optimal performance is obtained by training with a 32-frames context length, a frame rate of 8 and a resolution of $384\\times 384$.",
        "chinese": "图 17 比较分辨率与帧采样设置。增加上下文长度、帧率和分辨率通常有益，但达到一定程度后表现会饱和或略降。最佳设置为训练时使用 32 帧上下文、8 fps 和 $384\\times384$ 分辨率。",
        "evidenceKeys": [
          "S13.SS2.SSS0.Px2.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s13-ss2-sss0-px3-p1-1",
        "sectionId": "13-action-anticipation",
        "kind": "paragraph",
        "label": "Longer-term Prediction.",
        "english": "We report in Figure˜18 (Left), the impact of predicting at a longer horizon, by varying the anticipation time between (1s, 2s, 4s, 10s). For each anticipation time, we report recall at several values (1, 5, 10, 20). The results show that the performance sharply decreases as the anticipation time increases, which is expected since forecasting the future in EK100 is a non-deterministic task.",
        "chinese": "图 18 左侧将提前预测时间设为 1s、2s、4s、10s，各报告 Recall@1、@5、@10、@20。提前时间越长，表现下降越明显；这符合预期，因为 EK100 中未来动作并非由当前观测唯一确定。",
        "evidenceKeys": [
          "S13.SS2.SSS0.Px3.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s13-ss2-sss0-px4-p1-1",
        "sectionId": "13-action-anticipation",
        "kind": "paragraph",
        "label": "Analysis of Failure Cases.",
        "english": "We report in Figure˜18 (Right), the distribution of failure and success prediction, on the EK100 validation set, between each configuration of success/failure for verb, noun, and action. The model performs very well, and the most represented configuration is, therefore, a full success across verb noun and action. The most represented failure configurations all include a failure to find the action.",
        "chinese": "图 18 右侧统计 EK100 验证集上动词、名词、动作各项正确或错误的组合。最常见的是三者都正确，反映模型整体表现较好；最常见的失败组合都包含动作类别预测错误。",
        "evidenceKeys": [
          "S13.SS2.SSS0.Px4.p1.1"
        ]
      }
    ]
  },
  {
    "id": "14-video-question-answering",
    "number": "14",
    "titleEn": "Video Question Answering",
    "titleZh": "14 视频问答",
    "collapsedByDefault": false,
    "blocks": [
      {
        "id": "v-jepa-2-s14-p1-1",
        "sectionId": "14-video-question-answering",
        "kind": "paragraph",
        "label": "14 Video Question Answering",
        "english": "In this section, we provide details on training a V-JEPA 2 Multi-modal Large Language Model (MLLM). We follow the LLaVA framework (Liu et al., 2024a) to train the MLLM, where the vision backbone is using V-JEPA 2, and the LLM backbone can be any off-the-shelf pretrained LLM, akin to the non-tokenized early fusion (Wadekar et al., 2024) setup. The MLLM ingests the output embeddings of the vision encoder, which are projected to the hidden dimension of the LLM backbone using a projector module. The projector is typically a 2-layer MLP. The MLLM is trained using a mix of image-text and video-text paired data, in a series of progressive training steps.",
        "chinese": "本节介绍如何训练采用 V-JEPA 2 的多模态大语言模型（MLLM）。框架沿用 LLaVA（Liu et al., 2024a）：视觉主干为 V-JEPA 2，语言主干可采用现成预训练 LLM，类似非离散 token 化的早期融合设置（Wadekar et al., 2024）。视觉编码器输出的嵌入经投影模块映射到 LLM 隐藏维度，通常用两层 MLP。随后混合图像—文本与视频—文本配对数据，分阶段逐步训练 MLLM。",
        "evidenceKeys": [
          "S14.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s14-p2-1",
        "sectionId": "14-video-question-answering",
        "kind": "paragraph",
        "label": "14 Video Question Answering",
        "english": "To understand the impact of data scale, we use a dataset of 88.5 million image-text and video-text pairs, similar to what was used for training PerceptionLM (Cho et al., 2025). As mentioned in Section˜7, we investigate two setups: (a) controlled, where we train with 18M image and video-text pairs, and we evaluate V-JEPA 2 and other encoders on the exact same MLLM training setup, and (b) scaling, where we take V-JEPA 2 VITg384 and use the full aligment dataset. To further test the versatility of V-JEPA 2, we use Qwen2-7B-Instruct (Yang et al., 2024a) as the language backbone for the controlled experiments, and Llama 3.1 8B Instruct (Grattafiori et al., 2024) for the scaling experiments. We describe the training details in the following sections.",
        "chinese": "为研究数据规模，使用类似 PerceptionLM（Cho et al., 2025）的 8850 万条图文与视频文本配对数据。第 7 节包含两种设置：（a）受控比较，仅用 18M 配对样本，让 V-JEPA 2 与其他编码器采用完全相同的 MLLM 训练设置；（b）规模扩展，用 V-JEPA 2 ViT-g384 和完整对齐数据。为进一步检验通用性，受控实验用 Qwen2-7B-Instruct（Yang et al., 2024a）作语言主干，扩展实验用 Llama 3.1 8B Instruct（Grattafiori et al., 2024）。下文给出细节。",
        "evidenceKeys": [
          "S14.p2.1"
        ]
      },
      {
        "id": "v-jepa-2-s14-ss1-p1-1",
        "sectionId": "14-video-question-answering",
        "kind": "paragraph",
        "label": "14.1 Processing Images and Videos as Input",
        "english": "Since video question answering uses video instead of image inputs, the number of output visual tokens increases significantly compared to image question answering. If required, we can use pooling methods to reduce the number of visual tokens. Popular pooling methods involve adaptive 2x2 pooling (Cho et al., 2025), Perceiver Sampler (Jaegle et al., 2021), Attentive Pooling (Bardes et al., 2024), etc.",
        "chinese": "视频问答的输入包含多帧，因此视觉 token 数显著多于图像问答。必要时可通过池化压缩，常见方法包括自适应 2×2 池化（Cho et al., 2025）、Perceiver Sampler（Jaegle et al., 2021）和注意力池化（Bardes et al., 2024）。",
        "evidenceKeys": [
          "S14.SS1.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s14-ss1-p2-4",
        "sectionId": "14-video-question-answering",
        "kind": "paragraph",
        "label": "14.1 Processing Images and Videos as Input",
        "english": "Additionally, we observed that learning from image-text pairs is crucial for high performance in downstream benchmarks. In order to train with images, a simple approach is to repeat the given image for $k$ frames, where $k$ is the maximum amount of frames supported by V-JEPA 2. However, during our initial experiments we find this strategy is ineffective at improving downstream performance, as it does not allow the model to extract fine-grained information. Therefore, we employ a modified Dynamic $S^{2}$ strategy introduced by Liu et al. (2024d) to provide V-JEPA 2 higher resolution granularity during training. This method adaptively processes an image at native resolution with different aspect ratios to preserve their original resolution, by creating a sequence of tiles of maximum size supported by V-JEPA 2. In case of videos, we choose to train with a fixed number of frames $f_{n}$, by balancing the number of visual tokens with compute budget.",
        "chinese": "图文配对学习对下游表现十分关键。用图像训练的一种简单办法，是把同一图像重复为 $k$ 帧，$k$ 为 V-JEPA 2 支持的最大帧数；但初期实验发现，这无法有效提取细粒度信息，因而没有改善下游表现。作者采用 Liu et al. (2024d) 的 Dynamic $S^{2}$ 改进版，为训练提供更高分辨率细节：按不同宽高比自适应处理原分辨率图像，将其切成模型支持的最大尺寸图块序列，尽量保留原图信息。视频则固定取 $f_{n}$ 帧，在 token 数与计算预算间折中。",
        "evidenceKeys": [
          "S14.SS1.p2.4"
        ]
      },
      {
        "id": "v-jepa-2-s14-ss2-sss0-px1-p1-1",
        "sectionId": "14-video-question-answering",
        "kind": "paragraph",
        "label": "Training details",
        "english": "For the controlled setup, we follow the LLaVA-NEXT framework (Liu et al., 2024a; Zhang et al., 2024b), where we use Qwen2-7B-Instruct (Yang et al., 2024a) as the base LLM for all encoders. To reduce the number of visual tokens, we employ an attentive pooler with a factor of 4-16, depending on the compute budget and the number of visual patches. See Table 21 for more details.",
        "chinese": "受控实验沿用 LLaVA-NEXT（Liu et al., 2024a; Zhang et al., 2024b），各视觉编码器均配 Qwen2-7B-Instruct（Yang et al., 2024a）。为减少视觉 token，根据预算和 patch 数采用 4–16 倍注意力池化，具体见表 21。",
        "evidenceKeys": [
          "S14.SS2.SSS0.Px1.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s14-ss2-sss0-px1-p2-1",
        "sectionId": "14-video-question-answering",
        "kind": "paragraph",
        "label": "Training details",
        "english": "Our training setup follows the LLaVA-NeXT pipeline (Li et al., 2024b), which consists of multiple staged training phases. Concretely, the stages consist of: a) aligning the attentive pooler with image captioning data (Stage 1), b) training the full model on high quality image captioning (Stage 1.5), and c) training the full model on large scale image question answering (Stage 2). We add an extra stage to train on large scale video captioning and question answering (Stage 3). We use 18 million image and video-text aligned data. The LLM progressively improves its understanding of the visual tokens after multiple staged training, with the biggest improvement in video question answering tasks after Stage 3.",
        "chinese": "训练沿用 LLaVA-NeXT（Li et al., 2024b）的多阶段流程：阶段 1 用图像描述数据对齐注意力池化器；阶段 1.5 用高质量图像描述训练完整模型；阶段 2 用大规模图像问答训练完整模型；再新增阶段 3，用大规模视频描述和问答继续训练。共使用 1800 万条图像与视频文本对齐数据。多阶段训练使 LLM 逐步理解视觉 token，视频问答的最大提升出现在阶段 3 之后。",
        "evidenceKeys": [
          "S14.SS2.SSS0.Px1.p2.1"
        ]
      },
      {
        "id": "v-jepa-2-s14-ss2-sss0-px1-p3-1",
        "sectionId": "14-video-question-answering",
        "kind": "paragraph",
        "label": "Training details",
        "english": "We explore frozen and finetuned encoder alignment setups. In both setups, full parameters of the LLM and projector are trained, and in the latter, the V-JEPA 2 parameters are additionally unfrozen. To reduce the number of visual tokens and keep the MLLM context length fixed, we employ an attentive pooler as the projector to reduce the number of visual tokens by a factor of 4, unless otherwise denoted. The implementation used for this controlled study is based on the Llava-NEXT codebase,444https://github.com/LLaVA-VL/LLaVA-NeXT and uses Pytorch 2.5.1, Transformers 4.46.0, Flash attention 2 and DeepSpeed 0.14.4 for model implementation, faster training and multi-gpu model sharding respectively. We train all models using 128 H100 GPUs with an effective batch size of 256 across all stages. We perform all optimizations using AdamW with 0 weight decay. For Stages 1 and 1.5, we use learning rate of 1e-5 with cosine decay, and for Stages 2 and 3 we use constant learning rate of 5e-6. In all stages, we use linear warmup for the first 3% of training steps. Training hyperparameters are listed in Table 21.",
        "chinese": "作者分别测试冻结视觉编码器与微调视觉编码器两种对齐设置。两者均训练 LLM 和投影层的全部参数；后者还解冻 V-JEPA 2。为控制视觉 token 数和固定 MLLM 上下文长度，默认采用注意力池化投影，将 token 数压缩四倍，另有说明者除外。实现基于 LLaVA-NeXT（https://github.com/LLaVA-VL/LLaVA-NeXT），使用 PyTorch 2.5.1、Transformers 4.46.0、Flash Attention 2、DeepSpeed 0.14.4，分别支持模型实现、加速训练与多 GPU 分片。所有模型使用 128 张 H100，各阶段有效批大小为 256；优化器为 AdamW，权重衰减为 0。阶段 1、1.5 的学习率为 1e-5 并余弦衰减，阶段 2、3 固定为 5e-6；各阶段前 3% 步数线性预热。超参数见表 21。",
        "evidenceKeys": [
          "S14.SS2.SSS0.Px1.p3.1"
        ]
      },
      {
        "id": "v-jepa-2-s14-ss2-sss0-px2-p1-1",
        "sectionId": "14-video-question-answering",
        "kind": "paragraph",
        "label": "Baselines.",
        "english": "To assess the ability of V-JEPA 2 to capture spatiotemporal details for VidQA, we compare to leading off-shelf image encoders. Specifically, we compare to DINOv2 (Oquab et al., 2023), SigLIP2 (Tschannen et al., 2025), and Perception Encoder (Bolya et al., 2025). DINOv2 is a self-supervised image model, while SigLIP2 and Perception Encoder are both trained with language supervision using noisy image-text captions. We apply all image encoders at their “native” pretrained resolution, which is 518px, 384px, and 448px, respectively, on each video frame independently.",
        "chinese": "基线包括现成图像编码器 DINOv2（Oquab et al., 2023）、SigLIP2（Tschannen et al., 2025）和 Perception Encoder（Bolya et al., 2025），用于比较视频问答中的时空细节提取能力。DINOv2 为自监督图像模型；后两者利用带噪图文描述进行语言监督训练。各编码器以原生预训练分辨率独立处理视频帧，分别为 518px、384px、448px。",
        "evidenceKeys": [
          "S14.SS2.SSS0.Px2.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s14-ss2-sss0-px2-p2-1",
        "sectionId": "14-video-question-answering",
        "kind": "paragraph",
        "label": "Baselines.",
        "english": "We keep all training details the same, except that we increase the attentive pooling ratio to 16 to keep the number of image tokens relatively similar among models. See Table 21 for details.",
        "chinese": "其余训练细节一致，只将注意力池化比例增至 16，使各模型图像 token 数保持相对接近。具体见表 21。",
        "evidenceKeys": [
          "S14.SS2.SSS0.Px2.p2.1"
        ]
      },
      {
        "id": "v-jepa-2-s14-t21",
        "sectionId": "14-video-question-answering",
        "kind": "table",
        "label": "Baselines.",
        "english": "**Table 21: Hyperparameters for controlled comparison of vision encoders. We use each vision encoder with its native pretrained input resolution.**\n\n| Model | Pooling Ratio | Vision Tokens | BS | Stage 1/1.5 LR | Stage 2/3 LR | WD | Frames |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n| V-JEPA 2 ViT-L256 | 4 | 4096 | 256 | 1e-5 | 5e-6 | 0.0 | 128 |\n| V-JEPA 2 ViT-H256 | 4 | 4096 | 256 |  |  |  |  |\n| V-JEPA 2 ViT-g256 | 4 | 4096 | 256 |  |  |  |  |\n| V-JEPA 2 ViT-g384 | 4 | 9216 | 256 |  |  |  |  |\n| V-JEPA 2 ViT-g512 | 8 | 8192 | 256 |  |  |  |  |\n| DINOv2518 | 16 | 10952 | 256 | 1e-5 | 5e-6 | 0.0 | 128 |\n| SigLIP2384 | 16 | 5832 | 256 |  |  |  |  |\n| PE448 | 16 | 8192 | 256 |  |  |  |  |",
        "chinese": "**表 21：视觉编码器受控比较的超参数。各编码器使用原生预训练分辨率；空白项沿用原表的合并单元格布局。BS 为批大小，LR 为学习率，WD 为权重衰减。**\n\n| 模型 | 池化比例 | 视觉 token 数 | BS | 阶段 1/1.5 LR | 阶段 2/3 LR | WD | 帧数 |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n| V-JEPA 2 ViT-L256 | 4 | 4096 | 256 | 1e-5 | 5e-6 | 0.0 | 128 |\n| V-JEPA 2 ViT-H256 | 4 | 4096 | 256 | | | | |\n| V-JEPA 2 ViT-g256 | 4 | 4096 | 256 | | | | |\n| V-JEPA 2 ViT-g384 | 4 | 9216 | 256 | | | | |\n| V-JEPA 2 ViT-g512 | 8 | 8192 | 256 | | | | |\n| DINOv2518 | 16 | 10952 | 256 | 1e-5 | 5e-6 | 0.0 | 128 |\n| SigLIP2384 | 16 | 5832 | 256 | | | | |\n| PE448 | 16 | 8192 | 256 | | | | |",
        "evidenceKeys": [
          "S14.T21"
        ]
      },
      {
        "id": "v-jepa-2-s14-f19",
        "sectionId": "14-video-question-answering",
        "kind": "figure-caption",
        "label": "Baselines.",
        "english": "Figure 19: Impact of video duration during visual instruction tuning. We investigate the effect of increasing the number of frames during visual instruction tuning, where the encoder is frozen. We observe that with more frames, V-JEPA 2 performance linearly increases compared to DINOv2, an SSL-based image encoder, showing the potential of V-JEPA 2 to scale with more frames.",
        "chinese": "图 19：视觉指令微调时视频长度的影响。固定视觉编码器，增加训练帧数。与自监督图像编码器 DINOv2 相比，V-JEPA 2 的表现随帧数增加近似线性提高，显示出利用更多视频帧继续扩展的潜力。",
        "evidenceKeys": [
          "S14.F19"
        ],
        "imageSrc": "/papers/v-jepa-2/x26.webp",
        "imageAlt": "基线。"
      },
      {
        "id": "v-jepa-2-s14-ss2-sss0-px3-p1-1",
        "sectionId": "14-video-question-answering",
        "kind": "paragraph",
        "label": "Evaluation.",
        "english": "To evaluate the capability of V-JEPA 2 to understand the world through video and language, we select popular evaluation datasets built to test spatio-temporal reasoning abilities. To ensure reproducible evaluation, we utilize the lmms-eval library (Li et al., 2024a; Zhang et al., 2024a) to conduct our experiments, which is a vision model enabled fork of llm-eval-harness (Gao et al., 2024), which is a popular evaluation library for evaluating LLMs on text-based tasks. In the controlled setup, for each model and dataset, we evaluate by using uniform frame sampling mechanism, and choosing 128 frames during inference. For PerceptionTest, we further train the model for 5 epochs on the training set.",
        "chinese": "评测选用考察时空推理的常用数据集，检验 V-JEPA 2 通过视频与语言理解世界的能力。为保证可复现性，采用 lmms-eval（Li et al., 2024a; Zhang et al., 2024a），这是由文本 LLM 评测库 llm-eval-harness（Gao et al., 2024）扩展出的视觉模型版本。受控设置中，各模型和数据集统一均匀采样，推理使用 128 帧。PerceptionTest 额外在其训练集微调 5 个 epoch。",
        "evidenceKeys": [
          "S14.SS2.SSS0.Px3.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s14-ss2-sss0-px4-p1-1",
        "sectionId": "14-video-question-answering",
        "kind": "paragraph",
        "label": "Impact of Video Duration",
        "english": "In the controlled setup, we perform an analysis to understand V-JEPA 2’s capability in long-form video understanding. We train MLLMs on V-JEPA 2 and DINOv2, keeping the encoders frozen, and by increasing the number of frames we use in training and testing. We observe as the number of frames increases, performance on downstream tasks linearly improves for V-JEPA 2, but decreases and remains flat in case of DINOv2 (Figure 19). This highlights the potential of video encoders such as V-JEPA 2 to understand long-form videos with natural language queries, via adapting an LLM using V-JEPA 2 as the visual encoder.",
        "chinese": "受控实验还考察长视频理解：分别以冻结的 V-JEPA 2 和 DINOv2 为视觉编码器训练 MLLM，逐步增加训练及测试帧数。图 19 显示，V-JEPA 2 的下游表现近似线性提高，DINOv2 则下降后趋于平稳。这说明将 V-JEPA 2 用作视觉编码器来适配 LLM，有望改善针对自然语言查询的长视频理解。",
        "evidenceKeys": [
          "S14.SS2.SSS0.Px4.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s14-t22",
        "sectionId": "14-video-question-answering",
        "kind": "table",
        "label": "14.3 Data scaling setup",
        "english": "**Table 22: Data scaling training parameters.**\n\n| Parameter | Values |\n| --- | --- |\n| Common parameters |  |\n| Crop Size | 384 |\n| Video Frames per Second | 1 |\n| Sampling method | Uniform |\n| Seed | 777 |\n| Stage 1 |  |\n| Steps | 16000 |\n| Warmup Steps | 96 |\n| Batch Size (global) | 128 |\n| Learning Rate | 1e-4 |\n| Final Learning Rate | 1e-6 |\n| Weight Decay | 0.05 |\n| Max sequence length | 1920 |\n| Stage 2 |  |\n| Steps | 35000 |\n| Warmup Steps | 200 |\n| Batch Size (global) | 2048 |\n| Learning Rate | 4e-5 |\n| Final Learning Rate | 4e-7 |\n| Weight Decay | 0.05 |\n| Max sequence length | 6400 |\n| Image tiles | 16 |\n| Video frames | 16 |\n| Stage 3 |  |\n| Steps | 28000 |\n| Early stopping step | 22000 |\n| Warmup Steps | 168 |\n| Batch Size (global) | 2048 |\n| Learning Rate | 1e-5 |\n| Final Learning Rate | 1e-7 |\n| Weight Decay | 0.05 |\n| Max sequence length | 12800 |\n| Image tiles | 32 |\n| Video frames | 32 |",
        "chinese": "**表 22：数据规模扩展实验的训练参数。**\n\n| 参数 | 数值 |\n| --- | --- |\n| 共同参数 | |\n| 裁剪尺寸 | 384 |\n| 视频帧率 | 1 |\n| 采样方式 | 均匀 |\n| 随机种子 | 777 |\n| 阶段 1 | |\n| 步数 | 16000 |\n| 预热步数 | 96 |\n| 全局批大小 | 128 |\n| 学习率 | 1e-4 |\n| 最终学习率 | 1e-6 |\n| 权重衰减 | 0.05 |\n| 最大序列长度 | 1920 |\n| 阶段 2 | |\n| 步数 | 35000 |\n| 预热步数 | 200 |\n| 全局批大小 | 2048 |\n| 学习率 | 4e-5 |\n| 最终学习率 | 4e-7 |\n| 权重衰减 | 0.05 |\n| 最大序列长度 | 6400 |\n| 图像图块数 | 16 |\n| 视频帧数 | 16 |\n| 阶段 3 | |\n| 步数 | 28000 |\n| 提前停止步数 | 22000 |\n| 预热步数 | 168 |\n| 全局批大小 | 2048 |\n| 学习率 | 1e-5 |\n| 最终学习率 | 1e-7 |\n| 权重衰减 | 0.05 |\n| 最大序列长度 | 12800 |\n| 图像图块数 | 32 |\n| 视频帧数 | 32 |\n\n译注：表中阶段 3 批大小为 2048，而相邻正文写 1024，原文存在差异。",
        "evidenceKeys": [
          "S14.T22"
        ]
      },
      {
        "id": "v-jepa-2-s14-ss3-sss0-px1-p1-1",
        "sectionId": "14-video-question-answering",
        "kind": "paragraph",
        "label": "Training details",
        "english": "In the scaling setup, we follow the framework used by Cho et al. (2025) to train Perception LM 8B. Specifically, we utilize the released codebase, which is based on Lingua (Videau et al., 2024). We modify the code to use V-JEPA 2 encoder, and we use the Llama 3.1 8B Instruct (Grattafiori et al., 2024) as the backbone LLM. Unlike Cho et al. (2025), we do not use pooling, instead we train V-JEPA 2 VIT-g384 using MLP projector, leading to 288 tokens per frame. The training setup also consists of three progressive stages: Stage 1: aligning the MLP pooler with image captioning data; Stage 2: training on a mix of image-text captioning and QA data; and Stage 3) training on video-text captioning and QA data. We scale up the data size to 88.5 million samples. Our setup uses Pytorch 2.5.1 and Perception LM training code,555https://github.com/facebookresearch/perception_models modified with the V-JEPA 2 encoder. We train on 512 H100 GPUs for Stage 2 and Stage 3 with a global batch size of 2048 and 1024 respectively. Details of the training hyperparams are provided in Table 22.",
        "chinese": "扩展实验采用 Cho et al. (2025) 训练 Perception LM 8B 的框架，代码基于 Lingua（Videau et al., 2024），改用 V-JEPA 2 编码器及 Llama 3.1 8B Instruct（Grattafiori et al., 2024）。与 Cho et al. (2025) 不同，作者不池化，而使用 MLP 投影训练 V-JEPA 2 ViT-g384，每帧产生 288 个 token。训练分三阶段：阶段 1 用图像描述对齐 MLP；阶段 2 用图文描述与问答混合数据；阶段 3 用视频描述与问答。数据增至 8850 万样本。实现使用 PyTorch 2.5.1 和经修改的 Perception LM 代码（https://github.com/facebookresearch/perception_models）。阶段 2、3 在 512 张 H100 上训练，正文给出的全局批大小分别为 2048、1024。超参数见表 22。\n\n译注：原文前面称不采用池化，后面又称 MLP pooler；此处统一指对应的 MLP 对齐模块，不据此引入额外池化操作。",
        "evidenceKeys": [
          "S14.SS3.SSS0.Px1.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s14-ss3-sss0-px2-p1-1",
        "sectionId": "14-video-question-answering",
        "kind": "paragraph",
        "label": "Baselines.",
        "english": "We compare our scaling runs with Qwen2VL (Wang et al., 2024a), Qwen2.5VL (Qwen Team et al., 2025), InternVL-2.5 (Chen et al., 2024), and PerceptionLM 8B (Cho et al., 2025). Baseline numbers are sourced directly from the papers, except for MVP which we run ourselves.",
        "chinese": "规模扩展实验比较 Qwen2VL（Wang et al., 2024a）、Qwen2.5VL（Qwen Team et al., 2025）、InternVL-2.5（Chen et al., 2024）和 PerceptionLM 8B（Cho et al., 2025）。除 MVP 由作者自行运行外，其余基线数值直接取自各论文。",
        "evidenceKeys": [
          "S14.SS3.SSS0.Px2.p1.1"
        ]
      },
      {
        "id": "v-jepa-2-s14-ss3-sss0-px3-p1-1",
        "sectionId": "14-video-question-answering",
        "kind": "paragraph",
        "label": "Evaluation.",
        "english": "We follow similar evaluation pipeline as reported in the controlled setup, using lmms-eval library. We report our model evaluations on 32 frames.",
        "chinese": "评测流程与受控设置相近，同样使用 lmms-eval；此处模型评测输入为 32 帧。",
        "evidenceKeys": [
          "S14.SS3.SSS0.Px3.p1.1"
        ]
      }
    ]
  }
];
