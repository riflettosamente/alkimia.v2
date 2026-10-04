import { TABS } from "../lib/tabs";

type Props = {
  active: number;
  onSelect: (id: number) => void;
  ready: boolean;
};

/** Barra delle fasi: pill identiche alla versione GitHub (font-serif, amber-800 attiva). */
export function TabBar({ active, onSelect, ready }: Props) {
  void ready;

  return (
    <nav
      aria-label="Fasi del protocollo"
      className="mx-auto mt-8 flex w-full max-w-4xl flex-wrap justify-center gap-2 px-6"
    >
      {TABS.map((tab) => {
        const selected = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelect(tab.id)}
            aria-current={selected ? "page" : undefined}
            className={`min-w-11 rounded-full border px-4 py-2 text-center font-serif text-sm transition-colors ${
              selected
                ? "cursor-default border-amber-800 bg-amber-800 text-amber-50"
                : "border-stone-300 bg-white/60 text-stone-600 hover:border-amber-700/60 hover:text-stone-900"
            }`}
          >
            {tab.title || tab.roman}
          </button>
        );
      })}
    </nav>
  );
}
