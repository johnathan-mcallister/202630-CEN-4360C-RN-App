import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import { Screen } from "@/src/components/layout/Screen";
import { AppText } from "@/src/components/ui/AppText";
import { Surface } from "@/src/components/ui/Surface";
import type { Asset } from "@/src/data/assets/asset.model";
import { findAssetById } from "@/src/data/assets/asset.queries";
import { mockAssets } from "@/src/data/assets/mockAssets";
import { findLocationById } from "@/src/data/locations/location.queries";
import { mockLocations } from "@/src/data/locations/mockLocations";
import { findOrganizationById } from "@/src/data/organizations/organization.queries";
import { mockOrganizations } from "@/src/data/organizations/mockOrganizations";
import { useAppTheme } from "@/src/theme/useAppTheme";

type AssetDetailsScreenProps = {
  assetId: string;
};

export function AssetDetailsScreen({
  assetId,
}: AssetDetailsScreenProps) {
  const theme = useAppTheme();
  const asset = findAssetById(mockAssets, assetId);

  if (!asset) {
    return (
      <Screen>
        <Surface style={styles.notFound}>
          <Ionicons
            name="alert-circle-outline"
            size={38}
            color={theme.colors.warning}
          />
          <AppText variant="subtitle">Asset not found</AppText>
          <AppText muted style={styles.centeredText}>
            The asset may have been removed, or the link may be invalid. Use
            the back button to return to the asset list.
          </AppText>
        </Surface>
      </Screen>
    );
  }

  const location = findLocationById(mockLocations, asset.locationId);
  const organization = findOrganizationById(
    mockOrganizations,
    asset.organizationId,
  );

  return (
    <Screen>
      <View style={styles.heading}>
        <View style={styles.headingCopy}>
          <AppText variant="eyebrow" style={{ color: theme.colors.primary }}>
            {asset.assetTag}
          </AppText>
          <AppText variant="title">{asset.name}</AppText>
          <AppText muted>
            {asset.manufacturer} {asset.model}
          </AppText>
        </View>

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: theme.colors.primarySoft },
          ]}
        >
          <AppText
            variant="caption"
            style={{ color: theme.colors.primary }}
          >
            {formatLabel(asset.status)}
          </AppText>
        </View>
      </View>

      <DetailSection title="Inventory">
        <DetailRow label="Asset tag" value={asset.assetTag} />
        <DetailRow label="Category" value={formatLabel(asset.category)} />
        <DetailRow label="Status" value={formatLabel(asset.status)} />
        <DetailRow label="Condition" value={formatLabel(asset.condition)} />
      </DetailSection>

      <DetailSection title="Hardware">
        <DetailRow label="Manufacturer" value={asset.manufacturer} />
        <DetailRow label="Model" value={asset.model} />
        <DetailRow label="Serial number" value={asset.serialNumber} />
      </DetailSection>

      <DetailSection title="Ownership and location">
        <DetailRow
          label="Organization"
          value={organization?.name ?? "Unknown organization"}
        />
        <DetailRow
          label="Location"
          value={location?.name ?? "Unknown location"}
        />
        <DetailRow
          label="Assigned to"
          value={asset.assignedTo ?? "Not assigned"}
        />
      </DetailSection>

      <DetailSection title="Lifecycle">
        <DetailRow
          label="Received"
          value={formatDate(asset.receivedDate)}
        />
        <DetailRow
          label="Warranty expires"
          value={formatDate(asset.warrantyExpiration)}
        />
        <DetailRow label="Created" value={formatDate(asset.createdAt)} />
        <DetailRow label="Last updated" value={formatDate(asset.updatedAt)} />
      </DetailSection>

      {asset.notes ? (
        <DetailSection title="Notes">
          <AppText>{asset.notes}</AppText>
        </DetailSection>
      ) : null}

      {/* TODO(feature): Add permission-gated assignment, transfer,
          maintenance, retirement, and audit-history actions. */}
    </Screen>
  );
}

type DetailSectionProps = {
  children: React.ReactNode;
  title: string;
};

function DetailSection({ children, title }: DetailSectionProps) {
  return (
    <Surface style={styles.section}>
      <AppText variant="subtitle">{title}</AppText>
      <View style={styles.sectionRows}>{children}</View>
    </Surface>
  );
}

type DetailRowProps = {
  label: string;
  value: string;
};

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <View style={styles.detailRow}>
      <AppText variant="caption" muted style={styles.detailLabel}>
        {label}
      </AppText>
      <AppText style={styles.detailValue}>{value}</AppText>
    </View>
  );
}

function formatLabel(value: Asset["status"] | Asset["condition"] | Asset["category"]) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatDate(value?: string) {
  if (!value) {
    return "Not recorded";
  }

  const date = new Date(value.includes("T") ? value : `${value}T00:00:00Z`);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(date);
}

const styles = StyleSheet.create({
  heading: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "space-between",
  },
  headingCopy: {
    flex: 1,
    gap: 7,
    minWidth: 240,
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  section: {
    gap: 16,
    padding: 18,
  },
  sectionRows: {
    gap: 14,
  },
  detailRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  detailLabel: {
    minWidth: 130,
  },
  detailValue: {
    flex: 1,
    minWidth: 180,
    textAlign: "right",
  },
  notFound: {
    alignItems: "center",
    gap: 12,
    margin: "auto",
    maxWidth: 520,
    padding: 28,
    width: "100%",
  },
  centeredText: {
    textAlign: "center",
  },
});
