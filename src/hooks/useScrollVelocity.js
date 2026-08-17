import { useEffect, useRef } from "react";
import { useLenis } from "./useLenis";

/**
 * Tracks normalized scroll velocity (roughly -1..1+ range, unclamped on the
 * high end) and calls onVelocity on every tick. Used to drive velocity-
 * reactive effects (marquee speed, skew) without each consumer wiring its
 * own scroll listener.
 */
export function useScrollVelocity(onVelocity) {
  const lenis = useLenis();
  const cb = useRef(onVelocity);
  cb.current = onVelocity;

  useEffect(() => {
    if (!lenis) return;
    const handler = (e) => {
      const v = e.velocity ?? 0;
      cb.current?.(gsap_clamp(v));
    };
    lenis.on("scroll", handler);
    return () => lenis.off("scroll", handler);
  }, [lenis]);
}

function gsap_clamp(v) {
  return Math.max(-2.5, Math.min(2.5, v));
}
