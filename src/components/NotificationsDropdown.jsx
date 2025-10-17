// components/NotificationsDropdown.jsx
import React from 'react';
import { Bell } from 'lucide-react';

const NotificationsDropdown = ({ notifications, showNotifications, setShowNotifications }) => (
  <div className="relative">
    <button
      onClick={() => setShowNotifications(!showNotifications)}
      className="relative p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
    >
      <Bell size={20} />
      {notifications.filter(n => !n.isRead).length > 0 && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold animate-bounce">
          {notifications.filter(n => !n.isRead).length}
        </div>
      )}
    </button>

    {showNotifications && (
      <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border-2 border-purple-200 z-50 max-h-96 overflow-y-auto">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-800 flex items-center">
            <Bell size={16} className="mr-2" />
            Notifications
          </h3>
        </div>
        {notifications.map(notification => (
          <div 
            key={notification.id} 
            className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${!notification.isRead ? 'bg-purple-50' : ''}`}
          >
            <p className="text-sm text-gray-800 font-medium">{notification.message}</p>
            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default NotificationsDropdown;