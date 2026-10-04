import type { Phase1Output } from "./schemas";
import type { Topic } from "./topics";

const CORE_RULES = `
Sei il motore filosofico, letterario e di frontiera di ALKIMIA. Il tuo scopo è prendere due concetti apparentemente lontani e portare alla luce nessi inattesi, significanze profonde e la nascita di un TERZO CAMPO EMERGENTE (A + B -> C) capace di sostenere un grande saggio narrativo.
REGOLE ALCHEMICHE DI QUALITÀ
1. PRIMA SCOPRI IL NESSO, POI GIUDICALO: l'intuizione deve essere brillante, sorprendente e folgorante, ma ancorata a elementi reali dei due argomenti.
2. SPECIFICITÀ ASSOLUTA: la connessione deve valere SOLO per questa specifica coppia di concetti, non essere una formula astratta applicabile a tutto.
3. NON CADERE NELLA PSEUDOSCIENZA: non affermare che un organo biologico o un fenomeno anomalo compia miracoli fisici non dimostrati. L'intuizione nasce dall'isomorfismo strutturale, dalla traslazione di scala o dalla risonanza antropologica, non da false equivalenze causali.
4. DISTINGUI SEMPRE: fatto oggettivo; esperienza soggettiva/testimonianza; interpretazione culturale; ipotesi filosofica.
5. CUSTODISCI LA MOLTEPLICITÀ: l'esplorazione non deve convergere prematuramente su una sola idea monolitica. Tieni aperte 2–4 possibilità con pari dignità documentaria.
6. SCRIVI IN ITALIANO SAGGISTICO E LETTERARIO: prosa densa, elegante, incisiva, alla maniera di Calvino, Borges o Simon Winchester.
7. REGOLA ANTI-VAGHEZZA: respingi formule autosufficienti come "profonda connessione", "nuova visione della realtà", "materia e significato si incontrano", "il sistema si trasforma". Ogni affermazione astratta deve nominare: CHE COSA viene modificato, ATTRAVERSO QUALE MECCANISMO e QUALE CONSEGUENZA osservabile o culturale produce.
8. REGOLA DI SPECIFICITÀ: se una frase può essere riutilizzata quasi invariata per un'altra coppia, riscrivila. Ogni intuizione deve contenere almeno due elementi esclusivi dei due argomenti estratti.
9. REGOLA DEI TRE PIANI EPISTEMICI: per ogni ricerca di frontiera distingui sempre tre piani che non vanno mai confusi.
   (a) FATTO DOCUMENTATO: che cosa è stato fatto, da chi, quando.
   (b) GIUDIZIO ISTITUZIONALE: che cosa ne ha concluso l'ente che l'ha condotta o chiusa. È un giudizio attribuito, non una verità stabilita.
   (c) DOMANDA APERTA: che cosa rimane da verificare con nuova sperimentazione.
   La chiusura o il verdetto di un'istituzione NON è mai una confutazione. Dire «la CIA lo studiò, quindi funziona» è lo stesso identico errore logico di dire «la CIA lo chiuse, quindi non funziona»: due salti speculari, nessuno dei quali è sperimentazione. Prima si sperimenta, poi si giudica.
10. REGOLA DEL GIUDIZIO SOSPESO: non emettere verdetto di colpevolezza su nessun fenomeno. Usa sempre formule come "non ancora dimostrato", "questione aperta", "irrisolto", "non confutato". Non trattare mai il bias di autorità (istituzionale o accademico) come se fosse un dato empirico.
`;

function topicBlock(label: string, topic: Topic) {
  return `${label}\nTITOLO: ${topic.title}\nDOSSIER EDITORIALE: ${topic.description}`;
}

export function phase1Prompt(first: Topic, second: Topic) {
  return `${CORE_RULES}
FASE 1 — LA SCOMPOSIZIONE
Analizza separatamente i due argomenti estraendo la loro infrastruttura oggettiva, il contesto e la risonanza esistenziale.
${topicBlock("ARGOMENTO I — VETTORE A", first)}
${topicBlock("ARGOMENTO II — VETTORE B", second)}
Rispondi in formato JSON valido con questa struttura esatta:
{
  "whenWhere": { "a": "contesto e radici storiche di A", "b": "contesto e radici storiche di B" },
  "what": { "a": "definizione oggettiva di A", "b": "definizione oggettiva di B" },
  "how": { "a": "meccanismo e strumenti di A", "b": "meccanismo e strumenti di B" },
  "who": { "a": "percezione umana e impatto di A", "b": "percezione umana e impatto di B" },
  "whichBoundary": { "a": "limite e confine sfidato da A", "b": "limite e confine sfidato da B" },
  "whyVeiled": { "a": "domanda di profondità aperta da A", "b": "domanda di profondità aperta da B" }
}
`;
}

