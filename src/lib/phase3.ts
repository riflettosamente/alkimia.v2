import type { Phase3Output } from "./schemas";

/**
 * FASE 3 — Il Salto: tipi e operatori ripresi dal repository sorgente
 * (src/lib/phase3.ts di alkimia.v2).
 */

export type JumpOperatorKey =
  | "inversione"
  | "soglia"
  | "supporto"
  | "scala"
  | "proibita";

export type JumpStatus = "dignified" | "rejected";
export type GenealogyMode = "genealogia" | "terra-incognita";

export type ConfrontationOutcome =
  | "contrappunto"
  | "complemento"
  | "incompatibilita"
  | "unica"
  | "nessuna";

export type JumpCard = {
  id: number;
  operatorKey: JumpOperatorKey;
  operatorTitle: string;
  operatorSubtitle: string;
  sparkTitle: string;
  domain: string;
  genealogyMode: GenealogyMode;
  researchName: string;
  hypothesisPassage: string;
  genealogyPassage: string;
  manifestationPassage: string;
  falsificationPassage: string;
  status: JumpStatus;
  rejectionReason?: string;
};

/**
 * I tre criteri della Soglia (filtro di dignità epistemica).
 * Un salto è ammesso alla costellazione solo se li supera tutti e tre.
 */
export const SOGLIA_CRITERIA = [
  {
    id: "derivazione",
    label: "Derivazione",
    gloss: "Il salto deve scaturire dal Ponte Sovrano, non dall'arbitrio.",
  },
  {
    id: "falsificabilità",
    label: "Falsificabilità",
    gloss:
      "Deve avere un modo empirico, oggi praticabile o praticabile in vista, di risultare sbagliato.",
  },
  {
    id: "diversità",
    label: "Diversità",
    gloss:
      "Deve atterrare in un campo diverso da quelli già ammessi: nessuna variante della stessa ipotesi.",
  },
] as const;

export type Confrontation = {
  outcome: ConfrontationOutcome;
  outcomeLabel: string;
  analysis: string;
  emergentSynthesis?: string;
  explorationAgenda: string;
};

export type SemanticConcept = { role: string; term: string; definition: string };
export type SemanticContract = { thesis: string; concepts: readonly SemanticConcept[] };

export type DayJumpLoop = {
  pair: [number, number];
  sovereignBridgeTitle: string;
  sovereignBridgeBody: string;
  semanticContract: SemanticContract;
  candidates: readonly JumpCard[];
  openIntuitions: readonly JumpCard[];
  confrontation: Confrontation;
};

export const JUMP_OPERATORS: readonly {
  id: number;
  key: JumpOperatorKey;
  title: string;
  subtitle: string;
  question: string;
  focus: string;
}[] = [
  {
    id: 1,
    key: "inversione",
    title: "Inversione della Causalità",
    subtitle: "Rovesciare il flusso dell'influenza e della lettura",
    question:
      "Se invece di essere A a tradurre o informare B, fosse lo stato di B a determinare o alterare la ricezione e la selezione di A?",
    focus: "DIREZIONE OPPOSTA · FEEDBACK RETROATTIVO · RICEZIONE ATTIVA",
  },
  {
    id: 2,
    key: "soglia",
    title: "La Condizione di Soglia",
    subtitle: "Portare il ponte al limite (ipnagogia, silenzio sensoriale, confine)",
    question:
      "Cosa accade quando il sistema sensoriale ordinario viene silenziato o spinto alla soglia estrema tra sonno e veglia, ordine e caos?",
    focus: "STATO LIMITE · SILENZIO SENSORIALE · EMERGENZA DEL SOTTILE",
  },
  {
    id: 3,
    key: "supporto",
    title: "Traslazione di Supporto",
    subtitle: "Far operare la struttura su un supporto differente",
    question:
      "Se la medesima architettura di trasduzione operasse non sul tessuto fisico, ma sul sogno, sulla memoria collettiva o sull'immaginario?",
    focus: "CAMBIO DI PIANO · MATERIA SIMBOLICA · SUBSTRATO ALTERNATIVO",
  },
  {
    id: 4,
    key: "scala",
    title: "Espansione di Scala e Durata",
    subtitle: "Dall'evento locale alla risonanza geofisica o storica",
    question:
      "Cosa diventa questa interazione quando non la osserviamo nell'istante del singolo organismo, ma nella durata evolutiva o sulla scala dell'intero pianeta?",
    focus: "TEMPO PROFONDO · SINCRONIZZAZIONE PLANETARIA · RISONANZA DI SPECIE",
  },
  {
    id: 5,
    key: "proibita",
    title: "La Possibilità Proibita",
    subtitle: "Sospendere il tabù per formulare l'ipotesi di frontiera",
    question:
      "Se sospendessimo il pregiudizio che dichiara impossibile il fenomeno, quale capacità o varco inesplorato emergerebbe dal Ponte Sovrano?",
    focus: "FRONTIERA RADICALE · SOSPENSIONE DEL TABÙ · PROTOCOLLO CIECO",
  },
] as const;

/**
 * Criterio di diversità della Soglia: due salti ammessi non possono
 * atterrare nello stesso campo epistemico. Identico a generator.ts sorgente.
 */
function applySogliaDiversity(candidates: JumpCard[]): JumpCard[] {
  const admittedDomains = new Set<string>();
  return candidates.map((card) => {
    if (card.status !== "dignified") return card;
    const domain = card.domain.trim().toLowerCase();
    if (admittedDomains.has(domain)) {
      return {
        ...card,
        status: "rejected" as const,
        rejectionReason:
          "Sospeso dalla Soglia per diversità: il campo epistemico è già coperto da un salto ammesso; la costellazione non ammette varianti della stessa ipotesi.",
      };
    }
    admittedDomains.add(domain);
    return card;
  });
}

/** Trasforma l'output grezzo del modello nel loop della FASE 3 (toPhase3 sorgente). */
export function buildJumpLoop(
  output: Phase3Output,
  pair: [number, number],
  semanticContract: SemanticContract,
  sovereignBridgeTitle: string,
  sovereignBridgeBody: string,
): DayJumpLoop {
  const operatorOutputs = [
    output.inversione,
    output.soglia,
    output.supporto,
    output.scala,
    output.proibita,
  ];

  const rawCandidates: JumpCard[] = JUMP_OPERATORS.map((op, index) => ({
    id: op.id,
    operatorKey: op.key,
    operatorTitle: op.title,
    operatorSubtitle: op.subtitle,
    sparkTitle: operatorOutputs[index].sparkTitle,
    domain: operatorOutputs[index].domain,
    genealogyMode: operatorOutputs[index].genealogyMode,
    researchName: operatorOutputs[index].researchName,
    hypothesisPassage: operatorOutputs[index].hypothesisPassage,
    genealogyPassage: operatorOutputs[index].genealogyPassage,
    manifestationPassage: operatorOutputs[index].manifestationPassage,
    falsificationPassage: operatorOutputs[index].falsificationPassage,
    status: operatorOutputs[index].status,
    rejectionReason: operatorOutputs[index].rejectionReason,
  }));

  const candidates = applySogliaDiversity(rawCandidates);
  const openIntuitions = candidates.filter((card) => card.status === "dignified");

  return {
    pair,
    semanticContract,
    sovereignBridgeTitle,
    sovereignBridgeBody,
    candidates,
    openIntuitions,
    confrontation: output.confrontation,
  };
}
