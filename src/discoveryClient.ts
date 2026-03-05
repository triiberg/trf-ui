import {
  DEFAULT_DISCOVERY_AUTH_COOKIE_NAME,
  DEFAULT_DISCOVERY_FETCH_CREDENTIALS,
  DEFAULT_DISCOVERY_MENU_GROUP,
  DEFAULT_DISCOVERY_MENU_URL
} from "./config";
import type { DiscoveryMenuConfig, MenuItem } from "./types";

type DiscoveryMenuEntry = {
  id: string;
  label: string;
  path?: string;
  app_key: string;
  enabled: boolean;
  order?: number;
  items?: DiscoveryMenuEntry[];
};

type DiscoveryMenuResponse = {
  menus?: Record<string, DiscoveryMenuEntry[] | undefined>;
  base_urls?: Record<string, string>;
};

export type DiscoveryMenuClientConfig = DiscoveryMenuConfig & {
  fetchImpl?: typeof fetch;
};

type ResolvedAuthToken = {
  token?: string;
  source: "config" | "cookie" | "none";
  cookieName: string;
};

const safeDecodeURIComponent = (value: string): string => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const getCookieValue = (cookieName: string): string | undefined => {
  if (typeof document === "undefined" || typeof document.cookie !== "string") {
    return undefined;
  }

  const chunks = document.cookie.split(";");
  for (const chunk of chunks) {
    const [rawName, ...rawValueParts] = chunk.split("=");
    const name = safeDecodeURIComponent((rawName ?? "").trim());
    if (name !== cookieName) {
      continue;
    }
    const rawValue = rawValueParts.join("=").trim();
    return safeDecodeURIComponent(rawValue);
  }

  return undefined;
};

const resolveAuthToken = (config: DiscoveryMenuClientConfig): ResolvedAuthToken => {
  const explicitToken = config.authToken?.trim();
  if (explicitToken) {
    return {
      token: explicitToken,
      source: "config",
      cookieName: config.authCookieName?.trim() || DEFAULT_DISCOVERY_AUTH_COOKIE_NAME
    };
  }

  const cookieName = config.authCookieName?.trim() || DEFAULT_DISCOVERY_AUTH_COOKIE_NAME;
  const cookieToken = getCookieValue(cookieName)?.trim();
  if (!cookieToken) {
    return {
      source: "none",
      cookieName
    };
  }

  return {
    token: cookieToken,
    source: "cookie",
    cookieName
  };
};

const byOrder = (a: DiscoveryMenuEntry, b: DiscoveryMenuEntry) => {
  const aOrder = a.order ?? Number.MAX_SAFE_INTEGER;
  const bOrder = b.order ?? Number.MAX_SAFE_INTEGER;
  return aOrder - bOrder;
};

const mapMenuEntry = (entry: DiscoveryMenuEntry): MenuItem => {
  const item: MenuItem = {
    id: `discovery-${entry.id}`,
    label: entry.label,
    appId: entry.app_key,
    path: entry.path,
    disabled: entry.enabled === false
  };
  if (entry.items && entry.items.length > 0) {
    item.children = entry.items.sort(byOrder).map(mapMenuEntry);
  }
  return item;
};

export type DiscoveryMenuResult = {
  items: MenuItem[];
  baseUrls: Record<string, string>;
};

export const mapDiscoveryMenuResponse = (
  response: DiscoveryMenuResponse,
  menuGroup: string = DEFAULT_DISCOVERY_MENU_GROUP
): DiscoveryMenuResult => {
  const preferredMenus = response.menus?.[menuGroup];
  const fallbackMenus = response.menus?.[DEFAULT_DISCOVERY_MENU_GROUP];
  const entries = preferredMenus ?? fallbackMenus ?? [];

  return {
    items: entries.sort(byOrder).map(mapMenuEntry),
    baseUrls: response.base_urls ?? {}
  };
};

export const mapDiscoveryMenuToMenuItems = (
  response: DiscoveryMenuResponse,
  menuGroup: string = DEFAULT_DISCOVERY_MENU_GROUP
): MenuItem[] => mapDiscoveryMenuResponse(response, menuGroup).items;

export const fetchDiscoveryMenu = async (
  config: DiscoveryMenuClientConfig = {}
): Promise<DiscoveryMenuResult> => {
  const menuUrl = config.menuUrl ?? DEFAULT_DISCOVERY_MENU_URL;
  const menuGroup = config.menuGroup ?? DEFAULT_DISCOVERY_MENU_GROUP;
  const fetchImpl = config.fetchImpl ?? fetch;
  const auth = resolveAuthToken(config);

  if (!auth.token) {
    const message =
      `Discovery menu request requires authentication. ` +
      `Provide discovery.authToken or ensure "${auth.cookieName}" cookie is present.`;
    console.error("[trf-ui] discovery menu request blocked", {
      menuUrl,
      menuGroup,
      reason: "missing_auth_token",
      authCookieName: auth.cookieName
    });
    throw new Error(message);
  }

  const headers: Record<string, string> = {};
  headers.Authorization = `Bearer ${auth.token}`;
  if (config.ifMatch) {
    headers["If-Match"] = config.ifMatch;
  }

  const credentials = config.credentials ?? DEFAULT_DISCOVERY_FETCH_CREDENTIALS;

  console.log("[trf-ui] calling discovery menu endpoint", {
    menuUrl,
    menuGroup,
    authSource: auth.source,
    hasIfMatchHeader: Boolean(config.ifMatch),
    credentials
  });

  const response = await fetchImpl(menuUrl, {
    method: "GET",
    headers,
    credentials
  });

  if (!response.ok) {
    console.error("[trf-ui] discovery menu request failed", {
      menuUrl,
      menuGroup,
      status: response.status,
      statusText: response.statusText
    });
    throw new Error(`Discovery menu request failed: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as DiscoveryMenuResponse;
  const result = mapDiscoveryMenuResponse(data, menuGroup);

  console.log("[trf-ui] discovery menu retrieved", {
    menuUrl,
    menuGroup,
    status: response.status,
    count: result.items.length,
    baseUrlKeys: Object.keys(result.baseUrls),
    items: result.items.map((item) => ({
      id: item.id,
      label: item.label,
      path: item.path,
      disabled: Boolean(item.disabled)
    }))
  });

  return result;
};

export const fetchDiscoveryMenuItems = async (
  config: DiscoveryMenuClientConfig = {}
): Promise<MenuItem[]> => {
  const result = await fetchDiscoveryMenu(config);
  return result.items;
};
