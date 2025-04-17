import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Markdown from 'markdown-to-jsx';
import MainLayout from "../layouts/MainLayout";
import * as postService from "../services/postService";
import "./markdown-styles.css"; // Import the markdown styles
import LoadingState from "../components/ui/LoadingState";
import { FiClock, FiCalendar, FiTag } from "react-icons/fi";

// 装饰性分隔符
const OrnamentalDivider = ({ symbol = "❖" }) => (
  <div className="ornamental-divider">
    <span className="px-2">{symbol}</span>
  </div>
);

// Helper function to create an excerpt from markdown content
const createExcerpt = (content, maxLength = 150) => {
  // Get the second paragraph (after the heading) or first paragraph
  const paragraphs = content.split('\n\n');
  let excerpt = paragraphs.length > 1 ? paragraphs[1] : paragraphs[0];
  
  // Remove markdown formatting 
  excerpt = excerpt.replace(/[#*_~`]/g, '');
  
  // Truncate if necessary
  if (excerpt.length > maxLength) {
    excerpt = excerpt.substring(0, maxLength) + '...';
  }
  
  return excerpt;
};

// Calculate reading time in minutes
const calculateReadingTime = (text) => {
  const wordsPerMinute = 200; // Average reading speed
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

// Tag Badge Component
const TagBadge = ({ tag }) => (
  <span className="inline-block bg-amber-50 dark:bg-gray-700 text-amber-800 dark:text-gray-300 rounded-md px-2 py-1 text-xs mr-2 hover:bg-amber-100 dark:hover:bg-gray-600 transition-colors">
    <FiTag className="inline-block mr-1" size={12} />
    {tag}
  </span>
);

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // 使用异步方法获取已发布文章
        const publishedPosts = await postService.getPublishedPosts();
        console.log("Fetched posts:", publishedPosts);
        setPosts(publishedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="container-wrapper">
          <LoadingState message="Loading posts..." />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="container-wrapper">
          <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
            <p>Error loading posts: {error}</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container-wrapper transition-colors duration-300">
        <div className="mb-16 text-center animate-fade-in">
          <h1 className="text-4xl font-serif font-light text-sepia-dark dark:text-gray-100 mb-4">
            Welcome to Brou's Blog
          </h1>
          <p className="text-xl text-sepia-muted dark:text-gray-400 max-w-2xl mx-auto">
            Thoughts, stories, and ideas about programming, design, and personal
            growth.
          </p>
          <OrnamentalDivider />
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sepia-muted dark:text-gray-400">No published posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12 max-w-3xl mx-auto">
            {posts.map((post, index) => (
              <article
                key={post.id}
                className={`scroll-container border-b border-sepia-light/20 dark:border-gray-700 pb-10 last:border-0 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md dark:hover:shadow-gray-900/40 animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4 text-xs text-sepia-muted dark:text-gray-400 mb-3">
                  <div className="flex items-center">
                    <FiCalendar className="mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <FiClock className="mr-1" />
                    <span>{calculateReadingTime(post.content)} min read</span>
                  </div>
                </div>
                <h2 className="text-2xl font-serif font-normal text-sepia-dark dark:text-gray-200 mb-3 hover:text-sepia-darkest dark:hover:text-white">
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </h2>
                <div className="text-sepia dark:text-gray-300 mb-4 leading-relaxed">
                  {createExcerpt(post.content)}
                </div>
                {/* Tags section */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap mb-4">
                    {post.tags.map((tag, index) => (
                      <TagBadge key={index} tag={tag} />
                    ))}
                  </div>
                )}
                <Link
                  to={`/post/${post.id}`}
                  className="text-sm font-medium text-sepia-dark dark:text-blue-400 hover:text-sepia-darkest dark:hover:text-blue-300 inline-flex items-center group"
                >
                  Read more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        )}
        
        {/* 页面底部提示 */}
        {posts.length > 0 && (
          <div className="text-center mt-12 text-sepia-muted dark:text-gray-500 text-sm animate-pulse-subtle">
            <p>You've reached the end of the posts</p>
          </div>
        )}
      </div>

      {/* 添加调试信息 */}
      {posts.length > 0 && (
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-md text-xs text-gray-500 dark:text-gray-400 max-w-3xl mx-auto container-wrapper">
          <details>
            <summary>Debug Information</summary>
            <pre className="mt-2 whitespace-pre-wrap overflow-x-auto">
              {JSON.stringify({postsCount: posts.length, firstPost: posts[0]}, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </MainLayout>
  );
};

export default HomePage;
