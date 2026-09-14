import { describe, expect, it } from "vitest";
import {
  DEFAULT_READING_STATE,
  parseReadingState,
  serializeReadingState,
} from "./reading-state";

describe("reading state", () => {
  it("round trips valid state", () => {
    const state = {
      splitPercent: 65,
      languageMode: "parallel" as const,
      paperBlockId: "method-episodic-retrieval",
      reportSectionId: "report-7",
      collapsedSections: ["appendix-a", "appendix-b"],
    };
    expect(parseReadingState(serializeReadingState(state))).toEqual(state);
  });

  it("falls back and clamps unsafe values", () => {
    expect(parseReadingState("not-json")).toEqual(DEFAULT_READING_STATE);
    expect(parseReadingState('{"splitPercent":99}').splitPercent).toBe(78);
  });
});
