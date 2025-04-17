import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiCopy, FiCheck } from 'react-icons/fi';

const CodeBlock = ({ children, className }) => {
  const [copied, setCopied] = useState(false);
  
  // Extract language from className (format: "language-jsx")
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  
  const code = children.trim();
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  return (
    <div className="relative group rounded-md overflow-hidden my-6">
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2 text-xs text-gray-200">
        <span className="font-mono">{language || 'text'}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 hover:text-white transition-colors"
          aria-label={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <>
              <FiCheck className="h-4 w-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <FiCopy className="h-4 w-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      
      <SyntaxHighlighter
        language={language}
        style={nightOwl}
        customStyle={{
          margin: 0,
          padding: '1rem',
          fontSize: '0.9rem',
          borderRadius: '0 0 0.375rem 0.375rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;