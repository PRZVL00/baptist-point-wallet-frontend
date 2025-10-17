// components/AnimatedBackground.jsx
import React from 'react';

const AnimatedBackground = () => (
  <>
    {/* CSS Animation Keyframes */}
    <style jsx>{`
      @keyframes slideRight {
        0% { transform: translateX(-100vw) scale(1); }
        100% { transform: translateX(100vw) scale(1); }
      }
      
      @keyframes slideLeft {
        0% { transform: translateX(100vw) scale(1.1); }
        100% { transform: translateX(-100vw) scale(1.1); }
      }
      
      @keyframes slideRightSlow {
        0% { transform: translateX(-100vw) scale(0.9); }
        100% { transform: translateX(100vw) scale(0.9); }
      }
    `}</style>

    {/* Constantly Moving Sideways Background Gradients */}
    <div className="absolute inset-0 opacity-40">
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, transparent 70%)',
          animation: 'slideRight 15s linear infinite',
          top: '20%',
          left: '0%'
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)',
          animation: 'slideLeft 20s linear infinite',
          top: '50%',
          right: '0%',
          animationDelay: '5s'
        }}
      />
      <div
        className="absolute w-72 h-72 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.4) 0%, transparent 70%)',
          animation: 'slideRightSlow 25s linear infinite',
          bottom: '30%',
          left: '0%',
          animationDelay: '10s'
        }}
      />
    </div>

    {/* Animated Background Patterns */}
    <div className="absolute inset-0">
      <div className="absolute top-0 left-0 w-full h-full">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/5 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 20}px`,
              height: `${Math.random() * 100 + 20}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>
    </div>
  </>
);

export default AnimatedBackground;