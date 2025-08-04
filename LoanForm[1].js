import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Banknote, CalendarDays, Percent } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const LoanForm = ({ onAddLoan = () => {} }) => {
  const [bank, setBank] = useState('');
  const [amount, setAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [monthlyPayment, setMonthlyPayment] = useState('');

  const banks = ['Interbank', 'BBVA', 'Saga Falabella', 'Scotiabank', 'Otros'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bank.trim() && amount > 0 && interestRate >= 0 && startDate && dueDate) {
      onAddLoan({
        bank: bank.trim(),
        amount: parseFloat(amount),
        interestRate: parseFloat(interestRate) / 100, // Convert to decimal
        startDate: startDate,
        dueDate: dueDate,
        monthlyPayment: parseFloat(monthlyPayment) || 0, // Optional, can be calculated
        remainingAmount: parseFloat(amount),
        paymentsMade: 0
      });
      setBank('');
      setAmount('');
      setInterestRate('');
      setStartDate(new Date());
      setDueDate(new Date());
      setMonthlyPayment('');
    }
  };

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-6 mb-8 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Banknote className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-bold text-gray-800">
          Guardar
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="bank" className="block text-gray-700 text-sm font-medium mb-2">Banco</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <Banknote className="w-5 h-5" />
              </span>
              <select
                id="bank"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-gray-900 font-medium appearance-none"
              >
                <option value="">Selecciona banco</option>
                {banks.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="amount" className="block text-gray-700 text-sm font-medium mb-2">Monto del Préstamo</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <Banknote className="w-5 h-5" />
              </span>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-500 font-medium"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="interestRate" className="block text-gray-700 text-sm font-medium mb-2">Tasa de Interés (%)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <Percent className="w-5 h-5" />
              </span>
              <input
                type="number"
                id="interestRate"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="Ej. 5.0"
                step="0.01"
                min="0"
                className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-500 font-medium"
              />
            </div>
          </div>
          <div>
            <label htmlFor="monthlyPayment" className="block text-gray-700 text-sm font-medium mb-2">Pago Mensual (Opcional)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <Banknote className="w-5 h-5" />
              </span>
              <input
                type="number"
                id="monthlyPayment"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-500 font-medium"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-gray-700 text-sm font-medium mb-2">Fecha de Inicio</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <CalendarDays className="w-5 h-5" />
              </span>
              <DatePicker
                selected={startDate}
                onChange={(d) => setStartDate(d)}
                dateFormat="dd/MM/yyyy"
                className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-500 font-medium"
              />
            </div>
          </div>
          <div>
            <label htmlFor="dueDate" className="block text-gray-700 text-sm font-medium mb-2">Fecha de Vencimiento</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <CalendarDays className="w-5 h-5" />
              </span>
              <DatePicker
                selected={dueDate}
                onChange={(d) => setDueDate(d)}
                dateFormat="dd/MM/yyyy"
                className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-500 font-medium"
              />
            </div>
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={!bank.trim() || amount <= 0 || interestRate < 0 || !startDate || !dueDate}
          className={`w-full px-6 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            bank.trim() && amount > 0 && interestRate >= 0 && startDate && dueDate
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          whileHover={bank.trim() && amount > 0 && interestRate >= 0 && startDate && dueDate ? { scale: 1.02 } : {}}
          whileTap={bank.trim() && amount > 0 && interestRate >= 0 && startDate && dueDate ? { scale: 0.98 } : {}}
        >
          <Plus className="w-5 h-5" />
          Guardar
        </motion.button>
      </form>
    </motion.div>
  );
};

export default LoanForm;