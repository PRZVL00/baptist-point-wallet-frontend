import React from "react";
import { TrendingUp, ChevronRight, Plus, Minus } from "lucide-react";


const TransactionItem = ({ transaction }) => (
    <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex items-center space-x-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          transaction.type === 'earn' ? 'bg-green-100' : 'bg-red-100'
        }`}>
          {transaction.type === 'earn' ? (
            <Plus className={`${transaction.type === 'earn' ? 'text-green-600' : 'text-red-600'}`} size={16} />
          ) : (
            <Minus className="text-red-600" size={16} />
          )}
        </div>
        <div>
          <p className="font-semibold text-gray-800">{transaction.studentName}</p>
          <p className="text-gray-600 text-sm">{transaction.reason}</p>
          <p className="text-gray-500 text-xs">{transaction.timestamp}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-bold text-lg ${
          transaction.type === 'earn' ? 'text-green-500' : 'text-red-500'
        }`}>
          {transaction.amount > 0 ? '+' : ''}{transaction.amount}
        </p>
        {transaction.teacherAction && (
          <p className="text-xs text-purple-600 font-medium">Teacher Action</p>
        )}
      </div>
    </div>
  );

  export default TransactionItem;