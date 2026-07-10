import {
    createContext,
    PropsWithChildren,
    useContext,
    useMemo,
    useState,
} from "react";

import { themes } from "./themes";
import type { AppTheme, ThemeName } from "./types";

type ThemeController = {
  theme: AppTheme;
  themeName: ThemeName;
  setThemeName: (themeName: ThemeName) => void;
};

const ThemeContext = createContext<ThemeController | null>(null);

export function AppThemeProvider({ children }: PropsWithChildren) {
  const [themeName, setThemeName] = useState<ThemeName>("midnight");

  const value = useMemo(
    () => ({
      theme: themes[themeName],
      themeName,
      setThemeName,
    }),
    [themeName],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useThemeController() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeController must be used inside AppThemeProvider");
  }

  return context;
}
