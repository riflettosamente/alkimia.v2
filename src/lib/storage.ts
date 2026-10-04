import { dayKey } from "./draw";
import { DOCUMENT_VERSION } from "./types";
import type { DailyDocument, DailyStatus, JobState } from "./types";
import { STAGE_MESSAGES } from "./types";

const docKey = (day: string) => `alkimia.doc.${day}`;
const jobKey = (day: string) => `alkimia.job.${day}`;

function read<T>(key: string): T | undefined {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return undefined;
    return JSON.parse(raw) as T;
  } catch {
    return undefined;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function readDocument(day: string = dayKey()): DailyDocument | undefined {
  const doc = read<DailyDocument>(docKey(day));
  if (!doc) return undefined;
  if (doc.version !== DOCUMENT_VERSION) return undefined;
  if (doc.dayKey !== day) return undefined;
  return doc;
}

export function writeDocument(doc: DailyDocument): boolean {
  return write(docKey(doc.dayKey), doc);
}

export function readJob(day: string = dayKey()): JobState | undefined {
  const job = read<JobState>(jobKey(day));
  if (!job) return undefined;
  if (job.dayKey !== day) return undefined;
  return job;
}

export function writeJob(job: JobState): boolean {
  return write(jobKey(job.dayKey), job);
}

export function clearJob(day: string = dayKey()) {
  try {
    localStorage.removeItem(jobKey(day));
  } catch {
    /* storage non disponibile */
  }
}

/** Elimina documento e stato del giorno: usato per forzare una rigenerazione. */
export function clearDay(day: string = dayKey()) {
  try {
    localStorage.removeItem(docKey(day));
    localStorage.removeItem(jobKey(day));
    localStorage.removeItem("alkimia.lastAiError");
  } catch {
    /* storage non disponibile */
  }
}

export function readLastAiError(): string | undefined {
  try {
    const raw = localStorage.getItem("alkimia.lastAiError");
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as { message?: string };
    return parsed.message;
  } catch {
    return undefined;
  }
}

export function getStatus(date: Date = new Date()): DailyStatus {
  const day = dayKey(date);
  const doc = readDocument(day);
  if (doc) return { status: "complete", dayKey: day, document: doc };

  const job = readJob(day);
  if (job?.status === "generating") {
    return {
      status: "generating",
      dayKey: day,
      startedAt: job.startedAt,
      stage: job.stage,
      message: STAGE_MESSAGES[job.stage],
    };
  }
  if (job?.status === "failed") {
    return { status: "failed", dayKey: day, failedAt: job.failedAt, message: job.message };
  }
  return { status: "pending", dayKey: day };
}
