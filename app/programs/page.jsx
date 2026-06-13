import HelpCard from "@/components/HelpCard";
import InnerPageHeader from "@/components/InnerPageHeader";
import ProgramCard from "@/components/ProgramCard";
import { programs } from "@/data/site";

const programDetails = {
  summer: {
    description:
      "Designed for students who want to use the summer break to learn swimming in a guided and organized setting.",
  },
  membership: {
    description:
      "Built for swimmers who want a regular routine, coaching support, and steady improvement beyond a short-term program.",
  },
  hourly: {
    description:
      "A simple option for casual swimming, practice sessions, trial visits, or fitness swimming based on availability.",
  },
};

export const metadata = {
  title: "Swimming Programs | TRIC Sports Academy",
  description:
    "Explore summer swimming classes, regular membership training, and hourly pool access at TRIC Sports Academy in Tirupur.",
};

export default function ProgramsPage() {
  return (
    <>
      <InnerPageHeader
        eyebrow="PROGRAMS"
        title="Swimming Programs at TRIC"
        description="Choose the right path for summer learning, regular practice, or hourly pool access."
        highlights={["Summer Classes", "Memberships", "Hourly Access"]}
      />

      <section className="bg-white py-10 md:py-12">
        <div className="container-shell">
          <div className="grid gap-5 lg:grid-cols-3">
            {programs.map((program) => (
              <ProgramCard
                key={program.id}
                program={{ ...program, ...programDetails[program.id] }}
              />
            ))}
          </div>
          <p className="mt-6 rounded-lg border border-[#DDEAF3] bg-[#EAF8FF] p-4 text-sm font-bold leading-6 text-[#061A2E]">
            Summer Class and Membership applications require parent login.
            Hourly access enquiries can be made through the Contact page.
          </p>
        </div>
      </section>

      <section className="section-pad bg-[#F5F7FA]">
        <div className="container-shell">
          <HelpCard
            title="Not sure which program to choose?"
            description="Contact TRIC and the team will guide you to the right option before you apply."
            showApply
          />
        </div>
      </section>
    </>
  );
}
