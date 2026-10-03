"use client";

import { useState } from "react";
import { buildFor } from "@/content/site";

export function StageSection() {
  const [active, setActive] = useState<string>("idea");

  return (
    <section className="border-t border-white/10 py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <h2 className="text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
          WHEREVER
          <br />
          YOU ARE.
        </h2>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <ul className="space-y-2">
            {buildFor.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(item.id)}
                  onFocus={() => setActive(item.id)}
                  className={`w-full border-b border-white/10 py-4 text-left transition-colors ${
                    active === item.id ? "text-white" : "text-zinc-600 hover:text-zinc-300"
                  }`}
                >
                  <span className="text-[clamp(2rem,6vw,3.5rem)] font-semibold tracking-tight">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-end border border-white/10 bg-[#0a0a0a] p-8">
            <p className="text-lg leading-relaxed text-zinc-300 md:text-xl">
              {buildFor.find((b) => b.id === active)?.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
