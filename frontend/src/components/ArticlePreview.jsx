import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ArticlePreview = ({ content, isLoading }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Preview</h2>
      
      {isLoading && content === '' && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {isLoading && content !== '' && (
        <div className="mb-4 text-sm text-gray-500">
          Generating content...
        </div>
      )}
      
      <div className="markdown prose max-w-none">
        {content ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <pre className="bg-gray-800 rounded-lg p-4">
                    <code className="text-white" {...props}>
                      {String(children).replace(/\n$/, '')}
                    </code>
                  </pre>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              p: ({ children }) => <p className="mb-4">{children}</p>,
              h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl font-semibold mb-3">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl font-medium mb-2">{children}</h3>
            }}
          >
            {content}
          </ReactMarkdown>
        ) : (
          <div className="text-center text-gray-500 py-12">
            {isLoading ? 'Generating content...' : 'Your article preview will appear here'}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlePreview;