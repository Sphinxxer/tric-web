export default function StatCard({ stat, dark = false }) {
  const Icon = stat.icon;

  return (
    <article
      className={`rounded-lg border p-5 ${
        dark
          ? "border-white/12 bg-white/8 text-white"
          : "border-slate-200 bg-white text-[#061A2E] shadow-sm"
      }`}
    >
      <Icon className={dark ? "text-[#00B4D8]" : "text-[#0077B6]"} size={26} />
      <p className="mt-5 text-3xl font-black">{stat.value}</p>
      <h3 className="mt-1 text-sm font-black uppercase tracking-[0.12em]">
        {stat.label}
      </h3>
      <p className={`mt-3 text-sm leading-6 ${dark ? "text-slate-300" : "text-[#5F6B7A]"}`}>
        {stat.detail}
      </p>
    </article>
  );
}
