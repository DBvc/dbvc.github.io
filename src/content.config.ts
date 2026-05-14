import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const lang = z.enum(["zh", "en"]).default("zh");

const datedContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  draft: z.boolean().default(false),
  lang,
  tags: z.array(z.string()).default([]),
  aiAssisted: z.boolean().default(false),
  aiNote: z.string().optional(),
});

const posts = defineCollection({
  loader: glob({
    base: "./src/content/posts",
    pattern: "**/*.md",
  }),
  schema: datedContentSchema,
});

const notes = defineCollection({
  loader: glob({
    base: "./src/content/notes",
    pattern: "**/*.md",
  }),
  schema: datedContentSchema,
});

const projects = defineCollection({
  loader: glob({
    base: "./src/content/projects",
    pattern: "**/*.md",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["planned", "active", "paused", "archived"]).default("planned"),
    startDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

const sicp = defineCollection({
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

export const collections = { posts, notes, projects, sicp };
