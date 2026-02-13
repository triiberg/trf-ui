import type { MenuItem } from "./types";

export const menuStructure: MenuItem[] = [
  {
    id: "org",
    label: "Organization",
    children: [
      { id: "org-overview", label: "Overview", appId: "portal", path: "/app/manage-organization/list" },
      { id: "org-add", label: "Add new", appId: "portal", path: "/app/manage-organization/new" },
      { id: "org-users", label: "Manage users", appId: "portal", path: "/app/organization/users", disabled: true },
      { id: "org-billing", label: "Billing", appId: "portal", path: "/app/organization/billing", disabled: true },
      { id: "org-my-settings", label: "My settings", appId: "portal", path: "/app/me/settings", disabled: true },
      { id: "org-my-account", label: "My account", appId: "portal", path: "/app/me/account", disabled: true }
    ]
  },
  {
    id: "assets",
    label: "Assets / inventory",
    children: [
      { id: "assets-items", label: "Items", appId: "assets", path: "/items" },
      {
        id: "assets-reports",
        label: "Reports",
        children: [
          { id: "assets-reports-items-out", label: "Items out", appId: "assets", path: "/reports/items-out" },
          { id: "assets-reports-missing", label: "Missing", appId: "assets", path: "/reports/missing" }
        ]
      }
    ]
  },
  {
    id: "crm",
    label: "CRM",
    children: [
      { id: "crm-dashboard", label: "Dashboard", appId: "crm", path: "/app" },
      { id: "crm-contacts", label: "Contacts", appId: "crm", path: "/app/contacts" },
      { id: "crm-add-contact", label: "Add contact", appId: "crm", path: "/app/contacts/new" },
      {
        id: "crm-admin",
        label: "Contact Administration",
        children: [
          { id: "crm-admin-relation-types", label: "Relation types", appId: "crm", path: "/app/admin/relation-types" },
          { id: "crm-admin-attribute-types", label: "Attribute types", appId: "crm", path: "/app/admin/attribute-types" }
        ]
      },
      {
        id: "crm-reports",
        label: "Reports",
        disabled: true,
        children: [
          { id: "crm-reports-sales", label: "Sales in progress", appId: "crm", path: "/reports/sales-in-progress", disabled: true },
          { id: "crm-reports-debtors", label: "Debtors", appId: "crm", path: "/reports/debtors", disabled: true }
        ]
      }
    ]
  },
  {
    id: "bookkeeping",
    label: "Book Keeping",
    children: [
      {
        id: "bk-ledger",
        label: "Ledger",
        children: [
          { id: "bk-ledger-dashboard", label: "Dashboard", appId: "ledger", path: "/app" },
          { id: "bk-ledger-accounts", label: "Chart of Accounts", appId: "ledger", path: "/app/accounts" },
          { id: "bk-ledger-periods", label: "Accounting Periods", appId: "ledger", path: "/app/periods" },
          { id: "bk-ledger-entries", label: "Journal Entries", appId: "ledger", path: "/app/entries" }
        ]
      },
      {
        id: "bk-sales",
        label: "Sales",
        disabled: true,
        children: [
          { id: "bk-sales-invoices", label: "Invoices", appId: "bookkeeping", path: "/sales/invoices", disabled: true },
          { id: "bk-sales-create", label: "Create sale", appId: "bookkeeping", path: "/sales/new", disabled: true },
          {
            id: "bk-sales-reports",
            label: "Reports",
            disabled: true,
            children: [
              { id: "bk-sales-reports-sales", label: "Sales report", appId: "bookkeeping", path: "/reports/sales", disabled: true },
              { id: "bk-sales-reports-overdue", label: "Invoices over due", appId: "bookkeeping", path: "/reports/invoices-overdue", disabled: true }
            ]
          }
        ]
      },
      {
        id: "bk-purchases",
        label: "Purchases",
        disabled: true,
        children: [
          { id: "bk-purchase-invoices", label: "Invoices", appId: "bookkeeping", path: "/purchases/invoices", disabled: true },
          { id: "bk-purchase-import", label: "Import invoice", appId: "bookkeeping", path: "/purchases/import", disabled: true },
          {
            id: "bk-purchase-reports",
            label: "Reports",
            disabled: true,
            children: [
              { id: "bk-purchase-reports-overdue", label: "Over due", appId: "bookkeeping", path: "/reports/purchases-overdue", disabled: true },
              { id: "bk-purchase-reports-by-buyer", label: "By buyer", appId: "bookkeeping", path: "/reports/by-buyer", disabled: true }
            ]
          }
        ]
      },
      {
        id: "bk-finance",
        label: "Finance",
        disabled: true,
        children: [
          { id: "bk-finance-balance", label: "Balance sheet", appId: "bookkeeping", path: "/finance/balance-sheet", disabled: true },
          {
            id: "bk-finance-reports",
            label: "Reports",
            disabled: true,
            children: [
              { id: "bk-finance-reports-balance", label: "Balance sheet", appId: "bookkeeping", path: "/reports/balance-sheet", disabled: true }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "hr",
    label: "HR Tools",
    children: [
      { id: "hr-overview", label: "Overview", appId: "hr", path: "/overview" },
      { id: "hr-employees", label: "Employees", appId: "hr", path: "/employees" },
      { id: "hr-contracts", label: "Contracts", appId: "hr", path: "/contracts" },
      {
        id: "hr-settings",
        label: "Settings",
        children: [
          { id: "hr-settings-templates", label: "Contract templates", appId: "hr", path: "/settings/templates" },
          { id: "hr-settings-rules", label: "Ruleset settings", appId: "hr", path: "/settings/rules" }
        ]
      }
    ]
  }
];
