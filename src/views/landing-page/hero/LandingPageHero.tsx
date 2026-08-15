import ScreenShotCard from "@/components/shared/ScreenShotCard";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HeroHeadings() {
  return (
    <hgroup className="space-y-10">
      <p className="bg-secondary fluid-sm md:fluid-md text-secondary-content mx-auto block w-fit translate-y-2 -rotate-3 px-6 py-2 font-semibold uppercase shadow-lg md:translate-y-0">
        Science-backed, not science fiction
      </p>
      <h1 className="font-display fluid-2xl mx-auto max-w-6xl text-center leading-none uppercase">
        Anki called. It wants its users back.
      </h1>
    </hgroup>
  );
}

function LandingPageHero() {
  return (
    <section className="text-accent-content bg-accent border-neutral border-b-4 py-12 md:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto space-y-8 px-6 md:space-y-12">
        <HeroHeadings />
        <p className="fluid-md mx-auto max-w-[40ch] text-center">
          mnemIQ is the flashcard app that actually respects your time, your
          taste, and your GPA. Science-backed studying, without the suffering.
        </p>
        <div className="flex justify-center">
          <button className="btn btn-lg md:btn-xl btn-primary font-bold uppercase shadow-lg">
            Sign up for free
            <FontAwesomeIcon icon={faArrowRight} className="w-6" />
          </button>
        </div>
        <ScreenShotCard placeholderText="app screenshot / product shot"></ScreenShotCard>
      </div>
    </section>
  );
}

export default LandingPageHero;
