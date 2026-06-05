import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders'; // <-- CORRIGIDO AQUI!

const categorias = defineCollection({
  // O loader lê todos os arquivos JSON de categorias gerados pelo Tina
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/content/categorias" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
  }),
});

const posts = defineCollection({
  // O loader lê todos os arquivos MDX de posts gerados pelo Tina
  loader: glob({ pattern: '**/[^_]*.mdx', base: "./src/content/posts" }),
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
  categoria: categorias, 
  post: posts 
};