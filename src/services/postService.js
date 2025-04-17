// Local Storage 版本的文章服务
// 备注：该版本使用本地存储实现基本的文章管理功能
// 未来可以轻松替换为Firebase版本

// 初始示例数据
const initialPosts = [
  {
    id: '1',
    title: 'Getting Started with Markdown',
    content: `# Getting Started with Markdown

This is a quick guide to using Markdown in your blog posts. Markdown is a lightweight markup language that allows you to write using an easy-to-read, easy-to-write plain text format, which then converts to valid HTML for viewing on your blog.

## Basic Syntax

### Headers

You can create headers using the hash symbol:

# Header 1
## Header 2
### Header 3

### Emphasis

*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__

### Lists

Unordered list:
* Item 1
* Item 2
  * Sub-item 1
  * Sub-item 2

Ordered list:
1. First item
2. Second item
3. Third item

### Links and Images

[Link to Google](https://www.google.com)

![Alt text for an image](https://via.placeholder.com/150)

### Code Blocks

\`\`\`javascript
function helloWorld() {
  console.log("Hello, world!");
}
\`\`\`

### Blockquotes

> This is a blockquote.
> It can span multiple lines.

## Advanced Tips

- Use three dashes (---) to create a horizontal rule
- You can escape Markdown syntax using backslashes
- Markdown supports HTML, so you can use HTML tags when needed

Happy writing!`,
    status: 'published',
    date: '2025-04-17',
    tags: ['markdown', 'tutorial', 'writing']
  },
  {
    id: '2',
    title: 'Advanced Markdown Techniques',
    content: `# Advanced Markdown Techniques

In this post, we'll explore some more advanced Markdown features and techniques that can help make your blog posts more engaging and better structured.

## Table of Contents

1. [Tables](#tables)
2. [Task Lists](#task-lists)
3. [Syntax Highlighting](#syntax-highlighting)
4. [Footnotes](#footnotes)
5. [Definition Lists](#definition-lists)

## Tables

You can create tables using pipes and dashes:

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

## Task Lists

- [x] Completed task
- [x] Another completed task
- [ ] Incomplete task
- [ ] Another incomplete task

## Syntax Highlighting

\`\`\`python
def greet(name):
    """A simple greeting function"""
    return f"Hello, {name}!"

# Example usage
print(greet("Reader"))
\`\`\`

\`\`\`css
.markdown-body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
}
\`\`\`

## Footnotes

Here's a sentence with a footnote. [^1]

[^1]: This is the footnote.

## Definition Lists

<dl>
  <dt>Markdown</dt>
  <dd>A lightweight markup language for creating formatted text.</dd>
  
  <dt>HTML</dt>
  <dd>The standard markup language for documents designed to be displayed in a web browser.</dd>
</dl>

## Embedding Content

You can embed videos, tweets, and other content using HTML:

<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Remember that not all Markdown processors support all of these features. The specific features available may depend on the Markdown implementation used by your blog.`,
    status: 'draft',
    date: '2025-04-18',
    tags: ['markdown', 'advanced', 'formatting']
  },
  {
    id: '3',
    title: 'Building a Responsive Blog with React',
    content: `# Building a Responsive Blog with React

In this post, we'll walk through the process of building a responsive blog using React and other modern web technologies.

## Technologies We'll Use

- React for UI components
- React Router for navigation
- Tailwind CSS for styling
- Markdown for content
- localStorage for data (eventually Firebase)

## Setting Up the Project

First, let's create a new React project using Vite:

\`\`\`bash
npm create vite@latest my-blog -- --template react
cd my-blog
npm install
\`\`\`

Then, let's install the necessary dependencies:

\`\`\`bash
npm install react-router-dom markdown-to-jsx date-fns tailwindcss postcss autoprefixer
\`\`\`

## Project Structure

Here's how we'll organize our project:

\`\`\`
src/
├── components/   # Reusable UI components
├── layouts/      # Page layouts
├── pages/        # Route components
├── services/     # Data services
├── utils/        # Helper functions
├── assets/       # Static assets
└── App.jsx       # Main application component
\`\`\`

## Creating the Core Components

Let's start by creating the main layout component:

\`\`\`jsx
// src/layouts/MainLayout.jsx
import { Link } from 'react-router-dom';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-4 py-6">
          <Link to="/" className="text-2xl font-bold">My Blog</Link>
          <div className="ml-auto flex space-x-4">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </div>
        </nav>
      </header>
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        {children}
      </main>
      
      <footer className="bg-gray-100">
        <div className="container mx-auto px-4 py-6 text-center">
          © 2025 My Blog. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
\`\`\`

## Next Steps

In future posts, we'll cover:

1. Setting up a post display component
2. Creating a homepage to list all posts
3. Implementing responsive design
4. Adding a dark mode toggle
5. Integrating with a backend (e.g., Firebase)

Stay tuned for more updates!`,
    status: 'published',
    date: '2025-04-19',
    tags: ['react', 'javascript', 'web development']
  }
];

