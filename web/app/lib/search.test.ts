import { describe, expect, it } from "vitest";
import type { PaperSection } from "./content";
import { buildSearchIndex, searchRecords } from "./search";

describe("local search", () => {
  // Use our own fixture, not a third-party full text unavailable in this public edition.
  const paperSections: PaperSection[] = [{ id: "sample", titleEn: "Sample", titleZh: "示例", collapsedByDefault: false,
    blocks: [{ id: "sample-1", sectionId: "sample", kind: "paragraph", english: "An episodic memory example.", chinese: "一个情景记忆示例。" }] }];
  const reportMarkdown = "## 9. 真正的贡献\n\n这是一段测试报告。";
  const records = buildSearchIndex(paperSections, reportMarkdown);

  it("finds all three content surfaces", () => {
    expect(searchRecords(records, "episodic")[0].source).toBe("paper-en");
    expect(searchRecords(records, "情景记忆")[0].source).toBe("paper-zh");
    expect(searchRecords(records, "真正的贡献")[0].source).toBe("report");
  });

  it("returns no results for whitespace", () => {
    expect(searchRecords(records, "   ")).toEqual([]);
  });
});
