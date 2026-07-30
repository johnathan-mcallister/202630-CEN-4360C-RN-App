import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { useWindowDimensions } from "react-native";

import { AppDrawerContent } from "@/src/components/navigation/AppDrawerContent";
import { AppHeader } from "@/src/components/navigation/AppHeader";
import { layout } from "@/src/config/layout";
import { useAppTheme } from "@/src/theme/useAppTheme";

export default function AppDrawerLayout() {
  const theme = useAppTheme();
  const { width } = useWindowDimensions();

  const useWideDrawer = width >= layout.wideDrawerBreakpoint;

  return (
    <Drawer
      defaultStatus="closed"
      drawerContent={(props) => <AppDrawerContent {...props} />}
      initialRouteName="dashboard"
      screenOptions={{
        drawerType: useWideDrawer ? "slide" : "front",
        swipeEnabled: true,
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.textMuted,
        drawerActiveBackgroundColor: theme.colors.primarySoft,
        drawerStyle: {
          backgroundColor: theme.colors.surface,
          borderRightColor: theme.colors.border,
          borderRightWidth: 1,
          width: layout.drawerWidth,
        },
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: "700",
          marginLeft: -4,
        },
        drawerItemStyle: {
          borderRadius: theme.radius.md,
          marginHorizontal: theme.spacing.sm,
        },
        overlayColor: "rgba(2, 6, 10, 0.58)",
        header: (props) => <AppHeader {...props} />,
        sceneStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Drawer.Screen
        name="dashboard"
        options={{
          drawerLabel: "Dashboard",
          title: "Dashboard",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="assets"
        options={{
          drawerLabel: "Assets",
          title: "Assets",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cube-outline" color={color} size={size} />
          ),
        }}
      />
    </Drawer>
  );
}
