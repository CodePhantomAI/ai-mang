import React from 'react';
import { Bold, Italic, Link2, Quote, List, Image } from 'lucide-react';

const tools = [
  { icon: Bold, label: 'מודגש' },
  { icon: Italic, label: 'נטוי' },
  { icon: Link2, label: 'קישור' },
  { icon: Quote, label: 'ציטוט' },
  { icon: List, label: 'רשימה' },
  { icon: Image, label: 'תמונה' }
];

const EditorToolbar = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-4 border border-gray-800">
      <div className="flex items-center space-x-4 space-x-reverse">
        {tools.map((Tool, index) => (
          <button 
            key={index} 
            className="p-2 hover:bg-gray-800 rounded-lg"
            title={Tool.label}
          >
            <Tool.icon className="h-5 w-5" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default EditorToolbar;