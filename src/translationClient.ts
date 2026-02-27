import { DEFAULT_SUGGESTIONS_URL, DEFAULT_TRANSLATIONS_URL } from "./config";

type TranslationEntry = Record<string, string>;

type TranslationsResponse = {
  translations?: Array<{ key: string } & TranslationEntry>;
};

export class TranslationClient {
  private map: Map<string, TranslationEntry> = new Map();
  private loaded = false;
  private lang: string;
  private suggested: Set<string> = new Set();
  private loadPromise: Promise<void> | null = null;

  constructor(lang: string = "en") {
    this.lang = lang;
  }

  load(): Promise<void> {
    if (this.loaded) {
      return Promise.resolve();
    }
    if (this.loadPromise) {
      return this.loadPromise;
    }
    this.loadPromise = this._doLoad();
    return this.loadPromise;
  }

  private async _doLoad(): Promise<void> {
    try {
      const response = await fetch(DEFAULT_TRANSLATIONS_URL);
      if (!response.ok) {
        console.warn("[trf-ui] translations fetch failed", {
          status: response.status,
          statusText: response.statusText
        });
        return;
      }
      const data = (await response.json()) as TranslationsResponse;
      for (const entry of data.translations ?? []) {
        const { key, ...langs } = entry;
        this.map.set(key, langs);
      }
      this.loaded = true;
      console.log("[trf-ui] translations loaded", {
        lang: this.lang,
        keys: this.map.size,
        sample: [...this.map.keys()].slice(0, 3)
      });
    } catch (err) {
      console.warn("[trf-ui] translations fetch error", err);
    }
  }

  translate(key: string, defaultText: string): string {
    const entry = this.map.get(key);
    if (entry) {
      return entry[this.lang] ?? entry["en"] ?? defaultText;
    }
    this.suggest(key, defaultText);
    return defaultText;
  }

  dump(): Record<string, Record<string, string>> {
    const result: Record<string, Record<string, string>> = {};
    for (const [key, langs] of this.map) {
      result[key] = { ...langs };
    }
    return result;
  }

  private suggest(key: string, defaultText: string): void {
    if (this.suggested.has(key)) {
      return;
    }
    this.suggested.add(key);

    const token = this.getJwtToken();
    if (!token) {
      return;
    }

    fetch(DEFAULT_SUGGESTIONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ key, en: defaultText })
    }).catch(() => {});
  }

  private getJwtToken(): string | null {
    if (typeof document === "undefined" || typeof document.cookie !== "string") {
      return null;
    }

    const chunks = document.cookie.split(";");
    for (const chunk of chunks) {
      const [rawName, ...rawValueParts] = chunk.split("=");
      const name = (rawName ?? "").trim();
      if (name !== "jwt_token") {
        continue;
      }
      const value = rawValueParts.join("=").trim();
      return value || null;
    }

    return null;
  }
}
