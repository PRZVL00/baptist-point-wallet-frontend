// components/MainBalanceCard.jsx
import React from 'react';
import { Wallet, Flame, Trophy } from 'lucide-react';

const MainBalanceCard = ({ currentUser, onCardClick }) => (
  <div 
    className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-3xl p-8 mb-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
    onClick={onCardClick}
  >
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold opacity-90 mb-2">🎒 Adventure Points</h2>
        <div className="flex items-baseline space-x-2">
          <span className="text-5xl font-black">{currentUser.balance.toLocaleString()}</span>
          <span className="text-xl opacity-90">points</span>
        </div>
        <div className="flex items-center space-x-4 mt-4">
          <div className="flex items-center space-x-1">
            <Flame className="text-orange-300" size={16} />
            <span className="text-sm">{currentUser.streak} day streak!</span>
          </div>
          <div className="flex items-center space-x-1">
            <Trophy className="text-yellow-300" size={16} />
            <span className="text-sm">Level {currentUser.level}</span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 animate-spin" style={{animationDuration: '8s'}}>
          <Wallet size={32} className="text-white" />
        </div>
        <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105">
          View QR Code
        </button>
      </div>
    </div>
  </div>
);

export default MainBalanceCard;