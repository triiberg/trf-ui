import type { MenuItem } from "./types";

export const organizationMenu: MenuItem = {
  id: "org",
  label: "Organization",
  children: [
    { id: "org-overview", label: "Overview", appId: "portal", path: "/app/manage-organization/list" },
    { id: "org-add", label: "Add new", appId: "portal", path: "/app/manage-organization/new" }
  ]
};

export const menuStructure: MenuItem[] = [organizationMenu];
