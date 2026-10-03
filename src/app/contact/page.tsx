import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { whatsAppLink } from "@/lib/utils";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation with OpenLabs about your product, app, or automation project.",
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
          <p className="mt-6 max-w-md text-sm leading-relaxed text-zinc-400 md:text-base">
            The fastest path is WhatsApp. Send a short note about what you&apos;re building — or
            use the form and we&apos;ll open a pre-filled message for you.
          </p>
          <Link
            href={whatsAppLink("Hi OpenLabs — I'd like to start a conversation.")}
            data-magnetic
            className="mt-10 inline-flex border border-white bg-white px-6 py-3 text-xs font-medium tracking-[0.2em] text-black hover:bg-zinc-200"
          >
            WHATSAPP US →
          </Link>
          <p className="mt-4 text-sm text-zinc-500">{site.whatsapp.display}</p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
