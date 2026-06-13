import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { academy, navLinks, timingRows } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-[#061A2E] text-white">
      <div className="container-shell grid gap-8 py-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full border border-[#DDB648]/70 bg-[#061A2E]">
              <Image
                src="/images/tric-academy-logo.png"
                alt="TRIC Sports Academy logo"
                width={48}
                height={48}
                sizes="48px"
                className="size-12 object-cover"
              />
            </span>
            <div>
              <p className="font-black">{academy.name}</p>
              <p className="text-sm font-semibold text-cyan-100">
                Swimming academy in Tirupur
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-300">
            Swimming classes, membership, and hourly pool access with a
            25-metre pool and parent-friendly application flow.
          </p>
        </div>

        <div>
          <p className="mb-4 text-sm font-black uppercase tracking-[0.16em] text-cyan-100">
            Quick Links
          </p>
          <div className="grid gap-2">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring rounded-md text-sm font-semibold text-slate-300 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="focus-ring rounded-md text-sm font-semibold text-slate-300 transition hover:text-white"
            >
              Parent Login
            </Link>
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-black uppercase tracking-[0.16em] text-cyan-100">
            Visit
          </p>
          <div className="grid gap-3 text-sm text-slate-300">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 shrink-0 text-[#00B4D8]" size={18} />
              <span>{academy.address}</span>
            </p>
            {timingRows.map((row) => (
              <p key={row.day} className="font-semibold">
                {row.day}: {row.time}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <p className="container-shell text-sm text-slate-400">
          Copyright {new Date().getFullYear()} {academy.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
