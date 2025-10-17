// components/ProgressSection.jsx
import React from 'react';
import { Target, Crown } from 'lucide-react';

const ProgressSection = ({ currentUser }) => (
  <div className="grid md:grid-cols-2 gap-6 mb-8">
    {/* Weekly Goal */}
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-white/20">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-gray-800 flex items-center">
          <Target className="mr-2 text-green-500" size={20} />
          Weekly Goal
        </h4>
        <span className="text-sm text-gray-500">325/500 points</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
        <div 
          className="h-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-1000 ease-out relative"
          style={{ width: '65%' }}
        >
          <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full"></div>
        </div>
      </div>
      <p className="text-gray-600 text-sm">🎯 175 more points to reach your goal!</p>
    </div>

    {/* Level Progress */}
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-white/20">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-gray-800 flex items-center">
          <Crown className="mr-2 text-purple-500" size={20} />
          Next Level
        </h4>
        <span className="text-sm text-gray-500">Level {currentUser.level} → {currentUser.level + 1}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
        <div 
          className="h-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full transition-all duration-1000 ease-out relative"
          style={{ width: '80%' }}
        >
          <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full"></div>
        </div>
      </div>
      <p className="text-gray-600 text-sm">👑 200 more points to level up!</p>
    </div>
  </div>
);

export default ProgressSection;