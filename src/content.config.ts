import { defineCollection, reference, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// 1. Coleção de Categorias (JSON)
const categorias = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/content/categorias" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
  }),
});

// 2. Coleção de Posts (MDX)
const posts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    // AQUI ESTAVA O ERRO: Usamos reference() importado do astro:content
    categoria: reference('categorias'), 
    metaTitle: z.string(),
    metaDescription: z.string(),
    imagemDestaque: z.string(),
    altText: z.string(),
  }),
});

// 3. Coleção de Configurações (Arquivo Único JSON)
const configuracoes = defineCollection({
  // Caminho relativo à raiz do projeto
  loader: file("src/content/configuracoes/index.json"),
  schema: z.object({
    nomeSite: z.string(),
    logoUrl: z.string().optional().nullable(),
    activarAnuncios: z.boolean().optional(),
    googlePublisherId: z.string().optional().nullable(),
    googleSlotLateral: z.string().optional().nullable(),
    googleSlotHero: z.string().optional().nullable(),
  }),
});

export const collections = { posts, categorias, configuracoes };