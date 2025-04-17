/**
 * Vercel部署构建脚本
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// 获取当前目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 颜色输出
const colors = {
  blue: '\x1b[34m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m'
};

console.log(`${colors.blue}=== 为Vercel构建项目 ===${colors.reset}`);

try {
  // 构建项目
  console.log(`${colors.yellow}正在构建项目...${colors.reset}`);
  execSync('vite build', { stdio: 'inherit' });

  // 创建404.html
  console.log(`${colors.yellow}正在创建404.html...${colors.reset}`);
  const indexContent = fs.readFileSync(path.resolve(__dirname, 'dist', 'index.html'), 'utf8');
  fs.writeFileSync(path.resolve(__dirname, 'dist', '404.html'), indexContent);

  console.log(`${colors.green}构建完成!${colors.reset}`);
} catch (error) {
  console.error(`${colors.red}构建失败:${colors.reset}`, error);
  process.exit(1);
} 