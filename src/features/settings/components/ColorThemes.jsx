import { Check } from 'lucide-react';

import { useTheme } from '@/context/ThemeProvider';
import { cn } from '@/lib/utils.js';

function ColorThemes() {
  const { colorTheme, setColorTheme } = useTheme();

  const options = [
    {
      name: 'Default',
      value: 'default',
      theme: 'theme-default',
    },
    {
      name: 'Red',
      value: 'red',
      theme: 'theme-red',
    },
    {
      name: 'Green',
      value: 'green',
      theme: 'theme-green',
    },
    {
      name: 'Blue',
      value: 'blue',
      theme: 'theme-blue',
    },
  ];
  return (
    <section className="grid gap-2">
      <div className="grid w-full grid-cols-4 gap-2">
        {options.map(({ value, theme }, key) =>
          value === 'default' ? (
            <button
              key={key}
              onClick={() => setColorTheme('default')}
              className={cn(
                'relative flex w-full cursor-pointer items-center justify-center rounded-lg border bg-muted/70 py-3 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                colorTheme === value && `border border-primary bg-primary/15`,
              )}
            >
              <div
                className={`flex h-10 w-10 flex-col justify-between overflow-hidden rounded-full`}
              >
                <div className={`h-full w-full bg-background`}></div>
                <div className="h-full w-full bg-foreground"></div>
              </div>
              {colorTheme === 'default' && (
                <span className="absolute right-1.5 top-1.5">
                  <Check className="h-4 w-4 text-primary" />
                </span>
              )}
            </button>
          ) : (
            <button
              key={key}
              onClick={() => setColorTheme(value)}
              className={cn(
                'relative flex w-full cursor-pointer items-center justify-center rounded-lg border bg-muted/70 py-3 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                colorTheme === value && `border border-primary bg-primary/15`,
              )}
            >
              <div
                className={`${theme} flex h-10 w-10 flex-col justify-between overflow-hidden rounded-full`}
              >
                <div className={`h-full w-full bg-background`}></div>
                <div className="flex h-full w-full">
                  <div className={`h-full w-full bg-foreground`}></div>
                  <div className={`h-full w-full bg-primary`}></div>
                </div>
              </div>
              {colorTheme === value && (
                <span className="absolute right-1.5 top-1.5">
                  <Check className="h-4 w-4 text-primary" />
                </span>
              )}
            </button>
          ),
        )}
      </div>
    </section>
  );
}

export default ColorThemes;
