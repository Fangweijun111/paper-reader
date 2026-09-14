import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { openwamPaperSections } from "../data/papers/openwam/paper";
import { openwamEvidenceTargets, openwamReportMarkdown } from "../data/papers/openwam/report";
import { libraryPapers } from "../data/library";
import { validatePaperSections } from "./content";
import { paperMathOptions, rehypePaperMathCompatibility } from "./math-options";

const blocks = openwamPaperSections.flatMap(s => s.blocks);
const asset = (p: string) => join(process.cwd(), "public", p.replace(/^\//, ""));

describe("OpenWAM full-paper package", () => {
  it("covers the full body, appendices and bibliography with stable source alignment", () => {
    expect(validatePaperSections(openwamPaperSections)).toEqual([]);
    expect(openwamPaperSections).toHaveLength(14);
    expect(blocks).toHaveLength(411);
    const source = JSON.parse(readFileSync(asset("papers/openwam/source_map.json"), "utf8")) as {
      blocks: {id: string; english: string; translation: string; sourceUrl: string}[];
    };
    expect(source.blocks).toHaveLength(411);
    for (const b of source.blocks) {
      const actual = blocks.find(x => x.id === `openwam-${b.id.toLowerCase()}`);
      expect(actual?.english, b.id).toBe(b.english);
      expect(actual?.chinese, b.id).toBe(b.translation);
      expect(b.sourceUrl).toMatch(/^https:\/\/arxiv.org\/pdf\/2609\.07398v1/);
    }
    expect(blocks.filter(b => b.id.startsWith("openwam-r"))).toHaveLength(108);
    expect(blocks.find(b => b.id === "openwam-s179")?.chinese).toContain("LIBERO-Plus");
  });

  it("contains all original figures, tables and equations without missing assets", () => {
    expect(blocks.filter(b => b.kind === "figure-caption")).toHaveLength(21);
    expect(blocks.filter(b => b.kind === "table")).toHaveLength(20);
    expect(blocks.filter(b => b.kind === "equation")).toHaveLength(4);
    for (const b of blocks.filter(b => b.imageSrc)) {
      expect(existsSync(asset(b.imageSrc!)), b.id).toBe(true);
      expect(statSync(asset(b.imageSrc!)).size).toBeLessThan(25 * 1024 * 1024);
    }
    expect(blocks.filter(b => b.imageSrc)).toHaveLength(41);
    for (const b of blocks.filter(b => b.kind === "equation")) expect(b.chinese).toBe(b.english);
    expect(blocks.find(b => b.id === "openwam-t004")?.english).toContain("in-the-wild human manipulation");
    expect(blocks.find(b => b.id === "openwam-t007")?.english).toContain("53.0 / 50.0");
    expect(blocks.find(b => b.id === "openwam-t008")?.english).toContain("55/60");
    expect(blocks.find(b => b.id === "openwam-s172")?.english).toContain("S_{\\mathrm{final}}");
    expect(blocks.find(b => b.id === "openwam-s173")?.english).toContain("S_{\\mathrm{process}}");
  });

  it("provides 13 mentor chapters, 5 proposals, 10 answers and all 21 report figures", () => {
    expect(openwamReportMarkdown.match(/^## \d+\./gm)).toHaveLength(13);
    expect(openwamReportMarkdown.match(/^### 12\.\d+/gm)).toHaveLength(5);
    const quiz = openwamReportMarkdown.split("## 13.")[1];
    expect(quiz.match(/^### 题\d+/gm)).toHaveLength(10);
    expect(quiz.match(/参考答案：/g)).toHaveLength(10);
    for (const subsection of openwamReportMarkdown.split(/^### /m).slice(1).filter(s => !s.startsWith("题"))) {
      expect(subsection, subsection.slice(0, 50)).toContain("> **导师解读**：");
    }
    for (let i = 1; i <= 21; i++) expect(openwamReportMarkdown).toContain(`/assets/fig${i}.png`);
    for (const id of Object.values(openwamEvidenceTargets)) expect(blocks.some(b => b.id === id), id).toBe(true);
    for (const image of openwamReportMarkdown.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) expect(existsSync(asset(image[1]))).toBe(true);
    for (const caution of ["128", "H200", "LIBERO-Plus", "69.2", "26.42", "不确定", "8×A100", "PhysBrain"]) expect(openwamReportMarkdown).toContain(caution);
  });

  it("renders every bilingual block and report formula through the real Markdown pipeline", () => {
    for (const [id, children] of [...blocks.flatMap(b => [[b.id+"-en", b.english], [b.id+"-zh", b.chinese]]), ["report", openwamReportMarkdown]]) {
      const html = renderToStaticMarkup(createElement(ReactMarkdown, {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [rehypePaperMathCompatibility, [rehypeKatex, paperMathOptions]],
      }, children));
      expect(html, id).not.toContain('class="katex-error"');
      expect(html, id).not.toContain("ParseError");
      if (children.includes("$$")) expect(html, id).toContain('class="katex-display"');
      expect(children, id).not.toContain("OPENWAMTABLE");
      expect(children, id).not.toContain("cccccccc");
    }
  }, 30000);

  it("registers the official preprint, code and complete downloadable companions", () => {
    expect(libraryPapers.find(p => p.slug === "openwam")).toMatchObject({
      collection: "world-models", status: "completed", progress: 100, href: "/papers/openwam",
      codeUrl: "https://github.com/OpenWAM-Official/OpenWAM",
      publication: {kind: "preprint", venue: "arXiv", year: 2026},
    });
    for (const p of ["papers/openwam.pdf", "papers/openwam/paper.md", "papers/openwam/report.md", "papers/openwam/translation_notes.md"]) expect(existsSync(asset(p))).toBe(true);
    expect(statSync(asset("papers/openwam.pdf")).size).toBeLessThan(25 * 1024 * 1024);
  });
});
