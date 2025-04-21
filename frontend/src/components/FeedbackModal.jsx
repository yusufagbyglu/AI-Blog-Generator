import React, { useState } from 'react';

const FeedbackModal = ({ isOpen, onClose, onSubmit }) => {
  const [feedback, setFeedback] = useState('');
  
  const handleSubmit = () => {
    onSubmit(feedback);
    setFeedback('');
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Provide Feedback</h2>
        
        <p className="mb-4 text-gray-600">
          What would you like to improve in the generated article?
        </p>
        
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full h-32 p-2 border rounded shadow-inner mb-4"
          placeholder="Please provide specific feedback about what you'd like to improve..."
        />
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={!feedback.trim()}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
              ${!feedback.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;