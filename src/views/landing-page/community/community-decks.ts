type Deck = {
  tag: string;
  title: string;
  author: string;
  rating: number;
  cardCount: number;
};

const decks: Deck[] = [
  {
    tag: "Geography",
    title: "US State Capitals",
    author: "mnemIQ Official",
    rating: 4.9,
    cardCount: 50,
  },
  {
    tag: "Countries",
    title: "World Flags",
    author: "mnemIQ Official",
    rating: 4.8,
    cardCount: 195,
  },
  {
    tag: "Chemistry",
    title: "Organic Chem Reactions",
    author: "@premedmara",
    rating: 4.7,
    cardCount: 120,
  },
  {
    tag: "Science",
    title: "Periodic Table of Elements",
    author: "mnemIQ Official",
    rating: 4.9,
    cardCount: 118,
  },
  {
    tag: "Spanish",
    title: "Spanish Verb Conjugations",
    author: "@laura.habla",
    rating: 4.6,
    cardCount: 80,
  },
  {
    tag: "Presidents",
    title: "US Presidents",
    author: "mnemIQ Official",
    rating: 4.8,
    cardCount: 46,
  },
  {
    tag: "Biology",
    title: "Anatomy Basics",
    author: "@futuredoc22",
    rating: 4.7,
    cardCount: 150,
  },
  {
    tag: "Vocabulary",
    title: "AP Bio Vocab",
    author: "@nguyen.study",
    rating: 4.5,
    cardCount: 210,
  },
  {
    tag: "Art",
    title: "Famous Paintings & Artists",
    author: "mnemIQ Official",
    rating: 4.9,
    cardCount: 60,
  },
];

export { decks, type Deck };
