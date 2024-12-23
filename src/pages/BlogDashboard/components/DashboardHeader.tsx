import React from 'react';
import { Plus } from 'lucide-react';

const DashboardHeader = () => {
  return (
    <div className="relative mb-8 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 rounded-2xl p-8 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      </div>
      
      <div className="relative">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">ניהול הבלוג</h1>
            <p className="text-purple-300">ממשק ניהול מתקדם</p>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full flex items-center space-x-2 space-x-reverse transition-all">
            <Plus className="h-5 w-5" />
            <span>פוסט חדש</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;