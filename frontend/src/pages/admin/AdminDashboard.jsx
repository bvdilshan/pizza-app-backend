import { useEffect, useState } from 'react';
import API from '../../services/api';

const AdminDashboard = () => {
  const [data, setData] = useState({ pizzas: 0, orders: 0, revenue: 0 });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const menuRes = await API.get('/menu');
        const orderRes = await API.get('/orders/all-orders');
        
        const orders = orderRes.data.data || [];
        const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

        setData({
          pizzas: (menuRes.data.data || menuRes.data).length,
          orders: orders.length,
          revenue: totalRevenue
        });
      } catch (err) {
        console.error("Error loading analysis", err);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-4xl font-black italic mb-10 uppercase tracking-tighter">Business <span className="text-primary text-xl">Analysis</span></h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Total Pizzas */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border-l-8 border-primary relative overflow-hidden">
           <i className="fas fa-pizza-slice absolute -right-4 -bottom-4 text-7xl text-gray-50"></i>
           <p className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-2">Inventory Size</p>
           <h2 className="text-5xl font-black">{data.pizzas} <span className="text-lg text-gray-400">Items</span></h2>
        </div>

        {/* Total Orders */}
        <div className="bg-dark-base text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
           <i className="fas fa-shopping-bag absolute -right-4 -bottom-4 text-7xl text-white/5"></i>
           <p className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-2">Total Orders</p>
           <h2 className="text-5xl font-black">{data.orders} <span className="text-lg text-white/40">Sold</span></h2>
        </div>

        {/* Revenue */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border-l-8 border-green-500 relative overflow-hidden">
           <i className="fas fa-money-bill-wave absolute -right-4 -bottom-4 text-7xl text-gray-50"></i>
           <p className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-2">Total Revenue</p>
           <h2 className="text-4xl font-black text-green-600 font-poppins">Rs. {data.revenue.toLocaleString()}</h2>
        </div>
      </div>

      <div className="mt-12 bg-white p-10 rounded-[3rem] border border-dashed border-gray-200 text-center">
          <p className="text-gray-400 font-bold">Sales Graph & Charts Coming Soon...</p>
      </div>
    </div>
  );
};

export default AdminDashboard;