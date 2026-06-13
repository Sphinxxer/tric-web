"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageFrame({
  src,
  alt,
  label,
  className = "",
  priority = false,
}) {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-white/10 bg-[#061A2E] ${className}`}
    >
      {hasImageError ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(0,180,216,0.32),transparent_32%),linear-gradient(135deg,#061A2E,#0B2B47)]" />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          onError={() => setHasImageError(true)}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061A2E]/55 via-transparent to-transparent" />
      {label ? (
        <p className="absolute bottom-4 left-4 rounded-md bg-white/92 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#061A2E]">
          {label}
        </p>
      ) : null}
    </div>
  );
}
