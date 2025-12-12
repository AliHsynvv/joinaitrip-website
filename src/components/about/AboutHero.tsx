"use client";

// =============================================================================
// ABOUT HERO - Hero section for About page
// =============================================================================

import Image from "next/image";
import { ABOUT_HERO } from "@/constants/about.constants";
import {
  heroSectionStyle,
  heroOverlayStyle,
  heroContentStyle,
  heroTitleStyle,
  heroSubtitleStyle,
} from "@/styles/about.styles";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function AboutHero() {
  return (
    <section style={heroSectionStyle}>
      {/* Background Image */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src={ABOUT_HERO.backgroundImage}
          alt={ABOUT_HERO.backgroundAlt}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority
        />
        <div style={heroOverlayStyle} />
      </div>

      {/* Content */}
      <div style={heroContentStyle}>
        <div style={{ maxWidth: "800px" }}>
          <h1 style={heroTitleStyle}>{ABOUT_HERO.title}</h1>
          <p style={heroSubtitleStyle}>{ABOUT_HERO.subtitle}</p>
        </div>
      </div>

      {/* Responsive Styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .about-hero h1 {
            font-size: 36px !important;
          }
          .about-hero p {
            font-size: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}

export default AboutHero;
