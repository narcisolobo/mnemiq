import Image from "next/image";
import { badges, type Badge } from "./badges";

function BadgeTile({ name, image, earned }: Badge) {
  return (
    <div
      className={`border-neutral flex flex-col items-center gap-2 border-4 p-3 text-center ${
        earned ? "bg-base-200" : "bg-base-300"
      }`}
    >
      <Image
        src={image}
        alt={name}
        width={64}
        height={64}
        className={earned ? "" : "opacity-40 grayscale"}
      />
      <span
        className={`font-display fluid-2xs leading-tight uppercase ${
          earned ? "text-base-content" : "text-base-content/50"
        }`}
      >
        {name}
      </span>
    </div>
  );
}

function BadgeGrid() {
  return (
    <div className="mx-auto">
      <div className="card card-lg bg-base-100 border-neutral h-full border-4 shadow-lg">
        <div className="card-body">
          <p className="font-display fluid-md text-base-content text-center tracking-wide uppercase">
            Your wall of fame, in progress
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {badges.map((badge) => (
              <BadgeTile key={badge.name} {...badge} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BadgeGrid;
