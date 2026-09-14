import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("collection landing page", () => {
  it("renders collection navigation instead of the flat paper shelf", () => {
    const page = readFileSync("app/page.tsx", "utf8");
    const component = readFileSync(
      "app/components/CollectionLandingApp.tsx",
      "utf8",
    );

    expect(page).toContain("CollectionLandingApp");
    expect(page).not.toContain("PaperLibraryApp papers={libraryPapers}");
    expect(component).toContain("/collections/");
    expect(component).toContain("主题书架");
    expect(component).toContain('import Link from "next/link"');
    expect(component).not.toContain('<a className="library-brand" href="/">');
  });
});
