import livre from "../assets/livre_1.jpg";
import mangwaCover from "../assets/Etoo.png";

export type BookType = "magazine" | "livre";

export interface BookAutre {
  nom: string;
  description: string;
}

export interface Book {
  id: string;
  type: BookType;
  titre: string;
  auteur?: string;
  description?: string;
  resume?: string;
  coverUrl: string;
  pdfUrl?: string;
  autres?: BookAutre[];
  annee?: string;
  pages?: number;
}

export const books: Book[] = [
  {
    id: "samuel-etoo-ed1",
    type: "magazine",
    titre: "Samuel ETO'O",
    annee: "2026",
    pages: 64,
    description: "Un homme, une histoire, une légende vivante !",
    resume:
      "Retour sur la carrière du joueur africain le plus titré de tous les temps : l'un des meilleurs attaquants de l'histoire du football mondial. Un portrait exclusif entre passion, discipline et grandeur.",
    coverUrl: livre.src,
    autres: [
      { nom: "Indira Baboke", description: "La jeune prodige de la musique gospel" },
      { nom: "Interview avec", description: "La talentieuse LAURA DAVE CEO de Laura Dave Media" },
      { nom: "Thierry NYAMEN CEO de NTFoods-Tanty", description: "Un entrepreneur perspicace et tenace" },
    ],
  },
  {
    id: "samuel-etoo-ed2",
    type: "magazine",
    titre: "Samuel ETO'O",
    annee: "2025",
    pages: 58,
    description: "Un homme, une histoire, une légende vivante !",
    resume:
      "Retour sur la carrière du joueur africain le plus titré de tous les temps : l'un des meilleurs attaquants de l'histoire du football !",
    coverUrl: livre.src,
    autres: [
      { nom: "Indira Baboke", description: "La jeune prodige de la musique gospel" },
      { nom: "Interview avec", description: "La talentieuse LAURA DAVE CEO de Laura Dave Media" },
      { nom: "Thierry NYAMEN CEO de NTFoods-Tanty", description: "Un entrepreneur perspicace et tenace" },
    ],
  },
  {
    id: "dernier-sommeil-ourse",
    type: "livre",
    titre: "Le Dernier Sommeil de l'Ourse",
    coverUrl: livre.src,
  },
  {
    id: "vie-sur-la-colline",
    type: "livre",
    titre: "La Vie Sur La Colline",
    auteur: "Jonathan Martin",
    coverUrl: mangwaCover.src,
  },
  {
    id: "mangwa-mars-2026-1",
    type: "magazine",
    titre: "Mangwa Magazine Edition Mars 2026",
    annee: "2026",
    coverUrl: mangwaCover.src,
  },
  {
    id: "mangwa-mars-2026-2",
    type: "magazine",
    titre: "Mangwa Magazine Edition Mars 2026",
    annee: "2026",
    coverUrl: mangwaCover.src,
  },
  {
    id: "mangwa-mars-2026-3",
    type: "magazine",
    titre: "Mangwa Magazine Edition Mars 2026",
    annee: "2026",
    coverUrl: mangwaCover.src,
  },
  {
    id: "mangwa-mars-2026-4",
    type: "magazine",
    titre: "Mangwa Magazine Edition Mars 2026",
    annee: "2026",
    coverUrl: mangwaCover.src,
  },
  {
    id: "mangwa-mars-2026-5",
    type: "magazine",
    titre: "Mangwa Magazine Edition Mars 2026",
    annee: "2026",
    coverUrl: mangwaCover.src,
  },
  {
    id: "mangwa-mars-2026-6",
    type: "magazine",
    titre: "Mangwa Magazine Edition Mars 2026",
    annee: "2026",
    coverUrl: mangwaCover.src,
  },
];

export function getBookById(id: string): Book | undefined {
  return books.find((b) => b.id === id);
}

export const editions = books.filter((b) => b.type === "magazine" && b.autres);
export const librairie = books;
