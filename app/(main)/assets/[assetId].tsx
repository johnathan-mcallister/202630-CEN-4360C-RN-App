import { useLocalSearchParams } from "expo-router";

import { AssetDetailsScreen } from "@/src/features/assets/AssetDetailsScreen";

export default function AssetDetailsRoute() {
  const { assetId } = useLocalSearchParams<{
    assetId?: string | string[];
  }>();
  const resolvedAssetId = Array.isArray(assetId) ? assetId[0] : assetId;

  return <AssetDetailsScreen assetId={resolvedAssetId ?? ""} />;
}
