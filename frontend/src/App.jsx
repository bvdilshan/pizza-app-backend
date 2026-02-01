import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Public & Customer Pages
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import Menu from './pages/Menu';

// Admin Components & Pages
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AllPizzas from './pages/admin/AllPizzas';
import AddPizza from './pages/admin/AddPizza';

import ProtectedRoute from './components/layout/ProtectedRoute';

const CustomerLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      {/* Global Notifications */}
      <Toaster position="top-center" reverseOrder={false} />
      
      <Routes>
        
        {/* 1. PUBLIC & CUSTOMER ROUTES */}
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes for Registered Users */}
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<MyOrders />} />
          </Route>
        </Route>

        {/* 2. PROTECTED ADMIN ROUTES */}
        
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute isAdmin={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} /> 
          <Route path="orders" element={<AdminOrders />} />
          <Route path="all-pizzas" element={<AllPizzas />} />
          <Route path="add-pizza" element={<AddPizza />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;