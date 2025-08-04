import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import CardReport from './components/CardReport';
import LoanForm from './components/LoanForm';
import LoanList from './components/LoanList';
import ExportModal from './components/ExportModal';
import LoginForm from './components/LoginForm'; // Import LoginForm
import SettingsModal from './components/SettingsModal'; // Import SettingsModal
import { useAuth } from './components/AuthContext'; // Import useAuth hook
import { defaultExpenses } from './mock/expenses';
import { defaultLoans } from './mock/loans';
import { generateUniqueId, calculateTotals } from './utils/helpers';
import { Download, Settings, LogOut } from 'lucide-react'; // Import Settings and LogOut icons

const App = () => {
  const { user, logout } = useAuth(); // Get user and logout from AuthContext
  const [transactions, setTransactions] = useState(defaultExpenses);
  const [loans, setLoans] = useState(defaultLoans);
  const [currency, setCurrency] = useState('PEN'); // Default currency
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false); // State for settings modal

  const { totalIncome, totalExpenses, balance } = calculateTotals(transactions);

  const handleAddTransaction = (newTransactionData) => {
    const newTransaction = {
      id: generateUniqueId(),
      ...newTransactionData
    };
    setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
  };

  const handleDeleteTransaction = (transactionId) => {
    setTransactions(prevTransactions => prevTransactions.filter(t => t.id !== transactionId));
  };

  const handleAddLoan = (newLoanData) => {
    const newLoan = {
      id: generateUniqueId(),
      ...newLoanData
    };
    setLoans(prevLoans => [...prevLoans, newLoan]);
  };

  const handleDeleteLoan = (loanId) => {
    setLoans(prevLoans => prevLoans.filter(loan => loan.id !== loanId));
  };

  const handleResetData = () => {
    if (window.confirm('¿Estás seguro de que quieres limpiar todos los datos? Esta acción es irreversible.')) {
      setTransactions([]);
      setLoans([]);
      setCurrency('PEN');
    }
  };

  if (!user) {
    return <LoginForm />; // Show login form if not authenticated
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-between items-center mb-6">
            <Header
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
              balance={balance}
              currency={currency}
            />
            <div className="flex gap-4">
              <motion.button
                onClick={() => setIsSettingsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-xl shadow-lg hover:bg-gray-300 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings className="w-5 h-5" />
                Configuración
              </motion.button>
              <motion.button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-5 h-5" />
                Cerrar Sesión
              </motion.button>
            </div>
          </div>

          <TransactionForm
            onAddTransaction={handleAddTransaction}
            currency={currency}
            setCurrency={setCurrency}
            onResetData={handleResetData}
          />

          <LoanForm onAddLoan={handleAddLoan} />

          <LoanList loans={loans} onDeleteLoan={handleDeleteLoan} />

          <CardReport transactions={transactions} />

          <motion.button
            onClick={() => setIsExportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl shadow-lg hover:bg-blue-600 transition-all duration-300 mb-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5" />
            Exportar Registros
          </motion.button>

          <TransactionList
            transactions={transactions}
            onDeleteTransaction={handleDeleteTransaction}
          />
        </motion.div>
      </div>
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        transactions={transactions}
        currency={currency}
      />
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </div>
  );
};

export default App;