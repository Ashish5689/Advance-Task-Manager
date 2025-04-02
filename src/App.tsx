import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';
import TaskManager from './components/TaskManager';
import { createGlobalStyle } from 'styled-components';
import { useTheme } from './context/ThemeContext';

const GlobalStyle = createGlobalStyle<{ theme: any }>`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${({ theme }) => theme.isDark ? '#121420' : '#f8fafc'};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
    min-height: 100vh;
    overflow-x: hidden;
  }

  #root {
    display: flex;
    flex-direction: column;
  }

  button, input {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  ::placeholder {
    color: ${({ theme }) => theme.isDark ? '#64748b' : '#94a3b8'};
    opacity: 0.7;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.isDark ? '#1e1e2e' : '#f1f5f9'};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.isDark ? '#475569' : '#cbd5e1'};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.isDark ? '#64748b' : '#94a3b8'};
  }
`;

const GlobalStyleWrapper = () => {
  const { theme, isDarkMode } = useTheme();
  return <GlobalStyle theme={{ ...theme, isDark: isDarkMode }} />;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <TaskProvider>
        <GlobalStyleWrapper />
        <TaskManager />
      </TaskProvider>
    </ThemeProvider>
  );
};

export default App; 