export function phase2Prompt(first: Topic, second: Topic, phase1: Phase1Output) {
  return `${CORE_RULES}
FASE 2 — LA TERZA VIA E IL CAMPO EMERGENTE (A + B -> C)
Prendi i fatti e le strutture della FASE 1 e fondi i due concetti per generare un TERZO CAMPO EMERGENTE C, irriducibile ad A e B presi singolarmente.
ATTENZIONE: ALKIMIA non cerca similitudini poetiche ("A somiglia a B"). Mette in comunicazione due campi di conoscenza affinché generino una nuova intuizione olistica C che nessuno dei due, da solo, potrebbe vedere.
TEST DELLA TERZA VIA:
Se togli A, il Campo Emergente C deve crollare. Se togli B, C deve crollare allo stesso modo. Se C sopravvive senza uno dei due, è solo un'analogia superficiale e va respinta.
I 5 ANGOLI DELLA FUSIONE ALCHEMICA:
1. capacita: La capacità esportabile di A (strumento tecnico che A offre a B)
2. puntoCieco: Il punto cieco di B (enigma irrisolto di B che attende la dissezione di A)
3. mutazione: La mutazione reciproca (come B costringe A a trasformarsi)
4. oggettoInedito: L'oggetto inedito di C (il fenomeno nuovo reso visibile dalla Terza Via)
5. metodoIbrido: Il metodo ibrido di indagine (il protocollo nato dalla fusione)
REGOLA ANTI-COPIA:
La FASE 2 usa i FATTI della FASE 1, ma MAI le sue FRASI. Nessun testo tra parentesi o citazioni grezze dei dossier.
${topicBlock("ARGOMENTO I — VETTORE A", first)}
${topicBlock("ARGOMENTO II — VETTORE B", second)}
LE 12 RISPOSTE DELLA FASE 1:
${JSON.stringify(phase1, null, 2)}
Rispondi in formato JSON valido con questa struttura esatta:
{
  "capacita": { "sparkTitle": "...", "collisionPassage": "...", "anchoragePassage": "...", "significancePassage": "...", "verdict": "...", "score": { "surprise": 5, "specificity": 5, "significance": 5, "anchorage": 5 } },
  "puntoCieco": { "sparkTitle": "...", "collisionPassage": "...", "anchoragePassage": "...", "significancePassage": "...", "verdict": "...", "score": { "surprise": 5, "specificity": 5, "significance": 5, "anchorage": 5 } },
  "mutazione": { "sparkTitle": "...", "collisionPassage": "...", "anchoragePassage": "...", "significancePassage": "...", "verdict": "...", "score": { "surprise": 5, "specificity": 5, "significance": 5, "anchorage": 5 } },
  "oggettoInedito": { "sparkTitle": "...", "collisionPassage": "...", "anchoragePassage": "...", "significancePassage": "...", "verdict": "...", "score": { "surprise": 5, "specificity": 5, "significance": 5, "anchorage": 5 } },
  "metodoIbrido": { "sparkTitle": "...", "collisionPassage": "...", "anchoragePassage": "...", "significancePassage": "...", "verdict": "...", "score": { "surprise": 5, "specificity": 5, "significance": 5, "anchorage": 5 } },
  "tribunal": [
    { "angleTitle": "La Capacità Esportabile di A", "title": "...", "claim": "...", "objection": "...", "survives": "...", "role": "pillar", "pillarName": "...", "chapter": "..." },
    { "angleTitle": "Il Punto Cieco di B", "title": "...", "claim": "...", "objection": "...", "survives": "...", "role": "pillar", "pillarName": "...", "chapter": "..." },
    { "angleTitle": "La Mutazione Reciproca", "title": "...", "claim": "...", "objection": "...", "survives": "...", "role": "sovereign", "pillarName": "...", "chapter": "..." },
    { "angleTitle": "L'Oggetto Inedito di C", "title": "...", "claim": "...", "objection": "...", "survives": "...", "role": "counterpoint", "pillarName": "...", "chapter": "..." },
    { "angleTitle": "Il Metodo Ibrido di Indagine", "title": "...", "claim": "...", "objection": "...", "survives": "...", "role": "pillar", "pillarName": "...", "chapter": "..." }
  ],
  "sovereignThesis": {
    "title": "...",
    "body": "...",
    "verdict": "...",
    "redThread": "...",
    "score": { "surprise": 5, "specificity": 5, "significance": 5, "anchorage": 5 },
    "emergentField": {
      "fieldName": "...",
      "foundationalQuestion": "...",
      "newObject": "...",
      "hybridMethod": "...",
      "candidateTheory": "..."
    }
  },
  "semanticContract": {
    "thesis": "...",
    "concepts": [
      { "role": "operazione", "term": "...", "definition": "..." },
      { "role": "oggetto", "term": "...", "definition": "..." },
      { "role": "struttura", "term": "...", "definition": "..." },
      { "role": "teoria", "term": "...", "definition": "..." },
      { "role": "unità", "term": "...", "definition": "..." },
      { "role": "meccanismo", "term": "...", "definition": "..." }
    ]
  }
}
`;
}

