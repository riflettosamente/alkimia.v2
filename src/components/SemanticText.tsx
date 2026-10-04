import type { ReactNode } from "react";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Evidenzia termini semantici e nomi di ricerca all'interno della prosa,
 * senza richiedere markup al modello linguistico.
 */
export function SemanticText({
  text,
  terms,
}: {
  text: string;
  terms: readonly string[];
}): ReactNode {
  const normalizedTerms = Array.from(
    new Set(terms.map((term) => term.trim()).filter((term) => term.length > 2)),
  ).sort((a, b) => b.length - a.length);

  if (!normalizedTerms.length) return text;

  const canonical = new Map(
    normalizedTerms.map((term) => [term.toLocaleLowerCase("it"), term]),
  );
  const expression = new RegExp(`(${normalizedTerms.map(escapeRegExp).join("|")})`, "giu");
  const parts = text.split(expression);

  return parts.map((part, index) => {
    const known = canonical.get(part.toLocaleLowerCase("it"));
    return known ? (
      <strong key={`${part}-${index}`} className="font-semibold text-stone-950">
        {part}
      </strong>
    ) : (
      part
    );
  });
}

export function semanticTerms(
  concepts: readonly { term: string }[] = [],
  researchNames: readonly string[] = [],
  highlightTerms: readonly string[] = [],
) {
  return [
    ...concepts.map((concept) => concept.term),
    ...researchNames,
    ...highlightTerms,
  ];
}
