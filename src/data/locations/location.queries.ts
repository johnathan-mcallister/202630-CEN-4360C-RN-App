import type { Location } from "./location.model";

export function findLocationById(
  locations: readonly Location[],
  locationId: string,
): Location | undefined {
  return locations.find((location) => location.id === locationId);
}
