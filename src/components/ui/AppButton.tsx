import { Ionicons } from "@expo/vector-icons";
import { PropsWithChildren } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { useAppTheme } from "@/src/theme/useAppTheme";

import { AppText } from "./AppText";

type AppButtonProps = PropsWithChildren<{
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  variant?: "filled" | "soft" | "ghost";
}>;

export function AppButton({
  children,
  icon,
  onPress,
  variant = "filled",
}: AppButtonProps) {
  const theme = useAppTheme();
  const isFilled = variant === "filled";

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: isFilled
            ? theme.colors.primary
            : theme.colors.primarySoft,
          borderColor:
            variant === "ghost" ? theme.colors.border : "transparent",
          opacity: pressed ? 0.78 : 1,
        },
      ]}
    >
      <View style={styles.content}>
        {icon ? (
          <Ionicons
            name={icon}
            size={18}
            color={
              isFilled ? theme.colors.inverseText : theme.colors.primaryStrong
            }
          />
        ) : null}
        <AppText
          variant="caption"
          style={{
            color: isFilled
              ? theme.colors.inverseText
              : theme.colors.primaryStrong,
          }}
        >
          {children}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    minHeight: 46,
    minWidth: 46,
    borderRadius: 999,
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  content: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
});
