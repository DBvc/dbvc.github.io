import type { CollectionEntry } from "astro:content";

export type SicpPost = CollectionEntry<"sicp">;

const datedPostPattern = /^(\d{4})-(\d{2})-(\d{2})-(.+)$/;

export function getSicpCategory(post: SicpPost) {
  return sanitizeSegment(post.data.category ?? "sicp");
}

export function getSicpSlug(post: SicpPost) {
  return getSourceName(post).replace(datedPostPattern, "$4").replace(/\.md$/, "");
}

export function getSicpTitle(post: SicpPost) {
  if (typeof post.data.title === "string") {
    return post.data.title;
  }

  return getExerciseTitleFromSlug(getSicpSlug(post)) ?? String(post.data.title);
}

export function getSicpUrl(post: SicpPost) {
  return `/${getSicpCategory(post)}/${getSicpSlug(post)}.html`;
}

export function getSicpDate(post: SicpPost) {
  const match = getSourceName(post).match(datedPostPattern);

  if (!match) {
    return new Date(0);
  }

  return new Date(`${match[1]}-${match[2]}-${match[3]}T00:00:00.000Z`);
}

export function sortSicpPosts(posts: SicpPost[]) {
  return posts.toSorted((a, b) => {
    const byDate = getSicpDate(b).getTime() - getSicpDate(a).getTime();

    if (byDate !== 0) {
      return byDate;
    }

    return getSicpSlug(a).localeCompare(getSicpSlug(b));
  });
}

function sanitizeSegment(value: string) {
  return value.trim().replace(/^\/+|\/+$/g, "").replaceAll("/", "-") || "sicp";
}

function getExerciseTitleFromSlug(slug: string) {
  return slug.match(/(?:^|-)sicp\.?(\d+\.\d+)$/)?.[1] ?? null;
}

function getSourceName(post: SicpPost) {
  return post.filePath?.split("/").at(-1) ?? post.id;
}

