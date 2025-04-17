import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './pages/markdown-styles.css'
import App from './App.jsx'
// 导入初始化函数
import { initializeData } from './services/postService';

// 初始化主题设置
const initializeTheme = () => {
  // 检查本地存储中的主题设置
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // 如果本地存储有主题设置，则使用该设置；否则，根据系统偏好设置
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');
  }
};

// 初始化应用
const initializeApp = async () => {
  try {
    // 应用初始主题
    initializeTheme();
    
    // 检查并初始化本地存储的示例数据
    // 这一步已在postService中自动完成
    console.log('应用初始化完成');
  } catch (error) {
    console.error('应用初始化失败:', error);
  }
};

// 执行初始化
initializeApp();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
