import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import RevealText from "../ui/RevealText";
import { useReducedMotion } from "../../hooks/useMediaQuery";

/**
 * The connective beat between the horizontal showcase and Philosophy:
 * a full statement that scales in from a clipped state so the horizontal
 * section feels like it flows directly into what follows.
 */
export default function ProjectTransition() {
  const wrapRef = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapRef.current,
        { clipPath: "inset(18% 12% round 12px)", scale: 0.92 },
        {
          clipPath: "inset(0% 0% round 0px)",
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 90%",
            end: "top 30%",
            scrub: true,
          },
        }
      );
    }, wrapRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className="bg-bg px-6 py-20 md:py-28">
      <div
        ref={wrapRef}
        className="mx-auto flex max-w-[1400px] flex-col items-center gap-2 bg-surface py-24 text-center md:py-32"
      >
        <RevealText
          as="h2"
          split="lines"
          className="font-display text-[13vw] uppercase leading-[0.9] tracking-tight text-ink sm:text-[8vw] lg:text-[6vw]"
        >
          We Build <br /> With Purpose.
        </RevealText>
      </div>
    </section>
  );
}
