import React from 'react';
import { ArrowLeft } from 'lucide-react';

const ContactHeader = () => {
  return (
    <div className="relative mb-8 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 rounded-2xl p-8 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      </div>
      
      <div className="relative">
        <div className="flex items-center space-x-4 space-x-reverse">
          <button className="text-gray-300 hover:text-white">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-4xl font-bold mb-2">צור קשר</h1>
            <p className="text-purple-300">נשמח לעמוד לרשותך</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactHeader;