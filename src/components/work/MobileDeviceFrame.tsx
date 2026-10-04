"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src?: string;
  alt: string;
  fallbackLabel: string;
  className?: string;
  variant?: "default" | "web";
  priority?: boolean;
};

export function MobileDeviceFrame({ src, alt, fallbackLabel, className, variant = "default", priority }: Props) {
  const [failed, setFailed] = useState(false);
  const hasImage = src && !failed;
  const isWeb = variant === "web";

  return (
    <div
      className={cn(
        "relative aspect-[9/19.6] shrink-0 border border-white/20 bg-[#070707]",
        isWeb
          ? "w-[clamp(175px,15vw,220px)] max-w-[46vw] rounded-[1.25rem] p-[5px] shadow-[0_8px_20px_rgba(0,0,0,0.24)]"
          : "w-full rounded-[1.7rem] p-[1.8%] shadow-[0_18px_45px_rgba(0,0,0,0.34)]",
        "before:absolute before:top-[1.25%] before:left-1/2 before:z-10 before:h-[1.15%] before:w-[18%] before:-translate-x-1/2 before:rounded-full before:bg-black/80",
        "after:absolute after:top-[16%] after:right-[-2px] after:h-[12%] after:w-[2px] after:rounded-r-full after:bg-white/18",
        className,
      )}
    >
      <span className="absolute top-[14%] left-[-2px] h-[7%] w-[2px] rounded-l-full bg-white/14" aria-hidden="true" />
      <span className="absolute top-[24%] left-[-2px] h-[7%] w-[2px] rounded-l-full bg-white/12" aria-hidden="true" />
      <div className={cn("relative h-full overflow-hidden bg-[#050505] ring-1 ring-white/12", isWeb ? "rounded-[1rem]" : "rounded-[1.48rem]")}>
        {hasImage ? (
          <Image
            src={src}
            alt={alt}
            width={390}
            height={844}
            priority={priority}
            onError={() => setFailed(true)}
            className={cn("h-full w-full object-top", isWeb ? "object-cover" : "object-contain")}
            sizes="(max-width: 768px) 48vw, 240px"
          />
        ) : (
          <div
            className="flex h-full flex-col items-center justify-center border border-dashed border-white/15 px-4 text-center"
            role="img"
            aria-label={`${fallbackLabel} — mobile media placeholder`}
          >
            <p className="text-[8px] tracking-[0.28em] text-zinc-600 uppercase">
              Mobile view coming soon
            </p>
            <p className="mt-2 max-w-[90%] text-[10px] leading-snug text-zinc-500">
              {fallbackLabel}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
