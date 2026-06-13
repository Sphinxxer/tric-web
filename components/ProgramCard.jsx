import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProgramCard({ program }) {
  const Icon = program.icon;

  return (
    <article className="premium-card flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 text-[#061A2E] transition duration-200 hover:border-[#00B4D8]/60 hover:shadow-lg">
      {Icon ? (
        <div className="grid size-12 place-items-center rounded-md bg-[#EAF8FF] text-[#0077B6]">
          <Icon size={24} />
        </div>
      ) : null}
      <p className="mt-5 w-fit rounded-md bg-[#EAF8FF] px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#0077B6]">
        {program.type}
      </p>
      <h3 className="mt-4 text-2xl font-black leading-tight text-[#061A2E]">
        {program.title}
      </h3>
      <p className="mt-4 leading-7 text-[#334155]">
        {program.description}
      </p>
      <div className="mt-auto pt-6">
        <Link
          href={program.href}
          className="focus-ring inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#061A2E] px-4 text-sm font-black text-white transition hover:bg-[#0077B6]"
        >
          <span>{program.cta}</span>
          <ArrowRight size={17} />
        </Link>
      </div>
    </article>
  );
}
