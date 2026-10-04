/**
 * Client Multi-Provider AI da browser.
 * Supporta:
 * 1. Groq
 * 2. OpenRouter
 * 3. OpenAI
 * 4. Cloudflare Workers AI
 *
 * Tutte le chiavi sono conservate cifrate/protette localmente in localStorage
 * e rimangono sul dispositivo dell'utente.
 */

export type ProviderId = "groq" | "openrouter" | "openai" | "cloudflare";

export type ProviderSettings = {
  activeProvider: ProviderId | "auto";
  groqKey: string;
  groqModel: string;
  openrouterKey: string;
  openrouterModel: string;
  openaiKey: string;
  openaiModel: string;
  cloudflareKey: string;
  cloudflareAccountId: string;
  cloudflareModel: string;
};

export const DEFAULT_SETTINGS: ProviderSettings = {
  activeProvider: "auto",
  groqKey: "",
  groqModel: "openai/gpt-oss-120b",
  openrouterKey: "",
  openrouterModel: "qwen/qwen-2.5-72b-instruct",
  openaiKey: "",
  openaiModel: "gpt-4o",
  cloudflareKey: "",
  cloudflareAccountId: "",
  cloudflareModel: "@cf/meta/llama-3.3-70b-instruct",
};

/**
 * Livello 1 — valori di progetto, letti da .env.local (file del workspace,
 * sopravvive ai refresh della preview, escluso da Git). Chi non valorizza
 * una variabile resta sul default hardcoded sopra.
 */
function readEnvDefaults(): ProviderSettings {
  const env = import.meta.env;
  const activeFromEnv = env.VITE_AI_ACTIVE_PROVIDER?.trim() as ProviderSettings["activeProvider"] | undefined;
  const validActive: ProviderSettings["activeProvider"][] = ["auto", "groq", "openrouter", "openai", "cloudflare"];

  return {
    activeProvider: activeFromEnv && validActive.includes(activeFromEnv) ? activeFromEnv : DEFAULT_SETTINGS.activeProvider,
    groqKey: env.VITE_GROQ_API_KEY?.trim() || "",
    groqModel: env.VITE_GROQ_MODEL?.trim() || DEFAULT_SETTINGS.groqModel,
    openrouterKey: env.VITE_OPENROUTER_API_KEY?.trim() || "",
    openrouterModel: env.VITE_OPENROUTER_MODEL?.trim() || DEFAULT_SETTINGS.openrouterModel,
    openaiKey: env.VITE_OPENAI_API_KEY?.trim() || "",
    openaiModel: env.VITE_OPENAI_MODEL?.trim() || DEFAULT_SETTINGS.openaiModel,
    cloudflareKey: env.VITE_CLOUDFLARE_API_KEY?.trim() || "",
    cloudflareAccountId: env.VITE_CLOUDFLARE_ACCOUNT_ID?.trim() || "",
    cloudflareModel: env.VITE_CLOUDFLARE_MODEL?.trim() || DEFAULT_SETTINGS.cloudflareModel,
  };
}

export const ENV_DEFAULTS: ProviderSettings = readEnvDefaults();

const SETTINGS_KEY = "alkimia.ai.settings.v1";

/**
 * Livello 2 — sovrascritture locali salvate dall'OFFICINA. Restituisce solo
 * ciò che l'utente ha effettivamente scritto in questo browser (può essere
 * un oggetto vuoto o parziale): non è ancora unito ai default di progetto.
 */
function readLocalOverrides(): Partial<ProviderSettings> {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      // Retrocompatibilità con la vecchia chiave Groq salvata singolarmente.
      const legacyGroq = localStorage.getItem("alkimia.groq.key");
      const legacyModel = localStorage.getItem("alkimia.groq.model");
      const legacy: Partial<ProviderSettings> = {};
      if (legacyGroq) legacy.groqKey = legacyGroq;
      if (legacyModel) legacy.groqModel = legacyModel;
      return legacy;
    }
    return JSON.parse(raw) as Partial<ProviderSettings>;
  } catch {
    return {};
  }
}

/**
 * Impostazioni effettive: .env.local fa da base, il localStorage del
 * browser sovrascrive solo i campi non vuoti. Svuotare un campo in OFFICINA
 * e salvare fa tornare automaticamente al valore di progetto.
 */
