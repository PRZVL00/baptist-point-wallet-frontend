import React from 'react';
import { Plus, Minus, Loader } from 'lucide-react';

const AwardPointsModal = ({ 
  selectedStudent, 
  setSelectedStudent, 
  pointsToAward, 
  setPointsToAward, 
  awardReason, 
  setAwardReason, 
  onAwardPoints,
  isAwarding = false
}) => {
  if (!selectedStudent) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Award Points</h3>
          <button
            onClick={() => !isAwarding && setSelectedStudent(null)}
            className="text-gray-500 hover:text-gray-700 text-xl disabled:opacity-50"
            disabled={isAwarding}
          >
            ×
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
            {selectedStudent.avatar || '👤'}
          </div>
          <h4 className="font-bold text-gray-800">{selectedStudent.name}</h4>
          <p className="text-gray-500">@{selectedStudent.username}</p>
          <p className="text-sm text-gray-600 mt-2">
            Current Balance: <span className="font-bold text-purple-600">{selectedStudent.balance}</span> points
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Points to Award</label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPointsToAward(Math.max(5, pointsToAward - 5))}
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-50"
                disabled={isAwarding}
              >
                <Minus size={16} />
              </button>
              <input
                type="number"
                value={pointsToAward}
                onChange={(e) => setPointsToAward(parseInt(e.target.value) || 0)}
                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg text-center font-bold text-lg focus:border-purple-500 focus:outline-none disabled:opacity-50"
                disabled={isAwarding}
              />
              <button
                onClick={() => setPointsToAward(pointsToAward + 5)}
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-50"
                disabled={isAwarding}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Reason</label>
            <input
              type="text"
              placeholder="e.g., Great participation in class"
              value={awardReason}
              onChange={(e) => setAwardReason(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none disabled:opacity-50"
              disabled={isAwarding}
            />
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => setSelectedStudent(null)}
              className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-300 transition-colors disabled:opacity-50"
              disabled={isAwarding}
            >
              Cancel
            </button>
            <button
              onClick={onAwardPoints}
              disabled={!pointsToAward || !awardReason || isAwarding}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isAwarding ? (
                <>
                  <Loader className="animate-spin" size={18} />
                  <span>Awarding...</span>
                </>
              ) : (
                <>
                  <span>Award Points</span>
                  <span>🎉</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwardPointsModal;