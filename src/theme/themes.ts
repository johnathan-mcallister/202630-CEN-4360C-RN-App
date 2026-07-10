import type { AppTheme, ThemeName } from "./types";

export const themes: Record<ThemeName, AppTheme> = {
  midnight: {
    id: "midnight",
    name: "Midnight",
    statusBarStyle: "light",
    colors: {
      background: "#08111D",
      backgroundMuted: "#101D2B",
      surface: "#121E2C",
      surfaceElevated: "#182637",
      surfacePressed: "#213248",
      text: "#F2F7FA",
      textMuted: "#A9B7C5",
      textSoft: "#78889A",
      primary: "#6DD3FF",
      primaryStrong: "#37B7EF",
      primarySoft: "#14394D",
      secondary: "#B79BFF",
      accent: "#FFD166",
      success: "#5CE0A3",
      warning: "#F0A849",
      danger: "#FF6B7D",
      border: "#26384C",
      shadow: "#02060A",
      inverseText: "#06101C",
    },
    gradients: {
      hero: ["#0B1727", "#182637", "#6DD3FF"],
      card: ["#182637", "#101D2B"],
      glow: ["rgba(109, 211, 255, 0.25)", "rgba(183, 155, 255, 0.18)"],
    },
    radius: { xs: 6, sm: 8, md: 14, lg: 20, xl: 28, pill: 999 },
    spacing: { xs: 6, sm: 10, md: 16, lg: 22, xl: 30, xxl: 42 },
  },
};

export const themeList = Object.values(themes);
