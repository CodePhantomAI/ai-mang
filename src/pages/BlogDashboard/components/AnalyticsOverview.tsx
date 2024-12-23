import React from 'react';
import { Eye, MessageCircle, Users, TrendingUp } from 'lucide-react';

const AnalyticsOverview = () => {
  const analytics = {
    totalViews: 45280,
    totalComments: 892,
    totalSubscribers: 1240,
    engagement: 78
  };

  const stats = [
    { icon: Eye, label: 'צפיות כוללות', value: analytics.totalViews.toLocaleString(), color: 'blue' },
    { icon: MessageCircle, label: 'תגובות', value: analytics.totalComments.toLocaleString(), color: 'purple' },
    { icon: Users, label: 'מנויים', value: analytics.totalSubscribers.toLocaleString(), color: 'green' },
    { icon: TrendingUp, label: 'אחוז מעורבות', value: `${analytics.engagement}%`, color: 'pink' }
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <stat.icon className={`h-8 w-8 text-${stat.color}-400`} />
            <span className="text-2xl font-bold">{stat.value}</span>
          </div>
          <span className="text-gray-400">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsOverview;