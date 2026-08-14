type LandingPageFeature = {
  itemNumber: string;
  title: string;
  description: string;
};

const features: LandingPageFeature[] = [
  {
    itemNumber: "01",
    title: "The algorithm that actually works",
    description:
      "SM-2 spaced repetition. It's the same method memory champions use, and yes, it's as powerful as it sounds. We just made it not look like it was built in 2004.",
  },
  {
    itemNumber: "02",
    title: "Steal like an academic",
    description:
      "Browse card decks made by real students, remix the ones you like, and make them your own. It's not cheating. It's community.",
  },
  {
    itemNumber: "03",
    title: "Your brain on dopamine",
    description:
      "Badges. Levels. Streaks. We're not above bribery. Show up every day and MnemIQ will make sure you feel every bit of it.",
  },
];

export { features, type LandingPageFeature };
