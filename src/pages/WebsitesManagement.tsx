import { useState, useEffect } from 'react';
import { Plus, Trash2, Link as LinkIcon } from 'lucide-react';

interface Website {
  id: string;
  name: string;
  url: string;
  description: string;
}

const WebsitesManagement = () => {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWebsite, setNewWebsite] = useState<Website>({
    id: '',
    name: '',
    url: '',
    description: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const storedWebsites = localStorage.getItem('websites');
    if (storedWebsites) {
      setWebsites(JSON.parse(storedWebsites));
    }
  }, []);

  const handleAddWebsite = () => {
    if (!newWebsite.name.trim() || !newWebsite.url.trim()) {
      setError('יש למלא שם ואתר');
      return;
    }

    try {
      new URL(newWebsite.url); 
    } catch {
      setError('כתובת האתר אינה תקינה');
      return;
    }

    const websiteWithId = {
      ...newWebsite,
      id: `website_${Date.now()}`
    };

    const updatedWebsites = [...websites, websiteWithId];
    localStorage.setItem('websites', JSON.stringify(updatedWebsites));
    setWebsites(updatedWebsites);

    setNewWebsite({ id: '', name: '', url: '', description: '' });
    setShowAddModal(false);
    setError('');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק אתר זה?')) {
      const updatedWebsites = websites.filter(website => website.id !== id);
      localStorage.setItem('websites', JSON.stringify(updatedWebsites));
      setWebsites(updatedWebsites);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ניהול אתרים</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          <span>הוסף אתר חדש</span>
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {websites.map((website) => (
          <div key={website.id} className="card group">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  {website.name}
                  <a 
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-400 transition-colors"
                  >
                    <LinkIcon size={16} />
                  </a>
                </h2>
                <p className="text-gray-400">{website.description}</p>
              </div>
              <button
                onClick={() => handleDelete(website.id)}
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="מחק אתר"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="space-y-2">
              <div className="bg-gray-900 rounded-lg p-3">
                <div className="text-sm text-gray-400 mb-1">טופס יצירת קשר</div>
                <button className="btn btn-secondary w-full">העבר קוד</button>
              </div>
              <div className="bg-gray-900 rounded-lg p-3">
                <div className="text-sm text-gray-400 mb-1">בלוג</div>
                <button className="btn btn-secondary w-full">העבר קוד</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center">הוספת אתר חדש</h2>
            
            {error && (
              <div className="bg-red-900/50 text-red-300 px-4 py-2 rounded-lg mb-4 text-center">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 text-center">
                  שם האתר
                </label>
                <input
                  type="text"
                  value={newWebsite.name}
                  onChange={(e) => setNewWebsite({ ...newWebsite, name: e.target.value })}
                  placeholder="הזן את שם האתר"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 text-center">
                  כתובת האתר
                </label>
                <input
                  type="url"
                  value={newWebsite.url}
                  onChange={(e) => setNewWebsite({ ...newWebsite, url: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 text-center">
                  תיאור (אופציונלי)
                </label>
                <textarea
                  value={newWebsite.description}
                  onChange={(e) => setNewWebsite({ ...newWebsite, description: e.target.value })}
                  placeholder="הוסף תיאור קצר לאתר"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                />
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setError('');
                }}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                ביטול
              </button>
              <button
                onClick={handleAddWebsite}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              >
                הוסף אתר
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsitesManagement;
