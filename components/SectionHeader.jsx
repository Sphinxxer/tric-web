export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}) {
  const dark = tone === "dark";

  return (
    <div
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow ? (
        <p
          className={`mb-3 text-sm font-extrabold uppercase tracking-[0.16em] ${
            dark ? "text-cyan-100" : "text-[#0077B6]"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`text-3xl font-black sm:text-4xl ${
          dark ? "text-white" : "text-[#061A2E]"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-base leading-7 sm:text-lg ${
            dark ? "text-slate-300" : "text-[#5F6B7A]"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
