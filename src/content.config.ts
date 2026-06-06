import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 1. Coleção de Categorias (Lendo os arquivos JSON)
const categorias = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/categorias' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
  }),
});

// 2. Coleção de Posts (Lendo os arquivos MDX usando o loader oficial)
const posts = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    categoria: z.any(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    imagemDestaque: z.string(),
    altText: z.string(),
  }),
});

export const collections = { 
  'categorias': categorias, 
  'posts': posts 
};