import { describe, expect, it } from "vitest";
import katex from "katex";
import { normalizePaperMath, paperMathOptions, rehypePaperMathCompatibility } from "./math-options";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

describe("source-paper LaTeX compatibility", () => {
  it.each([
    "\\mathds{1}_{SCN_x=GCN_x}",
    "\\mathcal{V}(o_t,\\ell)-\\nicefrac{{t}}{{T}}",
    "o\\in\\{\\textsc{Add},\\textsc{Update},\\textsc{Upvote},\\textsc{Downvote}\\}",
    "p(o,z)=\\prod_{t=1}^T p(z_t\\midz_{t-1})p(o_t\\midz_t)",
    "p(s_t\\mido_t)p(o_t\\mids_t)",
  ])("renders published notation without rewriting it: %s", (formula) => {
    const html = katex.renderToString(formula, {
      ...paperMathOptions,
      throwOnError: true,
    });
    expect(html).toContain('class="katex"');
    expect(html).not.toContain("katex-error");
  });
  it("renders the original RGB-colored RoboTwin result through the reader Markdown pipeline", () => {
    const formula = "\\textbf{43.0\\%}_{{\\color[rgb]{0,0.88,0}+13.5\\%}}";
    expect(normalizePaperMath(formula)).toContain("\\color{#00e000}");
    const html = renderToStaticMarkup(createElement(ReactMarkdown, {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypePaperMathCompatibility, [rehypeKatex, paperMathOptions]],
    }, "$" + formula + "$"));
    expect(html).toContain('class="katex"');
    expect(html).not.toContain("katex-error");
  });
});
