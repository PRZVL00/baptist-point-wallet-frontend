import React from "react";
import { TrendingUp, ChevronRight, Plus, Minus } from "lucide-react";

const QuickAction = ({ icon: Icon, title, description, color, onClick, pulse = false }) => (
    <button
      onClick={onClick}
      className={`${color} text-white p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 text-left group ${
        pulse ? 'animate-pulse' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <Icon size={32} className="group-hover:scale-110 transition-transform" />
        <ChevronRight size={20} className="opacity-70 group-hover:translate-x-1 transition-transform" />
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm opacity-90">{description}</p>
    </button>
  );

  export default QuickAction;