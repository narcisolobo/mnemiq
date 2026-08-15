import ChecklistTable from "./ChecklistTable";

function LandingPageChecklist() {
  return (
    <section className="text-primary-content bg-primary py-12 md:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto space-y-12 px-6">
        <h2 className="fluid-2xl font-display mx-auto max-w-6xl text-center leading-none uppercase">
          No contest.
        </h2>
        <ChecklistTable />
        <p className="fluid-md mx-auto max-w-[52ch] text-center font-semibold">
          Anki has flashcards from 2009 still in active rotation. So do some of
          our users&apos; grudges. We&apos;re only fixing one of those.
        </p>
      </div>
    </section>
  );
}

export default LandingPageChecklist;
