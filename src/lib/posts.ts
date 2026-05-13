import type { CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

const datedPostPattern = /^(\d{4})-(\d{2})-(\d{2})-(.+)$/;

export function getPostCategory(post: Post) {
  return sanitizeSegment(post.data.category ?? "sicp");
}

export function getPostSlug(post: Post) {
  return getSourceName(post).replace(datedPostPattern, "$4").replace(/\.md$/, "");
}

export function getPostTitle(post: Post) {
  if (typeof post.data.title === "string") {
    return post.data.title;
  }

  return getExerciseTitleFromSlug(getPostSlug(post)) ?? String(post.data.title);
}

export function getPostUrl(post: Post) {
  return `/${getPostCategory(post)}/${getPostSlug(post)}.html`;
}

export function getPostDate(post: Post) {
  const match = post.id.match(datedPostPattern);

  if (!match) {
    return new Date(0);
  }

  return new Date(`${match[1]}-${match[2]}-${match[3]}T00:00:00.000Z`);
}

export function sortPosts(posts: Post[]) {
  return posts.toSorted((a, b) => {
    const byDate = getPostDate(b).getTime() - getPostDate(a).getTime();

    if (byDate !== 0) {
      return byDate;
    }

    return getPostSlug(a).localeCompare(getPostSlug(b));
  });
}

function sanitizeSegment(value: string) {
  return value.trim().replace(/^\/+|\/+$/g, "").replaceAll("/", "-") || "sicp";
}

function getExerciseTitleFromSlug(slug: string) {
  return slug.match(/(?:^|-)sicp\.?(\d+\.\d+)$/)?.[1] ?? null;
}

function getSourceName(post: Post) {
  return post.filePath?.split("/").at(-1) ?? post.id;
}
