"use client";

// =============================================================================
// VISION SECTION
// =============================================================================

import { Lightbulb } from "lucide-react";
import { ABOUT_VISION } from "@/constants/about.constants";
import {
  visionSectionStyle,
  visionCardStyle,
  aboutTypography,
  aboutColors,
  iconContainerStyle,
} from "@/styles/about.styles";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function VisionSection() {
  return (
    <div style={visionSectionStyle}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={visionCardStyle}>
          <div
            style={{
              ...iconContainerStyle("orange", "md"),
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              flexShrink: 0,
            }}
          >
            <Lightbulb size={26} color="#ea580c" />
          </div>

          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: aboutColors.accent,
                marginBottom: "8px",
                fontFamily: aboutTypography.fontFamily,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {ABOUT_VISION.title}
            </h3>
            <p
              style={{
                fontSize: "17px",
                color: aboutColors.textSecondary,
                lineHeight: 1.6,
                fontFamily: aboutTypography.fontFamily,
                margin: 0,
              }}
            >
              {ABOUT_VISION.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisionSection;
