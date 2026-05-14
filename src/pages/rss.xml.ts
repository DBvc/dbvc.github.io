import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { byPubDateDesc, isPublished } from "../lib/content";
import { SITE_URL, writingUrl } from "../lib/urls";

export async function GET(context) {
  const posts = (await getCollection("posts")).filter(isPublished).sort(byPubDateDesc);

  return rss({
    title: "DBvc",
    description: "程序员。",
    site: context.site ?? SITE_URL,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: writingUrl(post),
    })),
  });
}
