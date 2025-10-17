// pages/DashboardPage.jsx
import React, { useState } from 'react';
import {
  TrendingUp, Award, ShoppingCart, Target, QrCode, Trophy,
  History, Sparkles, ArrowRight, Heart
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isTokenExpired } from "../utils/token";
import { getRecentActivity } from "../api/activity";

// Component imports
import StatCard from '../components/StatCard';
import FloatingIcon from '../components/FloatingIcon';
import QuickActionButton from '../components/QuickActionButton';
import ActivityItem from '../components/ActivityItem';
import NotificationsDropdown from '../components/NotificationsDropdown';
import MainBalanceCard from '../components/MainBalanceCard';
import ProgressSection from '../components/ProgressSection';

const DashboardPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token || isTokenExpired(token)) {
      navigate("/login");
    }
  }, [navigate]);

  const [currentUser, setCurrentUser] = useState({
    username: 'SuperKid123',
    firstName: 'Alex',
    balance: 1250,
    streak: 7,
    level: 5,
    totalEarned: 2500,
    totalSpent: 1250,
    achievements: 12
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRecentActivity();
      setRecentActivity(data);
    };
    fetchData();
  }, []);

  const [notifications, setNotifications] = useState([
    { id: 1, message: '🎉 You earned 50 points for Bible Quiz!', isRead: false, time: '2h ago' },
    { id: 2, message: '🔥 7-day streak! Keep it up!', isRead: false, time: '1d ago' },
    { id: 3, message: '🛍️ New items in the store!', isRead: true, time: '2d ago' }
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [celebrationPoints, setCelebrationPoints] = useState([]);

  // Animated celebration points
  const createCelebrationPoint = (x, y) => {
    const id = Date.now();
    setCelebrationPoints(prev => [...prev, { id, x, y }]);
    setTimeout(() => {
      setCelebrationPoints(prev => prev.filter(point => point.id !== id));
    }, 2000);
  };

  // Handle main balance card click for celebration effect
  const handleBalanceCardClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createCelebrationPoint(x, y);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">

      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/10 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 60 + 20}px`,
                height: `${Math.random() * 60 + 20}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Icons */}
      <FloatingIcon icon={Trophy} delay={0} position="top-8 left-8" color="text-yellow-400" />
      <FloatingIcon icon={Sparkles} delay={1000} position="top-16 right-16" color="text-pink-400" />
      <FloatingIcon icon={Award} delay={2000} position="bottom-20 left-12" color="text-blue-400" />
      <FloatingIcon icon={Target} delay={3000} position="bottom-16 right-20" color="text-purple-400" />
      <FloatingIcon icon={Heart} delay={4000} position="top-1/3 left-4" color="text-green-400" />

      {/* Celebration Points */}
      {celebrationPoints.map(point => (
        <div
          key={point.id}
          className="absolute pointer-events-none text-2xl animate-bounce"
          style={{
            left: point.x,
            top: point.y,
            animation: 'bounce 2s ease-out forwards'
          }}
        >
          +{Math.floor(Math.random() * 50) + 10}✨
        </div>
      ))}

      <div className="relative z-10 p-4 max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
                👦
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                <Trophy size={12} className="text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Hey, {currentUser.firstName}! 👋</h1>
              <p className="text-purple-200">Level {currentUser.level} Adventure Hero</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <NotificationsDropdown
              notifications={notifications}
              showNotifications={showNotifications}
              setShowNotifications={setShowNotifications}
            />
          </div>
        </header>

        {/* Main Balance Card */}
        <MainBalanceCard
          currentUser={currentUser}
          onCardClick={handleBalanceCardClick}
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={TrendingUp}
            title="Total Earned"
            value={`${currentUser.totalEarned.toLocaleString()}`}
            subtitle="All time"
            color="bg-gradient-to-br from-green-500 to-emerald-600"
            isClickable={true}
            onClick={() => console.log('View earnings')}
          />
          <StatCard
            icon={ShoppingCart}
            title="Total Spent"
            value={`${currentUser.totalSpent.toLocaleString()}`}
            subtitle="Points used"
            color="bg-gradient-to-br from-blue-500 to-cyan-600"
            isClickable={true}
            onClick={() => console.log('View purchases')}
          />
          <StatCard
            icon={Award}
            title="Achievements"
            value={currentUser.achievements}
            subtitle="Unlocked"
            color="bg-gradient-to-br from-purple-500 to-violet-600"
            isClickable={true}
            onClick={() => console.log('View achievements')}
          />
          <StatCard
            icon={Target}
            title="This Week"
            value="325"
            subtitle="Points earned"
            color="bg-gradient-to-br from-orange-500 to-red-500"
            isClickable={true}
            onClick={() => console.log('View weekly stats')}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <QuickActionButton
            icon={ShoppingCart}
            title="Visit Store 🛍️"
            color="bg-gradient-to-r from-green-500 to-emerald-600"
            pulse={true}
            onClick={() => console.log('Navigate to store')}
          />
          <QuickActionButton
            icon={QrCode}
            title="My QR Code 📱"
            color="bg-gradient-to-r from-blue-500 to-cyan-600"
            onClick={() => console.log('Show QR code')}
          />
          <QuickActionButton
            icon={Trophy}
            title="Achievements 🏆"
            color="bg-gradient-to-r from-purple-500 to-violet-600"
            onClick={() => console.log('View achievements')}
          />
          <QuickActionButton
            icon={History}
            title="History 📊"
            color="bg-gradient-to-r from-orange-500 to-red-500"
            onClick={() => console.log('View history')}
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-white/20 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center">
              <Sparkles className="mr-2 text-purple-500" size={24} />
              Recent Adventures
            </h3>
            <button className="text-purple-600 font-semibold hover:text-purple-800 transition-colors flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="space-y-3">
            {recentActivity.slice(0, 5).map(activity => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>

        {/* Progress Section */}
        <ProgressSection currentUser={currentUser} />

        {/* Fun Footer */}
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-6 py-3 text-white backdrop-blur-sm">
            <Heart className="text-red-400" size={16} />
            <span className="text-sm font-semibold">Keep being awesome, {currentUser.firstName}!</span>
            <Sparkles className="text-yellow-400" size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;