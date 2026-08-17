import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { NUMBERS } from "../../data/content";
import { useReducedMotion } from "../../hooks/useMediaQuery";

export default function Numbers() {
  const sectionRef = useRef(null);
  const refs = useRef([]);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      NUMBERS.forEach((n, i) => {
        const el = refs.current[i];
        if (!el) return;

        if (reduced) {
          el.textContent = `${n.value}${n.suffix}`;
          return;
        }

        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 === 0 ? -24 : 24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
          }
        );

        const counter = { val: 0 };
        gsap.to(counter, {
          val: n.value,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          onUpdate: () => {
            el.textContent = `${Math.floor(counter.val)}${n.suffix}`;
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="border-y border-line bg-bg px-6 py-24 md:px-12">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-10 md:grid-cols-4">
        {NUMBERS.map((n, i) => (
          <div key={n.label}>
            <p
              ref={(el) => (refs.current[i] = el)}
              className="font-display text-[13vw] leading-none text-ink sm:text-[6vw] lg:text-[3.6vw]"
            >
              0{n.suffix}
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.15em] text-muted">{n.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
