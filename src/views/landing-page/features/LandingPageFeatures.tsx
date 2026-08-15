import FeatureCard from "./FeatureCard";
import { features } from "./landing-page-features";

function LandingPageFeatures() {
  return (
    <section className="text-base-content bg-base-100 border-neutral border-b-4 py-12 md:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto space-y-8 px-6 md:space-y-12">
        <h2 className="fluid-2xl font-display text-center leading-none uppercase">
          Why Switch?
        </h2>
        <ul className="flex flex-col items-stretch gap-6 xl:flex-row">
          {features.map(({ itemNumber, title, description }) => (
            <li key={itemNumber} className="flex-1">
              <FeatureCard
                itemNumber={itemNumber}
                title={title}
                description={description}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default LandingPageFeatures;
