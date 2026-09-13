"use client";

import Image from "next/image";
import { useState } from "react";

type FounderAvatarProps = {
  src: string;
  alt: string;
  initials: string;
  /** Fallback bg when image fails (keeps editorial initials badge). */
  fallbackBg?: string;
  /** Extra layout classes, e.g. "mx-auto" for centered tease. */
  className?: string;
  priority?: boolean;
};

/**
 * Founder avatar — next/image with initials fallback.
 * Displays at size-16 (64px) from a 96px source for crisp static export.
 * If /public/images/founders/*.webp is missing, falls back to initials badge.
 */
export default function FounderAvatar({
  src,
  alt,
  initials,
  fallbackBg = "bg-[#F9F7F5] text-[#1A1A1A]",
  className = "",
  priority = false,
}: FounderAvatarProps) {
  const [imgError, setImgError] = useState(false);

  const wrapper =
    `grid size-16 shrink-0 place-items-center overflow-hidden rounded-full border-[3px] border-[#1A1A1A] font-heading text-xl font-black ${className}`;

  if (imgError) {
    return (
      <div aria-hidden="true" className={`${wrapper} ${fallbackBg}`}>
        {initials}
      </div>
    );
  }

  return (
    <div className={`${wrapper} bg-white`}>
      <Image
        src={src}
        alt={alt}
        width={96}
        height={96}
        priority={priority}
        sizes="(max-width: 768px) 80px, 96px"
        className="size-full object-cover"
        onError={() => setImgError(true)}
      />
    </div>
  );
}
