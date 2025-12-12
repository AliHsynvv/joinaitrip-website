"use client";

// =============================================================================
// HERO BACKGROUND COMPONENT
// Day/Night background images with dark mode support
// =============================================================================

import Image from "next/image";
import { HERO_IMAGES } from "@/constants/hero.constants";
import { backgroundOverlayStyle } from "@/styles/hero.styles";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function HeroBackground() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* Day Image */}
      <div
        className="hero-bg-light"
        style={{
          position: "absolute",
          inset: 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <Image
          src={HERO_IMAGES.day}
          alt="Beautiful tropical beach aerial view"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      {/* Night Image */}
      <div
        className="hero-bg-dark"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <Image
          src={HERO_IMAGES.night}
          alt="Beautiful night view"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      {/* Overlay */}
      <div style={backgroundOverlayStyle} />
    </div>
  );
}

export default HeroBackground;
