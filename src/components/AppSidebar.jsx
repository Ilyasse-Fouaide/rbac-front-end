import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Home, Users, ShieldCheck, FileLock2 } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  useSidebar,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarSeparator,
  SidebarHeader,
  SidebarFooter,
  SidebarMenuSkeleton,
} from './ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import NavUser from '@/components/NavUser';
import { useAuth } from '@features-auth/components/AuthProvider';
import RequirePermissionProvider from '@/context/RequirePermissionProvider';
import RequirePermission from '@/components/RequirePermission';
import logoOpened from '@/assets/header/0.75x/header.png';

// Menu items.
const sidebarLefttData = [
  // Group 1
  [
    {
      title: 'Home',
      url: '/',
      icon: Home,
    },
  ],
  // Group 2
  [
    {
      title: 'Users',
      url: '/admin/users',
      icon: Users,
    },
    {
      title: 'Roles',
      url: '/admin/roles',
      icon: ShieldCheck,
    },
    {
      title: 'Permissions',
      url: '/admin/permissions',
      icon: FileLock2,
    },
  ],
];

function SidebarmenuItem({ item, isMobile, toggleSidebar }) {
  return (
    <React.Fragment>
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild tooltip={item.title}>
          <NavLink
            aria-label="none"
            to={item.url}
            onClick={() => {
              if (isMobile) {
                toggleSidebar();
              }
            }}
          >
            <item.icon />
            <span>{item.title}</span>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </React.Fragment>
  );
}

const SidebarMain = ({
  sidebarLefttData,
  index,
  label,
  isMobile,
  toggleSidebar,
}) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {sidebarLefttData[index].map((item, key) => (
            <SidebarmenuItem
              key={key}
              item={item}
              isMobile={isMobile}
              toggleSidebar={toggleSidebar}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

const SidebarLeft = () => {
  const { user } = useAuth();
  const { isMobile, toggleSidebar, state } = useSidebar();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              to={'/'}
              data-state={state}
              className="flex w-full items-center overflow-hidden rounded-md p-1"
            >
              <Link to={'/'}>
                <img src={logoOpened} className="max-w-none" />
              </Link>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMain
          sidebarLefttData={sidebarLefttData}
          index={0}
          label={'Application'}
          isMobile={isMobile}
          toggleSidebar={toggleSidebar}
        />
        <RequirePermissionProvider userId={user.userId}>
          <RequirePermission
            permission="administrator"
            loading={<SidebarMenuSkeleton />}
          >
            <SidebarMain
              sidebarLefttData={sidebarLefttData}
              index={1}
              label={'Admin'}
              isMobile={isMobile}
              toggleSidebar={toggleSidebar}
            />
          </RequirePermission>
        </RequirePermissionProvider>
      </SidebarContent>
      {isMobile && (
        <SidebarFooter>
          <NavUser align={'end'} />
        </SidebarFooter>
      )}
    </Sidebar>
  );
};

function SidebarRight({ ...props }) {
  return (
    <Sidebar
      variant="sidebar"
      collapsible="none"
      className="sticky top-0 hidden h-svh border-l lg:flex"
      {...props}
    >
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser align="start" />
      </SidebarHeader>
      <SidebarContent>
        {/* Content */}
        <SidebarSeparator className="mx-0" />
      </SidebarContent>
    </Sidebar>
  );
}

export function AppSidebar({ children }) {
  return (
    <>
      <SidebarLeft />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">CRM</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </SidebarInset>
      <SidebarRight />
    </>
  );
}
