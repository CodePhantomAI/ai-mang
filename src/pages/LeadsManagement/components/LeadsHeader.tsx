import React from 'react';
import { Users, RefreshCw, Filter } from 'lucide-react';

const LeadsHeader = ({ totalLeads }: { totalLeads: number }) => {
  return (
    <div className="relative mb-8 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 rounded-2xl p-8">
      <div className="relative">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">ניהול לידים</h1>
            <p className="text-purple-300 flex items-center">
              <Users className="h-5 w-5 ml-2" />
              סה"כ {totalLeads} לידים פעילים
            </p>
          </div>
          <div className="flex space-x-4 space-x-reverse">
            <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full flex items-center space-x-2 space-x-reverse">
              <RefreshCw className="h-5 w-5" />
              <span>רענן</span>
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full flex items-center space-x-2 space-x-reverse">
              <Filter className="h-5 w-5" />
              <span>סינון מתקדם</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsHeader;