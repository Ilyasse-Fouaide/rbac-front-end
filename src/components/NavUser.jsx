import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { ChevronsUpDown, User, Settings, Bell, LogOut } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  useSidebar,
  SidebarMenuItem,
  SidebarMenuButton,
} from './ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@features-auth/components/AuthProvider';
import AvatarImage from '@features-avatar/components/Avatar';

function NavUser({ align }) {
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const { user, logout, checkAuth } = useAuth();

  const { mutate } = useMutation({
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

  const removePointerEventFromBody = () => {
    const body = document.body;
    body.style.pointerEvents = '';
  };

  const firstLetter = user.email.charAt(0).toUpperCase();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage user={user} />
                <AvatarFallback className="rounded-lg">
                  {firstLetter}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.email}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align={align}
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage user={user} />
                  <AvatarFallback className="rounded-lg">
                    {firstLetter}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.email}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link
                to={'/settings/profile'}
                onClick={removePointerEventFromBody}
              >
                <DropdownMenuItem>
                  <User />
                  My Profile
                </DropdownMenuItem>
              </Link>
              <Link
                to={'/settings/general'}
                onClick={removePointerEventFromBody}
              >
                <DropdownMenuItem>
                  <Settings />
                  Settings
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default NavUser;
