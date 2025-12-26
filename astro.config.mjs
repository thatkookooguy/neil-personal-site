// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // Static site generation
  output: 'static',

  // Site URL (update for production)
  site: 'https://neils-city.com',

  // Integrations
  integrations: [
    react(),
    mdx(),
  ],

  // Build configuration
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto',
  },

  // Vite configuration
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
          },
        },
      },
    },
  },
});
