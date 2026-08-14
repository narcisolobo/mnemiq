import Link from "next/link";

function Logo() {
  return (
    <Link
      href="/"
      aria-label="Neemik logo"
      className="font-display inline-flex items-center gap-1 text-xl"
    >
      <span aria-hidden="true" className="inline-block">
        mnem
      </span>
      <span
        aria-hidden="true"
        className="bg-primary dark:text-primary-content inline-block border-3 px-2 py-0.5 shadow-md"
      >
        IQ
      </span>
    </Link>
  );
}

export default Logo;
