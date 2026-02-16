/**
 * @file Checkout.jsx
 * @description Checkout page for order placement and payment processing.
 */
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { placeOrder } from '../services/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState('COD');

  const [formData, setFormData] = useState({
    address: user?.address || '',
    phone: user?.phone || ''
  });


  const handlePayHerePayment = (payHereData) => {

    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", "https://sandbox.payhere.lk/pay/checkout");
    form.setAttribute("target", "_self");

    Object.keys(payHereData).forEach(key => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", payHereData[key]);
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      toast.error('Session expired. Please login again.');
      return navigate('/login');
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    const orderData = {
      user: user._id,
      items: cartItems.map(item => ({
        pizza: item._id,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: cartTotal,
      address: formData.address,
      phone: formData.phone,
      paymentMethod: paymentMethod
    };

    const loadToast = toast.loading('Processing your order...');
    setLoading(true);

    try {
      const response = await placeOrder(orderData);

      if (paymentMethod === 'PayHere' && response.data.payHereData) {
        toast.success("Redirecting to PayHere...", { id: loadToast });
        handlePayHerePayment(response.data.payHereData);

        clearCart();
      } else {
        toast.success('Order Placed Successfully!', { id: loadToast });
        clearCart();
        navigate('/orders');
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || 'Order failed. Please try again', { id: loadToast });
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 min-h-screen bg-gray-50/30">
      <div className="mb-10">
        <h2 className="text-3xl font-poppins font-black text-dark-base italic uppercase tracking-tighter">
          Finalize <span className="text-primary text-xl">Order</span>
        </h2>
        <div className="h-1 w-20 bg-primary mt-2 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100">
            <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-gray-400">Items in Bucket</h3>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 mb-8">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <div className="flex flex-col">
                    <span className="font-black text-dark-base text-sm uppercase">{item.name}</span>
                    <span className="text-[10px] font-bold text-gray-400">QUANTITY: {item.quantity}</span>
                  </div>
                  <span className="font-black text-dark-base text-sm italic">Rs. {item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t-4 border-double border-gray-100 pt-6">
              <div className="flex justify-between items-center">
                <span className="font-black text-gray-400 text-xs uppercase tracking-tighter">Total Amount</span>
                <span className="text-3xl font-black text-primary italic tracking-tighter">Rs. {cartTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 order-1 lg:order-2">
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100">
              <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-gray-400">Delivery Details</h3>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase mb-3 ml-2">
                    <i className="fas fa-map-marker-alt text-primary"></i> Shipping Address
                  </label>
                  <textarea
                    className="w-full p-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white focus:shadow-inner outline-none transition-all h-32 font-medium text-sm"
                    placeholder="Provide your full street address and city..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase mb-3 ml-2">
                    <i className="fas fa-phone text-primary"></i> Contact Number
                  </label>
                  <input
                    type="tel"
                    placeholder="07xxxxxxxx"
                    className="w-full p-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white focus:shadow-inner outline-none transition-all font-bold text-sm"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100">
              <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-gray-400">Payment Method</h3>
              <div className="grid grid-cols-2 gap-4">
                <label className={`cursor-pointer p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'COD' ? 'border-primary bg-orange-50/50 text-primary' : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200'}`}>
                  <input type="radio" name="payment" className="hidden" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
                  <i className="fas fa-money-bill-wave text-2xl"></i>
                  <span className="text-[10px] font-black uppercase tracking-wider">Cash on Delivery</span>
                </label>

                <label className={`cursor-pointer p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'PayHere' ? 'border-blue-500 bg-blue-50/50 text-blue-600' : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200'}`}>
                  <input type="radio" name="payment" className="hidden" value="PayHere" checked={paymentMethod === 'PayHere'} onChange={() => setPaymentMethod('PayHere')} />
                  <i className="fas fa-credit-card text-2xl"></i>
                  <span className="text-[10px] font-black uppercase tracking-wider">PayHere</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? 'bg-gray-400' : 'bg-dark-base hover:bg-primary'} text-white font-black py-5 rounded-[2rem] shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-4 group uppercase tracking-widest text-sm`}
            >
              {loading ? (
                <i className="fas fa-spinner animate-spin"></i>
              ) : (
                <>
                  Confirm and Pay
                  <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
                </>
              )}
            </button>
          </form>

          <p className="text-center text-[10px] text-gray-400 mt-6 font-bold uppercase tracking-widest">
            By placing this order you agree to our terms and conditions
          </p>
        </div>

      </div>
    </div>
  );
};

export default Checkout;