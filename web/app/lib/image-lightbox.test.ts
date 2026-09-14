import { describe, expect, it } from "vitest";
import {
  clampImageScale,
  resetImageTransform,
  stepImageScale,
} from "./image-lightbox";

describe("image lightbox transform", () => {
  it("clamps scale to the supported range", () => {
    expect(clampImageScale(0.1)).toBe(0.5);
    expect(clampImageScale(2.25)).toBe(2.25);
    expect(clampImageScale(9)).toBe(4);
  });

  it("moves in quarter-scale increments without escaping bounds", () => {
    expect(stepImageScale(1, "in")).toBe(1.25);
    expect(stepImageScale(1, "out")).toBe(0.75);
    expect(stepImageScale(4, "in")).toBe(4);
    expect(stepImageScale(0.5, "out")).toBe(0.5);
  });

  it("resets scale and pan", () => {
    expect(resetImageTransform()).toEqual({ scale: 1, x: 0, y: 0 });
  });
});
