// components/ActivityItem.jsx
import React from 'react';

const ActivityItem = ({ activity }) => (
  <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300 group">
    <div className="flex items-center space-x-4">
      <div className="text-2xl bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
        {activity.icon}
      </div>
      <div>
        <p className="font-semibold text-gray-800">{activity.description}</p>
        <p className="text-gray-500 text-sm">{activity.time}</p>
      </div>
    </div>
    <div className={`font-bold text-lg ${activity.color}`}>
      {activity.amount > 0 ? '+' : ''}{activity.amount} pts
    </div>
  </div>
);

export default ActivityItem;