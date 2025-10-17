// components/QuickActionButton.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';

const QuickActionButton = ({ icon: Icon, title, color, onClick, pulse = false }) => (
  <button
    onClick={onClick}
    className={`${color} text-white font-bold py-4 px-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 relative overflow-hidden group ${
      pulse ? 'animate-pulse' : ''
    }`}
  >
    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <div className="relative flex items-center justify-center space-x-2">
      <Icon size={20} />
      <span>{title}</span>
    </div>
  </button>
);

export default QuickActionButton;