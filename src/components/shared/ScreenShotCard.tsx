import type { ReactNode } from "react";
import FallbackImage from "./FallbackImage";

interface ScreenShotCardProps {
  placeholderText?: string;
  children?: ReactNode;
}

function ScreenShotCard({
  children,
  placeholderText = "Placeholder Text",
}: ScreenShotCardProps) {
  return (
    <figure className="mx-auto max-w-5xl border-4">
      <header className="bg-base-100 flex items-center gap-2 border-b-4 p-4">
        <div className="bg-secondary h-4 w-4" />
        <div className="bg-accent h-4 w-4" />
        <div className="bg-primary h-4 w-4" />
      </header>
      <div className="relative">
        {children ?? <FallbackImage placeholderText={placeholderText} />}
      </div>
    </figure>
  );
}

export default ScreenShotCard;
