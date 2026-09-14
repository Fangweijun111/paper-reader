import { describe, expect, it } from "vitest";
import {
  parseReadPapers,
  serializeReadPapers,
  toggleReadPaper,
} from "./read-papers";

describe("read paper state", () => {
  it("parses a valid list and removes invalid or duplicate values", () => {
    expect(
      Array.from(
        parseReadPapers('["memrl","rise","memrl",42,"",null]'),
      ),
    ).toEqual(["memrl", "rise"]);
  });

  it("falls back to an empty set for missing or malformed storage", () => {
    expect(parseReadPapers(null).size).toBe(0);
    expect(parseReadPapers("not-json").size).toBe(0);
    expect(parseReadPapers('{"memrl":true}').size).toBe(0);
  });

  it("serializes deterministically", () => {
    expect(serializeReadPapers(new Set(["rise", "memrl"]))).toBe(
      '["memrl","rise"]',
    );
  });

  it("toggles one slug without mutating the source set", () => {
    const original = new Set(["memrl"]);
    const added = toggleReadPaper(original, "rise");
    const removed = toggleReadPaper(added, "memrl");

    expect(Array.from(original)).toEqual(["memrl"]);
    expect(Array.from(added).sort()).toEqual(["memrl", "rise"]);
    expect(Array.from(removed)).toEqual(["rise"]);
  });
});
