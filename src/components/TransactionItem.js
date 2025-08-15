import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, TrendingUp, TrendingDown, Tag } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const TransactionItem = ({ transaction, onDelete, index }) => {
  const isExpense = transaction.type === 'expense';
  const Icon = isExpense ? TrendingDown : TrendingUp;
  const colorClass = isExpense ? 'text-red-600' : 'text-green-600';
  const bgColorClass = isExpense ? 'bg-red-50' : 'bg-green-50';
  const borderColorClass = isExpense ? 'border-red-200' : 'border-green-200';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        layout: { duration: 0.3 }
      }}
      className={`group bg-white/90 backdrop-blur-sm border-2 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 ${borderColorClass}`}
    >
      <div className="flex items-center gap-4">
        <motion.div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${bgColorClass}`}
          whileHover={{ scale: 1.1 }}
        >
          <Icon className={`w-6 h-6 ${colorClass}`} />
        </motion.div>

        <div className="flex-1 min-w-0">
          <p className="text-gray-900 font-medium leading-relaxed truncate">
            {transaction.description}
          </p>
          <div className="flex items-center text-gray-500 text-sm mt-1">
            <Tag className="w-4 h-4 mr-1" />
            <span>{transaction.category || (transaction.type === 'expense' ? 'Otros' : 'Otros')}</span>
            <span className="mx-2">•</span>
            <span>{new Date(transaction.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
        </div>

        <div className={`font-bold text-lg ${colorClass} flex-shrink-0`}>
          {isExpense ? '-' : '+'}{formatCurrency(transaction.amount, transaction.currency)}
        </div>

        <motion.button
          onClick={() => onDelete(transaction.id)}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-200 hover:border-gray-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Trash2 className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TransactionItem;