export const defaultLoans = [
  {
    id: 'loan-1',
    bank: 'Interbank',
    amount: 5000.00,
    interestRate: 0.05, // 5% anual
    startDate: new Date('2024-06-01'),
    dueDate: new Date('2025-06-01'),
    monthlyPayment: 438.73, // Example calculated payment
    remainingAmount: 5000.00,
    paymentsMade: [
      { date: new Date('2024-06-01'), amount: 438.73 },
      { date: new Date('2024-07-01'), amount: 438.73 }
    ],
    currency: 'PEN' // Added currency
  },
  {
    id: 'loan-2',
    bank: 'BBVA',
    amount: 10000.00,
    interestRate: 0.04, // 4% anual
    startDate: new Date('2024-05-15'),
    dueDate: new Date('2026-05-15'),
    monthlyPayment: 452.27, // Example calculated payment
    remainingAmount: 10000.00,
    paymentsMade: [
      { date: new Date('2024-05-15'), amount: 452.27 },
      { date: new Date('2024-06-15'), amount: 452.27 },
      { date: new Date('2024-07-15'), amount: 452.27 }
    ],
    currency: 'USD' // Added currency
  },
  {
    id: 'loan-3', // Added a new loan to ensure paymentsMade is always an array
    bank: 'Saga Falabella',
    amount: 2000.00,
    interestRate: 0.06,
    startDate: new Date('2024-07-01'),
    dueDate: new Date('2025-07-01'),
    monthlyPayment: 172.50,
    remainingAmount: 2000.00,
    paymentsMade: [], // Ensure it's an empty array if no payments yet
    currency: 'EUR' // Added currency
  }
];