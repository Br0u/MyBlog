// This is a temporary service that uses localStorage
// Will be replaced with Firebase/Supabase integration later

// Mock data for initial setup
const initialPosts = [
  { 
    id: '1', 
    title: 'Getting Started with Markdown', 
    content: `# Getting Started with Markdown

Welcome to my blog! In this post, we'll explore the basics of Markdown.

## What is Markdown?

Markdown is a lightweight markup language with plain-text formatting syntax. It's designed to be easy to read and write, and can be converted to HTML.

### Basic Syntax

Here are some examples of markdown syntax:

- **Bold text** is written with double asterisks
- *Italic text* is written with single asterisks
- [Links](https://example.com) are created using brackets and parentheses
- Images are similar to links but with an exclamation mark: ![alt text](https://via.placeholder.com/150)

### Code Examples

You can display code inline using backticks: \`console.log('Hello World');\`

Or create code blocks with triple backticks:

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet('World'));
\`\`\`

### Blockquotes

> This is a blockquote.
> 
> It can span multiple lines.

## Conclusion

Markdown is simple yet powerful for formatting text. It's widely used in documentation, README files, and blogs.`, 
    status: 'published',
    date: '2025-04-17' 
  },
  { 
    id: '2', 
    title: 'Advanced Markdown Techniques', 
    content: `# Advanced Markdown Techniques

This post covers some more advanced markdown features.

## Tables

| Feature | Description | Support |
|---------|-------------|---------|
| Tables | Organize data | Good |
| Code Blocks | Syntax highlighting | Excellent |
| Math | LaTeX expressions | Limited |

## Task Lists

- [x] Basic markdown
- [x] Advanced formatting
- [ ] Custom extensions

## Horizontal Rule

Three hyphens create a horizontal rule:

---

## Escaping Characters

Sometimes you need to display characters that are used in markdown syntax. Use backslash to escape them:

\\*This is not italic\\*`, 
    status: 'draft',
    date: '2025-04-18'
  },
  { 
    id: '3', 
    title: 'Building a Responsive Blog with React', 
    content: `# Building a Responsive Blog with React

In this post, we'll explore how to create a responsive blog using React and Tailwind CSS.

## Setting Up the Project

First, create a new React application:

\`\`\`bash
npm create vite@latest my-blog -- --template react
cd my-blog
npm install
\`\`\`

## Adding Tailwind CSS

Install Tailwind and its dependencies:

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

## Creating Components

A blog typically needs several components:

1. Header/Navigation
2. Post List
3. Post Detail
4. Sidebar
5. Footer

Here's an example of a Post component:

\`\`\`jsx
function Post({ title, excerpt, date }) {
  return (
    <article className="border-b pb-4 mb-6">
      <h2 className="text-2xl font-serif">{title}</h2>
      <p className="text-gray-500 text-sm">{date}</p>
      <p className="mt-2">{excerpt}</p>
      <a href="#" className="text-blue-500 mt-2 inline-block">
        Read more →
      </a>
    </article>
  );
}
\`\`\`

## Responsive Design

Making your blog responsive is essential. Use Tailwind's responsive modifiers:

\`\`\`jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Post items go here */}
</div>
\`\`\`

This creates a single column layout on mobile, two columns on medium screens, and three columns on large screens.

## Conclusion

With React and Tailwind CSS, you can create a beautiful, responsive blog quickly. The component-based architecture of React makes it easy to build and maintain.`, 
    status: 'published',
    date: '2025-04-19'
  },
];

// Initialize localStorage with mock data if it doesn't exist
const initializeLocalStorage = () => {
  if (!localStorage.getItem('blogPosts')) {
    localStorage.setItem('blogPosts', JSON.stringify(initialPosts));
  }
};

// Get all posts
export const getAllPosts = () => {
  initializeLocalStorage();
  return JSON.parse(localStorage.getItem('blogPosts') || '[]');
};

// Get published posts (for public view)
export const getPublishedPosts = () => {
  const posts = getAllPosts();
  return posts.filter(post => post.status === 'published');
};

// Get a single post by ID
export const getPostById = (id) => {
  const posts = getAllPosts();
  return posts.find(post => post.id === id) || null;
};

// Create a new post
export const createPost = (post) => {
  const posts = getAllPosts();
  const newPost = {
    ...post,
    id: Date.now().toString(), // Generate a simple ID
    date: new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
  };
  
  const updatedPosts = [newPost, ...posts];
  localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
  
  return newPost;
};

// Update an existing post
export const updatePost = (id, updatedPost) => {
  const posts = getAllPosts();
  const postIndex = posts.findIndex(post => post.id === id);
  
  if (postIndex === -1) {
    // Instead of throwing error, return false to indicate post was not found
    return false;
  }
  
  const updatedPosts = [...posts];
  updatedPosts[postIndex] = {
    ...posts[postIndex],
    ...updatedPost,
    id // Ensure ID doesn't change
  };
  
  localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
  
  return updatedPosts[postIndex];
};

// Delete a post
export const deletePost = (id) => {
  const posts = getAllPosts();
  const updatedPosts = posts.filter(post => post.id !== id);
  
  localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
  
  return true;
};

// Clear all posts (for testing)
export const clearAllPosts = () => {
  localStorage.removeItem('blogPosts');
  return true;
};

// Reset to initial data (for testing)
export const resetToInitialData = () => {
  localStorage.setItem('blogPosts', JSON.stringify(initialPosts));
  return initialPosts;
};

// Check if localStorage is available
export const isStorageAvailable = () => {
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    return true;
  } catch (e) {
    return false;
  }
}; 