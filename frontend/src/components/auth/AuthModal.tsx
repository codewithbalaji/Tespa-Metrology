import { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { X, ArrowRight, User, Mail, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  // Close modal when user is authenticated
  useEffect(() => {
    if (token) {
      onClose();
    }
  }, [token, onClose]);

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (currentState === 'Sign up') {
        const response = await axios.post(backendUrl + '/api/user/register', {name, email, password});

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Account created successfully!');
          onClose();
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', {email, password});

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Welcome back!');
          onClose();
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative bg-[#27a3d4] text-white p-6">
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                >
                  <X size={24} />
                </button>
                <h2 className="text-2xl font-bold">
                  {currentState === 'Login' ? 'Welcome Back!' : 'Create Account'}
                </h2>
                <p className="text-sm text-white/80 mt-1">
                  {currentState === 'Login' 
                    ? "Sign in to access your account" 
                    : "Join TESPA for quality measuring instruments"}
                </p>
              </div>
              
              {/* Form */}
              <div className="p-6">
                <form onSubmit={onSubmitHandler} className="space-y-4">
                  {currentState === 'Sign up' && (
                    <div className="space-y-1">
                      <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User size={18} className="text-gray-400" />
                        </div>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#27a3d4] focus:border-[#27a3d4]"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail size={18} className="text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#27a3d4] focus:border-[#27a3d4]"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className="text-gray-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#27a3d4] focus:border-[#27a3d4]"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="text-sm">
                      {currentState === 'Login' ? (
                        <button
                          type="button"
                          onClick={() => setCurrentState('Sign up')}
                          className="font-medium text-[#27a3d4] hover:text-[#1d8cb8]"
                        >
                          Create new account
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setCurrentState('Login')}
                          className="font-medium text-[#27a3d4] hover:text-[#1d8cb8]"
                        >
                          Already have an account?
                        </button>
                      )}
                    </div>
                    {currentState === 'Login' && (
                      <div className="text-sm">
                        <a href="#" className="font-medium text-[#27a3d4] hover:text-[#1d8cb8]">
                          Forgot password?
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-[#27a3d4] hover:bg-[#1d8cb8] text-white py-2 rounded-lg transition-colors mt-4"
                  >
                    {currentState === 'Login' ? 'Sign In' : 'Create Account'}
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal; 