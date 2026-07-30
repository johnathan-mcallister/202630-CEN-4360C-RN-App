import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import { Screen } from "@/src/components/layout/Screen";
import { AppText } from "@/src/components/ui/AppText";
import { Surface } from "@/src/components/ui/Surface";
import type { Asset } from "@/src/data/assets/asset.model";
import { searchAssets } from "@/src/data/assets/asset.queries";
import { mockAssets } from "@/src/data/assets/mockAssets";
import { findLocationById } from "@/src/data/locations/location.queries";
import { mockLocations } from "@/src/data/locations/mockLocations";
import { useAppTheme } from "@/src/theme/useAppTheme";

export function AssetListScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const { q } = useLocalSearchParams<{ q?: string | string[] }>();
  const query = Array.isArray(q) ? (q[0] ?? "") : (q ?? "");

  const assets = useMemo(
    () => searchAssets(mockAssets, query),
    [query],
  );

  const openAsset = (asset: Asset) => {
    router.push({
      pathname: "/assets/[assetId]",
      params: {
        assetId: asset.id,
        ...(query ? { q: query } : {}),
      },
    });
  };

  return (
    <Screen scroll={false}>
      <View style={styles.intro}>
        <AppText variant="title">Assets</AppText>
        <AppText muted>
          {query
            ? `${assets.length} result${assets.length === 1 ? "" : "s"} for “${query}”`
            : `${assets.length} assets in inventory`}
        </AppText>
      </View>

      <FlatList
        contentContainerStyle={[
          styles.listContent,
          assets.length === 0 && styles.emptyListContent,
        ]}
        data={assets}
        ItemSeparatorComponent={() => (
          <View style={{ height: theme.spacing.sm }} />
        )}
        keyExtractor={(asset) => asset.id}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Surface style={styles.emptyState}>
            <Ionicons
              name="search-outline"
              size={32}
              color={theme.colors.textMuted}
            />
            <AppText variant="subtitle">No assets found</AppText>
            <AppText muted style={styles.emptyText}>
              Try an asset tag, name, manufacturer, model, serial number, or
              assignee.
            </AppText>
          </Surface>
        }
        renderItem={({ item }) => {
          const location = findLocationById(mockLocations, item.locationId);

          return (
            <Pressable
              accessibilityHint="Opens asset details"
              accessibilityLabel={`${item.assetTag}, ${item.name}`}
              accessibilityRole="button"
              onPress={() => openAsset(item)}
            >
              {({ pressed }) => (
                <Surface
                  style={[
                    styles.assetRow,
                    {
                      backgroundColor: pressed
                        ? theme.colors.surfacePressed
                        : theme.colors.surface,
                    },
                  ]}
                >
                  <View style={styles.assetCopy}>
                    <View style={styles.rowHeading}>
                      <AppText variant="subtitle" numberOfLines={1}>
                        {item.name}
                      </AppText>
                      <AppText
                        variant="caption"
                        style={{ color: theme.colors.primary }}
                      >
                        {item.assetTag}
                      </AppText>
                    </View>

                    <AppText muted numberOfLines={1}>
                      {item.manufacturer} {item.model}
                    </AppText>

                    <View style={styles.metadata}>
                      <AppText variant="caption" muted numberOfLines={1}>
                        {location?.name ?? "Unknown location"}
                      </AppText>
                      <AppText variant="caption" muted>
                        {formatStatus(item.status)}
                      </AppText>
                    </View>
                  </View>

                  <Ionicons
                    name="chevron-forward"
                    size={21}
                    color={theme.colors.textMuted}
                  />
                </Surface>
              )}
            </Pressable>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}

function formatStatus(status: Asset["status"]) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

const styles = StyleSheet.create({
  intro: {
    gap: 6,
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  assetRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    minHeight: 108,
    padding: 16,
  },
  assetCopy: {
    flex: 1,
    gap: 7,
    minWidth: 0,
  },
  rowHeading: {
    alignItems: "baseline",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "space-between",
  },
  metadata: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  emptyState: {
    alignItems: "center",
    gap: 10,
    padding: 24,
  },
  emptyText: {
    maxWidth: 440,
    textAlign: "center",
  },
});
