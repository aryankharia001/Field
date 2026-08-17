import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import RevealText from "../ui/RevealText";
import { useReducedMotion } from "../../hooks/useMediaQuery";

export default function Intro() {
  const sectionRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.to(line1Ref.current, {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(line2Ref.current, {
        yPercent: -34,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="relative bg-bg px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <div ref={line1Ref}>
          <RevealText
            as="p"
            split="words"
            className="font-display text-[9vw] uppercase leading-[0.95] tracking-tight text-muted sm:text-[6.4vw] lg:text-[4.4vw]"
          >
            We don't just make websites.
          </RevealText>
        </div>
        <div ref={line2Ref} className="mt-3 md:mt-5">
          <RevealText
            as="p"
            split="words"
            start="top 85%"
            delay={0.08}
            className="font-display text-[9vw] uppercase leading-[0.95] tracking-tight text-ink sm:text-[6.4vw] lg:text-[4.4vw]"
          >
            We build digital systems people remember.
          </RevealText>
        </div>
      </div>
    </section>
  );
}
