import { useLayoutEffect, useRef } from "react";
import { gsap, SplitText } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useMediaQuery";

/**
 * Scroll-triggered text reveal. Splits into lines (masked, slide up),
 * words, or chars, and animates them in as the element enters the
 * viewport. This is the single source of truth for "text reveals upward"
 * used across the site, so timing/easing stays consistent everywhere.
 */
export default function RevealText({
  as: Tag = "div",
  children,
  split = "lines",
  start = "top 88%",
  delay = 0,
  stagger,
  duration = 1,
  className = "",
  scrollerRef,
  ...props
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (reduced) {
      gsap.set(el, { opacity: 1 });
      return undefined;
    }

    const wrappers = [];
    let splitInstance;

    const ctx = gsap.context(() => {
      splitInstance = new SplitText(el, {
        type: split === "chars" ? "words,chars" : split === "words" ? "words" : "lines",
        linesClass: "split-line",
        wordsClass: "split-word",
        charsClass: "split-char",
      });

      let targets;
      if (split === "lines") {
        targets = splitInstance.lines;
        targets.forEach((line) => {
          const wrapper = document.createElement("div");
          wrapper.style.overflow = "hidden";
          wrapper.style.display = "block";
          line.parentNode.insertBefore(wrapper, line);
          wrapper.appendChild(line);
          wrappers.push(wrapper);
        });
      } else if (split === "chars") {
        targets = splitInstance.chars;
      } else {
        targets = splitInstance.words;
      }

      gsap.set(targets, { yPercent: 112, opacity: 0 });
      gsap.to(targets, {
        yPercent: 0,
        opacity: 1,
        duration,
        delay,
        stagger: stagger ?? (split === "lines" ? 0.09 : split === "words" ? 0.045 : 0.018),
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none reverse",
        },
      });
    }, ref);

    return () => {
      ctx.revert();
      wrappers.forEach((w) => {
        const line = w.firstChild;
        if (line && w.parentNode) w.parentNode.insertBefore(line, w);
        w.remove();
      });
      splitInstance?.revert();
    };
  }, [reduced, split, start, delay, stagger, duration]);

  return (
    <Tag ref={ref} className={className} {...props}>
      {children}
    </Tag>
  );
}
