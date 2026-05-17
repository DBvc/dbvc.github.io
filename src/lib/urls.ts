type ContentEntryRef = {
  id: string;
  filePath?: string;
};

export const SITE_URL = "https://dbvc.xyz";

export function contentSlug(entry: ContentEntryRef) {
  return entry.id.replace(/\.(md|mdx)$/i, "").replace(/\/index$/, "");
}

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function writingUrl(entry: ContentEntryRef) {
  return `/writing/${contentSlug(entry)}.html`;
}

export function writingMarkdownUrl(entry: ContentEntryRef) {
  return `/writing/${contentSlug(entry)}.md`;
}

export function noteUrl(entry: ContentEntryRef) {
  return `/notes/${contentSlug(entry)}.html`;
}

export function noteMarkdownUrl(entry: ContentEntryRef) {
  return `/notes/${contentSlug(entry)}.md`;
}
