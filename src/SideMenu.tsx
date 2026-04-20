import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchDiscoveryMenu } from "./discoveryClient";
import { getAuthTokenFromCookie, getOrganizationNameFromJwt } from "./jwt";
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

// Design tokens matching the landing page
const T = {
  bg: "hsl(220,25%,8%)",
  bgDeep: "hsl(220,20%,4%)",
  muted: "hsl(220,20%,12%)",
  border: "hsl(220,20%,15%)",
  borderSubtle: "hsl(220,20%,13%)",
  fg: "hsl(200,100%,95%)",
  fgMuted: "hsl(215,20%,55%)",
  fgDim: "hsl(215,20%,40%)",
  primary: "hsl(185,100%,55%)",
  primaryBg: "hsla(185,100%,55%,0.08)",
  primaryBorder: "hsla(185,100%,55%,0.22)",
  gradient: "linear-gradient(135deg, hsl(185,100%,55%), hsl(260,80%,60%), hsl(320,85%,55%))",
};

const gradientTextStyle: React.CSSProperties = {
  background: T.gradient,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
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
  const [tokenBalance, setTokenBalance] = useState<number | null>(null);
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
    const token = getAuthTokenFromCookie(authCookieName);
    if (!token) { setTokenBalance(null); return; }
    let cancelled = false;
    fetch("https://login-api.trf.is/v1/billing/balance", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.ok ? resp.json() : null)
      .then((data) => {
        if (cancelled || data == null) return;
        const val = typeof data === "number" ? data : (data?.balance ?? null);
        setTokenBalance(typeof val === "number" ? val : null);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [authCookieName, authVersion]);

  useEffect(() => {
    const onLangChanged = (e: Event) => {
      setCurrentLang((e as CustomEvent<string>).detail);
    };
    window.addEventListener("trf:lang-changed", onLangChanged);
    return () => window.removeEventListener("trf:lang-changed", onLangChanged);
  }, []);

  const sideMenuItems = useMemo(() => {
    if (discoveryItems.length > 0) return discoveryItems;
    return menuStructure;
  }, [discoveryItems]);

  const isActive = (item: MenuItem, end?: boolean) => {
    let checkPath: string | undefined = item.path ? injectSlug(item.path, orgSlug) : undefined;
    if (!checkPath && item.externalUrl) {
      try {
        const parsed = new URL(injectSlug(item.externalUrl, orgSlug));
        if (parsed.origin === window.location.origin) checkPath = parsed.pathname;
      } catch { /* ignore */ }
    }
    if (!checkPath) return false;
    if (checkPath === "/app" || checkPath === `/app/${orgSlug}`) return location.pathname === checkPath;
    if (end) return location.pathname === checkPath;
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
        menuUrl: discovery?.menuUrl, orgSlug,
        authTokenProvided: Boolean(discovery?.authToken),
        authCookieName: discovery?.authCookieName,
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
            count: result.items.length, ids: result.items.map((item) => item.id),
          });
        }
      } catch (error) {
        if (error instanceof Error && error.message.startsWith("Discovery menu request requires authentication")) {
          if (typeof document !== "undefined") {
            const hostname = window.location.hostname;
            const parts = hostname.split(".");
            const sharedDomain = parts.length >= 2 ? `.${parts.slice(-2).join(".")}` : hostname;
            const domainVariants = ["", hostname, sharedDomain];
            for (const chunk of document.cookie.split(";")) {
              const name = decodeURIComponent((chunk.split("=")[0] ?? "").trim());
              if (name === "jwt_token" || name.startsWith("trf_jwt_")) {
                for (const domain of domainVariants) {
                  const domainAttr = domain ? `; domain=${domain}` : "";
                  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainAttr}`;
                }
              }
            }
          }
          window.location.href = "https://login.trf.is/";
          return;
        }
        if (!cancelled) {
          setDiscoveryItems([]);
          const message = error instanceof Error && error.message ? error.message : "Could not load discovery menu.";
          setDiscoveryError(message);
        }
        console.error("[trf-ui] failed to fetch discovery menu", error);
      }
    };
    void fetchMenuItems();
    return () => { cancelled = true; };
  }, [discovery?.menuUrl, discovery?.authToken, authCookieName, discovery?.credentials, discovery?.ifMatch, orgSlug, authVersion]);

  useEffect(() => {
    const ancestorIds = new Set<string>();
    const collectAncestors = (items: MenuItem[], targetActive: boolean = false): boolean => {
      for (const item of items) {
        const selfActive = isActive(item);
        const childActive = item.children ? collectAncestors(item.children) : false;
        if (selfActive || childActive) { ancestorIds.add(item.id); return true; }
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
      setOpenSections(prev => { const next = new Set(prev); for (const id of ancestorIds) next.add(id); return next; });
    } else {
      const fallback = DEFAULT_OPEN_BY_APP[currentAppId];
      if (fallback) setOpenSections(new Set([fallback]));
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
    } catch { /* not a full URL */ }
    window.location.href = url;
  };

  const renderItems = (items: MenuItem[], depth = 0) => (
    <ul style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      {items.map((item) => {
        const hasChildren = !!item.children && item.children.length > 0;
        const childActive = hasActiveChild(item);
        const isParentWithActiveChild = hasChildren && childActive;
        const isLeafActive = !hasChildren && isActive(item, true);
        const isHighlighted = isLeafActive || isParentWithActiveChild;

        const paddingLeft = depth === 0 ? "0.75rem" : depth === 1 ? "1.25rem" : depth === 2 ? "2rem" : "2.5rem";

        const btnStyle: React.CSSProperties = {
          display: "flex", alignItems: "center", justifyContent: "space-between",
          width: "100%", borderRadius: "0.5rem",
          paddingTop: "0.4rem", paddingBottom: "0.4rem",
          paddingLeft, paddingRight: "0.75rem",
          fontSize: "0.875rem",
          fontWeight: isHighlighted ? 500 : 400,
          transition: "background 0.2s, color 0.2s, border-color 0.2s",
          cursor: item.disabled ? "not-allowed" : "pointer",
          textAlign: "left",
          // Three-way state styling:
          ...(isLeafActive ? {
            background: "linear-gradient(to bottom, transparent, hsla(185,100%,55%,0.08))",
            border: "1px solid transparent",
            color: T.primary,
          } : isParentWithActiveChild ? {
            background: "transparent",
            border: "1px solid hsla(185,100%,55%,0.22)",
            borderLeft: "2px solid hsl(185,100%,55%)",
            color: T.primary,
          } : {
            background: "transparent",
            border: "1px solid transparent",
            color: item.disabled ? T.fgDim : T.fg,
          }),
        };

        return (
          <li key={item.id}>
            <button
              type="button"
              style={btnStyle}
              onMouseEnter={(e) => {
                if (!item.disabled && !isHighlighted) e.currentTarget.style.background = T.muted;
              }}
              onMouseLeave={(e) => {
                if (!item.disabled && !isHighlighted) {
                  e.currentTarget.style.background = "transparent";
                } else if (isLeafActive) {
                  e.currentTarget.style.background = "linear-gradient(to bottom, transparent, hsla(185,100%,55%,0.08))";
                }
              }}
              onClick={() => {
                if (hasChildren) handleToggle(item.id, item.disabled);
                else handleItemClick(item);
              }}
            >
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.labels?.[currentLang] ?? item.label}</span>
              {hasChildren && (
                <span style={{ marginLeft: "0.5rem", fontSize: "0.7rem", color: T.fgDim, flexShrink: 0 }}>
                  {openSections.has(item.id) ? "▲" : "▼"}
                </span>
              )}
            </button>
            {hasChildren && openSections.has(item.id) && (
              <div style={{ marginTop: "2px", marginLeft: "0.25rem", borderLeft: `1px solid ${T.borderSubtle}`, paddingLeft: "0.375rem" }}>
                {renderItems(item.children!, depth + 1)}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  const portalBase = effectiveBaseUrls.portal || "https://login.trf.is";
  const homeUrl = orgSlug
    ? `${portalBase}/app/${orgSlug}/manage-organization/list`
    : `${portalBase}/app/manage-organization`;

  const MenuContent = (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header / branding */}
      <a
        href={homeUrl}
        style={{
          display: "flex", alignItems: "center", gap: "0.75rem",
          padding: "1rem 1rem 1rem 1rem",
          borderBottom: `1px solid ${T.border}`,
          textDecoration: "none",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = T.muted)}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <span style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.02em", flexShrink: 0, ...gradientTextStyle }}>
          TRF.IS
        </span>
        {orgName && (
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: "0.75rem", color: T.fgMuted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {orgName}
            </p>
            {tokenBalance !== null && tokenBalance < 0 && (
              <p style={{ fontSize: "0.6875rem", color: "hsl(0,85%,65%)", whiteSpace: "nowrap" }}>Out of tokens</p>
            )}
          </div>
        )}
      </a>

      {/* Nav items */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0.75rem 0.625rem" }}>
        {discoveryError && (
          <div style={{ marginBottom: "0.75rem", borderRadius: "0.5rem", border: "1px solid hsla(0,85%,55%,0.3)", background: "hsla(0,85%,55%,0.1)", padding: "0.5rem 0.75rem", fontSize: "0.75rem", color: "hsl(0,85%,70%)" }}>
            {discoveryError}
          </div>
        )}
        {renderItems(sideMenuItems)}
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${T.border}`, padding: "0.625rem 0.625rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        {translationClient && (
          <select
            value={currentLang}
            onChange={(e) => translationClient.setLang(e.target.value)}
            style={{
              width: "100%", borderRadius: "0.5rem", padding: "0.4rem 0.75rem",
              fontSize: "0.8125rem", color: T.fgMuted,
              background: T.muted, border: `1px solid ${T.border}`,
              cursor: "pointer", outline: "none", fontFamily: "inherit",
            }}
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
        )}
        <button
          type="button"
          onClick={() => logout(`${effectiveBaseUrls.portal ?? "https://login.trf.is"}/`)}
          style={{
            width: "100%", borderRadius: "0.5rem", padding: "0.4rem 0.75rem",
            fontSize: "0.8125rem", color: T.fgMuted, background: "transparent",
            border: "1px solid transparent", cursor: "pointer", textAlign: "left",
            transition: "background 0.2s, color 0.2s", fontFamily: "inherit",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = T.muted; e.currentTarget.style.color = T.fg; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.fgMuted; }}
        >
          Sign out
        </button>
      </div>
    </div>
  );

  const navStyle: React.CSSProperties = {
    flexDirection: "column",
    width: "16rem",
    flexShrink: 0,
    background: T.bg,
    borderRight: `1px solid ${T.border}`,
  };

  return (
    <>
      {/* Mobile top bar */}
      <div
        className="md:hidden flex items-center justify-between"
        style={{
          borderBottom: `1px solid ${T.border}`,
          padding: "0.75rem 1rem",
          background: T.bg,
        }}
      >
        <a href={homeUrl} style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
          <span style={{ fontSize: "1.125rem", fontWeight: 700, letterSpacing: "-0.02em", ...gradientTextStyle }}>TRF.IS</span>
          {orgName && (
            <div style={{ minWidth: 0, overflow: "hidden" }}>
              <p style={{ fontSize: "0.6875rem", color: T.fgMuted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{orgName}</p>
              {tokenBalance !== null && tokenBalance < 0 && (
                <p style={{ fontSize: "0.625rem", color: "hsl(0,85%,65%)", whiteSpace: "nowrap" }}>Out of tokens</p>
              )}
            </div>
          )}
        </a>
        <button
          type="button"
          style={{
            borderRadius: "0.5rem", border: `1px solid ${T.border}`, padding: "0.375rem 0.75rem",
            fontSize: "0.8125rem", color: T.fg, background: T.muted,
            display: "flex", alignItems: "center", gap: "0.375rem", cursor: "pointer", fontFamily: "inherit",
          }}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "1rem", height: "1rem" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Close
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "1rem", height: "1rem" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Menu
            </>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 40 }}
          onClick={() => setMobileOpen(false)}
        >
          <div
            style={{ position: "absolute", left: 0, top: 0, width: "16rem", height: "100%", background: T.bg, zIndex: 50, overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            {MenuContent}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <nav
        className={["hidden md:flex md:flex-col", className].filter(Boolean).join(" ")}
        style={navStyle}
      >
        {MenuContent}
      </nav>
    </>
  );
};

export default SideMenu;
