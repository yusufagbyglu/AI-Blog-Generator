import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import GeneratorPage from './pages/GeneratorPage.jsx';
import ArticlesPage from './pages/ArticlesPage.jsx';
import ArticleViewPage from './pages/ArticleViewPage.jsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generator" element={<GeneratorPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:id" element={<ArticleViewPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
