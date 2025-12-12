"use client";

// =============================================================================
// SERVICES HERO - Hero section for services page
// =============================================================================

import Image from "next/image";
import Link from "next/link";
import { SERVICES_HERO } from "@/constants/services.constants";
import {
  heroSectionStyle,
  heroOverlayStyle,
  heroContentStyle,
  heroTitleStyle,
  heroSubtitleStyle,
  primaryButtonStyle,
  secondaryButtonStyle,
} from "@/styles/services.styles";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function ServicesHero() {
  return (
    <section style={heroSectionStyle}>
      {/* Background Image */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src={SERVICES_HERO.backgroundImage}
          alt={SERVICES_HERO.backgroundAlt}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority
        />
        <div style={heroOverlayStyle} />
      </div>

      {/* Content */}
      <div className="services-hero-content" style={heroContentStyle}>
        <div style={{ maxWidth: "650px" }}>
          <h1 className="services-title" style={heroTitleStyle}>
            {SERVICES_HERO.title}
          </h1>
          <p className="services-desc" style={heroSubtitleStyle}>
            {SERVICES_HERO.subtitle}
          </p>

          <div className="services-buttons" style={{ display: "flex", gap: "16px" }}>
            <Link href={SERVICES_HERO.primaryButton.href}>
              <button style={primaryButtonStyle}>
                {SERVICES_HERO.primaryButton.text}
              </button>
            </Link>
            <Link href={SERVICES_HERO.secondaryButton.href}>
              <button style={secondaryButtonStyle}>
                {SERVICES_HERO.secondaryButton.text}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style jsx global>{`
        .services-hero-content {
          padding-bottom: 80px;
        }

        @media (max-width: 768px) {
          .services-hero-content {
            padding-bottom: 40px;
            justify-content: flex-end !important;
          }

          .services-title {
            font-size: 36px !important;
            line-height: 1.2 !important;
          }

          .services-desc {
            font-size: 16px !important;
            margin-bottom: 32px !important;
          }

          .services-buttons {
            flex-direction: column;
            width: 100%;
          }

          .services-buttons button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}

export default ServicesHero;
