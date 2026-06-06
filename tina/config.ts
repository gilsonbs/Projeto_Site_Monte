import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: null,
  token: null,
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
        name: "categorias",
        label: "Categorias",
        path: "src/content/categorias",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titulo",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
            required: true,
          }
        ],
      },
      {
        name: "posts",
        label: "Posts",
        path: "src/content/posts",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titulo",
            isTitle: true,
            required: true,
          },
          {
            type: "reference",
            name: "categoria",
            label: "Categoria",
            // Mudamos de collection para collections e colocamos dentro de um array []
            collections: ["categorias"],
            required: true,
          },
          {
            type: "string",
            name: "metaTitle",
            label: "Meta Title",
            required: true,
          },
          {
            type: "string",
            name: "metaDescription",
            label: "Meta Description",
            required: true,
          },
          {
            type: "image",
            name: "imagemDestaque",
            label: "Imagem Destaque",
            required: true,
          },
          {
            type: "string",
            name: "altText",
            label: "Alt Text",
            required: true,
          }
        ],
      },
      {
        name: "configuracoes",
        label: "Configuracoes Globais",
        path: "src/content/configuracoes",
        format: "json",
        fields: [
          {
            type: "string",
            name: "nomeSite",
            label: "Nome do Site",
            required: true,
          },
          {
            type: "image",
            name: "logoUrl",
            label: "Logo do Site",
          },
          {
            type: "boolean",
            name: "activarAnuncios",
            label: "Ativar Anuncios",
          },
          {
            type: "string",
            name: "googlePublisherId",
            label: "Google Publisher ID",
          },
          {
            type: "string",
            name: "googleSlotLateral",
            label: "Google Slot Lateral",
          }
        ],
      }
    ],
  },
});