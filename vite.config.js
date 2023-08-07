import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import servePreviewAssets from './dev/vite-plugins/serve-preview-assets'
import precompileLodashTemplates from './dev/vite-plugins/precompile-lodash-templates'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const viteConfig = {
    base: '/static/',
    build: {
      outDir: 'ietf/static/dist-neue',
      manifest: true,
      rollupOptions: {
        input: {
          main: 'client/main.js',
          embedded: 'client/embedded.js'
        }
      }
    },
    cacheDir: '.vite',
    plugins: [
      vue(),
      precompileLodashTemplates({
        include: [
          '**/shared/urls.js'
        ]
      })
    ],
    publicDir: 'ietf/static/public',
    server: {
      host: true,
      port: 3000,
      strictPort: true
    },
    preview: {
      host: true,
      port: 3000,
      strictPort: true
    }
  }
  if (mode === 'test') {
    viteConfig.base = '/'
    viteConfig.root = resolve(__dirname, 'client')
    viteConfig.build.outDir = 'dist'
    viteConfig.build.rollupOptions.input.main = resolve(__dirname, 'client/index.html')
    viteConfig.plugins.push(servePreviewAssets())
  }
  return viteConfig
})
