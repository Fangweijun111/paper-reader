import { describe, expect, it } from "vitest";
import { libraryPapers } from "../data/library";
import {
  countPapersByStatus,
  filterPapers,
  formatPublicationLabel,
} from "./library";

describe("paper library", () => {
  it("counts every workflow state", () => {
    expect(countPapersByStatus(libraryPapers)).toEqual({
      all: 18,
      completed: 18,
      reading: 0,
      queued: 0,
    });
  });

  it("registers WAM-TTT in the world-model collection", () => {
    const paper = libraryPapers.find((item) => item.slug === "wam-ttt");
    expect(paper).toMatchObject({
      collection: "world-models",
      status: "completed",
      progress: 100,
      href: "/papers/wam-ttt",
      publication: {
        kind: "preprint",
        status: "preprint",
        venue: "arXiv",
        year: 2026,
      },
    });
    expect(paper?.codeUrl).toBeUndefined();
  });

  it("searches across paper metadata", () => {
    expect(
      filterPapers(libraryPapers, "WorldEvolver", "all", "all").map(
        (paper) => paper.slug,
      ),
    ).toEqual(["worldevolver"]);

    expect(
      filterPapers(libraryPapers, "智能体", "all", "all").map(
        (paper) => paper.slug,
      ),
    ).toContain("worldevolver");

    expect(
      filterPapers(libraryPapers, "World-Ego", "all", "all").map(
        (paper) => paper.slug,
      ),
    ).toEqual(["world-ego-modeling"]);

    expect(
      filterPapers(libraryPapers, "episodic memory", "all", "all").map(
        (paper) => paper.slug,
      ),
    ).toEqual(["memrl"]);
  });

  it("composes status and domain filters", () => {
    const completed = filterPapers(
      libraryPapers,
      "",
      "completed",
      "Robot Planning",
    );

    expect(completed).toHaveLength(1);
    expect(completed[0].slug).toBe("v-jepa-2");
  });

  it("records a verified publication status for every paper", () => {
    expect(libraryPapers.every((paper) => paper.publication)).toBe(true);

    const publications = Object.fromEntries(
      libraryPapers.map((paper) => [paper.slug, paper.publication]),
    );
    expect(formatPublicationLabel(publications.worldevolver)).toBe(
      "Findings of EMNLP · 2026",
    );
    expect(formatPublicationLabel(publications.rise)).toBe("RSS · 2026");
    expect(formatPublicationLabel(publications["robotwin-2"])).toBe(
      "ICML · 2026",
    );
    expect(formatPublicationLabel(publications.onevomemory)).toContain(
      "Workshop",
    );
    expect(formatPublicationLabel(publications.shaper)).toBe(
      "arXiv 预印本 · 2026",
    );
  });

  it("registers only primary-source verified official code repositories", () => {
    const codeUrls = Object.fromEntries(
      libraryPapers.map((paper) => [paper.slug, paper.codeUrl]),
    );

    expect(codeUrls["world-ego-modeling"]).toBe(
      "https://github.com/ZGCA-HMI-Lab/WEM",
    );
    expect(codeUrls.memrl).toBe("https://github.com/MemTensor/MemRL");
    expect(codeUrls.rise).toBe("https://github.com/OpenDriveLab/RISE");
    expect(codeUrls["v-jepa-2"]).toBe(
      "https://github.com/facebookresearch/vjepa2",
    );
    expect(codeUrls["himem-wam"]).toBe(
      "https://github.com/Agentic-Intelligence-Lab/HiMem-WAM",
    );
    expect(codeUrls["robotwin-2"]).toBe(
      "https://github.com/RoboTwin-Platform/RoboTwin",
    );
    expect(codeUrls.memoir).toBe("https://github.com/xyz9911/Memoir");
    expect(codeUrls.labevolver).toBe(
      "https://github.com/AndyGao6186/LabEvolver",
    );

    expect(codeUrls.worldevolver).toBeUndefined();
    expect(codeUrls["teach-and-grow"]).toBeUndefined();
    expect(codeUrls.shaper).toBeUndefined();
  });
});
