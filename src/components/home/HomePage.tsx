import Link from "next/link";
import { site } from "@/content/site";
import { openlabsProjects } from "@/content/projects";
import { buildFor, principles } from "@/content/site";
import { whatsAppLink } from "@/lib/utils";
import { WhatWeBuildList } from "@/components/home/WhatWeBuildList";
import { SignatureExperiment } from "@/components/interactive/SignatureExperiment";
import { ProjectPreview } from "@/components/work/ProjectPreview";
import { ExperienceMarquee } from "@/components/home/ExperienceMarquee";
import { HeroHeadline } from "@/components/home/HeroHeadline";

export function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[100svh] flex-col justify-end border-b border-white/10 pb-16 pt-28 md:pb-24 md:pt-32">
        <div className="mx-auto w-full max-w-[1400px] px-5 md:px-8">
          <p className="text-[10px] tracking-[0.35em] text-zinc-500">
            WORKING GLOBALLY / {site.location}
          </p>
          <HeroHeadline />
          <p className="mt-8 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
            Apps, web products, AI systems and automation for businesses moving from 0→1 and
            1→10.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href={whatsAppLink("Hi OpenLabs — I'd like to discuss a project.")}
              data-magnetic
              className="inline-flex items-center justify-center border border-white bg-white px-6 py-3 text-xs font-medium tracking-[0.2em] text-black transition hover:bg-zinc-200"
            >
              WHATSAPP US →
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center px-2 py-3 text-xs font-medium tracking-[0.2em] text-zinc-300 hover:text-white"
            >
              VIEW OUR WORK →
            </Link>
          </div>
        </div>
      </section>

      <WhatWeBuildList />
      <SignatureExperiment />

      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-semibold tracking-[-0.03em]">
            THINGS WE&apos;VE BUILT.
          </h2>
          <p className="mt-4 max-w-xl text-sm text-zinc-500">
            Selected OpenLabs work — products and platforms we&apos;ve owned, built, or shipped.
          </p>
        </div>
        {openlabsProjects.slice(0, 5).map((project, index) => (
          <ProjectPreview key={project.slug} project={project} index={index} />
        ))}
        <div className="mx-auto max-w-[1400px] px-5 pb-16 md:px-8">
          <Link href="/work" className="text-xs tracking-[0.25em] text-zinc-400 hover:text-white">
            VIEW ALL WORK →
          </Link>
        </div>
      </section>

      <ExperienceMarquee />

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <h2 className="max-w-3xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
            GOOD SOFTWARE
            <br />
            STARTS BEFORE
            <br />
            THE CODE.
          </h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-3">
            {principles.map((p) => (
              <li key={p.num} className="border-t border-white/10 pt-6">
                <p className="text-xs tracking-[0.25em] text-zinc-600">{p.num}</p>
                <p className="mt-4 text-lg leading-snug text-zinc-200 md:text-xl">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.03em]">
            BUILDING FROM ZERO?
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
            Whether you&apos;re validating an idea, replacing a manual operation, launching a
            mobile product or taking an existing platform to its next stage — we can step in.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {buildFor.map((item) => (
              <div
                key={item.id}
                className="group border border-white/10 bg-[#0a0a0a] p-6 transition hover:border-white/25"
              >
                <p className="text-2xl font-semibold tracking-tight text-white">{item.label}</p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-400">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#050505] py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <h2 className="text-[clamp(2.5rem,9vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.04em]">
            HAVE SOMETHING
            <br />
            TO BUILD?
          </h2>
          <p className="mt-8 text-lg text-zinc-400">TELL US WHAT&apos;S ON YOUR MIND.</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href={whatsAppLink("Hi OpenLabs — I have something to build.")}
              data-magnetic
              className="inline-flex items-center justify-center border border-white px-6 py-3 text-xs font-medium tracking-[0.2em] text-white hover:bg-white hover:text-black"
            >
              WHATSAPP OPENLABS →
            </Link>
            <p className="text-sm text-zinc-500">{site.whatsapp.display}</p>
          </div>
          <Link href="/work" className="mt-8 inline-block text-xs tracking-[0.25em] text-zinc-500 hover:text-white">
            VIEW THE WORK →
          </Link>
        </div>
      </section>
    </>
  );
}
