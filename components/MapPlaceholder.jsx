const tricMapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.633311700586!2d77.306066!3d11.1406636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9072291ec0055%3A0xa8cab5d66858c19a!2sTRIC%20ACADEMY!5e0!3m2!1sen!2sin!4v1779525625150!5m2!1sen!2sin";

export default function MapPlaceholder() {
  return (
    <div className="relative min-h-[320px] overflow-hidden rounded-lg border border-slate-200 bg-[#EAF8FF] shadow-sm">
      <iframe
        src={tricMapEmbedUrl}
        title="TRIC Academy location on Google Maps"
        className="absolute inset-0 h-full w-full"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
