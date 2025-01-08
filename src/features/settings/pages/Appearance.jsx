import { Alert, AlertDescription } from '@/components/ui/alert';
import Default from '../layout/Default';
import { Check, Info } from 'lucide-react';
import Theme from '../components/Theme';
import ColorThemes from '../components/ColorThemes';
import { useTheme } from '@/context/ThemeProvider';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils.js';
import offcanvasSidebar from '../assets/sidebar-offcanvas.svg';
import iconSidebar from '../assets/sidebar-icon.svg';

const page = 'Appearance';
const pageTitle = 'Appearance';
const pageDescription = `Adjust themes, colors and layout for a personalized experience.`;

function Appearance() {
  const { sidebarCollapsible, setSidebarCollapsible } = useTheme();

  const sidebarOptions = [
    {
      name: 'Icon',
      value: 'icon',
      img: iconSidebar,
      description: 'A collapsible sidebar with icons for easy navigation.',
    },
    {
      name: 'Offcanvas',
      value: 'offcanvas',
      img: offcanvasSidebar,
      description: 'A hidden sidebar that slides in for navigation options.',
    },
  ];

  return (
    <Default
      page={page}
      pageTitle={pageTitle}
      pageDescription={pageDescription}
    >
      <Alert className="flex items-center border-none bg-blue-400/15">
        <AlertDescription className="inline-flex items-center gap-3 text-blue-500">
          <Info />
          Your preference will be automatically saved for future visits
        </AlertDescription>
      </Alert>
      <Theme />
      <ColorThemes />
      <Separator />
      <section className="grid gap-2">
        <div className="flex flex-col space-y-1.5">
          <h2 className="text-2xl font-bold leading-none tracking-tight">
            Sidebar view
          </h2>
          <p className="text-sm text-muted-foreground">
            Customize your sidebar UI view
          </p>
        </div>
        <div className="grid w-full gap-4 sm:grid-cols-3">
          {sidebarOptions.map(({ name, img, description, value }, key) => (
            <div
              key={key}
              className="relative w-full"
              onClick={() => {
                setSidebarCollapsible(value);
              }}
            >
              <div
                className={cn(
                  `flex items-center justify-center rounded-lg border bg-muted/15 p-5`,
                  value === sidebarCollapsible &&
                    'border-primary bg-primary/15',
                )}
              >
                <img src={img} alt={description} className="w-full" />
              </div>
              <div className="space-y-2 pt-1">
                <h3 className="font-medium leading-none text-muted-foreground">
                  {name}
                </h3>
                <p className="text-sm text-muted-foreground/70">
                  {description}
                </p>
              </div>
              {value === sidebarCollapsible && (
                <span className="absolute right-0 top-1 z-10 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary">
                  <Check className="h-4 w-4 text-background" strokeWidth={4} />
                </span>
              )}
            </div>
          ))}
        </div>
      </section>
    </Default>
  );
}

export default Appearance;
