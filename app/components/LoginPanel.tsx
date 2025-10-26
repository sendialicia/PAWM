"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface LoginPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userData: { id: number; email: string; role: string }) => void;
}

export default function LoginPanel({ isOpen, onClose, onLoginSuccess }: LoginPanelProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Login successful!');
        console.log('User logged in:', data.user);
        // Call onLoginSuccess with user data
        setTimeout(() => {
          onLoginSuccess(data.user);
        }, 1500);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ 
              type: "spring", 
              damping: 30, 
              stiffness: 300,
              mass: 0.8,
              opacity: { duration: 0.2 }
            }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-40 flex flex-col border-l border-gray-200"
          >
            {/* Header dengan close button */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <X size={20} className="text-gray-600" />
                </motion.button>
                
              </div>
            </div>

            {/* Tab Login */}
            <div className="px-6 pt-6">
              <div className="flex border-b border-gray-200">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="px-6 py-3 text-sm font-medium text-gray-900 border-b-2 border-blue-500 bg-white"
                >
                  Login
                </motion.button>
              </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 px-6 py-8">
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Success Message */}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm"
                  >
                    {success}
                  </motion.div>
                )}

                {/* Email Field */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Email:
                  </label>
                  <motion.input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    whileFocus={{ scale: 1.01 }}
                    className="w-full border-b-2 border-blue-400 focus:border-blue-600 outline-none pb-2 transition-colors duration-200"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Password:
                  </label>
                  <motion.input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    whileFocus={{ scale: 1.01 }}
                    className="w-full border-b-2 border-gray-300 focus:border-blue-600 outline-none pb-2 transition-colors duration-200"
                  />
                </div>

                {/* Login Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className={`w-full font-medium py-3 px-4 transition-colors duration-200 mt-8 ${
                    isLoading 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  {isLoading ? 'Logging in...' : 'Log in to the Lab'}
                </motion.button>
              </form>

              {/* Footer text */}
              <p className="text-sm text-gray-500 mt-6">
                Work for a Member organization and forgot your password?
              </p>
            </div>
          </motion.div>
      )}
    </AnimatePresence>
  );
}
