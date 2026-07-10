import { PropsWithChildren } from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { useAppTheme } from '@/src/theme/useAppTheme';

type SurfaceProps = PropsWithChildren<{
  elevated?: boolean;
  style?: StyleProp<ViewStyle>;
}>;

export function Surface({ children, elevated, style }: SurfaceProps) {
  const theme = useAppTheme();
  const shadowStyle = Platform.select<ViewStyle>({
    web: { boxShadow: `0 12px 24px ${theme.colors.shadow}1F` },
    default: {
      elevation: 4,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.12,
      shadowRadius: 24,
    },
  });

  return (
    <View
      style={[
        styles.surface,
        {
          backgroundColor: elevated ? theme.colors.surfaceElevated : theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.sm,
        },
        shadowStyle,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    borderWidth: 1,
  },
});
