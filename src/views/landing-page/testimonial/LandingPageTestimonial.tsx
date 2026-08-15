import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LandingPageTestimonial() {
  return (
    <section className="text-secondary-content bg-secondary border-neutral border-b-4 py-12 md:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto space-y-6 px-6">
        <FontAwesomeIcon
          icon={faQuoteRight}
          className="mx-auto block w-10 md:w-12"
        />
        <p className="fluid-2xl font-display mx-auto max-w-5xl text-center leading-none uppercase">
          I actually opened the app voluntarily. Multiple days in a row.
        </p>
        <p className="fluid-md text-center font-semibold">
          — A real human, probably
        </p>
      </div>
    </section>
  );
}

export default LandingPageTestimonial;
