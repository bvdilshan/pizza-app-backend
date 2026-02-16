import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ isOpen, setIsOpen }) => {
  const { cartItems, addToCart, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleAdd = (item) => {
    addToCart(item);
    toast.success(`${item.name} quantity increased`, {
      style: { borderRadius: '10px', background: '#333', color: '#fff', fontSize: '12px' },
    });
  };

  const handleRemove = (id, name) => {
    removeFromCart(id);
    toast.error(`${name} removed from basket`, {
      style: { borderRadius: '10px', background: '#333', color: '#fff', fontSize: '12px' },
    });
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-dark-base/40 backdrop-blur-md z-[60] transition-all duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div className={`fixed top-0 right-0 h-full w-full sm:max-w-[400px] bg-white z-[70] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        <div className="flex flex-col h-full">

          <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-white">
            <div>
              <h2 className="text-2xl font-poppins font-black italic tracking-tighter text-dark-base">MY <span className="text-primary">CART</span></h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{cartItems.length} items in bucket</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group"
            >
              <i className="fas fa-times text-lg group-hover:rotate-90 transition-transform"></i>
            </button>
          </div>


          <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-hide">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center border-2 border-dashed border-gray-200">
                  <i className="fas fa-shopping-basket text-3xl text-gray-200"></i>
                </div>
                <div>
                  <h3 className="font-black text-dark-base uppercase tracking-tighter">Your cart is empty</h3>
                  <p className="text-gray-400 text-xs font-medium mt-1">Looks like you haven't added any pizza yet.</p>
                </div>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item._id} className="group flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0 shadow-sm">
                    <img
                      src={item.image || '/pizzas/default.jpg'}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="font-black text-dark-base text-[13px] uppercase tracking-tighter leading-tight pr-4">{item.name}</h4>
                      <p className="font-black text-primary italic text-sm">Rs.{item.price}</p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center bg-gray-50 rounded-xl px-2 py-1 border border-gray-100">
                        <button
                          onClick={() => handleRemove(item._id, item.name)}
                          className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-primary transition-colors"
                        >
                          <i className="fas fa-minus text-[10px]"></i>
                        </button>
                        <span className="font-black text-xs text-dark-base w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleAdd(item)}
                          className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-green-500 transition-colors"
                        >
                          <i className="fas fa-plus text-[10px]"></i>
                        </button>
                      </div>

                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                        Total: Rs. {item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-8 border-t border-gray-50 bg-white space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none mb-1">Total Bill</p>
                  <span className="text-3xl font-black text-dark-base italic tracking-tighter">Rs. {cartTotal.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-green-500 uppercase bg-green-50 px-2 py-1 rounded-md">Includes Taxes</p>
                </div>
              </div>

              <button
                className="w-full bg-dark-base hover:bg-primary text-white font-black py-5 rounded-[2rem] shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-4 group uppercase tracking-widest text-xs"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/checkout');
                }}
              >
                Go to Checkout
                <i className="fas fa-chevron-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;