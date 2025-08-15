import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Banknote, CalendarCheck, AlertTriangle, XCircle, History, ChevronDown, ChevronUp } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const LoanList = ({ loans, onDeleteLoan }) => {
  const today = new Date();
  const [expandedLoan, setExpandedLoan] = useState(null);

  const getStatus = (loan) => {
    // Ensure paymentsMade is an array before using it
    const paymentsMade = Array.isArray(loan.paymentsMade) ? loan.paymentsMade : [];
    const totalPaid = paymentsMade.reduce((sum, payment) => sum + payment.amount, 0);
    
    const dueDate = new Date(loan.dueDate);
    if (totalPaid >= loan.amount) {
      return { text: 'Pagado', color: 'text-green-600', icon: CalendarCheck };
    }
    if (dueDate < today) {
      return { text: 'Vencido', color: 'text-red-600', icon: XCircle };
    }
    return { text: 'Activo', color: 'text-blue-600', icon: Banknote };
  };

  const toggleExpand = (loanId) => {
    setExpandedLoan(expandedLoan === loanId ? null : loanId);
  };

  if (loans.length === 0) {
    return (
      <motion.div
        className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-12 text-center shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
        >
          <AlertTriangle className="w-12 h-12 text-yellow-500" />
        </motion.div>

        <motion.h3
          className="text-2xl font-bold text-gray-800 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          ¡Sin préstamos!
        </motion.h3>

        <motion.p
          className="text-gray-500 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Parece que no tienes deudas... ¡por ahora! Agrega un préstamo para empezar a gestionarlo.
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-6 mb-8 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Banknote className="w-5 h-5 text-green-500" />
        <h2 className="text-lg font-bold text-gray-800">
          Mis Préstamos
        </h2>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {loans.map((loan, index) => {
            const status = getStatus(loan);
            const StatusIcon = status.icon;
            // Ensure paymentsMade is an array before using it
            const paymentsMade = Array.isArray(loan.paymentsMade) ? loan.paymentsMade : [];
            const totalPaid = paymentsMade.reduce((sum, payment) => sum + payment.amount, 0);
            const remaining = loan.amount - totalPaid;

            return (
              <motion.div
                key={loan.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  layout: { duration: 0.3 }
                }}
                className={`group bg-white/90 backdrop-blur-sm border-2 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 ${
                  status.color === 'text-red-600' ? 'border-red-200' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <StatusIcon className={`w-6 h-6 ${status.color}`} />
                    <div>
                      <p className="text-gray-900 font-medium">
                        {loan.bank} - {formatCurrency(loan.amount, loan.currency)}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Vence: {new Date(loan.dueDate).toLocaleDateString('es-ES')}
                        <span className="mx-2">•</span>
                        <span className={status.color}>{status.text}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-gray-800">
                      {formatCurrency(remaining, loan.currency)}
                    </span>
                    <motion.button
                      onClick={() => toggleExpand(loan.id)}
                      className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 transition-all duration-300 hover:bg-gray-200 hover:border-gray-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {expandedLoan === loan.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </motion.button>
                    <motion.button
                      onClick={() => onDeleteLoan(loan.id)}
                      className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-200 hover:border-gray-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <XCircle className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
                <AnimatePresence>
                  {expandedLoan === loan.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-gray-200"
                    >
                      <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <History className="w-4 h-4" /> Historial de Pagos
                      </h3>
                      {paymentsMade.length === 0 ? (
                        <p className="text-gray-500 text-sm">Aún no hay pagos registrados para este préstamo.</p>
                      ) : (
                        <ul className="space-y-2">
                          {paymentsMade.map((payment, pIndex) => (
                            <li key={pIndex} className="flex justify-between items-center text-sm text-gray-600">
                              <span>{new Date(payment.date).toLocaleDateString('es-ES')}</span>
                              <span className="font-medium">{formatCurrency(payment.amount, loan.currency)}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LoanList;