import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useMediaQuery";

const PARTICLES = Array.from({ length: 14 }).map((_, i) => ({
  id: i,
  left: (i * 7.3) % 100,
  size: 2 + ((i * 5) % 4),
  delay: (i % 7) * 0.6,
  duration: 9 + (i % 5) * 2,
}));

/**
 * Abstract ambient background for the hero: a slowly drifting grid,
 * two soft gradient blobs, and a handful of glowing particles.
 * Everything animates via transform/opacity only.
 */
export default function HeroBackground() {
  const rootRef = useRef(null);
  const gridRef = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.to(gridRef.current, {
        backgroundPosition: "64px 64px",
        duration: 14,
        repeat: -1,
        ease: "none",
      });

      gsap.utils.toArray(".hero-blob").forEach((blob, i) => {
        gsap.to(blob, {
          x: i % 2 === 0 ? 40 : -30,
          y: i % 2 === 0 ? -30 : 40,
          duration: 10 + i * 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      gsap.utils.toArray(".hero-particle").forEach((p) => {
        gsap.to(p, {
          y: "-=40",
          opacity: 0,
          duration: gsap.utils.random(6, 10),
          repeat: -1,
          delay: gsap.utils.random(0, 4),
          ease: "power1.out",
        });
      });

      gsap.to(rootRef.current, {
        yPercent: 16,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current.parentElement,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      <div ref={gridRef} className="bg-grid absolute -inset-x-10 -inset-y-10 opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_40%,black,transparent)]" />

      <div className="hero-blob absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-lime/10 blur-[110px]" />
      <div className="hero-blob absolute -right-24 top-1/3 h-[380px] w-[380px] rounded-full bg-violet/10 blur-[110px]" />

      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="hero-particle absolute rounded-full bg-lime shadow-[0_0_10px_2px_rgba(184,255,61,0.55)]"
          style={{
            left: `${p.left}%`,
            top: `${60 + ((p.id * 13) % 30)}%`,
            width: p.size,
            height: p.size,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
}
