import Link from 'next/link';

function Logo() {
  return (
    <Link
      href="/"
      aria-label="Neemik logo"
      className="font-display text-xl inline-flex items-center gap-1 focus-ring ring-offset-base-200">
      <span aria-hidden="true" className="inline-block">
        mnem
      </span>
      <span
        aria-hidden="true"
        className="inline-block py-0.5 px-2 bg-primary border-3 shadow-md dark:text-primary-content">
        IQ
      </span>
    </Link>
  );
}

export default Logo;
