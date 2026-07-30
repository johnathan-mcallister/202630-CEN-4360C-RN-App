import type { Organization } from "./organization.model";

export const mockOrganizations = [
  {
    id: "org-polk-county",
    organizationCode: "POLK-FL",
    name: "Polk County School Board",
    type: "customer",
    status: "active",
    address: {
      street: "1915 South Floral Avenue",
      city: "Bartow",
      state: "FL",
      postalCode: "33830",
      country: "USA",
    },
    agreementNumber: "AGR-12345",
    opportunityNumber: "OPP-67890",
    notes: "Primary demonstration organization.",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2026-07-28T12:00:00Z",
  },
] satisfies readonly Organization[];
