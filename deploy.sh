#!/bin/bash
# Vercel部署脚本

# 构建项目
echo "=== 开始构建项目 ==="
npm run vite-build

# 复制index.html到404.html
echo "=== 创建404.html ==="
cp dist/index.html dist/404.html

echo "=== 构建完成 ===" 