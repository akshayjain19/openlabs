"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { whatWeBuild } from "@/content/site";

const visuals = [
  "grid-cols-6 gap-1",
  "grid-cols-3 gap-2",
  "grid-cols-4 gap-1",
  "grid-cols-2 gap-3",
  "grid-cols-5 gap-1",
  "grid-cols-3 gap-2",
  "grid-cols-6 gap-1",
  "grid-cols-4 gap-2",
];

export function CapabilityList() {
  const [active, setActive] = useState(0);
  const item = whatWeBuild[active];

  return (
    <section className="border-b border-white/10 py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <h2 className="max-w-4xl text-[clamp(2.5rem,8vw,6rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
          NOT JUST
          <br />
          WEBSITES.
        </h2>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
          We build the software behind businesses — from the first prototype to the systems
          that keep a growing product moving.
        </p>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {whatWeBuild.map((row, index) => (
              <li key={row.num}>
                <button
                  type="button"
                  className="group flex w-full items-baseline gap-6 py-5 text-left md:py-7"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                >
                  <span className="text-xs tracking-[0.2em] text-zinc-600">{row.num}</span>
                  <span
                    className={`text-2xl font-semibold tracking-tight transition-all duration-300 md:text-4xl ${
                      active === index
                        ? "translate-x-1 text-white"
                        : "text-zinc-600 group-hover:text-zinc-300"
                    }`}
                  >
                    {row.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="relative min-h-[260px] border border-white/10 bg-[#0a0a0a] p-8 md:min-h-[360px]">
            <motion.p
              key={item.num}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-sm text-sm leading-relaxed text-zinc-400 md:text-base"
            >
              {item.hint}
            </motion.p>
            <motion.div
              key={item.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`absolute right-6 bottom-6 grid h-32 w-32 ${visuals[active]}`}
              aria-hidden
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="border border-white/10 bg-white/[0.03] transition-colors"
                  style={{ opacity: 0.35 + (i % 3) * 0.15 }}
                />
              ))}
            </motion.div>
            <p className="absolute top-6 right-6 text-[4rem] font-semibold leading-none text-white/[0.04] md:text-[6rem]">
              {item.num}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
