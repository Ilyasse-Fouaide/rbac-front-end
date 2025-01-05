import { Outlet } from 'react-router-dom';

import { useAuth } from '@features-auth/components/AuthProvider';
import RequirePermissionProvider from '@/context/RequirePermissionProvider';

function Admin() {
  const { user } = useAuth();

  return (
    <RequirePermissionProvider userId={user.userId}>
      <Outlet />
    </RequirePermissionProvider>
  );
}

export default Admin;
