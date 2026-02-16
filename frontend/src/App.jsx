/**
 * @file App.jsx
 * @description Main application component defining routes and layout structure.
 */
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import Menu from './pages/Menu';

import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AllPizzas from './pages/admin/AllPizzas';
import AddPizza from './pages/admin/AddPizza';
import EditPizza from './pages/admin/EditPizza';
import Customers from './pages/admin/Customers';

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
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>

        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<MyOrders />} />
          </Route>
        </Route>


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
          <Route path="edit-pizza/:id" element={<EditPizza />} />
          <Route path="users" element={<Customers />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;