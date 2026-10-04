/**
 * FASE VI: Il Saggio Narrativo (Placeholder come nel repository sorgente).
 */
export function EssayPlaceholder() {
  return (
    <section className="mx-auto mt-8 flex w-full max-w-3xl flex-col items-center px-5 sm:px-6">
      <div className="mt-4 flex min-h-80 w-full max-w-2xl flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white/40 p-10 text-center shadow-sm">
        <p className="font-serif text-6xl text-stone-300">VI</p>
        <h3 className="mt-4 font-serif text-2xl text-stone-800">Il Saggio Narrativo</h3>
        <p className="mt-2 max-w-md text-xs leading-relaxed text-stone-500">
          Lo spazio in cui la materia prima delle cinque fasi precedenti si ricompone nel saggio
          articolato, con la sua voce, la sua architettura a capitoli e il suo arco narrativo.
        </p>
        <span className="mt-6 inline-block rounded-full border border-amber-300/60 bg-amber-100/70 px-4 py-1.5 font-serif text-xs italic text-amber-900">
          In preparazione
        </span>
      </div>
    </section>
  );
}
