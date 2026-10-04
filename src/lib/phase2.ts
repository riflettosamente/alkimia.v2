import type { Phase2Output } from "./schemas";

/**
 * FASE 2 — La Collisione Alchemica.
 * Tipi e definizioni ripresi da src/lib/phase2.ts del repository sorgente.
 */

export type Score = {
  surprise: number;
  specificity: number;
  significance: number;
  anchorage: number;
};

export type CandidateRole = "sovereign" | "pillar" | "counterpoint" | "rejected";

export type CollisionAngleKey =
  | "capacita"
  | "puntoCieco"
  | "mutazione"
  | "oggettoInedito"
  | "metodoIbrido";

export type DiscoveryCard = {
  sparkTitle: string;
  collisionPassage: string;
  anchoragePassage: string;
  significancePassage: string;
};

export type EmergentField = {
  fieldName: string;
  foundationalQuestion: string;
  newObject: string;
  hybridMethod: string;
  candidateTheory: string;
};

export type Distillate = {
  title: string;
  body: string;
  verdict: string;
  role: CandidateRole;
  score: Score;
  redThread?: string;
  emergentField?: EmergentField;
};

export type TribunalCandidate = {
  n: string;
  angleTitle: string;
  title: string;
  claim: string;
  objection: string;
  survives: string;
  role: CandidateRole;
  pillarName: string;
  chapter: string;
};

export type CollisionRound = {
  id: number;
  key: CollisionAngleKey | "tribunale";
  title: string;
  subtitle: string;
  focus: string;
  direction: string;
  introduction: string;
  discovery?: DiscoveryCard;
  tribunal?: readonly TribunalCandidate[];
  distillate: Distillate;
};

export type SemanticRole =
  | "operazione"
  | "oggetto"
  | "struttura"
  | "teoria"
  | "unità"
  | "meccanismo"
  | "distorsione"
  | "ricerca-nucleo"
  | "ricerca-effetti"
  | "esito-culturale";

export type SemanticConcept = {
  role: SemanticRole;
  term: string;
  definition: string;
};

/** Vocabolario vincolante della giornata. */
export type SemanticContract = {
  thesis: string;
  concepts: readonly SemanticConcept[];
};

export type DayCollisionLoop = {
  pair: [number, number];
  rounds: readonly CollisionRound[];
  semanticContract: SemanticContract;
};

