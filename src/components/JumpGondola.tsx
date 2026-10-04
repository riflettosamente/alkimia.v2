import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  GitCompare,
  Sparkles,
} from "lucide-react";
import { SemanticText, semanticTerms } from "./SemanticText";
import {
  SOGLIA_CRITERIA,
  type ConfrontationOutcome,
  type DayJumpLoop,
  type JumpCard,
} from "../lib/phase3";

function OutcomeBadge({ outcome }: { outcome: ConfrontationOutcome }) {
  switch (outcome) {
    case "contrappunto":
      return (
        <span className="rounded-full border border-amber-300/60 bg-amber-100/90 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-amber-950">
          contrappunto dialettico
        </span>
      );
    case "complemento":
      return (
        <span className="rounded-full border border-emerald-300/60 bg-emerald-100/90 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-emerald-950">
          complemento organico
        </span>
      );
    case "incompatibilita":
      return (
        <span className="rounded-full border border-rose-300/60 bg-rose-100/90 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-rose-950">
          tensione incompatibile
        </span>
      );
    case "unica":
      return (
        <span className="rounded-full bg-stone-100 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-stone-800">
          unica sopravvissuta
        </span>
      );
    case "nessuna":
      return (
        <span className="rounded-full bg-stone-100 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-stone-600">
          salto non guadagnato
        </span>
      );
  }
}

function JumpEssayDetail({
  card,
  terms,
}: {
  card: JumpCard;
  terms: readonly string[];
}) {
  return (
    <article className="space-y-6 py-6">
      <header className="border-b border-stone-200 pb-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-800">
          {card.operatorTitle}
          <span className="mx-2 text-stone-300">·</span>
          <span className="text-stone-500">{card.domain}</span>
          <span className="mx-2 text-stone-300">·</span>
          <span className={card.genealogyMode === "genealogia" ? "text-stone-600" : "italic text-amber-800"}>
            {card.genealogyMode === "genealogia" ? "con genealogia" : "terra incognita"}
          </span>
        </p>
        <h2 className="mt-2 font-serif text-2xl font-medium leading-tight text-stone-950 md:text-3xl">
          {card.sparkTitle}
        </h2>
        <p className="mt-2 text-[11px] italic text-stone-500">
          {card.genealogyMode === "genealogia"
            ? "Ricerca ereditata: "
            : "Ricerca proposta: "}
          <strong className="font-semibold text-stone-800">
            {card.researchName}
          </strong>
        </p>
      </header>
      <div className="space-y-5 font-serif text-base leading-[1.8] text-stone-800">
        <p>
          <SemanticText text={card.hypothesisPassage} terms={terms} />
        </p>
        <p>
          <SemanticText text={card.genealogyPassage} terms={terms} />
        </p>
        <p>
          <SemanticText text={card.manifestationPassage} terms={terms} />
        </p>
        <p className="border-l border-amber-800/40 py-0.5 pl-4 italic text-stone-700">
          <SemanticText text={card.falsificationPassage} terms={terms} />
        </p>
      </div>
    </article>
  );
}

