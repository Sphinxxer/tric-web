export default function FacilityCard({ facility }) {
  const Icon = facility.icon;

  return (
    <article className="premium-card rounded-lg p-5">
      <div className="grid size-12 place-items-center rounded-md bg-[#EAF8FF] text-[#0077B6]">
        <Icon size={24} />
      </div>
      <h3 className="mt-5 text-lg font-black text-[#061A2E]">
        {facility.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[#5F6B7A]">
        {facility.description}
      </p>
    </article>
  );
}
