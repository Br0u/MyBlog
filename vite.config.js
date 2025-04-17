import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 检查是否为生产环境
const isProd = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 如果是生产环境且自定义域名存在，则base为'/'，否则为'/MyBlog/'
  base: isProd ? '/' : '/MyBlog/',
})
