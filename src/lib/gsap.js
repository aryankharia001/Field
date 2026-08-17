import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Consistent easing vocabulary used across the whole site so motion reads
// as one system rather than a pile of unrelated animations.
export const EASE = {
  out: "power3.out",
  inOut: "power2.inOut",
  soft: "power1.out",
  expo: "expo.out",
};

export { gsap, ScrollTrigger, SplitText };
