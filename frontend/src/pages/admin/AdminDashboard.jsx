import { useEffect, useState } from 'react';
import API from '../../services/api';
import DashboardStats from '../../components/admin/DashboardStats';

const AdminDashboard = () => {
  const [data, setData] = useState({
    pizzas: 0,
    totalOrders: 0,
    revenue: 0,
    completedOrders: 0,
    pendingOrders: 0,
    activeUsers: 0,
    topSelling: []
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const menuRes = await API.get('/menu');
        const analyticsRes = await API.get('/orders/analytics');

        setData({
          pizzas: (menuRes.data.data || menuRes.data).length,
          totalOrders: analyticsRes.data.data.totalOrders,
          revenue: analyticsRes.data.data.revenue,
          completedOrders: analyticsRes.data.data.completedOrders,
          pendingOrders: analyticsRes.data.data.pendingOrders,
          activeUsers: analyticsRes.data.data.activeUsers,
          topSelling: analyticsRes.data.data.topSelling || []
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

      <DashboardStats data={data} />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
          <h3 className="text-2xl font-black mb-6 italic uppercase">Top Selling <span className="text-primary">Pizzas</span></h3>
          <ul className="space-y-4">
            {data.topSelling.length > 0 ? (
              data.topSelling.map((item, index) => (
                <li key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <span className="font-black text-gray-300 text-xl">#{index + 1}</span>
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                    <span className="font-bold">{item.name}</span>
                  </div>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black">{item.count} Sold</span>
                </li>
              ))
            ) : (
              <p className="text-gray-400 font-bold">No sales data yet.</p>
            )}
          </ul>
        </div>

        <div className="bg-white p-10 rounded-[3rem] border border-dashed border-gray-200 text-center flex flex-col items-center justify-center">
          <i className="fas fa-chart-bar text-4xl text-gray-200 mb-4"></i>
          <p className="text-gray-400 font-bold">More Charts Coming Soon...</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;