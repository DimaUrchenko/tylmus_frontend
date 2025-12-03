import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  // Загружаем env переменные
  const env = loadEnv(mode, process.cwd(), '')
  
  // Определяем API URL в зависимости от среды
  const apiUrl = env.VITE_API_BASE_URL || 
    (mode === 'development' ? 'http://localhost:8000/api' : '/api')
  
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    server: {
      host: true,
      port: 3000,
      // Прокси только для разработки
      proxy: mode === 'development' ? {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '') // убрать /api если нужно
        }
      } : undefined
    },
    // Настройки для продакшена
    build: {
      outDir: 'dist',
      sourcemap: false,
      chunkSizeWarningLimit: 1600,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router', 'pinia'],
            ui: ['element-plus', 'axios']
          }
        }
      }
    },
    // Глобальные переменные
    define: {
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify(apiUrl)
    }
  }
})