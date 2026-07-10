import { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

import { useAppTheme } from '@/src/theme/useAppTheme';

type AppTextVariant = 'eyebrow' | 'title' | 'subtitle' | 'body' | 'caption' | 'metric';

type AppTextProps = PropsWithChildren<{
  variant?: AppTextVariant;
  muted?: boolean;
  style?: StyleProp<TextStyle>;
}>;

export function AppText({ children, variant = 'body', muted, style }: AppTextProps) {
  const theme = useAppTheme();
  const color = muted ? theme.colors.textMuted : theme.colors.text;

  return <Text style={[styles.base, styles[variant], { color }, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  base: {
    letterSpacing: 0,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 25,
  },
  body: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 23,
  },
  caption: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  metric: {
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 32,
  },
});
