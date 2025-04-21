import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-8 mb-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          AI-Powered Blog Content Generator
        </h1>
        
        <p className="text-lg text-gray-600 mb-6 text-center">
          Create professional, engaging blog content in seconds with the power of artificial intelligence.
        </p>
        
        <div className="flex justify-center">
          <Link 
            to="/generator" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Create Your First Article
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Customizable</h2>
          <p className="text-gray-600">
            Tailor your content's tone, style, and length to match your specific needs.
          </p>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">SEO Friendly</h2>
          <p className="text-gray-600">
            Incorporate keywords and optimize your content for better search engine visibility.
          </p>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Current & Relevant</h2>
          <p className="text-gray-600">
            Generate content that includes references to current events and trends.
          </p>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          How It Works
        </h2>
        
        <ol className="list-decimal list-inside space-y-4 mb-6 text-gray-600">
          <li className="pl-2">Enter your desired topic and adjust generation settings</li>
          <li className="pl-2">Watch as AI generates your content in real-time</li>
          <li className="pl-2">Edit or refine the content as needed</li>
          <li className="pl-2">Save and use your professionally crafted blog article</li>
        </ol>
        
        <div className="flex justify-center">
          <Link 
            to="/generator" 
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg transition-all duration-300"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;