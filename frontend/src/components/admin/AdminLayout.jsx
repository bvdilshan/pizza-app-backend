import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">

      <aside className="w-64 bg-dark-base text-white flex flex-col fixed h-full shadow-2xl">
        <div className="p-8 text-2xl font-black italic border-b border-white/10">
          PIZZA <span className="text-primary">ADMIN</span>
        </div>

        <nav className="flex-grow p-4 space-y-2 mt-4">
          <Link to="/admin" className="block p-4 hover:bg-primary rounded-2xl font-bold transition flex items-center gap-3">
            <i className="fas fa-chart-pie"></i> Analysis
          </Link>
          <Link to="/admin/orders" className="block p-4 hover:bg-primary rounded-2xl font-bold transition flex items-center gap-3">
            <i className="fas fa-shopping-cart"></i> Orders
          </Link>
          <Link to="/admin/all-pizzas" className="block p-4 hover:bg-primary rounded-2xl font-bold transition flex items-center gap-3">
            <i className="fas fa-list"></i> All Pizzas
          </Link>
          <Link to="/admin/add-pizza" className="block p-4 hover:bg-primary rounded-2xl font-bold transition flex items-center gap-3">
            <i className="fas fa-plus-circle"></i> Add New
          </Link>
          <Link to="/admin/users" className="block p-4 hover:bg-primary rounded-2xl font-bold transition flex items-center gap-3">
            <i className="fas fa-users"></i> Customers
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link to="/" className="block p-4 text-gray-400 hover:text-white font-bold transition italic">
            <i className="fas fa-arrow-left mr-2"></i> Exit Admin
          </Link>
        </div>
      </aside>


      <main className="flex-grow ml-64 p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;