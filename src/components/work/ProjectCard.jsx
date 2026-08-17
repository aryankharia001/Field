import { Link } from "react-router-dom";
import { cursorHoverProps } from "../../lib/cursorBus";

const OFFSET = {
  browser: "",
  "shape-high": "lg:-translate-y-14",
  dark: "lg:translate-y-8",
  fullscreen: "lg:-translate-y-4",
};

const WIDTH = {
  browser: "w-[78vw] lg:w-[62vw]",
  "shape-high": "w-[72vw] lg:w-[46vw]",
  dark: "w-[76vw] lg:w-[54vw]",
  fullscreen: "w-[86vw] lg:w-[72vw]",
};

const GRID_WIDTH = "w-full";

function Visual({ project }) {
  const accentVar = project.accent === "violet" ? "var(--color-violet)" : "var(--color-lime)";

  if (project.treatment === "browser") {
    return (
      <div className="flex h-full w-full flex-col overflow-hidden rounded-lg border border-line bg-surface">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2 w-2 rounded-full bg-ink/20" />
          <span className="h-2 w-2 rounded-full bg-ink/20" />
          <span className="h-2 w-2 rounded-full bg-ink/20" />
          <span className="ml-3 rounded-full bg-bg px-3 py-1 font-mono text-[10px] text-muted">
            {project.slug}.field.studio
          </span>
        </div>
        <div
          className="flex flex-1 flex-col justify-end gap-2 p-5"
          style={{ background: `radial-gradient(120% 100% at 20% 0%, ${accentVar}22, transparent 60%)` }}
        >
          <div className="h-2 w-2/3 rounded-full bg-ink/15" />
          <div className="h-2 w-1/2 rounded-full bg-ink/10" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="h-14 rounded-md border border-line" />
            <div className="h-14 rounded-md border border-line" />
            <div className="h-14 rounded-md" style={{ background: accentVar, opacity: 0.25 }} />
          </div>
        </div>
      </div>
    );
  }

  if (project.treatment === "shape-high") {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-line bg-surface">
        <div
          className="absolute h-40 w-40 rounded-full blur-2xl"
          style={{ background: accentVar, opacity: 0.35 }}
        />
        <div className="absolute h-48 w-48 rotate-45 rounded-3xl border border-line" />
        <div className="absolute h-28 w-28 rounded-full border" style={{ borderColor: accentVar }} />
      </div>
    );
  }

  if (project.treatment === "dark") {
    return (
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-lg border border-line bg-[#050505] p-6">
        <div className="flex justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Live Dashboard</span>
          <span className="h-2 w-2 rounded-full" style={{ background: accentVar }} />
        </div>
        <div className="flex items-end gap-1.5">
          {[30, 55, 40, 70, 50, 80, 60].map((h, i) => (
            <div
              key={i}
              className="w-3 rounded-t-sm"
              style={{ height: `${h}%`, background: i === 5 ? accentVar : "rgba(244,241,234,0.12)" }}
            />
          ))}
        </div>
      </div>
    );
  }

  // fullscreen
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-lg border border-line"
      style={{
        background: `linear-gradient(155deg, ${accentVar}33, #111111 55%, #070707)`,
      }}
    >
      <div className="absolute inset-0 bg-grid opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
    </div>
  );
}

export default function ProjectCard({ project, variant = "horizontal", index }) {
  const isGrid = variant === "grid";

  return (
    <Link
      to={`/work/${project.slug}`}
      {...cursorHoverProps("explore")}
      className={`group relative block shrink-0 ${isGrid ? GRID_WIDTH : `${WIDTH[project.treatment]} ${OFFSET[project.treatment]}`}`}
    >
      <div className={`overflow-hidden ${isGrid ? "aspect-[4/3]" : "aspect-[4/3] md:aspect-[16/10]"}`}>
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          <Visual project={project} />
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs text-muted">{project.number}</span>
            <h3 className="font-display text-2xl uppercase tracking-tight text-ink transition-colors group-hover:text-lime md:text-3xl">
              {project.name}
            </h3>
          </div>
          <p className="mt-1 text-sm text-muted">{project.category}</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted/70">{project.tech}</p>
        </div>
        <span className="shrink-0 font-mono text-xs text-muted">{project.year}</span>
      </div>
    </Link>
  );
}
