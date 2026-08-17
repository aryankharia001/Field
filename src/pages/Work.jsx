import { useState } from "react";
import { PROJECTS } from "../data/projects";
import ProjectCard from "../components/work/ProjectCard";
import RevealText from "../components/ui/RevealText";

// Deliberate asymmetry: not every project takes the same grid footprint.
const SPAN = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];
const OFFSET = ["", "md:mt-20", "", "md:mt-16"];

export default function Work() {
  const [hovered, setHovered] = useState(null);

  return (
    <>
      <section className="bg-bg px-6 pb-16 pt-40 md:px-12">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-lime">Selected Work</p>
        <RevealText
          as="h1"
          split="words"
          className="max-w-[18ch] font-display text-[12vw] uppercase leading-[0.92] tracking-tight text-ink sm:text-[8vw] lg:text-[5.6vw]"
        >
          Projects built to hold up under real use.
        </RevealText>
      </section>

      <section className="bg-bg px-6 pb-32 md:px-12">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-12">
          {PROJECTS.map((project, i) => (
            <div
              key={project.slug}
              className={`${SPAN[i % SPAN.length]} ${OFFSET[i % OFFSET.length]} transition-all duration-500`}
              onMouseEnter={() => setHovered(project.slug)}
              onMouseLeave={() => setHovered(null)}
              style={{
                opacity: hovered && hovered !== project.slug ? 0.45 : 1,
                transform: hovered && hovered !== project.slug ? "scale(0.98)" : "scale(1)",
              }}
            >
              <ProjectCard project={project} variant="grid" index={i} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
