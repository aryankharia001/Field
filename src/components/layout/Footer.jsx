import { Link } from "react-router-dom";
import { AGENCY, NAV_LINKS } from "../../data/content";
import RevealText from "../ui/RevealText";
import MagneticButton from "../ui/MagneticButton";

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-bg px-6 pb-8 pt-20 md:px-12 md:pt-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-10 border-b border-line pb-14 md:flex-row md:items-end">
          <RevealText
            as="h2"
            split="lines"
            className="font-display text-[16vw] leading-[0.85] tracking-tight md:text-[8vw]"
          >
            LET'S <br /> TALK.
          </RevealText>

          <MagneticButton
            to="/contact"
            cursor="talk"
            strength={0.5}
            className="group flex h-32 w-32 shrink-0 items-center justify-center rounded-full border border-line font-mono text-xs uppercase tracking-[0.15em] text-ink transition-colors hover:border-lime hover:bg-lime hover:text-bg md:h-40 md:w-40"
          >
            Start a Project →
          </MagneticButton>
        </div>

        <div className="grid grid-cols-2 gap-10 py-14 md:grid-cols-4">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">{AGENCY.name}</p>
            <p className="max-w-[24ch] text-sm text-muted">{AGENCY.fullName} — {AGENCY.location}</p>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">Navigate</p>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-ink/80 hover:text-lime">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">Contact</p>
            <ul className="flex flex-col gap-2">
              <li>
                <a href={`mailto:${AGENCY.email}`} className="text-sm text-ink/80 hover:text-lime">
                  {AGENCY.email}
                </a>
              </li>
              <li className="text-sm text-ink/80">{AGENCY.phone}</li>
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">Follow</p>
            <ul className="flex flex-col gap-2">
              {AGENCY.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-ink/80 hover:text-lime"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-8 font-mono text-[11px] uppercase tracking-[0.15em] text-muted md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} {AGENCY.fullName}. All rights reserved.</span>
          <span>Built in-house — this site is the demo.</span>
        </div>
      </div>
    </footer>
  );
}
