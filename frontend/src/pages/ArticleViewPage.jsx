import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import api from '../services/api';

const ArticleViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await api.getArticle(id);
        setArticle(data);
        setEditedContent(data.content);
      } catch (err) {
        setError('Failed to load article: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticle();
  }, [id]);
  
  const handleSaveEdits = async () => {
    try {
      await api.updateArticle(id, editedContent);
      setArticle({
        ...article,
        content: editedContent
      });
      setIsEditing(false);
    } catch (err) {
      setError('Failed to save changes: ' + err.message);
    }
  };
  
  const handleDeleteArticle = async () => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await api.deleteArticle(id);
        navigate('/articles');
      } catch (err) {
        setError('Failed to delete article: ' + err.message);
      }
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
      </div>
    );
  }
  
  if (!article) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
        <p>Article not found</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{article.title}</h1>
        
        <div className="flex space-x-3">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              >
                Edit
              </button>
              
              <button
                onClick={handleDeleteArticle}
                className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSaveEdits}
                className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
              >
                Save
              </button>
              
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedContent(article.content);
                }}
                className="bg-gray-500 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Topic: {article.topic}
          </span>
          
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Style: {article.style}
          </span>
          
          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Created: {new Date(article.created_at).toLocaleDateString()}
          </span>
        </div>
        
        {article.keywords && (
          <div className="mb-4">
            <p className="text-sm text-gray-500">Keywords:</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {article.keywords.split(',').map((keyword, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {keyword.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full h-96 p-4 border rounded shadow-inner"
          />
        ) : (
          <div className="markdown prose max-w-none">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleViewPage;