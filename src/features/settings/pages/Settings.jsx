import { Outlet } from 'react-router-dom';
import SettingsLayout from '@/layout/SettingsLayout';

function Settings() {
  return (
    <SettingsLayout>
      <Outlet />
    </SettingsLayout>
  );
}

export default Settings;
