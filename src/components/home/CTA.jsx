import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "../../lib/gsap";
import { useMagnetic } from "../../hooks/useMagnetic";
import { cursorHoverProps } from "../../lib/cursorBus";
import { useReducedMotion } from "../../hooks/useMediaQuery";
import RevealText from "../ui/RevealText";

export default function CTA() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useMagnetic(0.25);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
        .to(bgRef.current, { backgroundColor: "#B8FF3D", ease: "none", duration: 1 }, 0)
        .to(contentRef.current, { color: "#070707", ease: "none", duration: 1 }, 0)
        .to(bgRef.current, { backgroundColor: "#070707", ease: "none", duration: 1 }, 1)
        .to(contentRef.current, { color: "#F4F1EA", ease: "none", duration: 1 }, 1);
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="relative">
      <div ref={bgRef} className="flex flex-col items-center justify-center gap-14 px-6 py-32 md:py-44" style={{ backgroundColor: "#070707" }}>
        <div ref={contentRef} className="flex flex-col items-center gap-14 text-center text-ink">
          <RevealText
            as="h2"
            split="lines"
            className="font-display text-[11vw] uppercase leading-[0.94] tracking-tight sm:text-[7vw] lg:text-[5vw]"
          >
            Have a project in mind? <br /> Let's build something <br /> unexpected.
          </RevealText>

          <Link
            ref={buttonRef}
            to="/contact"
            {...cursorHoverProps("talk")}
            className="group flex items-center gap-4 rounded-full border-2 border-current px-10 py-6 font-display text-xl uppercase tracking-tight transition-colors duration-300 hover:bg-current sm:text-2xl"
          >
            <span className="transition-colors duration-300 group-hover:text-bg">Start a Project</span>
            <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
