import { LayoutDashboard, Edit, Users, MessageSquare, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactInfo = () => {
  const menuItems = [
    { icon: LayoutDashboard, text: 'דשבורד', link: '/dashboard' },
    { icon: Edit, text: 'יצירת פוסט', link: '/create-post' },
    { icon: Users, text: 'ניהול לידים', link: '/leads' },
    { icon: MessageSquare, text: 'צור קשר', link: '/contact' },
    { icon: LogOut, text: 'התנתק', link: '/logout' }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end mb-8">
          <button className="bg-gray-800 p-3 rounded-lg">
            <span className="sr-only">Close menu</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="space-y-8">
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.link}
              className="flex items-center justify-end space-x-4 space-x-reverse text-xl hover:text-purple-400 transition-colors"
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
  );
};

export default ContactInfo;