function servicesApiBase(): string {
  if (typeof window === "undefined") return "https://services-api.trf.is";
  const host = window.location.hostname;
  const parts = host.split(".");
  const apex = parts.length >= 2 ? parts.slice(-2).join(".") : "trf.is";
  return `https://services-api.${apex}`;
}

const BASE = servicesApiBase();

export const DEFAULT_DISCOVERY_MENU_URL = `${BASE}/v1/discovery/menu`;

export const DEFAULT_DISCOVERY_MENU_GROUP = "default";

export const DEFAULT_DISCOVERY_AUTH_COOKIE_NAME = "jwt_token";

export const DEFAULT_DISCOVERY_FETCH_CREDENTIALS: RequestCredentials = "include";

export const DEFAULT_TRANSLATIONS_URL = `${BASE}/v1/translations`;
export const DEFAULT_SUGGESTIONS_URL = `${BASE}/v1/translations/suggestions`;
