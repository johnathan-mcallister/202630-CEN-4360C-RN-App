import { useLocalSearchParams } from "expo-router";

import { AssetDetailsScreen } from "@/src/features/assets/AssetDetailsScreen";

export default function AssetDetailsRoute() {
  const { assetId } = useLocalSearchParams<{
    assetId: string;
  }>();

  return <AssetDetailsScreen assetId={assetId} />;
}
