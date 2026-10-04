/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GROQ_API_KEY?: string;
  readonly VITE_GROQ_MODEL?: string;
  readonly VITE_OPENROUTER_API_KEY?: string;
  readonly VITE_OPENROUTER_MODEL?: string;
  readonly VITE_OPENAI_API_KEY?: string;
  readonly VITE_OPENAI_MODEL?: string;
  readonly VITE_CLOUDFLARE_API_KEY?: string;
  readonly VITE_CLOUDFLARE_ACCOUNT_ID?: string;
  readonly VITE_CLOUDFLARE_MODEL?: string;
  readonly VITE_AI_ACTIVE_PROVIDER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
