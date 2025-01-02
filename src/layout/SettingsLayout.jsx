import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';

const navLinks = [
  {
    title: 'General',
    url: '/settings/general',
  },
  {
    title: 'My Profile',
    url: '/settings/profile',
  },
  {
    title: 'Appearance',
    url: '/settings/appearance',
  },
  {
    title: 'Password',
    url: '/settings/password',
  },
  {
    title: 'Advanced',
    url: '/settings/advanced',
  },
];

function SettingsLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    // If there's a state passed, go back to the previous location
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto w-full max-w-6xl">
          <Badge
            className="w-fit cursor-pointer gap-2"
            variant="outline"
            onClick={handleGoBack}
          >
            <ArrowLeft className="-ml-1" size={14} />
            Go back
          </Badge>
        </div>
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto w-full max-w-6xl">
          <Separator />
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid text-sm text-muted-foreground">
            {navLinks.map((link, index) => (
              <NavLink
                to={link.url}
                key={index}
                className="rounded-md px-2.5 py-2"
              >
                {link.title}
              </NavLink>
            ))}
          </nav>
          <div className="grid gap-6">{children}</div>
        </div>
      </main>
      <Toaster />
    </div>
  );
}

export default SettingsLayout;
