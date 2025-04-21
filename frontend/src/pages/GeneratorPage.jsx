import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleForm from '../components/ArticleForm';
import ArticlePreview from '../components/ArticlePreview';
import ArticleEditor from '../components/ArticleEditor';
import FeedbackModal from '../components/FeedbackModal';
import api from '../services/api';

const GeneratorPage = () => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(null);
  const [title, setTitle] = useState('');
  
  const navigate = useNavigate();
  const contentRef = useRef('');
  
  // Extract title from the content after generation is complete
  useEffect(() => {
    if (!isLoading && content) {
      // Look for # or ## heading to use as title
      const match = content.match(/^#+ (.*?)$/m);
      if (match && match[1]) {
        setTitle(match[1].trim());
      }
    }
  }, [isLoading, content]);


  const handleGenerateArticle = async (data) => {
    setIsLoading(true);
    setContent('');
    setError(null);
    setFormData(data);
    
    try {
      const response = await api.generateArticleStream(data);
      setContent(response.content);
    } catch (error) {
      setError(error.message || 'Failed to generate article');
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleRegenerateWithFeedback = async (feedback) => {
    if (!formData) return;
    
    // Add feedback to the original form data
    const updatedData = {
      ...formData,
      feedbackNotes: feedback
    };
    
    await handleGenerateArticle(updatedData);
  };
  
  const handleSaveArticle = async () => {
    try {
      const articleData = {
        title: title || `Article about ${formData.topic}`,
        topic: formData.topic,
        style: formData.style,
        keywords: formData.keywords,
        length: formData.length
      };
      
      const response = await api.saveArticle(articleData, content);
      navigate(`/articles/${response.id}`);
    } catch (err) {
      setError('Failed to save article: ' + err.message);
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create a New Article</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {!isEditing ? (
            <ArticleForm onSubmit={handleGenerateArticle} isLoading={isLoading} />
          ) : (
            <ArticleEditor 
              content={content} 
              onSave={(editedContent) => {
                setContent(editedContent);
                setIsEditing(false);
              }}
              onRegenerate={() => setIsFeedbackModalOpen(true)}
            />
          )}
        </div>
        
        <div>
          <ArticlePreview content={content} isLoading={isLoading} />
          
          {content && !isLoading && !isEditing && (
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
              >
                Edit
              </button>
              
              <button
                onClick={() => setIsFeedbackModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
              >
                Regenerate
              </button>
              
              <button
                onClick={handleSaveArticle}
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
              >
                Save Article
              </button>
            </div>
          )}
        </div>
      </div>
      
      <FeedbackModal 
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        onSubmit={handleRegenerateWithFeedback}
      />
    </div>
  );
};

export default GeneratorPage;