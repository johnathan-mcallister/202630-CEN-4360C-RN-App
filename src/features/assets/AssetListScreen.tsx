import { View } from "react-native";

import { Screen } from "@/src/components/layout/Screen";
import { AppText } from "@/src/components/ui/AppText";

export function AssetListScreen() {
  return (
    <Screen>
      <View>
        <AppText variant="title">Assets</AppText>
        <AppText muted>The searchable asset list will appear here.</AppText>
      </View>
    </Screen>
  );
}
