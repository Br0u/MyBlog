import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Markdown from 'markdown-to-jsx';
import MainLayout from "../layouts/MainLayout";
import * as postService from "../services/postService";
import Button from "../components/ui/Button";
import CodeBlock from "../components/ui/CodeBlock";
import TableOfContents from "../components/ui/TableOfContents";
import { FiArrowLeft, FiShare2, FiType, FiMoon, FiSun, FiTag } from "react-icons/fi";
import "./markdown-styles.css";

// 装饰性分隔符
const OrnamentalDivider = ({ symbol = "❖" }) => (
  <div className="ornamental-divider flex items-center my-4">
    <div className="flex-grow border-t border-sepia-light/30"></div>
    <span className="px-2 text-sepia-muted">{symbol}</span>
    <div className="flex-grow border-t border-sepia-light/30"></div>
  </div>
);

// 渲染纯文本内容的备用组件
const PlainTextContent = ({ content }) => {
  return (
    <div className="whitespace-pre-wrap">
      {content}
    </div>
  );
};

// 自定义Markdown组件
const CustomCode = ({ children }) => (
  <code className="bg-sepia-light/20 text-sepia-dark px-1.5 py-0.5 rounded font-mono text-sm">
    {children}
  </code>
);

// 自定义块引用组件
const CustomBlockquote = ({ children }) => (
  <blockquote className="border-l-4 border-sepia-light pl-4 italic my-6 text-sepia-dark/80 bg-sepia-light/10 py-3 pr-3 rounded-r">
    {children}
  </blockquote>
);

// 自定义标题组件
const CustomH1 = ({ children }) => (
  <h1 className="text-3xl font-serif text-sepia-dark mt-8 mb-4 pb-2 border-b border-sepia-light/30">{children}</h1>
);

const CustomH2 = ({ children }) => (
  <h2 className="text-2xl font-serif text-sepia-dark mt-6 mb-3">{children}</h2>
);

const CustomH3 = ({ children }) => (
  <h3 className="text-xl font-serif text-sepia-dark mt-5 mb-2">{children}</h3>
);

