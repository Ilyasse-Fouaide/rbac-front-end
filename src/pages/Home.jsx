import SidebarLayout from '@/layout/SidebarLayout';
import { Outlet } from 'react-router-dom';

function Home() {
  return (
    <SidebarLayout>
      <Outlet />
    </SidebarLayout>
  );
}

export default Home;
