import { useState } from 'react';
import { Phone, Globe, X, LayoutDashboard, Edit, Users, MessageSquare, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  source: string;
  date: string;
  priority: string;
}

const ContactPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new lead
    const newLead: Lead = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      status: 'חדש',
      source: 'טופס צור קשר',
      date: new Date().toLocaleDateString('he-IL'),
      priority: 'גבוה'
    };

    // Get existing leads from localStorage
    const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]');
    
    // Add new lead
    const updatedLeads = [newLead, ...existingLeads];
    
    // Save to localStorage
    localStorage.setItem('leads', JSON.stringify(updatedLeads));

    // Reset form and close modal
    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsModalOpen(false);

    // Show success message
    alert('ההודעה נשלחה בהצלחה!');
    
    // Navigate to leads page
    navigate('/leads');
  };

  const menuItems = [
    { icon: LayoutDashboard, text: 'דשבורד', link: '/dashboard' },
    { icon: Edit, text: 'יצירת פוסט', link: '/create-post' },
    { icon: Users, text: 'ניהול לידים', link: '/leads' },
    { icon: MessageSquare, text: 'צור קשר', link: '/contact' },
    { icon: LogOut, text: 'התנתק', link: '/logout' }
  ];

  return (
    <div className="min-h-screen bg-black text-white" dir="rtl">
      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="text-gray-400 hover:text-white"
            >
              <span className="sr-only">Open menu</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-3xl font-bold text-center flex-grow">צור קשר</h1>
          </div>

          {/* פרטי התקשרות */}
          <div className="space-y-8">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold mb-6 text-center">פרטי התקשרות</h2>
              <div className="space-y-6">
                <a href="tel:+447403685175" className="flex flex-col items-center gap-4 hover:text-purple-400 transition-colors">
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <Globe size={24} />
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium">WORLD WIDE</h3>
                    <p className="text-gray-400 hover:text-purple-400" dir="ltr">+44 7403 685175</p>
                  </div>
                </a>
                
                <a href="tel:+97250422892" className="flex flex-col items-center gap-4 hover:text-purple-400 transition-colors">
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <Phone size={24} />
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium">MIDDLE EAST</h3>
                    <p className="text-gray-400 hover:text-purple-400" dir="ltr">+972 50 4228925</p>
                  </div>
                </a>
                
                <a 
                  href="https://pulsemindai.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-center mt-4 hover:text-purple-400 transition-colors"
                >
                  <p className="text-gray-400">PulseMind AI – חזון, חדשנות ואנושיות בשירות אחד</p>
                </a>
              </div>
            </div>

            {/* שעות פעילות */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold mb-6 text-center">שעות פעילות</h2>
              <div className="space-y-3">
                <div className="flex justify-center">
                  <div className="flex flex-col items-center">
                    <span>ראשון - חמישי</span>
                    <span className="text-gray-400">9:00 - 18:00</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="flex flex-col items-center">
                    <span>שישי</span>
                    <span className="text-gray-400">9:00 - 13:00</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="flex flex-col items-center">
                    <span>שבת</span>
                    <span className="text-gray-400">סגור</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-purple-600 text-white py-4 rounded-xl text-xl font-medium hover:bg-purple-700 transition-colors"
            >
              שלח הודעה
            </button>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute left-4 top-4 bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold mb-8 text-center">שלח הודעה</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xl mb-2">שם מלא</label>
                <input
                  type="text"
                  className="w-full bg-gray-800 rounded-xl p-4 text-xl outline-none"
                  placeholder="הכנס שם מלא"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-xl mb-2">אימייל</label>
                <input
                  type="email"
                  className="w-full bg-gray-800 rounded-xl p-4 text-xl outline-none"
                  placeholder="הכנס כתובת אימייל"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-xl mb-2">טלפון</label>
                <input
                  type="tel"
                  className="w-full bg-gray-800 rounded-xl p-4 text-xl outline-none"
                  placeholder="הכנס מספר טלפון"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-xl mb-2">הודעה</label>
                <textarea
                  className="w-full bg-gray-800 rounded-xl p-4 text-xl min-h-[150px] outline-none resize-none"
                  placeholder="כתוב את ההודעה שלך כאן"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-purple-600 text-white py-4 rounded-xl text-xl font-medium hover:bg-purple-700 transition-colors mt-8"
              >
                שלח הודעה
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Slide-over Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-black shadow-xl">
            <div className="p-6">
              <div className="flex justify-end mb-8">
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-gray-800 p-3 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="space-y-8">
                {menuItems.map((item, index) => (
                  <Link 
                    key={index} 
                    to={item.link}
                    className="flex items-center justify-center space-x-4 space-x-reverse text-xl hover:text-purple-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{item.text}</span>
                    <item.icon className="w-6 h-6" />
                  </Link>
                ))}
              </nav>

              <div className="mt-16">
                <button className="w-full bg-purple-600 text-white py-4 rounded-xl text-xl font-medium hover:bg-purple-700 transition-colors text-center">
                  צור קשר
                </button>
              </div>

              <div className="mt-8">
                <button className="w-full bg-indigo-900 text-white py-4 rounded-xl text-xl font-medium hover:bg-indigo-800 transition-colors text-center">
                  שלח הודעה
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
