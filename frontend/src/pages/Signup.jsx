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
    <div className="min-h-screen flex items-center justify-center py-16 px-4 bg-gray-50">
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-2xl border border-gray-100">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-user-plus text-primary text-2xl"></i>
          </div>
          <h2 className="text-3xl font-poppins font-black text-dark-base uppercase tracking-tighter">
            Join the <span className="text-primary italic">Family</span>
          </h2>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-2">
            Create an account to start ordering
          </p>
        </div>

        {/* Form Section */}
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Full Name */}
          <div className="md:col-span-2">
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Full Name</label>
            <div className="relative">
              <i className="fas fa-user absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input 
                type="text" placeholder="John Doe"
                className="w-full pl-12 pr-5 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold text-sm"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Email Address</label>
            <div className="relative">
              <i className="fas fa-envelope absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input 
                type="email" placeholder="john@example.com"
                className="w-full pl-12 pr-5 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold text-sm"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Phone Number</label>
            <div className="relative">
              <i className="fas fa-phone absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input 
                type="text" placeholder="07XXXXXXXX"
                className="w-full pl-12 pr-5 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold text-sm"
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="md:col-span-2">
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Secure Password</label>
            <div className="relative">
              <i className="fas fa-key absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input 
                type="password" placeholder="••••••••"
                className="w-full pl-12 pr-5 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold text-sm"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Delivery Address</label>
            <div className="relative">
              <i className="fas fa-map-marker-alt absolute left-5 top-6 text-gray-400 text-sm"></i>
              <textarea 
                placeholder="No, Street, City..."
                className="w-full pl-12 pr-5 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all h-28 font-bold text-sm resize-none"
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                required
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            disabled={loading}
            className="md:col-span-2 bg-dark-base hover:bg-primary text-white font-black py-4 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest text-xs mt-2 disabled:opacity-50"
          >
            {loading ? <i className="fas fa-spinner animate-spin"></i> : "Create Account"}
            {!loading && <i className="fas fa-chevron-right text-[10px]"></i>}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-8 pt-8 border-t border-gray-50">
          <p className="text-gray-400 font-bold text-xs uppercase tracking-tighter">
            Already a member? 
            <Link to="/login" className="text-primary ml-2 hover:text-dark-base transition-colors">Login Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;