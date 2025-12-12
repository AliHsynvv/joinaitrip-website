"use client";

// =============================================================================
// MISSION SECTION
// =============================================================================

import { Crosshair, CheckCircle2 } from "lucide-react";
import { ABOUT_MISSION } from "@/constants/about.constants";
import {
  missionSectionStyle,
  missionCardStyle,
  missionPointStyle,
  aboutTypography,
  aboutColors,
  iconContainerStyle,
} from "@/styles/about.styles";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function MissionSection() {
  return (
    <div style={missionSectionStyle}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          className="mission-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: "80px",
            alignItems: "center",
          }}
        >
          {/* Left - Title */}
          <div>
            <div
              style={{
                ...iconContainerStyle("cyan", "lg"),
                marginBottom: "32px",
              }}
            >
              <Crosshair size={36} color="#0891b2" />
            </div>

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
              {ABOUT_MISSION.title}
            </h2>

            <p
              style={{
                fontSize: "18px",
                color: aboutColors.textMuted,
                lineHeight: 1.7,
                fontFamily: aboutTypography.fontFamily,
              }}
            >
              {ABOUT_MISSION.description}
            </p>
          </div>

          {/* Right - Points */}
          <div style={missionCardStyle}>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              {ABOUT_MISSION.points.map((point, i) => (
                <li key={i} style={missionPointStyle}>
                  <div
                    style={{
                      ...iconContainerStyle("cyan", "sm"),
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    <CheckCircle2 size={16} color="#0891b2" />
                  </div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MissionSection;
