import type { KatexOptions } from "katex";

// Paper sources use these common LaTeX package commands. Keep source notation
// intact and provide equivalent display commands supported by KaTeX.
export const paperMathOptions: KatexOptions = {
  macros: {
    "\\mathds": "\\mathbb{#1}",
    "\\nicefrac": "\\frac{#1}{#2}",
    "\\textsc": "\\text{#1}",
    "\\midz": "\\mid z",
    "\\mido": "\\mid o",
    "\\mids": "\\mid s",
  },
};

export function normalizePaperMath(formula: string): string {
  return formula.replace(
    /\\color\[(rgb|RGB)\]\{([\d.,\s]+)\}/g,
    (original, mode: string, components: string) => {
      const values = components.split(",").map(Number);
      const maximum = mode === "rgb" ? 1 : 255;
      if (values.length !== 3 || values.some((v) => !Number.isFinite(v) || v < 0 || v > maximum)) {
        return original;
      }
      const hex = values.map((v) => Math.round(v * 255 / maximum).toString(16).padStart(2, "0")).join("");
      return "\\color{#" + hex + "}";
    },
  );
}

type MathHtmlNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: { className?: unknown };
  children?: MathHtmlNode[];
};

// Only transform math-code nodes emitted by remark-math. Normal prose, source
// code, numbers and the stored bilingual source strings remain untouched.
export function rehypePaperMathCompatibility() {
  return (tree: MathHtmlNode) => {
    function walk(node: MathHtmlNode) {
      const classes = node.properties?.className;
      if (node.type === "element" && node.tagName === "code" &&
          Array.isArray(classes) && classes.includes("language-math")) {
        for (const child of node.children ?? []) {
          if (child.type === "text" && child.value) child.value = normalizePaperMath(child.value);
        }
      }
      for (const child of node.children ?? []) walk(child);
    }
    walk(tree);
  };
}