export function phase3Prompt(first: Topic, second: Topic, phase2: unknown) {
  return `${CORE_RULES}
FASE 3 — IL SALTO (L'ESPLORAZIONE OLTRE IL CONOSCIUTO)
Ricevi il Ponte Sovrano e il Campo Emergente C della FASE 2. 
ATTENZIONE METODOLOGICA: La FASE 2 ha generato la Terza Via C; la FASE 3 deve esplorare cosa c'è oltre il noto lungo 5 operatori di trasformazione.
${topicBlock("ARGOMENTO I — VETTORE A", first)}
${topicBlock("ARGOMENTO II — VETTORE B", second)}
RISULTATO DELLA FASE 2:
${JSON.stringify(phase2, null, 2)}
I 5 OPERATORI DEL SALTO:
1. inversione: Inversione della causalità
2. soglia: La condizione di soglia
3. supporto: Traslazione di supporto
4. scala: Espansione di scala e durata
5. proibita: La possibilità proibita
Rispondi in formato JSON valido con questa struttura esatta:
{
  "inversione": { "sparkTitle": "...", "domain": "...", "genealogyMode": "genealogia", "researchName": "...", "hypothesisPassage": "...", "genealogyPassage": "...", "manifestationPassage": "...", "falsificationPassage": "...", "status": "dignified" },
  "soglia": { "sparkTitle": "...", "domain": "...", "genealogyMode": "terra-incognita", "researchName": "...", "hypothesisPassage": "...", "genealogyPassage": "...", "manifestationPassage": "...", "falsificationPassage": "...", "status": "dignified" },
  "supporto": { "sparkTitle": "...", "domain": "...", "genealogyMode": "genealogia", "researchName": "...", "hypothesisPassage": "...", "genealogyPassage": "...", "manifestationPassage": "...", "falsificationPassage": "...", "status": "dignified" },
  "scala": { "sparkTitle": "...", "domain": "...", "genealogyMode": "genealogia", "researchName": "...", "hypothesisPassage": "...", "genealogyPassage": "...", "manifestationPassage": "...", "falsificationPassage": "...", "status": "dignified" },
  "proibita": { "sparkTitle": "...", "domain": "...", "genealogyMode": "genealogia", "researchName": "...", "hypothesisPassage": "...", "genealogyPassage": "...", "manifestationPassage": "...", "falsificationPassage": "...", "status": "rejected", "rejectionReason": "..." },
  "confrontation": {
    "outcome": "contrappunto",
    "outcomeLabel": "...",
    "analysis": "...",
    "explorationAgenda": "..."
  }
}
`;
}

export function phase4Prompt(first: Topic, second: Topic, phase3: unknown) {
  return `${CORE_RULES}
FASE 4 & 5 — LE CONSEGUENZE & I CINQUE AFFONDI
Ricevi la costellazione di Intuizioni Aperte della FASE 3.
${topicBlock("ARGOMENTO I — VETTORE A", first)}
${topicBlock("ARGOMENTO II — VETTORE B", second)}
RISULTATO DELLA FASE 3:
${JSON.stringify(phase3, null, 2)}
Rispondi in formato JSON valido con questa struttura esatta:
{
  "constellationSummary": "...",
  "hypothesisConsequences": [
    { "jumpId": 1, "jumpTitle": "...", "rank": 1, "horizon": "ora", "outcomePassage": "...", "criticalPassage": "...", "movementPassage": "..." },
    { "jumpId": 2, "jumpTitle": "...", "rank": 2, "horizon": "ora", "outcomePassage": "...", "criticalPassage": "...", "movementPassage": "..." },
    { "jumpId": 3, "jumpTitle": "...", "rank": 3, "horizon": "poi", "outcomePassage": "...", "criticalPassage": "...", "movementPassage": "..." },
    { "jumpId": 4, "jumpTitle": "...", "rank": 4, "horizon": "frontiera", "outcomePassage": "...", "criticalPassage": "...", "movementPassage": "..." }
  ],
  "cuiProdest": "Paragrafo 1: beneficiari clinici ed esistenziali...\\n\\nParagrafo 2: beneficiari della ricerca interdisciplinare...\\n\\nParagrafo 3: beneficiari culturali e filosofici...",
  "innovativeDiscovery": "Paragrafo 1: la rivelazione della Terza Via C...\\n\\nParagrafo 2: cosa comprendiamo di inedito sulla realtà e sulla mente...",
  "notInvestigated": "Paragrafo 1: i veri punti ciechi tra i due ambiti...\\n\\nParagrafo 2: le lacune metodologiche da superare...",
  "researchFocus": "Paragrafo 1: la grande postura metodologica del doppio binario...\\n\\nParagrafo 2: l'atteggiamento etico della ricerca senza riduzionismi...",
  "possibleDiscovery": "Paragrafo 1: la vertigine cosmologica se il velo cadesse...\\n\\nParagrafo 2: la nuova immagine della specie umana nell'universo...",
  "epilogue": {
    "title": "...",
    "passages": [
      "Se una conferma arrivasse...",
      "Se invece la smentita fosse netta...",
      "Davanti a esiti parziali o ambigui...",
      "Oggi possiamo sostenere..."
    ],
    "narrativePromise": "..."
  }
}
`;
}