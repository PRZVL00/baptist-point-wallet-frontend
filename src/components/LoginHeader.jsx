// components/LoginHeader.jsx
import React from 'react';
import { Wallet, Sparkles } from 'lucide-react';

const LoginHeader = () => (
  <div className="text-center mb-8">
    {/* Animated Logo */}
    <div className="relative mb-6">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full shadow-lg">
        <Wallet size={40} className="text-white" />
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '4s' }}>
          <Sparkles size={12} className="text-white" />
        </div>
      </div>
    </div>

    {/* Title */}
    <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-2">
      Baptist Points
    </h1>
    <div className="flex items-center justify-center space-x-2 mb-2">
      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
    <p className="text-gray-600 font-semibold">Your Adventure Starts Here! 🚀</p>
  </div>
);

export default LoginHeader;