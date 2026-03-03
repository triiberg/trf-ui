import type { MenuItem } from "./types";

export const organizationMenu: MenuItem = {
  id: "org",
  label: "Organization",
  children: [
    { id: "org-overview", label: "Overview", appId: "portal", path: "/app/manage-organization/list" },
    { id: "org-add", label: "Add new", appId: "portal", path: "/app/manage-organization/new" }
  ]
};

export const ledgerMenu: MenuItem = {
  id: "ledger-home",
  label: "Ledger",
  appId: "ledger",
  children: [
    { id: "ledger-accounts",   label: "Accounts",         appId: "ledger", path: "/app/accounts" },
    { id: "ledger-periods",    label: "Periods",           appId: "ledger", path: "/app/periods" },
    { id: "ledger-entries",    label: "Entries",           appId: "ledger", path: "/app/entries" },
    { id: "ledger-currencies", label: "Currencies",        appId: "ledger", path: "/app/currencies" },
    { id: "ledger-mappings",   label: "Account Mappings",  appId: "ledger", path: "/app/mappings" },
    { id: "ledger-taxes",      label: "Tax Rates",         appId: "ledger", path: "/app/tax-rates" },
    { id: "ledger-dimensions", label: "Dimensions",        appId: "ledger", path: "/app/dimension-types" },
    { id: "ledger-units",      label: "Units",             appId: "ledger", path: "/app/units" },
  ]
};

export const menuStructure: MenuItem[] = [organizationMenu, ledgerMenu];