// Tag Badge Component
const TagBadge = ({ tag }) => (
  <span className="inline-block bg-sepia-light/30 dark:bg-gray-700 text-sepia-dark dark:text-gray-300 rounded-full px-3 py-1 text-xs mr-2 mb-2">
    <FiTag className="inline-block mr-1" size={12} />
    {tag}
  </span>
);

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [renderMode, setRenderMode] = useState('markdown'); // 'markdown' 或 'plain'
  const [fontSize, setFontSize] = useState('medium'); // 'small', 'medium', 'large'
  const [theme, setTheme] = useState('light'); // 'light' 或 'dark'
  const [readingTime, setReadingTime] = useState(0); // 阅读时间（分钟）
  const navigate = useNavigate();

  // 设置字体大小类
  const fontSizeClasses = {
    small: 'text-base',
    medium: 'text-lg',
    large: 'text-xl'
  };

  // 切换字体大小
  const toggleFontSize = () => {
    const sizes = ['small', 'medium', 'large'];
    const currentIndex = sizes.indexOf(fontSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setFontSize(sizes[nextIndex]);
  };

  // 切换主题
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
    document.body.classList.toggle('dark');
  };

  // 计算阅读时间
  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200; // 平均阅读速度
    const wordCount = text.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        console.log("Fetching post with ID:", id);
        // 使用异步方法获取文章
        const foundPost = await postService.getPostById(id);
        console.log("Post data:", foundPost);
        
        if (foundPost) {
          setPost(foundPost);
          // 计算阅读时间
          setReadingTime(calculateReadingTime(foundPost.content));
          // 设置页面标题
          document.title = `${foundPost.title} | Brou's Blog`;
        } else {
          console.error("Post not found");
          setError("Post not found");
          navigate("/not-found", { replace: true });
        }
      } catch (error) {
        console.error("Failed to fetch post:", error);
        setError(error.toString());
        navigate("/not-found", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchPost();

    // 清理函数
    return () => {
      document.title = "Brou's Blog";
    };
  }, [id, navigate]);

  // 切换渲染模式
  const toggleRenderMode = () => {
    setRenderMode(renderMode === 'markdown' ? 'plain' : 'markdown');
  };

  // 分享帖子
  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: `Check out this post: ${post.title}`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container-wrapper">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-48 bg-sepia-light/30 rounded mb-4"></div>
              <div className="h-4 w-24 bg-sepia-light/20 rounded mb-8"></div>
              <div className="h-80 w-full max-w-xl bg-sepia-light/10 rounded"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="container-wrapper">
          <div className="text-center py-10">
            <h1 className="text-xl text-red-500 mb-4">Error</h1>
            <p className="text-sepia-dark mb-6">{error}</p>
            <Button 
              variant="primary" 
              size="md"
              to="/"
            >
              Return Home
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  // 如果没有帖子数据返回空内容
  if (!post) {
    return null;
  }

  return (
    <MainLayout>
      <div className={`container-wrapper transition-colors duration-300 ${theme === 'dark' ? 'dark' : ''}`}>
        <article className={`max-w-3xl mx-auto scroll-container ${fontSizeClasses[fontSize]}`}>
          {/* 顶部工具栏 */}
          <div className="sticky top-0 z-10 bg-sepia-lightest/90 dark:bg-gray-900/90 backdrop-blur-sm py-2 px-4 rounded-b-lg shadow-sm mb-8 flex justify-between items-center">
            <Button 
              variant="ghost" 
              size="sm"
              to="/"
              icon={<FiArrowLeft />}
            >
              Back
            </Button>
            
            <div className="flex space-x-2">
              <button 
                onClick={toggleFontSize}
                className="p-2 rounded-full hover:bg-sepia-light/20 transition-colors text-sepia-dark dark:text-gray-300"
                aria-label="Change font size"
              >
                <FiType />
              </button>
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-sepia-light/20 transition-colors text-sepia-dark dark:text-gray-300"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <FiMoon /> : <FiSun />}
              </button>
              <button 
                onClick={sharePost}
                className="p-2 rounded-full hover:bg-sepia-light/20 transition-colors text-sepia-dark dark:text-gray-300"
                aria-label="Share post"
              >
                <FiShare2 />
              </button>
            </div>
          </div>

          <header className="mb-10 text-center">
            <div className="text-sm text-sepia-muted dark:text-gray-400 mb-2">{post.date}</div>
            <h1 className="text-4xl font-serif font-light text-sepia-dark dark:text-gray-200 mb-6">
              {post.title}
            </h1>
            {/* Tags display */}
            <div className="flex flex-wrap justify-center mb-4">
              {post.tags && post.tags.map((tag, index) => (
                <TagBadge key={index} tag={tag} />
              ))}
            </div>
            <div className="flex justify-center items-center text-xs text-sepia-muted dark:text-gray-400 mb-4">
              <span className="px-2">{readingTime} min read</span>
              <span className="px-2 border-l border-r border-sepia-light/20 dark:border-gray-700">
                {post.status === 'published' ? 'Published' : 'Draft'}
              </span>
              <button 
                onClick={toggleRenderMode}
                className="px-2 hover:text-sepia-dark dark:hover:text-gray-300 transition-colors duration-200"
              >
                {renderMode === 'markdown' ? 'Plain text' : 'Markdown'}
              </button>
            </div>
            <OrnamentalDivider symbol="◈" />
          </header>

          <div className="blog-content prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-normal prose-headings:text-sepia-dark dark:prose-headings:text-gray-200 dark:text-gray-300 dark:prose-a:text-blue-400">
            {renderMode === 'markdown' ? (
              <>
                <TableOfContents content={post.content} />
                <Markdown 
                  options={{
                    overrides: {
                      code: CustomCode,
                      blockquote: CustomBlockquote,
                      h1: CustomH1,
                      h2: CustomH2,
                      h3: CustomH3,
                      pre: ({ children }) => {
                        // Check if it's a code block with language class
                        if (children?.props?.className?.startsWith('language-')) {
                          const language = children.props.className.replace('language-', '');
                          const code = children.props.children;
                          return <CodeBlock language={language} code={code} />;
                        }
                        return <pre>{children}</pre>;
                      }
                    }
                  }}
                >
                  {post.content}
                </Markdown>
              </>
            ) : (
              <PlainTextContent content={post.content} />
            )}
          </div>
          
          {/* 文章标签 */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-16 mb-6">
              <OrnamentalDivider symbol="❧" />
              <div className="flex flex-wrap gap-2 justify-center mt-6">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-sepia-light/20 dark:bg-gray-800 text-sepia-dark dark:text-gray-300 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* 文章底部 */}
          <div className="text-center my-16">
            <p className="text-sepia-muted dark:text-gray-400 text-sm italic mb-6">
              Thank you for reading this article.
            </p>
            <Button 
              variant="primary" 
              size="md"
              to="/"
              icon={<FiArrowLeft />}
            >
              Back to Home
            </Button>
          </div>
        </article>

        {/* 调试信息 */}
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-md text-xs text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
          <details>
            <summary>Debug Information</summary>
            <pre className="mt-2 whitespace-pre-wrap overflow-x-auto">
              {JSON.stringify({postId: id, readingTime, mode: renderMode}, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    </MainLayout>
  );
};

export default PostPage;
