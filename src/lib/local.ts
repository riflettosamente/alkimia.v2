/**
 * Motore locale di riserva.
 *
 * Genera un documento strutturalmente completo senza alcuna chiamata di rete.
 * È il contenuto provvisorio mostrato quando manca la chiave Groq o quando il
 * provider fallisce: per questo dichiara apertamente la propria natura.
 */
import { dayKey, drawRandomPair } from "./draw";
import { DOCUMENT_VERSION } from "./types";
import type { DailyDocument, GenerationStage } from "./types";
import type { Phase1Output, Phase2Output, Phase3Output, Phase4Output } from "./schemas";
import { TOPICS } from "./topics";
import { TOPIC_PROFILES } from "./profiles";
import type { TopicProfile } from "./profiles";
import { performWebResearch } from "./web-research";

type Progress = (stage: GenerationStage) => Promise<void> | void;

/**
 * FASE I locale — stessa composizione di phase1For() in local-generator.ts
 * del repository: ogni lente attinge ai campi del dossier operativo.
 */
function phase1(a: TopicProfile, b: TopicProfile): Phase1Output {
  const make = (key: keyof TopicProfile) => ({ a: a[key], b: b[key] });
  return {
    whenWhere: make("history"),
    what: {
      a: `${a.objective} ${a.epistemicStatus}`,
      b: `${b.objective} ${b.epistemicStatus}`,
    },
    how: make("mechanism"),
    who: {
      a: `${a.people} ${a.impact}`,
      b: `${b.people} ${b.impact}`,
    },
    whichBoundary: make("boundary"),
    whyVeiled: make("deepQuestion"),
  };
}

