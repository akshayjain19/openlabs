"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { services } from "@/content/services";

export function ServicesEditorial() {
  return (
    <div className="pb-24 pt-28 md:pt-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
          WHAT WE CAN BUILD.
        </h1>
      </div>

      <div className="mx-auto mt-20 max-w-[1400px]">
        {services.map((service, index) => (
          <ServiceBlock key={service.id} service={service} index={index} />
        ))}
      </div>
    </div>
  );
}

function ServiceBlock({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="border-t border-white/10 px-5 py-16 md:px-8 md:py-20"
    >
      <div className="grid gap-8 lg:grid-cols-[0.35fr_1fr]">
        <p className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-white">
          {service.title}
        </p>
        <div>
          <p className="max-w-2xl text-lg leading-relaxed text-zinc-300 md:text-xl">{service.description}</p>
          <ul className="mt-8 grid gap-2 sm:grid-cols-2">
            {service.bullets.map((bullet) => (
              <li key={bullet} className="text-sm text-zinc-500">
                — {bullet}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-[5rem] font-semibold leading-none text-white/[0.04] md:text-[7rem]">
            {String(index + 1).padStart(2, "0")}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
