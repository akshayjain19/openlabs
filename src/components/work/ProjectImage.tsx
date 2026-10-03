import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function ProjectImage({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 66vw",
}: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1600}
      height={1000}
      priority={priority}
      sizes={sizes}
      className={cn(
        "h-auto w-full object-cover object-top transition duration-700 group-hover:scale-[1.01]",
        className,
      )}
    />
  );
}
