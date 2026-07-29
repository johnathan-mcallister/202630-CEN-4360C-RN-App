import { useLocalSearchParams } from "expo-router";

import { DetailsScreen } from "@/src/features/home/DetailsScreen";

export default function AssetDetailsRoute() {
  const { assetId } = useLocalSearchParams<{
    assetId: string;
  }>();

  return <DetailsScreen assetId={assetId} />;
}
