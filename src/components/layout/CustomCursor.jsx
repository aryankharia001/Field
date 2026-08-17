import { useEffect, useRef, useState } from "react";
import { gsap } from "../../lib/gsap";
import { cursorBus } from "../../lib/cursorBus";
import { useIsTouch, useReducedMotion } from "../../hooks/useMediaQuery";

const LABELS = {
  view: "VIEW",
  explore: "EXPLORE",
  talk: "LET'S TALK",
};

export default function CustomCursor() {
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();
  const active = !isTouch;

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [variant, setVariant] = useState("default");

  useEffect(() => {
    if (!active) return undefined;
    return cursorBus.subscribe(setVariant);
  }, [active]);

  useEffect(() => {
    if (!active) return undefined;
    document.documentElement.classList.add("has-custom-cursor");

    const dot = dotRef.current;
    const ring = ringRef.current;
    const dur = reduced ? 0 : 0.5;

    const dotX = gsap.quickTo(dot, "x", { duration: reduced ? 0 : 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: reduced ? 0 : 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: dur, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: dur, ease: "power3.out" });

    const onMove = (e) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };
    const onDown = () => gsap.to(ring, { scale: 0.85, duration: 0.2 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.2 });
    const onLeaveWindow = () => gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    const onEnterWindow = () => gsap.to([dot, ring], { opacity: 1, duration: 0.2 });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
    };
  }, [active, reduced]);

  if (!active) return null;

  const hasLabel = variant !== "default";

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime transition-opacity duration-200"
        style={{ opacity: hasLabel ? 0 : 1 }}
      />
      <div
        ref={ringRef}
        data-variant={variant}
        className="fixed left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink/40 transition-[width,height,background-color,border-color] duration-300 ease-out"
        style={{
          width: hasLabel ? 92 : 34,
          height: hasLabel ? 92 : 34,
          backgroundColor: hasLabel ? "#B8FF3D" : "rgba(244,241,234,0.02)",
          borderColor: hasLabel ? "transparent" : "rgba(244,241,234,0.4)",
        }}
      >
        <span
          className="font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-bg transition-opacity duration-200"
          style={{ opacity: hasLabel ? 1 : 0 }}
        >
          {LABELS[variant]}
        </span>
      </div>
    </div>
  );
}
