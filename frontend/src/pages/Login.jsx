/**
 * @file Login.jsx
 * @description User login page with form handling and authentication logic.
 */
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
        const userWithToken = { ...result.user, token: result.token };
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
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-12"
      style={{ backgroundImage: "url('/background/bg.png')" }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

      <div className="relative bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-[2rem] shadow-2xl w-full max-w-md border border-white/20">

        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform -rotate-6">
            <i className="fas fa-pizza-slice text-white text-2xl"></i>
          </div>
          <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight">
            Welcome <span className="text-red-600">Back</span>
          </h2>
          <p className="text-gray-500 font-medium text-[10px] mt-1 uppercase tracking-[0.2em]">
            The best pizza is just a login away
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <button className="flex items-center justify-center gap-2 py-3 border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition-all active:scale-95 group">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 py-3 border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition-all active:scale-95 group">
            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5" alt="Facebook" />
            <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Facebook</span>
          </button>
        </div>

        <div className="relative mb-8 text-center">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
          <span className="relative bg-white px-4 text-[10px] text-gray-400 font-bold uppercase">Or use email</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1 tracking-widest">Email Address</label>
            <input
              type="email"
              className="w-full px-5 py-3.5 bg-gray-50 rounded-xl border-2 border-transparent focus:border-red-500 focus:bg-white outline-none transition-all font-bold text-sm"
              placeholder="name@example.com"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2 ml-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Password</label>
              <a href="#" className="text-[10px] text-red-600 font-black hover:underline uppercase">Forgot?</a>
            </div>
            <input
              type="password"
              className="w-full px-5 py-3.5 bg-gray-50 rounded-xl border-2 border-transparent focus:border-red-500 focus:bg-white outline-none transition-all font-bold text-sm"
              placeholder="••••••••"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gray-900 hover:bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-[0.15em] text-xs mt-6"
          >
            {isLoading ? <i className="fas fa-circle-notch animate-spin"></i> : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-gray-50">
          <p className="text-gray-400 font-bold text-[11px] uppercase">
            New to Pizza Hut?
            <Link to="/signup" className="text-red-600 ml-2 hover:underline">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;