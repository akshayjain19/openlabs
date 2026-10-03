import { experienceCompanies } from "@/content/experience";

type LogoAsset = { src: string; height: number };

const logos: Record<(typeof experienceCompanies)[number], LogoAsset> = {
  ZUPERIOR: { src: "/logos/zuperior.png", height: 28 },
  ZETA: { src: "/logos/zeta.svg", height: 22 },
  FLIPKART: { src: "/logos/flipkart.png", height: 26 },
  AMAZON: { src: "/logos/amazon.svg", height: 26 },
  EXPEDIA: { src: "/logos/expedia.svg", height: 22 },
  PROBO: { src: "/logos/probo.png", height: 24 },
};

export function ExperienceLogoGrid() {
  return (
    <section className="border-b border-white/10 py-[70px] md:py-[90px]">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <h2 className="max-w-3xl text-[clamp(1.25rem,2.5vw,2rem)] font-semibold leading-snug tracking-[-0.03em]">
          EXPERIENCE ACROSS PRODUCT &amp; TECHNOLOGY TEAMS AT
        </h2>
        <ul className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-6 md:mt-10 md:gap-x-14">
          {experienceCompanies.map((name) => {
            const logo = logos[name];
            return (
              <li key={name} className="flex shrink-0 items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={`${name} logo`}
                  style={{ height: logo.height }}
                  className="w-auto max-w-[120px] object-contain opacity-75 brightness-0 invert transition hover:opacity-100"
                />
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-[10px] tracking-[0.2em] text-zinc-600 uppercase">
          Team experience — not client logos
        </p>
      </div>
    </section>
  );
}
