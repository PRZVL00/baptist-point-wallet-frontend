import React from "react";
import { TrendingUp, ChevronRight } from "lucide-react";

const StatCard = ({ icon: Icon, title, value, subtitle, color, trend, onClick }) => (
    <div
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group"
      onClick={onClick}
    >
      <div className={`inline-flex items-center justify-center w-12 h-12 ${color} rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
        <Icon size={24} className="text-white" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-1">{value}</h3>
      <p className="text-gray-600 font-semibold text-sm">{title}</p>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
      {trend && (
        <div className={`flex items-center mt-2 text-xs ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
          <TrendingUp size={12} className="mr-1" />
          {trend > 0 ? '+' : ''}{trend}% this week
        </div>
      )}
      <ChevronRight className="absolute top-4 right-4 text-gray-400 group-hover:text-purple-500 transition-colors" size={16} />
    </div>
  );

  export default StatCard