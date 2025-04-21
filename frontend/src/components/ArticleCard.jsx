import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-lg font-semibold mb-2 truncate">{article.title}</h3>
      <p className="text-gray-600 text-sm mb-4">
        Topic: {article.topic} | Style: {article.style}
      </p>
      <p className="text-gray-500 text-sm mb-4">
        Created: {new Date(article.created_at).toLocaleDateString()}
      </p>
      <Link 
        to={`/articles/${article.id}`}
        className="text-blue-500 hover:text-blue-700 font-medium text-sm"
      >
        View Article
      </Link>
    </div>
  );
};

export default ArticleCard;