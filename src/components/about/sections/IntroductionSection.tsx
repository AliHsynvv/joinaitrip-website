"use client";

// =============================================================================
// INTRODUCTION SECTION
// =============================================================================

import { ABOUT_INTRODUCTION } from "@/constants/about.constants";
import { introSectionStyle, introContainerStyle, aboutTypography } from "@/styles/about.styles";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function IntroductionSection() {
  const paragraphs = ABOUT_INTRODUCTION.paragraphs;

  return (
    <div style={introSectionStyle}>
      <div style={introContainerStyle}>
        <p
          style={{
            fontSize: "20px",
            color: "#374151",
            lineHeight: 1.8,
            marginBottom: "32px",
            fontFamily: aboutTypography.fontFamily,
          }}
        >
          {paragraphs[0]}
        </p>
        <p
          style={{
            fontSize: "18px",
            color: "#6b7280",
            lineHeight: 1.8,
            marginBottom: "32px",
            fontFamily: aboutTypography.fontFamily,
          }}
        >
          {paragraphs[1]}
        </p>
        <p
          style={{
            fontSize: "18px",
            color: "#6b7280",
            lineHeight: 1.8,
            fontFamily: aboutTypography.fontFamily,
          }}
        >
          {paragraphs[2]}
        </p>
      </div>
    </div>
  );
}

export default IntroductionSection;
