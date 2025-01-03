import { Card, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Default from '../layout/Default';
import lighPreview from '../assets/light_preview.svg';
import darkPreview from '../assets/dark_preview.svg';
import { Info } from 'lucide-react';
import { useTheme } from '@/context/ThemeProvider';
// import darklighPreview from '../assets/dark_light_preview.svg';

const page = 'Appearance';
const pageTitle = 'Appearance';
const pageDescription = `Adjust themes, colors and layout for a personalized experience.`;

function Appearance() {
  const { theme: selectedTheme, handleThemeChange } = useTheme();

  return (
    <Default
      page={page}
      pageTitle={pageTitle}
      pageDescription={pageDescription}
    >
      <Alert className="flex items-center border-blue-500 bg-blue-500/20">
        <AlertDescription className="inline-flex items-center gap-3 font-medium text-blue-500">
          <Info />
          Your preference will be automatically saved for future visits
        </AlertDescription>
      </Alert>
      <section className="grid gap-2">
        <div className="flex flex-col space-y-1.5">
          <h2 className="text-2xl font-bold leading-none tracking-tight">
            Interface theme
          </h2>
          <p className="text-sm text-muted-foreground">
            Customize your UI theme
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <input
              type="radio"
              name="theme"
              id="light"
              value="light"
              checked={selectedTheme === 'light'}
              onChange={() => handleThemeChange('light')}
              className="peer sr-only"
            />
            <label htmlFor="light" className="block cursor-pointer">
              <Card className="overflow-hidden">
                <div>
                  <img
                    src={lighPreview}
                    className="h-full w-full border-b"
                    alt="light theme"
                  />
                </div>
                <CardFooter className="gap-2 px-6 py-4">
                  <div className="flex h-4 w-4 items-center rounded-full border-2 border-zinc-400 peer-checked:border-blue-500 peer-checked:bg-blue-500">
                    {selectedTheme === 'light' && (
                      <div className="mx-auto h-2 w-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <span className="text-sm">Light mode</span>
                </CardFooter>
              </Card>
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="theme"
              id="dark"
              value="dark"
              checked={selectedTheme === 'dark'}
              onChange={() => handleThemeChange('dark')}
              className="peer sr-only"
            />
            <label htmlFor="dark" className="block cursor-pointer">
              <Card className="overflow-hidden">
                <div>
                  <img
                    src={darkPreview}
                    className="h-full w-full border-b"
                    alt="dark theme"
                  />
                </div>
                <CardFooter className="gap-2 px-6 py-4">
                  <div className="flex h-4 w-4 items-center rounded-full border-2 border-zinc-400 peer-checked:border-blue-500 peer-checked:bg-blue-500">
                    {selectedTheme === 'dark' && (
                      <div className="mx-auto h-2 w-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <span className="text-sm">Dark mode</span>
                </CardFooter>
              </Card>
            </label>
          </div>
        </div>
      </section>
    </Default>
  );
}

export default Appearance;
