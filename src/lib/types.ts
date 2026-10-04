import type { Phase1Output, Phase2Output, Phase3Output, Phase4Output } from "./schemas";

export const DOCUMENT_VERSION = "alkimia-v2-preview-1";

export type GenerationStage =
  | "research"
  | "phase1"
  | "phase2"
  | "phase3"
  | "phase4"
  | "saving";

export type StageMessage = Record<GenerationStage, string>;

export const STAGE_MESSAGES: StageMessage = {
  research: "FASE 0 — scansione del dossier e dei pionieri",
  phase1: "FASE 1 — scomposizione dei due argomenti in dodici risposte",
  phase2: "FASE 2 — cinque angoli di collisione e Ponte Sovrano",
  phase3: "FASE 3 — i cinque operatori del salto e le intuizioni aperte",
  phase4: "FASE 4 — le conseguenze e i cinque affondi",
  saving: "Consolidamento del documento giornaliero",
};

import type { ResearchDossier } from "./web-research";

export type DailyDocument = {
  version: string;
  dayKey: string;
  generatedAt: string;
  source: "groq" | "local";
  model: string;
  pair: [number, number];
  dossier?: ResearchDossier;
  phase1: Phase1Output;
  phase2: Phase2Output;
  phase3: Phase3Output;
  phase4: Phase4Output;
};

export type JobState =
  | { status: "generating"; dayKey: string; startedAt: string; stage: GenerationStage }
  | { status: "failed"; dayKey: string; failedAt: string; message: string };

export type DailyStatus =
  | { status: "pending"; dayKey: string }
  | { status: "generating"; dayKey: string; startedAt: string; stage: GenerationStage; message: string }
  | { status: "failed"; dayKey: string; failedAt: string; message: string }
  | { status: "complete"; dayKey: string; document: DailyDocument };
