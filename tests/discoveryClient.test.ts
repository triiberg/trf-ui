import assert from "node:assert/strict";
import test from "node:test";
import { DEFAULT_DISCOVERY_MENU_URL } from "../src/config";
import { fetchDiscoveryMenuItems, mapDiscoveryMenuToMenuItems } from "../src/discoveryClient";

test("mapDiscoveryMenuToMenuItems sorts entries and keeps enabled state", () => {
  const items = mapDiscoveryMenuToMenuItems(
    {
      menus: {
        default: [
          {
            id: "crm-home",
            label: "CRM",
            path: "/app/contacts",
            app_key: "crm",
            enabled: false,
            order: 30
          },
          {
            id: "portal-home",
            label: "Organization",
            path: "/app/manage-organization",
            app_key: "portal",
            enabled: true,
            order: 10
          },
          {
            id: "ledger-home",
            label: "Ledger",
            path: "/app/accounts",
            app_key: "ledger",
            enabled: true,
            order: 20
          }
        ]
      }
    },
    "default"
  );

  assert.deepEqual(items, [
    {
      id: "discovery-ledger-home",
      label: "Ledger",
      appId: "ledger",
      path: "/app/accounts",
      disabled: false
    },
    {
      id: "discovery-crm-home",
      label: "CRM",
      appId: "crm",
      path: "/app/contacts",
      disabled: true
    }
  ]);
});

test("mapDiscoveryMenuToMenuItems falls back to default group", () => {
  const items = mapDiscoveryMenuToMenuItems(
    {
      menus: {
        default: [
          {
            id: "ledger-home",
            label: "Ledger",
            path: "/app/accounts",
            app_key: "ledger",
            enabled: true,
            order: 20
          }
        ]
      }
    },
    "member"
  );

  assert.equal(items.length, 1);
  assert.equal(items[0].id, "discovery-ledger-home");
});

test("fetchDiscoveryMenuItems uses default URL and forwards auth headers", async () => {
  let receivedUrl = "";
  let receivedHeaders: Record<string, string> = {};
  let receivedCredentials: RequestCredentials | undefined;

  const fetchImpl: typeof fetch = async (input, init) => {
    receivedUrl = String(input);
    receivedHeaders = (init?.headers ?? {}) as Record<string, string>;
    receivedCredentials = init?.credentials;
    return new Response(JSON.stringify({ menus: { default: [] } }), {
      status: 200,
      headers: {
        "content-type": "application/json"
      }
    });
  };

  await fetchDiscoveryMenuItems({
    authToken: "sample-token",
    ifMatch: "sample-etag",
    fetchImpl
  });

  assert.equal(receivedUrl, DEFAULT_DISCOVERY_MENU_URL);
  assert.equal(receivedHeaders.Authorization, "Bearer sample-token");
  assert.equal(receivedHeaders["If-Match"], "sample-etag");
  assert.equal(receivedCredentials, "include");
});

test("fetchDiscoveryMenuItems falls back to jwt_token cookie when authToken is not provided", async () => {
  let receivedHeaders: Record<string, string> = {};
  const originalDocument = (globalThis as { document?: unknown }).document;

  Object.defineProperty(globalThis, "document", {
    configurable: true,
    writable: true,
    value: {
      cookie: "jwt_token=cookie-token"
    }
  });

  const fetchImpl: typeof fetch = async (_input, init) => {
    receivedHeaders = (init?.headers ?? {}) as Record<string, string>;
    return new Response(JSON.stringify({ menus: { default: [] } }), {
      status: 200,
      headers: {
        "content-type": "application/json"
      }
    });
  };

  try {
    await fetchDiscoveryMenuItems({
      fetchImpl
    });
  } finally {
    if (typeof originalDocument === "undefined") {
      delete (globalThis as { document?: unknown }).document;
    } else {
      Object.defineProperty(globalThis, "document", {
        configurable: true,
        writable: true,
        value: originalDocument
      });
    }
  }

  assert.equal(receivedHeaders.Authorization, "Bearer cookie-token");
});
