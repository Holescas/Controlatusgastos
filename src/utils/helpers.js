export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatCurrency = (amount, currency = 'EUR') => {
  // Map common currency codes to their symbols
  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    PEN: 'S/',
    // Add more as needed
  };

  const symbol = currencySymbols[currency] || currency; // Fallback to code if symbol not found

  return `${symbol} ${new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)}`;
};

export const calculateTotals = (transactions) => {
  let totalIncome = 0;
  let totalExpenses = 0;

  transactions.forEach(transaction => {
    if (transaction.type === 'income') {
      totalIncome += transaction.amount;
    } else {
      totalExpenses += transaction.amount;
    }
  });

  const balance = totalIncome - totalExpenses;

  return { totalIncome, totalExpenses, balance };
};