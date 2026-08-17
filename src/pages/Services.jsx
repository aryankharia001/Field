import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { SERVICES } from "../data/services";
import RevealText from "../components/ui/RevealText";
import { useReducedMotion } from "../hooks/useMediaQuery";

function ServiceBlock({ service, index }) {
  const ref = useRef(null);
  const visualRef = useRef(null);
  const reduced = useReducedMotion();
  const accent = index % 2 === 0 ? "var(--color-lime)" : "var(--color-violet)";

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        visualRef.current,
        { scale: 0.85, opacity: 0.4 },
        {
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%", end: "top 25%", scrub: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={ref} className="grid gap-10 border-t border-line py-16 md:grid-cols-[100px_1fr_1fr] md:py-24">
      <span className="font-mono text-sm text-muted">{service.id}</span>

      <div>
        <RevealText
          as="h2"
          split="lines"
          className="font-display text-[9vw] uppercase leading-[0.94] tracking-tight text-ink sm:text-[5vw] lg:text-[3vw]"
        >
          {service.title}
        </RevealText>
        <p className="mt-6 max-w-[52ch] text-base text-muted md:text-lg">{service.description}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {service.capabilities.map((c) => (
            <span key={c} className="rounded-full border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink/70">
              {c}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {service.tech.map((t) => (
            <span key={t} className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
              #{t}
            </span>
          ))}
        </div>
      </div>

      <div
        ref={visualRef}
        className="relative aspect-square w-full self-start overflow-hidden rounded-lg border border-line md:aspect-auto md:h-64"
        style={{ background: `radial-gradient(120% 100% at 30% 0%, ${accent}26, #111111 70%)` }}
      >
        <div className="absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]" />
        <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
          {service.id} / {String(SERVICES.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <>
      <section className="bg-bg px-6 pb-16 pt-40 md:px-12">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-lime">What we do</p>
        <RevealText
          as="h1"
          split="words"
          className="max-w-[20ch] font-display text-[12vw] uppercase leading-[0.92] tracking-tight text-ink sm:text-[8vw] lg:text-[5.4vw]"
        >
          Full-service, end to end — from first sketch to production.
        </RevealText>
      </section>

      <section className="bg-bg px-6 pb-24 md:px-12">
        <div className="mx-auto max-w-[1500px]">
          {SERVICES.map((service, i) => (
            <ServiceBlock key={service.id} service={service} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
