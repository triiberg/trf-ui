export type AppId =
  | "portal"
  | "ledger"
  | "assets"
  | "crm"
  | "hr"
  | "bookkeeping"
  | (string & {});

export type AppBaseUrls = Record<string, string>;

export type MenuItem = {
  id: string;
  label: string;
  appId?: AppId;
  path?: string;
  externalUrl?: string;
  disabled?: boolean;
  children?: MenuItem[];
};

export type DiscoveryMenuConfig = {
  menuUrl?: string;
  authToken?: string;
  authCookieName?: string;
  credentials?: RequestCredentials;
  ifMatch?: string;
  menuGroup?: string;
};
