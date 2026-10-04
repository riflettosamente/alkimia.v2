import { useState } from "react";
import { ArrowLeft, ArrowRight, Compass } from "lucide-react";
import { SemanticText, semanticTerms } from "./SemanticText";
import type {
  CandidateRole,
  CollisionRound,
  DayCollisionLoop,
  Score,
} from "../lib/phase2";

export type GondolaVector = {
  key: "a" | "b";
  order: string;
  name: string;
  title: string;
};

const SCORE_LABELS: readonly [keyof Score, string][] = [
  ["surprise", "Sorpresa"],
  ["specificity", "Specificità"],
  ["significance", "Significanza"],
  ["anchorage", "Ancoraggio"],
];

function RoleBadge({ role }: { role: CandidateRole }) {
  switch (role) {
    case "sovereign":
      return (
        <span className="rounded-full bg-amber-200/90 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-amber-950">
          ponte sovrano
        </span>
      );
    case "pillar":
      return (
        <span className="rounded-full bg-stone-200/90 px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-stone-800">
          pilastro portante
        </span>
      );
    case "counterpoint":
      return (
        <span className="rounded-full bg-amber-100/90 px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-amber-800">
          contrappunto dialettico
        </span>
      );
    case "rejected":
      return (
        <span className="rounded-full bg-rose-100 px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-rose-800">
          non guadagnata
        </span>
      );
  }
}

