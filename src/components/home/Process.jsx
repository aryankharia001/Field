import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "../../lib/gsap";
import { PROCESS } from "../../data/process";
import { useReducedMotion } from "../../hooks/useMediaQuery";
import SectionHeading from "../ui/SectionHeading";

const OFFSET = ["md:mt-0", "md:mt-14", "md:mt-2", "md:mt-16", "md:mt-4"];

export default function Process() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) {
      setActive(PROCESS.length - 1);
      return undefined;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: true,
            onUpdate: (self) => {
              setActive(Math.min(PROCESS.length - 1, Math.floor(self.progress * PROCESS.length)));
            },
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="relative bg-bg px-6 py-28 md:px-12 md:py-40">
      <SectionHeading index="( 03 )" label="How we work" title="Process" className="mb-20" />

      <div className="relative">
        <div className="absolute left-0 right-0 top-6 hidden h-px bg-line md:block" />
        <div
          ref={lineRef}
          className="absolute left-0 right-0 top-6 hidden h-px scale-x-0 bg-lime md:block"
        />

        <div className="grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 md:grid-cols-5 md:gap-x-4">
          {PROCESS.map((step, i) => (
            <div key={step.id} className={`relative ${OFFSET[i]}`}>
              <div
                className={`mb-5 hidden h-3 w-3 rounded-full border transition-colors duration-300 md:block ${
                  i <= active ? "border-lime bg-lime" : "border-line bg-bg"
                }`}
              />
              <span
                className={`block font-mono text-3xl transition-colors duration-300 md:text-4xl ${
                  i === active ? "text-lime" : "text-ink/30"
                }`}
              >
                {step.id}
              </span>
              <h3
                className={`mt-3 font-display text-xl uppercase tracking-tight transition-colors duration-300 md:text-2xl ${
                  i <= active ? "text-ink" : "text-ink/40"
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`mt-2 max-w-[26ch] text-sm transition-opacity duration-300 ${
                  i === active ? "text-muted opacity-100" : "text-muted opacity-50"
                }`}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
