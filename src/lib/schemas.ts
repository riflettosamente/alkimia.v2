import { z } from "zod";

const text = z.string().min(1);
const vectorPair = z.object({ a: text, b: text });

export const phase1OutputSchema = z.object({
  whenWhere: vectorPair,
  what: vectorPair,
  how: vectorPair,
  who: vectorPair,
  whichBoundary: vectorPair,
  whyVeiled: vectorPair,
});
export type Phase1Output = z.infer<typeof phase1OutputSchema>;

const scoreObject = z.object({
  surprise: z.number().min(1).max(5),
  specificity: z.number().min(1).max(5),
  significance: z.number().min(1).max(5),
  anchorage: z.number().min(1).max(5),
});

const flexibleScore = z.union([
  scoreObject,
  z
    .number()
    .min(1)
    .max(5)
    .transform((v) => ({
      surprise: Math.round(v),
      specificity: Math.round(v),
      significance: Math.round(v),
      anchorage: Math.round(v),
    })),
]);

const candidateRole = z
  .enum(["sovereign", "pillar", "counterpoint", "rejected"])
  .or(
    z.string().transform((v) => {
      const lower = v.toLowerCase();
      if (lower.includes("sovereign") || lower.includes("sovrano")) return "sovereign" as const;
      if (lower.includes("counter") || lower.includes("contrappunto")) return "counterpoint" as const;
      if (lower.includes("reject") || lower.includes("respint")) return "rejected" as const;
      return "pillar" as const;
    }),
  );

const flexibleSurvives = z.union([
  text,
  z
    .boolean()
    .transform((v) =>
      v
        ? "Sopravvive la struttura essenziale del nesso."
        : "Ipotesi non confermata.",
    ),
]);

const discoveryAngle = z.object({
  sparkTitle: text,
  collisionPassage: text,
  anchoragePassage: text,
  significancePassage: text,
  verdict: text,
  score: flexibleScore,
});

const tribunalCandidate = z.object({
  angleTitle: text,
  title: text,
  claim: text,
  objection: text,
  survives: flexibleSurvives,
  role: candidateRole,
  pillarName: text,
  chapter: text,
});

const emergentFieldSchema = z.object({
  fieldName: text,
  foundationalQuestion: text,
  newObject: text,
  hybridMethod: text,
  candidateTheory: text,
});

const sovereignThesis = z.object({
  title: text,
  body: text,
  verdict: text,
  redThread: text,
  score: flexibleScore,
  emergentField: emergentFieldSchema.optional(),
});

const semanticRole = z
  .enum([
    "operazione",
    "oggetto",
    "struttura",
    "teoria",
    "unità",
    "meccanismo",
    "distorsione",
    "ricerca-nucleo",
    "ricerca-effetti",
    "esito-culturale",
  ])
  .or(z.string().transform(() => "teoria" as const));

export const semanticContractSchema = z.object({
  thesis: text,
  concepts: z
    .array(
      z.object({
        role: semanticRole,
        term: text,
        definition: text,
      }),
    )
    .min(4)
    .max(12),
});

export const phase2OutputSchema = z.object({
  capacita: discoveryAngle,
  puntoCieco: discoveryAngle,
  mutazione: discoveryAngle,
  oggettoInedito: discoveryAngle,
  metodoIbrido: discoveryAngle,
  tribunal: z.array(tribunalCandidate).min(3).max(7),
  sovereignThesis,
  semanticContract: semanticContractSchema,
});
export type Phase2Output = z.infer<typeof phase2OutputSchema>;

const jumpStatus = z
  .enum(["dignified", "rejected"])
  .or(
    z.string().transform((v) =>
      v.includes("dignified") || v.includes("ammess") ? ("dignified" as const) : ("rejected" as const),
    ),
  );

const genealogyMode = z
  .enum(["genealogia", "terra-incognita"])
  .or(
    z
      .string()
      .transform((v) => (v.includes("genealogia") ? ("genealogia" as const) : ("terra-incognita" as const))),
  );

const confrontationOutcome = z
  .enum(["contrappunto", "complemento", "incompatibilita", "unica", "nessuna"])
  .or(
    z.string().transform((v) => {
      const lower = v.toLowerCase();
      if (lower.includes("complement")) return "complemento" as const;
      if (lower.includes("incompatib")) return "incompatibilita" as const;
      if (lower.includes("unic")) return "unica" as const;
      if (lower.includes("nessun")) return "nessuna" as const;
      return "contrappunto" as const;
    }),
  );

const jumpCardSchema = z.object({
  sparkTitle: text,
  domain: text,
  genealogyMode,
  researchName: text,
  hypothesisPassage: text,
  genealogyPassage: text,
  manifestationPassage: text,
  falsificationPassage: text,
  status: jumpStatus,
  rejectionReason: text.optional(),
});

const confrontationSchema = z.object({
  outcome: confrontationOutcome,
  outcomeLabel: text,
  analysis: text,
  emergentSynthesis: text.optional(),
  explorationAgenda: text,
});

export const phase3OutputSchema = z.object({
  inversione: jumpCardSchema,
  soglia: jumpCardSchema,
  supporto: jumpCardSchema,
  scala: jumpCardSchema,
  proibita: jumpCardSchema,
  confrontation: confrontationSchema,
});
export type Phase3Output = z.infer<typeof phase3OutputSchema>;
export type JumpCardOutput = z.infer<typeof jumpCardSchema>;

const explorationHorizon = z
  .enum(["ora", "poi", "frontiera"])
  .or(
    z.string().transform((v) => {
      const lower = v.toLowerCase();
      if (lower.includes("ora") || lower.includes("breve")) return "ora" as const;
      if (lower.includes("poi") || lower.includes("medio")) return "poi" as const;
      return "frontiera" as const;
    }),
  );

const hypothesisConsequence = z.object({
  jumpId: z.number().int().min(1).max(5),
  jumpTitle: text,
  rank: z.number().int().min(1).max(5),
  horizon: explorationHorizon,
  outcomePassage: text,
  criticalPassage: text,
  movementPassage: text,
});

export const phase4OutputSchema = z.object({
  constellationSummary: text,
  hypothesisConsequences: z.array(hypothesisConsequence).min(2).max(5),
  cuiProdest: text,
  innovativeDiscovery: text,
  notInvestigated: text,
  researchFocus: text,
  possibleDiscovery: text,
  epilogue: z.object({
    title: text,
    passages: z.array(text).min(2).max(6),
    narrativePromise: text,
  }),
});
export type Phase4Output = z.infer<typeof phase4OutputSchema>;
