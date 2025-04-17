// Firebase版本的文章服务
import { db } from '../firebase';
import { 
  collection, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  serverTimestamp, 
  orderBy,
  writeBatch
} from 'firebase/firestore';

// 初始示例数据
const initialPosts = [
  {
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
    date: new Date('2025-04-17').toISOString(),
    tags: ['markdown', 'tutorial', 'writing']
  },
  {
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
    date: new Date('2025-04-18').toISOString(),
    tags: ['markdown', 'advanced', 'formatting']
  },
  {
    title: 'Building a Responsive Blog with React',
    content: `# Building a Responsive Blog with React

In this post, we'll walk through the process of building a responsive blog using React and other modern web technologies.

## Technologies We'll Use

- React for UI components
- React Router for navigation
- Tailwind CSS for styling
- Markdown for content
- Firebase for data storage and synchronization

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
5. Integrating with Firebase for cloud synchronization

Stay tuned for more updates!`,
    status: 'published',
    date: new Date('2025-04-19').toISOString(),
    tags: ['react', 'javascript', 'web development']
  }
];

// 初始化 Firebase 数据
export const initializeFirebaseData = async () => {
  try {
    // 检查是否已有数据
    const postsSnapshot = await getDocs(collection(db, 'posts'));
    
    if (postsSnapshot.empty) {
      console.log('Firebase数据库为空，初始化示例数据');
      
      // 使用批量写入操作
      const batch = writeBatch(db);
      
      // 添加初始文章
      initialPosts.forEach(post => {
        const postRef = doc(collection(db, 'posts'));
        batch.set(postRef, {
          ...post,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      });
      
      // 提交批量操作
      await batch.commit();
      console.log('Firebase示例数据已初始化');
      return true;
    } else {
      console.log('Firebase数据库已有数据，无需初始化');
      return false;
    }
  } catch (error) {
    console.error('初始化Firebase数据时出错:', error);
    throw error;
  }
};

// 从本地存储导入到Firebase
export const importFromLocalStorage = async () => {
  try {
    // 获取本地存储中的数据
    const localPosts = JSON.parse(localStorage.getItem('blog_posts') || '[]');
    
    if (localPosts.length === 0) {
      console.log('本地存储中没有数据，无需导入');
      return { success: false, message: '本地存储中没有数据' };
    }
    
    // 使用批量写入操作
    const batch = writeBatch(db);
    
    // 添加本地文章到Firebase
    localPosts.forEach(post => {
      // 如果文章已经有ID，使用该ID，否则创建新ID
      const postRef = post.id ? doc(db, 'posts', post.id) : doc(collection(db, 'posts'));
      batch.set(postRef, {
        ...post,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    });
    
    // 提交批量操作
    await batch.commit();
    console.log(`已从本地存储导入 ${localPosts.length} 篇文章到Firebase`);
    
    return { 
      success: true, 
      message: `成功导入 ${localPosts.length} 篇文章到Firebase`,
      count: localPosts.length
    };
  } catch (error) {
    console.error('从本地存储导入到Firebase时出错:', error);
    return { success: false, message: `导入失败: ${error.message}` };
  }
};

// 获取所有文章
export const getAllPosts = async () => {
  try {
    // 创建排序查询
    const postsQuery = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc')
    );
    
    // 执行查询
    const querySnapshot = await getDocs(postsQuery);
    
    // 处理结果
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // 处理服务器时间戳
      date: doc.data().date?.split('T')[0] || new Date().toISOString().split('T')[0]
    }));
  } catch (error) {
    console.error('获取所有文章时出错:', error);
    return [];
  }
};

// 获取已发布的文章
export const getPublishedPosts = async () => {
  try {
    // 创建已发布文章查询
    const postsQuery = query(
      collection(db, 'posts'),
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc')
    );
    
    // 执行查询
    const querySnapshot = await getDocs(postsQuery);
    
    // 处理结果
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.split('T')[0] || new Date().toISOString().split('T')[0]
    }));
  } catch (error) {
    console.error('获取已发布文章时出错:', error);
    return [];
  }
};

// 通过ID获取单个文章
export const getPostById = async (id) => {
  try {
    // 获取文章引用
    const docRef = doc(db, 'posts', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // 处理文章数据
      const postData = docSnap.data();
      const tags = postData.tags || ['markdown', 'blog'];
      
      return {
        id: docSnap.id,
        ...postData,
        tags,
        date: postData.date?.split('T')[0] || new Date().toISOString().split('T')[0]
      };
    } else {
      console.log('没有找到ID为', id, '的文章');
      return null;
    }
  } catch (error) {
    console.error('获取文章时出错:', error);
    return null;
  }
};

// 创建新文章
export const createPost = async (post) => {
  try {
    // 准备新文章数据
    const newPost = {
      ...post,
      date: new Date().toISOString(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    // 添加到Firebase
    const docRef = await addDoc(collection(db, 'posts'), newPost);
    
    // 返回带ID的新文章
    return {
      id: docRef.id,
      ...newPost,
      date: newPost.date.split('T')[0]
    };
  } catch (error) {
    console.error('创建文章时出错:', error);
    throw error;
  }
};

// 更新文章
export const updatePost = async (id, updatedPost) => {
  try {
    const docRef = doc(db, 'posts', id);
    
    // 添加更新时间戳
    const postToUpdate = {
      ...updatedPost,
      updatedAt: serverTimestamp()
    };
    
    // 更新Firebase中的文章
    await updateDoc(docRef, postToUpdate);
    
    // 返回更新后的文章
    return {
      id,
      ...postToUpdate,
      date: postToUpdate.date?.split('T')[0] || new Date().toISOString().split('T')[0]
    };
  } catch (error) {
    console.error('更新文章时出错:', error);
    throw error;
  }
};

// 删除文章
export const deletePost = async (id) => {
  try {
    const docRef = doc(db, 'posts', id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('删除文章时出错:', error);
    return false;
  }
};

// 判断当前环境是否支持Firestore
export const isFirebaseAvailable = () => {
  try {
    return !!db;
  } catch (error) {
    console.error('检查Firebase可用性时出错:', error);
    return false;
  }
}; 