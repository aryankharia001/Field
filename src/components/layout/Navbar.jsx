import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { gsap } from "../../lib/gsap";
import { AGENCY, NAV_LINKS } from "../../data/content";
import { cursorHoverProps } from "../../lib/cursorBus";
import MagneticButton from "../ui/MagneticButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const overlayRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useLayoutEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (!overlayRef.current) return;
    if (menuOpen) {
      gsap.set(overlayRef.current, { display: "flex" });
      gsap.fromTo(overlayRef.current, { clipPath: "inset(0 0 100% 0)" }, {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.6,
        ease: "power4.inOut",
      });
      gsap.fromTo(
        linksRef.current,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.07, delay: 0.2, ease: "power4.out" }
      );
    } else if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => gsap.set(overlayRef.current, { display: "none" }),
      });
    }
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] flex justify-center transition-all duration-500 ${
          scrolled ? "pt-3" : "pt-6"
        }`}
      >
        <div
          className={`flex w-[min(1200px,92vw)] items-center justify-between rounded-full border px-5 transition-all duration-500 ${
            scrolled
              ? "border-line bg-bg/70 py-2.5 backdrop-blur-md"
              : "border-transparent bg-transparent py-3"
          }`}
        >
          <Link
            to="/"
            className={`font-display font-semibold tracking-tight transition-all duration-500 ${
              scrolled ? "text-lg" : "text-xl"
            }`}
            {...cursorHoverProps("view")}
          >
            {AGENCY.name}
            <span className="text-lime">.</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                {...cursorHoverProps("view")}
                className={({ isActive }) =>
                  `group relative font-mono text-xs uppercase tracking-[0.15em] ${
                    isActive ? "text-lime" : "text-ink/80"
                  }`
                }
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-lime transition-all duration-300 group-hover:w-full" />
              </NavLink>
            ))}
          </nav>

          <MagneticButton
            to="/contact"
            cursor="talk"
            className="hidden rounded-full border border-line px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-ink hover:border-lime hover:text-lime md:inline-flex"
          >
            Start a Project
          </MagneticButton>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span
              className={`h-px w-5 bg-ink transition-transform duration-300 ${
                menuOpen ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-ink transition-transform duration-300 ${
                menuOpen ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-[75] hidden flex-col justify-center bg-bg px-8 md:hidden"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <nav className="flex flex-col gap-2">
          {NAV_LINKS.map((link, i) => (
            <div key={link.to} className="overflow-hidden py-2">
              <Link
                ref={(el) => (linksRef.current[i] = el)}
                to={link.to}
                className="block font-display text-[13vw] leading-none text-ink"
              >
                {link.label}
              </Link>
            </div>
          ))}
          <div className="overflow-hidden py-2">
            <Link
              ref={(el) => (linksRef.current[NAV_LINKS.length] = el)}
              to="/contact"
              className="block font-display text-[13vw] leading-none text-lime"
            >
              Contact
            </Link>
          </div>
        </nav>
        <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-muted">{AGENCY.email}</p>
      </div>
    </>
  );
}
