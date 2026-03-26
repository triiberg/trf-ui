import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchDiscoveryMenu } from "./discoveryClient";
import { getOrganizationNameFromJwt } from "./jwt";
import { logout } from "./logout";
import { menuStructure } from "./menu";
import type { AppBaseUrls, AppId, DiscoveryMenuConfig, MenuItem } from "./types";
import { TranslationClient } from "./translationClient";
import { TRF_UI_VERSION } from "./version";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ee", label: "Eesti" },
];

type SideMenuProps = {
  currentAppId: AppId;
  baseUrls?: AppBaseUrls;
  className?: string;
  discovery?: DiscoveryMenuConfig;
  translationClient?: TranslationClient;
};

const DEFAULT_OPEN_BY_APP: Record<string, string> = {
  portal: "org"
};

const joinUrl = (base: string, path: string) => {
  const trimmedBase = base.replace(/\/+$/, "");
  const trimmedPath = path.replace(/^\/+/, "");
  return `${trimmedBase}/${trimmedPath}`;
};

const injectSlug = (pathOrUrl: string, slug?: string): string => {
  if (!slug || !pathOrUrl) return pathOrUrl;
  if (pathOrUrl.includes("://")) {
    const appIdx = pathOrUrl.indexOf("/app/");
    if (appIdx === -1) return pathOrUrl;
    return pathOrUrl.slice(0, appIdx) + `/app/${slug}/` + pathOrUrl.slice(appIdx + 5);
  }
  if (pathOrUrl === "/app" || pathOrUrl === "/app/") return `/app/${slug}`;
  if (pathOrUrl.startsWith("/app/")) return `/app/${slug}/${pathOrUrl.slice(5)}`;
  return pathOrUrl;
};

