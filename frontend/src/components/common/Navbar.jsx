/**
 * @file Navbar.jsx
 * @description Navigation bar component with cart drawer toggle and user authentication links.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import CartDrawer from './CartDrawer';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out', {
      style: { borderRadius: '10px', background: '#333', color: '#fff' }
    });
  };

  return (
    <>
      <nav className="bg-dark-base text-white px-4 md:px-12 py-4 flex justify-between items-center shadow-2xl sticky top-0 z-50 border-b border-white/5">

        <button
          className="md:hidden text-2xl p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-xl group-hover:rotate-[15deg] transition-transform duration-300">
            <i className="fas fa-pizza-slice text-xl"></i>
          </div>
          <span className="text-xl md:text-2xl font-poppins font-black tracking-tighter italic">
            CRUST<span className="text-primary">ORIA</span>
          </span>
        </Link>

        <div className="hidden md:flex gap-8 font-poppins text-xs font-black uppercase tracking-widest items-center">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/menu" className="hover:text-primary transition-colors">Menu</Link>
          <Link to="/orders" className="hover:text-primary transition-colors">My Orders</Link>

          {user?.role === 'admin' && (
            <Link to="/admin" className="bg-white/10 px-4 py-2 rounded-lg text-primary hover:bg-primary hover:text-white transition-all border border-primary/20">
              <i className="fas fa-user-shield mr-2"></i>Admin Dashboard
            </Link>
          )}
        </div>

        <div className="flex gap-2 md:gap-5 items-center">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-3 hover:bg-white/5 rounded-full transition-all group"
          >
            <i className="fas fa-shopping-basket text-xl group-hover:text-primary"></i>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-primary text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-dark-base">
                {cartCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-2 md:gap-4 bg-white/5 py-1.5 pl-4 pr-1.5 rounded-2xl border border-white/10">
              <div className="flex flex-col items-end hidden lg:flex">
                <span className="text-[9px] text-gray-500 font-black uppercase tracking-tighter">Verified User</span>
                <span className="text-xs font-black text-white leading-tight uppercase tracking-tighter">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-primary hover:bg-white hover:text-primary text-[10px] font-black px-4 py-2 rounded-xl transition-all shadow-xl"
              >
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-primary hover:bg-white hover:text-primary text-white px-6 py-2.5 rounded-xl font-poppins font-black text-[10px] tracking-widest transition-all shadow-lg uppercase"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      <div className={`fixed inset-0 bg-dark-base z-[45] transition-transform duration-500 md:hidden ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 text-2xl font-black uppercase italic text-white">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/menu" onClick={() => setIsMobileMenuOpen(false)}>Menu</Link>
          <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)}>My Orders</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="text-primary" onClick={() => setIsMobileMenuOpen(false)}>Admin</Link>
          )}
        </div>
      </div>

      <CartDrawer isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </>
  );
};

export default Navbar;