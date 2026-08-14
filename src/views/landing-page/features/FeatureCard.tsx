import type { LandingPageFeature } from "./landing-page-features";

const itemNumberColors: Record<string, string> = {
  "01": "bg-primary text-primary-content",
  "02": "bg-secondary text-secondary-content",
  "03": "bg-accent text-accent-content",
};

function FeatureCard({ itemNumber, title, description }: LandingPageFeature) {
  return (
    <article className="card card-lg bg-base-200 border-neutral h-full border-4">
      <div className="card-body text-base-content gap-6">
        <div
          className={`font-display aspect-square w-fit border-4 p-3 text-2xl font-bold ${itemNumberColors[itemNumber]}`}
        >
          {itemNumber}
        </div>
        <h3 className="card-title font-display fluid-lg leading-none uppercase">
          {title}
        </h3>
        <p className="fluid-sm">{description}</p>
      </div>
    </article>
  );
}

export default FeatureCard;
