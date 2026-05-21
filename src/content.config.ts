import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('운영자'),
    // 제휴 링크가 포함된 글이면 true → 본문 상단에 공정위 문구 자동 노출
    affiliate: z.boolean().default(false),
    heroEmoji: z.string().default('📝'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
