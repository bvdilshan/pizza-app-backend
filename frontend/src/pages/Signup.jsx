/**
 * @file Signup.jsx
 * @description User registration page containing the signup form.
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../services/api';
import toast from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadToast = toast.loading('Creating your account...');

    try {
      await signupUser(formData);
      toast.success("Account created successfully! Please login.", { id: loadToast });
      navigate('/login');
    } catch (err) {
      setLoading(false);
      const errorMsg = err.response?.data?.message || "Registration failed!";
      toast.error(errorMsg, { id: loadToast });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-16 relative"
      style={{ backgroundImage: "url('/background/bg.png')" }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>

      <div className="relative bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] shadow-2xl w-full max-w-2xl border border-white/20">

        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform rotate-3">
            <i className="fas fa-user-plus text-white text-xl"></i>
          </div>
          <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight">
            Join the <span className="text-red-600 italic">Family</span>
          </h2>
          <p className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.2em] mt-1">
            Create an account to start ordering
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition-all text-[10px] font-bold text-gray-600 uppercase tracking-wider">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
            Google
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition-all text-[10px] font-bold text-gray-600 uppercase tracking-wider">
            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-4 h-4" alt="Facebook" />
            Facebook
          </button>
        </div>

        <div className="relative mb-8 text-center">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
          <span className="relative bg-white px-4 text-[9px] text-gray-400 font-bold uppercase">Or register with email</span>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="md:col-span-2">
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 ml-1 tracking-widest">Full Name</label>
            <input
              type="text" placeholder="John Doe"
              className="w-full px-5 py-3.5 bg-gray-50 rounded-xl border-2 border-transparent focus:border-red-500 focus:bg-white outline-none transition-all font-bold text-sm"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 ml-1 tracking-widest">Email Address</label>
            <input
              type="email" placeholder="john@example.com"
              className="w-full px-5 py-3.5 bg-gray-50 rounded-xl border-2 border-transparent focus:border-red-500 focus:bg-white outline-none transition-all font-bold text-sm"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 ml-1 tracking-widest">Phone Number</label>
            <input
              type="text" placeholder="07XXXXXXXX"
              className="w-full px-5 py-3.5 bg-gray-50 rounded-xl border-2 border-transparent focus:border-red-500 focus:bg-white outline-none transition-all font-bold text-sm"
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 ml-1 tracking-widest">Secure Password</label>
            <input
              type="password" placeholder="••••••••"
              className="w-full px-5 py-3.5 bg-gray-50 rounded-xl border-2 border-transparent focus:border-red-500 focus:bg-white outline-none transition-all font-bold text-sm"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 ml-1 tracking-widest">Delivery Address</label>
            <textarea
              placeholder="No, Street, City..."
              className="w-full px-5 py-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-red-500 focus:bg-white outline-none transition-all h-24 font-bold text-sm resize-none"
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            ></textarea>
          </div>

          <button
            disabled={loading}
            className="md:col-span-2 bg-gray-900 hover:bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest text-xs mt-2 disabled:opacity-50"
          >
            {loading ? <i className="fas fa-spinner animate-spin"></i> : "Create Account"}
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-gray-50">
          <p className="text-gray-400 font-bold text-[11px] uppercase">
            Already a member?
            <Link to="/login" className="text-red-600 ml-2 hover:underline">Login Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;