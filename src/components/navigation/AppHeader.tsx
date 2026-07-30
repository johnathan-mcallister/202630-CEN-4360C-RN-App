import { Ionicons } from "@expo/vector-icons";
import type { DrawerHeaderProps } from "@react-navigation/drawer";
import { useState } from "react";
import {
    Platform,
    Pressable,
    StyleSheet,
    TextInput,
    useWindowDimensions,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "@/src/components/ui/AppText";
import { useAppTheme } from "@/src/theme/useAppTheme";

export function AppHeader({ navigation, options, route }: DrawerHeaderProps) {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [search, setSearch] = useState("");

  // TODO(feature): Store search in the /assets route query so it survives
  // navigation, refreshes, and deep links.
  const isWide = width >= 768;

  const title =
    typeof options.title === "string"
      ? options.title
      : route.name === "dashboard"
        ? "Dashboard"
        : "Assets";

  const searchField = (
    <View
      style={[
        styles.searchContainer,
        {
          backgroundColor: theme.colors.backgroundMuted,
          borderColor: theme.colors.border,
        },
        isWide && styles.wideSearch,
      ]}
    >
      <Ionicons name="search" size={19} color={theme.colors.textMuted} />

      <TextInput
        accessibilityLabel="Search assets"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={setSearch}
        placeholder="Search assets"
        placeholderTextColor={theme.colors.textSoft}
        returnKeyType="search"
        style={[
          styles.searchInput,
          {
            color: theme.colors.text,
          },
        ]}
        value={search}
      />

      {search.length > 0 ? (
        <Pressable
          accessibilityLabel="Clear search"
          accessibilityRole="button"
          hitSlop={8}
          onPress={() => setSearch("")}
        >
          <Ionicons
            name="close-circle"
            size={19}
            color={theme.colors.textMuted}
          />
        </Pressable>
      ) : null}
    </View>
  );

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.border,
          paddingTop: insets.top,
        },
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.sideSection}>
          <Pressable
            accessibilityLabel="Open navigation menu"
            accessibilityRole="button"
            onPress={() => navigation.toggleDrawer()}
            style={({ pressed }) => [
              styles.iconButton,
              {
                backgroundColor: pressed
                  ? theme.colors.surfacePressed
                  : "transparent",
              },
            ]}
          >
            <Ionicons name="menu" size={26} color={theme.colors.text} />
          </Pressable>

          <AppText numberOfLines={1} variant="subtitle" style={styles.title}>
            {title}
          </AppText>
        </View>

        {isWide ? (
          <View style={styles.centerSection}>{searchField}</View>
        ) : null}

        <View style={[styles.sideSection, styles.rightSection]}>
          {/* TODO(feature): Replace with an accessible profile menu after
              authenticated user data and sign-out behavior exist. */}
          <View
            accessibilityLabel="User profile"
            accessibilityRole="image"
            style={[
              styles.iconButton,
              {
                backgroundColor: theme.colors.primarySoft,
              },
            ]}
          >
            <Ionicons
              name="person-outline"
              size={22}
              color={theme.colors.primary}
            />
          </View>
        </View>
      </View>

      {!isWide ? searchField : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    gap: 10,
    paddingBottom: 10,
    paddingHorizontal: 12,
  },
  topRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    minHeight: 54,
  },
  iconButton: {
    alignItems: "center",
    borderRadius: 14,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  title: {
    flexShrink: 1,
  },
  sideSection: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 10,
    minWidth: 0,
  },
  centerSection: {
    alignItems: "center",
    flex: 1,
  },
  rightSection: {
    justifyContent: "flex-end",
  },
  searchContainer: {
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    minHeight: 44,
    paddingHorizontal: 13,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    minWidth: 0,
    paddingVertical: Platform.OS === "web" ? 10 : 8,
  },
  wideSearch: {
    maxWidth: 420,
    width: "100%",
  },
});
