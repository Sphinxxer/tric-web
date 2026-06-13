import HelpCard from "@/components/HelpCard";
import InnerPageHeader from "@/components/InnerPageHeader";
import MapPlaceholder from "@/components/MapPlaceholder";
import SectionHeader from "@/components/SectionHeader";
import { contactCards } from "@/data/site";

export const metadata = {
  title: "Contact TRIC Sports Academy | Tirupur",
  description:
    "Contact TRIC Sports Academy in Tirupur. Pool timings are 5:30 AM to 7:00 PM, Tuesday to Sunday.",
};

export default function ContactPage() {
  return (
    <>
      <InnerPageHeader
        eyebrow="CONTACT"
        title="Visit TRIC Sports Academy"
        description="Check timings, get directions, or contact the team before your visit."
        highlights={["5:30 AM - 7 PM", "Tuesday to Sunday", "Tirupur"]}
      />

      <section className="bg-white py-10 md:py-12">
        <div className="container-shell">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="premium-card rounded-lg p-5">
                  <div className="grid size-11 place-items-center rounded-md bg-[#EAF8FF] text-[#0077B6]">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-lg font-black text-[#061A2E]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm font-bold leading-6 text-[#334155]">
                    {card.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#5F6B7A]">
                    {card.detail}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#F5F7FA]">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Directions"
            title="Google Maps Location"
            description="Use the map below to find TRIC Academy and plan your visit."
          />
          <div className="mt-10">
            <MapPlaceholder />
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-shell">
          <HelpCard
            title="Need help choosing a program?"
            description="Contact TRIC and the team will guide you to the right application or visit option."
            showApply
          />
        </div>
      </section>
    </>
  );
}
