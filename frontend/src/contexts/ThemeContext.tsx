import React, { createContext, useContext, useState, useEffect } from 'react';

interface Theme {
  mode: 'light' | 'dark';
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Get theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('dashboard-theme');
    if (savedTheme) {
      try {
        return JSON.parse(savedTheme);
      } catch {
        return { mode: 'dark' };
      }
    }
    return { mode: 'dark' };
  });

  useEffect(() => {
    // Save theme to localStorage whenever it changes
    localStorage.setItem('dashboard-theme', JSON.stringify(theme));
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => ({
      mode: prevTheme.mode === 'light' ? 'dark' : 'light'
    }));
  };

  const value = {
    theme,
    toggleTheme,
    setTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 