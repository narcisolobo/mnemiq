import DeckCard from "./DeckCard";
import { decks } from "./community-decks";

function CommunityDeckGrid() {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {decks.map((deck) => (
        <li key={deck.title}>
          <DeckCard {...deck} />
        </li>
      ))}
    </ul>
  );
}

export default CommunityDeckGrid;
