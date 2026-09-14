import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { zettaPaperSections } from "../data/papers/zetta/paper";
import { zettaEvidenceTargets, zettaReportMarkdown } from "../data/papers/zetta/report";
import { libraryPapers } from "../data/library";
import { validatePaperSections } from "./content";
import { paperMathOptions, rehypePaperMathCompatibility } from "./math-options";

const blocks = zettaPaperSections.flatMap((section) => section.blocks);
const publicPath = (relative: string) => join(process.cwd(), "public", relative.replace(/^\//, ""));

describe("Zetta full-paper reading package", () => {
  it("keeps complete source coverage, including appendices and explicit bibliography", () => {
    expect(validatePaperSections(zettaPaperSections)).toEqual([]);
    expect(zettaPaperSections).toHaveLength(13);
    expect(blocks).toHaveLength(435);
    const source = JSON.parse(readFileSync(publicPath("papers/zetta/source_map.json"), "utf8")) as {
      blocks: { id: string; english: string; translation: string; sourceUrl: string }[];
    };
    expect(source.blocks).toHaveLength(blocks.length);
    for (const original of source.blocks) {
      const block = blocks.find((item) => item.id === `zetta-${original.id.toLowerCase()}`);
      expect(block?.english, original.id).toBe(original.english);
      expect(block?.chinese, original.id).toBe(original.translation);
      expect(original.sourceUrl).toMatch(/^https:\/\/arxiv.org\/html\/2608\.16590v1#/);
    }
    expect(blocks.filter((b) => b.id.startsWith("zetta-r"))).toHaveLength(126);
    expect(blocks.find((b) => b.id === "zetta-r001")?.chinese).toContain("保留原文");
    expect(blocks.find((b) => b.id === "zetta-s185")?.chinese).toContain("物体");
  });

  it("includes every original figure, table, numbered equation and algorithm", () => {
    expect(blocks.filter((b) => b.kind === "figure-caption")).toHaveLength(15);
    expect(blocks.filter((b) => b.kind === "table")).toHaveLength(5);
    expect(blocks.filter((b) => b.kind === "equation")).toHaveLength(16);
    expect(blocks.filter((b) => b.kind === "algorithm")).toHaveLength(3);
    for (const block of blocks.filter((b) => b.imageSrc)) {
      expect(existsSync(publicPath(block.imageSrc!)), block.id).toBe(true);
    }
    expect(blocks.filter((b) => b.imageSrc)).toHaveLength(20);
    expect(blocks.find((b) => b.id === "zetta-a002")?.chinese).toContain("18");
    expect(blocks.find((b) => b.id === "zetta-a003")?.chinese).toContain("20");
    for (const block of blocks.filter((b) => b.kind === "equation")) {
      expect(block.chinese, block.id).toBe(block.english);
    }
  });

  it("provides thirteen deep chapters, five proposals, ten answers and grounded mentor notes", () => {
    expect(zettaReportMarkdown.match(/^## \d+\./gm)).toHaveLength(13);
    expect(zettaReportMarkdown.match(/^### 12\.\d+/gm)).toHaveLength(5);
    const questions = zettaReportMarkdown.split("## 13.")[1];
    expect(questions.match(/^\d+\. \*\*/gm)).toHaveLength(10);
    expect(questions.match(/参考答案：/g)).toHaveLength(10);
    expect(zettaReportMarkdown.match(/> \*\*导师解读\*\*：/g)).toHaveLength(46);
    for (const section of zettaReportMarkdown.split(/^### /m).slice(1)) {
      expect(section, section.slice(0, 65)).toContain("> **导师解读**：");
    }
    for (const id of Object.values(zettaEvidenceTargets)) {
      expect(blocks.some((b) => b.id === id), id).toBe(true);
    }
    for (const match of zettaReportMarkdown.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
      expect(existsSync(publicPath(match[1])), match[1]).toBe(true);
    }
    for (const caution of ["71.13%", "Projected transfer checkpoint", "0/5", "不确定", "8×A100"]) {
      expect(zettaReportMarkdown).toContain(caution);
    }
  });

  it("renders all bilingual content and the report with the same Markdown/math pipeline as the reader", () => {
    const fragments = [...blocks.flatMap((b) => [b.english, b.chinese]), zettaReportMarkdown];
    for (const [index, children] of fragments.entries()) {
      const rendered = renderToStaticMarkup(createElement(ReactMarkdown, {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [rehypePaperMathCompatibility, [rehypeKatex, paperMathOptions]],
      }, children));
      expect(rendered, `fragment ${index}`).not.toContain('class="katex-error"');
      expect(rendered, `fragment ${index}`).not.toContain("ParseError");
    }
  }, 30000);

  it("registers verified preprint metadata, official code and downloadable companions", () => {
    const paper = libraryPapers.find((p) => p.slug === "zetta");
    expect(paper).toMatchObject({
      collection: "world-models", status: "completed", progress: 100,
      href: "/papers/zetta", codeUrl: "https://github.com/air-embodied-brain/Zetta-Embodiment",
      publication: { kind: "preprint", status: "preprint", venue: "arXiv", year: 2026 },
    });
    for (const file of ["papers/zetta.pdf", "papers/zetta/paper.md", "papers/zetta/report.md", "papers/zetta/source_map.json", "papers/zetta/translation_notes.md"]) {
      expect(existsSync(publicPath(file)), file).toBe(true);
    }
  });
});
