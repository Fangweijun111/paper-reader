/** Prefix raw public URLs when the reader is hosted below a project directory. */
export function withBasePath(url: string, basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""): string {
  const prefix = basePath.replace(/\/+$/, "");
  if (!prefix || !url.startsWith("/") || url.startsWith("//")) return url;
  if (url === prefix || ["/", "?", "#"].some(separator => url.startsWith(prefix + separator))) return url;
  return prefix + url;
}
