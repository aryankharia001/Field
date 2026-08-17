import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { AGENCY } from "../../data/content";
import { useReducedMotion } from "../../hooks/useMediaQuery";

/**
 * Short, non-blocking preloader (~1.2s). Counts up, then the screen
 * splits into two panels that part vertically to reveal the hero
 * underneath — a single cinematic beat, not a loading spinner.
 */
export default function Preloader({ onComplete }) {
  const rootRef = useRef(null);
  const countRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const contentRef = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) {
      onComplete?.();
      return undefined;
    }

    const counter = { val: 0 };
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => onComplete?.(),
    });

    tl.to(counter, {
      val: 100,
      duration: 1.05,
      ease: "power1.inOut",
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.textContent = String(Math.floor(counter.val)).padStart(2, "0");
        }
      },
    })
      .to(contentRef.current, { opacity: 0, y: -16, duration: 0.3, ease: "power2.in" }, "-=0.1")
      .to(topRef.current, { yPercent: -100, duration: 0.55, ease: "power4.inOut" }, "-=0.05")
      .to(bottomRef.current, { yPercent: 100, duration: 0.55, ease: "power4.inOut" }, "<")
      .set(rootRef.current, { display: "none" });

    return () => tl.kill();
  }, [reduced, onComplete]);

  return (
    <div
      ref={rootRef}
      role="status"
      aria-label={`Loading ${AGENCY.fullName}`}
      className="fixed inset-0 z-[200] text-ink"
    >
      <div ref={topRef} className="absolute inset-x-0 top-0 h-1/2 bg-bg" />
      <div ref={bottomRef} className="absolute inset-x-0 bottom-0 h-1/2 bg-bg" />
      <div ref={contentRef} className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted">
          Initializing Experience
        </p>
        <h1 className="font-display text-xl tracking-tight md:text-2xl">{AGENCY.fullName}</h1>
        <div className="font-mono text-[20vw] font-medium leading-none text-lime md:text-[8vw]" aria-hidden="true">
          <span ref={countRef}>00</span>
        </div>
      </div>
    </div>
  );
}
