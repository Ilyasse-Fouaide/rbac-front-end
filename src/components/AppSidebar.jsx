import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, Home, Inbox, ChartNoAxesColumn } from 'lucide-react';

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
} from './ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import NavUser from '@/components/NavUser';

// Menu items.
const sidebarLefttData = [
  // Group 1
  [
    {
      title: 'Home',
      url: '/',
      icon: Home,
    },
    {
      title: 'Inbox',
      url: '/inbox',
      icon: Inbox,
    },
    {
      title: 'My work',
      url: '/my-work',
      icon: Calendar,
    },
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: ChartNoAxesColumn,
    },
  ],
  // Group 2
  [
    {
      title: 'My projects',
      url: '/projects',
      icon: Home,
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
  const { isMobile, toggleSidebar } = useSidebar();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="w-full overflow-hidden rounded-md">
              <div className="h-8 w-8 bg-foreground"></div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {[...Array(sidebarLefttData.length).keys()].map((_value, index) => (
          <SidebarMain
            key={index}
            sidebarLefttData={sidebarLefttData}
            index={index}
            label={'Application'}
            isMobile={isMobile}
            toggleSidebar={toggleSidebar}
          />
        ))}
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
