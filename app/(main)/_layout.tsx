import { useAppTheme } from "@/src/theme/useAppTheme";
import { Drawer } from "expo-router/drawer";

export default function AppDrawerLayout() {
  const theme = useAppTheme();

  return (
    <Drawer
      initialRouteName="dashboard"
      screenOptions={{
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.textMuted,
        drawerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.text,
        sceneStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Drawer.Screen
        name="dashboard"
        options={{ drawerLabel: "Dashboard", title: "Dashboard" }}
      />
      <Drawer.Screen
        name="assets"
        options={{ drawerLabel: "Assets", title: "Assets" }}
      />
    </Drawer>
  );
}
