import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'

/* BASE задаётся при сборке для GitHub Pages: сайт живёт не в корне домена,
   а в папке с именем репозитория. Локально остаётся «/». */
const base = process.env.BASE_PATH || '/'

// метка сборки: ею помечаем кэш сервис-воркера, чтобы он обновлялся
const buildId = Date.now().toString(36)

export default defineConfig({
  base,
  define: { __BUILD_ID__: JSON.stringify(buildId) },
  plugins: [
    react(),
    {
      // Pages отдаёт 404.html для неизвестных адресов — кладём туда ту же оболочку,
      // иначе прямая ссылка на /catalog вернула бы ошибку
      name: 'spa-404',
      closeBundle: () => copyFileSync('dist/index.html', 'dist/404.html'),
    },
  ],
})
