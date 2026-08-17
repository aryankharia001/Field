import { useLayoutEffect, useRef, useState } from "react";
import { useLocation, Routes } from "react-router-dom";
import { gsap } from "../../lib/gsap";
import { useLenis } from "../../hooks/useLenis";
import { useReducedMotion } from "../../hooks/useMediaQuery";

/**
 * Route-change transition: the outgoing view darkens, a lime line sweeps
 * across to full coverage, the route swaps underneath while fully
 * covered, then the line recedes to reveal the new page. ~700ms total.
 */
export default function PageTransition({ children }) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const overlayRef = useRef(null);
  const lineRef = useRef(null);
  const lenis = useLenis();
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (location.pathname === displayLocation.pathname) return undefined;

    if (reduced) {
      setDisplayLocation(location);
      window.scrollTo(0, 0);
      return undefined;
    }

    lenis?.stop();
    const overlay = overlayRef.current;
    const line = lineRef.current;

    const tl = gsap.timeline({
      onComplete: () => lenis?.start(),
    });

    tl.set(overlay, { display: "block" })
      .to(overlay, { opacity: 1, duration: 0.15, ease: "power1.out" })
      .fromTo(
        line,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.3, ease: "power3.inOut" },
        "<0.05"
      )
      .add(() => {
        setDisplayLocation(location);
        window.scrollTo(0, 0);
        lenis?.scrollTo(0, { immediate: true });
      })
      .to(line, { scaleX: 0, transformOrigin: "right center", duration: 0.3, ease: "power3.inOut" }, "+=0.06")
      .to(overlay, { opacity: 0, duration: 0.25, ease: "power1.out" }, "<")
      .set(overlay, { display: "none" });

    return () => tl.kill();
    // `displayLocation` is intentionally excluded: the timeline's own
    // `.add()` callback updates it mid-flight, and re-running this effect
    // at that moment would kill the timeline (via the cleanup below)
    // while it's still animating, freezing the overlay mid-transition.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, lenis, reduced]);

  return (
    <>
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[95] hidden bg-bg opacity-0"
      >
        <div ref={lineRef} className="h-full w-full origin-left scale-x-0 bg-lime" />
      </div>
      <Routes location={displayLocation}>{children}</Routes>
    </>
  );
}
