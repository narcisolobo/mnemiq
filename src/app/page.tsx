import { Fragment } from "react";
import LandingPageHero from "@/components/landing-page/hero/LandingPageHero";
import LandingPageFeatures from "@/components/landing-page/features/LandingPageFeatures";

function LandingPage() {
  return (
    <Fragment>
      <LandingPageHero />
      <LandingPageFeatures />
    </Fragment>
  );
}

export default LandingPage;
