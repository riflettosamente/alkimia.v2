import { LENSES } from "../lib/grid";
import { TOPICS } from "../lib/topics";
import type { Phase1Output } from "../lib/schemas";
import { SemanticText, semanticTerms } from "./SemanticText";
import type { ResearchDossier } from "../lib/web-research";

type Vector = {
  key: "a" | "b";
  order: string;
  name: string;
  title: string;
};

/** Campo di risposta corrispondente all'id della lente. */
const FIELD: Record<string, keyof Phase1Output> = {
  "when-where": "whenWhere",
  what: "what",
  how: "how",
  who: "who",
  "which-boundary": "whichBoundary",
  "why-veiled": "whyVeiled",
};

/**
 * FASE 1 — La Scomposizione.
 * Struttura e classi identiche ad AnalyticalGrid.tsx del repository sorgente.
 */
export function Phase1({
  phase1,
  pair,
  dossier,
}: {
  phase1: Phase1Output;
  pair: [number, number];
  dossier?: ResearchDossier;
}) {
  const terms = semanticTerms([], [], dossier?.highlightTerms);
  const vectors: Vector[] = [
    { key: "a", order: "ARGOMENTO I", name: "VETTORE A", title: TOPICS[pair[0]].title },
    { key: "b", order: "ARGOMENTO II", name: "VETTORE B", title: TOPICS[pair[1]].title },
  ];

  return (
    <section className="mx-auto mt-8 w-full max-w-5xl px-5 sm:px-0">
      <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-stone-600">
        Una griglia analitica a due argomenti distinti per estrarre la loro
        infrastruttura oggettiva, il contesto e la risonanza esistenziale.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-stone-300 shadow-[0_10px_40px_rgba(120,84,30,0.08)]">
        <div className="grid gap-px bg-stone-200">
          <div className="grid gap-px md:grid-cols-2">
            {vectors.map((v) => (
              <div key={v.key} className="bg-amber-50/70 px-5 py-4 md:px-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-amber-800">
                  {v.order} <span className="text-stone-400">({v.name})</span>
                </p>
                <h3 className="mt-2 font-serif text-xl leading-snug text-stone-900">
                  {v.title}
                </h3>
              </div>
            ))}
          </div>

          {LENSES.map((lens) => {
            const Icon = lens.icon;
            const captionBg = lens.veiled ? "bg-amber-50/80" : "bg-stone-100/70";
            const cellBg = lens.veiled ? "bg-amber-50/50" : "bg-white/60";
            const field = FIELD[lens.id];

            return (
              <div key={lens.id}>
                <div className={`${captionBg} px-5 py-4 md:px-6`}>
                  <p className="flex items-center gap-2 font-serif text-sm uppercase tracking-[0.18em] text-stone-900">
                    <Icon
                      className={`h-4 w-4 ${lens.veiled ? "text-amber-700" : "text-stone-400"}`}
                      aria-hidden
                    />
                    {lens.label}
                  </p>
                  <p className="mt-1 text-xs italic text-amber-800/80">{lens.subtitle}</p>
                  <p className="mt-2 text-sm italic leading-relaxed text-stone-600">
                    <span className="text-[10px] uppercase not-italic tracking-[0.25em] text-stone-400">
                      {lens.questionLabel}:{" "}
                    </span>
                    {lens.question}
                  </p>
                  {lens.purpose ? (
                    <p className="mt-1 text-xs leading-relaxed text-stone-400">
                      <span className="text-[10px] uppercase tracking-[0.25em]">
                        A cosa serve:{" "}
                      </span>
                      {lens.purpose}
                    </p>
                  ) : null}
                </div>

                <div className="grid gap-px bg-stone-200 md:grid-cols-2">
                  {vectors.map((v) => (
                    <div key={v.key} className={`${cellBg} px-5 py-5 md:px-6`}>
                      <p className="text-[9px] uppercase tracking-[0.3em] text-stone-400">
                        {v.name}
                      </p>
                      <p className="mt-2 font-serif text-sm leading-relaxed text-stone-700">
                        <SemanticText
                          text={field ? phase1[field][v.key] : "—"}
                          terms={terms}
                        />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-center text-xs leading-relaxed text-stone-500">
        Il Vettore A è il primo argomento estratto, il Vettore B il secondo:
        invertire l&apos;ordine della coppia cambia il saggio.
      </p>
    </section>
  );
}
