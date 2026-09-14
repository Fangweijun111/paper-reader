import { describe, expect, it } from "vitest";
import { defaultUrlTransform } from "react-markdown";
import { withBasePath } from "./site-url";

describe("project Pages URLs", () => {
  it("prefixes root-relative readers, images and PDFs", () => {
    for (const url of ["/", "/papers/openwam", "/papers/openwam.pdf", "/papers/openwam/assets/fig1.png"]) {
      expect(withBasePath(url, "/paper-reader")).toBe("/paper-reader" + url);
    }
  });
  it("leaves already-prefixed, external and fragment URLs intact", () => {
    for (const url of ["/paper-reader", "/paper-reader/papers/openwam", "/paper-reader?q=1", "/paper-reader#x", "https://arxiv.org/abs/2609.07398", "//example.org/file", "#report-5", "assets/image.png"]) {
      expect(withBasePath(url, "/paper-reader/")).toBe(url);
    }
    expect(withBasePath("/papers/openwam", "")).toBe("/papers/openwam");
  });
  it("retains react-markdown URL sanitization before prefixing", () => {
    expect(withBasePath(defaultUrlTransform("javascript:alert(1)"), "/paper-reader")).toBe("");
    expect(withBasePath(defaultUrlTransform("/papers/openwam/assets/fig1.png"), "/paper-reader")).toBe("/paper-reader/papers/openwam/assets/fig1.png");
  });
});
