import { View } from "react-native";

import { Screen } from "@/src/components/layout/Screen";
import { AppText } from "@/src/components/ui/AppText";

export function DashboardScreen() {
  return (
    <Screen>
      <View>
        <AppText variant="title">Dashboard</AppText>
        <AppText muted>Asset summaries will appear here.</AppText>
      </View>
    </Screen>
  );
}
