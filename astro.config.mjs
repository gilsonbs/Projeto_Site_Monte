import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

// Configuração limpa e padrão do Astro
export default defineConfig({
  integrations: [mdx()]
});