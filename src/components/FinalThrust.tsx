import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SemanticText, semanticTerms } from "./SemanticText";
import { JUMP_OPERATORS } from "../lib/phase3";
import type { DailyDocument } from "../lib/types";
import type { Phase4Output, Phase3Output, JumpCardOutput } from "../lib/schemas";

type ExplorationHorizon = "ora" | "poi" | "frontiera";
type HypothesisConsequence = Phase4Output["hypothesisConsequences"][number];

const HORIZON_LABEL: Record<ExplorationHorizon, string> = {
  ora: "Ora",
  poi: "Poi",
  frontiera: "Alla frontiera",
};

function StradaDetail({
  strada,
  total,
  terms,
}: {
  strada: HypothesisConsequence;
  total: number;
  terms: readonly string[];
}) {
  return (
    <article className="space-y-6 py-6">
      <header className="border-b border-stone-200 pb-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.27em] text-amber-800">
          strada {strada.rank} di {total} · {HORIZON_LABEL[strada.horizon as ExplorationHorizon]}
        </p>
        <h2 className="mt-2 font-serif text-2xl font-medium leading-tight text-stone-950 md:text-3xl">
          {strada.jumpTitle}
        </h2>
      </header>
      <div className="space-y-5 font-serif text-base leading-[1.8] text-stone-800">
        <p>
          <SemanticText text={strada.outcomePassage} terms={terms} />
        </p>
        <p>
          <SemanticText text={strada.criticalPassage} terms={terms} />
        </p>
        <p>
          <SemanticText text={strada.movementPassage} terms={terms} />
        </p>
      </div>
    </article>
  );
}

/**
 * FASE 4: Le Conseguenze.
 * Gondola a strada singola con vista conclusiva per l'Epilogo.
 * Adattato per Vite dal FinalThrust.tsx del repository sorgente.
 */
export function FinalThrust({ document }: { document: DailyDocument }) {
  const thrust = document.phase4;
  const strade = [...thrust.hypothesisConsequences].sort(
    (a, b) => a.rank - b.rank,
  ) as readonly HypothesisConsequence[];
  const first = strade[0];
  const last = strade[strade.length - 1];
  const total = strade.length;

  // phase3.candidates del loop costruito da buildJumpLoop: cinque JumpCard
  // con researchName (richiesti da semanticTerms, come nel sorgente).
  const candidates = JUMP_OPERATORS.map(
    (op) => document.phase3[op.key as keyof Phase3Output] as JumpCardOutput,
  );
  const terms = semanticTerms(
    document.phase2.semanticContract.concepts,
    candidates.map((card) => card.researchName),
    document.dossier?.highlightTerms,
  );

  const [selectedStradaIndex, setSelectedStradaIndex] = useState(0);
  const [showEpilogue, setShowEpilogue] = useState(false);
  const currentStrada = strade[selectedStradaIndex] ?? strade[0];

  function selectStrada(index: number) {
    setSelectedStradaIndex(index);
    setShowEpilogue(false);
  }

  function goForward() {
    if (selectedStradaIndex < total - 1) {
      setSelectedStradaIndex((index) => index + 1);
      return;
    }
    setShowEpilogue(true);
  }

  function returnToLastStrada() {
    setSelectedStradaIndex(Math.max(total - 1, 0));
    setShowEpilogue(false);
  }

  return (
    <section className="mx-auto mt-10 w-full max-w-3xl px-5 sm:px-6">
      {/* Ingresso fisso: la costellazione e l'ordine di marcia */}
      <header className="mx-auto max-w-2xl border-b border-stone-300 pb-8 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-800">
          la costellazione e le sue conseguenze
        </p>
        <p className="mt-4 text-sm leading-relaxed text-stone-700">
          <SemanticText text={thrust.constellationSummary} terms={terms} />
        </p>
        <p className="mt-4 font-serif text-sm italic leading-relaxed text-stone-500">
          L&apos;ordine di marcia parte da {first?.jumpTitle}
          {last && first !== last ? ` e procede fino a ${last.jumpTitle}.` : "."}
        </p>
      </header>

      {/* Navigazione su una sola linea: Strada 1...N + Epilogo */}
      <nav
        className="mt-8 flex flex-wrap items-center gap-2 border-b border-stone-200 pb-3"
        aria-label="Navigazione interna della FASE 4"
      >
        {strade.map((strada, index) => {
          const selected = !showEpilogue && index === selectedStradaIndex;
          return (
            <button
              key={strada.jumpId}
              type="button"
              onClick={() => selectStrada(index)}
              aria-pressed={selected}
              aria-label={`Strada ${strada.rank}: ${strada.jumpTitle}`}
              className={`min-w-24 rounded-full border px-4 py-1.5 text-center font-serif text-xs transition-colors ${
                selected
                  ? "border-amber-800 bg-amber-800 text-amber-50 shadow-sm"
                  : "border-stone-300 bg-white/60 text-stone-700 hover:border-amber-700/60"
              }`}
            >
              Strada {strada.rank}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setShowEpilogue(true)}
          aria-pressed={showEpilogue}
          className={`rounded-full border px-4 py-1.5 text-center font-serif text-xs transition-colors ${
            showEpilogue
              ? "border-amber-800 bg-amber-800 text-amber-50 shadow-sm"
              : "border-stone-300 bg-white/60 text-stone-700 hover:border-amber-700/60"
          }`}
        >
          Epilogo
        </button>
      </nav>

      {/* VISTA 1: LA STRADA CORRENTE */}
      {!showEpilogue && currentStrada ? (
        <div className="space-y-6">
          <StradaDetail strada={currentStrada} total={total} terms={terms} />
          <div className="flex items-center justify-between gap-4 border-t border-stone-200 pt-4">
            <button
              type="button"
              disabled={selectedStradaIndex === 0}
              onClick={() => setSelectedStradaIndex((index) => index - 1)}
              className="flex items-center gap-2 rounded-full border border-stone-300 bg-white/60 px-4 py-2 text-xs text-stone-700 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              strada precedente
            </button>
            <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400">
              {selectedStradaIndex + 1} / {total}
            </p>
            <button
              type="button"
              onClick={goForward}
              className="flex items-center gap-2 rounded-full border border-amber-800 bg-amber-800 px-4 py-2 text-xs text-amber-50"
            >
              {selectedStradaIndex === total - 1
                ? "Epilogo"
                : "prossima strada"}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
        </div>
      ) : null}

      {/* VISTA 2: L'EPILOGO */}
      {showEpilogue ? (
        <div className="mt-8 space-y-8 py-2">
          <header className="border-b border-stone-200 pb-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-800">
              l&apos;epilogo provvisorio
            </p>
            <h2 className="mt-2 font-serif text-2xl font-normal leading-tight text-stone-950 md:text-3xl">
              {thrust.epilogue.title}
            </h2>
          </header>
          <div className="space-y-6 font-serif text-base leading-[1.8] text-stone-800">
            {thrust.epilogue.passages.map((passage, index) => (
              <p key={index}>
                <SemanticText text={passage} terms={terms} />
              </p>
            ))}
          </div>
          <div className="border-t border-stone-300 pt-6">
            <p className="font-serif text-base italic leading-[1.8] text-stone-600">
              <SemanticText
                text={thrust.epilogue.narrativePromise}
                terms={terms}
              />
            </p>
          </div>
          <div className="border-t border-stone-200 pt-4">
            <button
              type="button"
              onClick={returnToLastStrada}
              className="flex items-center gap-2 rounded-full border border-stone-300 bg-white/60 px-4 py-2 text-xs text-stone-700 hover:border-amber-700/60"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              torna alla Strada {total}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
