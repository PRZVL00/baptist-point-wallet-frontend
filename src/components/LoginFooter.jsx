// components/LoginFooter.jsx
import React from 'react';

const LoginFooter = () => (
  <div className="mt-8 text-center space-y-4">
    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
      <div className="w-8 h-px bg-gray-300"></div>
      <span>New Explorer?</span>
      <div className="w-8 h-px bg-gray-300"></div>
    </div>

    <button className="text-purple-600 font-bold hover:text-purple-800 transition-all duration-300 text-lg hover:scale-110 transform">
      🎮 Join the Adventure Squad
    </button>

    {/* Fun Stats */}
    <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
      <div className="text-center group cursor-pointer">
        <div className="text-2xl mb-1 group-hover:scale-125 transition-transform">🏆</div>
        <div className="text-xs text-gray-600 font-semibold">Rewards</div>
      </div>
      <div className="text-center group cursor-pointer">
        <div className="text-2xl mb-1 group-hover:scale-125 transition-transform">⚡</div>
        <div className="text-xs text-gray-600 font-semibold">Powers</div>
      </div>
      <div className="text-center group cursor-pointer">
        <div className="text-2xl mb-1 group-hover:scale-125 transition-transform">🎯</div>
        <div className="text-xs text-gray-600 font-semibold">Goals</div>
      </div>
    </div>
  </div>
);

export default LoginFooter;