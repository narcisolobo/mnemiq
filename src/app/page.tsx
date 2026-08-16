import LandingPageChecklist from "@/views/landing-page/checklist/LandingPageChecklist";
import LandingPageCommunity from "@/views/landing-page/community/LandingPageCommunity";
import LandingPageCta from "@/views/landing-page/cta/LandingPageCta";
import LandingPageFeatures from "@/views/landing-page/features/LandingPageFeatures";
import LandingPageHero from "@/views/landing-page/hero/LandingPageHero";
import LandingPageShowcase from "@/views/landing-page/showcase/LandingPageShowcase";
import LandingPageTestimonial from "@/views/landing-page/testimonial/LandingPageTestimonial";
import { Metadata } from "next";
import { Fragment } from "react";

const metadata: Metadata = {
  title: "MnemIQ — Study smarter, not harder.",
  description:
    "MnemIQ is the flashcard app that actually respects your time, your taste, and your GPA. Science-backed spaced repetition, a community worth joining, and yes — XP, badges, and streaks.",
};

function LandingPage() {
  return (
    <Fragment>
      <LandingPageHero />
      <LandingPageFeatures />
      <LandingPageShowcase />
      <LandingPageCommunity />
      <LandingPageChecklist />
      <LandingPageTestimonial />
      <LandingPageCta />
    </Fragment>
  );
}

export { metadata };
export default LandingPage;
