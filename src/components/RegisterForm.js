import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Lock, User } from 'lucide-react';
import { useAuth } from './AuthContext';

const RegisterForm = ({ onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden. ¡Asegúrate de escribirlas bien!');
      return;
    }

    if (register(name, password)) {
      // Registered and logged in successfully
    } else {
      setError('El nombre de usuario ya existe. ¡Sé más original!');
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-xl w-full max-w-md"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <div className="text-center mb-8">
          <motion.div
            className="p-3 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl inline-block mb-4"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          >
            <UserPlus className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-800">Crea tu cuenta</h2>
          <p className="text-gray-500">Empieza a controlar tus finanzas hoy mismo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Nombre de Usuario</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <User className="w-5 h-5" />
              </span>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Elige un nombre de usuario"
                className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-500 font-medium"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Contraseña</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Crea una contraseña segura"
                className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-500 font-medium"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">Confirmar Contraseña</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite tu contraseña"
                className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-500 font-medium"
                required
              />
            </div>
          </div>

          {error && (
            <motion.p
              className="text-red-600 text-sm text-center bg-red-100 p-3 rounded-lg border border-red-200"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            className="w-full px-6 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg hover:shadow-xl hover:scale-105"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <UserPlus className="w-5 h-5" />
            Registrarse
          </motion.button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          ¿Ya tienes una cuenta?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-blue-600 font-semibold hover:underline"
          >
            Inicia Sesión
          </button>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default RegisterForm;