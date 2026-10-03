"use client";

import { useState } from "react";
import { services } from "@/content/services";

export function ServicesList() {
  const [active, setActive] = useState(services[0].id);
  const current = services.find((s) => s.id === active) ?? services[0];

  return (
    <div className="pb-24 pt-28 md:pt-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
          WHAT WE CAN BUILD.
        </h1>
      </div>

      <div className="mx-auto mt-16 grid max-w-[1400px] gap-10 px-5 lg:grid-cols-[320px_1fr] lg:px-8">
        <nav className="flex flex-wrap gap-2 lg:flex-col lg:gap-0 lg:border-r lg:border-white/10 lg:pr-6" aria-label="Services">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => setActive(service.id)}
              className={`border px-4 py-3 text-left text-xs tracking-[0.2em] transition lg:border-0 lg:border-b lg:border-white/10 lg:px-0 lg:py-4 ${
                active === service.id
                  ? "border-white text-white lg:text-white"
                  : "border-white/10 text-zinc-500 hover:text-zinc-200"
              }`}
            >
              {service.title}
            </button>
          ))}
        </nav>

        <article className="min-h-[420px] border border-white/10 p-8 md:p-12">
          <p className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight">{current.title}</p>
          <h2 className="mt-4 max-w-2xl text-xl leading-snug text-zinc-200 md:text-2xl">{current.headline}</h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
            {current.description}
          </p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {current.capabilities.map((cap) => (
              <li key={cap} className="border-l border-white/20 pl-4 text-sm text-zinc-300">
                {cap}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}
