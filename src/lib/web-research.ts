import type { Topic } from "./topics";

export type HistoricalFigure = {
  name: string;
  period?: string;
  field: string;
  contribution: string;
};

/**
 * Lo statuto epistemico di una ricerca di frontiera distingue tre piani
 * che non vanno mai confusi:
 *
 * - "documentato": che cosa è stato fatto, da chi, quando (fatto storico).
 * - "istituzionale": che cosa ne ha concluso l'ente che l'ha condotta o chiusa (giudizio attribuito, non verità).
 * - "aperto": che cosa rimane da verificare con nuovi esperimenti (la domanda).
 *
 * La chiusura o il verdetto di un'istituzione non è mai una confutazione.
 * Dire «la CIA lo studiò, quindi funziona» è lo stesso errore logico di
 * dire «la CIA lo chiuse, quindi non funziona»: due salti speculari,
 * nessuno dei quali è sperimentazione.
 */
export type EpistemicStatus = "documentato" | "istituzionale" | "aperto";

export type FrontierResearch = {
  name: string;
  period?: string;
  institution?: string;
  summary: string;
  /** Che cosa è stato fatto, da chi, quando (fatto storico). */
  verdict: string;
  /** Che cosa ne ha concluso l'istituzione (giudizio attribuito). */
  institutionalConclusion?: string;
  /** Che cosa rimane da verificare con nuova sperimentazione. */
  openQuestion?: string;
};

export type ResearchDossier = {
  topicA: string;
  topicB: string;
  scannedAt: string;
  figuresA: readonly HistoricalFigure[];
  figuresB: readonly HistoricalFigure[];
  frontierResearches: readonly FrontierResearch[];
  highlightTerms: readonly string[];
  rawExtracts: readonly { title: string; extract: string; lang: string }[];
};

/**
 * Mappatura tematica di parole chiave per interrogare il web con massima efficacia.
 */
const TOPIC_WEB_QUERIES: Record<string, readonly string[]> = {
  "La Meccanica Quantistica": [
    "Meccanica quantistica",
    "Max Planck 1900",
    "Niels Bohr",
    "Werner Heisenberg principio indeterminazione",
    "Entanglement quantistico",
    "Quantum biology",
  ],
  "La Transcomunicazione Strumentale (TCI)": [
    "Friedrich Jurgenson",
    "Konstantin Raudive",
    "Marcello Bacci metafonia",
    "Electronic voice phenomenon",
    "Thomas Edison spirit phone",
    "Spiricom George Meek",
  ],
  "La tecnologia CRISPR": [
    "CRISPR Cas9",
    "Jennifer Doudna",
    "Emmanuelle Charpentier",
    "Casgevy approvazione 2023",
    "Editing genomico",
  ],
  "La Ghiandola Pineale": [
    "Ghiandola pineale melatonina",
    "Epifisi Cartesio sede anima",
    "Occhio parietale",
    "Ritmo circadiano nucleo soprachiasmatico",
  ],
  "La Spiritualità": [
    "Spiritualità esperienza",
    "William James Le varie forme dell'esperienza religiosa",
    "Psicologia transpersonale",
    "Medianità ricerca",
  ],
  "L'Aldilà (Afterlife)": [
    "Near-death experience NDE",
    "Sam Parnia AWARE study",
    "Pim van Lommel Lancet 2001",
    "Bruce Greyson NDE scale",
    "Peter Fenwick",
    "Elisabeth Kubler-Ross",
  ],
  "Gli UFO/UAP (Fenomeni Anomali Non Identificati)": [
    "Kenneth Arnold 1947",
    "J. Allen Hynek Project Blue Book",
    "Jacques Vallee",
    "John Mack Harvard",
    "All-domain Anomaly Resolution Office AARO",
    "NASA UAP independent study 2023",
  ],
  "Gli Extraterrestri": [
    "SETI Carl Sagan",
    "Frank Drake equazione",
    "Paradosso di Fermi",
    "Incontri ravvicinati del terzo tipo classificazione Hynek",
  ],
};

