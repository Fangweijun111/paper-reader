import { describe, expect, it } from "vitest";
import { resolveEvidenceTarget } from "./report-links";

describe("report evidence links", () => {
  it("uses an explicit auditable map", () => {
    expect(resolveEvidenceTarget("Table 1")).toBe("table-1");
    expect(resolveEvidenceTarget("Algorithm 1")).toBe("algorithm-1");
    expect(resolveEvidenceTarget("§3.2")).toBe("method-overview");
    expect(resolveEvidenceTarget("unknown")).toBeNull();
  });
});
