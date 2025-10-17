// components/StudentCard.jsx
import React from 'react';

const StudentCard = ({ student, onAwardPoints }) => {
  // Build a display name safely
  const displayName = student.name?.trim() || student.username || "Unnamed Student";

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-white/20 hover:shadow-lg transition-all duration-300 group cursor-pointer">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl shadow-lg">
              {student.avatar || "👤"}
            </div>
            {student.status === 'active' && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          <div>
            <h4 className="font-bold text-gray-800">{displayName}</h4>
            <p className="text-gray-500 text-sm">@{student.username}</p>
          </div>
        </div>
        <button
          onClick={() => {
            console.log('Award button clicked for:', displayName);
            onAwardPoints(student);
          }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          Award Points
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center mb-3">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-2">
          <p className="text-xs text-gray-600 mb-1">Balance</p>
          <p className="font-bold text-green-600">{student.balance ?? 0}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-2">
          <p className="text-xs text-gray-600 mb-1">Level</p>
          <p className="font-bold text-purple-600">{student.level ?? 1}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-2">
          <p className="text-xs text-gray-600 mb-1">Streak</p>
          <p className="font-bold text-orange-600">{student.streak ?? 0}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Last activity: {student.last_activity || "N/A"}</span>
        <div
          className={`px-2 py-1 rounded-full text-xs font-semibold ${student.status === 'active'
              ? 'bg-green-100 text-green-600'
              : 'bg-gray-100 text-gray-600'
            }`}
        >
          {student.status || "inactive"}
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
