import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("PaperImageLightbox", () => {
  it("exposes an accessible dialog with zoom and close controls", () => {
    const source = readFileSync("app/components/PaperImageLightbox.tsx", "utf8");
    expect(source).toContain('role="dialog"');
    expect(source).toContain('aria-modal="true"');
    expect(source).toContain('aria-label="放大"');
    expect(source).toContain('aria-label="缩小"');
    expect(source).toContain('aria-label="关闭图片"');
  });
});
