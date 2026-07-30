import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  AppThemeProvider,
  useThemeController,
} from "@/src/theme/ThemeProvider";

function RootNavigator() {
  const { theme } = useThemeController();

  // TODO(security): Gate the (main) group with session-backed protected routes.
  // Client route guards improve UX; the API must still authorize every request.
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(main)" />
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
