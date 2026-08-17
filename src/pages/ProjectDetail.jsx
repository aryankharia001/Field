import { useLayoutEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { gsap } from "../lib/gsap";
import { PROJECTS } from "../data/projects";
import RevealText from "../components/ui/RevealText";
import ProjectCard from "../components/work/ProjectCard";
import { cursorHoverProps } from "../lib/cursorBus";
import { useReducedMotion } from "../hooks/useMediaQuery";

const SECTIONS = [
  { key: "challenge", label: "The Challenge" },
  { key: "approach", label: "The Approach" },
  { key: "build", label: "The Build" },
  { key: "result", label: "Result" },
];

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);
  const heroRef = useRef(null);
  const visualRef = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced || !project) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        visualRef.current,
        { clipPath: "inset(6% 6% round 12px)" },
        {
          clipPath: "inset(0% 0% round 0px)",
          ease: "none",
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
        }
      );
    }, heroRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, slug]);

  if (!project) {
    return (
      <section className="flex min-h-[70svh] flex-col items-center justify-center gap-6 px-6 pt-24 text-center">
        <h1 className="font-display text-4xl text-ink">Project not found</h1>
        <Link to="/work" className="font-mono text-xs uppercase tracking-[0.15em] text-lime">
          ← Back to work
        </Link>
      </section>
    );
  }

  const accentVar = project.accent === "violet" ? "var(--color-violet)" : "var(--color-lime)";
  const otherProjects = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <section ref={heroRef} className="relative bg-bg px-6 pb-16 pt-36 md:px-12">
        <div className="mx-auto max-w-[1500px]">
          <Link
            to="/work"
            {...cursorHoverProps("view")}
            className="mb-8 inline-block font-mono text-xs uppercase tracking-[0.15em] text-muted hover:text-lime"
          >
            ← All work
          </Link>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="font-mono text-sm text-muted">{project.number}</span>
              <RevealText
                as="h1"
                split="words"
                className="mt-2 font-display text-[15vw] uppercase leading-[0.88] tracking-tight text-ink sm:text-[9vw] lg:text-[6.4vw]"
              >
                {project.name}
              </RevealText>
            </div>
            <div className="flex gap-10 font-mono text-xs uppercase tracking-[0.15em] text-muted">
              <div>
                <p className="text-muted/60">Category</p>
                <p className="mt-1 text-ink">{project.category}</p>
              </div>
              <div>
                <p className="text-muted/60">Year</p>
                <p className="mt-1 text-ink">{project.year}</p>
              </div>
            </div>
          </div>

          <div
            ref={visualRef}
            className="relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-lg border border-line"
            style={{ background: `linear-gradient(155deg, ${accentVar}33, #111111 55%, #070707)` }}
          >
            <div className="absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
          </div>
        </div>
      </section>

      <section className="bg-bg px-6 py-20 md:px-12">
        <div className="mx-auto grid max-w-[1500px] gap-14 md:grid-cols-[280px_1fr]">
          <aside className="h-max md:sticky md:top-32">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Summary</p>
            <p className="mt-4 max-w-[32ch] text-ink/80">{project.summary}</p>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">Technology</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.split(" / ").map((t) => (
                <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink/70">
                  {t}
                </span>
              ))}
            </div>
          </aside>

          <div className="flex flex-col gap-16">
            {SECTIONS.filter((s) => s.key !== "result" || project.result).map((s) => (
              <div key={s.key} className="border-t border-line pt-8">
                <RevealText as="h2" split="lines" className="font-display text-3xl uppercase tracking-tight text-ink md:text-4xl">
                  {s.label}
                </RevealText>
                <p className="mt-5 max-w-[68ch] text-base leading-relaxed text-muted md:text-lg">
                  {project[s.key]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-bg px-6 py-24 md:px-12">
        <p className="mb-10 font-mono text-xs uppercase tracking-[0.2em] text-muted">More projects</p>
        <div className="mx-auto grid max-w-[1500px] gap-14 md:grid-cols-3">
          {otherProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} variant="grid" />
          ))}
        </div>
      </section>
    </>
  );
}
