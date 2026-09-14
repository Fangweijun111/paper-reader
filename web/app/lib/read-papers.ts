export const READ_PAPERS_STORAGE_KEY = "paper-atlas:read-papers:v1";

export function parseReadPapers(raw: string | null): Set<string> {
  if (!raw) return new Set();

  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return new Set();
    return new Set(
      value.filter(
        (item): item is string =>
          typeof item === "string" && item.trim().length > 0,
      ),
    );
  } catch {
    return new Set();
  }
}

export function serializeReadPapers(values: ReadonlySet<string>): string {
  return JSON.stringify(Array.from(values).sort());
}

export function toggleReadPaper(
  values: ReadonlySet<string>,
  slug: string,
): Set<string> {
  const next = new Set(values);
  if (next.has(slug)) next.delete(slug);
  else next.add(slug);
  return next;
}
