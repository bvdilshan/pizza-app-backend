import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const loadToast = toast.loading('Authenticating...');

    try {
      const response = await loginUser(formData);
      const result = response.data;

      if (result.user) {
        const userWithToken = {
          ...result.user,
          token: result.token
        };
        login(userWithToken);
        
        toast.success(`Welcome back, ${result.user.name}!`, { id: loadToast });
        navigate('/');
      }
    } catch (err) {
      setIsLoading(false);
      const errorMsg = err.response?.data?.message || 'Invalid credentials';
      toast.error(errorMsg, { id: loadToast });
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-gray-100 relative overflow-hidden">
        
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-10 -mt-10"></div>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-dark-base rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3">
            <i className="fas fa-lock text-primary text-2xl"></i>
          </div>
          <h2 className="text-3xl font-poppins font-black text-dark-base uppercase tracking-tighter">
            Member <span className="text-primary">Login</span>
          </h2>
          <p className="text-gray-400 font-medium text-xs mt-2 uppercase tracking-widest">
            Enter your details below
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">
              Email Address
            </label>
            <div className="relative group">
              <i className="fas fa-envelope absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-sm"></i>
              <input 
                type="email" 
                placeholder="name@example.com"
                className="w-full pl-12 pr-5 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold text-sm"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between items-center mb-2 ml-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Password
              </label>
              <a href="#" className="text-[10px] text-primary font-black hover:text-dark-base transition-colors uppercase">
                Forgot?
              </a>
            </div>
            <div className="relative group">
              <i className="fas fa-key absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-sm"></i>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full pl-12 pr-5 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold text-sm"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-dark-base hover:bg-primary text-white font-black py-4 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest text-xs mt-4"
          >
            {isLoading ? (
              <i className="fas fa-circle-notch animate-spin"></i>
            ) : (
              <>
                Sign In
                <i className="fas fa-chevron-right text-[10px]"></i>
              </>
            )}
          </button>
        </form>

        {/* Signup Link */}
        <div className="text-center mt-10 pt-8 border-t border-gray-50">
          <p className="text-gray-400 font-bold text-xs uppercase tracking-tighter">
            New to Pizza Hut? 
            <Link to="/signup" className="text-primary ml-2 hover:text-dark-base transition-colors">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;