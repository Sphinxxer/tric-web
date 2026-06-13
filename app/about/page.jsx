import ButtonLink from "@/components/ButtonLink";
import ImageFrame from "@/components/ImageFrame";
import InnerPageHeader from "@/components/InnerPageHeader";
import SectionHeader from "@/components/SectionHeader";
import StatCard from "@/components/StatCard";
import { stats } from "@/data/site";

const poolImages = [
  {
    src: "/images/about/pool-main.jpg",
    alt: "TRIC Sports Academy main pool image",
    label: "25m pool",
    className: "min-h-[320px] md:row-span-2 md:min-h-[520px]",
  },
  {
    src: "/images/about/poolside.jpg",
    alt: "TRIC Sports Academy poolside image",
    label: "Poolside",
    className: "min-h-[165px]",
  },
  {
    src: "/images/about/training.jpg",
    alt: "TRIC Sports Academy training image",
    label: "Training",
    className: "min-h-[165px]",
  },
  {
    src: "/images/about/facility.jpg",
    alt: "TRIC Sports Academy facility image",
    label: "Facility",
    className: "min-h-[165px] md:col-span-2",
  },
];

const familyReasons = [
  ["Supervised coaching", "Guided sessions for students and regular swimmers."],
  ["Clean filtered water", "A maintained filtration system supports pool hygiene."],
  ["Beginner-friendly learning", "A calmer start for students building water confidence."],
  ["Parent seating area", "Parents have a place to wait during student sessions."],
  ["Safety-first environment", "Safety equipment and supervision support responsible pool use."],
];

const facilityConfidence = [
  "Changing rooms",
  "Showers",
  "Parking",
  "Water filtration system",
  "Safety equipment",
  "Coach supervision",
];

const competitivePathway = [
  [
    "Foundation Training",
    "Build swimming confidence, discipline, and correct technique through structured coaching.",
  ],
  [
    "Local & State Competitions",
    "Students showing progress and commitment can be guided toward local and state-level competition opportunities.",
  ],
  [
    "Qualified Higher-Level Pathway",
    "For swimmers who qualify, TRIC supports the pathway toward higher-level competitive participation.",
  ],
];

const competitiveProof = [
  ["Nearly 500", "Athletes trained every year"],
  ["220", "Active competitive trainees"],
  ["Local & State", "Competition guidance"],
  ["Qualified Pathway", "Higher-level pathway for qualified athletes"],
];

export const metadata = {
  title: "About TRIC Sports Academy | Swimming Academy in Tirupur",
  description:
    "TRIC Sports Academy is a swimming academy in Tirupur with a 25m pool, coaching, memberships, summer classes, and hourly swimming access.",
};

