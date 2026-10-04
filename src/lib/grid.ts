import type { LucideIcon } from "lucide-react";
import { Cog, DoorOpen, Eye, History, Microscope, User } from "lucide-react";

/**
 * Le sei lenti della griglia analitica (TAB I) — identiche al repository sorgente.
 */
export type Lens = {
  id: string;
  label: string;
  subtitle: string;
  questionLabel: string;
  question: string;
  purpose?: string;
  icon: LucideIcon;
  /** La riga del "velato": stile riservato all'ultima lente. */
  veiled?: boolean;
};

export const LENSES: readonly Lens[] = [
  {
    id: "when-where",
    label: "When / Where",
    subtitle: "Quando e Dove — Il Contesto Storico e Spaziale",
    questionLabel: "La domanda giornalistica",
    question:
      "Quando è emerso e in quale scenario culturale o geografico si radica?",
    purpose:
      "Ancorare il concetto al suo tempo, capendo quale vuoto o trauma collettivo ha generato il bisogno di quell'idea.",
    icon: History,
  },
  {
    id: "what",
    label: "What",
    subtitle: "Cosa — La Definizione Scientifica o Fisica",
    questionLabel: "La domanda giornalistica",
    question:
      "Di cosa stiamo parlando esattamente, qual è la sua struttura oggettiva?",
    purpose:
      "Fornire al lettore la realtà fattuale, spogliando l'argomento da ogni alone di magia o incomprensibilità iniziale.",
    icon: Microscope,
  },
  {
    id: "how",
    label: "How",
    subtitle: "Come è fatto / agisce — Il Meccanismo d'Azione",
    questionLabel: "La domanda giornalistica",
    question: "Come opera concretamente, qual è il suo «ferro del mestiere»?",
    purpose:
      "Svelare il processo tecnico o misurabile con cui il fenomeno interagisce con la materia o l'informazione.",
    icon: Cog,
  },
  {
    id: "who",
    label: "Who",
    subtitle: "Chi, nell'esperienza interiore — La Percezione Umana",
    questionLabel: "La domanda giornalistica",
    question: "Chi lo sperimenta e come lo vive la coscienza umana?",
    purpose:
      "Indagare la reazione viscerale, il sentimento (terrore, speranza, fascinazione) e l'impatto psicologico che l'argomento provoca nella gente.",
    icon: User,
  },
  {
    id: "which-boundary",
    label: "Which Boundary",
    subtitle: "Quale confine — Il Limite Sfidato",
    questionLabel: "La domanda giornalistica",
    question: "Quale barriera tra noto e ignoto viene attraversata?",
    purpose:
      "Mostrare dove si rompe la normalità e si entra nel territorio della possibilità.",
    icon: DoorOpen,
  },
  {
    id: "why-veiled",
    label: "Why / The Veiled Reality",
    subtitle: "La Traccia e il Velato",
    questionLabel: "La domanda di profondità",
    question:
      "Se questo fenomeno fosse uno spiraglio, una crepa nel velo attraverso cui intravediamo la vera natura della realtà, quale aspetto nascosto del cosmo ci starebbe rivelando?",
    icon: Eye,
    veiled: true,
  },
];