const CROSS_FRONTIER_QUERIES: Record<string, readonly FrontierResearch[]> = {
  "quantum-pineal": [
    {
      name: "Programma STARGATE",
      period: "1972–1995",
      institution: "Stanford Research Institute / CIA & DIA",
      summary:
        "Indagine sperimentale su protocolli di percezione a distanza (Remote Viewing) nel silenzio sensoriale (Ganzfeld) con Russell Targ e Hal Puthoff.",
      verdict:
        "Programma ventennale documentato e declassificato; oltre vent'anni di sessioni con protocolli a bersaglio cieco.",
      institutionalConclusion:
        "La prof.ssa Jessica Utts concluse per un'anomalia statistica; Ray Hyman respinse le conclusioni metodologiche; la CIA chiuse il programma nel 1995 per assenza di affidabilità operativa per l'intelligence.",
      openQuestion:
        "Se un eventuale effetto esista al di là delle condizioni operative dell'intelligence: nessuna delle due conclusioni (Utts, Hyman) coincide con una confutazione. Il giudizio della CIA è un giudizio, non un esperimento.",
    },
    {
      name: "Orch-OR (Orchestrated Objective Reduction)",
      period: "1994–presente",
      institution: "Università di Oxford / Università dell'Arizona",
      summary:
        "Teoria di Roger Penrose e Stuart Hameroff sul calcolo quantistico e riduzione obiettiva nei microtubuli neuronali.",
      verdict:
        "Modello teorico matematicamente articolato e pubblicamente discusso da oltre vent'anni.",
      institutionalConclusion:
        "La comunità della fisica e delle neuroscienze lo considera non dimostrato a temperature corporee ordinarie.",
      openQuestion:
        "Se la coerenza quantistica possa sussistere nei microtubuli in vivo: nessun esperimento diretto l'ha ancora confermato o escluso in modo definitivo.",
    },
    {
      name: "Esperimenti PEAR",
      period: "1979–2007",
      institution: "Princeton University",
      summary:
        "Ricerche guidate da Robert Jahn sull'eventuale interazione tra coscienza umana e generatori quantistici casuali (RNG).",
      verdict:
        "Trent'anni di dati raccolti con rigidi controlli sperimentali presso un laboratorio universitario.",
      institutionalConclusion:
        "L'università chiuse il laboratorio nel 2007; i segnali statistici furono giudicati deboli e non replicati in modo indipendente.",
      openQuestion:
        "Se i deviazioni osservate fossero artefatti o effetti reali: la chiusura di un laboratorio non è una replica negativa.",
    },
  ],
  "crispr-afterlife": [
    {
      name: "The AWARE Study",
      period: "2008–presente",
      institution: "New York Langone Health",
      summary:
        "Studio clinico multicentrico prospettico guidato dal dott. Sam Parnia sulla consapevolezza durante la rianimazione cardiopolmonare.",
      verdict:
        "Dimostrata la persistenza di attività mentale organizzata e lucida durante l'arresto cardiaco in una percentuale di sopravvissuti.",
      institutionalConclusion:
        "Pubblicato su riviste sottoposte a revisione paritaria; i bersagli visivi nascosti non furono identificati dai pazienti.",
      openQuestion:
        "Se la consapevolezza lucida possa includere percezione verificabile dell'ambiente esterno oltre la dissoluzione dell'attività cerebrale misurata.",
    },
    {
      name: "Studi Prospettici NDE di Lancet",
      period: "1988–2001",
      institution: "Rijnstate Hospital / The Lancet",
      summary:
        "Studio prospettico guidato dal cardiologo Pim van Lommel su 344 pazienti rianimati da arresto cardiaco.",
      verdict:
        "Pubblicato su The Lancet (2001); documenta la persistenza trasformativa dell'esperienza NDE non riducibile a semplice ipossia.",
      institutionalConclusion:
        "Pubblicato su The Lancet con revisione paritaria; il dibattito scientifico sull'interpretazione resta aperto.",
      openQuestion:
        "Se l'esperienza lucida durante l'arresto cardiaco richieda un meccanismo cerebrale non ancora identificato o ne prescinda: questione irrisolta.",
    },
    {
      name: "The Omega Project",
      period: "1990–1992",
      institution: "University of Connecticut",
      summary:
        "Indagine sociologica e psicologica di Kenneth Ring sulle omologie trasformative tra testimoni di NDE ed esperienze anomale.",
      verdict:
        "Documenta una riorganizzazione stabile della personalità, dei valori morali e della sensibilità ecologica a seguito dell'evento.",
    },
  ],
  "spirituality-uap": [
    {
      name: "Studi di Harvard sui Testimoni",
      period: "1990–2004",
      institution: "Harvard Medical School / Cambridge Hospital",
      summary:
        "Indagini cliniche e psichiatriche dello psichiatra premio Pulitzer John E. Mack sui testimoni di incontri ravvicinati.",
      verdict:
        "Esclusa la presenza di patologie psicotiche nei testimoni; confermata la realtà fenomenologica e trasformativa del vissuto.",
      institutionalConclusion:
        "Harvard aprì un procedimento disciplinare contro Mack; il caso si concluse senza comminazioni e Mack mantenne la cattedra.",
      openQuestion:
        "Se il vissuto anomalo corrisponda a un evento esterno o a un'attivazione endogena non ancora mappata: nessuna delle due ipotesi è stata confutata.",
    },
    {
      name: "Un mito moderno: cose che si vedono in cielo",
      period: "1958",
      institution: "Scuola di Psicologia Analitica di Zurigo",
      summary:
        "Analisi di Carl Gustav Jung sulla natura archetipica e numinosa dei dischi volanti come proiezioni di totalità della psiche collettiva nell'era atomica.",
      verdict:
        "Opera cardine della psicologia del sacro contemporaneo e dell'antropologia del simbolo tecnologico.",
    },
    {
      name: "Passport to Magonia",
      period: "1969",
      institution: "Northwestern University / Stanford",
      summary:
        "Ricerca dell'astrofisico e informatico Jacques Vallée sulla perfetta continuità tra il folklore spirituale/fatato antico e la moderna fenomenologia UAP.",
      verdict:
        "Fondazione dell'ipotesi parafisica e dell'analisi comparata del folklore e dei dati radar.",
    },
  ],
};