export function loadSettings(): ProviderSettings {
  const overrides = readLocalOverrides();
  const merged: ProviderSettings = { ...ENV_DEFAULTS };
  (Object.keys(merged) as (keyof ProviderSettings)[]).forEach((key) => {
    const value = overrides[key];
    if (value !== undefined && value !== "") {
      (merged as Record<keyof ProviderSettings, string>)[key] = value as string;
    }
  });
  return merged;
}

/** True se questo campo proviene da .env.local e non è stato sovrascritto qui. */
export function isFromProjectEnv(key: keyof ProviderSettings): boolean {
  const overrides = readLocalOverrides();
  const overridden = overrides[key];
  return !(overridden !== undefined && overridden !== "");
}

export function saveSettings(settings: ProviderSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    /* storage non disponibile */
  }
}

/** Rimuove solo le sovrascritture locali: l'app torna ai valori di .env.local. */
export function clearLocalOverrides(): void {
  try {
    localStorage.removeItem(SETTINGS_KEY);
    localStorage.removeItem("alkimia.groq.key");
    localStorage.removeItem("alkimia.groq.model");
  } catch {
    /* storage non disponibile */
  }
}

export function hasAnyKey(): boolean {
  const s = loadSettings();
  return Boolean(
    s.groqKey.trim() ||
    s.openrouterKey.trim() ||
    s.openaiKey.trim() ||
    (s.cloudflareKey.trim() && s.cloudflareAccountId.trim())
  );
}

export function getAvailableProviders(s: ProviderSettings = loadSettings()): ProviderId[] {
  const list: ProviderId[] = [];
  if (s.groqKey.trim()) list.push("groq");
  if (s.openrouterKey.trim()) list.push("openrouter");
  if (s.openaiKey.trim()) list.push("openai");
  if (s.cloudflareKey.trim() && s.cloudflareAccountId.trim()) list.push("cloudflare");
  return list;
}

export function getActiveProviderLabel(s: ProviderSettings = loadSettings()): { label: string; tone: "ai" | "local" } {
  const available = getAvailableProviders(s);
  if (available.length === 0) {
    return { label: "motore locale di riserva", tone: "local" };
  }
  if (s.activeProvider !== "auto" && available.includes(s.activeProvider)) {
    const model = getModelFor(s, s.activeProvider);
    return { label: `${providerName(s.activeProvider)} · ${model}`, tone: "ai" };
  }
  const first = available[0];
  const model = getModelFor(s, first);
  return { label: `${providerName(first)} (auto) · ${model}`, tone: "ai" };
}

function providerName(id: ProviderId): string {
  switch (id) {
    case "groq": return "Groq";
    case "openrouter": return "OpenRouter";
    case "openai": return "OpenAI";
    case "cloudflare": return "Cloudflare AI";
  }
}

function getModelFor(s: ProviderSettings, id: ProviderId): string {
  switch (id) {
    case "groq": return s.groqModel || DEFAULT_SETTINGS.groqModel;
    case "openrouter": return s.openrouterModel || DEFAULT_SETTINGS.openrouterModel;
    case "openai": return s.openaiModel || DEFAULT_SETTINGS.openaiModel;
    case "cloudflare": return s.cloudflareModel || DEFAULT_SETTINGS.cloudflareModel;
  }
}

async function callGroq(s: ProviderSettings, prompt: string, maxOutputTokens: number): Promise<string> {
  const key = s.groqKey.trim();
  const model = s.groqModel.trim() || DEFAULT_SETTINGS.groqModel;
  const modelLower = model.toLowerCase();

  const reasoningOptions = modelLower.includes("gpt-oss")
    ? { include_reasoning: false }
    : modelLower.includes("qwen")
      ? { reasoning_format: "hidden" }
      : {};

  const body = {
    model,
    messages: [
      {
        role: "user",
        content: `${prompt}\n\nATTENZIONE: Rispondi ESCLUSIVAMENTE con un oggetto JSON valido conforme alle istruzioni, senza testo introduttivo, senza commenti e senza blocchi markdown.`,
      },
    ],
    max_completion_tokens: maxOutputTokens,
    response_format: { type: "json_object" },
    stream: false,
    ...reasoningOptions,
  };

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`Groq HTTP ${response.status}: ${errorText.slice(0, 300)}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("Risposta vuota da Groq");
  return content;
}

async function callOpenRouter(s: ProviderSettings, prompt: string, maxOutputTokens: number): Promise<string> {
  const key = s.openrouterKey.trim();
  const model = s.openrouterModel.trim() || DEFAULT_SETTINGS.openrouterModel;

  const body = {
    model,
    messages: [
      {
        role: "user",
        content: `${prompt}\n\nATTENZIONE: Rispondi ESCLUSIVAMENTE con un oggetto JSON valido, senza testo introduttivo, senza markdown.`,
      },
    ],
    max_tokens: maxOutputTokens,
    response_format: { type: "json_object" },
  };

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
      "HTTP-Referer": "https://alkimia.v2",
      "X-Title": "ALKIMIA.v2",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`OpenRouter HTTP ${response.status}: ${errorText.slice(0, 300)}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("Risposta vuota da OpenRouter");
  return content;
}

