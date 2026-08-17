import { useState } from "react";
import { AGENCY } from "../data/content";
import RevealText from "../components/ui/RevealText";
import { useMagnetic } from "../hooks/useMagnetic";
import { cursorHoverProps } from "../lib/cursorBus";

const BUDGETS = ["< $10k", "$10k – $25k", "$25k – $75k", "$75k+"];

function Field({ label, name, value, onChange, required, as = "input", type = "text", options }) {
  const [focused, setFocused] = useState(false);
  const filled = String(value ?? "").length > 0;
  const active = focused || filled;

  const shared = {
    id: name,
    name,
    value,
    required,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onChange,
    className:
      "peer w-full bg-transparent pt-6 pb-2 text-lg text-ink outline-none placeholder:text-transparent",
  };

  return (
    <div className="relative border-b border-line py-1 transition-colors duration-300 focus-within:border-lime">
      <label
        htmlFor={name}
        className={`pointer-events-none absolute left-0 font-mono uppercase tracking-[0.15em] text-muted transition-all duration-300 ${
          active ? "top-0 text-[10px]" : "top-6 text-sm"
        }`}
      >
        {label} {required && <span className="text-lime">*</span>}
      </label>

      {as === "textarea" ? (
        <textarea rows={4} {...shared} />
      ) : as === "select" ? (
        <select {...shared}>
          <option value="" disabled hidden />
          {options.map((o) => (
            <option key={o} value={o} className="bg-surface text-ink">
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input type={type} {...shared} />
      )}

      <span className="absolute bottom-0 left-0 h-px w-0 bg-lime transition-all duration-500 peer-focus:w-full" />
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", budget: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const submitRef = useMagnetic(0.3);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    // Frontend-only interaction — no backend is wired up yet.
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 900);
  };

  return (
    <section className="bg-bg px-6 pb-28 pt-40 md:px-12">
      <div className="mx-auto grid max-w-[1500px] gap-16 md:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-lime">Start a project</p>
          <RevealText
            as="h1"
            split="lines"
            className="font-display text-[13vw] uppercase leading-[0.9] tracking-tight text-ink sm:text-[8vw] lg:text-[5.4vw]"
          >
            Let's make <br /> something <br /> great.
          </RevealText>

          <div className="mt-16 flex flex-col gap-6 border-t border-line pt-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Email</p>
              <a href={`mailto:${AGENCY.email}`} className="mt-1 block text-lg text-ink hover:text-lime">
                {AGENCY.email}
              </a>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Based</p>
              <p className="mt-1 text-lg text-ink">{AGENCY.location}</p>
            </div>
          </div>
        </div>

        <div>
          {status === "sent" ? (
            <div className="flex h-full min-h-[420px] flex-col items-start justify-center gap-4 border-t border-line pt-10">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-lime">Message sent</span>
              <p className="font-display text-3xl tracking-tight text-ink">
                Thanks — we'll get back to you within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-2 border-t border-line pt-6" noValidate>
              <Field label="Name" name="name" value={form.name} onChange={update("name")} required />
              <Field label="Email" name="email" type="email" value={form.email} onChange={update("email")} required />
              <Field label="Company" name="company" value={form.company} onChange={update("company")} />
              <Field label="Budget" name="budget" as="select" options={BUDGETS} value={form.budget} onChange={update("budget")} />
              <Field
                label="Tell us about the project"
                name="message"
                as="textarea"
                value={form.message}
                onChange={update("message")}
                required
              />

              <button
                ref={submitRef}
                type="submit"
                disabled={status === "sending"}
                {...cursorHoverProps("talk")}
                className="group mt-8 flex w-max items-center gap-4 rounded-full border border-line px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] text-ink transition-colors duration-300 hover:border-lime hover:text-lime disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send Message"}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
