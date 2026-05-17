import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { isPublished } from "../../lib/content";
import { renderMarkdownEntry } from "../../lib/markdown";
import { absoluteUrl, contentSlug, noteUrl } from "../../lib/urls";

export async function getStaticPaths() {
  const notes = (await getCollection("notes")).filter(isPublished);

  return notes.map((note) => ({
    params: { slug: contentSlug(note) },
    props: { note },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const { note } = props as { note: CollectionEntry<"notes"> };

  return new Response(renderMarkdownEntry(note, absoluteUrl(noteUrl(note))), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
};
