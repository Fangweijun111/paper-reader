import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("collection paper shelf", () => {
  it("uses framework links for the collection index", () => {
    const source = readFileSync("app/components/PaperLibraryApp.tsx", "utf8");

    expect(source).toContain('import Link from "next/link"');
    expect(source).not.toContain('<a className="library-brand" href="/">');
  });

  it("keeps the bilingual brand lockup on one line", () => {
    const styles = readFileSync("app/globals.css", "utf8");

    expect(styles).toMatch(
      /\.library-brand strong,\s*\.library-brand small\s*\{[^}]*white-space:\s*nowrap;/,
    );
  });

  it("shows the verified publication venue on every paper card", () => {
    const source = readFileSync("app/components/PaperLibraryApp.tsx", "utf8");

    expect(source).toContain("library-publication");
    expect(source).toContain("formatPublicationLabel(paper.publication)");
  });

  it("shows an official GitHub link only when one is registered", () => {
    const source = readFileSync("app/components/PaperLibraryApp.tsx", "utf8");

    expect(source).toContain("paper.codeUrl ?");
    expect(source).toContain("library-code-link");
    expect(source).toContain("GitHub");
    expect(source).not.toContain("代码未公开");
  });

  it("persists a device-local read state for paper cards", () => {
    const source = readFileSync("app/components/PaperLibraryApp.tsx", "utf8");

    expect(source).toContain("READ_PAPERS_STORAGE_KEY");
    expect(source).toContain("parseReadPapers");
    expect(source).toContain("serializeReadPapers");
    expect(source).toContain("localStorage.getItem");
    expect(source).toContain("localStorage.setItem");
  });

  it("renders an accessible front and completion back face", () => {
    const source = readFileSync("app/components/PaperLibraryApp.tsx", "utf8");

    expect(source).toContain("library-card__inner");
    expect(source).toContain("library-card__face--front");
    expect(source).toContain("library-card__face--back");
    expect(source).toContain("aria-pressed={isRead}");
    expect(source).toContain("标记已读");
    expect(source).toContain("已完成阅读");
    expect(source).toContain("翻回查看");
  });

  it("uses a reduced-motion-aware 3D flip treatment", () => {
    const styles = readFileSync("app/globals.css", "utf8");

    expect(styles).toContain("transform-style: preserve-3d");
    expect(styles).toContain("rotateY(180deg)");
    expect(styles).toContain("@media (prefers-reduced-motion: reduce)");
    expect(styles).toContain("library-completion-seal");
  });

  it("lets the front face size long cards instead of clipping them", () => {
    const styles = readFileSync("app/globals.css", "utf8");
    expect(styles).toMatch(
      /\.library-card__face--front\s*\{[^}]*position:\s*relative;/,
    );
  });
});
