import React from 'react';
import { ArrowLeft, Eye, Save, Clock } from 'lucide-react';

interface EditorHeaderProps {
  onPreviewToggle: () => void;
  onSave: () => void;
  lastSaved?: string;
}

const EditorHeader = ({ onPreviewToggle, onSave, lastSaved }: EditorHeaderProps) => {
  return (
    <div className="relative mb-8 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 rounded-2xl p-8 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      </div>
      
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <button className="text-gray-300 hover:text-white">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-4xl font-bold mb-2">יצירת פוסט חדש</h1>
              {lastSaved && (
                <p className="text-purple-300 flex items-center">
                  <Clock className="h-4 w-4 ml-1" />
                  טיוטה נשמרה לאחרונה: {lastSaved}
                </p>
              )}
            </div>
          </div>
          <div className="flex space-x-4 space-x-reverse">
            <button 
              onClick={onPreviewToggle}
              className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full flex items-center space-x-2 space-x-reverse"
            >
              <Eye className="h-5 w-5" />
              <span>תצוגה מקדימה</span>
            </button>
            <button 
              onClick={onSave}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full flex items-center space-x-2 space-x-reverse"
            >
              <Save className="h-5 w-5" />
              <span>פרסם</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorHeader;