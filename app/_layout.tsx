import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  AppThemeProvider,
  useThemeController,
} from "@/src/theme/ThemeProvider";

function RootNavigator() {
  const { theme } = useThemeController();

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Protected guard={true}>
          <Stack.Screen name="index" />
        </Stack.Protected>
      </Stack>
      <StatusBar style={theme.statusBarStyle} />
    </>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppThemeProvider>
        <RootNavigator />
      </AppThemeProvider>
    </GestureHandlerRootView>
  );
}
