import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 检测环境
const isVercel = process.env.VERCEL === '1';
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 根据部署环境设置基本路径
  base: isGitHubPages ? '/MyBlog/' : '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // 确保生成404.html
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  },
  server: {
    open: true,
    // 日志
    onBeforeMiddleware() {
      console.log('Server mode: ' + (isGitHubPages ? 'GitHub Pages' : isVercel ? 'Vercel' : 'Local/Custom'));
      console.log('Base path: ' + (isGitHubPages ? '/MyBlog/' : '/'));
    }
  }
})
