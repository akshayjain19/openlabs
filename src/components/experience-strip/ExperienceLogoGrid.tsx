import { experienceCompanies } from "@/content/experience";

type LogoAsset = { src: string; height: number; maxWidth?: number };

const logos: Record<(typeof experienceCompanies)[number], LogoAsset> = {
  ZUPERIOR: { src: "/logos/zuperior.png", height: 30 },
  ZETA: { src: "/logos/zeta.svg", height: 26, maxWidth: 72 },
  FLIPKART: { src: "/logos/flipkart.png", height: 28 },
  AMAZON: { src: "/logos/amazon.svg", height: 28, maxWidth: 96 },
  EXPEDIA: { src: "/logos/expedia.svg", height: 26, maxWidth: 88 },
  PROBO: { src: "/logos/probo.png", height: 26, maxWidth: 88 },
  HIKE: { src: "/logos/hike.svg", height: 24, maxWidth: 72 },
};

export function ExperienceLogoGrid() {
  return (
    <section className="border-b border-white/10 py-12 md:py-16">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <h2 className="max-w-[42rem] text-[clamp(1.05rem,2.2vw,1.65rem)] font-semibold leading-snug tracking-[-0.02em] text-balance">
          EXPERIENCE ACROSS PRODUCT &amp; TECHNOLOGY TEAMS AT
        </h2>
        <ul className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-7 md:mt-10 md:gap-x-10">
          {experienceCompanies.map((name) => {
            const logo = logos[name];
            return (
              <li key={name} className="flex shrink-0 items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={`${name} logo`}
                  style={{ height: logo.height, maxWidth: logo.maxWidth ?? 120 }}
                  className="w-auto object-contain opacity-90 transition hover:opacity-100"
                />
              </li>
            );
          })}
        </ul>
        <p className="mt-5 text-[10px] tracking-[0.2em] text-zinc-600 uppercase">
          Team experience — not client logos
        </p>
      </div>
    </section>
  );
}
