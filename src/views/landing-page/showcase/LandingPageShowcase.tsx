import BadgeGrid from "./BadgeGrid";
import LevelUp from "./LevelUp";

function LandingPageShowcase() {
  return (
    <section className="text-secondary-content bg-secondary border-neutral border-b-4 py-12 md:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto space-y-12 px-6">
        <h2 className="fluid-2xl font-display text-secondary-content text-center uppercase">
          Level Up. <span className="text-primary">Literally.</span>
        </h2>
        <p className="fluid-md mx-auto max-w-[40ch] text-center">
          We took the part where you feel good about studying and made it the
          whole thing.
        </p>
        <LevelUp />
        <BadgeGrid />
      </div>
    </section>
  );
}

export default LandingPageShowcase;
