import ButtonLink from "@/components/ButtonLink";

export default function HelpCard({
  title = "Need help choosing?",
  description = "Contact TRIC and our team will guide you to the right program.",
  showApply = false,
}) {
  return (
    <div className="rounded-lg border border-[#DDEAF3] bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-black text-[#061A2E]">{title}</h2>
      <p className="mt-3 max-w-2xl leading-7 text-[#5F6B7A]">{description}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/contact">Contact TRIC</ButtonLink>
        {showApply ? (
          <ButtonLink href="/login" variant="outline">
            Login to Apply
          </ButtonLink>
        ) : null}
      </div>
    </div>
  );
}
