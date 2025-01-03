import React from 'react';

const ThemeContext = React.createContext({
  theme: 'light',
  darkTheme: () => {},
  lightTheme: () => {},
});

export const useTheme = () => {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used whithin a ThemeProvider.');
  }

  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState('light');

  const handleThemeChange = React.useCallback((theme) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const contextValue = React.useMemo(
    () => ({ theme, setTheme, handleThemeChange }),
    [theme, setTheme, handleThemeChange],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
