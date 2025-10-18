import React, { useState } from 'react';
import { Plus, Minus, Loader, ShoppingBag, Award } from 'lucide-react';

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
  const [mode, setMode] = useState('award'); // 'award' or 'deduct'

  if (!selectedStudent) return null;

  const isDeductMode = mode === 'deduct';
  const maxDeduction = selectedStudent.balance; // Can't deduct more than they have

  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    setPointsToAward(isDeductMode ? 50 : 10); // Reset to reasonable defaults
    setAwardReason('');
  };

  const handleIncrement = () => {
    if (isDeductMode) {
      setPointsToAward(Math.min(maxDeduction, pointsToAward + 5));
    } else {
      setPointsToAward(pointsToAward + 5);
    }
  };

  const handleDecrement = () => {
    setPointsToAward(Math.max(5, pointsToAward - 5));
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    if (isDeductMode) {
      setPointsToAward(Math.min(maxDeduction, Math.max(0, value)));
    } else {
      setPointsToAward(Math.max(0, value));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Manage Points</h3>
          <button
            onClick={() => !isAwarding && setSelectedStudent(null)}
            className="text-gray-500 hover:text-gray-700 text-xl disabled:opacity-50"
            disabled={isAwarding}
          >
            ×
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
          <button
            onClick={() => handleModeSwitch('award')}
            disabled={isAwarding}
            className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all flex items-center justify-center gap-2 ${
              !isDeductMode
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Award size={16} />
            Award Points
          </button>
          <button
            onClick={() => handleModeSwitch('deduct')}
            disabled={isAwarding}
            className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all flex items-center justify-center gap-2 ${
              isDeductMode
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <ShoppingBag size={16} />
            Deduct Points
          </button>
        </div>

        {/* Student Info */}
        <div className="text-center mb-6">
          <div className={`w-16 h-16 ${
            isDeductMode 
              ? 'bg-gradient-to-br from-orange-500 to-red-500' 
              : 'bg-gradient-to-br from-purple-500 to-pink-500'
          } rounded-full flex items-center justify-center text-2xl mx-auto mb-3`}>
            {selectedStudent.avatar || '👤'}
          </div>
          <h4 className="font-bold text-gray-800">{selectedStudent.name}</h4>
          <p className="text-gray-500">@{selectedStudent.username}</p>
          <p className="text-sm text-gray-600 mt-2">
            Current Balance: <span className={`font-bold ${
              isDeductMode ? 'text-orange-600' : 'text-purple-600'
            }`}>{selectedStudent.balance}</span> points
          </p>
        </div>

        {/* Deduction Warning */}
        {isDeductMode && selectedStudent.balance === 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700 text-center font-semibold">
              ⚠️ Student has no points to deduct
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              {isDeductMode ? 'Points to Deduct' : 'Points to Award'}
            </label>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDecrement}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors disabled:opacity-50 ${
                  isDeductMode
                    ? 'bg-red-100 hover:bg-red-200'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
                disabled={isAwarding}
              >
                <Minus size={16} />
              </button>
              <input
                type="number"
                value={pointsToAward}
                onChange={handleInputChange}
                min="0"
                max={isDeductMode ? maxDeduction : undefined}
                className={`flex-1 px-4 py-2 border-2 rounded-lg text-center font-bold text-lg focus:outline-none disabled:opacity-50 ${
                  isDeductMode
                    ? 'border-orange-300 focus:border-orange-500'
                    : 'border-purple-300 focus:border-purple-500'
                }`}
                disabled={isAwarding}
              />
              <button
                onClick={handleIncrement}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors disabled:opacity-50 ${
                  isDeductMode
                    ? 'bg-red-100 hover:bg-red-200'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
                disabled={isAwarding || (isDeductMode && pointsToAward >= maxDeduction)}
              >
                <Plus size={16} />
              </button>
            </div>
            {isDeductMode && (
              <p className="text-xs text-gray-500 mt-1 text-center">
                Maximum: {maxDeduction} points
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Reason</label>
            <input
              type="text"
              placeholder={isDeductMode ? "e.g., Bought candy from store" : "e.g., Great participation in class"}
              value={awardReason}
              onChange={(e) => setAwardReason(e.target.value)}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none disabled:opacity-50 ${
                isDeductMode
                  ? 'border-orange-200 focus:border-orange-500'
                  : 'border-purple-200 focus:border-purple-500'
              }`}
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
              onClick={() => onAwardPoints(isDeductMode)}
              disabled={
                !pointsToAward || 
                !awardReason || 
                isAwarding || 
                (isDeductMode && pointsToAward > maxDeduction) ||
                (isDeductMode && selectedStudent.balance === 0)
              }
              className={`flex-1 font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-white ${
                isDeductMode
                  ? 'bg-gradient-to-r from-orange-500 to-red-500'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500'
              }`}
            >
              {isAwarding ? (
                <>
                  <Loader className="animate-spin" size={18} />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{isDeductMode ? 'Deduct Points' : 'Award Points'}</span>
                  <span>{isDeductMode ? '🛍️' : '🎉'}</span>
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