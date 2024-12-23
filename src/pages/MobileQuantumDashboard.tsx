import { useState, useEffect } from 'react';
import { 
  Brain, Shield, Zap, Activity, Settings, 
  Signal, Wifi, Battery, Monitor,
  Fingerprint, Lock, Eye, Radio, Download
} from 'lucide-react';

const MobileQuantumDashboard = () => {
  const [isCharging, setIsCharging] = useState(false);
  const [systemHealth, setSystemHealth] = useState(95);
  const [notifications, setNotifications] = useState<Array<{ id: number; type: string; message: string }>>([]);
  const [currentView, setCurrentView] = useState('main');

  useEffect(() => {
    // Simulate system updates
    const interval = setInterval(() => {
      setSystemHealth(prev => Math.min(prev + Math.random() * 5, 100));
      addNotification();
    }, 5000);

    // Simulate battery charging
    const chargingInterval = setInterval(() => {
      setIsCharging(prev => !prev);
    }, 8000);

    return () => {
      clearInterval(interval);
      clearInterval(chargingInterval);
    };
  }, []);

  const addNotification = () => {
    const newNotification = {
      id: Date.now(),
      type: ['security', 'performance', 'update'][Math.floor(Math.random() * 3)],
      message: 'עדכון מערכת חדש זמין'
    };
    setNotifications(prev => [newNotification, ...prev].slice(0, 5));
  };

  return (
    <div className="min-h-screen bg-black text-white" dir="rtl">
      {/* Status Bar */}
      <div className="bg-gray-900 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 space-x-reverse">
          <Signal className="h-4 w-4 text-green-400" />
          <Wifi className="h-4 w-4 text-blue-400" />
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <Battery className={`h-4 w-4 ${isCharging ? 'text-green-400' : 'text-gray-400'}`} />
          <span className="text-sm">92%</span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-b from-purple-900 to-black p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">מערכת קוונטית</h1>
            <p className="text-blue-400 text-sm">גרסה 2.0 לנייד</p>
          </div>
          <button className="p-2 bg-blue-600 rounded-full">
            <Brain className="h-6 w-6" />
          </button>
        </div>

        {/* System Health Card */}
        <div className="bg-gray-900 rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">בריאות מערכת</span>
            <span className="text-blue-400 font-bold">{systemHealth}%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: `${systemHealth}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-4 p-4 bg-gray-900">
        {[
          { icon: Shield, label: 'אבטחה', color: 'text-purple-400' },
          { icon: Zap, label: 'ביצועים', color: 'text-yellow-400' },
          { icon: Activity, label: 'ניטור', color: 'text-green-400' },
          { icon: Settings, label: 'הגדרות', color: 'text-blue-400' }
        ].map((action, index) => (
          <button 
            key={index}
            className="flex flex-col items-center space-y-1 p-2"
          >
            <action.icon className={`h-6 w-6 ${action.color}`} />
            <span className="text-xs">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Security Card */}
        <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">אבטחה קוונטית</h3>
            <Lock className="h-5 w-5 text-purple-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black bg-opacity-30 rounded-xl p-3">
              <Fingerprint className="h-5 w-5 text-purple-400 mb-2" />
              <span className="text-sm">זיהוי ביומטרי פעיל</span>
            </div>
            <div className="bg-black bg-opacity-30 rounded-xl p-3">
              <Eye className="h-5 w-5 text-blue-400 mb-2" />
              <span className="text-sm">הגנת AI פעילה</span>
            </div>
          </div>
        </div>

        {/* Performance Card */}
        <div className="bg-gray-900 rounded-2xl p-4">
          <h3 className="font-bold mb-4">ביצועי מערכת</h3>
          <div className="space-y-4">
            {[
              { label: 'מעבד', value: 45, color: 'bg-green-600' },
              { label: 'זיכרון', value: 62, color: 'bg-blue-600' },
              { label: 'רשת', value: 78, color: 'bg-purple-600' }
            ].map((metric, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">{metric.label}</span>
                  <span className="text-sm">{metric.value}%</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${metric.color} transition-all duration-500`}
                    style={{ width: `${metric.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-gray-900 rounded-2xl p-4">
          <h3 className="font-bold mb-4">התראות מערכת</h3>
          <div className="space-y-3">
            {notifications.map(notification => (
              <div 
                key={notification.id}
                className="flex items-center space-x-3 space-x-reverse bg-gray-800 rounded-lg p-3"
              >
                <Radio className="h-4 w-4 text-blue-400" />
                <span className="text-sm">{notification.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
        <div className="flex justify-around p-4">
          {[
            { icon: Monitor, label: 'ראשי' },
            { icon: Shield, label: 'אבטחה' },
            { icon: Activity, label: 'ניטור' },
            { icon: Download, label: 'עדכונים' }
          ].map((item, index) => (
            <button 
              key={index}
              className="flex flex-col items-center space-y-1"
              onClick={() => setCurrentView(item.label)}
            >
              <item.icon className={`h-6 w-6 ${currentView === item.label ? 'text-blue-400' : 'text-gray-400'}`} />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileQuantumDashboard;
