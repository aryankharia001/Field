import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "../../lib/gsap";
import { SERVICES } from "../../data/services";
import { useIsTouch } from "../../hooks/useMediaQuery";
import { cursorHoverProps } from "../../lib/cursorBus";
import SectionHeading from "../ui/SectionHeading";

const PREVIEW_GRADIENTS = [
  "linear-gradient(135deg, #B8FF3D33, #07070700)",
  "linear-gradient(135deg, #7C5CFF44, #07070700)",
  "linear-gradient(135deg, #B8FF3D22, #7C5CFF33)",
  "linear-gradient(135deg, #7C5CFF33, #B8FF3D22)",
  "linear-gradient(135deg, #B8FF3D44, #07070700)",
];

export default function Services() {
  const [active, setActive] = useState(null);
  const isTouch = useIsTouch();
  const previewRef = useRef(null);
  const listRef = useRef(null);

  const onMove = (e) => {
    if (isTouch || !previewRef.current || !listRef.current) return;
    const bounds = listRef.current.getBoundingClientRect();
    gsap.to(previewRef.current, {
      y: e.clientY - bounds.top - 90,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const toggle = (id) => {
    if (!isTouch) return;
    setActive((cur) => (cur === id ? null : id));
  };

  return (
    <section className="relative bg-bg px-6 py-28 md:px-12 md:py-36" id="services">
      <SectionHeading index="( 02 )" label="What we do" title="Services" className="mb-14" />

      <div ref={listRef} onMouseMove={onMove} className="relative border-t border-line">
        {SERVICES.map((service, i) => (
          <div
            key={service.id}
            onMouseEnter={() => !isTouch && setActive(service.id)}
            onMouseLeave={() => !isTouch && setActive(null)}
            onClick={() => toggle(service.id)}
            {...cursorHoverProps("view")}
            className="group cursor-pointer border-b border-line py-7 transition-colors duration-300 md:py-9"
          >
            <div className="flex items-baseline justify-between gap-6">
              <div className="flex items-baseline gap-5 md:gap-10">
                <span className="font-mono text-sm text-muted">{service.id}</span>
                <h3
                  className={`font-display uppercase leading-none tracking-tight transition-all duration-500 ease-out ${
                    active === service.id
                      ? "text-[9vw] text-lime sm:text-[5.5vw] lg:text-[3.6vw]"
                      : "text-[7vw] text-ink sm:text-[4vw] lg:text-[2.6vw]"
                  }`}
                >
                  {service.title}
                </h3>
              </div>
              <span
                className={`hidden shrink-0 font-mono text-xs uppercase tracking-[0.15em] text-muted transition-opacity duration-300 md:block ${
                  active === service.id ? "opacity-0" : "opacity-100"
                }`}
              >
                {String(i + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
              </span>
            </div>

            <div
              className="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
              style={{ gridTemplateRows: active === service.id ? "1fr" : "0fr" }}
            >
              <div className="min-h-0">
                <div className="flex flex-col gap-6 pt-6 md:flex-row md:items-start md:justify-between md:pl-[3.2rem]">
                  <p className="max-w-[46ch] text-sm text-muted md:text-base">{service.description}</p>
                  <ul className="flex flex-wrap gap-2 md:max-w-[280px] md:justify-end">
                    {service.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink/70"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div
          ref={previewRef}
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 hidden h-[180px] w-[240px] overflow-hidden rounded-lg border border-line opacity-0 transition-opacity duration-300 lg:block"
          style={{
            opacity: active && !isTouch ? 1 : 0,
            background: PREVIEW_GRADIENTS[SERVICES.findIndex((s) => s.id === active) % PREVIEW_GRADIENTS.length] ?? "transparent",
            backgroundColor: "#111111",
          }}
        >
          <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
            {active}
          </span>
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <Link
          to="/services"
          {...cursorHoverProps("view")}
          className="font-mono text-xs uppercase tracking-[0.15em] text-ink/70 underline decoration-line underline-offset-4 hover:text-lime hover:decoration-lime"
        >
          View all services →
        </Link>
      </div>
    </section>
  );
}
