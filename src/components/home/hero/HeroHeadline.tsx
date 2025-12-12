"use client";

// =============================================================================
// HERO HEADLINE COMPONENT
// Main headline and subheadline text
// =============================================================================

import { HERO_CONTENT } from "@/constants/hero.constants";
import { headlineStyle, subheadlineStyle } from "@/styles/hero.styles";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function HeroHeadline() {
  return (
    <div style={{ textAlign: "center", marginBottom: "40px" }}>
      <h1 style={headlineStyle}>
        {HERO_CONTENT.headline.line1}
        <br />
        {HERO_CONTENT.headline.line2}
      </h1>
      <p style={subheadlineStyle}>{HERO_CONTENT.subheadline}</p>
    </div>
  );
}

export default HeroHeadline;
