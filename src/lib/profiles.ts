export type TopicProfile = {
  shortName: string;
  epistemicStatus: string;
  history: string;
  objective: string;
  mechanism: string;
  people: string;
  impact: string;
  boundary: string;
  deepQuestion: string;
  action: string;
  transformation: string;
  observable: string;
  method: string;
  research: string;
  historicalTrace: string;
};

/**
 * Dossier operativi per il motore locale. Sono volutamente sobri: distinguono
 * conoscenze consolidate, esperienze riferite e interpretazioni speculative.
 */
export const TOPIC_PROFILES: readonly TopicProfile[] = [
  {
    shortName: "meccanica quantistica",
    epistemicStatus:
      "È una teoria fisica consolidata, verificata sperimentalmente con enorme precisione. Le sue interpretazioni ontologiche restano discusse; l'entanglement non autorizza segnali più veloci della luce né dimostra che la coscienza crei la realtà.",
    history:
      "Emerge in Europa fra il 1900 e gli anni Venti con Planck, Einstein, Bohr, Heisenberg e Schrödinger, quando spettri atomici, effetto fotoelettrico e stabilità della materia non trovano spiegazione nella fisica classica. Si sviluppa nei laboratori e nelle università industriali del Novecento.",
    objective:
      "Descrive materia e radiazione su scala atomica e subatomica mediante stati, ampiezze di probabilità e osservabili. Sovrapposizione, quantizzazione ed entanglement producono previsioni statistiche controllabili, non licenze generiche per qualunque fenomeno misterioso.",
    mechanism:
      "Si formulano uno stato fisico e la sua evoluzione matematica, poi si progettano misure ripetibili. Esperimenti di interferenza, spettroscopia e test delle disuguaglianze di Bell confrontano distribuzioni osservate e previsioni; strumenti isolati da rumore e decoerenza rendono visibili effetti microscopici.",
    people:
      "La sperimentano direttamente ricercatori e tecnici; la società ne incontra le applicazioni in transistor, laser, sensori e diagnostica. Nel pubblico suscita meraviglia ma anche fraintendimenti, soprattutto quando il ruolo tecnico della misura viene trasformato in una tesi non provata sulla coscienza.",
    impact:
      "Ha cambiato elettronica, comunicazioni, medicina e industria; ha inoltre riscritto l'idea di previsione scientifica, sostituendo in molti casi la traiettoria certa con una distribuzione di esiti. Il suo impatto è misurabile sia nelle tecnologie sia nelle pratiche di laboratorio.",
    boundary:
      "Sfida il confine tra descrizione deterministica e previsione probabilistica e quello tra sistema isolato e apparato di misura. Il limite pratico è la decoerenza: l'interazione con l'ambiente rende fragili gli stati quantistici controllati.",
    deepQuestion:
      "Apre una domanda concreta e ancora discussa: che rapporto esiste fra formalismo probabilistico, risultato individuale e realtà fisica indipendente dalla misura? Le risposte appartengono alle interpretazioni, non a un unico fatto sperimentale conclusivo.",
    action: "trasforma condizioni microscopiche in distribuzioni misurabili di risultati",
    transformation: "probabilità fisica",
    observable: "conteggi di rivelatori, spettri, interferenze e correlazioni statistiche",
    method: "esperimenti controllati, misure ripetute, isolamento dal rumore e confronto quantitativo fra ipotesi",
    research: "definire una previsione numerica, controllare ambiente e strumenti, ripetere la misura e separare l'effetto quantistico dalle spiegazioni classiche",
    historicalTrace: "laboratori, tecnologie elettroniche, nuovi standard di misura e uso culturale spesso improprio della parola «quantistico»",
  },
  {
    shortName: "transcomunicazione strumentale",
    epistemicStatus:
      "È una pratica controversa. Registrazioni e pattern percepiti sono reali come dati acustici, ma non esiste consenso scientifico che dimostrino comunicazioni con entità invisibili; pareidolia, interferenze radio e selezione del segnale restano spiegazioni da controllare.",
    history:
      "Prende forma nel secondo dopoguerra con Friedrich Jürgenson e Konstantin Raudive, nell'ambiente europeo dei registratori a nastro e delle radio. Nasce dove nuove tecnologie di registrazione incontrano il lutto, lo spiritismo e il desiderio di rendere ripetibile il contatto.",
    objective:
      "Consiste nel registrare rumore o segnali elettronici e interpretare alcune tracce come voci o messaggi anomali, spesso chiamati EVP. L'oggetto verificabile è la registrazione; l'origine attribuita alla traccia è l'ipotesi da valutare.",
    mechanism:
      "Si usano registratori, radio, generatori di rumore e software audio; si ascoltano segmenti, si filtrano frequenze e si confrontano interpretazioni. Suggestione, aspettativa, compressione, contaminazione e trasmissioni devono essere controllate con protocolli ciechi.",
    people:
      "La praticano ricercatori indipendenti, gruppi spiritualisti e persone in lutto. Può offrire conforto, fascinazione o ansia; l'ascolto ripetuto e l'interpretazione condivisa possono rafforzare convinzioni e comunità anche senza accordo sull'origine del segnale.",
    impact:
      "Modifica il modo in cui alcune persone elaborano il lutto e attribuiscono intenzione al rumore. Produce archivi, associazioni, rituali tecnici e narrazioni; può anche alimentare dipendenza interpretativa o conflitti con familiari e professionisti.",
    boundary:
      "Sfida il confine fra rumore e messaggio, evento casuale e intenzione. Il limite metodologico è stabilire criteri indipendenti che distinguano un pattern informativo da pareidolia e contaminazione.",
    deepQuestion:
      "Apre la domanda su quanto significato venga trovato nel segnale e quanto venga costruito dall'ascoltatore. L'eventuale origine trascendente resta una possibilità sostenuta dai praticanti, non un risultato scientifico acquisito.",
    action: "estrae e interpreta pattern di senso da registrazioni rumorose",
    transformation: "rumore trasformato in messaggio percepito",
    observable: "file audio, accordo fra ascoltatori, tassi di riconoscimento e condizioni di registrazione",
    method: "registrazioni controllate, ascolto cieco, tracciamento delle interferenze e confronto fra trascrizioni indipendenti",
    research: "preregistrare criteri, usare gruppi di controllo, separare tecnici e interpreti e misurare l'accordo prima di rivelare il contesto",
    historicalTrace: "archivi EVP, pratiche del lutto, comunità di ascolto e adattamento ai supporti dal nastro al software digitale",
  },
  {
    shortName: "CRISPR",
    epistemicStatus:
      "È una piattaforma biotecnologica consolidata, con applicazioni sperimentali e cliniche. Precisione, effetti fuori bersaglio, accessibilità e interventi sulla linea germinale richiedono controlli ed etica rigorosi.",
    history:
      "Le sequenze ripetute vengono osservate nei batteri dagli anni Ottanta; tra il 2012 e il 2013 il sistema CRISPR-Cas9 viene trasformato in strumento programmabile. Nel 2023 arrivano le prime approvazioni di terapie CRISPR per malattie del sangue.",
    objective:
      "È un insieme di strumenti di editing genetico: un RNA guida riconosce una sequenza bersaglio e una proteina come Cas9 taglia il DNA, consentendo alla riparazione cellulare di disattivare, correggere o inserire informazione genetica.",
    mechanism:
      "La guida viene progettata, consegnata alle cellule insieme all'enzima e verificata con sequenziamento e test funzionali. Nelle terapie ex vivo le cellule del paziente vengono prelevate, editate, controllate e reinfuse.",
    people:
      "Coinvolge pazienti, famiglie, clinici, ricercatori, regolatori e comunità esposte a malattie ereditarie. Produce speranza concreta ma anche timori su sicurezza, costi, disuguaglianza ed editing ereditabile.",
    impact:
      "Può ridurre sintomi e crisi in patologie genetiche, cambiare percorsi clinici e ridefinire il rapporto con l'eredità biologica. Gli effetti si misurano in cellule, biomarcatori, ricoveri, eventi avversi e qualità della vita.",
    boundary:
      "Attraversa il confine fra leggere e modificare il genoma, fra terapia e potenziamento, fra scelta individuale ed effetti sulle generazioni future.",
    deepQuestion:
      "Obbliga a chiedere chi possa decidere quali varianti correggere e come distribuire benefici e rischi. La questione nasce da capacità tecniche già reali, non da una possibilità soltanto simbolica.",
    action: "riscrive una sequenza biologica e produce un prima e un dopo cellulare",
    transformation: "riscrittura genetica",
    observable: "sequenze modificate, biomarcatori, sintomi, effetti fuori bersaglio e qualità della vita",
    method: "progettazione della guida, controllo del bersaglio, sequenziamento, studi clinici e follow-up longitudinali",
    research: "misurare efficacia e sicurezza nel tempo, includendo conseguenze biologiche, psicologiche, economiche e familiari",
    historicalTrace: "terapie approvate, protocolli clinici, dibattiti bioetici, regolazione e nuove aspettative sulle malattie ereditarie",
  },
  {
    shortName: "ghiandola pineale",
    epistemicStatus:
      "È una struttura neuroendocrina reale che secerne melatonina e partecipa alla regolazione circadiana. Le associazioni con Terzo Occhio, medianità o varchi dimensionali sono simboliche o speculative; non è dimostrato che meditazione e oscurità la «decalcifichino».",
    history:
      "È descritta nell'anatomia antica e diventa celebre con Cartesio come ipotetica sede dell'anima. Nel Novecento endocrinologia e cronobiologia ne chiariscono il rapporto con luce, melatonina e ritmi sonno-veglia, mentre tradizioni esoteriche la reinterpretano simbolicamente.",
    objective:
      "È una piccola ghiandola endocrina dell'epitalamo. Riceve indirettamente informazioni sul ciclo luce-buio attraverso i circuiti circadiani e contribuisce a regolare la secrezione di melatonina.",
    mechanism:
      "La luce rilevata dalla retina sincronizza il nucleo soprachiasmatico e, attraverso vie nervose, modula la produzione notturna di melatonina. Sonno, esposizione luminosa, età e farmaci possono influire sui ritmi; le affermazioni sulla decalcificazione spirituale non hanno prova clinica consolidata.",
    people:
      "La riguarda chiunque dorma, ma diventa particolarmente evidente in turnisti, viaggiatori con jet lag e persone con disturbi circadiani. Meditatori e comunità spirituali possono attribuirle significati interiori ulteriori.",
    impact:
      "Influenza tempi del sonno e sincronizzazione biologica; luce notturna e orari irregolari possono alterare i ritmi. Sul piano culturale, l'immagine del Terzo Occhio orienta pratiche, aspettative e interpretazioni soggettive.",
    boundary:
      "Si trova al confine operativo fra segnale ambientale luminoso e stato interno dell'organismo. La ricerca deve separare funzione endocrina misurabile e interpretazione spirituale.",
    deepQuestion:
      "Mostra come un segnale esterno semplice possa riorganizzare esperienza, sonno e percezione del tempo. Non dimostra dimensioni sottili, ma rende studiabile il rapporto fra ambiente, fisiologia e stati soggettivi.",
    action: "traduce cicli di luce e buio in segnali ormonali e ritmi biologici",
    transformation: "ritmo biologico",
    observable: "melatonina, orari di sonno, esposizione luminosa, temperatura corporea e resoconti soggettivi",
    method: "cronobiologia, dosaggi ormonali, actigrafia, controllo della luce e diari del sonno",
    research: "confrontare condizioni di luce, sonno e pratiche contemplative misurando insieme indicatori fisiologici ed esperienza soggettiva",
    historicalTrace: "passaggio dalla sede filosofica dell'anima alla ghiandola endocrina, insieme alla persistenza del simbolo del Terzo Occhio",
  },
  {
    shortName: "spiritualità",
    epistemicStatus:
      "È una dimensione umana reale come insieme di esperienze, pratiche, valori e interpretazioni. Le affermazioni su entità o piani trascendenti appartengono a credenze e testimonianze e non sono automaticamente verificabili con metodi scientifici.",
    history:
      "Attraversa tradizioni religiose e filosofiche antiche, ma la categoria moderna di spiritualità si amplia fra Ottocento e Novecento anche fuori dalle istituzioni religiose, con meditazione, occultismo, psicologia e movimenti di ricerca personale.",
    objective:
      "Comprende pratiche e orientamenti rivolti a significato, trascendenza, connessione e trasformazione personale. Può essere religiosa o laica; medianità e contatto con entità costituiscono sottocampi controversi.",
    mechanism:
      "Agisce attraverso rituali, meditazione, preghiera, comunità, narrazioni e disciplina dell'attenzione. Gli effetti possono essere studiati su benessere, comportamento e relazioni; la verità metafisica delle interpretazioni richiede un piano distinto.",
    people:
      "Coinvolge praticanti, comunità, persone in crisi o in lutto e ricercatori del significato. Può produrre conforto, appartenenza, cambiamento etico o, in alcuni contesti, dipendenza da autorità e conflitto con altre interpretazioni.",
    impact:
      "Può modificare abitudini, gestione dello stress, reti sociali, scelte morali e interpretazione di dolore e morte. Gli esiti variano e dipendono da pratiche, contesto e vulnerabilità.",
    boundary:
      "Attraversa il confine fra esperienza interiore e affermazione pubblica sulla realtà. Il limite è rispettare il vissuto senza trasformarlo automaticamente in prova universale.",
    deepQuestion:
      "Chiede come gli esseri umani costruiscano significato e se l'esperienza di trascendenza segnali una realtà esterna, una capacità della mente o entrambe. La ricerca può studiare gli effetti senza chiudere la questione metafisica.",
    action: "organizza esperienza e comportamento attorno a significato e trascendenza",
    transformation: "trasformazione del significato personale",
    observable: "pratiche, benessere riferito, scelte, reti sociali, rituali e cambiamenti di comportamento",
    method: "interviste longitudinali, psicologia, antropologia, confronto tra pratiche e misure di esito dichiarate in anticipo",
    research: "distinguere effetti della pratica, appartenenza comunitaria e credenze metafisiche, includendo benefici e rischi",
    historicalTrace: "tradizioni, rituali, movimenti, istituzioni, linguaggi della trascendenza e forme contemporanee non religiose",
  },
  {
    shortName: "aldilà",
    epistemicStatus:
      "La sopravvivenza personale dopo la morte è un'ipotesi metafisica e religiosa non dimostrata scientificamente. NDE, OOBE e pratiche divinatorie sono esperienze e resoconti reali da studiare, ma non costituiscono da soli prova dell'aldilà.",
    history:
      "Miti funerari e testi sapienziali mappano l'oltremorte fin dall'antichità. Nell'Ottocento spiritismo e medianità tentano forme sperimentali di contatto; nel Novecento medicina rianimatoria e psicologia raccolgono sistematicamente NDE e OOBE.",
    objective:
      "È l'idea che identità o coscienza continuino dopo la morte biologica. L'oggetto empirico accessibile comprende credenze, rituali, testimonianze di esperienze di confine e loro effetti sulle persone.",
    mechanism:
      "Non esiste un meccanismo fisico accertato della sopravvivenza. La ricerca studia condizioni mediche, memoria, fenomenologia e conseguenze delle NDE; strumenti come la ouija producono movimenti spiegabili anche con effetto ideomotorio.",
    people:
      "Coinvolge morenti, sopravvissuti a rianimazione, persone in lutto, medium, famiglie e clinici. Può ridurre paura della morte, cambiare priorità o produrre vulnerabilità e dipendenza interpretativa.",
    impact:
      "Modifica rituali, decisioni sul fine vita, elaborazione del lutto e senso di identità. Le NDE riferite possono avere conseguenze durature su valori e comportamento, indipendentemente dalla loro interpretazione ultima.",
    boundary:
      "Sfida il confine fra morte biologica, esperienza cosciente e memoria. Il limite metodologico è inferire una sopravvivenza ontologica da stati vissuti in condizioni estreme.",
    deepQuestion:
      "Apre la domanda se coscienza e identità dipendano interamente dal cervello. La domanda resta aperta sul piano filosofico; le prove disponibili richiedono cautela e spiegazioni concorrenti.",
    action: "riorganizza il rapporto con morte, identità e continuità personale",
    transformation: "trasformazione del rapporto con la morte",
    observable: "resoconti, cambiamenti di valori, decisioni di fine vita, pratiche del lutto e condizioni cliniche",
    method: "raccolta prospettica in ospedale, tempi certi, dati clinici, interviste ripetute e confronto tra spiegazioni",
    research: "seguire longitudinalmente persone con NDE e gruppi di controllo, distinguendo fenomenologia, fisiologia e interpretazione",
    historicalTrace: "riti funerari, testi religiosi, spiritismo, medicina rianimatoria e nuovi protocolli sulle esperienze di quasi morte",
  },
  {
    shortName: "UFO/UAP",
    epistemicStatus:
      "Le segnalazioni UAP e alcuni dati strumentali sono reali; molte osservazioni ricevono spiegazioni convenzionali e una parte resta non identificata soprattutto per dati insufficienti. «Non identificato» non significa automaticamente extraterrestre.",
    history:
      "Racconti di prodigi celesti esistono dall'antichità, ma non vanno assimilati automaticamente agli UAP moderni. Foo fighters, avvistamento di Kenneth Arnold nel 1947, indagini militari e recenti programmi NASA e AARO segnano una storia documentabile delle risposte istituzionali.",
    objective:
      "Indica osservazioni nel cielo, nello spazio o talvolta in altri domini che non vengono identificate dopo una prima analisi. L'oggetto scientifico è il dato residuo e la qualità della sua raccolta, non una conclusione già scelta sull'origine.",
    mechanism:
      "Si studiano testimonianze, radar, immagini, infrarosso, telemetria e condizioni ambientali. Parallasse, palloni, droni, fenomeni atmosferici, errori dei sensori e attività riservate devono essere esclusi prima di classificare un caso come irrisolto.",
    people:
      "Coinvolge piloti, militari, civili, analisti e comunità di ricerca. Può produrre paura, meraviglia, stigma, cambiamenti durevoli nelle convinzioni e difficoltà professionali; NASA ha indicato lo stigma come ostacolo alla raccolta dei dati.",
    impact:
      "Produce rapporti di sicurezza, archivi, uffici pubblici, udienze, narrazioni culturali e trasformazioni biografiche nei testimoni. L'impatto umano e istituzionale è studiabile separatamente dall'origine dell'evento.",
    boundary:
      "Sfida il confine fra osservato e identificato e fra testimonianza e dato strumentale. Il limite principale è la scarsità di osservazioni calibrate, complete e simultanee.",
    deepQuestion:
      "Apre interrogativi su limiti dei sensori, sicurezza dello spazio aereo e possibilità di fenomeni non ancora classificati. Ipotesi extraterrestri o interdimensionali richiedono prove ulteriori e non seguono dal solo residuo anomalo.",
    action: "trasforma un evento osservato in un problema di identificazione e, talvolta, in una svolta biografica",
    transformation: "trasformazione del testimone e dell'immaginario",
    observable: "rapporti, dati dei sensori, variazioni del racconto, stigma, decisioni e cambiamenti biografici",
    method: "segnalazione tempestiva, sensori calibrati multipli, metadati, analisi indipendente e follow-up dei testimoni",
    research: "studiare insieme evento e conseguenze, separando qualità del dato, spiegazioni convenzionali, residuo e impatto umano",
    historicalTrace: "cambi di lessico, archivi militari, programmi pubblici, cultura popolare, testimonianze e procedure di segnalazione",
  },
  {
    shortName: "extraterrestri",
    epistemicStatus:
      "L'esistenza di vita intelligente extraterrestre è plausibile ma non confermata. SETI conduce ricerche scientifiche di segnali; paleoastronautica, contattismo e incontri ravvicinati propongono interpretazioni che richiedono prove indipendenti.",
    history:
      "Speculazioni su mondi abitati sono antiche; astronomia moderna, radioastronomia e programma SETI dal Novecento trasformano la domanda in ricerca osservativa. Ufologia e cultura popolare danno forma concreta all'immaginario dell'incontro.",
    objective:
      "Indica forme di vita nate fuori dalla Terra; l'intelligenza tecnologica è un sottoinsieme ipotetico. La ricerca cerca biosignature, tecnofirme e segnali radio, senza aver finora ottenuto una conferma universalmente accettata.",
    mechanism:
      "Si osservano atmosfere planetarie, segnali radio o ottici e possibili tecnofirme, applicando controlli contro interferenze e falsi positivi. Le classificazioni ufologiche descrivono testimonianze, non dimostrano l'origine extraterrestre.",
    people:
      "Coinvolge astronomi, biologi, filosofi, testimoni e movimenti contattisti. L'idea modifica aspettative sul futuro, identità umana, religione e politica anche in assenza di contatto confermato.",
    impact:
      "Ha orientato programmi scientifici, missioni spaziali, protocolli di comunicazione e un vasto immaginario culturale. Può favorire prospettiva planetaria, speranza o paura dell'invasione.",
    boundary:
      "Sfida il confine fra vita terrestre e vita cosmica, plausibilità statistica e prova osservativa. La distanza e l'ambiguità delle tecnofirme rendono difficile passare dall'ipotesi alla conferma.",
    deepQuestion:
      "Chiede se intelligenza e tecnologia siano eventi rari o ricorrenti nel cosmo e come cambierebbe l'umanità davanti a una prova. La domanda è scientificamente legittima; le risposte restano aperte.",
    action: "sposta l'identità umana da centro isolato a possibile membro di un ambiente abitato",
    transformation: "trasformazione dell'identità cosmica",
    observable: "programmi di ricerca, segnali candidati, protocolli, investimenti, rappresentazioni e cambiamenti culturali",
    method: "ricerca di biosignature e tecnofirme, verifiche indipendenti, esclusione delle interferenze e protocolli di conferma",
    research: "ampliare osservazioni replicabili e studiare insieme criteri di conferma, comunicazione pubblica e conseguenze sociali",
    historicalTrace: "astronomia dei mondi, SETI, missioni planetarie, cultura dell'incontro e dibattiti sulla comunicazione interstellare",
  },
];
