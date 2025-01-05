import React from 'react';
import { useQuery } from '@tanstack/react-query';
import UseFetchUserPermissions from '@/hooks/useFetchUserPermissions';

const RequirePermissionContext = React.createContext(null);

export const usePermissions = () => {
  const context = React.useContext(RequirePermissionContext);

  if (!context) {
    throw new Error(
      'usePermission must be used whithin a RequirePermissionProvider.',
    );
  }

  return context;
};

export default function RequirePermissionProvider({ children, userId }) {
  const {
    data: permissions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['user', userId, 'permissions'],
    queryFn: () => UseFetchUserPermissions(userId),
    enabled: !!userId,
  });

  const checkPermissions = React.useCallback(
    (requirePermission) => {
      if (!permissions) return false;
      return permissions.includes(requirePermission);
    },
    [permissions],
  );

  const contextValues = React.useMemo(
    () => ({
      permissions,
      checkPermissions,
      isLoading,
      isError,
      error,
    }),
    [permissions, checkPermissions, isLoading, isError, error],
  );

  return (
    <RequirePermissionContext.Provider value={contextValues}>
      {children}
    </RequirePermissionContext.Provider>
  );
}
