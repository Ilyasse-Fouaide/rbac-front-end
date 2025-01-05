import { Navigate, useLocation } from 'react-router-dom';

import { usePermissions } from '@/context/RequirePermissionProvider';

function Administrator({ children, redirectPath = '/' }) {
  const location = useLocation();
  const { checkPermissions, isLoading, isError } = usePermissions();

  if (isLoading) {
    return 'loading...';
  }

  if (isError) {
    return 'Permission Denied';
  }

  if (!checkPermissions('administrator')) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children;
}

export default Administrator;
