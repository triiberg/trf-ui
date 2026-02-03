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
