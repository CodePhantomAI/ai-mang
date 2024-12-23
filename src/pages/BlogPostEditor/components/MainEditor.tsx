import React from 'react';
import { Bold, Italic, Link2, Quote, List, Image } from 'lucide-react';
import EditorToolbar from './EditorToolbar';
import { useEditor } from '../hooks/useEditor';

const MainEditor = () => {
  const { post, updatePost } = useEditor();

  return (
    <div className="col-span-2 space-y-6">
      {/* Title */}
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
        <input
          type="text"
          placeholder="כותרת הפוסט"
          className="w-full bg-transparent text-3xl font-bold outline-none border-none placeholder-gray-600"
          value={post.title}
          onChange={(e) => updatePost({ title: e.target.value })}
        />
      </div>

      <EditorToolbar />

      {/* Content Editor */}
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800 min-h-96">
        <textarea
          placeholder="תוכן הפוסט"
          className="w-full h-96 bg-transparent outline-none border-none resize-none placeholder-gray-600"
          value={post.content}
          onChange={(e) => updatePost({ content: e.target.value })}
        />
      </div>
    </div>
  );
};

export default MainEditor;