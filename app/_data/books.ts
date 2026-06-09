export type Book = {
  id: string;
  title: string;
  author: string;
  genres: string[];
  estMinutes: number;
  hasBilingual: boolean;
  words: number;
  progress?: number;
  blurb?: string;
};

export const books: Book[] = [
  {
    id: "gutenberg-1342",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genres: ["Romance", "Classic"],
    estMinutes: 611,
    hasBilingual: true,
    words: 122189,
    progress: 42,
    blurb:
      "A sharp, sunlit comedy of manners — and one of the most beloved love stories ever written. Elizabeth Bennet meets her match in the proud Mr. Darcy.",
  },
  {
    id: "gutenberg-35",
    title: "The Time Machine",
    author: "H. G. Wells",
    genres: ["Sci-Fi", "Classic"],
    estMinutes: 120,
    hasBilingual: true,
    words: 32000,
    blurb:
      "A Victorian inventor journeys to the year 802,701 and finds humanity split in two. The book that defined time travel.",
  },
  {
    id: "gutenberg-345",
    title: "Dracula",
    author: "Bram Stoker",
    genres: ["Mystery", "Classic"],
    estMinutes: 480,
    hasBilingual: true,
    words: 160000,
    blurb:
      "Told in letters and journals, the original vampire novel still chills — a slow tightening of dread from Transylvania to London.",
  },
  {
    id: "gutenberg-205",
    title: "Walden",
    author: "Henry D. Thoreau",
    genres: ["Classic"],
    estMinutes: 26,
    hasBilingual: false,
    words: 5200,
    blurb:
      "Two years, two months, two days alone by a pond. A quiet manifesto for living deliberately.",
  },
  {
    id: "gutenberg-84",
    title: "Frankenstein",
    author: "Mary Shelley",
    genres: ["Sci-Fi", "Mystery"],
    estMinutes: 300,
    hasBilingual: true,
    words: 78000,
    blurb:
      "A scientist makes a living thing and abandons it. Grief, hubris and snow — the first science-fiction novel.",
  },
  {
    id: "gutenberg-1661",
    title: "Sherlock Holmes",
    author: "Arthur Conan Doyle",
    genres: ["Mystery"],
    estMinutes: 240,
    hasBilingual: true,
    words: 52000,
    blurb:
      "Twelve cases, one impossible mind. The Adventures that made 221B Baker Street the most famous address in fiction.",
  },
  {
    id: "gutenberg-160",
    title: "The Awakening",
    author: "Kate Chopin",
    genres: ["Romance", "Classic"],
    estMinutes: 150,
    hasBilingual: true,
    words: 38000,
    blurb:
      "A woman in 1890s Louisiana begins to want a life of her own. Brief, radiant, and ahead of its time.",
  },
  {
    id: "gutenberg-174",
    title: "Dorian Gray",
    author: "Oscar Wilde",
    genres: ["Mystery", "Classic"],
    estMinutes: 210,
    hasBilingual: true,
    words: 56000,
    blurb:
      "A portrait ages so its subject need not. Wilde’s only novel — all wit on the surface, rot underneath.",
  },
];