async function callOpenAI(s: ProviderSettings, prompt: string, maxOutputTokens: number): Promise<string> {
  const key = s.openaiKey.trim();
  const model = s.openaiModel.trim() || DEFAULT_SETTINGS.openaiModel;

  const body = {
    model,
    messages: [
      {
        role: "user",
        content: `${prompt}\n\nATTENZIONE: Rispondi ESCLUSIVAMENTE con un oggetto JSON valido conforme alle istruzioni, senza testo prima o dopo.`,
      },
    ],
    max_tokens: maxOutputTokens,
    response_format: { type: "json_object" },
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`OpenAI HTTP ${response.status}: ${errorText.slice(0, 300)}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("Risposta vuota da OpenAI");
  return content;
}

async function callCloudflare(s: ProviderSettings, prompt: string, maxOutputTokens: number): Promise<string> {
  const token = s.cloudflareKey.trim();
  const accountId = s.cloudflareAccountId.trim();
  const model = s.cloudflareModel.trim() || DEFAULT_SETTINGS.cloudflareModel;

  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`;

  const body = {
    messages: [
      {
        role: "user",
        content: `${prompt}\n\nATTENZIONE: Rispondi ESCLUSIVAMENTE con un oggetto JSON valido, senza testo introduttivo.`,
      },
    ],
    max_tokens: maxOutputTokens,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`Cloudflare AI HTTP ${response.status}: ${errorText.slice(0, 300)}`);
  }

  const data = await response.json();
  const content = data?.result?.response;
  if (!content) throw new Error("Risposta vuota da Cloudflare Workers AI");
  return content;
}

/**
 * Invia la richiesta al provider configurato, gestendo anche la cascata di fallback
 * tra le chiavi disponibili se il provider primario fallisce.
 */
export async function executeAiCompletion(options: {
  prompt: string;
  maxOutputTokens: number;
  schemaName: string;
}): Promise<{ content: string; providerUsed: string; modelUsed: string }> {
  const s = loadSettings();
  const available = getAvailableProviders(s);

  if (available.length === 0) {
    throw new Error("Nessuna chiave API configurata tra quelle disponibili.");
  }

  // Ordine di esecuzione
  let executionQueue: ProviderId[] = [];
  if (s.activeProvider !== "auto" && available.includes(s.activeProvider)) {
    executionQueue = [s.activeProvider, ...available.filter((p) => p !== s.activeProvider)];
  } else {
    executionQueue = available;
  }

  const errors: string[] = [];

  for (const providerId of executionQueue) {
    const model = getModelFor(s, providerId);
    try {
      let content = "";
      if (providerId === "groq") {
        content = await callGroq(s, options.prompt, options.maxOutputTokens);
      } else if (providerId === "openrouter") {
        content = await callOpenRouter(s, options.prompt, options.maxOutputTokens);
      } else if (providerId === "openai") {
        content = await callOpenAI(s, options.prompt, options.maxOutputTokens);
      } else if (providerId === "cloudflare") {
        content = await callCloudflare(s, options.prompt, options.maxOutputTokens);
      }
      return {
        content,
        providerUsed: providerName(providerId),
        modelUsed: model,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`${providerName(providerId)}: ${msg}`);
      console.warn(`[ALKIMIA] Fallita chiamata a ${providerName(providerId)} (${model}):`, msg);
    }
  }

  throw new Error(`Tutti i provider configurati hanno fallito:\n${errors.join("\n")}`);
}
