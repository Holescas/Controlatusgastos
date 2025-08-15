import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Lock, LogOut } from 'lucide-react';
import { useAuth } from './AuthContext';

const SettingsModal = ({ isOpen, onClose }) => {
  const { user, changePassword, logout } = useAuth();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleChangePassword = (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    if (newPassword !== confirmNewPassword) {
      setMessage('Las nuevas contraseñas no coinciden. ¡No te sabotees a ti mismo!');
      setMessageType('error');
      return;
    }

    if (changePassword(oldPassword, newPassword)) {
      setMessage('Contraseña cambiada con éxito. ¡Ahora a no olvidarla!');
      setMessageType('success');
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } else {
      setMessage('Contraseña antigua incorrecta. ¿Seguro que es esa?');
      setMessageType('error');
    }
  };

  const handleLogout = () => {
    logout();
    onClose(); // Close modal after logout
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Settings className="w-6 h-6" /> Configuración
            </h2>

            <div className="space-y-6">
              {/* Change Password Section */}
              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Lock className="w-5 h-5" /> Cambiar Contraseña
                </h3>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label htmlFor="oldPassword" className="block text-gray-700 text-sm font-medium mb-2">Contraseña Antigua</label>
                    <input
                      type="password"
                      id="oldPassword"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50/80 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-gray-700 text-sm font-medium mb-2">Nueva Contraseña</label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50/80 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmNewPassword" className="block text-gray-700 text-sm font-medium mb-2">Confirmar Nueva Contraseña</label>
                    <input
                      type="password"
                      id="confirmNewPassword"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50/80 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  {message && (
                    <motion.p
                      className={`text-sm p-2 rounded-lg border ${
                        messageType === 'success' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'
                      }`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {message}
                    </motion.p>
                  )}
                  <motion.button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Actualizar Contraseña
                  </motion.button>
                </form>
              </div>

              {/* Logout Section */}
              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <LogOut className="w-5 h-5" /> Cerrar Sesión
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  ¿Necesitas un descanso de tus finanzas? Cierra sesión aquí.
                </p>
                <motion.button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cerrar Sesión
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;