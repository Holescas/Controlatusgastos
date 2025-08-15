import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const ExportButton = ({ transactions, currency }) => {
  const handleExport = () => {
    const dataToExport = transactions.map(t => ({
      Fecha: new Date(t.date).toLocaleDateString('es-ES'),
      Descripcion: t.description,
      Monto: formatCurrency(t.amount, currency),
      Tipo: t.type === 'expense' ? 'Gasto' : 'Ingreso',
      Categoria: t.category || '-',
      Metodo_Pago: t.paymentMethod || '-'
    }));

    const headers = Object.keys(dataToExport[0]).join(',');
    const rows = dataToExport.map(row => Object.values(row).map(value => `"${value}"`).join(',')).join('\n');
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `registros_gastos_${new Date().getFullYear()}_${new Date().getMonth() + 1}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl shadow-lg hover:bg-blue-600 transition-all duration-300 mb-8"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Download className="w-5 h-5" />
      Exportar Registros (CSV)
    </motion.button>
  );
};

export default ExportButton;