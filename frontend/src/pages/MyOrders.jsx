/**
 * @file MyOrders.jsx
 * @description Page for displaying user's order history and status.
 */
import { useEffect, useState } from 'react';
import { getMyOrders } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?._id) return;

      try {
        setLoading(true);
        const { data } = await getMyOrders(user._id);
        setOrders(data.data || []);
      } catch (err) {
        toast.error("Failed to load your orders");
        console.error("Orders fetching failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-black text-[10px] uppercase tracking-widest text-gray-400">Retrieving Orders</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 min-h-screen">

      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-poppins font-black text-dark-base italic uppercase tracking-tighter">
            Order <span className="text-primary text-xl">History</span>
          </h2>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">Review your past pizza feasts</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 h-fit">
          <span className="text-[10px] font-black text-gray-400 uppercase mr-2">Total Orders:</span>
          <span className="font-black text-primary">{orders.length}</span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] p-16 text-center shadow-xl shadow-gray-200/50 border border-gray-100">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-box-open text-3xl text-gray-200"></i>
          </div>
          <h3 className="font-black text-dark-base uppercase tracking-tighter mb-2">No orders found</h3>
          <p className="text-gray-400 text-xs font-medium max-w-xs mx-auto mb-8 leading-relaxed">
            It looks like you haven't placed any orders yet. Time to grab a slice!
          </p>
          <a href="/menu" className="inline-block bg-primary text-white font-black px-8 py-3 rounded-xl text-[10px] uppercase tracking-widest shadow-lg shadow-primary/30 hover:bg-dark-base transition-all active:scale-95">
            Explore Menu
          </a>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order._id} className="group bg-white p-6 sm:p-8 rounded-[2rem] shadow-xl shadow-gray-200/40 border border-gray-50 hover:border-primary/20 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-primary border border-gray-100 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                    <i className="fas fa-receipt text-xl"></i>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Order Ref</p>
                    <p className="font-black text-dark-base uppercase tracking-tighter">#{order._id.slice(-8)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <i className="far fa-calendar-alt text-[10px] text-primary"></i>
                      <span className="text-xs font-bold text-gray-500 italic">{new Date(order.createdAt).toDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:items-end">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Amount Paid</p>
                  <p className="text-2xl font-black text-primary italic tracking-tighter leading-none mt-1">Rs. {order.totalAmount.toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 ${order.status === 'Delivered'
                    ? 'bg-green-50 border-green-100 text-green-600'
                    : 'bg-orange-50 border-orange-100 text-orange-600 animate-pulse'
                    }`}>
                    {order.status}
                  </div>
                  <button className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 hover:bg-dark-base hover:text-white transition-all flex items-center justify-center">
                    <i className="fas fa-chevron-right text-xs"></i>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;