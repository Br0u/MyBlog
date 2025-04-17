import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { parseISO, format } from 'date-fns';
import Markdown from 'markdown-to-jsx';
import CodeBlock from './ui/CodeBlock';
import { FaCalendarAlt, FaClock, FaTags, FaCopy, FaCheck } from 'react-icons/fa';

// 增强的羊皮纸装饰元素
const ParchmentDecoration = () => {
  // 随机生成纹理点的位置，使每个文章看起来都有些不同
  const [texturePoints, setTexturePoints] = useState([]);
  
  useEffect(() => {
    // 生成一些随机点来增加纹理感
    const points = [];
    for (let i = 0; i < 30; i++) {
      points.push({
        top: Math.random() * 100,
        left: Math.random() * 100,
        opacity: 0.1 + Math.random() * 0.2,
        size: 2 + Math.random() * 4
      });
    }
    setTexturePoints(points);
  }, []);
  
  return (
    <div className="parchment-decoration">
      {/* 经典角落装饰 */}
      <div className="corner top-left"></div>
      <div className="corner top-right"></div>
      <div className="corner bottom-left"></div>
      <div className="corner bottom-right"></div>
      
      {/* 边缘装饰 */}
      <div className="edge top"></div>
      <div className="edge right"></div>
      <div className="edge bottom"></div>
      <div className="edge left"></div>
      
      {/* 随机纹理点 */}
      {texturePoints.map((point, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: `${point.top}%`,
            left: `${point.left}%`,
            width: `${point.size}px`,
            height: `${point.size}px`,
            borderRadius: '50%',
            backgroundColor: 'rgba(139, 115, 85, ' + point.opacity + ')',
            pointerEvents: 'none'
          }}
        />
      ))}
      
      {/* 褶皱效果 - 顶部和底部 */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-amber-50/30 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-amber-50/30 to-transparent pointer-events-none"></div>
      
      {/* 水平装饰线 */}
      <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-900/10 to-transparent pointer-events-none"></div>
      <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-900/10 to-transparent pointer-events-none"></div>
    </div>
  );
};

const ReadingTime = ({ content }) => {
  // 估算阅读时间
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  
  return (
    <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">
      <FaClock className="mr-1" /> {minutes} min read
    </span>
  );
};

// 复制引用功能
const CopyQuote = ({ quote }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(quote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <button 
      onClick={handleCopy}
      className="absolute top-2 right-2 text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
      title="Copy quote"
    >
      {copied ? <FaCheck size={14} /> : <FaCopy size={14} />}
    </button>
  );
};

const PostContent = ({ post }) => {
  if (!post) return (
    <div className="parchment-card p-6 animate-pulse">
      <div className="h-8 bg-amber-100 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-amber-100/50 dark:bg-gray-700/50 rounded w-1/2 mb-8"></div>
      <div className="space-y-3">
        <div className="h-4 bg-amber-100/30 dark:bg-gray-700/30 rounded w-full"></div>
        <div className="h-4 bg-amber-100/30 dark:bg-gray-700/30 rounded w-full"></div>
        <div className="h-4 bg-amber-100/30 dark:bg-gray-700/30 rounded w-5/6"></div>
      </div>
    </div>
  );

  const { title, date, content, tags } = post;
  const formattedDate = format(parseISO(date), 'MMMM dd, yyyy');

  // 为Markdown添加自定义渲染器
  const MarkdownComponents = {
    code: CodeBlock,
    blockquote: (props) => {
      const { children, ...rest } = props;
      const quoteText = React.Children.toArray(children)
        .map(child => {
          if (typeof child === 'string') return child;
          if (child?.props?.children) return child.props.children;
          return '';
        })
        .join('');
        
      return (
        <div className="relative">
          <blockquote 
            {...rest} 
            className="pl-6 pr-8 py-2 italic text-amber-900 dark:text-amber-100 border-l-4 border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-gray-800/50 rounded-r-sm my-6 relative"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-200 via-amber-300 to-amber-200 dark:from-amber-900 dark:via-amber-700 dark:to-amber-900"></div>
            {children}
            <CopyQuote quote={quoteText} />
          </blockquote>
        </div>
      );
    }
  };

  return (
    <article className="parchment-card relative overflow-hidden transition-all duration-500 animate-fade-in">
      <ParchmentDecoration />
      
      <div className="relative z-10 p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-amber-900 dark:text-amber-400">
          {title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400 border-b border-amber-100 dark:border-gray-700 pb-4">
          <span className="flex items-center">
            <FaCalendarAlt className="mr-1" /> {formattedDate}
          </span>
          <ReadingTime content={content} />
          {tags && tags.length > 0 && (
            <div className="flex items-center">
              <FaTags className="mr-1" />
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link 
                    key={tag} 
                    to={`/tags/${tag}`}
                    className="text-xs bg-amber-50 dark:bg-gray-700 px-2 py-1 rounded-md hover:bg-amber-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="prose prose-amber max-w-none dark:prose-invert prose-img:rounded-md prose-headings:font-serif prose-p:text-base prose-p:leading-relaxed">
          <Markdown
            options={{
              overrides: MarkdownComponents
            }}
          >
            {content}
          </Markdown>
        </div>
      </div>
    </article>
  );
};

export default PostContent; 