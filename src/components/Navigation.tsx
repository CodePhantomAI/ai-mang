import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { OrganizationSelector } from './OrganizationSelector';
import {
  LayoutDashboard,
  FileEdit,
  Users,
  Globe,
  Mail,
  LogOut,
  X,
  Send,
  Smartphone,
  BookOpen
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

const Navigation = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('התנתקת בהצלחה');
    } catch (error) {
      toast.error('אירעה שגיאה בהתנתקות');
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* כפתור המבורגר */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 p-2 text-white bg-gray-900 rounded-lg lg:hidden z-50"
        aria-label="פתח תפריט"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* רקע מטושטש */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* תפריט ניווט */}
      <nav className={`
        fixed h-full w-[280px] bg-gray-900 text-white overflow-y-auto z-40
        lg:relative lg:w-64 lg:h-screen lg:z-30
        ${isOpen 
          ? 'top-0 right-0 translate-x-0' 
          : 'top-0 right-0 translate-x-full lg:translate-x-0'
        }
        transform transition-transform duration-300 ease-in-out
      `}>
        <div className="flex flex-col h-full p-4">
          {/* לוגו והגדרות */}
          <div className="mb-8 mt-2">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">מערכת ניהול</h1>
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="סגור תפריט"
              >
                <X size={20} />
              </button>
            </div>
            <OrganizationSelector />
          </div>

          {/* תפריט ראשי */}
          <div className="flex-1 space-y-1">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center space-x-2 space-x-reverse p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>דשבורד</span>
            </NavLink>

            <NavLink
              to="/mobile-dashboard"
              className={({ isActive }) =>
                `flex items-center space-x-2 space-x-reverse p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <Smartphone className="h-5 w-5" />
              <span>דשבורד מובייל</span>
            </NavLink>

            <NavLink
              to="/blog-dashboard"
              className={({ isActive }) =>
                `flex items-center space-x-2 space-x-reverse p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <BookOpen className="h-5 w-5" />
              <span>ניהול בלוגים</span>
            </NavLink>

            <NavLink
              to="/editor"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <FileEdit size={20} />
              <span>יצירת פוסט</span>
            </NavLink>

            <NavLink
              to="/leads"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <Users size={20} />
              <span>ניהול לידים</span>
            </NavLink>

            <NavLink
              to="/websites"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <Globe size={20} />
              <span>ניהול אתרים</span>
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <Mail size={20} />
              <span>צור קשר</span>
            </NavLink>
          </div>

          {/* כפתורי פעולה */}
          <div className="mt-4 space-y-2">
            <button
              className="w-full p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
              onClick={() => {/* הוסף פעולה */}}
            >
              <Mail size={20} />
              <span>צור קשר</span>
            </button>
            
            <button
              className="w-full p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
              onClick={() => {/* הוסף פעולה */}}
            >
              <Send size={20} />
              <span>שלח הודעה</span>
            </button>
          </div>

          {/* פרטי משתמש והתנתקות */}
          <div className="mt-auto pt-4 border-t border-gray-800">
            <div className="flex items-center mb-4">
              <div className="flex-1">
                <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
                <p className="text-sm text-gray-400">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-3 w-full p-3 rounded-lg text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors"
            >
              <LogOut size={20} />
              <span>התנתק</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
