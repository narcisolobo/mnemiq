type ChecklistItem = {
  feature: string;
  mnemiq: boolean;
  anki: boolean;
};

const checklistItems: ChecklistItem[] = [
  { feature: "Doesn't look like 2008", mnemiq: true, anki: false },
  { feature: "Actually easy to start", mnemiq: true, anki: false },
  { feature: "A community worth joining", mnemiq: true, anki: false },
  { feature: "Remix, rate & share", mnemiq: true, anki: false },
  { feature: "XP, badges & streaks", mnemiq: true, anki: false },
];

export { checklistItems, type ChecklistItem };
