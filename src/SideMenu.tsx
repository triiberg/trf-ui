import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { menuStructure } from "./menu";
import type { AppBaseUrls, AppId, MenuItem } from "./types";

type SideMenuProps = {
  currentAppId: AppId;
  baseUrls: AppBaseUrls;
  className?: string;
};

const DEFAULT_OPEN_BY_APP: Record<string, string> = {
  portal: "org",
  ledger: "bookkeeping",
  assets: "assets",
  crm: "crm",
  hr: "hr",
  bookkeeping: "bookkeeping"
};

const joinUrl = (base: string, path: string) => {
  const trimmedBase = base.replace(/\/+$/, "");
  const trimmedPath = path.replace(/^\/+/, "");
  return `${trimmedBase}/${trimmedPath}`;
};

const SideMenu: React.FC<SideMenuProps> = ({ currentAppId, baseUrls, className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSectionId, setOpenSectionId] = useState<string | null>(
    DEFAULT_OPEN_BY_APP[currentAppId] ?? null
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (item: MenuItem) => {
    if (!item.path) return false;
    if (item.appId && item.appId !== currentAppId) return false;
    if (item.path === "/app") return location.pathname === "/app";
    return location.pathname.startsWith(item.path);
  };

  const hasActiveChild = (item: MenuItem): boolean => {
    if (!item.children || item.children.length === 0) return false;
    return item.children.some((child) => isActive(child) || hasActiveChild(child));
  };

  useEffect(() => {
    const activeTop = menuStructure.find(
      (section) => isActive(section) || hasActiveChild(section)
    );
    if (activeTop) {
      setOpenSectionId(activeTop.id);
      return;
    }
    const fallback = DEFAULT_OPEN_BY_APP[currentAppId] ?? null;
    setOpenSectionId(fallback);
  }, [location.pathname, currentAppId]);

  const handleTopLevelToggle = (id: string, disabled?: boolean) => {
    if (disabled) return;
    setOpenSectionId((prev) => (prev === id ? null : id));
  };

  const resolveExternalUrl = (item: MenuItem) => {
    if (item.externalUrl) return item.externalUrl;
    if (!item.path || !item.appId) return null;
    const base = baseUrls[item.appId];
    if (!base) return null;
    return joinUrl(base, item.path);
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.disabled) return;

    const isInternal = item.path && (!item.appId || item.appId === currentAppId);
    if (isInternal && item.path) {
      navigate(item.path);
      setMobileOpen(false);
      return;
    }

    const externalUrl = resolveExternalUrl(item);
    if (externalUrl) {
      window.location.href = externalUrl;
    }
  };

  const renderItems = (items: MenuItem[], depth = 0) => {
    return (
      <ul className="space-y-1">
        {items.map((item) => {
          const hasChildren = !!item.children && item.children.length > 0;
          const active = isActive(item) || hasActiveChild(item);
          const indent =
            depth === 0 ? "pl-0" : depth === 1 ? "pl-4" : depth === 2 ? "pl-8" : "pl-10";

          const baseClasses =
            "flex items-center justify-between w-full rounded-lg px-3 py-2 text-sm transition";
          const stateClasses = item.disabled
            ? "text-slate-400 cursor-not-allowed"
            : active
            ? "bg-sky-50 text-sky-700 border border-sky-200 cursor-pointer"
            : "text-slate-700 hover:bg-slate-50 cursor-pointer";

          return (
            <li key={item.id}>
              <button
                type="button"
                className={`${baseClasses} ${stateClasses} ${indent}`}
                onClick={() => {
                  if (hasChildren && depth === 0) {
                    handleTopLevelToggle(item.id, item.disabled);
                  } else {
                    handleItemClick(item);
                  }
                }}
              >
                <span className="truncate text-base">{item.label}</span>
                {hasChildren && depth === 0 && (
                  <span className="ml-2 text-xs text-slate-400">
                    {openSectionId === item.id ? "-" : "+"}
                  </span>
                )}
              </button>

              {hasChildren && depth === 0 && openSectionId === item.id && (
                <div className="mt-1 ml-1 border-l border-slate-100 pl-2">
                  {renderItems(item.children!, depth + 1)}
                </div>
              )}

              {hasChildren && depth > 0 && (
                <div className="mt-1 ml-1 border-l border-slate-100 pl-2">
                  {renderItems(item.children!, depth + 1)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  const MenuContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-200">
        <div className="h-8 w-8 bg-slate-900 rounded-lg flex items-center justify-center">
          <span className="text-white font-semibold text-[10px] tracking-wider">TRF</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-900">TRF.is</p>
          <p className="text-xs text-slate-500">Business tools in one place.</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        {renderItems(menuStructure)}
      </div>
    </div>
  );

  const navClassName = [
    "hidden md:flex md:flex-col md:w-64 lg:w-72 bg-white border-r border-slate-200",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <div className="md:hidden border-b border-slate-200 px-4 py-3 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 bg-slate-900 rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-[9px] tracking-wider">TRF</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">TRF.is</p>
            <p className="text-[11px] text-slate-500">Business tools in one place.</p>
          </div>
        </div>
        <button
          type="button"
          className="rounded-lg border border-slate-300 px-2 py-1 text-xs text-slate-700"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute left-0 top-0 w-64 h-full bg-white shadow-xl z-50 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {MenuContent}
          </div>
        </div>
      )}

      <nav className={navClassName}>{MenuContent}</nav>
    </>
  );
};

export default SideMenu;
