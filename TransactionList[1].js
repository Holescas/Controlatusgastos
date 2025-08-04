import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ListChecks, Frown } from 'lucide-react';
import TransactionItem from './TransactionItem';

const TransactionList = ({ transactions, onDeleteTransaction }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <motion.div
        className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-12 text-center shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-24 h-24 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
        >
          <Frown className="w-12 h-12 text-red-500" />
        </motion.div>

        <motion.h3
          className="text-2xl font-bold text-gray-800 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          ¡No hay operaciones!
        </motion.h3>

        <motion.p
          className="text-gray-500 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Parece que tu cartera está más vacía ¡Agrega una operación para empezar!
        </motion.p>
      </motion.div>
    );
  }

  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-6 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex items-center gap-3 mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ListChecks className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-bold text-gray-800">
          Historial de operaciones
        </h2>
      </motion.div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {sortedTransactions.map((transaction, index) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onDelete={onDeleteTransaction}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TransactionList;
