import React, { useState } from 'react';

const ArticleForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    topic: '',
    style: 'informative',
    length: '600',
    keywords: '',
    includeReferences: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Article Settings</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="topic">
            Topic *
          </label>
          <input
            id="topic"
            name="topic"
            type="text"
            value={formData.topic}
            onChange={handleChange}
            required
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
            placeholder="e.g., Digital Marketing Trends"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="style">
            Writing Style
          </label>
          <select
            id="style"
            name="style"
            value={formData.style}
            onChange={handleChange}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
          >
            <option value="informative">Informative</option>
            <option value="conversational">Conversational</option>
            <option value="professional">Professional</option>
            <option value="persuasive">Persuasive</option>
            <option value="entertaining">Entertaining</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="length">
            Article Length
          </label>
          <select
            id="length"
            name="length"
            value={formData.length}
            onChange={handleChange}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
          >
            <option value="300">Short (300-500 words)</option>
            <option value="600">Medium (500-800 words)</option>
            <option value="900">Long (800-1200 words)</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="keywords">
            Keywords (comma separated)
          </label>
          <input
            id="keywords"
            name="keywords"
            type="text"
            value={formData.keywords}
            onChange={handleChange}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
            placeholder="e.g., SEO, content marketing, strategy"
          />
        </div>

        <div className="mb-6">
          <div className="flex items-center">
            <input
              id="includeReferences"
              name="includeReferences"
              type="checkbox"
              checked={formData.includeReferences}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-gray-700 text-sm font-medium" htmlFor="includeReferences">
              Include references and sources
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !formData.topic.trim()}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            ${isLoading || !formData.topic.trim() ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isLoading ? 'Generating...' : 'Generate Article'}
        </button>
      </form>
    </div>
  );
};

export default ArticleForm;