import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { whatsAppLink } from "@/lib/utils";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact KorvaLabs about your app, platform, or software product.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="pb-24 pt-28 md:pt-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
            LET&apos;S BUILD
            <br />
            SOMETHING.
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-zinc-500">
            Tell us what you&apos;re building, what isn&apos;t working, or what needs to exist.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={whatsAppLink("Hi KorvaLabs — I'd like to start a conversation.")}
              data-magnetic
              className="inline-flex border border-white bg-white px-6 py-3 text-[11px] font-medium tracking-[0.2em] text-black hover:bg-zinc-200"
            >
              WHATSAPP US →
            </Link>
            <Link
              href={site.email.href}
              data-magnetic
              className="inline-flex border border-white/20 px-6 py-3 text-[11px] font-medium tracking-[0.2em] text-white hover:border-white"
            >
              EMAIL US →
            </Link>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
