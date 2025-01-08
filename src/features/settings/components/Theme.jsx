import { cn } from '@/lib/utils.js';
import { Card, CardFooter } from '@/components/ui/card';
import { useTheme } from '@/context/ThemeProvider';
import darklighPreview from '../assets/dark_light_preview.svg';
import lighPreview from '../assets/light_preview.svg';
import darkPreview from '../assets/dark_preview.svg';

function Theme() {
  const { theme: selectedTheme, setTheme } = useTheme();

  return (
    <section className="grid gap-2">
      <div className="flex flex-col space-y-1.5">
        <h2 className="text-2xl font-bold leading-none tracking-tight">
          Interface theme
        </h2>
        <p className="text-sm text-muted-foreground">Customize your UI theme</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <input
            type="radio"
            name="theme"
            id="light"
            value="light"
            checked={selectedTheme === 'light'}
            onChange={() => setTheme('light')}
            className="peer sr-only"
          />
          <label htmlFor="light" className="block cursor-pointer">
            <Card
              className={cn(
                'overflow-hidden',
                selectedTheme === 'light' &&
                  'outline outline-1 outline-primary',
              )}
            >
              <div>
                <img
                  src={lighPreview}
                  className="h-full w-full border-b"
                  alt="light theme"
                />
              </div>
              <CardFooter
                className={cn(
                  'gap-2 bg-muted/70 px-6 py-4',
                  selectedTheme === 'light' &&
                    'bg-primary/15 outline outline-1 outline-primary',
                )}
              >
                <div className="flex h-4 w-4 items-center rounded-full border-2 border-zinc-400 peer-checked:border-primary peer-checked:bg-primary">
                  {selectedTheme === 'light' && (
                    <div className="mx-auto h-2 w-2 rounded-full bg-primary" />
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
            onChange={() => setTheme('dark')}
            className="peer sr-only"
          />
          <label htmlFor="dark" className="block cursor-pointer">
            <Card
              className={cn(
                'overflow-hidden',
                selectedTheme === 'dark' && 'outline outline-1 outline-primary',
              )}
            >
              <div>
                <img
                  src={darkPreview}
                  className="h-full w-full border-b"
                  alt="dark theme"
                />
              </div>
              <CardFooter
                className={cn(
                  'gap-2 bg-muted/70 px-6 py-4',
                  selectedTheme === 'dark' &&
                    'bg-primary/15 outline outline-1 outline-primary',
                )}
              >
                <div className="flex h-4 w-4 items-center rounded-full border-2 border-zinc-400 peer-checked:border-primary peer-checked:bg-primary">
                  {selectedTheme === 'dark' && (
                    <div className="mx-auto h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>
                <span className="text-sm">Dark mode</span>
              </CardFooter>
            </Card>
          </label>
        </div>
        <div>
          <input
            type="radio"
            name="theme"
            id="system"
            value="system"
            checked={selectedTheme === 'system'}
            onChange={() => setTheme('system')}
            className="peer sr-only"
          />
          <label htmlFor="system" className="block cursor-pointer">
            <Card
              className={cn(
                'overflow-hidden',
                selectedTheme === 'system' &&
                  'outline outline-1 outline-primary',
              )}
            >
              <div>
                <img
                  src={darklighPreview}
                  className="h-full w-full border-b"
                  alt="dark/light theme"
                />
              </div>
              <CardFooter
                className={cn(
                  'gap-2 bg-muted/70 px-6 py-4',
                  selectedTheme === 'system' &&
                    'bg-primary/15 outline outline-1 outline-primary',
                )}
              >
                <div className="flex h-4 w-4 items-center rounded-full border-2 border-zinc-400 peer-checked:border-primary peer-checked:bg-primary">
                  {selectedTheme === 'system' && (
                    <div className="mx-auto h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>
                <span className="text-sm">System</span>
              </CardFooter>
            </Card>
          </label>
        </div>
      </div>
    </section>
  );
}

export default Theme;
