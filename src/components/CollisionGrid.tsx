import { CollisionGondola } from "./CollisionGondola";
import { buildCollisionLoop } from "../lib/phase2";
import { TOPICS } from "../lib/topics";
import type { Phase2Output } from "../lib/schemas";

/** FASE 2: La Collisione — gondola alchemica de-clutterizzata. */
export function CollisionGrid({
  phase2,
  pair,
  highlightTerms,
}: {
  phase2: Phase2Output;
  pair: [number, number];
  highlightTerms?: readonly string[];
}) {
  const first = TOPICS[pair[0]];
  const second = TOPICS[pair[1]];
  const vectors = [
    {
      key: "a" as const,
      order: "ARGOMENTO I",
      name: "VETTORE A",
      title: first.title,
    },
    {
      key: "b" as const,
      order: "ARGOMENTO II",
      name: "VETTORE B",
      title: second.title,
    },
  ];

  return (
    <section className="mt-8 flex w-full flex-col items-center px-5 sm:px-0">
      <CollisionGondola
        loop={buildCollisionLoop(phase2, pair)}
        vectors={vectors}
        highlightTerms={highlightTerms}
      />
    </section>
  );
}
