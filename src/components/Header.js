import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown, Scale } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const Header = ({ totalIncome, totalExpenses, balance, currency }) => {
  return (
    <motion.div
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6 w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center gap-4">
        <motion.div
          className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Wallet className="w-8 h-8 text-white" />
        </motion.div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            ControlaGastos
          </h1>
          <p className="text-gray-500 font-medium">Tu dinero, bajo control</p>
        </div>
      </div>

      {/* Moved the financial summary here */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        <motion.div
          className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <TrendingUp className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-green-700 font-semibold text-sm">Ingresos</p>
            <p className="text-green-800 font-bold">{formatCurrency(totalIncome, currency)}</p>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-200/50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <TrendingDown className="w-5 h-5 text-red-600" />
          <div>
            <p className="text-red-700 font-semibold text-sm">Gastos</p>
            <p className="text-red-800 font-bold">{formatCurrency(totalExpenses, currency)}</p>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Scale className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-blue-700 font-semibold text-sm">Balance</p>
            <p className="text-blue-800 font-bold">{formatCurrency(balance, currency)}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Header;