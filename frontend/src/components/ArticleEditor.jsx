import React, { useState } from 'react';

const ArticleEditor = ({ content, onSave, onRegenerate }) => {
  const [editedContent, setEditedContent] = useState(content);
  
  const handleSave = () => {
    onSave(editedContent);
  };
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Edit Article</h2>
      
      <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        className="w-full h-96 p-4 border rounded shadow-inner mb-4"
      />
      
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save Changes
        </button>
        
        <button
          onClick={onRegenerate}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Regenerate
        </button>
      </div>
    </div>
  );
};

export default ArticleEditor;