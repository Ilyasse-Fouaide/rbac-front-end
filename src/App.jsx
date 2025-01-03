import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import Home from '@/pages/Home';
import SignIn from '@/pages/SignIn';
import AuthProvider from '@features-auth/components/AuthProvider';
import { ThemeProvider } from '@/context/ThemeProvider';
import GoogleSuccess from '@features-auth/pages/GoogleSuccess';
import ProtectedRoute from '@/components/ProtectedRoute';
import Settings from './features/settings/pages/Settings';
import General from './features/settings/pages/General';
import Appearance from './features/settings/pages/Appearance';
import Profile from './features/settings/pages/Profile';
import Password from './features/settings/pages/Password';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/auth/success',
    element: <GoogleSuccess />,
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={'/settings/general'} />,
      },
      {
        path: 'general',
        element: <General />,
      },
      {
        path: 'appearance',
        element: <Appearance />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'password',
        element: <Password />,
      },
    ],
  },
]);

function App() {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
