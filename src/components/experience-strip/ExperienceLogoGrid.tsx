import { experienceCompanies } from "@/content/experience";

const logos: Record<(typeof experienceCompanies)[number], string> = {
  ZUPERIOR: "/logos/zuperior.svg",
  ZETA: "/logos/zeta.svg",
  FLIPKART: "/logos/flipkart.svg",
  AMAZON: "/logos/amazon.svg",
  EXPEDIA: "/logos/expedia.svg",
  PROBO: "/logos/probo.svg",
};

export function ExperienceLogoGrid() {
  return (
    <section className="border-b border-white/10 py-14 md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-semibold tracking-[-0.03em]">
          EXPERIENCE AT SCALE.
        </h2>
        <p className="mt-3 max-w-xl text-xs tracking-[0.2em] text-zinc-600 uppercase">
          Experience across product &amp; technology teams at
        </p>
        <ul className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6">
          {experienceCompanies.map((name) => (
            <li
              key={name}
              className="flex h-14 items-center justify-center border border-white/10 px-3 opacity-70 grayscale transition hover:opacity-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logos[name]}
                alt={`${name} — team experience, not a KorvaLabs client`}
                className="max-h-5 w-auto max-w-full object-contain brightness-200"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
