import assert from "node:assert/strict";
import test from "node:test";
import { TranslationClient } from "../src/translationClient";

const MOCK_TRANSLATIONS = {
  translations: [
    { key: "<trn-create-organization>", en: "Create organization", ee: "Loo organisatsioon" },
    { key: "<trn-save>", en: "Save", ee: "Salvesta" },
    { key: "<trn-en-only>", en: "English only" }
  ]
};

function withFetch(impl: typeof fetch, fn: () => Promise<void>): Promise<void> {
  const original = globalThis.fetch;
  globalThis.fetch = impl;
  return fn().finally(() => {
    globalThis.fetch = original;
  });
}

function withDocumentCookie(cookie: string, fn: () => void) {
  const original = (globalThis as { document?: unknown }).document;
  Object.defineProperty(globalThis, "document", {
    configurable: true,
    writable: true,
    value: { cookie }
  });
  try {
    fn();
  } finally {
    if (typeof original === "undefined") {
      delete (globalThis as { document?: unknown }).document;
    } else {
      Object.defineProperty(globalThis, "document", {
        configurable: true,
        writable: true,
        value: original
      });
    }
  }
}

function makeFetchOk(body: unknown): typeof fetch {
  return async () =>
    new Response(JSON.stringify(body), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
}

test("load() populates map from fetch response", async () => {
  const client = new TranslationClient("ee");
  await withFetch(makeFetchOk(MOCK_TRANSLATIONS), async () => {
    await client.load();
  });
  assert.equal(client.translate("<trn-create-organization>", "Create organization"), "Loo organisatsioon");
});

test("load() is idempotent — second call is a no-op", async () => {
  let fetchCallCount = 0;
  const fetchImpl: typeof fetch = async () => {
    fetchCallCount++;
    return new Response(JSON.stringify(MOCK_TRANSLATIONS), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  };

  const client = new TranslationClient("ee");
  await withFetch(fetchImpl, async () => {
    await client.load();
    await client.load();
  });

  assert.equal(fetchCallCount, 1);
});

test("translate() returns correct lang text when key exists", async () => {
  const client = new TranslationClient("ee");
  await withFetch(makeFetchOk(MOCK_TRANSLATIONS), async () => {
    await client.load();
  });
  assert.equal(client.translate("<trn-save>", "Save"), "Salvesta");
});

test("translate() falls back to 'en' when requested lang is missing", async () => {
  const client = new TranslationClient("fi");
  await withFetch(makeFetchOk(MOCK_TRANSLATIONS), async () => {
    await client.load();
  });
  assert.equal(client.translate("<trn-en-only>", "English only"), "English only");
});

test("translate() returns defaultText when key is missing", async () => {
  const client = new TranslationClient("ee");
  await withFetch(makeFetchOk(MOCK_TRANSLATIONS), async () => {
    await client.load();
  });
  withDocumentCookie("", () => {
    assert.equal(client.translate("<trn-unknown>", "Unknown label"), "Unknown label");
  });
});

test("suggest() deduplicates — only one POST per unique missing key", async () => {
  let postCount = 0;
  const originalFetch = globalThis.fetch;
  const fetchImpl: typeof fetch = async (_input, init) => {
    if (init?.method === "POST") {
      postCount++;
    }
    return new Response(JSON.stringify(MOCK_TRANSLATIONS), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  };

  globalThis.fetch = fetchImpl;
  try {
    const client = new TranslationClient("ee");
    await client.load();

    withDocumentCookie("jwt_token=test-token", () => {
      // Call translate three times with the same missing key
      client.translate("<trn-dedup>", "Missing");
      client.translate("<trn-dedup>", "Missing");
      client.translate("<trn-dedup>", "Missing");
    });

    // Wait for fire-and-forget POSTs to settle
    await new Promise((resolve) => setTimeout(resolve, 20));
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.equal(postCount, 1);
});

test("suggest() skips silently when no jwt_token cookie", async () => {
  let postCount = 0;
  const fetchImpl: typeof fetch = async (_input, init) => {
    if (init?.method === "POST") {
      postCount++;
    }
    return new Response(JSON.stringify(MOCK_TRANSLATIONS), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  };

  const client = new TranslationClient("ee");
  await withFetch(fetchImpl, async () => {
    await client.load();
  });

  withDocumentCookie("other_cookie=abc", () => {
    client.translate("<trn-missing-no-auth>", "Missing no auth");
  });

  await new Promise((resolve) => setTimeout(resolve, 10));

  assert.equal(postCount, 0);
});

test("suggest() skips silently in SSR (no document)", async () => {
  let postCount = 0;
  const fetchImpl: typeof fetch = async (_input, init) => {
    if (init?.method === "POST") {
      postCount++;
    }
    return new Response(JSON.stringify(MOCK_TRANSLATIONS), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  };

  const client = new TranslationClient("ee");
  await withFetch(fetchImpl, async () => {
    await client.load();
  });

  const originalDocument = (globalThis as { document?: unknown }).document;
  delete (globalThis as { document?: unknown }).document;
  try {
    client.translate("<trn-ssr-missing>", "SSR missing");
  } finally {
    if (typeof originalDocument !== "undefined") {
      Object.defineProperty(globalThis, "document", {
        configurable: true,
        writable: true,
        value: originalDocument
      });
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 10));
  assert.equal(postCount, 0);
});

test("load() survives network failure without throwing", async () => {
  const fetchImpl: typeof fetch = async () => {
    throw new Error("network failure");
  };

  const client = new TranslationClient("en");
  await withFetch(fetchImpl, async () => {
    await assert.doesNotReject(() => client.load());
  });

  // translate still works, returns defaultText
  assert.equal(client.translate("<trn-any>", "Fallback"), "Fallback");
});
