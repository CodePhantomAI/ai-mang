import React from 'react';
import EditorHeader from './components/EditorHeader';
import MainEditor from './components/MainEditor';
import Sidebar from './components/Sidebar';

const BlogPostEditor = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6" dir="rtl">
      <EditorHeader />
      <div className="grid grid-cols-3 gap-6">
        <MainEditor />
        <Sidebar />
      </div>
    </div>
  );
};

export default BlogPostEditor;