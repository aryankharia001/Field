import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { REVIEWS_ROW_1, REVIEWS_ROW_2 } from "../../data/reviews";
import { useScrollVelocity } from "../../hooks/useScrollVelocity";
import { useReducedMotion } from "../../hooks/useMediaQuery";

function Stars({ count = 5 }) {
  return (
    <span className="text-lime" aria-hidden="true">
      {"★".repeat(count)}
    </span>
  );
}

function Row({ items, reverse, rowRef }) {
  const doubled = [...items, ...items];
  return (
    <div className="no-scrollbar flex w-max" ref={rowRef}>
      {doubled.map((r, i) => (
        <div
          key={i}
          className="mx-3 flex shrink-0 items-center gap-3 rounded-full border border-line bg-surface px-6 py-3"
        >
          <Stars count={r.stars} />
          <span className="whitespace-nowrap text-sm text-ink/80">{r.text}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Two opposite-direction marquee rows whose speed reacts to scroll
 * velocity, wrapped in a container that flips ~180deg and fades as the
 * user scrolls through — a deliberately disorienting beat between the
 * orbiting testimonials and the numbers section.
 */
export default function ReviewMarquee() {
  const sectionRef = useRef(null);
  const flipRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const tweens = useRef({ row1: null, row2: null });
  const settleTimer = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.set(row1Ref.current, { xPercent: 0 });
      tweens.current.row1 = gsap.to(row1Ref.current, {
        xPercent: -50,
        duration: 32,
        repeat: -1,
        ease: "none",
      });

      gsap.set(row2Ref.current, { xPercent: -50 });
      tweens.current.row2 = gsap.to(row2Ref.current, {
        xPercent: 0,
        duration: 38,
        repeat: -1,
        ease: "none",
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=140%",
          scrub: 1,
          pin: true,
        },
      })
        .to(flipRef.current, { rotateX: 178, y: -30, ease: "power1.inOut", duration: 1 }, 0)
        .to(flipRef.current, { opacity: 0, duration: 1 }, 1);
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  useScrollVelocity((velocity) => {
    if (reduced) return;
    const abs = Math.min(Math.abs(velocity), 2.5);
    const scale = 1 + abs * 1.6;
    tweens.current.row1?.timeScale(scale);
    tweens.current.row2?.timeScale(scale);

    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      gsap.to(tweens.current.row1, { timeScale: 1, duration: 0.8, ease: "power2.out", overwrite: true });
      gsap.to(tweens.current.row2, { timeScale: 1, duration: 0.8, ease: "power2.out", overwrite: true });
    }, 140);
  });

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[90vh] items-center overflow-hidden bg-bg"
      style={{ perspective: 1200 }}
    >
      <div ref={flipRef} className="w-full [transform-style:preserve-3d]">
        <p className="mb-10 px-6 text-center font-mono text-xs uppercase tracking-[0.25em] text-lime md:px-12">
          ( 06 ) In Their Words
        </p>
        <div className="flex flex-col gap-5 border-y border-line py-8">
          <Row items={REVIEWS_ROW_1} rowRef={row1Ref} />
          <Row items={REVIEWS_ROW_2} rowRef={row2Ref} reverse />
        </div>
      </div>
    </section>
  );
}
