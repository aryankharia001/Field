import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { useIsTouch, useReducedMotion } from "./useMediaQuery";

/**
 * Magnetic hover: an element subtly follows the cursor within its bounds,
 * then eases back to rest on leave. Desktop-only, disabled for
 * prefers-reduced-motion.
 */
export function useMagnetic(strength = 0.4) {
  const ref = useRef(null);
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || isTouch || reduced) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [isTouch, reduced, strength]);

  return ref;
}
