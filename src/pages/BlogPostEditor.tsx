import React, { useState } from 'react';
import { Save, Image, Link, List, Bold, Italic } from 'lucide-react';

interface Website {
  id: number;
  name: string;
  url: string;
}

const BlogPostEditor = () => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    websiteId: '',
    featuredImage: null as File | null
  });

  // רשימת האתרים לדוגמה - בהמשך זה יגיע מהשרת
  const websites: Website[] = [
    { id: 1, name: 'האתר הראשי', url: 'www.main-site.com' },
    { id: 2, name: 'בלוג טכנולוגיה', url: 'www.tech-blog.com' },
    { id: 3, name: 'בלוג לייפסטייל', url: 'www.lifestyle-blog.com' }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPost({ ...post, featuredImage: file });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // בדיקה שנבחר אתר
    if (!post.websiteId) {
      alert('נא לבחור אתר לפרסום');
      return;
    }
    // כאן תהיה הלוגיקה לשמירת הפוסט
    console.log('Saving post:', post);
    alert('הפוסט נשמר בהצלחה ויפורסם באתר הנבחר!');
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">יצירת פוסט חדש</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* בחירת אתר */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 text-center">
              בחר אתר לפרסום
            </label>
            <select
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-center"
              value={post.websiteId}
              onChange={(e) => setPost({ ...post, websiteId: e.target.value })}
              required
            >
              <option value="">בחר אתר</option>
              {websites.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name}
                </option>
              ))}
            </select>
          </div>

          {/* כותרת */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 text-center">
              כותרת הפוסט
            </label>
            <input
              type="text"
              placeholder="הזן כותרת"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 text-xl text-center"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              dir="rtl"
              required
            />
          </div>

          {/* סרגל כלים */}
          <div className="flex gap-4 bg-gray-900 p-3 rounded-t-lg border-b border-gray-700 justify-center">
            <button type="button" className="p-2 hover:bg-gray-800 rounded" title="מודגש">
              <Bold size={20} />
            </button>
            <button type="button" className="p-2 hover:bg-gray-800 rounded" title="נטוי">
              <Italic size={20} />
            </button>
            <button type="button" className="p-2 hover:bg-gray-800 rounded" title="קישור">
              <Link size={20} />
            </button>
            <button type="button" className="p-2 hover:bg-gray-800 rounded" title="רשימה">
              <List size={20} />
            </button>
          </div>

          {/* תוכן */}
          <textarea
            placeholder="תוכן הפוסט"
            className="w-full bg-gray-900 border border-gray-700 rounded-b-lg p-4 min-h-[400px] text-right"
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            dir="rtl"
            required
          />

          {/* קטגוריה ותגיות */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 text-center">
                קטגוריה
              </label>
              <input
                type="text"
                placeholder="הזן קטגוריה"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-center"
                value={post.category}
                onChange={(e) => setPost({ ...post, category: e.target.value })}
                dir="rtl"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 text-center">
                תגיות
              </label>
              <input
                type="text"
                placeholder="הזן תגיות מופרדות בפסיקים"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-center"
                value={post.tags}
                onChange={(e) => setPost({ ...post, tags: e.target.value })}
                dir="rtl"
              />
            </div>
          </div>

          {/* העלאת תמונה */}
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <Image className="mx-auto mb-4" size={40} />
              <span className="text-gray-400">לחץ להעלאת תמונה ראשית</span>
              {post.featuredImage && (
                <p className="mt-2 text-green-500">
                  נבחרה תמונה: {post.featuredImage.name}
                </p>
              )}
            </label>
          </div>

          {/* כפתור שמירה */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:from-purple-700 hover:to-blue-700 transition-colors"
          >
            <Save size={20} />
            פרסם פוסט
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogPostEditor;
