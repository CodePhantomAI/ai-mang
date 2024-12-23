import { useState } from 'react';
import EmbeddableContactForm from '../components/EmbeddableContactForm';

const EmbeddableFormDemo = () => {
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const [showEmbedCode, setShowEmbedCode] = useState(false);

  // קוד ההטמעה לדוגמה
  const embedCode = `
<!-- הוסף את הקוד הבא לאתר שלך -->
<div id="contact-form-container"></div>
<script src="https://your-domain.com/embed-form.js"></script>
<script>
  initContactForm({
    container: 'contact-form-container',
    websiteId: 'YOUR_WEBSITE_ID',
    websiteName: 'YOUR_WEBSITE_NAME',
    darkMode: ${selectedTheme === 'dark'}
  });
</script>
  `.trim();

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">טופס צור קשר להטמעה</h1>
          <p className="text-gray-400 mb-4">
            צפה בתצוגה מקדימה של הטופס וקבל את קוד ההטמעה
          </p>
        </div>

        {/* אפשרויות התאמה */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">הגדרות</h2>
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

        {/* תצוגה מקדימה */}
        <div className={`rounded-lg p-8 mb-8 ${
          selectedTheme === 'dark' ? 'bg-gray-900' : 'bg-white'
        }`}>
          <h2 className={`text-xl font-semibold mb-4 text-center ${
            selectedTheme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            תצוגה מקדימה
          </h2>
          <EmbeddableContactForm
            websiteId="demo-site"
            websiteName="אתר לדוגמה"
            darkMode={selectedTheme === 'dark'}
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
              <li>הדבק אותו בדף האתר שלך במקום שבו תרצה שהטופס יופיע</li>
              <li>החלף את YOUR_WEBSITE_ID ו-YOUR_WEBSITE_NAME בערכים המתאימים</li>
              <li>התאם את darkMode לפי הצורך</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbeddableFormDemo;
