// components/LoginForm.jsx
import React from 'react';
import { Trophy, Eye, EyeOff, Gift, ArrowRight } from 'lucide-react';

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  isLoading,
  focusedField,
  setFocusedField,
  onLogin
}) => (
  <div className="space-y-6">
    {/* Username Field */}
    <div className="relative group">
      <label className="block text-gray-800 font-bold mb-3 text-sm uppercase tracking-wide">
        <span className="mr-2">👤</span>
        Your Hero Name
      </label>
      <div className="relative">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={() => setFocusedField('username')}
          onBlur={() => setFocusedField('')}
          className={`w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl transition-all duration-300 text-lg font-medium placeholder-gray-400 ${
            focusedField === 'username'
              ? 'border-purple-500 bg-white shadow-lg scale-105 shadow-purple-200'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          placeholder="Enter your awesome username"
          disabled={isLoading}
        />
        <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
          username ? 'text-purple-500 scale-110' : 'text-gray-300'
        }`}>
          <Trophy size={20} className={username ? 'animate-bounce' : ''} />
        </div>
      </div>
    </div>

    {/* Password Field */}
    <div className="relative group">
      <label className="block text-gray-800 font-bold mb-3 text-sm uppercase tracking-wide">
        <span className="mr-2">🔐</span>
        Secret Power Code
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setFocusedField('password')}
          onBlur={() => setFocusedField('')}
          className={`w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl transition-all duration-300 text-lg font-medium placeholder-gray-400 pr-16 ${
            focusedField === 'password'
              ? 'border-purple-500 bg-white shadow-lg scale-105 shadow-purple-200'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          placeholder="Enter your secret code"
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-all duration-300 hover:scale-110"
          disabled={isLoading}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>

    {/* Login Button */}
    <button
      onClick={onLogin}
      disabled={isLoading}
      className={`w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-bold py-5 px-6 rounded-2xl shadow-xl transform transition-all duration-300 text-lg relative overflow-hidden ${
        isLoading
          ? 'scale-95 opacity-80 cursor-not-allowed'
          : 'hover:scale-105 hover:shadow-2xl active:scale-95'
      }`}
    >
      {/* Button Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-orange-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative flex items-center justify-center space-x-3">
        {isLoading ? (
          <>
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Unlocking your adventure...</span>
          </>
        ) : (
          <>
            <Gift size={20} />
            <span>Start My Adventure!</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </div>
    </button>
  </div>
);

export default LoginForm;