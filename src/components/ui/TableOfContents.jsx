import React, { useState, useEffect } from 'react';
import { FiList, FiX } from 'react-icons/fi';

const TableOfContents = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  // 解析markdown内容中的标题
  useEffect(() => {
    if (!content) return;
    
    // 正则表达式匹配markdown标题
    const regex = /^(#{1,3})\s+(.+)$/gm;
    const matches = [...content.matchAll(regex)];
    
    const headingsList = matches.map((match, index) => {
      const level = match[1].length; // #的数量决定级别
      const text = match[2].trim();
      const id = `heading-${index}`;
      
      return { id, level, text };
    });
    
    setHeadings(headingsList);
  }, [content]);

  // 监听滚动以突出显示当前可见的标题
  useEffect(() => {
    if (headings.length === 0) return;
    
    const handleScroll = () => {
      const headingElements = document.querySelectorAll('h1, h2, h3');
      
      // 找到当前在视口顶部的标题
      for (let i = 0; i < headingElements.length; i++) {
        const element = headingElements[i];
        const rect = element.getBoundingClientRect();
        
        if (rect.top >= 0 && rect.top <= 200) {
          // 找到TOC中对应的项
          const index = Array.from(headingElements).indexOf(element);
          if (index >= 0 && index < headings.length) {
            setActiveId(headings[index].id);
          }
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始化
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);

  // 点击标题滚动到对应位置
  const scrollToHeading = (index) => {
    const headingElements = document.querySelectorAll('h1, h2, h3');
    if (index < headingElements.length) {
      headingElements[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(headings[index].id);
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="relative">
      {/* 浮动按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-sepia-dark dark:bg-gray-700 text-white p-3 rounded-full shadow-lg z-50 hover:bg-sepia-darkest dark:hover:bg-gray-600 transition-colors duration-200"
        aria-label={isOpen ? "Close table of contents" : "Open table of contents"}
      >
        {isOpen ? <FiX size={20} /> : <FiList size={20} />}
      </button>
      
      {/* 目录面板 */}
      {isOpen && (
        <div className="fixed top-20 right-6 w-64 max-h-[70vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 z-40 border border-sepia-light/20 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-sepia-dark dark:text-gray-200">Table of Contents</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-sepia-muted dark:text-gray-400 hover:text-sepia-dark dark:hover:text-gray-200"
              aria-label="Close table of contents"
            >
              <FiX size={16} />
            </button>
          </div>
          
          <nav>
            <ul className="space-y-2">
              {headings.map((heading, index) => (
                <li 
                  key={heading.id}
                  className={`text-sm ${
                    heading.level === 1 ? 'ml-0' : 
                    heading.level === 2 ? 'ml-3' : 
                    'ml-6'
                  }`}
                >
                  <button
                    onClick={() => scrollToHeading(index)}
                    className={`block w-full text-left py-1 px-2 rounded transition-colors hover:bg-sepia-light/10 dark:hover:bg-gray-700 ${
                      activeId === heading.id 
                        ? 'text-sepia-dark dark:text-white font-medium bg-sepia-light/10 dark:bg-gray-700' 
                        : 'text-sepia-muted dark:text-gray-400'
                    }`}
                  >
                    {heading.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default TableOfContents; 