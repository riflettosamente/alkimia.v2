/**
 * Orchestratore della generazione giornaliera.
 *
 * Sequenza identica al repository alkimia.v2: ricerca, quattro fasi, salvataggio.
 * Usa il multi-provider AI (Groq, OpenRouter, OpenAI, Cloudflare);
 * se nessun provider è configurato o se tutti falliscono, usa il motore
 * locale di riserva registrandone la trasparenza.
 */
import { dayKey, drawRandomPair } from "./draw";
import { executeAiCompletion, hasAnyKey } from "./aiProviders";
import { generateLocalDocument } from "./local";
import { performWebResearch } from "./web-research";
import {
  phase1Prompt,
  phase2Prompt,
  phase3Prompt,
  phase4Prompt,
} from "./prompts";
import {
  phase1OutputSchema,
  phase2OutputSchema,
  phase3OutputSchema,
  phase4OutputSchema,
} from "./schemas";
import type { Phase1Output, Phase2Output, Phase3Output, Phase4Output } from "./schemas";
import { clearJob, readDocument, writeDocument, writeJob } from "./storage";
import { DOCUMENT_VERSION } from "./types";
import type { DailyDocument, GenerationStage } from "./types";

type Progress = (stage: GenerationStage) => Promise<void> | void;

function extractJson(content: string): unknown {
  let cleaned = content.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/i, "").replace(/\s*```$/i, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/i, "").replace(/\s*```$/i, "");
  }
  return JSON.parse(cleaned);
}

const inFlight = new Map<string, Promise<DailyDocument>>();

export async function generateDailyDocument(
  date: Date,
  onProgress: Progress,
): Promise<DailyDocument> {
  const day = dayKey(date);
  const existing = readDocument(day);
  if (existing) return existing;

  if (!hasAnyKey()) {
    return generateLocalDocument(date, onProgress);
  }

  const { first, second } = drawRandomPair();
  const pair: [number, number] = [first.index, second.index];
  let finalProviderUsed = "";
  let finalModelUsed = "";

  try {
    await onProgress("research");
    const dossier = await performWebResearch(first.topic, second.topic);

    await onProgress("phase1");
    const phase1Res = await executeAiCompletion({
      prompt: phase1Prompt(first.topic, second.topic),
      maxOutputTokens: 3_000,
      schemaName: "alkimia_phase_1",
    });
    finalProviderUsed = phase1Res.providerUsed;
    finalModelUsed = phase1Res.modelUsed;
    const phase1: Phase1Output = phase1OutputSchema.parse(extractJson(phase1Res.content));

    await onProgress("phase2");
    const phase2Res = await executeAiCompletion({
      prompt: phase2Prompt(first.topic, second.topic, phase1),
      maxOutputTokens: 4_500,
      schemaName: "alkimia_phase_2",
    });
    const phase2: Phase2Output = phase2OutputSchema.parse(extractJson(phase2Res.content));

    await onProgress("phase3");
    const phase3Res = await executeAiCompletion({
      prompt: phase3Prompt(first.topic, second.topic, phase2),
      maxOutputTokens: 4_000,
      schemaName: "alkimia_phase_3",
    });
    const phase3: Phase3Output = phase3OutputSchema.parse(extractJson(phase3Res.content));

    await onProgress("phase4");
    const phase4Res = await executeAiCompletion({
      prompt: phase4Prompt(first.topic, second.topic, phase3),
      maxOutputTokens: 3_500,
      schemaName: "alkimia_phase_4",
    });
    const phase4: Phase4Output = phase4OutputSchema.parse(extractJson(phase4Res.content));

    await onProgress("saving");

    return {
      version: DOCUMENT_VERSION,
      dayKey: day,
      generatedAt: new Date().toISOString(),
      source: "groq", // Indica origine AI
      model: `${finalProviderUsed} · ${finalModelUsed}`,
      pair,
      dossier,
      phase1,
      phase2,
      phase3,
      phase4,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn("[ALKIMIA] Generazione AI non riuscita, attivazione del motore locale:", message);
    try {
      localStorage.setItem(
        "alkimia.lastAiError",
        JSON.stringify({ at: new Date().toISOString(), message: message.slice(0, 500) }),
      );
    } catch {
      /* storage non disponibile */
    }
    return generateLocalDocument(date, onProgress);
  }
}

/** Idempotente: una sola generazione per giorno e per sessione. */
export async function ensureDailyDocument(
  date: Date = new Date(),
  onProgress: Progress,
): Promise<DailyDocument> {
  const day = dayKey(date);
  const existing = readDocument(day);
  if (existing) return existing;

  const current = inFlight.get(day);
  if (current) return current;

  const promise = (async () => {
    const startedAt = new Date().toISOString();
    try {
      const doc = await generateDailyDocument(date, async (stage) => {
        writeJob({ status: "generating", dayKey: day, startedAt, stage });
        await onProgress(stage);
      });
      writeDocument(doc);
      clearJob(day);
      return doc;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Elaborazione non riuscita.";
      writeJob({ status: "failed", dayKey: day, failedAt: new Date().toISOString(), message });
      throw error;
    } finally {
      inFlight.delete(day);
    }
  })();

  inFlight.set(day, promise);
  return promise;
}
