import FeatureCard from "./FeatureCard";
import { features } from "./landing-page-features";

function LandingPageFeatures() {
  return (
    <section className="text-base-content bg-base-100 py-12 md:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto space-y-12 px-6">
        <h2 className="fluid-2xl font-display text-center uppercase">
          Why Switch?
        </h2>
        <div className="flex flex-col gap-6 md:flex-row">
          {features.map(({ itemNumber, title, description }) => (
            <FeatureCard
              key={itemNumber}
              itemNumber={itemNumber}
              title={title}
              description={description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LandingPageFeatures;
