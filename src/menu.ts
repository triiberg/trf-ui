import type { MenuItem } from "./types";

export const aiMenu: MenuItem = {
  id: "ai-home",
  label: "AI",
  appId: "ai",
  children: [
    { id: "ai-chat",     label: "Chat",     appId: "ai", path: "/app/chat" },
    { id: "ai-history",  label: "History",  appId: "ai", path: "/app/history" },
    { id: "ai-settings", label: "Settings", appId: "ai", path: "/app/settings" },
  ]
};

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

export const crmMenu: MenuItem = {
  id: "crm-home",
  label: "CRM",
  appId: "crm",
  children: [
    { id: "crm-contacts", label: "Contacts", appId: "crm", path: "/app/contacts" },
  ]
};

export const invoicesMenu: MenuItem = {
  id: "invoices-home",
  label: "Invoices",
  appId: "invoices",
  children: [
    { id: "invoices-list", label: "Invoices", appId: "invoices", path: "/app/invoices" },
  ]
};

export const paymentsMenu: MenuItem = {
  id: "payments-home",
  label: "Payments",
  appId: "payments",
  children: [
    { id: "payments-list",   label: "Payments",         appId: "payments", path: "/app/payments" },
    { id: "payments-series", label: "Payment Series",   appId: "payments", path: "/app/series" },
  ]
};

export const purchaseMenu: MenuItem = {
  id: "purchase-home",
  label: "Purchases",
  appId: "purchase",
  children: [
    { id: "purchase-list",     label: "Purchase Invoices", appId: "purchase", path: "/app/invoices" },
    { id: "purchase-new",      label: "New Purchase",      appId: "purchase", path: "/app/invoices/new" },
    { id: "purchase-series",   label: "Booking Series",    appId: "purchase", path: "/app/series" },
    { id: "purchase-settings", label: "Settings",          appId: "purchase", path: "/app/settings" },
  ]
};

export const knowledgeMenu: MenuItem = {
  id: "knowledge-home",
  label: "Knowledge",
  appId: "knowledge",
  children: [
    { id: "knowledge-organization",   label: "Organisation",    appId: "knowledge", path: "/app/organization" },
    { id: "knowledge-banks",          label: "Banks",           appId: "knowledge", path: "/app/banks" },
    { id: "knowledge-employees",      label: "Employees",       appId: "knowledge", path: "/app/employees" },
    { id: "knowledge-locations",      label: "Locations",       appId: "knowledge", path: "/app/locations" },
    { id: "knowledge-projects",       label: "Projects",        appId: "knowledge", path: "/app/projects" },
    { id: "knowledge-bank-types",     label: "Bank Types",      appId: "knowledge", path: "/app/bank-types" },
    { id: "knowledge-location-types", label: "Location Types",  appId: "knowledge", path: "/app/location-types" },
    { id: "knowledge-project-types",  label: "Project Types",   appId: "knowledge", path: "/app/project-types" },
  ]
};

export const settingsMenu: MenuItem = {
  id: "settings-home",
  label: "Settings",
  appId: "settings",
  children: [
    { id: "settings-organization",   label: "Organisation",    appId: "settings", path: "/app/organization" },
    { id: "settings-banks",          label: "Banks",           appId: "settings", path: "/app/banks" },
    { id: "settings-employees",      label: "Employees",       appId: "settings", path: "/app/employees" },
    { id: "settings-locations",      label: "Locations",       appId: "settings", path: "/app/locations" },
    { id: "settings-projects",       label: "Projects",        appId: "settings", path: "/app/projects" },
    { id: "settings-bank-types",     label: "Bank Types",      appId: "settings", path: "/app/bank-types" },
    { id: "settings-location-types", label: "Location Types",  appId: "settings", path: "/app/location-types" },
    { id: "settings-project-types",  label: "Project Types",   appId: "settings", path: "/app/project-types" },
  ]
};

export const menuStructure: MenuItem[] = [aiMenu, invoicesMenu, paymentsMenu, purchaseMenu, crmMenu, ledgerMenu, knowledgeMenu, settingsMenu, organizationMenu];
