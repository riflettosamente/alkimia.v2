import { formatItalianDate } from "../lib/date";
import type { DailyDocument } from "../lib/types";

type Props = {
  document?: DailyDocument;
  date?: Date;
  onOpenOfficina: () => void;
};

/**
 * Testata identica alla versione GitHub:
 * titolo ALKIMIA, data in corsivo, divisore a rombo.
 * L'unico elemento aggiunto è il pulsante OFFICINA (necessario per le chiavi API),
 * ancorato in alto a destra per non alterare l'impaginazione.
 */
export function Masthead({ document, date, onOpenOfficina }: Props) {
  const dateLabel = formatItalianDate(date ?? new Date());

  return (
    <header className="relative w-full px-6 pt-10">
      <button
        type="button"
        onClick={onOpenOfficina}
        className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-stone-300 bg-white/60 px-3 py-1.5 transition-colors hover:border-amber-700/60"
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            document ? "bg-amber-800" : "bg-stone-400"
          }`}
        />
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-600">
          officina
        </span>
      </button>

      <p className="text-center font-serif text-[clamp(2.25rem,7vw,4rem)] leading-none tracking-[0.18em] text-stone-900">
        ALKIMIA
      </p>

      <p className="mt-4 text-center font-serif text-base italic text-stone-500">{dateLabel}</p>

      <div className="mx-auto mt-6 flex w-full max-w-xs items-center gap-4">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-stone-300" />
        <span className="h-1.5 w-1.5 rotate-45 bg-amber-600/80" />
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-stone-300" />
      </div>
    </header>
  );
}
