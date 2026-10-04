import { JumpGondola } from "./JumpGondola";
import { buildJumpLoop } from "../lib/phase3";
import type { Phase3Output, Phase2Output } from "../lib/schemas";

/**
 * FASE 3: apre l'esplorazione del Salto con le Intuizioni Aperte.
 * Wrapper identico a JumpGrid.tsx del repository sorgente.
 */
export function JumpGrid({
  phase3,
  phase2,
  pair,
  highlightTerms,
}: {
  phase3: Phase3Output;
  phase2: Phase2Output;
  pair: [number, number];
  highlightTerms?: readonly string[];
}) {
  const loop = buildJumpLoop(
    phase3,
    pair,
    phase2.semanticContract,
    phase2.sovereignThesis.title,
    phase2.sovereignThesis.body,
  );

  return (
    <section className="mt-8 flex w-full flex-col items-center px-5 sm:px-0">
      <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-stone-600">
        Attraversando il Ponte Sovrano della FASE 2, cinque operatori universali
        di trasformazione spingono la riflessione oltre il noto. La Soglia
        trattiene una costellazione di Intuizioni Aperte con pari dignità
        documentaria, messe a confronto nell&apos;Agenda di Esplorazione.
      </p>
      <JumpGondola loop={loop} highlightTerms={highlightTerms} />
    </section>
  );
}
