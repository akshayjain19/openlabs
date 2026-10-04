"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src?: string;
  alt: string;
  fallbackLabel: string;
  className?: string;
  priority?: boolean;
};

export function MobileDeviceFrame({ src, alt, fallbackLabel, className, priority }: Props) {
  const [failed, setFailed] = useState(false);
  const hasImage = src && !failed;

  return (
    <div
      className={cn(
        "relative aspect-[9/19.25] w-full rounded-[2rem] border border-white/15 bg-[#080808] p-[3.5%] shadow-[0_28px_80px_rgba(0,0,0,0.5)]",
        "before:absolute before:top-[1.7%] before:left-1/2 before:z-10 before:h-[1.5%] before:w-[22%] before:-translate-x-1/2 before:rounded-full before:bg-white/16",
        className,
      )}
    >
      <div className="relative h-full overflow-hidden rounded-[1.45rem] bg-[#050505] ring-1 ring-white/10">
        {hasImage ? (
          <Image
            src={src}
            alt={alt}
            width={390}
            height={844}
            priority={priority}
            onError={() => setFailed(true)}
            className="h-full w-full object-contain object-top"
            sizes="(max-width: 768px) 45vw, 20vw"
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
