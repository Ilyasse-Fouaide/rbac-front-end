import { usePermissions } from '@/context/RequirePermissionProvider';

// protect components
function RequirePermission({ permission, loading, children }) {
  const { checkPermissions, isLoading, isError, error } = usePermissions();

  if (isLoading) {
    return loading; // loading component
  }

  if (isError) {
    return (
      <pre className="p-4 text-red-500">Error: {JSON.stringify(error)}</pre>
    );
  }

  if (!checkPermissions(permission)) {
    return null;
  }

  return children;
}

export default RequirePermission;
