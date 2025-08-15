import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, CheckCircle, XCircle } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { formatCurrency } from '../utils/helpers';

const PaymentCalendar = ({ loans, transactions, currency }) => {
  const events = [];

  // Add loan due dates to events
  loans.forEach(loan => {
    // Ensure paymentsMade is an array before calling reduce
    const paymentsMade = Array.isArray(loan.paymentsMade) ? loan.paymentsMade : [];
    const totalPaid = paymentsMade.reduce((sum, payment) => sum + payment.amount, 0);
    
    if (totalPaid < loan.amount) { // Only add if loan is not fully paid
      events.push({
        date: new Date(loan.dueDate),
        title: `Pago Préstamo ${loan.bank}`,
        amount: loan.monthlyPayment,
        type: 'loan_due',
        status: new Date(loan.dueDate) < new Date() ? 'overdue' : 'upcoming',
        id: loan.id
      });
    }
  });

  // Add upcoming bill payments (example - you might need to define these more concretely)
  // For now, let's just add some example "bill" transactions that are expenses
  transactions.filter(t => t.type === 'expense').forEach(expense => {
    // This is a simplified example. In a real app, you'd have recurring bills with specific due dates.
    // For demonstration, we'll just use the transaction date as a "bill" date.
    events.push({
      date: new Date(expense.date),
      title: `Gasto: ${expense.description}`,
      amount: expense.amount,
      type: 'expense',
      status: 'paid', // Assuming past expenses are paid
      id: expense.id
    });
  });

  // Sort events by date
  events.sort((a, b) => a.date - b.date);

  // Group events by date for display
  const groupedEvents = events.reduce((acc, event) => {
    const dateString = event.date.toDateString();
    if (!acc[dateString]) {
      acc[dateString] = [];
    }
    acc[dateString].push(event);
    return acc;
  }, {});

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-6 mb-8 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <CalendarDays className="w-5 h-5 text-orange-500" />
        <h2 className="text-lg font-bold text-gray-800">
          Calendario de Pagos
        </h2>
      </div>

      {events.length === 0 && (
        <motion.div
          className="text-center py-4 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p>No hay eventos de pago próximos. ¡Qué alivio!</p>
        </motion.div>
      )}

      {events.length > 0 && (
        <div className="space-y-4">
          {Object.entries(groupedEvents).map(([dateString, dailyEvents]) => (
            <div key={dateString} className="border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-700 mb-2">
                {new Date(dateString).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </h3>
              <ul className="space-y-2">
                {dailyEvents.map(event => (
                  <li key={event.id + event.type} className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      {event.status === 'overdue' && <XCircle className="w-4 h-4 text-red-500" />}
                      {event.status === 'upcoming' && <CalendarDays className="w-4 h-4 text-blue-500" />}
                      {event.status === 'paid' && <CheckCircle className="w-4 h-4 text-green-500" />}
                      <span>{event.title}</span>
                    </div>
                    <span className={`font-medium ${event.status === 'overdue' ? 'text-red-600' : ''}`}>
                      {formatCurrency(event.amount, currency)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default PaymentCalendar;