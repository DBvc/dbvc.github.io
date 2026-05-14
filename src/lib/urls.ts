type ContentEntryRef = {
  id: string;
  filePath?: string;
};

export const SITE_URL = "https://dbvc.xyz";

export function contentSlug(entry: ContentEntryRef) {
  return entry.id.replace(/\.(md|mdx)$/i, "").replace(/\/index$/, "");
}

export function writingUrl(entry: ContentEntryRef) {
  return `/writing/${contentSlug(entry)}.html`;
}

export function noteUrl(entry: ContentEntryRef) {
  return `/notes/${contentSlug(entry)}.html`;
}