export function JumpGondola({
  loop,
  highlightTerms = [],
}: {
  loop: DayJumpLoop;
  highlightTerms?: readonly string[];
}) {
  const [selectedIntuitionIndex, setSelectedIntuitionIndex] = useState(0);
  const [showConfrontation, setShowConfrontation] = useState(false);
  const openCount = loop.openIntuitions.length;
  const currentCard =
    loop.openIntuitions[selectedIntuitionIndex] ?? loop.openIntuitions[0];
  const openIds = new Set(loop.openIntuitions.map((card) => card.id));
  const terms = semanticTerms(
    loop.semanticContract.concepts,
    loop.candidates.map((card) => card.researchName),
    highlightTerms,
  );

  function selectJump(index: number) {
    setSelectedIntuitionIndex(index);
    setShowConfrontation(false);
  }

  function goForward() {
    if (selectedIntuitionIndex < openCount - 1) {
      setSelectedIntuitionIndex((index) => index + 1);
      return;
    }
    setShowConfrontation(true);
  }

  function returnToLastJump() {
    setSelectedIntuitionIndex(Math.max(openCount - 1, 0));
    setShowConfrontation(false);
  }

  return (
    <div className="mt-8 w-full max-w-3xl">
      <header className="mx-auto max-w-2xl border-b border-stone-300 pb-8 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-800">
          il ponte sovrano della fase 2
        </p>
        <h2 className="mt-2 font-serif text-2xl font-normal text-stone-900 md:text-3xl">
          «{loop.sovereignBridgeTitle}»
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-stone-700">
          {loop.sovereignBridgeBody}
        </p>
      </header>

      {/* Una sola linea: Salti ordinali e vista conclusiva. */}
      <nav
        className="mt-8 flex flex-wrap items-center gap-2 border-b border-stone-200 pb-3"
        aria-label="Navigazione interna della FASE 3"
      >
        {loop.openIntuitions.map((card, index) => {
          const selected = !showConfrontation && index === selectedIntuitionIndex;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => selectJump(index)}
              aria-pressed={selected}
              aria-label={`Salto ${index + 1}: ${card.sparkTitle}`}
              className={`min-w-24 rounded-full border px-4 py-1.5 text-center font-serif text-xs transition-colors ${
                selected
                  ? "border-amber-800 bg-amber-800 text-amber-50 shadow-sm"
                  : "border-stone-300 bg-white/60 text-stone-700 hover:border-amber-700/60"
              }`}
            >
              Salto {index + 1}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setShowConfrontation(true)}
          aria-pressed={showConfrontation}
          className={`rounded-full border px-4 py-1.5 text-center font-serif text-xs transition-colors ${
            showConfrontation
              ? "border-amber-800 bg-amber-800 text-amber-50 shadow-sm"
              : "border-stone-300 bg-white/60 text-stone-700 hover:border-amber-700/60"
          }`}
        >
          Soglia e Confronto
        </button>
      </nav>

      {!showConfrontation && currentCard ? (
        <div className="space-y-6">
          <JumpEssayDetail card={currentCard} terms={terms} />
          <div className="flex items-center justify-between gap-4 border-t border-stone-200 pt-4">
            <button
              type="button"
              disabled={selectedIntuitionIndex === 0}
              onClick={() => setSelectedIntuitionIndex((index) => index - 1)}
              className="flex items-center gap-2 rounded-full border border-stone-300 bg-white/60 px-4 py-2 text-xs text-stone-700 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              salto precedente
            </button>
            <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400">
              {selectedIntuitionIndex + 1} / {openCount}
            </p>
            <button
              type="button"
              onClick={goForward}
              className="flex items-center gap-2 rounded-full border border-amber-800 bg-amber-800 px-4 py-2 text-xs text-amber-50"
            >
              {selectedIntuitionIndex === openCount - 1
                ? "Soglia e Confronto"
                : "prossimo salto"}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
        </div>
      ) : null}

      {showConfrontation ? (
        <div className="mt-8 space-y-12">
          <section className="space-y-4">
            <header className="border-b border-stone-200 pb-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-800">
                il filtro di dignità epistemica
              </p>
              <h3 className="mt-1 font-serif text-2xl font-normal text-stone-900">
                La Soglia dei Cinque Operatori
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-600">
                I cinque operatori hanno generato cinque salti candidati. La
                Soglia ammette alla costellazione soltanto chi supera tutti e
                tre i criteri: la derivazione dal Ponte, una falsificazione
                praticabile e, soprattutto, un campo diverso da quelli già
                ammessi — così la costellazione non degenera in quattro varianti
                della stessa ipotesi.
              </p>
              <dl className="mt-3 grid gap-1.5">
                {SOGLIA_CRITERIA.map((criterion) => (
                  <div key={criterion.id} className="flex gap-2 text-xs">
                    <dt className="shrink-0 font-semibold uppercase tracking-[0.12em] text-amber-800">
                      {criterion.label}
                    </dt>
                    <dd className="text-stone-600">{criterion.gloss}</dd>
                  </div>
                ))}
              </dl>
            </header>
            <ol className="divide-y divide-stone-200 text-xs">
              {loop.candidates.map((card) => {
                const admitted = openIds.has(card.id);
                return (
                  <li key={card.id} className="space-y-1.5 py-3.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-serif text-sm font-medium text-stone-900">
                        <span className="mr-2 font-sans text-[10px] font-semibold text-amber-800">
                          {card.id}.
                        </span>
                        {card.sparkTitle}
                      </span>
                      <span
                        className={`text-[9px] font-semibold uppercase tracking-[0.14em] ${
                          admitted ? "text-emerald-800" : "text-rose-800"
                        }`}
                      >
                        {admitted
                          ? "ammesso · costellazione attiva"
                          : "sospeso"}
                      </span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-stone-500">
                      <span className="font-semibold text-stone-700">
                        {card.operatorTitle}
                      </span>{" "}
                      · campo{" "}
                      <span className="font-semibold text-stone-700">
                        {card.domain}
                      </span>{" "}
                      ·{" "}
                      <span className={card.genealogyMode === "genealogia" ? "text-stone-600" : "italic text-amber-800 font-semibold"}>
                        {card.genealogyMode === "genealogia" ? "con genealogia" : "terra incognita"}
                      </span>{" "}
                      ·{" "}
                      <span className="font-semibold text-amber-800">
                        {card.researchName}
                      </span>
                    </p>
                    {!admitted && card.rejectionReason ? (
                      <p className="border-l-2 border-rose-300 pl-3 text-[11px] italic leading-relaxed text-stone-500">
                        {card.rejectionReason}
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </section>
          <section className="space-y-4 border-t border-stone-300 pt-10">
            <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-stone-200 pb-3">
              <div>
                <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-800">
                  <GitCompare className="h-4 w-4 text-amber-700" aria-hidden />
                  la relazione tra i sopravvissuti
                </p>
                <h3 className="mt-1 font-serif text-2xl font-normal text-stone-950">
                  {loop.confrontation.outcomeLabel}
                </h3>
              </div>
              <OutcomeBadge outcome={loop.confrontation.outcome} />
            </header>
            <div className="pt-1 font-serif text-base leading-[1.8] text-stone-800">
              <p>
                <SemanticText text={loop.confrontation.analysis} terms={terms} />
              </p>
            </div>
            {loop.confrontation.emergentSynthesis ? (
              <div className="mt-4 space-y-1 border-l-2 border-amber-700 py-1 pl-4">
                <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-900">
                  <Sparkles className="h-3.5 w-3.5 text-amber-700" aria-hidden />
                  sintesi emergente
                </p>
                <p className="font-serif text-base italic leading-relaxed text-stone-900">
                  <SemanticText
                    text={loop.confrontation.emergentSynthesis}
                    terms={terms}
                  />
                </p>
              </div>
            ) : null}
          </section>
          <section className="space-y-3 border-t border-stone-300 pt-10">
            <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-800">
              <Compass className="h-4 w-4 text-amber-700" aria-hidden />
              l&apos;agenda di esplorazione · ordine di marcia
            </p>
            <p className="font-serif text-sm leading-[1.8] text-stone-800">
              <SemanticText
                text={loop.confrontation.explorationAgenda}
                terms={terms}
              />
            </p>
          </section>
          <div className="border-t border-stone-200 pt-4">
            <button
              type="button"
              onClick={returnToLastJump}
              className="flex items-center gap-2 rounded-full border border-stone-300 bg-white/60 px-4 py-2 text-xs text-stone-700 hover:border-amber-700/60"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              torna al Salto {openCount}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