function phase2(
  firstTitle: string,
  secondTitle: string,
  pa: TopicProfile,
  pb: TopicProfile,
): Phase2Output {
  const angle = (spark: string, a: string, b: string, c: string, verdict: string, s: number) => ({
    sparkTitle: spark,
    collisionPassage: `${a} — e proprio in questo punto ${b}. La collisione non è una similitudine: mostra che ${c}`,
    anchoragePassage: `Da una parte ${firstTitle.toLowerCase()} con i suoi fatti documentati; dall'altra ${secondTitle.toLowerCase()} con i propri. Gli ancoraggi sono reali e distinti: resta da verificarne l'intreccio.`,
    significancePassage: `Ciò che cambia è la domanda possibile: non più due dossier separati, ma un unico problema che nessuno dei due campi porrebbe da solo. Non affermiamo identità causale tra i due sistemi.`,
    verdict,
    score: { surprise: s, specificity: s, significance: s, anchorage: 4 },
  });

  const tribunal = [
    { n: "I", angleTitle: "La Capacità Esportabile di A", title: "Lo strumento che attraversa", role: "pillar" as const },
    { n: "II", angleTitle: "Il Punto Cieco di B", title: "L'archivio irrisolto", role: "pillar" as const },
    { n: "III", angleTitle: "La Mutazione Reciproca", title: "Il metodo che si trasforma", role: "sovereign" as const },
    { n: "IV", angleTitle: "L'Oggetto Inedito di C", title: "Il fenomeno senza nome", role: "counterpoint" as const },
    { n: "V", angleTitle: "Il Metodo Ibrido di Indagine", title: "Il protocollo della terza via", role: "pillar" as const },
  ].map((entry) => ({
    angleTitle: entry.angleTitle,
    title: entry.title,
    claim: `La collisione tra ${firstTitle} e ${secondTitle} rende possibile una lettura che nessuno dei due campi compie da solo.`,
    objection: `Obiezione del Tribunale: si rischia di scambiare una risonanza concettuale per un nesso reale, senza dato che li leghi.`,
    survives: `Sopravvive la struttura essenziale, purché resti distinto ciò che è documentato da ciò che è ipotesi.`,
    role: entry.role,
    pillarName: entry.title,
    chapter: `Capitolo ${entry.n} · ${entry.angleTitle}`,
  }));

  return {
    capacita: angle(
      `Lo strumento di ${firstTitle} applicato a ${secondTitle}`,
      `${firstTitle} offre un metodo che ${secondTitle} non possiede`,
      `quel metodo applicato al suo archivio apre una lettura nuova`,
      `le due discipline condividono un'operazione, non un oggetto`,
      "Ponte valido: la capacità è reale e il bersaglio è documentato.",
      4,
    ),
    puntoCieco: angle(
      `Il punto cieco di ${secondTitle}`,
      `${secondTitle} conserva domande che i suoi strumenti non riescono ad aprire`,
      `${firstTitle} porta la luce analitica esattamente su quel punto`,
      `l'incrocio rivela dove il secondo metodo si arresta`,
      "Ponte fecondo: il vuoto è reale e la luce è pertinente.",
      4,
    ),
    mutazione: angle(
      `La mutazione reciproca`,
      `il contatto con ${secondTitle} costringe ${firstTitle} a rivedere il proprio riduzionismo`,
      `il metodo si allarga senza perdere il rigore`,
      `nessuno dei due resta identico dopo l'incontro`,
      "Ponte guadagnato: la trasformazione del metodo è la scoperta.",
      5,
    ),
    oggettoInedito: angle(
      `L'oggetto inedito della Terza Via`,
      `la fusione rende visibile un fenomeno che non appartiene a nessuno dei due campi`,
      `se togli A l'oggetto crolla, se togli B crolla allo stesso modo`,
      `nasce un terzo campo con nome, domanda e metodo propri`,
      "Terza Via superata: l'oggetto è irriducibile.",
      5,
    ),
    metodoIbrido: angle(
      `Il metodo ibrido d'indagine`,
      `dai due campi si compone un protocollo che nessuno dei due praticherebbe`,
      `il protocollo integra il rigore del primo e la profondità fenomenologica del secondo`,
      `è il programma di ricerca della disciplina che ancora non esiste`,
      "Programma di ricerca articolato e falsificabile in principio.",
      4,
    ),
    tribunal,
    sovereignThesis: {
      title: `La Terza Via: ${firstTitle} e ${secondTitle}`,
      body: `La fusione tra ${firstTitle} e ${secondTitle} genera un campo emergente irriducibile ai due termini. Se si toglie uno dei due, il campo crolla: è questa la prova di non ridondanza che il Tribunale richiede.`,
      verdict: "Terza Via Sovrana della FASE 2: supera il test di irriducibilità.",
      redThread: `Il saggio seguirà il filo che dalla capacità del primo argomento conduce all'archivio irrisolto del secondo, per poi spostarsi oltre entrambi.`,
      score: { surprise: 4, specificity: 4, significance: 5, anchorage: 4 },
      emergentField: {
        fieldName: `Scienza Integrata di ${pa.shortName} e ${pb.shortName}`,
        foundationalQuestion: `Quale nuovo orizzonte di conoscenza diventa accessibile quando gli strumenti di ${pa.shortName} interrogano l'invisibile di ${pb.shortName}?`,
        newObject: `L'invariante di trasformazione sistemica tra ${pa.transformation} e ${pb.transformation}`,
        hybridMethod: `Integrazione di ${pa.method} e ${pb.method} con controlli incrociati`,
        candidateTheory: "Isomorfismo della propagazione: dall'unità modificata al sistema trasformato.",
      },
    },
    semanticContract: {
      thesis: `${firstTitle} e ${secondTitle} condividono una struttura di trasformazione da seguire dall'unità locale al sistema.`,
      concepts: [
        { role: "operazione", term: "Trapianto metodologico", definition: `Il metodo di ${firstTitle} applicato al territorio di ${secondTitle}.` },
        { role: "struttura", term: "Isomorfismo sistemico", definition: "La corrispondenza tra evento modificante, unità trasformata e fenotipo emergente." },
        { role: "unità", term: "Unità trasformata", definition: "Il punto locale in cui la collisione produce un prima e un dopo riconoscibili." },
        { role: "meccanismo", term: "Propagazione di livello", definition: "Il processo con cui una trasformazione locale modifica il sistema complessivo." },
        { role: "distorsione", term: "Effetto fuori bersaglio", definition: "La conseguenza imprevista o la sovrainterpretazione prodotta durante la propagazione." },
        { role: "ricerca-effetti", term: "Cartografia della propagazione", definition: "La ricerca proposta per seguire la trasformazione dall'unità al sistema." },
      ],
    },
  };
}

