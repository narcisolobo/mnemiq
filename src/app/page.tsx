import { Fragment } from "react";
import LandingPageHero from "@/views/landing-page/hero/LandingPageHero";
import LandingPageFeatures from "@/views/landing-page/features/LandingPageFeatures";
import LandingPageShowcase from "@/views/landing-page/showcase/LandingPageShowcase";

function LandingPage() {
  return (
    <Fragment>
      <LandingPageHero />
      <LandingPageFeatures />
      <LandingPageShowcase />
    </Fragment>
  );
}

export default LandingPage;
