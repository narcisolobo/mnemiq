interface FallbackImageProps {
  placeholderText: string;
}

function FallbackImage({ placeholderText }: FallbackImageProps) {
  return (
    <div
      className="bg-base-100 flex aspect-video items-center justify-center bg-[repeating-linear-gradient(45deg,var(--color-base-100)_0px,var(--color-base-100)_20px,var(--color-base-200)_20px,var(--color-base-200)_40px)]"
      role="img"
      aria-label={placeholderText}
    >
      <span className="text-base-content/50 fluid-sm text-center font-semibold tracking-widest uppercase">
        {placeholderText}
      </span>
    </div>
  );
}

export default FallbackImage;
