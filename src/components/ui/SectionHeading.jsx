import RevealText from "./RevealText";

/**
 * Shared "eyebrow label + huge heading" pattern used to open most
 * sections, so section rhythm stays consistent across a very visually
 * varied page.
 */
export default function SectionHeading({
  index,
  label,
  title,
  align = "left",
  className = "",
  titleClassName = "",
}) {
  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className}`}>
      {(index || label) && (
        <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted">
          {index && <span className="text-lime">{index}</span>}
          {label && <span>{label}</span>}
        </div>
      )}
      <RevealText
        as="h2"
        split="lines"
        className={`font-display text-[12vw] leading-[0.92] tracking-tight text-ink sm:text-[8vw] lg:text-[5.5vw] ${titleClassName}`}
      >
        {title}
      </RevealText>
    </div>
  );
}
