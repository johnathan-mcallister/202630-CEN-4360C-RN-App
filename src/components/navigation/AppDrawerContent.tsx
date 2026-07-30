import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
  type DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { StyleSheet, View } from "react-native";

import { AppText } from "@/src/components/ui/AppText";
import { useAppTheme } from "@/src/theme/useAppTheme";

export function AppDrawerContent(props: DrawerContentComponentProps) {
  const theme = useAppTheme();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <View
        style={[
          styles.brand,
          {
            borderBottomColor: theme.colors.border,
          },
        ]}
      >
        <View
          style={[
            styles.brandIcon,
            {
              backgroundColor: theme.colors.primary,
            },
          ]}
        >
          <Ionicons
            name="hardware-chip-outline"
            size={23}
            color={theme.colors.inverseText}
          />
        </View>

        <View style={styles.brandCopy}>
          <AppText variant="subtitle">Asset Tracker</AppText>
          <AppText variant="caption" muted>
            IT inventory
          </AppText>
        </View>
      </View>

      <View style={styles.items}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  brand: {
    alignItems: "center",
    borderBottomWidth: 1,
    flexDirection: "row",
    gap: 12,
    marginBottom: 10,
    paddingBottom: 20,
    paddingHorizontal: 18,
    paddingTop: 10,
  },
  brandIcon: {
    alignItems: "center",
    borderRadius: 14,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  brandCopy: {
    flex: 1,
    gap: 2,
  },
  items: {
    paddingTop: 6,
  },
});
