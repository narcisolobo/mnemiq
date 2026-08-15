function LandingPageCta() {
  return (
    <section className="text-neutral-content bg-neutral py-12 md:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto space-y-6 px-6">
        <h2 className="fluid-2xl font-display text-primary text-center leading-none uppercase">
          Anki had a good run.
        </h2>
        <div className="flex justify-center">
          <button className="btn btn-xl btn-primary font-bold uppercase shadow-lg">
            Sign up for free
          </button>
        </div>
        <p className="text-neutral-content/60 fluid-md text-center">
          Your future self will be insufferably smug about it.
        </p>
      </div>
    </section>
  );
}

export default LandingPageCta;
