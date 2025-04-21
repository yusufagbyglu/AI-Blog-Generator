import axios from 'axios';

// Use Vite environment variable or fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = {

  generateArticleStream: async (params) => {
    try {
      const response = await fetch(`${API_URL}/generate/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: params.topic,
          length: parseInt(params.length),
          style: params.style,
          keywords: params.keywords,
          includeReferences: params.includeReferences
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      return await response.json();

    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Get all articles
  getArticles: async () => {
    try {
      const response = await axios.get(`${API_URL}/articles/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  // Get single article
  getArticle: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/articles/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  // Save generated article
  saveArticle: async (articleData, content) => {
    try {
      const response = await axios.post(`${API_URL}/save-article`, {
        article_data: {
          title: articleData.title || `Article about ${articleData.topic}`,
          topic: articleData.topic,
          style: articleData.style,
          keywords: articleData.keywords,
          length: articleData.length
        },
        content
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  // Update article
  updateArticle: async (id, content) => {
    try {
      const response = await axios.put(`${API_URL}/articles/${id}`, {
        content
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  // Delete article
  deleteArticle: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/articles/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default api;