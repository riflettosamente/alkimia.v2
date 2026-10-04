import { useEffect, useState } from "react";
import { STAGE_MESSAGES } from "../lib/types";
import type { GenerationStage, JobState } from "../lib/types";
import { readJob } from "../lib/storage";

type Props = {
  stage: GenerationStage | null;
  failedMessage?: string;
  hasKey: boolean;
  onGenerate: () => void;
  onRegenerate: () => void;
};

const ORDER: GenerationStage[] = ["research", "phase1", "phase2", "phase3", "phase4", "saving"];

export function GenerationPanel({
  stage,
  failedMessage,
  hasKey,
  onGenerate,
  onRegenerate,
}: Props) {
  const [job, setJob] = useState<JobState | undefined>(() => readJob());
  const running = Boolean(stage) || job?.status === "generating";
  const jobFailedMessage = job?.status === "failed" ? job.message : undefined;
  const message = failedMessage ?? jobFailedMessage;
  const failed = Boolean(message) || job?.status === "failed";
  const currentStage = stage ?? (job?.status === "generating" ? job.stage : null);

  useEffect(() => {
    const id = window.setInterval(() => setJob(readJob()), 1500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="enter mx-auto w-full max-w-3xl px-5 py-14 sm:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-stone-300 bg-white/60 px-6 py-12 text-center shadow-[0_10px_40px_rgba(120,84,30,0.08)] sm:px-14">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ritual/50 to-transparent" />

        <p className="label">edizione del giorno</p>

        <h2 className="mt-4 font-display text-3xl font-light text-ink sm:text-4xl">
          {failed ? "Elaborazione non completata" : running ? "Redazione in corso" : "Pronto per l'elaborazione"}
        </h2>

        <p className="mx-auto mt-4 max-w-xl font-body text-[15px] leading-relaxed text-ash">
          {failed && message
            ? message
            : running
              ? STAGE_MESSAGES[currentStage ?? "research"]
              : hasKey
                ? "Il protocollo a sei fasi verrà eseguito con il fornitore AI selezionato (Groq, OpenRouter, OpenAI o Cloudflare). La coppia è estratta una sola volta e il risultato resta valido per tutta la giornata solare."
                : "Nessuna chiave API configurata: verrà usato il motore locale di riserva, che produce il documento completo senza chiamate di rete."}
        </p>

        {running ? (
          <ol className="mx-auto mt-9 max-w-md space-y-1.5 text-left">
            {ORDER.map((s, i) => {
              const currentIndex = ORDER.indexOf(currentStage ?? "research");
              const done = currentStage !== null && i < currentIndex;
              const current = s === currentStage;
              return (
                <li
                  key={s}
                  className={`flex items-start gap-3 font-mono text-[11px] leading-relaxed ${
                    current ? "text-ritual" : done ? "text-ash" : "text-fade/70"
                  }`}
                >
                  <span className="mt-[3px] w-4 shrink-0 text-right">
                    {done ? "✓" : current ? "▸" : "·"}
                  </span>
                  <span className="tracking-[0.06em]">{STAGE_MESSAGES[s]}</span>
                </li>
              );
            })}
          </ol>
        ) : null}

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          {failed ? (
            <button
              type="button"
              onClick={onRegenerate}
              className="rounded-full bg-ritual px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-parchment transition-colors hover:bg-ritual-deep"
            >
              riprova
            </button>
          ) : running ? (
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-fade">
              un solo documento per oggi
            </span>
          ) : (
            <button
              type="button"
              onClick={onGenerate}
              className="rounded-full bg-ritual px-7 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-parchment transition-colors hover:bg-ritual-deep"
            >
              avvia l'elaborazione
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
