import { useState } from "react";
import {
  loadSettings,
  saveSettings,
  clearLocalOverrides,
  isFromProjectEnv,
  type ProviderSettings,
  type ProviderId,
  getAvailableProviders,
} from "../lib/aiProviders";
import { readDocument } from "../lib/storage";

/** Etichetta che chiarisce da dove arriva il valore mostrato nel campo. */
function SourceBadge({ fromEnv, filled }: { fromEnv: boolean; filled: boolean }) {
  if (!filled) {
    return (
      <span className="rounded px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-fade">
        non configurata
      </span>
    );
  }
  return fromEnv ? (
    <span className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-ash">
      da .env.local
    </span>
  ) : (
    <span className="rounded bg-ritual/15 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-ritual">
      sovrascritta qui
    </span>
  );
}

type Props = {
  open: boolean;
  onClose: () => void;
  onChange: () => void;
  onRequestRegenerate: () => void;
};

export function Officina({ open, onClose, onChange, onRequestRegenerate }: Props) {
  const [settings, setSettings] = useState<ProviderSettings>(() => loadSettings());
  const [activeTab, setActiveTab] = useState<ProviderId | "priority">("priority");
  const [saved, setSaved] = useState(false);
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  if (!open) return null;

  const available = getAvailableProviders(settings);
  const currentDoc = readDocument();
  const canUpgrade = available.length > 0 && currentDoc?.source === "local";

  const toggleShow = (id: string) => {
    setShowKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const update = <K extends keyof ProviderSettings>(key: K, val: ProviderSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = () => {
    saveSettings(settings);
    setSaved(true);
    onChange();
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm("Vuoi rimuovere le sovrascritture salvate qui e tornare ai valori di .env.local?")) {
      clearLocalOverrides();
      setSettings(loadSettings());
      setSaved(true);
      onChange();
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/40 px-4 py-8 backdrop-blur-sm sm:py-12">
      <div className="enter relative w-full max-w-2xl rounded-sm border border-parchment-edge bg-parchment p-6 shadow-2xl sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-parchment-edge pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-ritual animate-pulse" />
              <p className="label !text-ritual">officina chiavi & modelli</p>
            </div>
            <h2 className="mt-1 font-display text-3xl font-light text-ink">
              Configurazione Provider AI
            </h2>
            <p className="mt-1 font-body text-xs text-ash">
              Valori base da <code className="font-mono text-ritual">.env.local</code> (file di
              progetto, sopravvive ai refresh della preview). Ciò che scrivi qui sovrascrive il
              browser corrente; svuota un campo per tornare al valore di progetto.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-parchment-edge px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ash transition-colors hover:border-ritual/60 hover:text-ritual"
          >
            chiudi
          </button>
        </div>

        {/* Status bar chiavi rilevate */}
        <div className="mt-5 flex flex-wrap items-center gap-2 rounded-sm border border-parchment-edge bg-white/40 p-3 text-xs">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fade">
            Attive ({available.length}/4):
          </span>
          <span className={`rounded px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${settings.groqKey ? "bg-ritual/15 text-ritual font-medium" : "bg-black/5 text-fade line-through"}`}>
            Groq
          </span>
          <span className={`rounded px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${settings.openrouterKey ? "bg-ritual/15 text-ritual font-medium" : "bg-black/5 text-fade line-through"}`}>
            OpenRouter
          </span>
          <span className={`rounded px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${settings.openaiKey ? "bg-ritual/15 text-ritual font-medium" : "bg-black/5 text-fade line-through"}`}>
            OpenAI
          </span>
          <span className={`rounded px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${settings.cloudflareKey && settings.cloudflareAccountId ? "bg-ritual/15 text-ritual font-medium" : "bg-black/5 text-fade line-through"}`}>
            Cloudflare
          </span>
        </div>

        {/* Schede interne */}
        <div className="mt-6 flex flex-wrap gap-1 border-b border-parchment-edge pb-px">
          <button
            type="button"
            onClick={() => setActiveTab("priority")}
            className={`border-b-2 px-3.5 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              activeTab === "priority"
                ? "border-ritual text-ritual font-medium"
                : "border-transparent text-ash hover:text-ink"
            }`}
          >
            Strategia & Priorità
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("groq")}
            className={`border-b-2 px-3.5 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              activeTab === "groq"
                ? "border-ritual text-ritual font-medium"
                : "border-transparent text-ash hover:text-ink"
            }`}
          >
            1. Groq
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("openrouter")}
            className={`border-b-2 px-3.5 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              activeTab === "openrouter"
                ? "border-ritual text-ritual font-medium"
                : "border-transparent text-ash hover:text-ink"
            }`}
          >
            2. OpenRouter
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("openai")}
            className={`border-b-2 px-3.5 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              activeTab === "openai"
                ? "border-ritual text-ritual font-medium"
                : "border-transparent text-ash hover:text-ink"
            }`}
          >
            3. OpenAI
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("cloudflare")}
            className={`border-b-2 px-3.5 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              activeTab === "cloudflare"
                ? "border-ritual text-ritual font-medium"
                : "border-transparent text-ash hover:text-ink"
            }`}
          >
            4. Cloudflare
          </button>
        </div>

        {/* Contenuto Tab */}
        <div className="mt-6 min-h-[260px] space-y-5">
          {/* TAB STRATEGIA */}
          {activeTab === "priority" && (
            <div className="space-y-4">
              <div>
                <label className="label block" htmlFor="active-provider-select">
                  Provider attivo / Ordine di priorità
                </label>
                <select
                  id="active-provider-select"
                  value={settings.activeProvider}
                  onChange={(e) => update("activeProvider", e.target.value as ProviderId | "auto")}
                  className="mt-2 w-full rounded-sm border border-parchment-edge bg-white/70 px-3 py-2 font-mono text-sm text-ink focus:border-ritual focus:outline-none"
                >
                  <option value="auto">Automatico con Fallback (Groq → OpenRouter → OpenAI → Cloudflare)</option>
                  <option value="groq" disabled={!settings.groqKey}>Forza Groq {settings.groqKey ? "✓" : "(manca chiave)"}</option>
                  <option value="openrouter" disabled={!settings.openrouterKey}>Forza OpenRouter {settings.openrouterKey ? "✓" : "(manca chiave)"}</option>
                  <option value="openai" disabled={!settings.openaiKey}>Forza OpenAI {settings.openaiKey ? "✓" : "(manca chiave)"}</option>
                  <option value="cloudflare" disabled={!settings.cloudflareKey || !settings.cloudflareAccountId}>Forza Cloudflare AI {settings.cloudflareKey && settings.cloudflareAccountId ? "✓" : "(mancano credenziali)"}</option>
                </select>
                <p className="mt-2 font-body text-[13px] leading-relaxed text-ash">
                  In modalità <strong>Automatico</strong>, se il provider primario raggiunge il rate limit (429) o fallisce, la richiesta scivola fluidamente sul fornitore successivo configurato senza interruzioni per il lettore.
                </p>
              </div>

              <div className="rounded-sm border border-parchment-edge bg-parchment-deep/40 p-4 font-body text-xs leading-relaxed text-ash">
                <p className="font-semibold text-ink">Consiglio per Render in produzione:</p>
                <p className="mt-1">
                  Puoi inserire le stesse variabili nel dashboard di Render: <code className="font-mono text-ritual">GROQ_API_KEY</code>, <code className="font-mono text-ritual">OPENROUTER_API_KEY</code>, <code className="font-mono text-ritual">OPENAI_API_KEY</code>, <code className="font-mono text-ritual">CLOUDFLARE_API_KEY</code> con <code className="font-mono text-ritual">CLOUDFLARE_ACCOUNT_ID</code>.
                </p>
              </div>
            </div>
          )}

          {/* TAB GROQ */}
          {activeTab === "groq" && (
            <div className="space-y-4">
              <div>
                <label className="label flex items-center gap-2" htmlFor="groq-key">
                  GROQ_API_KEY
                  <SourceBadge fromEnv={isFromProjectEnv("groqKey")} filled={Boolean(settings.groqKey)} />
                </label>
                <div className="mt-2 flex gap-2">
                  <input
                    id="groq-key"
                    type={showKeys.groq ? "text" : "password"}
                    value={settings.groqKey}
                    onChange={(e) => update("groqKey", e.target.value)}
                    placeholder="gsk_..."
                    autoComplete="off"
                    spellCheck={false}
                    className="min-w-0 flex-1 rounded-sm border border-parchment-edge bg-white/70 px-3 py-2 font-mono text-sm text-ink placeholder:text-fade focus:border-ritual focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShow("groq")}
                    className="rounded-sm border border-parchment-edge px-3 font-mono text-[10px] uppercase tracking-wider text-ash hover:border-ritual/60"
                  >
                    {showKeys.groq ? "nascondi" : "mostra"}
                  </button>
                </div>
              </div>
              <div>
                <label className="label block" htmlFor="groq-model">
                  GROQ_MODEL (default: openai/gpt-oss-120b)
                </label>
                <input
                  id="groq-model"
                  type="text"
                  value={settings.groqModel}
                  onChange={(e) => update("groqModel", e.target.value)}
                  placeholder="openai/gpt-oss-120b"
                  className="mt-2 w-full rounded-sm border border-parchment-edge bg-white/70 px-3 py-2 font-mono text-sm text-ink placeholder:text-fade focus:border-ritual focus:outline-none"
                />
                <p className="mt-1 font-body text-[12px] text-fade">
                  Opzioni veloci: <code className="text-ash">openai/gpt-oss-120b</code>, <code className="text-ash">qwen/qwen3.8-27b</code>, <code className="text-ash">llama-3.3-70b-versatile</code>.
                </p>
              </div>
            </div>
          )}

          {/* TAB OPENROUTER */}
          {activeTab === "openrouter" && (
            <div className="space-y-4">
              <div>
                <label className="label flex items-center gap-2" htmlFor="openrouter-key">
                  OPENROUTER_API_KEY
                  <SourceBadge fromEnv={isFromProjectEnv("openrouterKey")} filled={Boolean(settings.openrouterKey)} />
                </label>
                <div className="mt-2 flex gap-2">
                  <input
                    id="openrouter-key"
                    type={showKeys.openrouter ? "text" : "password"}
                    value={settings.openrouterKey}
                    onChange={(e) => update("openrouterKey", e.target.value)}
                    placeholder="sk-or-v1-..."
                    autoComplete="off"
                    spellCheck={false}
                    className="min-w-0 flex-1 rounded-sm border border-parchment-edge bg-white/70 px-3 py-2 font-mono text-sm text-ink placeholder:text-fade focus:border-ritual focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShow("openrouter")}
                    className="rounded-sm border border-parchment-edge px-3 font-mono text-[10px] uppercase tracking-wider text-ash hover:border-ritual/60"
                  >
                    {showKeys.openrouter ? "nascondi" : "mostra"}
                  </button>
                </div>
              </div>
              <div>
                <label className="label block" htmlFor="openrouter-model">
                  OPENROUTER_MODEL (default: qwen/qwen-2.5-72b-instruct)
                </label>
                <input
                  id="openrouter-model"
                  type="text"
                  value={settings.openrouterModel}
                  onChange={(e) => update("openrouterModel", e.target.value)}
                  placeholder="qwen/qwen-2.5-72b-instruct"
                  className="mt-2 w-full rounded-sm border border-parchment-edge bg-white/70 px-3 py-2 font-mono text-sm text-ink placeholder:text-fade focus:border-ritual focus:outline-none"
                />
                <p className="mt-1 font-body text-[12px] text-fade">
                  Modelli consigliati: <code className="text-ash">anthropic/claude-3.5-sonnet</code>, <code className="text-ash">deepseek/deepseek-chat</code>, <code className="text-ash">google/gemini-2.0-flash</code>.
                </p>
              </div>
            </div>
          )}

          {/* TAB OPENAI */}
          {activeTab === "openai" && (
            <div className="space-y-4">
              <div>
                <label className="label flex items-center gap-2" htmlFor="openai-key">
                  OPENAI_API_KEY
                  <SourceBadge fromEnv={isFromProjectEnv("openaiKey")} filled={Boolean(settings.openaiKey)} />
                </label>
                <div className="mt-2 flex gap-2">
                  <input
                    id="openai-key"
                    type={showKeys.openai ? "text" : "password"}
                    value={settings.openaiKey}
                    onChange={(e) => update("openaiKey", e.target.value)}
                    placeholder="sk-proj-..."
                    autoComplete="off"
                    spellCheck={false}
                    className="min-w-0 flex-1 rounded-sm border border-parchment-edge bg-white/70 px-3 py-2 font-mono text-sm text-ink placeholder:text-fade focus:border-ritual focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShow("openai")}
                    className="rounded-sm border border-parchment-edge px-3 font-mono text-[10px] uppercase tracking-wider text-ash hover:border-ritual/60"
                  >
                    {showKeys.openai ? "nascondi" : "mostra"}
                  </button>
                </div>
              </div>
              <div>
                <label className="label block" htmlFor="openai-model">
                  OPENAI_MODEL (default: gpt-4o)
                </label>
                <input
                  id="openai-model"
                  type="text"
                  value={settings.openaiModel}
                  onChange={(e) => update("openaiModel", e.target.value)}
                  placeholder="gpt-4o"
                  className="mt-2 w-full rounded-sm border border-parchment-edge bg-white/70 px-3 py-2 font-mono text-sm text-ink placeholder:text-fade focus:border-ritual focus:outline-none"
                />
                <p className="mt-1 font-body text-[12px] text-fade">
                  Alternative: <code className="text-ash">gpt-4o-mini</code>, <code className="text-ash">o3-mini</code>.
                </p>
              </div>
            </div>
          )}

          {/* TAB CLOUDFLARE */}
          {activeTab === "cloudflare" && (
            <div className="space-y-4">
              <div>
                <label className="label flex items-center gap-2" htmlFor="cf-key">
                  CLOUDFLARE_API_KEY (o API Token Workers AI)
                  <SourceBadge fromEnv={isFromProjectEnv("cloudflareKey")} filled={Boolean(settings.cloudflareKey)} />
                </label>
                <div className="mt-2 flex gap-2">
                  <input
                    id="cf-key"
                    type={showKeys.cloudflare ? "text" : "password"}
                    value={settings.cloudflareKey}
                    onChange={(e) => update("cloudflareKey", e.target.value)}
                    placeholder="Token API Cloudflare..."
                    autoComplete="off"
                    spellCheck={false}
                    className="min-w-0 flex-1 rounded-sm border border-parchment-edge bg-white/70 px-3 py-2 font-mono text-sm text-ink placeholder:text-fade focus:border-ritual focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShow("cloudflare")}
                    className="rounded-sm border border-parchment-edge px-3 font-mono text-[10px] uppercase tracking-wider text-ash hover:border-ritual/60"
                  >
                    {showKeys.cloudflare ? "nascondi" : "mostra"}
                  </button>
                </div>
              </div>

              <div>
                <label className="label flex items-center gap-2" htmlFor="cf-account-id">
                  CLOUDFLARE_ACCOUNT_ID
                  <SourceBadge
                    fromEnv={isFromProjectEnv("cloudflareAccountId")}
                    filled={Boolean(settings.cloudflareAccountId)}
                  />
                </label>
                <input
                  id="cf-account-id"
                  type="text"
                  value={settings.cloudflareAccountId}
                  onChange={(e) => update("cloudflareAccountId", e.target.value)}
                  placeholder="Es. 8d3a8291..."
                  spellCheck={false}
                  className="mt-2 w-full rounded-sm border border-parchment-edge bg-white/70 px-3 py-2 font-mono text-sm text-ink placeholder:text-fade focus:border-ritual focus:outline-none"
                />
              </div>

              <div>
                <label className="label block" htmlFor="cf-model">
                  CLOUDFLARE_MODEL (default: @cf/meta/llama-3.3-70b-instruct)
                </label>
                <input
                  id="cf-model"
                  type="text"
                  value={settings.cloudflareModel}
                  onChange={(e) => update("cloudflareModel", e.target.value)}
                  placeholder="@cf/meta/llama-3.3-70b-instruct"
                  className="mt-2 w-full rounded-sm border border-parchment-edge bg-white/70 px-3 py-2 font-mono text-sm text-ink placeholder:text-fade focus:border-ritual focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer azioni */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-parchment-edge pt-5">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-full bg-ritual px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-parchment transition-colors hover:bg-ritual-deep"
            >
              {saved ? "Configurazione Salvata!" : "Salva Configurazione"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full border border-parchment-edge px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ash hover:border-oxblood/50 hover:text-oxblood"
            >
              Ripristina da .env.local
            </button>
          </div>

          {canUpgrade && (
            <button
              type="button"
              onClick={() => {
                handleSave();
                onRequestRegenerate();
                onClose();
              }}
              className="rounded-full border border-ritual bg-ritual/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ritual transition-colors hover:bg-ritual hover:text-parchment"
            >
              Rigenera Oggi con AI
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
