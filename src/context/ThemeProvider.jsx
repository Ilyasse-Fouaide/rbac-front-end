import React from 'react';

const ThemeContext = React.createContext({
  theme: 'system',
  setTheme: () => null,
  colorTheme: 'default',
  setColorTheme: () => null,
});

export const useTheme = () => {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

export const ThemeProvider = ({
  children,
  defaultTheme = 'system',
  defaultColorTheme = 'default',
  defaultSidebarCollapsible = 'icon',
  storageKey = 'ui-theme',
  colorStorageKey = 'ui-color-theme',
  sidebarCollapsibleStorageKey = 'sidebar:collapsible',
}) => {
  const [theme, setTheme] = React.useState(() => {
    return localStorage.getItem(storageKey) || defaultTheme;
  });

  const [colorTheme, setColorTheme] = React.useState(() => {
    return localStorage.getItem(colorStorageKey) || defaultColorTheme;
  });

  const [sidebarCollapsible, setSidebarCollapsible] = React.useState(() => {
    return (
      localStorage.getItem(sidebarCollapsibleStorageKey) ||
      defaultSidebarCollapsible
    );
  });

  React.useEffect(() => {
    const root = window.document.documentElement;

    // Remove all existing themes
    root.classList.remove('light', 'dark');
    // Remove all color themes (assuming theme-* pattern)
    root.classList.remove(
      ...Array.from(root.classList).filter((cls) => cls.startsWith('theme-')),
    );

    // Apply dark/light theme
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    // Apply color theme if it's not default
    if (colorTheme !== defaultColorTheme) {
      root.classList.add(`theme-${colorTheme}`);
    }
  }, [theme, colorTheme, defaultColorTheme]);

  const contextValue = React.useMemo(
    () => ({
      theme,
      setTheme: (newTheme) => {
        localStorage.setItem(storageKey, newTheme);
        setTheme(newTheme);
      },
      colorTheme,
      setColorTheme: (newColorTheme) => {
        localStorage.setItem(colorStorageKey, newColorTheme);
        setColorTheme(newColorTheme);
      },
      sidebarCollapsible,
      setSidebarCollapsible: (collapsible) => {
        localStorage.setItem(sidebarCollapsibleStorageKey, collapsible);
        setSidebarCollapsible(collapsible);
      },
    }),
    [
      theme,
      colorTheme,
      sidebarCollapsible,
      storageKey,
      colorStorageKey,
      sidebarCollapsibleStorageKey,
    ],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
