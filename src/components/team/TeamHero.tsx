"use client";

// =============================================================================
// TEAM HERO - Banner section for team page
// =============================================================================

import Image from "next/image";
import { TEAM_HERO } from "@/constants/team.constants";
import { teamHeroSectionStyle, teamHeroOverlayStyle } from "@/styles/team.styles";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function TeamHero() {
  return (
    <section style={teamHeroSectionStyle}>
      {/* Background Image */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src={TEAM_HERO.backgroundImage}
          alt={TEAM_HERO.backgroundAlt}
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
          priority
        />
        <div style={teamHeroOverlayStyle} />
      </div>
    </section>
  );
}

export default TeamHero;
