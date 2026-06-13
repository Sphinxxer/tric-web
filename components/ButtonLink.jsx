import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}) {
  const styles =
    variant === "secondary"
      ? "border border-white/30 bg-white/10 text-white hover:bg-white/[0.18]"
      : variant === "light"
        ? "bg-white text-[#061A2E] hover:bg-[#EAF8FF]"
        : variant === "outline"
          ? "border border-[#0077B6]/25 bg-white text-[#061A2E] hover:border-[#00B4D8] hover:bg-[#EAF8FF]"
          : "bg-[#061A2E] text-white hover:bg-[#0B2B47]";

  return (
    <Link
      href={href}
      className={`focus-ring inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-black transition sm:w-auto ${styles} ${className}`}
    >
      <span>{children}</span>
      <ArrowRight aria-hidden="true" size={18} />
    </Link>
  );
}
