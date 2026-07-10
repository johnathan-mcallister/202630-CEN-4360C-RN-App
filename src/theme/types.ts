import type { StatusBarStyle } from "expo-status-bar";

export type ThemeName = "midnight";

export type AppTheme = {
  id: ThemeName;
  name: string;
  statusBarStyle: StatusBarStyle;
  colors: {
    background: string;
    backgroundMuted: string;
    surface: string;
    surfaceElevated: string;
    surfacePressed: string;
    text: string;
    textMuted: string;
    textSoft: string;
    primary: string;
    primaryStrong: string;
    primarySoft: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    danger: string;
    border: string;
    shadow: string;
    inverseText: string;
  };
  gradients: {
    hero: [string, string, string];
    card: [string, string];
    glow: [string, string];
  };
  radius: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    pill: number;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
};
