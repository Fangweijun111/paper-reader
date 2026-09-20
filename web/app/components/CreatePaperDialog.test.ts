import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("shared create-paper dialog", () => {
  it("requires a collection in the ingestion prompt", () => {
    const source = readFileSync(
      "app/components/CreatePaperDialog.tsx",
      "utf8",
    );

    expect(source).toContain("所属主题");
    expect(source).toContain("uncategorized");
    expect(source).toContain("collection.slug");
    expect(source).toContain("clipboard.writeText(prompt)");
  });
});
