import type { Address } from "../shared/address.model";

export type OrganizationType = "customer" | "vendor" | "partner" | "other";

export type OrganizationStatus =
  | "active"
  | "inactive"
  | "pending"
  | "on-hold"
  | "closed";

export type Organization = {
  id: string;
  organizationCode: string;
  name: string;
  type: OrganizationType;
  status: OrganizationStatus;
  address: Address;
  agreementNumber?: string;
  opportunityNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};
