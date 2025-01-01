import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';

export default function SidebarLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar>{children}</AppSidebar>
    </SidebarProvider>
  );
}
