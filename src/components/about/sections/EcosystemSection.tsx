"use client";

// =============================================================================
// ECOSYSTEM SECTION - Global Travel Ecosystem
// =============================================================================

import { Globe2 } from "lucide-react";
import { ABOUT_ECOSYSTEM } from "@/constants/about.constants";
import {
  ecosystemSectionStyle,
  ecosystemFeatureChipStyle,
  aboutTypography,
  iconContainerStyle,
} from "@/styles/about.styles";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function EcosystemSection() {
  return (
    <div style={ecosystemSectionStyle}>
      {/* Background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
          textAlign: "center",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "88px",
            height: "88px",
            borderRadius: "24px",
            background:
              "linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(6, 182, 212, 0.1) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 32px auto",
            border: "1px solid rgba(6, 182, 212, 0.3)",
          }}
        >
          <Globe2 size={44} color="#22d3ee" />
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: "48px",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "24px",
            lineHeight: 1.15,
            fontFamily: aboutTypography.fontFamily,
          }}
        >
          {ABOUT_ECOSYSTEM.title}
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "18px",
            color: "#94a3b8",
            lineHeight: 1.7,
            marginBottom: "16px",
            fontFamily: aboutTypography.fontFamily,
          }}
        >
          {ABOUT_ECOSYSTEM.subtitle}
        </p>

        {/* Feature Chips */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "48px",
          }}
        >
          {ABOUT_ECOSYSTEM.features.map((feature, i) => (
            <div key={i} style={ecosystemFeatureChipStyle}>
              {feature}
            </div>
          ))}
        </div>

        {/* Statement */}
        <p
          style={{
            fontSize: "20px",
            color: "#cbd5e1",
            fontWeight: 500,
            fontFamily: aboutTypography.fontFamily,
          }}
        >
          {ABOUT_ECOSYSTEM.statement}
        </p>
      </div>
    </div>
  );
}

export default EcosystemSection;
