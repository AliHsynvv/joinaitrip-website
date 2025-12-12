"use client";

// =============================================================================
// UNIQUE FEATURES SECTION
// =============================================================================

import { Layers } from "lucide-react";
import { ABOUT_UNIQUE } from "@/constants/about.constants";
import {
  uniqueSectionStyle,
  uniqueCardStyle,
  finalStatementStyle,
  aboutTypography,
  aboutColors,
  iconContainerStyle,
} from "@/styles/about.styles";
import type { UniqueFeature } from "@/types/about.types";

// -----------------------------------------------------------------------------
// Feature Card Component
// -----------------------------------------------------------------------------

interface FeatureCardProps {
  feature: UniqueFeature;
}

function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <div style={uniqueCardStyle} className="unique-card">
      <div
        style={{
          ...iconContainerStyle(feature.color, "md"),
          marginBottom: "24px",
        }}
      >
        <Icon
          size={28}
          color={feature.color === "cyan" ? aboutColors.primary : aboutColors.accent}
        />
      </div>
      <p
        style={{
          fontSize: "15px",
          color: aboutColors.textSecondary,
          lineHeight: 1.6,
          fontFamily: aboutTypography.fontFamily,
          margin: 0,
        }}
      >
        {feature.text}
      </p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function UniqueSection() {
  return (
    <div style={uniqueSectionStyle}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <div
            style={{
              ...iconContainerStyle("cyan", "lg"),
              margin: "0 auto 32px auto",
            }}
          >
            <Layers size={36} color="#0891b2" />
          </div>

          <h2
            style={{
              fontSize: "44px",
              fontWeight: 700,
              color: aboutColors.textPrimary,
              fontFamily: aboutTypography.fontFamily,
            }}
          >
            {ABOUT_UNIQUE.title}
          </h2>
        </div>

        {/* Features Grid */}
        <div
          className="unique-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
            marginBottom: "80px",
          }}
        >
          {ABOUT_UNIQUE.features.map((feat) => (
            <FeatureCard key={feat.id} feature={feat} />
          ))}
        </div>

        {/* Final Statement */}
        <div style={finalStatementStyle}>
          <p
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#0e7490",
              fontFamily: aboutTypography.fontFamily,
              margin: 0,
            }}
          >
            {ABOUT_UNIQUE.finalStatement.line1}
            <br />
            <span style={{ color: aboutColors.primary }}>
              {ABOUT_UNIQUE.finalStatement.line2}
            </span>
          </p>
        </div>
      </div>

      {/* Hover & Responsive Styles */}
      <style jsx global>{`
        .unique-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px -8px rgba(6, 182, 212, 0.2);
          border-color: #06b6d4;
        }

        html.dark .unique-card {
          background-color: #1e293b;
          border-color: #334155;
        }

        html.dark .unique-card:hover {
          border-color: #06b6d4;
          box-shadow: 0 16px 32px -8px rgba(6, 182, 212, 0.3);
        }

        html.dark .unique-card p {
          color: #e2e8f0;
        }

        @media (max-width: 1024px) {
          .unique-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          .unique-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default UniqueSection;
