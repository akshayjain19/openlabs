"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { whatWeBuild } from "@/content/site";

export function WhatWeBuildList() {
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
                  className="group flex w-full items-baseline gap-6 py-5 text-left md:py-6"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                >
                  <span className="text-xs tracking-[0.2em] text-zinc-600">{row.num}</span>
                  <span
                    className={`text-xl font-medium tracking-tight transition-colors md:text-3xl ${
                      active === index ? "text-white" : "text-zinc-500 group-hover:text-zinc-200"
                    }`}
                  >
                    {row.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="relative min-h-[220px] border border-white/10 bg-[#0c0c0c] p-8 md:min-h-[320px]">
            <motion.p
              key={item.num}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="text-sm leading-relaxed text-zinc-400 md:text-base"
            >
              {item.hint}
            </motion.p>
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <motion.div
                key={item.label}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -right-8 -bottom-8 text-[5rem] font-semibold leading-none tracking-tighter text-white/[0.04] md:text-[8rem]"
              >
                {item.num}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
