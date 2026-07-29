import { Stack } from "expo-router";

import { useAppTheme } from "@/src/theme/useAppTheme";

export default function AssetStackLayout() {
  const theme = useAppTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[assetId]" />
    </Stack>
  );
}
