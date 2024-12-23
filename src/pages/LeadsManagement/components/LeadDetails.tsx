import React from 'react';
import { Users, Mail, Phone } from 'lucide-react';
import { Lead } from '../types';

interface LeadDetailsProps {
  selectedLead: Lead | null;
}

const LeadDetails = ({ selectedLead }: LeadDetailsProps) => {
  if (!selectedLead) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800 text-center text-gray-400">
        בחר ליד כדי לצפות בפרטים
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">פרטי ליד</h3>
          <div className="flex space-x-2 space-x-reverse">
            <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">
              עדכן סטטוס
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="bg-gray-800 p-3 rounded-lg">
              <Users className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <div className="font-medium">{selectedLead.name}</div>
              <div className="text-sm text-gray-400">שם מלא</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="bg-gray-800 p-3 rounded-lg">
              <Mail className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <div className="font-medium">{selectedLead.email}</div>
              <div className="text-sm text-gray-400">אימייל</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="bg-gray-800 p-3 rounded-lg">
              <Phone className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <div className="font-medium">{selectedLead.phone}</div>
              <div className="text-sm text-gray-400">טלפון</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
        <h3 className="text-xl font-bold mb-4">פעולות מהירות</h3>
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 space-x-reverse">
            <Phone className="h-5 w-5" />
            <span>התקשר</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 space-x-reverse">
            <Mail className="h-5 w-5" />
            <span>שלח מייל</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;