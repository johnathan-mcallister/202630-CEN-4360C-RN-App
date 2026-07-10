import { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppTheme } from "@/src/theme/useAppTheme";

type ScreenProps = PropsWithChildren<{
  scroll?: boolean;
  safeTop?: boolean;
}>;

export function Screen({
  children,
  scroll = true,
  safeTop = true,
}: ScreenProps) {
  const theme = useAppTheme();
  const content = (
    <View
      style={[
        styles.content,
        { gap: theme.spacing.xl, padding: theme.spacing.lg },
      ]}
    >
      {children}
    </View>
  );

  return (
    <SafeAreaView
      edges={
        safeTop
          ? ["top", "right", "bottom", "left"]
          : ["right", "bottom", "left"]
      }
      style={[styles.root, { backgroundColor: theme.colors.background }]}
    >
      {scroll ? (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    width: "100%",
  },
});
