import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({
    base: "./_posts",
    pattern: "[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]-*.md",
  }),
  schema: z.object({
    layout: z.string().optional(),
    category: z.string().optional(),
    title: z.union([z.string(), z.number()]),
  }),
});

export const collections = { posts };
