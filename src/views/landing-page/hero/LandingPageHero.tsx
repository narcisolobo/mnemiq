import ScreenShotCard from "@/components/shared/ScreenShotCard";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeroHeadings from "./HeroHeadings";

function LandingPageHero() {
  return (
    <section className="text-accent-content bg-accent border-neutral border-b-4 py-12 md:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto space-y-12 px-6">
        <HeroHeadings />
        <p className="fluid-md mx-auto max-w-[40ch] text-center">
          mnemIQ is the flashcard app that actually respects your time, your
          taste, and your GPA. Science-backed studying, without the suffering.
        </p>
        <div className="flex justify-center">
          <button className="btn btn-xl btn-primary font-bold uppercase shadow-lg">
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
