import { describe, expect, it } from "vitest";
import { libraryPapers } from "../data/library";
import { mentorGuides } from "../data/mentor-guides";
import { reportMarkdown } from "../data/report";
import { wemReportMarkdown } from "../data/wem-report";
import { hiMemWamReportMarkdown } from "../data/papers/himem-wam/report";
import { labEvolverReportMarkdown } from "../data/papers/labevolver/report";
import { memoirReportMarkdown } from "../data/papers/memoir/report";
import { memrlReportMarkdown } from "../data/papers/memrl/report";
import { onEvoMemoryReportMarkdown } from "../data/papers/onevomemory/report";
import { retrieveThenSteerReportMarkdown } from "../data/papers/retrieve-then-steer/report";
import { riseReportMarkdown } from "../data/papers/rise/report";
import { roboCortexReportMarkdown } from "../data/papers/robo-cortex/report";
import { robomemoryReportMarkdown } from "../data/papers/robomemory/report";
import { roboTwin2ReportMarkdown } from "../data/papers/robotwin-2/report";
import { shaperReportMarkdown } from "../data/papers/shaper/report";
import { teachAndGrowMentoredReportMarkdown } from "../data/papers/teach-and-grow/report";
import { vJepa2ReportMarkdown } from "../data/papers/v-jepa-2/report";
import { wamTttReportMarkdown } from "../data/papers/wam-ttt/report";
import { zettaReportMarkdown } from "../data/papers/zetta/report";
import { openwamReportMarkdown } from "../data/papers/openwam/report";
import { appendChapterMentorNotes } from "./mentor-notes";

describe("mentor note enrichment", () => {
  it("adds one mentor explanation to every numbered report chapter", () => {
    const markdown = [
      "## 1. 一句话",
      "第一章正文。",
      "## 2. 背景",
      "第二章正文。",
    ].join("\n\n");

    const enriched = appendChapterMentorNotes(markdown, {
      1: "第一章导师解释。",
      2: "第二章导师解释。",
    });

    expect(enriched.match(/> \*\*导师解读\*\*：/g)).toHaveLength(2);
    expect(enriched.match(/^## \d+\./gm)).toHaveLength(2);
    expect(enriched).toContain("第一章导师解释。\n\n## 2.");
    expect(enriched.indexOf("第一章导师解释。")).toBeLessThan(
      enriched.indexOf("## 2. 背景"),
    );
  });

  it("does not duplicate mentor explanations when enrichment runs twice", () => {
    const markdown = "## 1. 一句话\n\n正文。";
    const once = appendChapterMentorNotes(markdown, { 1: "导师解释。" });
    const twice = appendChapterMentorNotes(once, { 1: "导师解释。" });

    expect(twice).toBe(once);
  });

  it("provides thirteen paper-specific notes for every legacy report", () => {
    const expectedSlugs = libraryPapers
      .map((paper) => paper.slug)
      .filter((slug) => slug !== "teach-and-grow")
      .sort();

    expect(Object.keys(mentorGuides).sort()).toEqual(expectedSlugs);
    for (const slug of expectedSlugs) {
      const notes = mentorGuides[slug];
      expect(Object.keys(notes)).toHaveLength(13);
      expect(Object.values(notes).every((note) => note.length >= 45)).toBe(true);
      expect(new Set(Object.values(notes)).size).toBe(13);
    }
  });

  it("enriches all eighteen live reports with mentor explanations", () => {
    const reports: Record<string, string> = {
      worldevolver: reportMarkdown,
      "world-ego-modeling": wemReportMarkdown,
      memrl: memrlReportMarkdown,
      rise: riseReportMarkdown,
      "v-jepa-2": vJepa2ReportMarkdown,
      robomemory: robomemoryReportMarkdown,
      "himem-wam": hiMemWamReportMarkdown,
      "robotwin-2": roboTwin2ReportMarkdown,
      "teach-and-grow": teachAndGrowMentoredReportMarkdown,
      "retrieve-then-steer": retrieveThenSteerReportMarkdown,
      memoir: memoirReportMarkdown,
      "robo-cortex": roboCortexReportMarkdown,
      onevomemory: onEvoMemoryReportMarkdown,
      shaper: shaperReportMarkdown,
      labevolver: labEvolverReportMarkdown,
      "wam-ttt": wamTttReportMarkdown,
      zetta: zettaReportMarkdown,
      openwam: openwamReportMarkdown,
    };

    expect(Object.keys(reports).sort()).toEqual(
      libraryPapers.map((paper) => paper.slug).sort(),
    );
    for (const [slug, report] of Object.entries(reports)) {
      const enriched = appendChapterMentorNotes(report, mentorGuides[slug]);
      const count = enriched.match(/> \*\*导师解读\*\*：/g)?.length ?? 0;
      expect(count, slug).toBeGreaterThanOrEqual(13);
      expect(enriched.match(/^## \d+\./gm), slug).toHaveLength(13);
    }
  });
});
