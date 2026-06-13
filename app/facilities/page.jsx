import ButtonLink from "@/components/ButtonLink";
import FacilityCard from "@/components/FacilityCard";
import InnerPageHeader from "@/components/InnerPageHeader";
import { facilities } from "@/data/site";

export const metadata = {
  title: "Facilities | TRIC Sports Academy",
  description:
    "Explore TRIC Sports Academy's 25m pool, changing rooms, showers, parking, parent seating, coach supervision, water filtration, and safety equipment.",
};

export default function FacilitiesPage() {
  return (
    <>
      <InnerPageHeader
        eyebrow="FACILITIES"
        title="Facilities Built Around Better Swimming"
        description="A 25-metre pool and practical amenities for students, members, and parents."
        highlights={["25m Pool", "Water Filtration", "Parent Seating", "Safety Equipment"]}
      />

      <section className="bg-white py-10 md:py-12">
        <div className="container-shell">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facilities.map((facility) => (
              <FacilityCard key={facility.title} facility={facility} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#EAF8FF]">
        <div className="container-shell grid gap-8 rounded-lg border border-[#DDEAF3] bg-white p-6 shadow-sm md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0077B6]">
              Visit TRIC
            </p>
            <h2 className="mt-3 text-3xl font-black text-[#061A2E]">
              Ready to visit TRIC?
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-[#5F6B7A]">
              Contact the team before planning your visit or login to start an application.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <ButtonLink href="/login">Login to Apply</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Contact TRIC
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
