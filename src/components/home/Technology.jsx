import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "../../lib/gsap";
import { TECHNOLOGIES } from "../../data/technologies";
import { useIsTouch, useReducedMotion } from "../../hooks/useMediaQuery";
import SectionHeading from "../ui/SectionHeading";

// Deterministic scatter so the layout is stable across renders.
function layoutFor(i, total) {
  const cols = 4;
  const col = i % cols;
  const row = Math.floor(i / cols);
  const jitterX = ((i * 37) % 11) - 5;
  const jitterY = ((i * 53) % 9) - 4;
  return {
    left: `${8 + col * 24 + jitterX * 0.6}%`,
    top: `${10 + row * 26 + jitterY}%`,
    size: 1 + ((i * 13) % 3) * 0.4,
  };
}

export default function Technology() {
  const rootRef = useRef(null);
  const itemsRef = useRef([]);
  const [hovered, setHovered] = useState(null);
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          x: `+=${8 + (i % 3) * 4}`,
          y: `+=${6 + (i % 4) * 3}`,
          duration: 5 + (i % 5),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  const onMove = (e) => {
    if (isTouch || reduced || hovered === null) return;
    const bounds = rootRef.current.getBoundingClientRect();
    const mx = e.clientX - bounds.left;
    const my = e.clientY - bounds.top;

    itemsRef.current.forEach((el, i) => {
      if (!el || i === hovered) return;
      const rect = el.getBoundingClientRect();
      const ex = rect.left - bounds.left + rect.width / 2;
      const ey = rect.top - bounds.top + rect.height / 2;
      const dx = ex - mx;
      const dy = ey - my;
      const dist = Math.hypot(dx, dy);
      const radius = 160;
      if (dist < radius) {
        const force = (1 - dist / radius) * 22;
        gsap.to(el, {
          x: `+=${(dx / (dist || 1)) * force}`,
          y: `+=${(dy / (dist || 1)) * force}`,
          duration: 0.6,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    });
  };

  return (
    <section className="relative overflow-hidden bg-bg px-6 py-28 md:px-12 md:py-40">
      <SectionHeading index="( 04 )" label="What we build with" title="Technology" className="mb-16" />

      <div
        ref={rootRef}
        onMouseMove={onMove}
        onMouseLeave={() => setHovered(null)}
        className="relative h-[62vh] min-h-[420px] md:h-[70vh]"
      >
        {TECHNOLOGIES.map((tech, i) => {
          const pos = layoutFor(i, TECHNOLOGIES.length);
          const isActive = hovered === i;
          return (
            <button
              key={tech.name}
              type="button"
              ref={(el) => (itemsRef.current[i] = el)}
              onMouseEnter={() => setHovered(i)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display uppercase tracking-tight transition-colors duration-300"
              style={{
                left: pos.left,
                top: pos.top,
                fontSize: `${pos.size}rem`,
                color: isActive ? "var(--color-lime)" : "rgba(244,241,234,0.55)",
              }}
            >
              {tech.name}
              {isActive && (
                <span className="absolute left-1/2 top-full mt-2 w-max max-w-[220px] -translate-x-1/2 rounded-md border border-line bg-surface px-3 py-2 text-left font-mono text-[10px] normal-case leading-relaxed tracking-normal text-muted">
                  {tech.note}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
