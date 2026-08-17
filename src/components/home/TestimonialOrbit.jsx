import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "../../lib/gsap";
import { TESTIMONIALS } from "../../data/testimonials";
import { useIsMobile, useReducedMotion } from "../../hooks/useMediaQuery";
import SectionHeading from "../ui/SectionHeading";

const N = TESTIMONIALS.length;
const REF_ANGLE = -90; // "front" of the orbit, at the top of the ring

export default function TestimonialOrbit() {
  const sectionRef = useRef(null);
  const ringRef = useRef(null);
  const itemsRef = useRef([]);
  const quoteRef = useRef(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (isMobile || reduced) return undefined;

    const ctx = gsap.context(() => {
      const radius = Math.min(230, window.innerWidth * 0.24);

      gsap.set(itemsRef.current, { xPercent: -50, yPercent: -50 });

      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=180%",
            scrub: 1,
            pin: true,
            onUpdate: (self) => {
              const rotation = self.progress * 360;
              let closestIdx = 0;
              let closestDiff = Infinity;

              itemsRef.current.forEach((el, i) => {
                if (!el) return;
                const angle = i * (360 / N) + rotation;
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * radius;
                const y = Math.sin(rad) * radius;
                const diff = Math.abs((((angle - REF_ANGLE + 540) % 360) - 180));
                const norm = gsap.utils.clamp(0, 1, diff / 170);

                gsap.set(el, {
                  x,
                  y,
                  scale: 1 - norm * 0.4,
                  opacity: 1 - norm * 0.65,
                });

                if (diff < closestDiff) {
                  closestDiff = diff;
                  closestIdx = i;
                }
              });

              if (closestIdx !== activeRef.current) {
                activeRef.current = closestIdx;
                setActive(closestIdx);
              }
            },
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, reduced]);

  useLayoutEffect(() => {
    if (!quoteRef.current || reduced) return;
    gsap.fromTo(quoteRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
  }, [active, reduced]);

  const current = TESTIMONIALS[active];

  if (isMobile) {
    return (
      <section className="bg-bg px-6 py-24">
        <SectionHeading index="( 05 )" label="Client feedback" title="Testimonials" className="mb-12" />
        <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name + t.role}
              className="w-[86vw] shrink-0 snap-center rounded-lg border border-line bg-surface p-7"
            >
              <p className="text-lg text-ink">"{t.quote}"</p>
              <p className="mt-5 font-mono text-xs uppercase tracking-[0.15em] text-muted">
                {t.name} — {t.role}, {t.company}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-bg px-6">
      <p className="absolute top-16 font-mono text-xs uppercase tracking-[0.25em] text-lime">
        ( 05 ) Testimonials
      </p>

      <div ref={ringRef} className="relative h-[80vw] max-h-[560px] w-[80vw] max-w-[560px]">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={t.name + t.role + i}
            ref={(el) => (itemsRef.current[i] = el)}
            className="pointer-events-none absolute left-1/2 top-1/2 w-[180px] rounded-md border border-line bg-surface/80 p-3 text-left backdrop-blur-sm"
          >
            <p className="line-clamp-2 text-[11px] text-ink/70">"{t.quote}"</p>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.1em] text-muted">{t.name}</p>
          </div>
        ))}

        <div className="absolute left-1/2 top-1/2 flex w-[min(64vw,420px)] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
          <div ref={quoteRef}>
            <p className="font-display text-2xl leading-snug tracking-tight text-ink md:text-3xl">
              "{current.quote}"
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-lime">
              {current.name} — {current.role}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{current.company}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
