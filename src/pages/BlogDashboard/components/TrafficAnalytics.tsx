import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TrafficAnalytics: React.FC = () => {
  const data = [
    { name: '1 דצמ', visits: 400 },
    { name: '8 דצמ', visits: 600 },
    { name: '15 דצמ', visits: 550 },
    { name: '22 דצמ', visits: 800 },
    { name: '29 דצמ', visits: 750 }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6 text-center">
      <h2 className="text-xl font-semibold mb-4 text-center">ניתוח תנועה</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="visits" 
              stroke="#4F46E5" 
              strokeWidth={2}
              dot={{ fill: '#4F46E5' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-gray-600">ממוצע יומי</p>
          <p className="text-xl font-semibold">620</p>
        </div>
        <div className="text-center">
          <p className="text-gray-600">סה״כ החודש</p>
          <p className="text-xl font-semibold">18,600</p>
        </div>
      </div>
    </div>
  );
};

export default TrafficAnalytics;
