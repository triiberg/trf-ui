import type { MenuItem } from "./types";

export const organizationMenu: MenuItem = {
  id: "org",
  label: "Organization",
  labels: { en: "Organization", ee: "Organisatsioon" },
  children: [
    { id: "org-overview", label: "Overview", labels: { en: "Overview", ee: "Ülevaade" }, appId: "portal", path: "/app/manage-organization/list" },
    { id: "org-add", label: "Add new", labels: { en: "Add new", ee: "Lisa uus" }, appId: "portal", path: "/app/manage-organization/new" }
  ]
};

export const menuStructure: MenuItem[] = [organizationMenu];
