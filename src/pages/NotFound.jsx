import { Link } from "react-router-dom";
import { cursorHoverProps } from "../lib/cursorBus";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center gap-6 px-6 pt-24 text-center">
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">404</span>
      <h1 className="font-display text-[14vw] uppercase leading-none tracking-tight text-ink sm:text-[7vw]">
        Page not found
      </h1>
      <Link to="/" {...cursorHoverProps("view")} className="font-mono text-xs uppercase tracking-[0.15em] text-lime">
        ← Back home
      </Link>
    </section>
  );
}
