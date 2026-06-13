import ButtonLink from "@/components/ButtonLink";

export default function InnerPageHeader({
  eyebrow,
  title,
  description,
  highlights = [],
  cta,
  className = "",
}) {
  return (
    <section
      className={`relative isolate overflow-hidden bg-gradient-to-br from-[#F5F7FA] to-[#EAF8FF] pb-10 pt-14 md:pb-14 md:pt-[72px] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] [background-image:linear-gradient(#0077B6_1px,transparent_1px),linear-gradient(90deg,#0077B6_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="container-shell relative z-10">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0077B6]">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-4xl text-[2.125rem] font-black leading-tight text-[#061A2E] sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-[680px] text-base leading-7 text-[#475569] sm:text-lg">
          {description}
        </p>

        {highlights.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {highlights.map((item) => (
              <span
                key={item}
                className="rounded-md border border-[#DDEAF3] bg-white px-3 py-2 text-sm font-black text-[#334155] shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}

        {cta ? (
          <div className="mt-6">
            <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
          </div>
        ) : null}
      </div>
    </section>
  );
}
