import { useThemeController } from "./ThemeProvider";

export function useAppTheme() {
  return useThemeController().theme;
}
