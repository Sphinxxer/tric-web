import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import ButtonLink from "@/components/ButtonLink";
import ImageFrame from "@/components/ImageFrame";
import SectionHeader from "@/components/SectionHeader";
import { heroImage, programs } from "@/data/site";

const heroBadges = ["25m Pool", "Coach Supervision", "Water Filtration", "Safety Focus"];

const trainingProof = [
  ["Nearly 500", "Athletes trained every year"],
  ["220", "Active competitive trainees"],
  ["Local & State Meets", "Competition preparation for progressing swimmers"],
  ["Qualified Athletes", "Pathway support toward higher-level participation"],
];

const facilityPreview = [
  "Changing Rooms",
  "Showers",
  "Parking",
  "Parent Seating Area",
  "Safety Equipment",
];

export default function HomePage() {
  return (
    <>
      <section className="navy-gradient relative isolate text-white">
        <div className="pointer-events-none absolute inset-0 lane-pattern opacity-30" />
        <div className="container-shell relative z-10 grid gap-7 py-8 md:grid-cols-[1fr_0.95fr] md:items-center lg:min-h-[calc(100svh-64px)]">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex rounded-md border border-white/20 bg-white/8 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-100">
              TRIC Sports Academy, Tirupur
            </p>
            <h1 className="text-[2.35rem] font-black leading-[1] sm:text-5xl lg:text-[3.6rem]">
              Professional Swimming Academy in Tirupur
            </h1>
            <p className="mt-4 max-w-[620px] text-base leading-7 text-slate-200 sm:text-lg">
              Learn and practice in a 25-metre international-standard pool with
              coaching, clean water systems, and parent-friendly facilities.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="/login" variant="light">
                Login to Apply
              </ButtonLink>
              <ButtonLink href="/programs" variant="secondary">
                View Programs
              </ButtonLink>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {heroBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-md border border-white/14 bg-white/8 px-3 py-2 text-xs font-black text-cyan-100"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <ImageFrame
            src={heroImage}
            alt="TRIC Sports Academy swimming pool"
            className="h-[260px] sm:h-[320px] lg:h-[390px]"
            priority
          />
        </div>
      </section>

      <section className="bg-[#F5F7FA] py-12 md:py-14">
        <div className="container-shell">
          <div className="overflow-hidden rounded-lg border border-[#DDEAF3] bg-white shadow-[0_18px_55px_rgba(6,26,46,0.08)]">
            <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="bg-[#061A2E] p-6 text-white md:p-8 lg:p-10">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-100">
                  Athlete Development
                </p>
                <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                  From first strokes to competitive lanes.
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-300">
                  TRIC trains swimmers across beginner, membership, and competitive
                  programs - with structured coaching for athletes preparing for
                  local and state-level competitions, and higher-level pathways for
                  swimmers who qualify.
                </p>
                <ButtonLink href="/programs" variant="secondary" className="mt-6">
                  Explore Programs
                </ButtonLink>
              </div>

              <div className="grid gap-3 bg-[#EAF8FF] p-4 sm:grid-cols-2 md:p-6">
                {trainingProof.map(([value, label]) => (
                  <article
                    key={label}
                    className="rounded-lg border border-[#DDEAF3] bg-white p-4 shadow-sm sm:p-5"
                  >
                    <p className="text-3xl font-black leading-tight text-[#061A2E] sm:text-[2.35rem]">
                      {value}
                    </p>
                    <p className="mt-2 text-sm font-bold leading-5 text-[#475569]">
                      {label}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-14">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Why TRIC"
            title="A Clean, Supervised Pool Environment"
            description="TRIC gives swimmers a practical place to learn, train, and practise with the essentials handled well."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              ["25m Pool", "International-standard swimming length."],
              ["Coach Supervision", "Guidance during classes and practice."],
              ["Water Filtration", "Maintained systems for cleaner water."],
              ["Safety Focus", "Safety equipment and managed sessions."],
            ].map(([title, description]) => (
              <article
                key={title}
                className="rounded-lg border border-[#DDEAF3] bg-[#F8FCFF] p-5 shadow-sm"
              >
                <h2 className="text-lg font-black text-[#061A2E]">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#5F6B7A]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F7FA] py-12 md:py-14">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Programs"
            title="Choose Your Swimming Option"
            description="Summer classes and membership applications are available after parent login."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {programs.map((program) => (
              <article
                key={program.id}
                className="flex h-full flex-col rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm"
              >
                <p className="w-fit rounded-md bg-[#EAF8FF] px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#0077B6]">
                  {program.type}
                </p>
                <h3 className="mt-4 text-xl font-black text-[#061A2E]">
                  {program.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#5F6B7A]">
                  {program.shortDescription}
                </p>
                <Link
                  href={program.id === "hourly" ? "/contact" : "/login"}
                  className="focus-ring mt-5 inline-flex items-center gap-2 text-sm font-black text-[#0077B6]"
                >
                  {program.id === "hourly" ? "Contact TRIC" : "Login to Apply"}
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-14">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <SectionHeader
              eyebrow="Facilities"
              title="Facility Essentials"
              description="Simple amenities that make training and pool visits easier for swimmers and parents."
            />
            <ButtonLink href="/facilities" variant="outline">
              View Facilities
            </ButtonLink>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {facilityPreview.map((title) => (
              <article
                key={title}
                className="flex items-center gap-3 rounded-lg border border-[#DDEAF3] bg-[#F8FCFF] p-4"
              >
                <CheckCircle2 className="shrink-0 text-[#0077B6]" size={18} />
                <h3 className="text-sm font-black text-[#061A2E]">{title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="navy-gradient py-14 text-white">
        <div className="container-shell grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-100">
              Applications
            </p>
            <h2 className="mt-3 text-3xl font-black">
              Login to Apply for Summer Classes or Membership
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-300">
              Parent login keeps applications and status updates in one simple place.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/login" variant="light">
              Login to Apply
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact TRIC
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
