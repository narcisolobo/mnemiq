import { Fragment } from "react";
import LandingPageHero from "@/views/landing-page/hero/LandingPageHero";
import LandingPageFeatures from "@/views/landing-page/features/LandingPageFeatures";
import LandingPageShowcase from "@/views/landing-page/showcase/LandingPageShowcase";
import LandingPageCommunity from "@/views/landing-page/community/LandingPageCommunity";
import LandingPageChecklist from "@/views/landing-page/checklist/LandingPageChecklist";

function LandingPage() {
  return (
    <Fragment>
      <LandingPageHero />
      <LandingPageFeatures />
      <LandingPageShowcase />
      <LandingPageCommunity />
      <LandingPageChecklist />
    </Fragment>
  );
}

export default LandingPage;
