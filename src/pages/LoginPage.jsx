// pages/LoginPage.jsx
import React, { useState } from 'react';
import { Wallet, Trophy, Gift, Zap, Sparkles } from 'lucide-react';
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

// Component imports
import FloatingReward from '../components/FloatingReward';
import AnimatedBackground from '../components/AnimatedBackground';
import LoginHeader from '../components/LoginHeader';
import LoginForm from '../components/LoginForm';
import LoginFooter from '../components/LoginFooter';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      const card = document.getElementById('login-card');
      card.classList.add('animate-pulse');
      setTimeout(() => card.classList.remove('animate-pulse'), 500);
      return;
    }

    setIsLoading(true);
    try {
      const data = await login(username, password);
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      
      // Store user type and redirect based on role
      localStorage.setItem("user_type", data.user_type);
      localStorage.setItem("username", username);
      
      alert(`Welcome, ${username}!`);
      
      // Redirect based on user type
      if (data.user_type === 1) {
        navigate("/teacher-dashboard"); // Teachers/Admins
      } else {
        navigate("/dashboard"); // Students
      }
    } catch (err) {
      console.log(err);
      alert("Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Floating Reward Icons */}
      <FloatingReward icon={Trophy} delay={0} position="top-16 left-16" color="text-yellow-400" />
      <FloatingReward icon={Gift} delay={800} position="top-32 right-20" color="text-pink-400" />
      <FloatingReward icon={Zap} delay={1600} position="bottom-32 left-12" color="text-blue-400" />
      <FloatingReward icon={Wallet} delay={2400} position="bottom-16 right-16" color="text-green-400" />
      <FloatingReward icon={Sparkles} delay={3200} position="top-1/2 left-8" color="text-purple-400" />

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          id="login-card"
          className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-500 hover:scale-105"
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Header Section */}
          <LoginHeader />

          {/* Login Form */}
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isLoading={isLoading}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
            onLogin={handleLogin}
          />

          {/* Footer Section */}
          <LoginFooter />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;