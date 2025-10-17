// components/FloatingReward.jsx
import React from 'react';

const FloatingReward = ({ icon: Icon, delay, position, color }) => (
  <div
    className={`absolute ${position} ${color} opacity-20 animate-bounce pointer-events-none`}
    style={{
      animationDelay: `${delay}ms`,
      animationDuration: '3s',
      transform: `translate(${Math.sin(delay / 1000) * 10}px, ${Math.cos(delay / 1000) * 10}px)`
    }}
  >
    <Icon size={32} />
  </div>
);

export default FloatingReward;