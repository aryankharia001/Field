import RevealText from "../ui/RevealText";

export default function Philosophy() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center gap-16 bg-bg px-6 py-32 md:gap-20 md:px-12">
      <RevealText
        as="p"
        split="lines"
        className="max-w-[20ch] text-center font-display text-[9vw] uppercase leading-[1] tracking-tight text-muted sm:max-w-[16ch] sm:text-[5.5vw] lg:text-[3.4vw]"
      >
        Good design <br /> gets attention.
      </RevealText>

      <RevealText
        as="p"
        split="lines"
        start="top 80%"
        delay={0.15}
        className="max-w-[18ch] text-center font-display text-[11vw] uppercase leading-[0.95] tracking-tight text-lime sm:max-w-[15ch] sm:text-[7vw] lg:text-[4.6vw]"
      >
        Good engineering <br /> keeps it.
      </RevealText>
    </section>
  );
}
