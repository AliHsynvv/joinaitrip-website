"use client";

// =============================================================================
// AIREN SECTION - Powered by Airen AI
// =============================================================================

import Image from "next/image";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { ABOUT_AIREN } from "@/constants/about.constants";
import {
  airenSectionStyle,
  airenBadgeStyle,
  airenQuoteStyle,
  aboutTypography,
  aboutColors,
} from "@/styles/about.styles";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function AirenSection() {
  return (
    <div style={airenSectionStyle}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div
          className="airen-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
          }}
        >
          {/* Image */}
          <div
            className="airen-image-container"
            style={{
              position: "relative",
              height: "600px",
              borderRadius: "40px",
              overflow: "hidden",
              boxShadow: "0 32px 64px -12px rgba(0, 0, 0, 0.15)",
            }}
          >
            <Image
              src={ABOUT_AIREN.image}
              alt={ABOUT_AIREN.imageAlt}
              fill
              style={{ objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(6, 182, 212, 0.3) 0%, transparent 100%)",
              }}
            />
          </div>

          {/* Content */}
          <div>
            {/* Badge */}
            <div style={airenBadgeStyle}>
              <Sparkles size={18} color={aboutColors.primary} />
              <span style={{ color: "#0891b2", fontWeight: 600, fontSize: "14px" }}>
                {ABOUT_AIREN.badge}
              </span>
            </div>

            {/* Title */}
            <h2
              style={{
                fontSize: "44px",
                fontWeight: 700,
                color: aboutColors.textPrimary,
                marginBottom: "24px",
                lineHeight: 1.15,
                fontFamily: aboutTypography.fontFamily,
              }}
            >
              {ABOUT_AIREN.title}
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: "18px",
                color: aboutColors.textMuted,
                lineHeight: 1.7,
                marginBottom: "16px",
                fontFamily: aboutTypography.fontFamily,
              }}
            >
              {ABOUT_AIREN.description}
            </p>

            <p
              style={{
                fontSize: "16px",
                color: aboutColors.textLight,
                lineHeight: 1.7,
                marginBottom: "32px",
                fontFamily: aboutTypography.fontFamily,
              }}
            >
              {ABOUT_AIREN.subDescription}
            </p>

            {/* Features Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "32px",
              }}
            >
              {ABOUT_AIREN.features.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <CheckCircle2
                    size={20}
                    color={aboutColors.primary}
                    style={{ flexShrink: 0 }}
                  />
                  <span
                    style={{
                      fontSize: "15px",
                      color: aboutColors.textSecondary,
                      fontFamily: aboutTypography.fontFamily,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div style={airenQuoteStyle}>
              <p
                style={{
                  fontSize: "16px",
                  color: "#0e7490",
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  fontFamily: aboutTypography.fontFamily,
                  margin: 0,
                }}
              >
                {ABOUT_AIREN.quote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AirenSection;
