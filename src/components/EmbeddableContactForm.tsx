import { useState } from 'react';
import { X } from 'lucide-react';

interface EmbeddableContactFormProps {
  websiteId: string;
  websiteName: string;
  onClose?: () => void;
  darkMode?: boolean;
}

const EmbeddableContactForm = ({ websiteId, websiteName, onClose, darkMode = true }: EmbeddableContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // יצירת ליד חדש
    const newLead = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      status: 'חדש',
      source: websiteName,
      date: new Date().toLocaleDateString('he-IL'),
      priority: 'גבוה',
      websiteId
    };

    try {
      // שמירה ב-localStorage
      const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]');
      const updatedLeads = [newLead, ...existingLeads];
      localStorage.setItem('leads', JSON.stringify(updatedLeads));

      // איפוס הטופס והצגת הודעת הצלחה
      setFormData({ name: '', email: '', phone: '', message: '' });
      setIsSubmitted(true);

      // איפוס הודעת ההצלחה אחרי 3 שניות
      setTimeout(() => {
        setIsSubmitted(false);
        if (onClose) onClose();
      }, 3000);
    } catch (error) {
      console.error('Error saving lead:', error);
      alert('אירעה שגיאה בשליחת הטופס. אנא נסה שוב.');
    }
  };

  const baseInputClass = `w-full px-4 py-2 rounded-lg ${
    darkMode 
      ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-400'
      : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'
  }`;

  const baseLabelClass = `block text-sm font-medium mb-1 text-center ${
    darkMode ? 'text-gray-300' : 'text-gray-700'
  }`;

  return (
    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-center flex-grow">צור קשר</h2>
        {onClose && (
          <button 
            onClick={onClose}
            className={`p-2 rounded-full hover:bg-opacity-10 ${
              darkMode ? 'hover:bg-white' : 'hover:bg-black'
            }`}
          >
            <X size={24} />
          </button>
        )}
      </div>

      {isSubmitted ? (
        <div className="text-center py-8">
          <div className={`text-lg font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
            ההודעה נשלחה בהצלחה!
          </div>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            נציג יצור איתך קשר בהקדם
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
          <div>
            <label htmlFor="name" className={baseLabelClass}>
              שם מלא
            </label>
            <input
              type="text"
              id="name"
              required
              className={baseInputClass}
              placeholder="הכנס את שמך"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="email" className={baseLabelClass}>
              אימייל
            </label>
            <input
              type="email"
              id="email"
              required
              className={baseInputClass}
              placeholder="הכנס את האימייל שלך"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="phone" className={baseLabelClass}>
              טלפון
            </label>
            <input
              type="tel"
              id="phone"
              required
              className={baseInputClass}
              placeholder="הכנס את מספר הטלפון שלך"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="message" className={baseLabelClass}>
              הודעה
            </label>
            <textarea
              id="message"
              required
              className={`${baseInputClass} h-32 resize-none`}
              placeholder="הכנס את ההודעה שלך"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            שלח הודעה
          </button>
        </form>
      )}
    </div>
  );
};

export default EmbeddableContactForm;
