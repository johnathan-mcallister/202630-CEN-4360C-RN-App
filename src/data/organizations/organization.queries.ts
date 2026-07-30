import type { Organization } from "./organization.model";

export function findOrganizationById(
  organizations: readonly Organization[],
  organizationId: string,
): Organization | undefined {
  return organizations.find(
    (organization) => organization.id === organizationId,
  );
}