function phase3(firstTitle: string, secondTitle: string): Phase3Output {
  const operators = [
    { key: "inversione", title: "Inversione della Causalità", domain: "Neurofisiologia e causalità invertita" },
    { key: "soglia", title: "La Condizione di Soglia", domain: "Stati limite e coscienza" },
    { key: "supporto", title: "Traslazione di Supporto", domain: "Simbolo, memoria, immaginario" },
    { key: "scala", title: "Espansione di Scala e Durata", domain: "Tempo profondo e sistemi" },
    { key: "proibita", title: "La Possibilità Proibita", domain: "Frontiera radicale e protocollo cieco" },
  ] as const;

  const card = (op: (typeof operators)[number], id: number, rejected: boolean) => ({
    sparkTitle: `${op.title} — ${firstTitle.toLowerCase()} su ${secondTitle.toLowerCase()}`,
    domain: op.domain,
    genealogyMode: id % 2 === 0 ? ("terra-incognita" as const) : ("genealogia" as const),
    researchName: `Progetto ${op.title.split(" ")[0]} della coppia ${id}`,
    hypothesisPassage: `Se la freccia dell'influenza venisse rovesciata, la relazione tra ${firstTitle.toLowerCase()} e ${secondTitle.toLowerCase()} cesserebbe di essere unidirezionale: il secondo termine non riceve più, seleziona.`,
    genealogyPassage: `Il precedente va cercato nella letteratura che ha già trattato questa direzione: ricerche documentate da un lato, confine inesplorato dall'altro. Dichiariamo apertamente dove la genealogia si interrompe.`,
    manifestationPassage: `Il primo protocollo misura ciò che dovrebbe apparire: osservabili definiti, campione, controllo, soglia di rilevanza, e la condizione per cui il risultato sarebbe interessante anche se negativo.`,
    falsificationPassage: `Il patto con il fallimento: l'ipotesi cade se la correlazione scompare sotto controllo cieco, se l'effetto è riproducibile con dati casuali, o se il meccanismo proposto risulta fisicamente impossibile.`,
    status: rejected ? ("rejected" as const) : ("dignified" as const),
    rejectionReason: rejected
      ? "Sospeso dalla Soglia: il campo epistemico è già coperto da un salto ammesso; nessuna variante della stessa ipotesi."
      : undefined,
  });

  const cards = operators.map((op, index) => card(op, index + 1, index === 4));

  return {
    inversione: cards[0],
    soglia: cards[1],
    supporto: cards[2],
    scala: cards[3],
    proibita: cards[4],
    confrontation: {
      outcome: "complemento",
      outcomeLabel: "Complemento organico: le strade si integrano senza sovrapporsi",
      analysis: `I quattro salti ammessi non competono: due operano sul presente della persona e due sul futuro del sistema. Letti insieme, descrivono la stessa mappa da scale diverse.`,
      emergentSynthesis: `La sintesi emerge dalla convivenza delle scale: nessun singolo salto contiene la totalità del nesso.`,
      explorationAgenda:
        "Ordine di marcia: 1. verifica accessibile subito in laboratorio; 2. integrazione nei protocolli esistenti; 3. avvio del progetto di ricerca; 4. studio longitudinale.",
    },
  };
}

