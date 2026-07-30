import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  type GestureResponderEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { Screen } from "@/src/components/layout/Screen";
import { AppText } from "@/src/components/ui/AppText";
import {
  assetCategories,
  assetStatuses,
  isAssetCategory,
  isAssetStatus,
  type Asset,
  type AssetCategory,
  type AssetStatus,
} from "@/src/data/assets/asset.model";
import {
  filterAssetsByCategory,
  filterAssetsByStatus,
  searchAssets,
} from "@/src/data/assets/asset.queries";
import { mockAssets } from "@/src/data/assets/mockAssets";
import { findLocationById } from "@/src/data/locations/location.queries";
import { mockLocations } from "@/src/data/locations/mockLocations";
import { useAppTheme } from "@/src/theme/useAppTheme";

const tableWidth = 1120;

export function AssetListScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const { category, q, status } = useLocalSearchParams<{
    category?: string | string[];
    q?: string | string[];
    status?: string | string[];
  }>();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(),
  );

  const query = firstParam(q) ?? "";
  const rawStatus = firstParam(status);
  const rawCategory = firstParam(category);
  const statusFilter = isAssetStatus(rawStatus) ? rawStatus : undefined;
  const categoryFilter = isAssetCategory(rawCategory)
    ? rawCategory
    : undefined;

  const assets = useMemo(() => {
    let filteredAssets: readonly Asset[] = mockAssets;

    if (statusFilter) {
      filteredAssets = filterAssetsByStatus(filteredAssets, statusFilter);
    }

    if (categoryFilter) {
      filteredAssets = filterAssetsByCategory(
        filteredAssets,
        categoryFilter,
      );
    }

    return searchAssets(filteredAssets, query);
  }, [categoryFilter, query, statusFilter]);

  const allVisibleSelected =
    assets.length > 0 &&
    assets.every((asset) => selectedIds.has(asset.id));
  const someVisibleSelected =
    !allVisibleSelected &&
    assets.some((asset) => selectedIds.has(asset.id));

  const openAsset = (asset: Asset) => {
    router.push({
      pathname: "/assets/[assetId]",
      params: {
        assetId: asset.id,
        ...(query ? { q: query } : {}),
        ...(statusFilter ? { status: statusFilter } : {}),
        ...(categoryFilter ? { category: categoryFilter } : {}),
      },
    });
  };

  const toggleAsset = (assetId: string) => {
    setSelectedIds((current) => {
      const next = new Set(current);

      if (next.has(assetId)) {
        next.delete(assetId);
      } else {
        next.add(assetId);
      }

      return next;
    });
  };

  const toggleAllVisible = () => {
    setSelectedIds((current) => {
      const next = new Set(current);

      if (allVisibleSelected) {
        assets.forEach((asset) => next.delete(asset.id));
      } else {
        assets.forEach((asset) => next.add(asset.id));
      }

      return next;
    });
  };

  const setStatusFilter = (nextStatus?: AssetStatus) => {
    router.setParams({ status: nextStatus ?? "" });
  };

  const setCategoryFilter = (nextCategory?: AssetCategory) => {
    router.setParams({ category: nextCategory ?? "" });
  };

  const clearFilters = () => {
    router.setParams({ category: "", status: "" });
  };

  return (
    <Screen scroll={false}>
      <View style={styles.intro}>
        <View style={styles.introCopy}>
          <AppText variant="title">Assets</AppText>
          <AppText muted>
            {getResultDescription(
              assets.length,
              query,
              statusFilter,
              categoryFilter,
            )}
          </AppText>
        </View>

        {selectedIds.size > 0 ? (
          <View
            style={[
              styles.selectionBadge,
              { backgroundColor: theme.colors.primarySoft },
            ]}
          >
            <AppText
              variant="caption"
              style={{ color: theme.colors.primary }}
            >
              {selectedIds.size} selected
            </AppText>
            <Pressable
              accessibilityLabel="Clear selected assets"
              accessibilityRole="button"
              hitSlop={8}
              onPress={() => setSelectedIds(new Set())}
            >
              <Ionicons
                name="close"
                size={17}
                color={theme.colors.primary}
              />
            </Pressable>
          </View>
        ) : null}
      </View>

      <View
        style={[
          styles.filters,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <View style={styles.filterHeading}>
          <AppText variant="subtitle">Filters</AppText>
          {statusFilter || categoryFilter ? (
            <Pressable
              accessibilityRole="button"
              hitSlop={8}
              onPress={clearFilters}
            >
              <AppText
                variant="caption"
                style={{ color: theme.colors.primary }}
              >
                Clear filters
              </AppText>
            </Pressable>
          ) : null}
        </View>

        <FilterRow label="Status">
          <FilterChip
            active={!statusFilter}
            label="All"
            onPress={() => setStatusFilter()}
          />
          {assetStatuses.map((assetStatus) => (
            <FilterChip
              active={statusFilter === assetStatus}
              key={assetStatus}
              label={formatLabel(assetStatus)}
              onPress={() => setStatusFilter(assetStatus)}
            />
          ))}
        </FilterRow>

        <FilterRow label="Category">
          <FilterChip
            active={!categoryFilter}
            label="All"
            onPress={() => setCategoryFilter()}
          />
          {assetCategories.map((assetCategory) => (
            <FilterChip
              active={categoryFilter === assetCategory}
              key={assetCategory}
              label={formatLabel(assetCategory)}
              onPress={() => setCategoryFilter(assetCategory)}
            />
          ))}
        </FilterRow>
      </View>

      <View
        style={[
          styles.tableShell,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <ScrollView
          contentContainerStyle={styles.horizontalContent}
          horizontal
          showsHorizontalScrollIndicator
        >
          <View style={styles.table}>
            <View
              style={[
                styles.tableHeader,
                {
                  backgroundColor: theme.colors.backgroundMuted,
                  borderBottomColor: theme.colors.border,
                },
              ]}
            >
              <View style={styles.checkboxColumn}>
                <SelectionCheckbox
                  checked={allVisibleSelected}
                  indeterminate={someVisibleSelected}
                  label="Select all visible assets"
                  onPress={toggleAllVisible}
                />
              </View>
              <ColumnHeader label="Asset tag" style={styles.tagColumn} />
              <ColumnHeader label="Name" style={styles.nameColumn} />
              <ColumnHeader label="Category" style={styles.categoryColumn} />
              <ColumnHeader label="Status" style={styles.statusColumn} />
              <ColumnHeader label="Location" style={styles.locationColumn} />
              <ColumnHeader label="Assigned to" style={styles.assigneeColumn} />
              <View style={styles.actionColumn} />
            </View>

            <FlatList
              contentContainerStyle={[
                styles.tableBody,
                assets.length === 0 && styles.emptyTableBody,
              ]}
              data={assets}
              keyExtractor={(asset) => asset.id}
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Ionicons
                    name="filter-outline"
                    size={34}
                    color={theme.colors.textMuted}
                  />
                  <AppText variant="subtitle">No assets found</AppText>
                  <AppText muted style={styles.emptyText}>
                    Change the search term or clear one of the active filters.
                  </AppText>
                </View>
              }
              renderItem={({ item }) => (
                <AssetTableRow
                  asset={item}
                  checked={selectedIds.has(item.id)}
                  onOpen={() => openAsset(item)}
                  onToggle={() => toggleAsset(item.id)}
                />
              )}
              showsVerticalScrollIndicator={false}
              style={styles.tableList}
            />
          </View>
        </ScrollView>
      </View>

      {/* TODO(feature): Add permission-gated bulk assignment, transfer,
          maintenance, retirement, and export actions for selected assets. */}
    </Screen>
  );
}

type FilterRowProps = {
  children: React.ReactNode;
  label: string;
};

function FilterRow({ children, label }: FilterRowProps) {
  return (
    <View style={styles.filterRow}>
      <AppText variant="caption" muted style={styles.filterLabel}>
        {label}
      </AppText>
      <ScrollView
        contentContainerStyle={styles.filterOptions}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
}

type FilterChipProps = {
  active: boolean;
  label: string;
  onPress: () => void;
};

function FilterChip({ active, label, onPress }: FilterChipProps) {
  const theme = useAppTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.filterChip,
        {
          backgroundColor: active
            ? theme.colors.primarySoft
            : pressed
              ? theme.colors.surfacePressed
              : "transparent",
          borderColor: active ? theme.colors.primary : theme.colors.border,
        },
      ]}
    >
      <AppText
        variant="caption"
        style={{
          color: active ? theme.colors.primary : theme.colors.textMuted,
        }}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

type AssetTableRowProps = {
  asset: Asset;
  checked: boolean;
  onOpen: () => void;
  onToggle: () => void;
};

function AssetTableRow({
  asset,
  checked,
  onOpen,
  onToggle,
}: AssetTableRowProps) {
  const theme = useAppTheme();
  const location = findLocationById(mockLocations, asset.locationId);

  const toggleWithoutOpening = (event: GestureResponderEvent) => {
    event.stopPropagation();
    onToggle();
  };

  return (
    <Pressable
      accessibilityHint="Opens asset details"
      accessibilityLabel={`${asset.assetTag}, ${asset.name}`}
      accessibilityRole="button"
      onPress={onOpen}
      style={({ pressed }) => [
        styles.tableRow,
        {
          backgroundColor: checked
            ? theme.colors.primarySoft
            : pressed
              ? theme.colors.surfacePressed
              : theme.colors.surface,
          borderBottomColor: theme.colors.border,
        },
      ]}
    >
      <View style={styles.checkboxColumn}>
        <SelectionCheckbox
          checked={checked}
          label={`Select ${asset.assetTag}`}
          onPress={toggleWithoutOpening}
        />
      </View>
      <Cell style={styles.tagColumn}>
        <AppText variant="caption" style={{ color: theme.colors.primary }}>
          {asset.assetTag}
        </AppText>
      </Cell>
      <Cell style={styles.nameColumn}>
        <AppText numberOfLines={1}>{asset.name}</AppText>
        <AppText variant="caption" muted numberOfLines={1}>
          {asset.manufacturer} {asset.model}
        </AppText>
      </Cell>
      <Cell style={styles.categoryColumn}>
        <AppText>{formatLabel(asset.category)}</AppText>
      </Cell>
      <Cell style={styles.statusColumn}>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: theme.colors.backgroundMuted },
          ]}
        >
          <AppText variant="caption">{formatLabel(asset.status)}</AppText>
        </View>
      </Cell>
      <Cell style={styles.locationColumn}>
        <AppText numberOfLines={2}>
          {location?.name ?? "Unknown location"}
        </AppText>
      </Cell>
      <Cell style={styles.assigneeColumn}>
        <AppText numberOfLines={2} muted={!asset.assignedTo}>
          {asset.assignedTo ?? "Unassigned"}
        </AppText>
      </Cell>
      <View style={styles.actionColumn}>
        <Ionicons
          name="chevron-forward"
          size={19}
          color={theme.colors.textMuted}
        />
      </View>
    </Pressable>
  );
}

