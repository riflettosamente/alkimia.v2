import { useCallback, useEffect, useRef, useState } from "react";
import { GenerationPanel } from "./components/GenerationPanel";
import { Masthead } from "./components/Masthead";
import { Officina } from "./components/Officina";
import { Phase1 } from "./components/Phase1Grid";
import { CollisionGrid } from "./components/CollisionGrid";
import { JumpGrid } from "./components/JumpGrid";
import { FinalThrust } from "./components/FinalThrust";
import { ChoralQuestions } from "./components/ChoralQuestions";
import { EssayPlaceholder } from "./components/EssayPlaceholder";
import { TabBar } from "./components/TabBar";
import { ensureDailyDocument } from "./lib/engine";
import { getActiveProviderLabel, hasAnyKey } from "./lib/aiProviders";
import { clearDay, getStatus, readLastAiError } from "./lib/storage";
import { dayKey } from "./lib/draw";
import { TABS } from "./lib/tabs";
import type { DailyStatus, GenerationStage } from "./lib/types";

export default function App() {
  const [status, setStatus] = useState<DailyStatus>(() => getStatus());
  const [stage, setStage] = useState<GenerationStage | null>(null);
  const [tab, setTab] = useState(1);
  const [officinaOpen, setOfficinaOpen] = useState(false);
  const [, setEngineTick] = useState(0);

  const refresh = useCallback(() => {
    setStatus(getStatus());
    setEngineTick((n) => n + 1);
  }, []);

  const run = useCallback(async () => {
    setStage("research");
    try {
      await ensureDailyDocument(new Date(), async (next) => {
        setStage(next);
      });
    } catch (error) {
      console.warn("[ALKIMIA] generazione fallita:", error);
    } finally {
      setStage(null);
      refresh();
    }
  }, [refresh]);

  // Impedisce un loop infinito se la persistenza non è disponibile (es. storage
  // bloccato): il documento si genera una sola volta per sessione e, se non resta
  // salvato, resta il pulsante manuale.
  const attempted = useRef(false);

  const regenerate = useCallback(() => {
    clearDay(dayKey());
    setStage(null);
    attempted.current = false;
    setStatus(getStatus());
  }, []);

  // Una sola elaborazione per giornata: parte automaticamente finché non c'è documento.
  // Lo stato "generating" residuo (pagina chiusa a metà) viene ripreso da capo.
  useEffect(() => {
    if (
      (status.status === "pending" || status.status === "generating") &&
      stage === null &&
      !attempted.current
    ) {
      attempted.current = true;
      void run();
    }
  }, [status.status, stage, run]);

  useEffect(() => {
    const active = TABS.find((t) => t.id === tab);
    window.document.title = active ? `ALKIMIA — ${active.title}` : "ALKIMIA";
  }, [tab]);

  const dailyDoc = status.status === "complete" ? status.document : undefined;
  const ready = Boolean(dailyDoc);
  const aiConfigured = hasAnyKey();
  const providerInfo = getActiveProviderLabel();

  const engineLabel = dailyDoc ? dailyDoc.model : providerInfo.label;
  const activeTabDef = TABS.find((t) => t.id === tab);
  const activeTabTitle = activeTabDef?.title ?? "";

  const failedMessage = status.status === "failed" ? status.message : undefined;

  const rawBanner =
    ready && dailyDoc?.source === "local" && aiConfigured ? readLastAiError() : undefined;
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const banner = bannerDismissed ? undefined : rawBanner;

  function panel() {
    if (!dailyDoc) {
      return (
        <GenerationPanel
          stage={stage}
          failedMessage={failedMessage}
          hasKey={aiConfigured}
          onGenerate={() => void run()}
          onRegenerate={regenerate}
        />
      );
    }
    switch (tab) {
      case 1:
        return (
          <Phase1
            phase1={dailyDoc.phase1}
            pair={dailyDoc.pair}
            dossier={dailyDoc.dossier}
          />
        );
      case 2:
        return (
          <CollisionGrid
            phase2={dailyDoc.phase2}
            pair={dailyDoc.pair}
            highlightTerms={dailyDoc.dossier?.highlightTerms}
          />
        );
      case 3:
        return (
          <JumpGrid
            phase3={dailyDoc.phase3}
            phase2={dailyDoc.phase2}
            pair={dailyDoc.pair}
            highlightTerms={dailyDoc.dossier?.highlightTerms}
          />
        );
      case 4:
        return <FinalThrust document={dailyDoc} />;
      case 5:
        return <ChoralQuestions document={dailyDoc} />;
      default:
        return <EssayPlaceholder />;
    }
  }

  return (
    <div className="min-h-screen pb-20">
      <Masthead document={dailyDoc} onOpenOfficina={() => setOfficinaOpen(true)} />

      <TabBar active={tab} onSelect={setTab} ready={ready} />

      {/* Titolo della sezione attiva, come in TabWorkspace.tsx sorgente. */}
      {activeTabTitle ? (
        <h1 className="mt-9 px-6 text-center font-serif text-2xl leading-snug text-stone-900">
          {activeTabTitle}
        </h1>
      ) : null}

      {banner ? (
        <div className="mx-auto mt-6 flex max-w-4xl items-start gap-4 border-l-2 border-oxblood/60 bg-oxblood/5 px-5 py-4">
          <div className="min-w-0 flex-1">
            <p className="label text-oxblood">la generazione AI non è stata completata</p>
            <p className="mt-1.5 break-words font-mono text-[12px] leading-relaxed text-ash">
              {banner}
            </p>
            <p className="mt-2 font-body text-[13.5px] italic leading-relaxed text-ash">
              Il documento visualizzato proviene dal motore locale di riserva. Apri
              l&apos;officina per verificare le chiavi API o provare un altro fornitore (Groq, OpenRouter, OpenAI, Cloudflare).
            </p>
          </div>
          <button
            type="button"
            onClick={() => setBannerDismissed(true)}
            className="shrink-0 rounded-full border border-oxblood/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-oxblood hover:bg-oxblood/10"
          >
            ho capito
          </button>
        </div>
      ) : null}

      <main className="flex w-full flex-col items-center pt-6">
        {ready ? <div key={tab} className="w-full">{panel()}</div> : panel()}
      </main>

      <footer className="mx-auto mt-20 max-w-5xl px-5 sm:px-8">
        <div className="rule mb-5" />
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="label">alkimia · {status.dayKey} · fuso europe/rome</p>
          <p className="text-[13px] italic text-stone-500">
            due argomenti, sei fasi, un solo saggio al giorno · motore: {engineLabel}
          </p>
          {ready ? (
            <button
              type="button"
              onClick={regenerate}
              className="rounded-full border border-parchment-edge px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ash transition-colors hover:border-oxblood/50 hover:text-oxblood"
            >
              rigenera il documento
            </button>
          ) : null}
        </div>
      </footer>

      <Officina
        open={officinaOpen}
        onClose={() => setOfficinaOpen(false)}
        onChange={refresh}
        onRequestRegenerate={regenerate}
      />
    </div>
  );
}
