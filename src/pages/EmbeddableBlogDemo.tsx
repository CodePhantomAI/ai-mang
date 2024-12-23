import { useState } from 'react';
import EmbeddableBlogPosts from '../components/EmbeddableBlogPosts';

const EmbeddableBlogDemo = () => {
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const [showCategories, setShowCategories] = useState(true);
  const [showTags, setShowTags] = useState(true);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [showEmbedCode, setShowEmbedCode] = useState(false);

  // קוד ההטמעה לדוגמה
  const embedCode = `
<!-- הוסף את הקוד הבא לאתר שלך -->
<div id="blog-posts-container"></div>
<script src="https://your-domain.com/embed-blog.js"></script>
<script>
  initBlogPosts({
    container: 'blog-posts-container',
    websiteId: 'YOUR_WEBSITE_ID',
    websiteName: 'YOUR_WEBSITE_NAME',
    darkMode: ${selectedTheme === 'dark'},
    postsPerPage: ${postsPerPage},
    showCategories: ${showCategories},
    showTags: ${showTags}
  });
</script>
  `.trim();

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">תצוגת בלוג להטמעה</h1>
          <p className="text-gray-400 mb-4">
            צפה בתצוגה מקדימה של הבלוג וקבל את קוד ההטמעה
          </p>
        </div>

        {/* אפשרויות התאמה */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">הגדרות</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* מצב תצוגה */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 text-center">
                מצב תצוגה
              </label>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setSelectedTheme('dark')}
                  className={`px-4 py-2 rounded-lg ${
                    selectedTheme === 'dark'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  מצב כהה
                </button>
                <button
                  onClick={() => setSelectedTheme('light')}
                  className={`px-4 py-2 rounded-lg ${
                    selectedTheme === 'light'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  מצב בהיר
                </button>
              </div>
            </div>

            {/* פוסטים בעמוד */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 text-center">
                פוסטים בעמוד
              </label>
              <div className="flex justify-center gap-4">
                {[3, 6, 9, 12].map(num => (
                  <button
                    key={num}
                    onClick={() => setPostsPerPage(num)}
                    className={`px-4 py-2 rounded-lg ${
                      postsPerPage === num
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-400'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* הצג קטגוריות */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 text-center">
                הצג קטגוריות
              </label>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowCategories(true)}
                  className={`px-4 py-2 rounded-lg ${
                    showCategories
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  כן
                </button>
                <button
                  onClick={() => setShowCategories(false)}
                  className={`px-4 py-2 rounded-lg ${
                    !showCategories
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  לא
                </button>
              </div>
            </div>

            {/* הצג תגיות */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 text-center">
                הצג תגיות
              </label>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowTags(true)}
                  className={`px-4 py-2 rounded-lg ${
                    showTags
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  כן
                </button>
                <button
                  onClick={() => setShowTags(false)}
                  className={`px-4 py-2 rounded-lg ${
                    !showTags
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  לא
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* תצוגה מקדימה */}
        <div className={`rounded-lg overflow-hidden mb-8 ${
          selectedTheme === 'dark' ? 'bg-gray-900' : 'bg-white'
        }`}>
          <h2 className={`text-xl font-semibold p-6 text-center ${
            selectedTheme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            תצוגה מקדימה
          </h2>
          <EmbeddableBlogPosts
            websiteId="demo-site"
            websiteName="אתר לדוגמה"
            darkMode={selectedTheme === 'dark'}
            postsPerPage={postsPerPage}
            showCategories={showCategories}
            showTags={showTags}
          />
        </div>

        {/* קוד הטמעה */}
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">קוד הטמעה</h2>
            <button
              onClick={() => setShowEmbedCode(!showEmbedCode)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              {showEmbedCode ? 'הסתר קוד' : 'הצג קוד'}
            </button>
          </div>
          
          {showEmbedCode && (
            <div className="relative">
              <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                <code className="text-gray-300">{embedCode}</code>
              </pre>
              <button
                onClick={() => navigator.clipboard.writeText(embedCode)}
                className="absolute top-2 right-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
              >
                העתק
              </button>
            </div>
          )}

          <div className="mt-4 text-gray-400">
            <h3 className="font-semibold mb-2">הוראות הטמעה:</h3>
            <ol className="list-decimal list-inside space-y-2 text-right">
              <li>העתק את הקוד למעלה</li>
              <li>הדבק אותו בדף האתר שלך במקום שבו תרצה שהבלוג יופיע</li>
              <li>החלף את YOUR_WEBSITE_ID ו-YOUR_WEBSITE_NAME בערכים המתאימים</li>
              <li>התאם את האפשרויות לפי הצורך (מצב כהה/בהיר, מספר פוסטים וכו')</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbeddableBlogDemo;