const SideMenu: React.FC<SideMenuProps> = ({ currentAppId, baseUrls, className, discovery, translationClient }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug: orgSlug } = useParams<{ slug: string }>();
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(DEFAULT_OPEN_BY_APP[currentAppId] ? [DEFAULT_OPEN_BY_APP[currentAppId]] : [])
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [discoveryItems, setDiscoveryItems] = useState<MenuItem[]>([]);
  const [discoveryBaseUrls, setDiscoveryBaseUrls] = useState<AppBaseUrls>({});
  const [discoveryError, setDiscoveryError] = useState<string | null>(null);
  const [orgName, setOrgName] = useState<string | null>(null);
  const [authVersion, setAuthVersion] = useState(0);
  const [currentLang, setCurrentLang] = useState<string>(() => translationClient?.getLang() ?? "en");

  const authCookieName = orgSlug ? `trf_jwt_${orgSlug}` : discovery?.authCookieName;

  useEffect(() => {
    const onAuthChanged = () => {
      setOrgName(getOrganizationNameFromJwt(authCookieName));
      setAuthVersion((v) => v + 1);
    };
    onAuthChanged();
    window.addEventListener("trf:auth-changed", onAuthChanged);
    return () => window.removeEventListener("trf:auth-changed", onAuthChanged);
  }, [authCookieName]);

  useEffect(() => {
    const onLangChanged = (e: Event) => {
      setCurrentLang((e as CustomEvent<string>).detail);
    };
    window.addEventListener("trf:lang-changed", onLangChanged);
    return () => window.removeEventListener("trf:lang-changed", onLangChanged);
  }, []);

  const sideMenuItems = useMemo(() => {
    if (discoveryItems.length > 0) {
      return discoveryItems;
    }
    return menuStructure;
  }, [discoveryItems]);

  const isActive = (item: MenuItem) => {
    let checkPath: string | undefined = item.path ? injectSlug(item.path, orgSlug) : undefined;
    if (!checkPath && item.externalUrl) {
      try {
        const parsed = new URL(injectSlug(item.externalUrl, orgSlug));
        if (parsed.origin === window.location.origin) {
          checkPath = parsed.pathname;
        }
      } catch {
        // ignore invalid URLs
      }
    }
    if (!checkPath) return false;
    if (checkPath === "/app" || checkPath === `/app/${orgSlug}`) return location.pathname === checkPath;
    return location.pathname === checkPath || location.pathname.startsWith(checkPath + "/");
  };

  const hasActiveChild = (item: MenuItem): boolean => {
    if (!item.children || item.children.length === 0) return false;
    return item.children.some((child) => isActive(child) || hasActiveChild(child));
  };

  useEffect(() => {
    let cancelled = false;

    const fetchMenuItems = async () => {
      console.log("[trf-ui] starting discovery menu fetch", {
        menuUrl: discovery?.menuUrl,
        orgSlug,
        authTokenProvided: Boolean(discovery?.authToken),
        authCookieName: discovery?.authCookieName
      });

      try {
        const result = await fetchDiscoveryMenu({
          menuUrl: discovery?.menuUrl,
          authToken: discovery?.authToken,
          authCookieName: authCookieName,
          credentials: discovery?.credentials,
          ifMatch: discovery?.ifMatch,
        });
        if (!cancelled) {
          setDiscoveryItems(result.items);
          setDiscoveryBaseUrls(result.baseUrls);
          setDiscoveryError(null);
          console.log("[trf-ui] discovery menu items loaded into side menu", {
            count: result.items.length,
            ids: result.items.map((item) => item.id)
          });
        }
      } catch (error) {
        if (!cancelled) {
          setDiscoveryItems([]);
          const message =
            error instanceof Error && error.message
              ? error.message
              : "Could not load discovery menu.";
          setDiscoveryError(message);
        }
        console.error("[trf-ui] failed to fetch discovery menu", error);
      }
    };

    void fetchMenuItems();

    return () => {
      cancelled = true;
    };
  }, [
    discovery?.menuUrl,
    discovery?.authToken,
    authCookieName,
    discovery?.credentials,
    discovery?.ifMatch,
    orgSlug,
    authVersion
  ]);

  useEffect(() => {
    const ancestorIds = new Set<string>();
    const collectAncestors = (items: MenuItem[], targetActive: boolean = false): boolean => {
      for (const item of items) {
        const selfActive = isActive(item);
        const childActive = item.children ? collectAncestors(item.children) : false;
        if (selfActive || childActive) {
          ancestorIds.add(item.id);
          return true;
        }
      }
      return targetActive;
    };
    for (const section of sideMenuItems) {
      if (isActive(section) || hasActiveChild(section)) {
        ancestorIds.add(section.id);
        if (section.children) collectAncestors(section.children);
      }
    }
    if (ancestorIds.size > 0) {
      setOpenSections(prev => {
        const next = new Set(prev);
        for (const id of ancestorIds) next.add(id);
        return next;
      });
    } else {
      const fallback = DEFAULT_OPEN_BY_APP[currentAppId];
      if (fallback) {
        setOpenSections(new Set([fallback]));
      }
    }
  }, [location.pathname, currentAppId, sideMenuItems]);

  useEffect(() => {
    console.info(`[trf-ui] version ${TRF_UI_VERSION}`);
  }, []);

  const handleToggle = (id: string, disabled?: boolean) => {
    if (disabled) return;
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const effectiveBaseUrls = { ...baseUrls, ...discoveryBaseUrls };

  const resolveExternalUrl = (item: MenuItem) => {
    if (item.externalUrl) return injectSlug(item.externalUrl, orgSlug);
    if (!item.path || !item.appId) return null;
    const base = effectiveBaseUrls[item.appId];
    if (!base) return null;
    return joinUrl(base, injectSlug(item.path, orgSlug));
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.disabled) return;

    const url = resolveExternalUrl(item);
    if (!url) return;

    try {
      const parsed = new URL(url);
      if (parsed.origin === window.location.origin) {
        navigate(parsed.pathname);
        setMobileOpen(false);
        return;
      }
    } catch {
      // not a full URL — fall through
    }

    window.location.href = url;
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
                  if (hasChildren) {
                    handleToggle(item.id, item.disabled);
                  } else {
                    handleItemClick(item);
                  }
                }}
              >
                <span className="truncate text-base">{item.label}</span>
                {hasChildren && (
                  <span className="ml-2 text-xs text-slate-400">
                    {openSections.has(item.id) ? "-" : "+"}
                  </span>
                )}
              </button>

              {hasChildren && openSections.has(item.id) && (
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

  const portalBase = effectiveBaseUrls.portal || "https://login.trf.is";
  const homeUrl = orgSlug
    ? `${portalBase}/app/${orgSlug}/manage-organization/list`
    : `${portalBase}/app/manage-organization`;

  const MenuContent = (
    <div className="flex flex-col h-full">
      <a href={homeUrl} className="flex items-center gap-3 px-4 py-4 border-b border-slate-200 no-underline hover:bg-slate-50 transition">
        <div className="h-8 w-8 bg-slate-900 rounded-lg flex items-center justify-center">
          <span className="text-white font-semibold text-[10px] tracking-wider">TRF</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900">TRF.is</p>
          <p className="text-xs text-slate-500">Business tools in one place.</p>
          {orgName && <p className="text-xs text-slate-400 truncate">{orgName}</p>}
        </div>
      </a>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        {discoveryError && (
          <div className="mb-3 rounded border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
            {discoveryError}
          </div>
        )}
        {renderItems(sideMenuItems)}
      </div>

      <div className="border-t border-slate-200 px-3 py-3 space-y-1">
        {translationClient && (
          <select
            value={currentLang}
            onChange={(e) => translationClient.setLang(e.target.value)}
            className="w-full rounded-lg px-3 py-2 text-sm text-slate-600 bg-white border border-slate-200 hover:border-slate-300 transition cursor-pointer focus:outline-none"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
        )}
        <button
          type="button"
          onClick={() => logout(`${effectiveBaseUrls.portal ?? "https://login.trf.is"}/`)}
          className="w-full rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition text-left"
        >
          Sign out
        </button>
      </div>
    </div>
  );

  const navClassName = [
    "hidden md:flex md:flex-col md:w-64 lg:w-72 bg-gradient-to-b from-white to-sky-50 border-r border-slate-200",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <div className="md:hidden border-b border-slate-200 px-4 py-3 flex items-center justify-between bg-white">
        <a href={homeUrl} className="flex items-center gap-3 no-underline">
          <div className="h-7 w-7 bg-slate-900 rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-[9px] tracking-wider">TRF</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900">TRF.is</p>
            <p className="text-[11px] text-slate-500">Business tools in one place.</p>
            {orgName && <p className="text-[11px] text-slate-400 truncate">{orgName}</p>}
          </div>
        </a>
        <button
          type="button"
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 flex items-center gap-1.5"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Close
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Menu
            </>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute left-0 top-0 w-64 h-full bg-gradient-to-b from-white to-sky-50 shadow-xl z-50 overflow-y-auto"
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
