import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Slot } from '@radix-ui/react-slot';
import { LogOut } from 'lucide-react';

import { useAuth } from './AuthProvider';
import { cn } from '@/lib/utils';

function LogoutButton({ className, asChild = false, children, ...props }) {
  const navigate = useNavigate();
  const { logout, checkAuth } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      localStorage.removeItem('accessToken');
      await checkAuth();
      navigate('/');
    },
    onError: (error) => {
      console.error('logoutError', error);
    },
  });

  const handleLogout = () => {
    mutate();
  };

  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(
        'flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium text-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        className,
      )}
      disabled={isPending}
      onClick={handleLogout}
      {...props}
    >
      <LogOut />
      {children}
    </Comp>
  );
}

export default LogoutButton;
