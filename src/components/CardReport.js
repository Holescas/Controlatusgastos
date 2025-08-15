import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const CardReport = ({ transactions }) => {
  const cardBalances = transactions.reduce((acc, transaction) => {
    if (transaction.paymentMethod && transaction.paymentMethod !== 'Efectivo' && transaction.paymentMethod !== 'Transferencia' && transaction.paymentMethod !== 'Yape' && transaction.paymentMethod !== 'Plin') {
      if (!acc[transaction.paymentMethod]) {
        acc[transaction.paymentMethod] = 0;
      }
      if (transaction.type === 'expense') {
        acc[transaction.paymentMethod] -= transaction.amount;
      } else {
        acc[transaction.paymentMethod] += transaction.amount;
      }
    }
    return acc;
  }, {});

  const hasCardData = Object.keys(cardBalances).length > 0;

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-6 mb-8 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <CreditCard className="w-5 h-5 text-purple-500" />
        <h2 className="text-lg font-bold text-gray-800">
          Reporte por Tarjeta
        </h2>
      </div>

      {!hasCardData && (
        <motion.div
          className="text-center py-4 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p>No hay transacciones registradas con tarjetas de crédito.</p>
          <p>¡Empieza a gastar (con responsabilidad)!</p>
        </motion.div>
      )}

      {hasCardData && (
        <div className="space-y-3">
          {Object.entries(cardBalances).map(([card, balance]) => (
            <motion.div
              key={card}
              className={`flex items-center justify-between p-4 rounded-xl border ${
                balance < 0 ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3">
                {balance < 0 ? (
                  <TrendingDown className="w-5 h-5 text-red-600" />
                ) : (
                  <TrendingUp className="w-5 h-5 text-green-600" />
                )}
                <span className="font-medium text-gray-800">{card}</span>
              </div>
              <span className={`font-bold text-lg ${balance < 0 ? 'text-red-600' : 'text-green-600'}`}>
                {formatCurrency(balance, transactions[0]?.currency)}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default CardReport;