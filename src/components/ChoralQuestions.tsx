import { SemanticText, semanticTerms } from "./SemanticText";
import { JUMP_OPERATORS } from "../lib/phase3";
import type { DailyDocument } from "../lib/types";
import type { JumpCardOutput, Phase3Output } from "../lib/schemas";

const FINAL_QUESTIONS = [
  {
    id: "cuiProdest",
    n: "01",
    question: "Cui prodest?",
    gloss: "A chi giova prendere sul serio questa costellazione?",
  },
  {
    id: "innovativeDiscovery",
    n: "02",
    question: "Quale scoperta innovativa potremmo portare alla luce?",
    gloss: "Non una risposta unica, ma il ventaglio delle scoperte possibili.",
  },
  {
    id: "notInvestigated",
    n: "03",
    question: "Cos'è che non abbiamo ancora investigato?",
    gloss: "Le lacune reali che separano il ponte dalla prova.",
  },
  {
    id: "researchFocus",
    n: "04",
    question: "Dove dovremmo focalizzare la nostra ricerca?",
    gloss: "L'ordine di marcia: cosa sondare ora, dopo e alla frontiera.",
  },
  {
    id: "possibleDiscovery",
    n: "05",
    question: "Cosa potremmo scoprire?",
    gloss: "Che cosa cambierebbe nei diversi esiti dell'esplorazione.",
  },
] as const;

/**
 * FASE 5: cinque affondi in una pagina editoriale continua, senza card.
 * Struttura identica a ChoralQuestions.tsx del repository sorgente.
 */
export function ChoralQuestions({ document }: { document: DailyDocument }) {
  const thrust = document.phase4;
  const answers: Record<string, string> = {
    cuiProdest: thrust.cuiProdest,
    innovativeDiscovery: thrust.innovativeDiscovery,
    notInvestigated: thrust.notInvestigated,
    researchFocus: thrust.researchFocus,
    possibleDiscovery: thrust.possibleDiscovery,
  };

  const candidates = JUMP_OPERATORS.map(
    (op) => document.phase3[op.key as keyof Phase3Output] as JumpCardOutput,
  );
  const open = candidates.filter((card) => card?.status === "dignified");

  const terms = semanticTerms(
    document.phase2.semanticContract.concepts,
    candidates.map((card) => card?.researchName || ""),
    document.dossier?.highlightTerms,
  );

  return (
    <section className="mx-auto mt-8 w-full max-w-3xl px-5 sm:px-6">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-800">
          l&apos;interrogazione della costellazione
        </p>
        <h2 className="mt-2 font-serif text-2xl text-stone-900 md:text-3xl">
          Cinque domande alla frontiera del nesso
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-stone-700">
          Le Intuizioni Aperte non vengono ridotte a una formula unica. Le interroghiamo insieme
          per capire a chi giova esplorarle, quale vuoto rivelano, dove orientare lo sguardo e che
          cosa potrebbe cambiare.
        </p>
        <p className="mt-5 font-serif text-xs italic leading-relaxed text-stone-500">
          Sotto esame: {open.map((jump) => jump?.sparkTitle).filter(Boolean).join(" · ")}
        </p>
      </header>

      <div className="mt-12 border-t border-stone-300">
        {FINAL_QUESTIONS.map((question) => (
          <article key={question.id} className="border-b border-stone-300 py-10 md:py-12">
            <header>
              <p className="text-[10px] font-semibold uppercase tracking-[0.27em] text-amber-800">
                affondo {question.n}
              </p>
              <h3 className="mt-2 font-serif text-2xl leading-tight text-stone-950">
                {question.question}
              </h3>
              <p className="mt-2 text-xs italic text-stone-500">{question.gloss}</p>
            </header>

            <div className="mt-6 space-y-4 font-serif text-base leading-[1.8] text-stone-800">
              {(answers[question.id] ?? "In attesa di elaborazione.")
                .split("\n\n")
                .map((paragraph, pIdx) => (
                  <p key={pIdx}>
                    <SemanticText text={paragraph} terms={terms} />
                  </p>
                ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
