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

export const menuStructure: MenuItem[] = [organizationMenu, ledgerMenu, crmMenu, invoicesMenu, knowledgeMenu];
