import React, { useState, useEffect } from 'react';
import { 
  PenTool, BookOpen, Users, TrendingUp, Hash,
  MessageSquare, BarChart, Calendar, Filter,
  Settings, Bookmark, Share2, Globe, Layout
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BlogDashboard = () => {
  const [selectedSite, setSelectedSite] = useState<{ id: number; name: string; platform: string; domain: string; } | null>(null);
  const [sites, setSites] = useState([
    { id: 1, name: 'טכנולוגיה ועסקים', platform: 'wordpress', domain: 'tech-biz.com' },
    { id: 2, name: 'בלוג אישי', platform: 'react', domain: 'personal-blog.com' },
    { id: 3, name: 'חדשות דיגיטל', platform: 'wordpress', domain: 'digital-news.co.il' }
  ]);
  const [analytics, setAnalytics] = useState<Array<{ day: string; views: number; engagement: number; }>>([]);
  const [notifications, setNotifications] = useState<Array<{ type: string; message: string; }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications(prev => [...prev, generateNotification()].slice(-5));
      setAnalytics(generateAnalytics());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const generateNotification = () => {
    const notifications = [
      { type: 'wordpress', message: 'נדרש עדכון WordPress בtech-biz.com' },
      { type: 'comment', message: 'תגובות חדשות ב-3 אתרים ממתינות לאישור' },
      { type: 'security', message: 'התראת אבטחה: ניסיונות התחברות חשודים ב-digital-news.co.il' }
    ];
    return notifications[Math.floor(Math.random() * notifications.length)];
  };

  const generateAnalytics = () => {
    return Array.from({ length: 7 }, (_, i) => ({
      day: `יום ${i + 1}`,
      views: Math.floor(Math.random() * 1000 + 500),
      engagement: Math.floor(Math.random() * 100 + 50)
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6" dir="rtl">
      {/* Header with Site Selector */}
      <div className="mb-8 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">ניהול בלוגים מרכזי</h1>
            <div className="flex space-x-4 space-x-reverse">
              {sites.map(site => (
                <button
                  key={site.id}
                  onClick={() => setSelectedSite(site)}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    selectedSite?.id === site.id 
                      ? 'bg-purple-600' 
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  {site.platform === 'wordpress' ? (
                    <Layout className="h-4 w-4 ml-2" />
                  ) : (
                    <Globe className="h-4 w-4 ml-2" />
                  )}
                  {site.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex space-x-4 space-x-reverse">
            <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full flex items-center space-x-2 space-x-reverse">
              <PenTool className="h-5 w-5" />
              <span>פוסט חדש</span>
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-full flex items-center space-x-2 space-x-reverse">
              <Globe className="h-5 w-5" />
              <span>הוסף אתר</span>
            </button>
          </div>
        </div>
      </div>

      {/* Platform Overview */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {[
          { icon: Globe, title: 'סך אתרים', value: '3', details: '2 WordPress, 1 React' },
          { icon: BookOpen, title: 'סך פוסטים', value: '248', details: 'ב-3 אתרים' },
          { icon: Users, title: 'סך קוראים', value: '15.4K', details: '+22% החודש' },
          { icon: MessageSquare, title: 'תגובות להשבוע', value: '164', details: '82% מאושרות' }
        ].map((stat, index) => (
          <div key={index} className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
            <stat.icon className="h-6 w-6 text-purple-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-300">{stat.title}</h3>
            <p className="text-2xl font-bold mb-2">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.details}</p>
          </div>
        ))}
      </div>

      {/* Site Management and Analytics */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
          <h3 className="text-xl font-bold mb-6">מצב אתרים</h3>
          <div className="space-y-4">
            {sites.map(site => (
              <div key={site.id} className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {site.platform === 'wordpress' ? (
                      <Layout className="h-5 w-5 text-blue-400 ml-2" />
                    ) : (
                      <Globe className="h-5 w-5 text-purple-400 ml-2" />
                    )}
                    <span className="font-medium">{site.name}</span>
                  </div>
                  <span className="text-sm text-gray-400">{site.domain}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-400">פוסטים</div>
                    <div className="font-bold">84</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-400">תגובות</div>
                    <div className="font-bold">127</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-400">צפיות היום</div>
                    <div className="font-bold">1.2K</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <BarChart className="h-6 w-6 text-purple-400 ml-2" />
            ניתוח תנועה מרוכז
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ background: '#1F2937', border: 'none' }} />
                <Line type="monotone" dataKey="views" stroke="#8B5CF6" strokeWidth={2} />
                <Line type="monotone" dataKey="engagement" stroke="#EC4899" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* System Notifications */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
          <h3 className="text-xl font-bold mb-6">התראות מערכת</h3>
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div key={index} className="flex items-center space-x-4 space-x-reverse bg-gray-800 rounded-lg p-4">
                {notification.type === 'wordpress' ? (
                  <Layout className="h-5 w-5 text-blue-400" />
                ) : (
                  <MessageSquare className="h-5 w-5 text-purple-400" />
                )}
                <span>{notification.message}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
          <h3 className="text-xl font-bold mb-6">משימות מערכת</h3>
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-medium mb-2">עדכוני WordPress</h4>
              <div className="flex justify-between text-sm">
                <span>2 אתרים דורשים עדכון</span>
                <button className="text-purple-400 hover:text-purple-300">עדכן הכל</button>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-medium mb-2">גיבויים</h4>
              <div className="flex justify-between text-sm">
                <span>בוצע גיבוי לפני 3 שעות</span>
                <button className="text-purple-400 hover:text-purple-300">גבה עכשיו</button>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-medium mb-2">אבטחה</h4>
              <div className="flex justify-between text-sm">
                <span>3 התראות חדשות</span>
                <button className="text-purple-400 hover:text-purple-300">סקירה</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
        <h3 className="text-xl font-bold mb-6">פעולות מהירות</h3>
        <div className="grid grid-cols-6 gap-4">
          {[
            { icon: Filter, title: 'ניהול תוכן' },
            { icon: Hash, title: 'תגיות' },
            { icon: Share2, title: 'הפצת תוכן' },
            { icon: Settings, title: 'הגדרות' },
            { icon: Layout, title: 'ניהול WordPress' },
            { icon: Globe, title: 'ניהול דומיינים' }
          ].map((action, index) => (
            <button key={index} className="bg-gray-800 hover:bg-gray-700 rounded-xl p-4 transition-all">
              <action.icon className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <span className="text-sm">{action.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDashboard;
