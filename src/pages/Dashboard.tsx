import { useState, useEffect } from 'react';
import { 
  Activity, Shield, Zap, Server, 
  Users, Lock, Cloud, Database, 
  Maximize, Terminal
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [isAIMode, setIsAIMode] = useState(false);
  
  // נתונים סימולטיביים בזמן אמת
  const [metrics, setMetrics] = useState({
    activeUsers: 1234,
    serverLoad: 45,
    securityScore: 92,
    uptime: 99.99,
    totalTraffic: '2.4TB'
  });

  // אפקט למצב AI
  useEffect(() => {
    if (isAIMode) {
      const interval = setInterval(() => {
        setMetrics(prev => ({
          ...prev,
          serverLoad: Math.max(prev.serverLoad - 2, 25),
          securityScore: Math.min(prev.securityScore + 1, 98)
        }));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isAIMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      {/* כותרת */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">מערכת ניהול חכמה</h1>
          <p className="text-gray-400">גרסה 2.0 - מופעלת על ידי AI</p>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <button 
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse transition-all
              ${isAIMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => setIsAIMode(!isAIMode)}
          >
            <Zap className={`h-5 w-5 ${isAIMode ? 'text-yellow-300' : 'text-gray-300'}`} />
            <span>מצב AI {isAIMode ? 'פעיל' : 'כבוי'}</span>
          </button>
          <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all">
            <Maximize className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* סטטיסטיקות ראשיות */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">משתמשים פעילים</h3>
            <Users className="h-6 w-6 text-blue-400" />
          </div>
          <p className="text-3xl font-bold">{metrics.activeUsers}</p>
          <div className="mt-4">
            <div className="h-2 bg-gray-700 rounded-full">
              <div className="h-2 bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">עומס שרתים</h3>
            <Server className="h-6 w-6 text-green-400" />
          </div>
          <p className="text-3xl font-bold">{metrics.serverLoad}%</p>
          <div className="mt-4">
            <div className="h-2 bg-gray-700 rounded-full">
              <div 
                className="h-2 bg-green-500 rounded-full transition-all duration-500" 
                style={{ width: `${metrics.serverLoad}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">ציון אבטחה</h3>
            <Shield className="h-6 w-6 text-purple-400" />
          </div>
          <p className="text-3xl font-bold">{metrics.securityScore}/100</p>
          <div className="mt-4">
            <div className="h-2 bg-gray-700 rounded-full">
              <div 
                className="h-2 bg-purple-500 rounded-full transition-all duration-500" 
                style={{ width: `${metrics.securityScore}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">זמן פעילות</h3>
            <Activity className="h-6 w-6 text-red-400" />
          </div>
          <p className="text-3xl font-bold">{metrics.uptime}%</p>
          <div className="mt-4">
            <div className="h-2 bg-gray-700 rounded-full">
              <div className="h-2 bg-red-500 rounded-full" style={{ width: '99.9%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* חלון טרמינל */}
      <div className="bg-gray-900 rounded-xl border border-gray-700 mb-8">
        <div className="flex items-center justify-between border-b border-gray-700 p-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Terminal className="h-5 w-5 text-gray-400" />
            <span className="text-gray-400">טרמינל חכם</span>
          </div>
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="p-4 font-mono text-sm">
          <p className="text-green-400">$ AI מערכת ניטור פעילה</p>
          <p className="text-gray-400">{'>'} מבצע אופטימיזציה אוטומטית...</p>
          <p className="text-blue-400">{'>'} זוהו 3 אתרים הדורשים עדכוני אבטחה</p>
          <p className="text-purple-400">{'>'} מתחיל סריקת אבטחה יומית...</p>
        </div>
      </div>

      {/* גרף ביצועים */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold mb-6">ביצועי מערכת</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[
                { time: '00:00', load: 45, security: 88, traffic: 100 },
                { time: '04:00', load: 42, security: 90, traffic: 110 },
                { time: '08:00', load: 48, security: 92, traffic: 140 },
                { time: '12:00', load: 50, security: 91, traffic: 160 },
                { time: '16:00', load: 45, security: 93, traffic: 150 },
                { time: '20:00', load: 40, security: 95, traffic: 130 }
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ background: '#1F2937', border: 'none' }} />
              <Legend />
              <Line type="monotone" dataKey="load" stroke="#10B981" name="עומס" />
              <Line type="monotone" dataKey="security" stroke="#8B5CF6" name="אבטחה" />
              <Line type="monotone" dataKey="traffic" stroke="#3B82F6" name="תעבורה" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* פעולות מהירות */}
      <div className="flex space-x-4 space-x-reverse mt-8">
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse transition-all">
          <Cloud className="h-5 w-5" />
          <span>גיבוי מיידי</span>
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse transition-all">
          <Lock className="h-5 w-5" />
          <span>סריקת אבטחה</span>
        </button>
        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse transition-all">
          <Database className="h-5 w-5" />
          <span>אופטימיזציה</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
