import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "../lib/gsap";
import { AGENCY } from "../data/content";
import { TECHNOLOGIES } from "../data/technologies";
import RevealText from "../components/ui/RevealText";
import MagneticButton from "../components/ui/MagneticButton";
import { useReducedMotion } from "../hooks/useMediaQuery";

const BELIEFS = [
  {
    id: "01",
    title: "Design and engineering are one discipline.",
    body: "We don't hand off between departments. The people designing the interaction are in the same room as the people shipping the code.",
  },
  {
    id: "02",
    title: "Performance is a design decision.",
    body: "A beautiful site that loads slowly isn't beautiful. We treat speed as a feature we design for, not an afterthought we optimize later.",
  },
  {
    id: "03",
    title: "Motion has to earn its place.",
    body: "We can build almost any animation. We ask, first, whether it clarifies or decorates — and we cut anything that only decorates.",
  },
];

const TIMELINE = [
  { year: "Y1", title: "Studio founded", body: "Started as a two-person team building bespoke sites for early-stage founders." },
  { year: "Y1–2", title: "First platform builds", body: "Grew into full web applications and e-commerce platforms for growing teams." },
  { year: "Now", title: "Full-service studio", body: "Design, engineering and motion under one roof, working with ambitious, established businesses." },
];

export default function About() {
  const heroRef = useRef(null);
  const imgColRef = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.to(imgColRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, heroRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <>
      <section ref={heroRef} className="relative flex min-h-[85svh] items-end overflow-hidden bg-bg px-6 pb-20 pt-40 md:px-12">
        <div ref={imgColRef} className="pointer-events-none absolute right-[6vw] top-24 hidden h-[52vh] w-[26vw] rounded-lg border border-line bg-surface lg:block">
          <div className="absolute inset-0 bg-grid opacity-25 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        </div>

        <div className="max-w-[1400px]">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-lime">About {AGENCY.name}</p>
          <RevealText
            as="h1"
            split="words"
            className="font-display text-[13vw] uppercase leading-[0.9] tracking-tight text-ink sm:text-[9vw] lg:text-[6.4vw]"
          >
            We're a studio that builds the internet's better-made corners.
          </RevealText>
        </div>
      </section>

      <section className="border-t border-line bg-bg px-6 py-24 md:px-12">
        <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-[1fr_2fr]">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">( 01 ) Who we are</p>
          <RevealText
            as="p"
            split="lines"
            className="max-w-[60ch] font-display text-2xl leading-snug tracking-tight text-ink sm:text-3xl md:text-4xl"
          >
            {AGENCY.fullName} is a small team of designers and engineers who
            build websites, applications and digital products for businesses
            that take their digital presence seriously. No account managers,
            no bloated process — the people you talk to are the people
            building your product.
          </RevealText>
        </div>
      </section>

      <section className="border-t border-line bg-bg px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-12 font-mono text-xs uppercase tracking-[0.2em] text-muted">( 02 ) What we believe</p>
          <div className="flex flex-col divide-y divide-line border-y border-line">
            {BELIEFS.map((b) => (
              <div key={b.id} className="grid gap-4 py-10 md:grid-cols-[80px_1fr_1fr] md:gap-10">
                <span className="font-mono text-sm text-muted">{b.id}</span>
                <h3 className="font-display text-2xl tracking-tight text-ink md:text-3xl">{b.title}</h3>
                <p className="max-w-[48ch] text-sm text-muted md:text-base">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-bg px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-10 font-mono text-xs uppercase tracking-[0.2em] text-muted">( 03 ) Capabilities &amp; technology</p>
          <div className="flex flex-wrap gap-3">
            {TECHNOLOGIES.map((t) => (
              <span
                key={t.name}
                className="rounded-full border border-line px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-ink/70 transition-colors hover:border-lime hover:text-lime"
              >
                {t.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-bg px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-14 font-mono text-xs uppercase tracking-[0.2em] text-muted">( 04 ) Timeline</p>
          <div className="grid gap-10 md:grid-cols-3">
            {TIMELINE.map((t) => (
              <div key={t.title} className="border-t border-lime pt-6">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-lime">{t.year}</span>
                <h3 className="mt-3 font-display text-xl tracking-tight text-ink md:text-2xl">{t.title}</h3>
                <p className="mt-2 text-sm text-muted">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-bg px-6 py-28 text-center md:px-12">
        <RevealText
          as="h2"
          split="lines"
          className="mx-auto max-w-[16ch] font-display text-[11vw] uppercase leading-[0.94] tracking-tight text-ink sm:text-[7vw] lg:text-[4.6vw]"
        >
          Let's build something worth talking about.
        </RevealText>
        <div className="mt-10 flex justify-center">
          <MagneticButton
            to="/contact"
            cursor="talk"
            className="rounded-full border border-line px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] text-ink hover:border-lime hover:text-lime"
          >
            Get in touch →
          </MagneticButton>
        </div>
      </section>
    </>
  );
}
