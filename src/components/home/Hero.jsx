import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useMediaQuery";
import HeroBackground from "./HeroBackground";

export default function Hero({ start }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const indicatorRef = useRef(null);
  const contentRef = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (!start) return undefined;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([headingRef.current, subRef.current, indicatorRef.current], { opacity: 1, y: 0 });
        return;
      }

      const split = new SplitText(headingRef.current, {
        type: "lines,words",
        linesClass: "overflow-hidden block",
      });

      gsap.set(split.words, { yPercent: 130, opacity: 0, rotate: 4 });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to(split.words, { yPercent: 0, opacity: 1, rotate: 0, duration: 1.1, stagger: 0.045 })
        .fromTo(subRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .fromTo(indicatorRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.3");

      // Scroll-driven parallax: heading and sub move at different speeds,
      // whole block scales down slightly as the hero exits.
      gsap.to(contentRef.current, {
        yPercent: -18,
        scale: 0.94,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(subRef.current, {
        yPercent: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      return () => split.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, [start, reduced]);

  return (
    <section ref={sectionRef} className="relative flex min-h-[100svh] items-center overflow-hidden bg-bg">
      <HeroBackground />

      <div ref={contentRef} className="relative z-10 mx-auto w-[min(1400px,92vw)] pt-24">
        <h1
          ref={headingRef}
          className="font-display text-[13vw] font-medium uppercase leading-[0.88] tracking-tight text-ink sm:text-[10vw] lg:text-[7.4vw]"
        >
          <span className="block">We Build</span>
          <span className="block">Digital</span>
          <span className="block">
            Experiences <span className="hero-move">That Move.</span>
          </span>
        </h1>

        <p
          ref={subRef}
          className="mt-8 max-w-[42ch] font-body text-base text-muted sm:text-lg"
        >
          Websites, platforms and digital products engineered for ambitious
          businesses — where design and engineering ship as one discipline.
        </p>
      </div>

      <div
        ref={indicatorRef}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 opacity-0"
      >
        {/* <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          Scroll to explore
        </span> */}
        <span className="animate-bounce font-mono text-lime">↓</span>
      </div>
    </section>
  );
}
