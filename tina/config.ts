import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "",
  clientId: null, // Local development
  token: null, // Local development
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "categoria",
        label: "Categorias",
        path: "src/content/categorias", // Salvando direto onde o Astro espera
        format: "json",
        fields: [
          { type: "string", name: "title", label: "Nome da Categoria", isTitle: true, required: true },
          { type: "string", name: "slug", label: "Slug", required: true }
        ],
      },
      {
        name: "post",
        label: "Postagens (Artigos)",
        path: "src/content/posts", // Salvando direto onde o Astro espera
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Título do Artigo", isTitle: true, required: true },
          { type: "reference", name: "categoria", label: "Categoria", collections: ["categoria"], required: true },
          { type: "string", name: "metaTitle", label: "Meta Title (SEO)", required: true },
          { type: "string", name: "metaDescription", label: "Meta Description (SEO)", required: true, ui: { component: "textarea" } },
          { type: "image", name: "imagemDestaque", label: "Imagem de Destaque", required: true },
          { type: "string", name: "altText", label: "Texto Alternativo da Imagem (Alt)", required: true },
          { type: "rich-text", name: "body", label: "Corpo do Artigo", isBody: true }
        ],
      },
    ],
  },
});