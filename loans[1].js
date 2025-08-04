export const defaultLoans = [
  {
    id: 'loan-1',
    bank: 'Interbank',
    amount: 5000.00,
    interestRate: 0.05, // 5% anual
    startDate: new Date('2025-06-01'),
    dueDate: new Date('2026-06-01'),
    monthlyPayment: 438.73,
    remainingAmount: 5000.00,
    paymentsMade: [
      { date: new Date('2025-06-01'), amount: 438.73 },
      { date: new Date('2025-07-01'), amount: 438.73 }
    ]
  },
  {
    id: 'loan-2',
    bank: 'BBVA',
    amount: 10000.00,
    interestRate: 0.04, // 4% anual
    startDate: new Date('2025-05-15'),
    dueDate: new Date('2027-05-15'),
    monthlyPayment: 452.27,
    remainingAmount: 10000.00,
    paymentsMade: [
      { date: new Date('2025-05-15'), amount: 452.27 },
      { date: new Date('2025-06-15'), amount: 452.27 },
      { date: new Date('2025-07-15'), amount: 452.27 }
    ]
  }
];