type SelectionCheckboxProps = {
  checked: boolean;
  indeterminate?: boolean;
  label: string;
  onPress: (event: GestureResponderEvent) => void;
};

function SelectionCheckbox({
  checked,
  indeterminate,
  label,
  onPress,
}: SelectionCheckboxProps) {
  const theme = useAppTheme();
  const selected = checked || indeterminate;

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: indeterminate ? "mixed" : checked }}
      hitSlop={8}
      onPress={onPress}
      style={[
        styles.checkbox,
        {
          backgroundColor: selected ? theme.colors.primary : "transparent",
          borderColor: selected ? theme.colors.primary : theme.colors.border,
        },
      ]}
    >
      {selected ? (
        <Ionicons
          name={indeterminate ? "remove" : "checkmark"}
          size={15}
          color={theme.colors.inverseText}
        />
      ) : null}
    </Pressable>
  );
}

type ColumnProps = {
  label: string;
  style: object;
};

function ColumnHeader({ label, style }: ColumnProps) {
  return (
    <View style={[styles.cell, style]}>
      <AppText variant="caption" muted>
        {label}
      </AppText>
    </View>
  );
}

type CellProps = {
  children: React.ReactNode;
  style: object;
};

function Cell({ children, style }: CellProps) {
  return <View style={[styles.cell, style]}>{children}</View>;
}

function firstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function formatLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getResultDescription(
  count: number,
  query: string,
  status?: AssetStatus,
  category?: AssetCategory,
) {
  const filters = [
    status ? formatLabel(status).toLowerCase() : undefined,
    category ? formatLabel(category).toLowerCase() : undefined,
  ].filter(Boolean);
  const filterDescription = filters.length > 0 ? `${filters.join(", ")} ` : "";
  const queryDescription = query ? ` matching “${query}”` : "";

  return `${count} ${filterDescription}asset${count === 1 ? "" : "s"}${queryDescription}`;
}

const styles = StyleSheet.create({
  intro: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  introCopy: {
    gap: 6,
  },
  selectionBadge: {
    alignItems: "center",
    borderRadius: 999,
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filters: {
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
    padding: 14,
  },
  filterHeading: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  filterLabel: {
    width: 70,
  },
  filterOptions: {
    gap: 8,
    paddingRight: 8,
  },
  filterChip: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  tableShell: {
    borderRadius: 14,
    borderWidth: 1,
    flex: 1,
    minHeight: 260,
    overflow: "hidden",
  },
  horizontalContent: {
    flexGrow: 1,
  },
  table: {
    flex: 1,
    width: tableWidth,
  },
  tableHeader: {
    alignItems: "center",
    borderBottomWidth: 1,
    flexDirection: "row",
    minHeight: 52,
  },
  tableList: {
    flex: 1,
  },
  tableBody: {
    flexGrow: 1,
  },
  emptyTableBody: {
    justifyContent: "center",
  },
  tableRow: {
    alignItems: "center",
    borderBottomWidth: 1,
    flexDirection: "row",
    minHeight: 82,
  },
  cell: {
    gap: 4,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  checkboxColumn: {
    alignItems: "center",
    justifyContent: "center",
    width: 54,
  },
  tagColumn: {
    width: 110,
  },
  nameColumn: {
    width: 220,
  },
  categoryColumn: {
    width: 120,
  },
  statusColumn: {
    width: 130,
  },
  locationColumn: {
    width: 210,
  },
  assigneeColumn: {
    width: 220,
  },
  actionColumn: {
    alignItems: "center",
    justifyContent: "center",
    width: 56,
  },
  statusBadge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  checkbox: {
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1.5,
    height: 22,
    justifyContent: "center",
    width: 22,
  },
  emptyState: {
    alignItems: "center",
    gap: 10,
    padding: 28,
  },
  emptyText: {
    maxWidth: 420,
    textAlign: "center",
  },
});
