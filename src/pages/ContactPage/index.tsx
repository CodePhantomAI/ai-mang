import { useState } from 'react';
import { X, LayoutDashboard, Edit, Users, MessageSquare, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <h1 className="text-3xl font-bold">צור קשר</h1>
          </div>

          <div className="text-xl mb-4">שם מלא</div>
          <div className="bg-gray-800 rounded-xl p-4 mb-8">
            <input
              type="text"
              className="w-full bg-transparent outline-none text-xl"
              placeholder="הכנס שם מלא"
            />
          </div>

          <div className="text-xl mb-4">אימייל</div>
          <div className="bg-gray-800 rounded-xl p-4 mb-8">
            <input
              type="email"
              className="w-full bg-transparent outline-none text-xl"
              placeholder="הכנס כתובת אימייל"
            />
          </div>

          <div className="text-xl mb-4">הודעה</div>
          <div className="bg-gray-800 rounded-xl p-4 mb-8">
            <textarea
              className="w-full bg-transparent outline-none text-xl min-h-[150px] resize-none"
              placeholder="כתוב את ההודעה שלך כאן"
            />
          </div>

          <button className="w-full bg-purple-600 text-white py-4 rounded-xl text-xl font-medium hover:bg-purple-700 transition-colors">
            שלח הודעה
          </button>
        </div>
      </div>

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
                    className="flex items-center justify-end space-x-4 space-x-reverse text-xl hover:text-purple-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{item.text}</span>
                    <item.icon className="w-6 h-6" />
                  </Link>
                ))}
              </nav>

              <div className="mt-16">
                <button className="w-full bg-purple-600 text-white py-4 rounded-xl text-xl font-medium hover:bg-purple-700 transition-colors">
                  צור קשר
                </button>
              </div>

              <div className="mt-8">
                <button className="w-full bg-indigo-900 text-white py-4 rounded-xl text-xl font-medium hover:bg-indigo-800 transition-colors">
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