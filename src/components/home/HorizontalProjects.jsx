import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { PROJECTS } from "../../data/projects";
import ProjectCard from "../work/ProjectCard";
import { useIsMobile, useReducedMotion } from "../../hooks/useMediaQuery";

/**
 * The centerpiece interaction: vertical scroll is pinned and converted
 * into horizontal motion across the project set, with velocity-reactive
 * skew and a distance-from-center scale bump per card. Falls back to a
 * plain vertical stack on mobile / reduced motion, per spec §34.
 */
export default function HorizontalProjects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const skewSettle = useRef(null);

  useLayoutEffect(() => {
    if (isMobile || reduced) return undefined;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const getDistance = () => track.scrollWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getDistance() + window.innerHeight * 0.7}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const velocity = self.getVelocity();
            const skew = gsap.utils.clamp(-5, 5, velocity / 3500);
            gsap.set(track, { skewX: skew });
            clearTimeout(skewSettle.current);
            skewSettle.current = setTimeout(() => {
              gsap.to(track, { skewX: 0, duration: 0.6, ease: "power3.out" });
            }, 120);

            const center = window.innerWidth / 2;
            cardsRef.current.forEach((card) => {
              if (!card) return;
              const rect = card.getBoundingClientRect();
              const dist = Math.abs(rect.left + rect.width / 2 - center);
              const norm = gsap.utils.clamp(0, 1, 1 - dist / (window.innerWidth * 0.85));
              gsap.set(card, { scale: 0.94 + norm * 0.06 });
            });
          },
        },
      });

      tl.to(track, { x: () => -getDistance(), ease: "none", duration: 8 }, 0).to(
        cardsRef.current[cardsRef.current.length - 1],
        { scale: 1.18, ease: "none", duration: 2 },
        8
      );
    }, sectionRef);

    return () => {
      clearTimeout(skewSettle.current);
      ctx.revert();
    };
  }, [isMobile, reduced]);

  if (isMobile || reduced) {
    return (
      <section className="bg-bg px-6 py-24">
        <p className="mb-10 font-mono text-xs uppercase tracking-[0.25em] text-lime">Selected Work</p>
        <div className="flex flex-col gap-14">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} variant="grid" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-bg">
      <div ref={trackRef} className="flex h-full items-center gap-16 pl-[8vw] will-change-transform">
        <div className="flex w-[46vw] shrink-0 flex-col justify-center pr-10">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-lime">Selected Work</p>
          <h2 className="font-display text-[7vw] uppercase leading-[0.9] tracking-tight text-ink lg:text-[4.4vw]">
            Recent
            <br />
            Builds
          </h2>
          <p className="mt-6 max-w-[38ch] text-muted">
            A handful of projects that show how we work — engineering, motion
            and design treated as one problem.
          </p>
        </div>

        {PROJECTS.map((project, i) => (
          <div key={project.slug} ref={(el) => (cardsRef.current[i] = el)} className="shrink-0">
            <ProjectCard project={project} index={i} />
          </div>
        ))}

        <div className="w-[6vw] shrink-0" />
      </div>
    </section>
  );
}