export const COLLISION_ANGLES: readonly {
  id: number;
  key: CollisionAngleKey;
  title: string;
  subtitle: string;
  focus: string;
  direction: string;
  question: string;
  introduction: string;
}[] = [
  {
    id: 1,
    key: "capacita",
    title: "La Capacità Esportabile di A",
    subtitle: "Lo strumento tecnico e analitico che A offre a B",
    focus: "STRUMENTO · OPERAZIONE TECNICA · DISSEZIONE",
    direction: "A → B",
    question:
      "Quale capacità tecnica, analitica o di controllo possiede il Vettore A che il territorio del Vettore B non ha mai avuto a disposizione?",
    introduction:
      "Non cerchiamo somiglianze: prendiamo il bisturi operativo di A e lo usiamo come strumento di dissezione sulla materia opaca di B.",
  },
  {
    id: 2,
    key: "puntoCieco",
    title: "Il Punto Cieco di B",
    subtitle: "La domanda o il dato irrisolto di B che attende la dissezione di A",
    focus: "ANOMALIA · DATO RESIDUO · ARCHIVIO IRRISOLTO",
    direction: "B ⇄ A",
    question:
      "Quale enigma storico, clinico o fenomenologico di B rimane indecifrabile con i suoi strumenti interni e può essere illuminato dalla logica di A?",
    introduction:
      "Identifichiamo la zona d'ombra di B dove i suoi modelli tradizionali falliscono e dove l'intervento di A apre una via di comprensione inedita.",
  },
  {
    id: 3,
    key: "mutazione",
    title: "La Mutazione Reciproca",
    subtitle: "Come il contatto con B costringe A a trasformarsi",
    focus: "RETROAZIONE · TRASFORMAZIONE DEL METODO · SUPERAMENTO DEI LIMITI",
    direction: "B → A",
    question:
      "In che modo la natura sfuggente o complessa di B costringe lo strumento di A a superare il proprio riduzionismo e ad assumere una forma nuova?",
    introduction:
      "La fusione alchemica non è a senso unico: A trasforma B, ma l'impatto con B costringe A a ridefinire le proprie categorie fondamentali.",
  },
  {
    id: 4,
    key: "oggettoInedito",
    title: "L'Oggetto Inedito di C",
    subtitle: "Il fenomeno nuovo che appartiene solo alla Terza Via",
    focus: "TERZA VIA · OGGETTO IRRIDUCIBILE · CONCETTO INEDITO",
    direction: "A + B → C",
    question:
      "Quale nuovo oggetto di ricerca, invisibile a entrambi i campi presi separatamente, viene reso osservabile per la prima volta dalla loro fusione?",
    introduction:
      "Qui nasce la Terza Via: un'entità concettuale che non è né A né B, ma l'oggetto originale generato dal loro incontro (se togli A, C crolla; se togli B, C crolla allo stesso modo).",
  },
  {
    id: 5,
    key: "metodoIbrido",
    title: "Il Metodo Ibrido di Indagine",
    subtitle: "Il protocollo di ricerca generato dalla fusione",
    focus: "METODO IBRIDO · INTEGRAZIONE OPERATIVA · PROGRAMMA DI RICERCA",
    direction: "C",
    question:
      "Quale protocollo d'indagine nasce per studiare il nuovo Campo Emergente C, integrando il rigore di A e la profondità fenomenologica di B?",
    introduction:
      "Definiamo la prassi conoscitiva con cui il nuovo Campo Emergente C può essere esplorato nel mondo reale, fondando la disciplina della Terza Via.",
  },
] as const;

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII"];

type AngleOutput = Phase2Output["capacita"];

function angleRound(
  definition: (typeof COLLISION_ANGLES)[number],
  output: AngleOutput,
): CollisionRound {
  return {
    ...definition,
    discovery: {
      sparkTitle: output.sparkTitle,
      collisionPassage: output.collisionPassage,
      anchoragePassage: output.anchoragePassage,
      significancePassage: output.significancePassage,
    },
    distillate: {
      title: output.sparkTitle,
      body: output.collisionPassage,
      verdict: output.verdict,
      role: "pillar",
      score: output.score,
    },
  };
}

/** Replica di toPhase2() da generator.ts del repository sorgente. */
export function buildCollisionLoop(
  output: Phase2Output,
  pair: [number, number],
): DayCollisionLoop {
  const angleOutputs: AngleOutput[] = [
    output.capacita,
    output.puntoCieco,
    output.mutazione,
    output.oggettoInedito,
    output.metodoIbrido,
  ];
  const angles = COLLISION_ANGLES.map((definition, index) =>
    angleRound(definition, angleOutputs[index]),
  );
  const candidates: TribunalCandidate[] = output.tribunal.map((candidate, index) => ({
    n: ROMAN[index] ?? String(index + 1),
    ...candidate,
  }));
  const sovereign: Distillate = {
    ...output.sovereignThesis,
    role: "sovereign",
  };

  return {
    pair,
    semanticContract: output.semanticContract,
    rounds: [
      ...angles,
      {
        id: 6,
        key: "tribunale",
        title: "Il Tribunale",
        subtitle: "La Sala delle Decisioni e il Ponte Sovrano",
        focus: "VALUTAZIONE · POTATURA · PONTE SOVRANO",
        direction: "A ⇄ B",
        introduction:
          "Le 5 intuizioni vengono messe alla prova con l'obiezione critica più spietata. Il Tribunale seleziona i pilastri e incorona il Ponte Sovrano della FASE 2.",
        tribunal: candidates,
        distillate: sovereign,
      },
    ],
  };
}
