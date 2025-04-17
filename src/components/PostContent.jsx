import React from 'react';
import { Link } from 'react-router-dom';
import { parseISO, format } from 'date-fns';
import Markdown from 'markdown-to-jsx';
import CodeBlock from './ui/CodeBlock';
import { FaCalendarAlt, FaClock, FaTags } from 'react-icons/fa';

// 自定义的装饰元素
const ParchmentDecoration = () => (
  <div className="parchment-decoration">
    <div className="corner top-left"></div>
    <div className="corner top-right"></div>
    <div className="corner bottom-left"></div>
    <div className="corner bottom-right"></div>
    <div className="edge top"></div>
    <div className="edge right"></div>
    <div className="edge bottom"></div>
    <div className="edge left"></div>
  </div>
);

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

const PostContent = ({ post }) => {
  if (!post) return <div className="parchment-card p-6">Loading...</div>;

  const { title, date, content, tags } = post;
  const formattedDate = format(parseISO(date), 'MMMM dd, yyyy');

  return (
    <article className="parchment-card relative overflow-hidden">
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
              overrides: {
                code: {
                  component: CodeBlock
                }
              }
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