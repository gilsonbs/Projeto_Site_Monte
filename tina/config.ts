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
        name: "configuracoes",
        label: "Configurações Globais",
        path: "content/config",
        format: "json",
        fields: [
          {
            type: "string",
            name: "corFundo",
            label: "Cor de Fundo do Site",
            ui: { component: "color" }
          },
          {
            type: "boolean",
            name: "usarHero",
            label: "Ativar Hero Section na Home?"
          },
          {
            type: "boolean",
            name: "ativarAnuncios",
            label: "Ligar/Desligar Anúncios Globais"
          }
        ]
      },
      {
        name: "categoria",
        label: "Categorias",
        path: "content/categorias",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Nome da Categoria",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "URL da Categoria (Ex: tecnologia-e-inovacao)",
            required: true,
          }
        ]
      },
      {
        name: "post",
        label: "Postagens (Artigos)",
        path: "content/posts",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Título do Post",
            isTitle: true,
            required: true,
          },
          {
            type: "reference",
            name: "categoria",
            label: "Categoria",
            collections: ["categoria"], // Corrigido aqui! Mudou para collections com colchetes []
            required: true,
          },
          {
            type: "string",
            name: "metaTitle",
            label: "Meta Título (SEO - Máx 60 caracteres)",
            required: true,
          },
          {
            type: "string",
            name: "metaDescription",
            label: "Meta Descrição (SEO - Máx 160 caracteres)",
            required: true,
            ui: { component: "textarea" }
          },
          {
            type: "image",
            name: "imagemDestaque",
            label: "Imagem de Destaque",
            required: true,
          },
          {
            type: "string",
            name: "altText",
            label: "Texto Alternativo da Imagem (Acessibilidade/SEO)",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Corpo do Artigo",
            isBody: true,
          },
        ],
      },
    ],
  },
});