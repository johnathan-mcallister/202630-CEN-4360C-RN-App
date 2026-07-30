import type {
  Asset,
  AssetCategory,
  AssetStatus,
} from "./asset.model";

export function findAssetById(
  assets: readonly Asset[],
  assetId: string,
): Asset | undefined {
  return assets.find((asset) => asset.id === assetId);
}

export function filterAssetsByStatus(
  assets: readonly Asset[],
  status: AssetStatus,
): Asset[] {
  return assets.filter((asset) => asset.status === status);
}

export function filterAssetsByLocation(
  assets: readonly Asset[],
  locationId: string,
): Asset[] {
  return assets.filter((asset) => asset.locationId === locationId);
}

export function filterAssetsByCategory(
  assets: readonly Asset[],
  category: AssetCategory,
): Asset[] {
  return assets.filter((asset) => asset.category === category);
}

export function searchAssets(
  assets: readonly Asset[],
  rawQuery: string,
): Asset[] {
  const query = rawQuery.trim().toLocaleLowerCase();

  if (!query) {
    return [...assets];
  }

  return assets.filter((asset) =>
    [
      asset.assetTag,
      asset.name,
      asset.manufacturer,
      asset.model,
      asset.serialNumber,
      asset.assignedTo,
    ].some((value) => value?.toLocaleLowerCase().includes(query)),
  );
}
