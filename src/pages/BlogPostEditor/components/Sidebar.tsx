import React from 'react';
import { Upload, Calendar } from 'lucide-react';
import { useEditor } from '../hooks/useEditor';

const categories = ['טכנולוגיה', 'לייף סטייל', 'עסקים', 'בריאות'];

const Sidebar = () => {
  const { post, updatePost, handleImageUpload } = useEditor();

  return (
    <div className="space-y-6">
      {/* Featured Image */}
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
        <h3 className="text-xl font-bold mb-4">תמונה ראשית</h3>
        <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="featured-image"
          />
          <label 
            htmlFor="featured-image"
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload className="h-8 w-8 text-gray-500 mb-2" />
            <span className="text-gray-500">גרור תמונה או לחץ להעלאה</span>
          </label>
        </div>
      </div>

      {/* Categories & Tags */}
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
        <h3 className="text-xl font-bold mb-4">קטגוריה ותגיות</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">קטגוריה</label>
            <select 
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2"
              value={post.category}
              onChange={(e) => updatePost({ category: e.target.value })}
            >
              <option value="">בחר קטגוריה</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">תגיות</label>
            <input
              type="text"
              placeholder="הוסף תגיות מופרדות בפסיקים"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2"
              value={post.tags.join(', ')}
              onChange={(e) => updatePost({ tags: e.target.value.split(',').map(tag => tag.trim()) })}
            />
          </div>
        </div>
      </div>

      {/* Publishing Options */}
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
        <h3 className="text-xl font-bold mb-4">הגדרות פרסום</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">תאריך פרסום</label>
            <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg p-2">
              <Calendar className="h-5 w-5 text-gray-500 ml-2" />
              <input
                type="datetime-local"
                className="bg-transparent w-full"
                value={post.publishDate}
                onChange={(e) => updatePost({ publishDate: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">סטטוס</label>
            <select 
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2"
              value={post.status}
              onChange={(e) => updatePost({ status: e.target.value })}
            >
              <option value="draft">טיוטה</option>
              <option value="review">בביקורת</option>
              <option value="published">מפורסם</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;