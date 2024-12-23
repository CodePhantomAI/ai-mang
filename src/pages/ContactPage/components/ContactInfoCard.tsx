import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ContactInfoCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  subtext: string;
}

export const ContactInfoCard = ({ icon: Icon, title, value, subtext }: ContactInfoCardProps) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
      <div className="flex items-start space-x-4 space-x-reverse">
        <div className="bg-purple-900/50 p-3 rounded-lg">
          <Icon className="h-6 w-6 text-purple-400" />
        </div>
        <div>
          <h3 className="font-bold mb-1">{title}</h3>
          <p className="text-purple-300 mb-1">{value}</p>
          <p className="text-gray-400 text-sm">{subtext}</p>
        </div>
      </div>
    </div>
  );
};