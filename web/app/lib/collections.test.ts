import { describe, expect, it } from "vitest";
import { libraryPapers } from "../data/library";
import { paperCollections } from "../data/collections";
import {
  papersForCollection,
  summarizeNonEmptyCollections,
} from "./collections";

describe("paper collections", () => {
  it("places all current papers in World Models", () => {
    const papers = papersForCollection(libraryPapers, "world-models");

    expect(papers).toHaveLength(18);
    expect(
      papers.every((paper) => paper.collection === "world-models"),
    ).toBe(true);
  });

  it("does not fall back for an unknown collection", () => {
    expect(papersForCollection(libraryPapers, "missing-topic")).toEqual([]);
  });

  it("keeps explicitly opened empty topics but omits incidental empty collections", () => {
    const summaries = summarizeNonEmptyCollections(
      [
        ...paperCollections,
        {
          slug: "empty",
          titleZh: "空主题",
          titleEn: "Empty",
          description: "No papers",
          eyebrow: "EMPTY",
          accent: "moss" as const,
          order: 99,
        },
      ],
      libraryPapers,
    );

    expect(summaries.map((item) => item.slug)).toEqual(["world-models", "latent-reasoning"]);
    expect(summaries[1]).toMatchObject({
      paperCount: 0, latestUpdate: "", href: "/collections/latent-reasoning",
      titleEn: "Latent Reasoning", showWhenEmpty: true,
    });
    expect(papersForCollection(libraryPapers, "latent-reasoning")).toEqual([]);
    expect(summaries[0]).toMatchObject({
      paperCount: 18,
      latestUpdate: "2026-09-14",
      href: "/collections/world-models",
    });
  });
});
