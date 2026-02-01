import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark-base text-gray-400 py-16 px-6 mt-auto border-t border-soft-dark">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <h3 className="text-white font-poppins text-2xl font-black italic tracking-tighter">
            CRUST<span className="text-primary">ORIA</span>
          </h3>
          <p className="text-sm leading-relaxed max-w-xs">
            The premium pizza experience in Sri Lanka. Crafted with fresh ingredients and delivered with speed to your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-poppins text-sm font-bold uppercase tracking-widest mb-6">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="/privacy" className="hover:text-primary transition-colors duration-300 block">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-primary transition-colors duration-300 block">Terms of Service</a></li>
            <li><a href="/faq" className="hover:text-primary transition-colors duration-300 block">Help & FAQ</a></li>
            <li><a href="/contact" className="hover:text-primary transition-colors duration-300 block">Contact Us</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-poppins text-sm font-bold uppercase tracking-widest mb-6">Our Menu</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="/menu?category=Veg" className="hover:text-primary transition-colors duration-300 block">Vegetarian</a></li>
            <li><a href="/menu?category=Chicken" className="hover:text-primary transition-colors duration-300 block">Chicken Special</a></li>
            <li><a href="/menu?category=Meat" className="hover:text-primary transition-colors duration-300 block">Meat Lovers</a></li>
            <li><a href="/menu?category=Seafood" className="hover:text-primary transition-colors duration-300 block">Seafood Feast</a></li>
          </ul>
        </div>

        {/* Social Section */}
        <div>
          <h3 className="text-white font-poppins text-sm font-bold uppercase tracking-widest mb-6">Connect With Us</h3>
          <div className="flex gap-5">
            <a href="#" className="w-10 h-10 rounded-full bg-soft-dark flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-soft-dark flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-soft-dark flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
          <div className="mt-6">
            <p className="text-xs font-bold text-gray-500 uppercase">Hotline</p>
            <p className="text-white font-black text-lg">0112 500 500</p>
          </div>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto text-center mt-16 pt-8 border-t border-soft-dark/50">
        <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-500">
          &copy; 2026 Pizza Hut Sri Lanka. All Rights Reserved. Crafted for excellence.
        </p>
      </div>
    </footer>
  );
};

export default Footer;