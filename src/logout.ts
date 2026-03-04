const COOKIE_PREFIX = "trf_jwt_";
const MAIN_COOKIE = "jwt_token";

const removeCookie = (name: string): void => {
  // Must match the domain used when the cookie was set (.trf.is in prod)
  const hostname = typeof window !== "undefined" ? window.location.hostname : "";
  const parts = hostname.split(".");
  const sharedDomain = parts.length >= 2 ? `.${parts.slice(-2).join(".")}` : hostname;

  const bases = [
    `expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`,
    `expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${hostname}`,
    `expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${sharedDomain}`,
  ];

  for (const attrs of bases) {
    document.cookie = `${encodeURIComponent(name)}=; ${attrs}`;
  }
};

export const logout = (redirectUrl?: string): void => {
  if (typeof document === "undefined") return;

  // Remove main session cookie
  removeCookie(MAIN_COOKIE);

  // Remove all per-org cookies
  for (const chunk of document.cookie.split(";")) {
    const name = decodeURIComponent((chunk.split("=")[0] ?? "").trim());
    if (name.startsWith(COOKIE_PREFIX)) {
      removeCookie(name);
    }
  }

  window.dispatchEvent(new Event("trf:auth-changed"));

  const target = redirectUrl ?? (typeof window !== "undefined" ? window.location.origin : "/");
  window.location.href = target;
};
