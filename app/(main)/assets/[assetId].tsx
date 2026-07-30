import { useLocalSearchParams } from "expo-router";

import { DetailsScreen } from "@/src/features/assets/DetailsScreen";

export default function AssetDetailsRoute() {
  const { assetId } = useLocalSearchParams<{
    assetId: string;
  }>();

  return <DetailsScreen assetId={assetId} />;
}
