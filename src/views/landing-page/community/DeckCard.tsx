import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { getTagColor } from "./get-tag-color";
import type { Deck } from "./community-decks";

function DeckCard({ tag, title, author, rating, cardCount }: Deck) {
  return (
    <article className="card bg-base-200 border-neutral h-full border-4 shadow-md">
      <div className="card-body gap-4">
        <div
          className={`badge ${getTagColor(tag)} font-display border-neutral mb-4 w-fit border-2 uppercase`}
        >
          {tag}
        </div>
        <div className="flex-1">
          <h3 className="card-title font-display text-2xl uppercase">
            {title}
          </h3>
          <p className="text-base-content/60 fluid-sm">{author}</p>
        </div>
        <div className="fluid-sm flex items-center gap-2 font-semibold">
          <FontAwesomeIcon icon={faStar} className="text-warning w-4" />
          <span>{rating}</span>
          <span className="text-base-content/60">{cardCount} cards</span>
        </div>
      </div>
    </article>
  );
}

export default DeckCard;
