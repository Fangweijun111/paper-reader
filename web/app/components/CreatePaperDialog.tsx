"use client";

import { useEffect, useState } from "react";

export const CREATE_PAPER_PROMPT =
  "请把这篇 PDF 加入论文精读库，并明确登记所属主题；如果无法判断，使用 uncategorized，不要默认放入世界模型。先登记为‘精读中’，完成中英对照和 13 章精读报告后发布，并把状态更新为‘已完成’。";

export function CreatePaperDialog({ onClose }: { onClose: () => void }) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(CREATE_PAPER_PROMPT);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  };

  return (
    <div
      aria-label="创建新论文"
      aria-modal="true"
      className="create-paper-overlay"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
      role="dialog"
    >
      <section className="create-paper-dialog">
        <button
          aria-label="关闭创建论文说明"
          className="create-paper-dialog__close"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
        <span className="library-eyebrow">CODEX-ASSISTED WORKFLOW</span>
        <h2>把下一篇论文带回来</h2>
        <p className="create-paper-dialog__lead">
          这个论文库不额外调用模型 API。你只需回到当前 Codex
          聊天上传 PDF，我会完成解析、逐段翻译、13 章精读报告和网站发布。
        </p>

        <ol className="create-paper-steps">
          <li>
            <span>01</span>
            <div>
              <strong>回到当前聊天</strong>
              <p>继续使用创建这个论文库的 Codex 任务。</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <strong>上传论文 PDF</strong>
              <p>同时粘贴下面的标准创建指令并指定所属主题。</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <strong>等待精读发布</strong>
              <p>论文会进入对应主题，卡片从“精读中”更新为“已完成”。</p>
            </div>
          </li>
        </ol>

        <div className="create-paper-prompt">
          <span>复制给 Codex</span>
          <p>{CREATE_PAPER_PROMPT}</p>
          <button onClick={copyPrompt} type="button">
            {copyState === "copied"
              ? "已复制 ✓"
              : copyState === "failed"
                ? "请手动复制"
                : "复制创建指令"}
          </button>
        </div>
      </section>
    </div>
  );
}