async function searchWikiArticle(
  query: string,
  lang: "it" | "en" = "it",
): Promise<{ title: string; extract: string; lang: string } | undefined> {
  try {
    const url = `https://${lang}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
      query,
    )}&utf8=&format=json&origin=*`;

    const res = await fetch(url);
    if (!res.ok) return undefined;
    const data = await res.json();
    const hit = data.query?.search?.[0];
    if (!hit) return undefined;

    const extractUrl = `https://${lang}.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=&explaintext=&pageids=${hit.pageid}&format=json&origin=*`;
    const exRes = await fetch(extractUrl);
    if (!exRes.ok) return undefined;
    const exData = await exRes.json();
    const text = exData.query?.pages?.[hit.pageid]?.extract;
    if (!text || text.length < 20) return undefined;

    return {
      title: hit.title,
      extract: text.slice(0, 400).replace(/\s+/g, " ").trim(),
      lang,
    };
  } catch {
    return undefined;
  }
}

/**
 * Compie la scansione documentale del web all'inizio della giornata.
 */
export async function performWebResearch(
  first: Topic,
  second: Topic,
): Promise<ResearchDossier> {
  const queriesA = TOPIC_WEB_QUERIES[first.title] || [first.title];
  const queriesB = TOPIC_WEB_QUERIES[second.title] || [second.title];
  const extracts: { title: string; extract: string; lang: string }[] = [];
  const highlightTermsSet = new Set<string>();

  // Aggiungiamo i termini essenziali del titolo
  highlightTermsSet.add(first.title);
  highlightTermsSet.add(second.title);

  // Scansione parallela su Wikipedia IT ed EN per il Vettore A e B
  const promisesA = queriesA.slice(0, 3).map((q) => searchWikiArticle(q, "it"));
  const promisesB = queriesB.slice(0, 3).map((q) => searchWikiArticle(q, "it"));
  const promisesEn = [queriesA[0], queriesB[0]].map((q) => searchWikiArticle(q, "en"));

  const rawResults = await Promise.allSettled([
    ...promisesA,
    ...promisesB,
    ...promisesEn,
  ]);

  for (const r of rawResults) {
    if (r.status === "fulfilled" && r.value) {
      extracts.push(r.value);
      highlightTermsSet.add(r.value.title);
      // Estraiamo anni a 4 cifre (1800-2029) e nomi propri principali
      const years = r.value.extract.match(/\b(19\d\d|20\d\d)\b/g);
      if (years) {
        years.slice(0, 4).forEach((y) => highlightTermsSet.add(y));
      }
    }
  }

  // Identifichiamo ricerche di frontiera specifiche per la coppia, usando i titoli
  const combo = `${first.title} ${second.title}`;
  const has = (needle: string) => combo.includes(needle);
  let frontierResearches: readonly FrontierResearch[] = [];
  if (has("Quantistica") && has("Pineale")) {
    frontierResearches = CROSS_FRONTIER_QUERIES["quantum-pineal"];
  } else if (has("CRISPR") && has("Aldilà")) {
    frontierResearches = CROSS_FRONTIER_QUERIES["crispr-afterlife"];
  } else if (has("Spiritualità") && has("UFO")) {
    frontierResearches = CROSS_FRONTIER_QUERIES["spirituality-uap"];
  }

  frontierResearches.forEach((fr) => {
    highlightTermsSet.add(fr.name);
    if (fr.period) highlightTermsSet.add(fr.period);
    if (fr.institution) highlightTermsSet.add(fr.institution);
  });

  // Aggiungiamo i pionieri storici universali noti
  const UNIVERSAL_PIONEERS = [
    "Friedrich Jürgenson",
    "Konstantin Raudive",
    "Marcello Bacci",
    "Kenneth Arnold",
    "J. Allen Hynek",
    "Jacques Vallée",
    "John Mack",
    "Carl Sagan",
    "Jennifer Doudna",
    "Emmanuelle Charpentier",
    "Cas9",
    "Casgevy",
    "Sam Parnia",
    "Pim van Lommel",
    "Bruce Greyson",
    "Peter Fenwick",
    "Russell Targ",
    "Hal Puthoff",
    "Ingo Swann",
    "Jessica Utts",
    "Ray Hyman",
    "Robert Jahn",
    "Stephen LaBerge",
    "Roger Penrose",
    "Stuart Hameroff",
    "Herbert Benson",
    "Rachel Yehuda",
    "Viktor Frankl",
    "Carl Gustav Jung",
    "STARGATE",
    "PEAR",
    "Ganzfeld",
    "The AWARE Study",
    "The Omega Project",
    "Orch-OR",
    "Project Blue Book",
    "AARO",
  ];

  UNIVERSAL_PIONEERS.forEach((p) => {
    highlightTermsSet.add(p);
  });

  return {
    topicA: first.title,
    topicB: second.title,
    scannedAt: new Date().toISOString(),
    figuresA: [],
    figuresB: [],
    frontierResearches,
    highlightTerms: Array.from(highlightTermsSet).filter((t) => t.length > 2),
    rawExtracts: extracts,
  };
}
