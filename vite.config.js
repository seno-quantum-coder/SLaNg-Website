import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [svelte()],
  publicDir: 'static',
  define: {
    'process.argv': '["", ""]'
  },
  resolve: {
    alias: {
      slangmath: resolve('src/lib/slangmath-demo.js'),
      '$slangpkg': resolve('node_modules/slangmath')
    }
  },
  cacheDir: '/tmp/vite-cache'
});
