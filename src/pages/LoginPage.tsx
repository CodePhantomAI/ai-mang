import React, { useState } from 'react';
import { 
  User, Lock, EyeOff, Eye, Shield,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // בדיקת פרטי התחברות
    if (formData.email === 'admin@example.com' && formData.password === 'Admin123!') {
      setTimeout(() => {
        navigate('/dashboard');
        setIsLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setError('שם משתמש או סיסמה שגויים');
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold">ברוכים הבאים</h1>
          <p className="text-gray-400 mt-2">התחבר למערכת הניהול</p>
        </div>

        {/* Login Form */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-gray-400 mb-2">אימייל</label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-4 pr-10 py-3 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  placeholder="הכנס את האימייל שלך"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  dir="rtl"
                />
                <User className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-400 mb-2">סיסמה</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-4 pr-10 py-3 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  placeholder="הכנס את הסיסמה שלך"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  dir="rtl"
                />
                <button
                  type="button"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-gray-300 rounded focus:ring-purple-500 text-purple-600"
                />
                <span>זכור אותי</span>
              </label>
              <button type="button" className="text-purple-400 hover:text-purple-300">
                שכחת סיסמה?
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/30 text-red-400 px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg flex items-center justify-center space-x-2 space-x-reverse transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                <>
                  <Lock className="h-5 w-5" />
                  <span>התחבר</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-gray-400">
            אין לך חשבון?{' '}
            <button className="text-purple-400 hover:text-purple-300">
              צור חשבון חדש
            </button>
          </p>
          <div className="flex justify-center space-x-4 space-x-reverse text-gray-500 text-sm">
            <button className="hover:text-gray-400">תנאי שימוש</button>
            <span>•</span>
            <button className="hover:text-gray-400">מדיניות פרטיות</button>
            <span>•</span>
            <button className="hover:text-gray-400">עזרה</button>
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-purple-600 rounded-full filter blur-3xl opacity-10 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-blue-600 rounded-full filter blur-3xl opacity-10 transform translate-x-1/2 translate-y-1/2"></div>
      </div>
    </div>
  );
};

export default LoginPage;