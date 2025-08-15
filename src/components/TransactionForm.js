import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, DollarSign, CalendarDays, Tag, CreditCard, Euro, RefreshCcw } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { formatCurrency } from '../utils/helpers'; // Import formatCurrency to get the symbol

const TransactionForm = ({ onAddTransaction = () => {}, currency, setCurrency, onResetData }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState('expense'); // 'expense' or 'income'
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Efectivo');

  const expenseCategories = ['Comida', 'Transporte', 'Servicios', 'Entretenimiento', 'Compras', 'Salud', 'Educación', 'Vivienda', 'Otros'];
  const incomeCategories = ['Salario', 'Ventas', 'Inversiones', 'Regalos', 'Otros'];
  const paymentMethods = ['Efectivo', 'Interbank', 'BBVA', 'Saga Falabella', 'Yape', 'Plin', 'Transferencia', 'Otros'];
  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'PEN']; // Added PEN for Peruvian Sol

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim() && amount > 0) {
      onAddTransaction({
        description: description.trim(),
        amount: parseFloat(amount),
        date: date,
        type: type,
        category: category || (type === 'expense' ? 'Otros' : 'Otros'), // Default category if none selected
        paymentMethod: paymentMethod,
        currency: currency // Add currency to transaction
      });
      setDescription('');
      setAmount('');
      setDate(new Date());
      setType('expense');
      setCategory('');
      setPaymentMethod('Efectivo');
    }
  };

  // Get the currency symbol based on the selected currency
  const currentCurrencySymbol = formatCurrency(0, currency).split(' ')[0];

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-6 mb-8 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type buttons moved above description field */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Tipo de Transacción</label>
          <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
            <motion.button
              type="button"
              onClick={() => { setType('expense'); setCategory(''); }}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                type === 'expense'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Gasto
            </motion.button>
            <motion.button
              type="button"
              onClick={() => { setType('income'); setCategory(''); }}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                type === 'income'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ingreso
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">Descripción</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej. Café, Salario, Alquiler"
              className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-500 font-medium"
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-gray-700 text-sm font-medium mb-2">Monto</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                {/* Display the dynamic currency symbol */}
                <span className="font-bold">{currentCurrencySymbol}</span>
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
            <label htmlFor="date" className="block text-gray-700 text-sm font-medium mb-2">Fecha</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <CalendarDays className="w-5 h-5" />
              </span>
              <DatePicker
                selected={date}
                onChange={(d) => setDate(d)}
                dateFormat="dd/MM/yyyy"
                className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-500 font-medium"
              />
            </div>
          </div>
          <div>
            <label htmlFor="currency" className="block text-gray-700 text-sm font-medium mb-2">Moneda</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                {/* Display the dynamic currency symbol */}
                <span className="font-bold">{currentCurrencySymbol}</span>
              </span>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-gray-900 font-medium appearance-none"
              >
                {currencies.map((curr) => (
                  <option key={curr} value={curr}>{curr}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-gray-700 text-sm font-medium mb-2">Categoría</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <Tag className="w-5 h-5" />
              </span>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-gray-900 font-medium appearance-none"
              >
                <option value="">Selecciona una categoría</option>
                {(type === 'expense' ? expenseCategories : incomeCategories).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="paymentMethod" className="block text-gray-700 text-sm font-medium mb-2">Método de Pago</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <CreditCard className="w-5 h-5" />
              </span>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-gray-900 font-medium appearance-none"
              >
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <motion.button
            type="submit"
            disabled={!description.trim() || amount <= 0}
            className={`flex-1 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              description.trim() && amount > 0
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={description.trim() && amount > 0 ? { scale: 1.02 } : {}}
            whileTap={description.trim() && amount > 0 ? { scale: 0.98 } : {}}
          >
            <Plus className="w-5 h-5" />
            Agregar Transacción
          </motion.button>

          <motion.button
            type="button"
            onClick={onResetData}
            className="px-6 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-red-500 text-white shadow-lg hover:shadow-xl hover:scale-105"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RefreshCcw className="w-5 h-5" />
            Limpiar Datos
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default TransactionForm;