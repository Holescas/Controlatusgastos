import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, CalendarDays } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { formatCurrency } from '../utils/helpers';

const ExportModal = ({ isOpen, onClose, transactions, currency }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const filteredTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    if (startDate && transactionDate < startDate) return false;
    if (endDate && transactionDate > endDate) return false;
    return true;
  });

  const exportToCSV = () => {
    const dataToExport = filteredTransactions.map(t => ({
      Fecha: new Date(t.date).toLocaleDateString('es-ES'),
      Descripcion: t.description,
      Monto: t.amount, // Export raw amount for CSV
      Tipo: t.type === 'expense' ? 'Gasto' : 'Ingreso',
      Categoria: t.category || '-',
      Metodo_Pago: t.paymentMethod || '-',
      Moneda: t.currency || currency
    }));

    if (dataToExport.length === 0) {
      alert('No hay datos para exportar en el rango de fechas seleccionado.');
      return;
    }

    const headers = Object.keys(dataToExport[0]).join(',');
    const rows = dataToExport.map(row => Object.values(row).map(value => `"${value}"`).join(',')).join('\n');
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `registros_gastos_${startDate?.toLocaleDateString('es-ES') || 'inicio'}_${endDate?.toLocaleDateString('es-ES') || 'fin'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  const exportToPDF = () => {
    if (filteredTransactions.length === 0) {
      alert('No hay datos para exportar en el rango de fechas seleccionado.');
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Reporte de Gastos e Ingresos', 14, 20);
    doc.setFontSize(10);
    doc.text(`Período: ${startDate ? startDate.toLocaleDateString('es-ES') : 'Inicio'} - ${endDate ? endDate.toLocaleDateString('es-ES') : 'Fin'}`, 14, 28);

    const tableColumn = ["Fecha", "Descripción", "Tipo", "Categoría", "Método de Pago", "Monto"];
    const tableRows = [];

    filteredTransactions.forEach(t => {
      const transactionData = [
        new Date(t.date).toLocaleDateString('es-ES'),
        t.description,
        t.type === 'expense' ? 'Gasto' : 'Ingreso',
        t.category || '-',
        t.paymentMethod || '-',
        formatCurrency(t.amount, t.currency || currency)
      ];
      tableRows.push(transactionData);
    });

    // Use autoTable directly on the doc instance
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      theme: 'grid',
      styles: {
        font: 'helvetica',
        fontSize: 8,
        cellPadding: 3,
        overflow: 'linebreak'
      },
      headStyles: {
        fillColor: [22, 160, 133], // A nice green color
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      columnStyles: {
        0: { cellWidth: 20 }, // Date
        1: { cellWidth: 50 }, // Description
        2: { cellWidth: 20 }, // Type
        3: { cellWidth: 25 }, // Category
        4: { cellWidth: 25 }, // Payment Method
        5: { cellWidth: 25 }  // Amount
      }
    });

    doc.save(`registros_gastos_${startDate?.toLocaleDateString('es-ES') || 'inicio'}_${endDate?.toLocaleDateString('es-ES') || 'fin'}.pdf`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md relative"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Exportar Registros</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Fecha de Inicio</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <CalendarDays className="w-5 h-5" />
                  </span>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Selecciona fecha de inicio"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-500 font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Fecha de Fin</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <CalendarDays className="w-5 h-5" />
                  </span>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Selecciona fecha de fin"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-500 font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <motion.button
                onClick={exportToCSV}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl shadow-lg hover:bg-green-600 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-5 h-5" />
                Exportar CSV
              </motion.button>
              <motion.button
                onClick={exportToPDF}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-xl shadow-lg hover:bg-purple-600 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-5 h-5" />
                Exportar PDF
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExportModal;