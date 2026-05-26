import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      slangmath: resolve('src/lib/slangmath-demo.js')
    }
  },
  cacheDir: '/tmp/vite-cache'
});
