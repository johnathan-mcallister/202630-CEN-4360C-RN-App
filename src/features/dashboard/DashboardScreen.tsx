import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import {
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

import { Screen } from "@/src/components/layout/Screen";
import { AppText } from "@/src/components/ui/AppText";
import { Surface } from "@/src/components/ui/Surface";
import type {
  Asset,
  AssetStatus,
} from "@/src/data/assets/asset.model";
import { filterAssetsByStatus } from "@/src/data/assets/asset.queries";
import { mockAssets } from "@/src/data/assets/mockAssets";
import { findLocationById } from "@/src/data/locations/location.queries";
import { mockLocations } from "@/src/data/locations/mockLocations";
import { useAppTheme } from "@/src/theme/useAppTheme";

type SummaryCard = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  status?: AssetStatus;
  value: number;
};

export function DashboardScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  const summaries = useMemo<SummaryCard[]>(
    () => [
      {
        icon: "cube-outline",
        label: "Total assets",
        value: mockAssets.length,
      },
      {
        icon: "person-circle-outline",
        label: "Assigned",
        status: "assigned",
        value: filterAssetsByStatus(mockAssets, "assigned").length,
      },
      {
        icon: "checkmark-circle-outline",
        label: "Available",
        status: "available",
        value: filterAssetsByStatus(mockAssets, "available").length,
      },
      {
        icon: "construct-outline",
        label: "Maintenance",
        status: "maintenance",
        value: filterAssetsByStatus(mockAssets, "maintenance").length,
      },
      {
        icon: "archive-outline",
        label: "Retired",
        status: "retired",
        value: filterAssetsByStatus(mockAssets, "retired").length,
      },
    ],
    [],
  );

  const maintenanceAssets = useMemo(
    () => filterAssetsByStatus(mockAssets, "maintenance"),
    [],
  );

  const recentAssets = useMemo(
    () =>
      [...mockAssets]
        .sort(
          (left, right) =>
            Date.parse(right.updatedAt) - Date.parse(left.updatedAt),
        )
        .slice(0, 5),
    [],
  );

  const openAssetList = (status?: AssetStatus) => {
    router.push(
      status
        ? { pathname: "/assets", params: { status } }
        : "/assets",
    );
  };

  const openAsset = (assetId: string) => {
    router.push({
      pathname: "/assets/[assetId]",
      params: { assetId },
    });
  };

  return (
    <Screen>
      <View style={styles.heading}>
        <AppText variant="eyebrow" style={{ color: theme.colors.primary }}>
          Inventory overview
        </AppText>
        <AppText variant="title">Dashboard</AppText>
        <AppText muted>
          Current asset distribution and items requiring attention.
        </AppText>
      </View>

      <View style={styles.summaryGrid}>
        {summaries.map((summary) => (
          <Pressable
            accessibilityHint="Opens the matching asset list"
            accessibilityLabel={`${summary.label}: ${summary.value}`}
            accessibilityRole="button"
            key={summary.label}
            onPress={() => openAssetList(summary.status)}
            style={[styles.summaryPressable, isWide && styles.wideSummary]}
          >
            {({ pressed }) => (
              <Surface
                style={[
                  styles.summaryCard,
                  {
                    backgroundColor: pressed
                      ? theme.colors.surfacePressed
                      : theme.colors.surface,
                  },
                ]}
              >
                <View
                  style={[
                    styles.summaryIcon,
                    { backgroundColor: theme.colors.primarySoft },
                  ]}
                >
                  <Ionicons
                    name={summary.icon}
                    size={22}
                    color={theme.colors.primary}
                  />
                </View>
                <AppText variant="metric">{summary.value}</AppText>
                <AppText muted>{summary.label}</AppText>
              </Surface>
            )}
          </Pressable>
        ))}
      </View>

      <DashboardSection
        actionLabel="View maintenance"
        onAction={() => openAssetList("maintenance")}
        title="Needs attention"
      >
        {maintenanceAssets.length > 0 ? (
          maintenanceAssets.map((asset) => (
            <AssetDashboardRow
              asset={asset}
              key={asset.id}
              onPress={() => openAsset(asset.id)}
            />
          ))
        ) : (
          <AppText muted>No assets currently require maintenance.</AppText>
        )}
      </DashboardSection>

      <DashboardSection
        actionLabel="View all"
        onAction={() => openAssetList()}
        title="Recently updated"
      >
        {recentAssets.map((asset) => (
          <AssetDashboardRow
            asset={asset}
            key={asset.id}
            onPress={() => openAsset(asset.id)}
            showUpdatedAt
          />
        ))}
      </DashboardSection>

      {/* TODO(feature): Add category/location charts and audit-report
          summaries after the API provides permission-scoped aggregates. */}
    </Screen>
  );
}

type DashboardSectionProps = {
  actionLabel: string;
  children: React.ReactNode;
  onAction: () => void;
  title: string;
};

function DashboardSection({
  actionLabel,
  children,
  onAction,
  title,
}: DashboardSectionProps) {
  const theme = useAppTheme();

  return (
    <Surface style={styles.section}>
      <View style={styles.sectionHeading}>
        <AppText variant="subtitle">{title}</AppText>
        <Pressable
          accessibilityRole="button"
          onPress={onAction}
          hitSlop={8}
        >
          <AppText
            variant="caption"
            style={{ color: theme.colors.primary }}
          >
            {actionLabel}
          </AppText>
        </Pressable>
      </View>
      <View style={styles.sectionRows}>{children}</View>
    </Surface>
  );
}

type AssetDashboardRowProps = {
  asset: Asset;
  onPress: () => void;
  showUpdatedAt?: boolean;
};

function AssetDashboardRow({
  asset,
  onPress,
  showUpdatedAt,
}: AssetDashboardRowProps) {
  const theme = useAppTheme();
  const location = findLocationById(mockLocations, asset.locationId);

  return (
    <Pressable
      accessibilityLabel={`${asset.assetTag}, ${asset.name}`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.assetRow,
        {
          backgroundColor: pressed
            ? theme.colors.surfacePressed
            : "transparent",
          borderColor: theme.colors.border,
        },
      ]}
    >
      <View style={styles.assetRowCopy}>
        <AppText variant="caption" style={{ color: theme.colors.primary }}>
          {asset.assetTag}
        </AppText>
        <AppText numberOfLines={1}>{asset.name}</AppText>
        <AppText variant="caption" muted numberOfLines={1}>
          {location?.name ?? "Unknown location"}
        </AppText>
      </View>

      <View style={styles.assetRowAside}>
        <AppText variant="caption" muted>
          {showUpdatedAt
            ? formatDate(asset.updatedAt)
            : formatLabel(asset.condition)}
        </AppText>
        <Ionicons
          name="chevron-forward"
          size={18}
          color={theme.colors.textMuted}
        />
      </View>
    </Pressable>
  );
}

function formatLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(value));
}

const styles = StyleSheet.create({
  heading: {
    gap: 7,
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  summaryPressable: {
    width: "100%",
  },
  wideSummary: {
    flexBasis: "30%",
    flexGrow: 1,
  },
  summaryCard: {
    gap: 9,
    minHeight: 164,
    padding: 18,
  },
  summaryIcon: {
    alignItems: "center",
    borderRadius: 13,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  section: {
    gap: 16,
    padding: 18,
  },
  sectionHeading: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  sectionRows: {
    gap: 10,
  },
  assetRow: {
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    minHeight: 84,
    padding: 13,
  },
  assetRowCopy: {
    flex: 1,
    gap: 4,
    minWidth: 0,
  },
  assetRowAside: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
});