// 检查本地存储中是否已有数据，如果没有则初始化
export const initializeData = () => {
  if (!localStorage.getItem('blog_posts')) {
    localStorage.setItem('blog_posts', JSON.stringify(initialPosts));
    console.log('本地存储已初始化');
  }
};

// 初始化本地存储
initializeData();

// 获取所有文章
export const getAllPosts = async () => {
  try {
    // 模拟异步操作
    return new Promise((resolve) => {
      setTimeout(() => {
        const posts = JSON.parse(localStorage.getItem('blog_posts') || '[]');
        console.log("从本地存储获取所有文章:", posts.length);
        resolve(posts);
      }, 500);
    });
  } catch (error) {
    console.error('获取所有文章时出错:', error);
    return [];
  }
};

// 获取已发布的文章
export const getPublishedPosts = async () => {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        const posts = JSON.parse(localStorage.getItem('blog_posts') || '[]');
        const publishedPosts = posts.filter(post => post.status === 'published');
        console.log("从本地存储获取已发布文章:", publishedPosts.length);
        resolve(publishedPosts);
      }, 500);
    });
  } catch (error) {
    console.error('获取已发布文章时出错:', error);
    return [];
  }
};

// 通过ID获取单个文章
export const getPostById = async (id) => {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        const posts = JSON.parse(localStorage.getItem('blog_posts') || '[]');
        const post = posts.find(post => post.id === id);
        console.log("从本地存储获取文章:", id, post ? '成功' : '未找到');
        
        // 如果找到文章但没有标签，添加默认标签
        if (post && !post.tags) {
          post.tags = ['markdown', 'blog'];
        }
        
        resolve(post || null);
      }, 300);
    });
  } catch (error) {
    console.error('获取文章时出错:', error);
    return null;
  }
};

// 创建新文章
export const createPost = async (post) => {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        const posts = JSON.parse(localStorage.getItem('blog_posts') || '[]');
        const newPost = {
          ...post,
          id: Date.now().toString(),
          date: new Date().toISOString().split('T')[0]
        };
        
        posts.push(newPost);
        localStorage.setItem('blog_posts', JSON.stringify(posts));
        console.log("新文章已创建:", newPost.id);
        
        resolve(newPost);
      }, 300);
    });
  } catch (error) {
    console.error('创建文章时出错:', error);
    throw error;
  }
};

// 更新文章
export const updatePost = async (id, updatedPost) => {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const posts = JSON.parse(localStorage.getItem('blog_posts') || '[]');
        const index = posts.findIndex(post => post.id === id);
        
        if (index === -1) {
          console.error('未找到要更新的文章:', id);
          reject(new Error('文章不存在'));
          return;
        }
        
        posts[index] = {
          ...posts[index],
          ...updatedPost,
          id: id // 确保ID不变
        };
        
        localStorage.setItem('blog_posts', JSON.stringify(posts));
        console.log("文章已更新:", id);
        
        resolve(posts[index]);
      }, 300);
    });
  } catch (error) {
    console.error('更新文章时出错:', error);
    throw error;
  }
};

// 删除文章
export const deletePost = async (id) => {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        const posts = JSON.parse(localStorage.getItem('blog_posts') || '[]');
        const newPosts = posts.filter(post => post.id !== id);
        
        localStorage.setItem('blog_posts', JSON.stringify(newPosts));
        console.log("文章已删除:", id);
        
        resolve(true);
      }, 300);
    });
  } catch (error) {
    console.error('删除文章时出错:', error);
    return false;
  }
};

// 初始化Firebase数据 - 本地存储版本只是一个存根方法
export const initializeFirebaseData = async () => {
  console.log('使用的是本地存储版本，无需初始化Firebase数据');
  return Promise.resolve();
};

// 判断当前环境是否支持Firestore - 本地存储版本始终返回false
export const isFirebaseAvailable = () => {
  return false;
}; 