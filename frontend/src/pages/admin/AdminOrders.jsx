import { useEffect, useState } from 'react';

import API from "../../services/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);


  const fetchAllOrders = async () => {
    try {
      const { data } = await API.get('/orders/all-orders');
      setOrders(data.data);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);


  const handleStatusUpdate = async (orderId, newStatus) => {
    try {

      const response = await API.patch(`/orders/update-status/${orderId}`, { status: newStatus });

      if (response.data.status === 'success') {
        alert(`Status changed to ${newStatus}`);
        fetchAllOrders();
      }
    } catch (err) {
      console.error("Update error", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h2 className="text-3xl font-black mb-8 italic">MANAGE ORDERS </h2>

      <div className="overflow-x-auto shadow-2xl rounded-3xl">
        <table className="w-full text-left bg-white">
          <thead className="bg-dark-base text-white uppercase text-sm">
            <tr>
              <th className="p-5">Customer</th>
              <th className="p-5">Items</th>
              <th className="p-5">Total</th>
              <th className="p-5">Payment</th>
              <th className="p-5">Status</th>
              <th className="p-5">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 transition">
                <td className="p-5 font-bold">{order.user?.name} <br /> <span className="text-xs font-normal text-gray-400">{order.phone}</span></td>
                <td className="p-5 text-sm">
                  {order.items.map(i => `${i.pizza?.name || 'Pizza'} x ${i.quantity}`).join(', ')}
                </td>
                <td className="p-5 font-black text-primary font-poppins">Rs. {order.totalAmount}</td>
                <td className="p-5">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-500 uppercase">{order.paymentMethod}</span>
                    {order.paymentMethod === 'PayHere' && (
                      <span className={`text-[10px] font-black ${order.paymentStatus === 'Success' ? 'text-green-500' : 'text-red-500'}`}>
                        {order.paymentStatus || 'Pending'}
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                    {order.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-5">
                  <select
                    className="bg-gray-100 border-none rounded-lg text-xs p-2 outline-none focus:ring-2 focus:ring-primary"
                    value={order.status}
                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                  >
                    <option value="Placed">Placed</option>
                    <option value="Preparing">Preparing</option>
                    <option value="On the Way">On the Way</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;