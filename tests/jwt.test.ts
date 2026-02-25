import assert from "node:assert/strict";
import test from "node:test";
import { getOrganizationNameFromJwt } from "../src/jwt";

const REAL_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
  "eyJhY2NvdW50Ijp7ImlkIjoiNWE1YTA3ZjYtZWIzMC00M2NhLThkYWQtZmJmZTc5NmRiZTYzIiwidXNlcm5hbWUiOiJ0b29tYXMucmlpYmVyZ0BnbWFpbC5jb20ifSwib3JnYW5pemF0aW9uIjp7ImlkIjoiMjdkZWEzNjktMmY1Ny00YjZjLWEwZTYtZGIzMDM0YmE4MGQzIiwidGVuYW50SWQiOiIiLCJuYW1lIjoiMTBYIExlYWRlcnMgT8OcIiwicm9sZSI6Im93bmVyIiwiY291bnRyeSI6IkVzdG9uaWEifSwiaXNzIjoidHJmLmlzIiwiZXhwIjoxNzk0OTA2NzIyfQ." +
  "EXygDzm6i_2WwRBr903_4UsWH2qRuImGuKnlyXIqyiM";

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

test("extracts organization name from real JWT cookie", () => {
  withDocumentCookie(`jwt_token=${REAL_TOKEN}`, () => {
    const name = getOrganizationNameFromJwt();
    assert.equal(name, "10X Leaders OÜ");
  });
});

test("extracts name with custom cookie name", () => {
  withDocumentCookie(`my_auth=${REAL_TOKEN}`, () => {
    const name = getOrganizationNameFromJwt("my_auth");
    assert.equal(name, "10X Leaders OÜ");
  });
});

test("returns null when cookie is missing", () => {
  withDocumentCookie("other_cookie=abc", () => {
    const name = getOrganizationNameFromJwt();
    assert.equal(name, null);
  });
});

test("returns null when document is undefined (SSR)", () => {
  const original = (globalThis as { document?: unknown }).document;
  delete (globalThis as { document?: unknown }).document;
  try {
    const name = getOrganizationNameFromJwt();
    assert.equal(name, null);
  } finally {
    if (typeof original !== "undefined") {
      Object.defineProperty(globalThis, "document", {
        configurable: true,
        writable: true,
        value: original
      });
    }
  }
});

test("returns null for malformed token", () => {
  withDocumentCookie("jwt_token=not-a-jwt", () => {
    const name = getOrganizationNameFromJwt();
    assert.equal(name, null);
  });
});

test("returns null for token without organization claim", () => {
  // {"account":{"id":"abc"},"iss":"trf.is"}
  const payload = btoa(JSON.stringify({ account: { id: "abc" }, iss: "trf.is" }));
  const token = `eyJhbGciOiJIUzI1NiJ9.${payload}.sig`;
  withDocumentCookie(`jwt_token=${token}`, () => {
    const name = getOrganizationNameFromJwt();
    assert.equal(name, null);
  });
});

test("handles cookie with multiple entries", () => {
  withDocumentCookie(`foo=bar; jwt_token=${REAL_TOKEN}; baz=qux`, () => {
    const name = getOrganizationNameFromJwt();
    assert.equal(name, "10X Leaders OÜ");
  });
});
