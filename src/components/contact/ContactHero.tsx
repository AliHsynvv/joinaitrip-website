"use client";

// =============================================================================
// CONTACT HERO - Hero section for contact page
// =============================================================================

import Image from "next/image";
import { CONTACT_HERO } from "@/constants/contact.constants";
import {
  contactHeroStyle,
  contactHeroOverlayStyle,
  contactHeroContentStyle,
  contactHeroTitleStyle,
  contactHeroDividerStyle,
  contactHeroSubtitleStyle,
} from "@/styles/contact.styles";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function ContactHero() {
  return (
    <section style={contactHeroStyle}>
      {/* Background Image */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src={CONTACT_HERO.image}
          alt={CONTACT_HERO.imageAlt}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority
        />
        <div style={contactHeroOverlayStyle} />
      </div>

      {/* Content */}
      <div style={contactHeroContentStyle}>
        <h1 style={contactHeroTitleStyle}>{CONTACT_HERO.title}</h1>
        <div style={contactHeroDividerStyle} />
        <p style={contactHeroSubtitleStyle}>{CONTACT_HERO.subtitle}</p>
      </div>

      {/* Responsive Styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .contact-hero h1 {
            font-size: 40px !important;
          }
          .contact-hero-divider {
            width: 100% !important;
            max-width: 400px !important;
          }
        }
      `}</style>
    </section>
  );
}

export default ContactHero;
