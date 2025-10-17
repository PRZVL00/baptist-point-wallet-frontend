import React from "react";
import { TrendingUp, ChevronRight, Plus, Minus } from "lucide-react";

const FloatingIcon = ({ icon: Icon, delay, position, color, size = 24 }) => (
    <div
      className={`absolute ${position} ${color} opacity-30 animate-bounce pointer-events-none`}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: '4s',
        transform: `translate(${Math.sin(delay / 1000) * 20}px, ${Math.cos(delay / 1000) * 15}px)`
      }}
    >
      <Icon size={size} />
    </div>
  );

export default FloatingIcon;