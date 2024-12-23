import React from 'react';
import { Globe } from 'lucide-react';

export const SocialLinks = () => {
  const platforms = ['פייסבוק', 'טוויטר', 'לינקדאין', 'אינסטגרם'];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
      <div className="flex items-center space-x-4 space-x-reverse mb-4">
        <Globe className="h-6 w-6 text-purple-400" />
        <h3 className="font-bold">מדיה חברתית</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {platforms.map((platform, index) => (
          <button
            key={index}
            className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg text-center transition-all"
          >
            {platform}
          </button>
        ))}
      </div>
    </div>
  );
};