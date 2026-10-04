import { TOPICS } from "./topics";
import type { Topic } from "./topics";
import { TIME_ZONE } from "./date";

export type DrawnTopic = { index: number; topic: Topic };
export type DailyPair = { first: DrawnTopic; second: DrawnTopic };

/** Chiave del giorno (YYYY-MM-DD) nel fuso orario italiano. */
export function dayKey(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

/**
 * Estrazione puramente casuale della coppia ORDINATA.
 * Nessuna memoria, nessun hash: Math.random() due volte.
 * La stabilità per tutti i visitatori dello stesso giorno
 * è garantita dal documento salvato, non dal sorteggio.
 */
export function drawRandomPair(): DailyPair {
  const firstIndex = Math.floor(Math.random() * TOPICS.length);
  let secondIndex = Math.floor(Math.random() * (TOPICS.length - 1));
  if (secondIndex >= firstIndex) secondIndex++;
  return {
    first: { index: firstIndex, topic: TOPICS[firstIndex] },
    second: { index: secondIndex, topic: TOPICS[secondIndex] },
  };
}

/** Coppia usata solo per l'anteprima in attesa: non è la coppia generata. */
export function previewPair(): DailyPair {
  return drawRandomPair();
}
