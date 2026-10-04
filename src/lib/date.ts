/** Fuso orario del rituale quotidiano: la "data di oggi" segue l'Italia. */
export const TIME_ZONE = "Europe/Rome";

export function formatItalianDate(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: TIME_ZONE,
  }).format(date);
}

export function shortItalianDate(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: TIME_ZONE,
  }).format(date);
}
