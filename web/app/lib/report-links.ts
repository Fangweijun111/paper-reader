export const evidenceTargets: Record<string, string> = {
  "Figure 1": "introduction-2",
  "Figure 2": "introduction-4",
  "Figure 3": "method-overview",
  "Figure 4": "experiment-5",
  "Figure 5": "memory-hyperparameters",
  "Table 1": "table-1",
  "Table 2": "table-2",
  "Algorithm 1": "algorithm-1",
  "§3.1": "problem-formulation",
  "§3.2": "method-overview",
  "§4.2": "prediction-results",
  "§4.3": "planning-results",
};

export function resolveEvidenceTarget(label: string) {
  return evidenceTargets[label] ?? null;
}

export const evidenceLabels = Object.keys(evidenceTargets).sort(
  (a, b) => b.length - a.length,
);
