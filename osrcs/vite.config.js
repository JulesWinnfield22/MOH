import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  envPrefix: 'v_',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@com': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@agencies': fileURLToPath(new URL('./src/features/agencies', import.meta.url)),
      '@users': fileURLToPath(new URL('./src/features/user_management', import.meta.url)),
      '@roles': fileURLToPath(new URL('./src/features/role_management', import.meta.url)),
      '@privilege': fileURLToPath(new URL('./src/features/privileges', import.meta.url)),
      '@directives': fileURLToPath(new URL('./src/directives', import.meta.url)),
      '@auth': fileURLToPath(new URL('./src/features/auth', import.meta.url)),
      '@service': fileURLToPath(new URL('./src/service', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@layout': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@skl': fileURLToPath(new URL('./src/skeletons', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/stores', import.meta.url)),
      '@modals': fileURLToPath(new URL('./src/modals', import.meta.url)),
      '@toast': fileURLToPath(new URL('./src/toast', import.meta.url)),
      '@composable': fileURLToPath(new URL('./src/composables', import.meta.url))
    }
  }
})