function phase4(firstTitle: string, secondTitle: string): Phase4Output {
  const consequence = (jumpId: number, rank: number, horizon: "ora" | "poi" | "frontiera") => ({
    jumpId,
    jumpTitle: `Intuizione aperta n. ${jumpId}`,
    rank,
    horizon,
    outcomePassage: `Se confermata, questa strada mostrerebbe che ${firstTitle.toLowerCase()} e ${secondTitle.toLowerCase()} non sono domini separati ma scale di un unico processo; se smentita, resterebbe la domanda, più nitida di prima.`,
    criticalPassage: `Il nodo critico è ciò che manca davvero: il dato che nessuno ha ancora raccolto, e il rischio di leggere nel rumore ciò che ci si aspettava di trovare.`,
    movementPassage: `Per questo occupa la posizione ${rank}: il primo esperimento è praticabile ora, e l'evidenza decisiva è quella che potrebbe ragionevolmente arrivare per prima.`,
  });

  return {
    constellationSummary: `La costellazione del giorno intreccia ${firstTitle} e ${secondTitle} in quattro strade parallele: nessuna esaurisce il nesso, ciascuna ne apre una parte.`,
    hypothesisConsequences: [
      consequence(1, 1, "ora"),
      consequence(2, 2, "ora"),
      consequence(3, 3, "poi"),
      consequence(4, 4, "frontiera"),
    ],
    cuiProdest: `Giova innanzitutto a chi studia la frontiera tra i due campi: offre un vocabolario condiviso che evita di riscoprire per ciascuna disciplina ciò che l'altra già sa. Giova poi al lettore, perché sostituisce la vertigine astratta con un ordine di marcia.`,
    innovativeDiscovery: `La scoperta possibile non è un fatto nuovo isolato, ma una mappa: l'identificazione delle zone in cui i due campi si toccano senza sapersi parlare, e la verifica sperimentale di almeno una di esse.`,
    notInvestigated: `Non abbiamo ancora investigato ciò che sarebbe banale verificare: gli studi incrociati che nessuno ha finanziato perché nessuna delle due discipline li ritiene propri.`,
    researchFocus: `Focalizzare significa scegliere: partire dal protocollo più semplice, dotarlo di controllo cieco e preregistrazione, e solo allora allargare la scala.`,
    possibleDiscovery: `Cosa potremmo scoprire: che una parte consistente del dibattito era un problema di traduzione, non di sostanza — e che il resto, quello davvero aperto, è più interessante di quanto entrambe le parti supponessero.`,
    epilogue: {
      title: "Posizione attuale",
      passages: [
        `Quanto finora asserito su ${firstTitle} e ${secondTitle} poggia su fatti documentati, su giudizi istituzionali attribuiti e su domande aperte: i tre piani non vanno confusi.`,
        `Ciò che manca non è un'opinione, ma un esperimento. La smentita resta possibile ed è parte del patto che questo ragionamento sottoscrive.`,
        `La posizione attuale è quindi di vertigine disciplinata: il nesso è plausibile, non dimostrato; la frontiera è vicina, non attraversata.`,
      ],
      narrativePromise: `Il saggio che verrà muoverà da questo punto: dall'atomo che riceve il segnale fino al sistema che lo trasforma, tenendo aperta la domanda fino all'ultima pagina.`,
    },
  };
}

export async function generateLocalDocument(date: Date, onProgress: Progress): Promise<DailyDocument> {
  const day = dayKey(date);
  const { first, second } = drawRandomPair();
  const pair: [number, number] = [first.index, second.index];

  await onProgress("research");
  const dossier = await performWebResearch(first.topic, second.topic);
  await onProgress("phase1");
  const profileA = TOPIC_PROFILES[first.index];
  const profileB = TOPIC_PROFILES[second.index];
  const phase1Out = phase1(profileA, profileB);
  await onProgress("phase2");
  const phase2Out = phase2(first.topic.title, second.topic.title, profileA, profileB);
  await onProgress("phase3");
  const phase3Out = phase3(first.topic.title, second.topic.title);
  await onProgress("phase4");
  const phase4Out = phase4(first.topic.title, second.topic.title);
  await onProgress("saving");

  return {
    version: DOCUMENT_VERSION,
    dayKey: day,
    generatedAt: new Date().toISOString(),
    source: "local",
    model: "motore-locale-di-riserva",
    pair,
    dossier,
    phase1: phase1Out,
    phase2: phase2Out,
    phase3: phase3Out,
    phase4: phase4Out,
  };
}

/** Info sui due argomenti estratti, per l'intestazione. */
export function pairTitles(pair: [number, number]): [string, string] {
  return [TOPICS[pair[0]].title, TOPICS[pair[1]].title];
}
