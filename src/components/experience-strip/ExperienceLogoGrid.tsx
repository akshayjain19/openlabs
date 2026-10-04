import { experienceCompanies } from "@/content/experience";

type LogoAsset = { src: string; height: number; maxWidth?: number };

const logos: Record<(typeof experienceCompanies)[number], LogoAsset> = {
  ZUPERIOR: { src: "/logos/zuperior.png", height: 42, maxWidth: 104 },
  ZETA: { src: "/logos/zeta.svg", height: 32, maxWidth: 104 },
  FLIPKART: { src: "/logos/flipkart.png", height: 38, maxWidth: 148 },
  AMAZON: { src: "/logos/amazon.svg", height: 36, maxWidth: 136 },
  EXPEDIA: { src: "/logos/expedia.svg", height: 38, maxWidth: 118 },
  PROBO: { src: "/logos/probo.png", height: 38, maxWidth: 132 },
  HIKE: { src: "/logos/hike.svg", height: 34, maxWidth: 100 },
};

const marqueeCompanies = [...experienceCompanies, ...experienceCompanies];

export function ExperienceLogoGrid() {
  return (
    <section className="border-b border-white/10 py-9 md:py-11">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <h2 className="max-w-[56rem] text-[clamp(0.95rem,1.7vw,1.3rem)] font-semibold leading-snug tracking-[0.02em] text-balance">
          EXPERIENCE ACROSS PRODUCT &amp; TECHNOLOGY TEAMS AT
        </h2>
        <div className="logo-marquee mt-7 md:mt-8" tabIndex={0} aria-label="Professional experience company logos">
          <ul className="logo-marquee-track" aria-hidden="true">
            {marqueeCompanies.map((name, index) => {
              const logo = logos[name];
              return (
                <li key={`${name}-${index}`} className="logo-marquee-item">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.src}
                    alt=""
                    style={{ height: logo.height, maxWidth: logo.maxWidth ?? 140 }}
                    className="w-auto object-contain opacity-95 transition hover:opacity-100"
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <p className="mt-5 text-[10px] tracking-[0.2em] text-zinc-600 uppercase">
          Team experience — not client logos
        </p>
      </div>
    </section>
  );
}
