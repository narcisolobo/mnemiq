import { Fragment } from "react";
import LandingPageHero from "@/views/landing-page/hero/LandingPageHero";
import LandingPageFeatures from "@/views/landing-page/features/LandingPageFeatures";
import LandingPageShowcase from "@/views/landing-page/showcase/LandingPageShowcase";
import LandingPageCommunity from "@/views/landing-page/community/LandingPageCommunity";

function LandingPage() {
  return (
    <Fragment>
      <LandingPageHero />
      <LandingPageFeatures />
      <LandingPageShowcase />
      <LandingPageCommunity />
    </Fragment>
  );
}

export default LandingPage;
