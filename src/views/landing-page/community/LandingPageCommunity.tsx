import CommunityDeckGrid from "./CommunityDeckGrid";

function LandingPageCommunity() {
  return (
    <section className="text-base-content bg-base-100 border-neutral border-b-4 py-12 md:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto space-y-8 px-6 md:space-y-12">
        <h2 className="fluid-2xl font-display text-base-content mx-auto max-w-6xl text-center leading-none uppercase">
          Someone already made the flashcards. <br />
          You&apos;re welcome.
        </h2>
        <p className="fluid-md mx-auto max-w-[40ch] text-center">
          Why start from scratch? Browse community decks, remix your favorites,
          and add your own twist.
        </p>
        <CommunityDeckGrid />
      </div>
    </section>
  );
}

export default LandingPageCommunity;
