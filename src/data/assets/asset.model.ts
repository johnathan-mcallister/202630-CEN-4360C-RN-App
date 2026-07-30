export const assetStatuses = [
  "pending",
  "available",
  "assigned",
  "maintenance",
  "retired",
  "decommissioned",
] as const;

export type AssetStatus = (typeof assetStatuses)[number];

export type AssetCondition = "new" | "good" | "fair" | "damaged" | "lost";

export const assetCategories = [
  "desktop",
  "laptop",
  "tablet",
  "monitor",
  "printer",
  "network",
  "other",
] as const;

export type AssetCategory = (typeof assetCategories)[number];

export type Asset = {
  id: string;
  assetTag: string;
  name: string;
  category: AssetCategory;
  status: AssetStatus;
  condition: AssetCondition;
  manufacturer: string;
  model: string;
  serialNumber: string;
  organizationId: string;
  locationId: string;
  assignedTo?: string;
  receivedDate?: string;
  warrantyExpiration?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export function isAssetStatus(value: unknown): value is AssetStatus {
  return (
    typeof value === "string" &&
    assetStatuses.some((status) => status === value)
  );
}

export function isAssetCategory(value: unknown): value is AssetCategory {
  return (
    typeof value === "string" &&
    assetCategories.some((category) => category === value)
  );
}
