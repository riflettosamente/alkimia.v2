/** ALKIMIA — Le sei sezioni dell'opera (titoli identici al repository sorgente). */
export type Tab = {
  id: number;
  roman: string;
  title: string;
  subtitle: string;
};

export const TABS: readonly Tab[] = [
  { id: 1, roman: "I", title: "FASE 1: La Scomposizione", subtitle: "Griglia analitica a dodici risposte" },
  { id: 2, roman: "II", title: "FASE 2: La Collisione", subtitle: "Cinque angoli e il Ponte Sovrano" },
  { id: 3, roman: "III", title: "FASE 3: Il Salto", subtitle: "Cinque operatori oltre il conosciuto" },
  { id: 4, roman: "IV", title: "FASE 4: Le Conseguenze", subtitle: "Costellazione, ordine di marcia, epilogo" },
  { id: 5, roman: "V", title: "FASE 5: I Cinque Affondi", subtitle: "Interrogazione della frontiera" },
  { id: 6, roman: "VI", title: "Il Saggio", subtitle: "La voce finale dell'opera" },
];