export function ScoreDots({ score }: { score: Score }) {
  return (
    <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
      {SCORE_LABELS.map(([key, label]) => (
        <div key={key} className="flex items-center justify-between gap-3">
          <span className="text-[9px] uppercase tracking-[0.18em] text-stone-400">
            {label}
          </span>
          <span className="flex gap-1" aria-label={`${label}: ${score[key]} su 5`}>
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                className={`h-1.5 w-1.5 rounded-full ${
                  n <= score[key] ? "bg-amber-600" : "bg-stone-300"
                }`}
              />
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

export function DistillationCard({
  round,
  active,
  compact = false,
  onSelect,
}: {
  round: CollisionRound;
  active: boolean;
  compact?: boolean;
  onSelect: () => void;
}) {
  const tribunal = Boolean(round.tribunal);
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`w-full rounded-xl border text-left transition-colors ${
        compact ? "min-w-56 px-4 py-3" : "px-4 py-4"
      } ${
        active
          ? "border-amber-700 bg-amber-50"
          : "border-stone-200 bg-white/55 hover:border-amber-700/40"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-[9px] uppercase tracking-[0.22em] text-amber-700">
          {tribunal ? "Tribunale · Ponte Sovrano" : `Angolo ${round.id} di 5`}
        </p>
        <RoleBadge role={round.distillate.role} />
      </div>
      <p className="mt-2 font-serif text-sm font-medium leading-snug text-stone-900">
        {round.distillate.title}
      </p>
    </button>
  );
}

function DiscoveryEssayDetail({
  round,
  terms,
}: {
  round: CollisionRound;
  terms: readonly string[];
}) {
  const content = round.discovery;
  if (!content) return null;
  return (
    <div className="py-6 space-y-5 font-serif text-base leading-[1.8] text-stone-800">
      <p>
        <SemanticText text={content.collisionPassage} terms={terms} />
      </p>
      <p>
        <SemanticText text={content.anchoragePassage} terms={terms} />
      </p>
      <p className="text-stone-700 italic border-l border-amber-800/40 pl-4 py-0.5">
        <SemanticText text={content.significancePassage} terms={terms} />
      </p>
    </div>
  );
}

function AdversarialTribunal({
  round,
  terms,
}: {
  round: CollisionRound;
  terms: readonly string[];
}) {
  const candidates = round.tribunal ?? [];
  return (
    <div className="space-y-12">
      {/* ATTO I — L'Imputazione Critica */}
      <section className="space-y-6 pt-2">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-900 font-serif text-sm text-amber-100">
            I
          </span>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-800 font-semibold">
              atto primo
            </p>
            <h3 className="mt-1 font-serif text-2xl text-stone-900 font-normal">
              L&apos;Imputazione · Il test del fuoco critico
            </h3>
            <p className="mt-2 max-w-2xl text-xs leading-relaxed text-stone-600">
              Ciascuna delle 5 collisioni viene sottoposta all&apos;obiezione più
              spietata per bruciare ogni retorica e isolare la verità essenziale.
            </p>
          </div>
        </div>
        <div className="space-y-4 pt-2">
          {candidates.map((candidate) => (
            <article
              key={candidate.n}
              className="rounded-2xl border border-stone-300 bg-white/80 p-5 md:p-6 shadow-sm space-y-3"
            >
              <header className="flex flex-wrap items-baseline justify-between gap-2 border-b border-stone-200 pb-2.5">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-amber-800 font-semibold">
                    scintilla {candidate.n} · {candidate.angleTitle}
                  </p>
                  <h4 className="mt-1 font-serif text-lg font-medium text-stone-950">
                    {candidate.title}
                  </h4>
                </div>
                <RoleBadge role={candidate.role} />
              </header>
              <div className="space-y-3 text-xs leading-relaxed text-stone-700">
                <p>
                  <strong className="font-sans text-[9px] uppercase tracking-[0.2em] text-stone-500 mr-1.5 font-semibold">
                    La collisione —
                  </strong>
                  <SemanticText text={candidate.claim} terms={terms} />
                </p>
                <p>
                  <strong className="font-sans text-[9px] uppercase tracking-[0.2em] text-amber-900 mr-1.5 font-semibold">
                    L&apos;obiezione —
                  </strong>
                  <SemanticText text={candidate.objection} terms={terms} />
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      {/* ATTO II — La Potatura e i Pilastri del Saggio */}
      <section className="border-t border-stone-300 pt-10 space-y-6">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-800 font-serif text-sm text-amber-50">
            II
          </span>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-800 font-semibold">
              atto secondo
            </p>
            <h3 className="mt-1 font-serif text-2xl text-stone-900 font-normal">
              La Potatura · I pilastri del futuro saggio
            </h3>
            <p className="mt-2 max-w-2xl text-xs leading-relaxed text-stone-600">
              Superato il fuoco critico, ciò che sopravvive assume una funzione
              architetturale precisa nei capitoli del futuro saggio.
            </p>
          </div>
        </div>
        <ol className="divide-y divide-stone-200 border-t border-stone-200 pt-2">
          {candidates.map((candidate) => (
            <li key={candidate.n} className="py-4 space-y-1.5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-serif font-medium text-base text-stone-900">
                  <span className="font-sans text-[10px] font-semibold text-amber-800 mr-2">
                    {candidate.n}.
                  </span>
                  {candidate.pillarName}
                </span>
                <RoleBadge role={candidate.role} />
              </div>
              <p className="font-serif italic text-xs leading-relaxed text-stone-700">
                <SemanticText text={candidate.survives} terms={terms} />
              </p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-stone-400">
                {candidate.chapter}
              </p>
            </li>
          ))}
        </ol>
      </section>
      {/* ATTO III — Il Ponte Sovrano della FASE 2 */}
      <section className="border-t border-stone-400 pt-10 space-y-6">
        <header className="text-center space-y-2">
          <p className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.35em] text-amber-800 font-semibold">
            <Compass className="h-4 w-4 text-amber-700" aria-hidden />
            atto terzo · il ponte sovrano della fase 2
          </p>
          <div className="flex justify-center pt-1">
            <RoleBadge role="sovereign" />
          </div>
          <h2 className="mt-3 font-serif text-3xl font-normal leading-tight text-stone-950">
            {round.distillate.title}
          </h2>
        </header>
        <div className="mx-auto max-w-2xl space-y-5 font-serif text-base leading-[1.8] text-stone-800 pt-2">
          <p>
            <SemanticText text={round.distillate.body} terms={terms} />
          </p>
        </div>
        {round.distillate.emergentField ? (
          <div className="mx-auto max-w-2xl rounded-2xl border border-amber-800/30 bg-amber-100/40 p-6 space-y-4 text-left">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-900">
                il campo emergente (la terza via · c)
              </p>
              <h3 className="mt-1 font-serif text-2xl text-stone-950 font-normal">
                {round.distillate.emergentField.fieldName}
              </h3>
            </div>
            <div className="space-y-3 text-xs leading-relaxed text-stone-800 font-serif">
              <p>
                <strong className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-950 block not-italic">
                  Domanda fondativa di C:
                </strong>
                {round.distillate.emergentField.foundationalQuestion}
              </p>
              <p>
                <strong className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-950 block not-italic">
                  Oggetto inedito:
                </strong>
                {round.distillate.emergentField.newObject}
              </p>
              <p>
                <strong className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-950 block not-italic">
                  Metodo ibrido:
                </strong>
                {round.distillate.emergentField.hybridMethod}
              </p>
            </div>
          </div>
        ) : null}
        {round.distillate.redThread ? (
          <div className="mx-auto max-w-2xl border-t border-stone-300 pt-6 text-left">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-800 mb-2">
              il filo rosso per il saggio
            </p>
            <p className="font-serif text-base italic leading-relaxed text-stone-700">
              «<SemanticText text={round.distillate.redThread} terms={terms} />»
            </p>
          </div>
        ) : null}
        <p className="mx-auto max-w-2xl border-t border-stone-200 pt-4 text-xs italic text-stone-500 leading-relaxed text-center">
          {round.distillate.verdict}
        </p>
      </section>
    </div>
  );
}

function OpenRound({
  round,
  terms,
}: {
  round: CollisionRound;
  terms: readonly string[];
}) {
  const tribunal = Boolean(round.tribunal);
  return (
    <article className="pt-2">
      <header className="border-b border-stone-200 pb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-800">
              {tribunal ? "atto conclusivo" : `angolo ${round.id} di 5`} · {round.focus}
            </p>
            <h2 className="mt-2 font-serif text-2xl leading-tight text-stone-950 md:text-3xl font-medium">
              {round.title}
            </h2>
            <p className="mt-1 font-serif text-xs italic text-stone-500">
              {round.subtitle}
            </p>
          </div>
          <RoleBadge role={round.distillate.role} />
        </div>
      </header>
      {tribunal ? (
        <AdversarialTribunal round={round} terms={terms} />
      ) : (
        <DiscoveryEssayDetail round={round} terms={terms} />
      )}
    </article>
  );
}

export function CollisionGondola({
  loop,
  vectors,
  highlightTerms = [],
}: {
  loop: DayCollisionLoop;
  vectors: readonly GondolaVector[];
  highlightTerms?: readonly string[];
}) {
  const [activeId, setActiveId] = useState(1);
  const activeRound =
    loop.rounds.find((round) => round.id === activeId) ?? loop.rounds[0];
  const lastId = loop.rounds.length;
  const terms = semanticTerms(loop.semanticContract.concepts, [], highlightTerms);

  function selectRound(id: number, moveToTop = true) {
    setActiveId(id);
    if (moveToTop) {
      window.requestAnimationFrame(() => {
        document.getElementById("gondola")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }

  return (
    <div className="mt-8 w-full max-w-3xl">
      {/* Testata sobria e lineare dei due vettori */}
      <header className="mx-auto max-w-2xl text-center pb-8 border-b border-stone-300">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-800">
          la coppia in collisione
        </p>
        <h2 className="mt-2 font-serif text-2xl text-stone-900 md:text-3xl font-normal">
          {vectors[0].title}{" "}
          <span className="font-sans text-amber-700 text-lg mx-1">⇄</span>{" "}
          {vectors[1].title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-stone-700">
          ALKIMIA non cerca somiglianze superficiali: mette in comunicazione due
          domini affinché la loro fusione alchemica generi un{" "}
          <strong>Terzo Campo Emergente (C)</strong>, irriducibile ai due argomenti
          presi separatamente.
        </p>
      </header>
      <div id="gondola" className="mt-8 scroll-mt-6 space-y-6">
        {/* Selettore a bottoni orizzontali compatti */}
        <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-3">
          {loop.rounds.map((round) => (
            <button
              key={round.id}
              type="button"
              onClick={() => selectRound(round.id, false)}
              className={`rounded-full border px-3.5 py-1.5 text-left font-serif text-xs transition-colors ${
                round.id === activeId
                  ? "border-amber-800 bg-amber-800 text-amber-50 shadow-sm"
                  : "border-stone-300 bg-white/60 text-stone-700 hover:border-amber-700/60"
              }`}
              aria-pressed={round.id === activeId}
            >
              <span className="mr-1.5 font-sans text-[10px] font-semibold opacity-75">
                {round.tribunal ? "T." : `${round.id}.`}
              </span>
              {round.tribunal ? "Il Tribunale" : round.title}
            </button>
          ))}
        </div>
        <OpenRound round={activeRound} terms={terms} />
        {activeRound.tribunal ? (
          <section className="border-t border-stone-300 pt-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-800">
              il contratto semantico della giornata
            </p>
            <p className="mt-3 font-serif text-xl leading-relaxed text-stone-950">
              <strong>{loop.semanticContract.thesis}</strong>
            </p>
            <dl className="mt-6 space-y-3">
              {loop.semanticContract.concepts.map((concept) => (
                <div key={`${concept.role}-${concept.term}`} className="text-sm leading-relaxed">
                  <dt className="inline font-semibold text-stone-950">
                    {concept.term}
                  </dt>{" "}
                  <dd className="inline text-stone-600">— {concept.definition}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}
        {/* Pulsanti Avanti/Indietro tra i round */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-stone-200">
          <button
            type="button"
            disabled={activeId === 1}
            onClick={() => selectRound(activeId - 1)}
            className="flex items-center gap-2 rounded-full border border-stone-300 bg-white/60 px-4 py-2 text-xs text-stone-700 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            angolo precedente
          </button>
          <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400">
            {activeId} / {lastId}
          </p>
          <button
            type="button"
            disabled={activeId === lastId}
            onClick={() => selectRound(activeId + 1)}
            className="flex items-center gap-2 rounded-full border border-amber-800 bg-amber-800 px-4 py-2 text-xs text-amber-50 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            prossimo angolo
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
