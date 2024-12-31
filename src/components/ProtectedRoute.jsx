import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@features-auth/components/AuthProvider';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Chech auth...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}
