import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import CardReport from './components/CardReport';
import LoanForm from './components/LoanForm';
import LoanList from './components/LoanList';
import ExportModal from './components/ExportModal';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SettingsModal from './components/SettingsModal';
import PaymentCalendar from './components/PaymentCalendar';
import { useAuth } from './components/AuthContext';
import { defaultExpenses } from './mock/expenses';
import { defaultLoans } from './mock/loans';
import { generateUniqueId, calculateTotals } from './utils/helpers';
import { Download, Settings, LogOut } from 'lucide-react';

const App = () => {
  const { user, logout } = useAuth();
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem(`transactions_${user?.name}`);
    return saved ? JSON.parse(saved) : defaultExpenses;
  });
  const [loans, setLoans] = useState(() => {
    const saved = localStorage.getItem(`loans_${user?.name}`);
    return saved ? JSON.parse(saved) : defaultLoans;
  });
  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem(`currency_${user?.name}`);
    return saved ? saved : 'EUR';
  });
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Save data to localStorage whenever it changes and user is logged in
  useEffect(() => {
    if (user) {
      localStorage.setItem(`transactions_${user.name}`, JSON.stringify(transactions));
    }
  }, [transactions, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`loans_${user.name}`, JSON.stringify(loans));
    }
  }, [loans, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`currency_${user.name}`, currency);
    }
  }, [currency, user]);

  // Load data when user changes (after login/register)
  useEffect(() => {
    if (user) {
      const savedTransactions = localStorage.getItem(`transactions_${user.name}`);
      const savedLoans = localStorage.getItem(`loans_${user.name}`);
      const savedCurrency = localStorage.getItem(`currency_${user.name}`);
      setTransactions(savedTransactions ? JSON.parse(savedTransactions) : defaultExpenses);
      setLoans(savedLoans ? JSON.parse(savedLoans) : defaultLoans);
      setCurrency(savedCurrency ? savedCurrency : 'EUR');
    }
  }, [user]);


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

  const handleAddPayment = (loanId, paymentData) => {
    setLoans(prevLoans =>
      prevLoans.map(loan => {
        if (loan.id === loanId) {
          const newPaymentsMade = [...(loan.paymentsMade || []), paymentData];
          const newRemainingAmount = loan.remainingAmount - paymentData.amount;
          return {
            ...loan,
            paymentsMade: newPaymentsMade,
            remainingAmount: newRemainingAmount < 0 ? 0 : newRemainingAmount // Ensure it doesn't go below zero
          };
        }
        return loan;
      })
    );
  };

  const handleDeleteLoan = (loanId) => {
    setLoans(prevLoans => prevLoans.filter(loan => loan.id !== loanId));
  };

  const handleResetData = () => {
    if (window.confirm('¿Estás seguro de que quieres limpiar todos los datos? Esta acción es irreversible.')) {
      setTransactions([]);
      setLoans([]);
      setCurrency('EUR');
    }
  };

  if (!user) {
    return showRegister ? (
      <RegisterForm onSwitchToLogin={() => setShowRegister(false)} />
    ) : (
      <LoginForm onSwitchToRegister={() => setShowRegister(true)} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 mb-8 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <Header
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
              balance={balance}
              currency={currency}
            />
            <div className="flex gap-4 md:self-start">
              <motion.button
                onClick={() => setIsSettingsModalOpen(true)}
                className="p-3 bg-gray-200 text-gray-700 rounded-full shadow-lg hover:bg-gray-300 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Settings className="w-6 h-6" />
              </motion.button>
              <motion.button
                onClick={logout}
                className="p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <LogOut className="w-6 h-6" />
              </motion.button>
            </div>
          </div>

          <TransactionForm
            onAddTransaction={handleAddTransaction}
            currency={currency}
            setCurrency={setCurrency}
            onResetData={handleResetData}
          />

          <LoanForm onAddLoan={handleAddLoan} onAddPayment={handleAddPayment} loans={loans} />

          <LoanList loans={loans} onDeleteLoan={handleDeleteLoan} />

          <CardReport transactions={transactions} />

          <PaymentCalendar loans={loans} transactions={transactions} currency={currency} />

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