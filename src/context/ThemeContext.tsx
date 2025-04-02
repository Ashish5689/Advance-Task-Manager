import React, { createContext, useContext, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Theme } from '../types';

const lightTheme: Theme = {
  background: '#ffffff',
  text: '#334155',
  primary: '#6366f1',
  secondary: '#94a3b8',
  border: '#e2e8f0',
  shadow: 'rgba(0, 0, 0, 0.05)',
  hover: '#f8fafc'
};

const darkTheme: Theme = {
  background: '#0f172a',
  text: '#e2e8f0',
  primary: '#818cf8',
  secondary: '#94a3b8',
  border: '#1e293b',
  shadow: 'rgba(0, 0, 0, 0.2)',
  hover: '#1e293b'
};

interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', true);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode, setIsDarkMode]);

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 