import { defineCollection, reference } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  // src/content/posts 以下の .mdx を全部集める
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/posts" }),
  schema: z.object({
    category: reference("categories"),
    number: z.number().int().min(0),
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

const fields = defineCollection({
  loader: file("src/data/fields.yaml"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

const categories = defineCollection({
  loader: file("src/data/categories.yaml"),
  schema: z.object({
    id: z.string(),
    field: reference("field"),
    level: z.number().int().min(0),
    title: z.string(),
    description: z.string()
  }),
});

export const collections = { posts, fields, categories };
