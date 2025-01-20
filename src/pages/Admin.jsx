import { Outlet } from 'react-router-dom';

import { useAuth } from '@features-auth/components/AuthProvider';
import RequirePermissionProvider from '@/context/RequirePermissionProvider';
import { Toaster } from '@/components/ui/toaster';

function Admin() {
  const { user } = useAuth();

  return (
    <RequirePermissionProvider userId={user.userId}>
      <Outlet />
      <Toaster />
    </RequirePermissionProvider>
  );
}

export default Admin;
