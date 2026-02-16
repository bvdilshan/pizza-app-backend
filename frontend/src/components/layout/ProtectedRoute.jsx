import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ isAdmin, children }) => {
  const { user, loading } = useAuth();


  if (loading) return <div className="p-10 text-center font-black">LOADING...</div>;


  if (!user) {
    return <Navigate to="/login" replace />;
  }


  if (isAdmin && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }


  return children ? children : <Outlet />;
};

export default ProtectedRoute;