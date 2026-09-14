import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("World Models collection route", () => {
  it("renders a scoped shelf with a back link", () => {
    const source = readFileSync(
      "app/collections/world-models/page.tsx",
      "utf8",
    );

    expect(source).toContain(
      'papersForCollection(libraryPapers, "world-models")',
    );
    expect(source).toContain('backHref="/"');
    expect(source).toContain("PaperLibraryApp");
  });
});