export default function AboutPage() {
  return (
    <>
      <InnerPageHeader
        eyebrow="ABOUT TRIC"
        title="A Swimming Academy Built for Tirupur"
        description="TRIC Sports Academy brings a 25-metre international-standard pool, structured coaching, summer classes, regular membership, and hourly swimming access into one organized academy experience."
        highlights={["25m Pool", "Summer Classes", "Membership", "Hourly Access"]}
      />

      <section className="section-pad bg-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeader
            eyebrow="Academy overview"
            title="Swimming Training With Practical Facilities"
            description="TRIC is designed for families, students, regular swimmers, and visitors who want a dependable place to learn or practise swimming in Tirupur."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#F5F7FA]">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Pool environment"
            title="Inside TRIC Sports Academy"
            description="A closer look at the pool, training spaces, and practical facilities that support swimmers and parents."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {poolImages.map((image) => (
              <ImageFrame
                key={image.src}
                src={image.src}
                alt={image.alt}
                label={image.label}
                className={image.className}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="container-shell">
          <div className="navy-gradient relative isolate overflow-hidden rounded-lg border border-white/10 p-6 text-white shadow-[0_24px_70px_rgba(6,26,46,0.22)] md:p-10 lg:p-12">
            <div className="pointer-events-none absolute inset-0 lane-pattern opacity-20" />
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-100">
                  Competitive Training Pathway
                </p>
                <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                  From learning to competing - a structured pathway for serious swimmers.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
                  TRIC Sports Academy supports swimmers who want to go beyond
                  regular swimming and train with discipline, structure, and
                  purpose. With nearly 500 athletes trained every year and 220
                  active athletes currently preparing for competitions, TRIC
                  provides an environment where swimmers can progress from
                  foundation training to local and state-level competition
                  opportunities.
                </p>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200">
                  For athletes who qualify, TRIC also supports the pathway toward
                  higher-level competitive participation.
                </p>
                <p className="mt-5 rounded-lg border border-white/14 bg-white/8 px-4 py-3 text-sm font-bold leading-6 text-cyan-50">
                  For students ready to take swimming seriously, TRIC provides a
                  structured environment to train with focus and progress with
                  purpose.
                </p>
                <ButtonLink href="/login" variant="light" className="mt-6">
                  Login to Apply
                </ButtonLink>
              </div>

              <ImageFrame
                src="/images/about/competition-training.jpg"
                alt="TRIC Sports Academy competitive training pathway"
                label="Training pathway"
                className="min-h-[260px] border-white/20 sm:min-h-[340px] lg:min-h-[420px]"
              />
            </div>

            <div className="relative z-10 mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {competitiveProof.map(([value, label]) => (
                <article
                  key={label}
                  className="rounded-lg border border-white/14 bg-white/[0.1] p-4"
                >
                  <p className="text-2xl font-black leading-tight text-white">
                    {value}
                  </p>
                  <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-cyan-100">
                    {label}
                  </p>
                </article>
              ))}
            </div>

            <div className="relative z-10 mt-4 grid gap-4 md:grid-cols-3">
              {competitivePathway.map(([title, description], index) => (
                <article
                  key={title}
                  className="rounded-lg border border-white/14 bg-white/[0.08] p-5 backdrop-blur"
                >
                  <span className="grid size-10 place-items-center rounded-md bg-[#00B4D8] text-sm font-black text-[#061A2E]">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-base font-black text-white">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Parent confidence"
            title="Why Families Choose TRIC"
            description="The academy focuses on the things parents and swimmers look for first: coaching, water quality, safety, and a comfortable visit."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {familyReasons.map(([title, description]) => (
              <article
                key={title}
                className="rounded-lg border border-[#DDEAF3] bg-[#F8FCFF] p-5"
              >
                <h3 className="text-base font-black text-[#061A2E]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#5F6B7A]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#EAF8FF]">
        <div className="container-shell grid gap-8 rounded-lg border border-[#DDEAF3] bg-white p-6 shadow-sm md:grid-cols-[1fr_1fr] md:p-10">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0077B6]">
              Facility confidence
            </p>
            <h2 className="mt-3 text-3xl font-black text-[#061A2E]">
              Built for Daily Academy Use
            </h2>
            <p className="mt-4 leading-7 text-[#5F6B7A]">
              TRIC keeps the essential pool amenities visible and practical, so
              students, parents, and regular swimmers know what to expect before
              they visit.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {facilityConfidence.map((item) => (
              <div
                key={item}
                className="rounded-md border border-[#DDEAF3] bg-[#F8FCFF] px-4 py-3 text-sm font-black text-[#061A2E]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-shell grid gap-6 rounded-lg border border-[#DDEAF3] bg-[#F8FCFF] p-6 shadow-sm md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0077B6]">
              Applications
            </p>
            <h2 className="mt-3 text-3xl font-black text-[#061A2E]">
              Login to Apply for Summer Classes or Membership
            </h2>
          </div>
          <ButtonLink href="/login">Login to Apply</ButtonLink>
        </div>
      </section>
    </>
  );
}
