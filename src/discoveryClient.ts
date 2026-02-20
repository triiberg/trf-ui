import { DEFAULT_DISCOVERY_MENU_GROUP, DEFAULT_DISCOVERY_MENU_URL } from "./config";
import type { DiscoveryMenuConfig, MenuItem } from "./types";

type DiscoveryMenuEntry = {
  id: string;
  label: string;
  path: string;
  app_key: string;
  enabled: boolean;
  order?: number;
};

type DiscoveryMenuResponse = {
  menus?: Record<string, DiscoveryMenuEntry[] | undefined>;
};

export type DiscoveryMenuClientConfig = DiscoveryMenuConfig & {
  fetchImpl?: typeof fetch;
};

const byOrder = (a: DiscoveryMenuEntry, b: DiscoveryMenuEntry) => {
  const aOrder = a.order ?? Number.MAX_SAFE_INTEGER;
  const bOrder = b.order ?? Number.MAX_SAFE_INTEGER;
  return aOrder - bOrder;
};

const isOrganizationMenuEntry = (entry: DiscoveryMenuEntry) => {
  return entry.id === "portal-home" || entry.path === "/app/manage-organization";
};

const mapMenuEntry = (entry: DiscoveryMenuEntry): MenuItem => {
  return {
    id: `discovery-${entry.id}`,
    label: entry.label,
    appId: entry.app_key,
    path: entry.path,
    disabled: entry.enabled === false
  };
};

export const mapDiscoveryMenuToMenuItems = (
  response: DiscoveryMenuResponse,
  menuGroup: string = DEFAULT_DISCOVERY_MENU_GROUP
): MenuItem[] => {
  const preferredMenus = response.menus?.[menuGroup];
  const fallbackMenus = response.menus?.[DEFAULT_DISCOVERY_MENU_GROUP];
  const entries = preferredMenus ?? fallbackMenus ?? [];

  return entries.filter((entry) => !isOrganizationMenuEntry(entry)).sort(byOrder).map(mapMenuEntry);
};

export const fetchDiscoveryMenuItems = async (
  config: DiscoveryMenuClientConfig = {}
): Promise<MenuItem[]> => {
  const menuUrl = config.menuUrl ?? DEFAULT_DISCOVERY_MENU_URL;
  const menuGroup = config.menuGroup ?? DEFAULT_DISCOVERY_MENU_GROUP;
  const fetchImpl = config.fetchImpl ?? fetch;

  const headers: Record<string, string> = {};
  if (config.authToken) {
    headers.Authorization = `Bearer ${config.authToken}`;
  }
  if (config.ifMatch) {
    headers["If-Match"] = config.ifMatch;
  }

  const response = await fetchImpl(menuUrl, {
    method: "GET",
    headers
  });

  if (!response.ok) {
    throw new Error(`Discovery menu request failed: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as DiscoveryMenuResponse;
  return mapDiscoveryMenuToMenuItems(data, menuGroup);
};
