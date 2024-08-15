import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_SETTINGS = gql`
  query GetSettings {
    settings {
      darkMode
    }
  }
`;

const UPDATE_SETTINGS = gql`
  mutation UpdateSettings($darkMode: Boolean!) {
    updateSettings(darkMode: $darkMode) {
      darkMode
    }
  }
`;

const ThemeContext = createContext<{
  darkMode: boolean;
  toggleDarkMode: () => void;
}>({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const { data, loading } = useQuery(GET_SETTINGS);
  const [updateSettings] = useMutation(UPDATE_SETTINGS);

  useEffect(() => {
    if (data) {
      setDarkMode(data.settings.darkMode);
    }
  }, [data]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    updateSettings({ variables: { darkMode: newDarkMode } });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};