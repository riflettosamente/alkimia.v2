/** ALKIMIA — Il catalogo degli otto argomenti. */
export type Topic = {
  /** Posizione nel catalogo, 1–8. */
  slot: number;
  title: string;
  description: string;
};

export const TOPICS: readonly Topic[] = [
  {
    slot: 1,
    title: "La Meccanica Quantistica",
    description:
      "Lo studio delle leggi fondamentali della materia e dell'energia a scala subatomica, dove il determinismo classico si dissolve in campi di probabilità e sovrapposizioni d'stato. Attraverso l'entanglement quantistico, il dualismo onda-particella e il principio di indeterminazione di Heisenberg, essa svela un universo non locale in cui la separazione spaziale è un'illusione e l'osservatore partecipa attivamente alla genesi del tessuto ontologico.",
  },
  {
    slot: 2,
    title: "La Transcomunicazione Strumentale (TCI)",
    description:
      "La captazione di tracce e flussi informativi anomali attraverso dispositivi elettronici, estraendo pattern di senso dal rumore bianco. Pionieri come Friedrich Jürgenson e Konstantin Raudive hanno inaugurato questo campo scoprendo i fenomeni vocali elettronici (EVP), ovvero voci anomale registrate su nastri magnetici. La tecnologia opera come un setaccio stocchastico, trasformando i circuiti in un varco in cui l'invisibile si manifesta attraverso i glitch della materia inanimata.",
  },
  {
    slot: 3,
    title: "La tecnologia CRISPR",
    description:
      "Un sistema di ingegneria genetica basato su complessi molecolari guidati, come la proteina Cas9, che permettono di localizzare, tagliare e modificare con precisione chirurgica sequenze specifiche all'interno del DNA. Questo strumento consente di correggere mutazioni, disattivare geni o inserire nuovo materiale biologico nel genomo, trasformando radicalmente le capacità di intervento medico, agricolo e di ricerca sulle basi stesse dei sistemi viventi.",
  },
  {
    slot: 4,
    title: "La Ghiandola Pineale",
    description:
      "Il trasduttore neurochimico fotoreattivo situato al centro del cervello, storicamente associato alla «sede dell'anima» e biologicamente incaricato di tradurre i cicli di luce e buio in stati di coscienza. Struttura neuroendocrina centrale legata ai ritmi biologici, è associata simbolicamente a Shiva e al Terzo Occhio. Si attiva con l'oscurità e il sonno profondo: riposo rigenerante e meditazione profonda ne ravvivano l'attività.",
  },
  {
    slot: 5,
    title: "La Spiritualità",
    description:
      "Dimensione dell'esperienza umana orientata alla ricerca di un senso profondo, di una connessione con il trascendente e di un ordine superiore che unisce l'individuo al cosmo. Oltrepassando i confini dell'ego e la dogmatica religiosa, essa esplora la natura della coscienza attraverso l'intuizione e la tensione interiore verso l'assoluto; in molteplici tradizioni si apre anche alla medianità, facoltà di varcare il velo della materia.",
  },
  {
    slot: 6,
    title: "L'Aldilà (Afterlife)",
    description:
      "L'ipotesi o l'esperienza della continuazione dell'identità personale e del flusso informativo della coscienza oltre il confine della dissoluzione biologica. Mappato anticamente dalla mitologia e dai testi sapienziali, questo regno invisibile viene oggi esplorato attraverso frontiere ibride come le NDE e i viaggi extracorporei; la tavola ouija e altri strumenti di confine tentano di forzarne l'accesso, configurandolo come un piano di frequenze sottili interconnesso al nostro.",
  },
  {
    slot: 7,
    title: "Gli UFO/UAP (Fenomeni Anomali Non Identificati)",
    description:
      "Manifestazioni aerospaziali o sottomarine che esibiscono accelerazioni e comportamenti incompatibili con la fisica nota, interpretate come intrusioni di intelligenze o tecnologie estranee al nostro piano. La loro genealogia affonda le radici nella clipeologia, che analizza gli «scudi volanti» degli annali antichi, mentre in epoca moderna l'immaginario si è saldato con i globi luminosi e i velivoli non identificati noti fin dalla Seconda guerra mondiale come foo fighters.",
  },
  {
    slot: 8,
    title: "Gli Extraterrestri",
    description:
      "L'ipotesi cosmologica e filosofica dell'esistenza di forme di vita intelligenti nate su altri corpi celesti. La scienza li cerca analizzando segnali radio tramite il SETI, mentre la paleoastronautica ipotizza antiche visite nel nostro passato; sul piano ufologico il fenomeno è mappato dalla classificazione Hynek del Terzo Tipo. Questi temi alimentano da decenni il contattismo, trasformando l'alterità cosmica in uno specchio per l'evoluzione umana.",
  },
];

export const TOPIC_COUNT = TOPICS.length;

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export function romanForSlot(slot: number): string {
  return ROMAN[slot - 1] ?? String(slot);
}
