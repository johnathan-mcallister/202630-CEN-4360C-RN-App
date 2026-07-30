import type { Address } from "../shared/address.model";

export type LocationStatus =
  | "active"
  | "inactive"
  | "pending"
  | "on-hold"
  | "closed";

export type Location = {
  id: string;
  locationCode: string;
  organizationId: string;
  name: string;
  status: LocationStatus;
  address: Address;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};
