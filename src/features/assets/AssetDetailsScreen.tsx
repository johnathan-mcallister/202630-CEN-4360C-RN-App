import { View } from "react-native";

import { Screen } from "@/src/components/layout/Screen";
import { AppText } from "@/src/components/ui/AppText";

type AssetDetailsScreenProps = {
  assetId: string;
};

export function AssetDetailsScreen({ assetId }: AssetDetailsScreenProps) {
  return (
    <Screen>
      <View>
        <AppText variant="title">Asset Details</AppText>
        <AppText muted>Asset ID: {assetId}</AppText>
      </View>
    </Screen>
  );
}
