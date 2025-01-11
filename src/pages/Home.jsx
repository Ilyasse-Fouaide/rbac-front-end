import SidebarLayout from '@/layout/SidebarLayout';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

function Home() {
  return (
    <SidebarLayout>
      <Outlet />
      <Toaster />
    </SidebarLayout>
  );
}

export default Home;
