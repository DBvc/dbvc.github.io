import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { isPublished } from "../../lib/content";
import { renderMarkdownEntry } from "../../lib/markdown";
import { absoluteUrl, contentSlug, writingUrl } from "../../lib/urls";

export async function getStaticPaths() {
  const posts = (await getCollection("posts")).filter(isPublished);

  return posts.map((post) => ({
    params: { slug: contentSlug(post) },
    props: { post },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const { post } = props as { post: CollectionEntry<"posts"> };

  return new Response(renderMarkdownEntry(post, absoluteUrl(writingUrl(post))), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
};
