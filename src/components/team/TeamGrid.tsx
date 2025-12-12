"use client";

// =============================================================================
// TEAM GRID - Team members grid section
// =============================================================================

import Image from "next/image";
import { TEAM_MEMBERS, TEAM_GRID_CONTENT } from "@/constants/team.constants";
import {
  teamGridSectionStyle,
  teamGridContainerStyle,
  teamGridHeaderStyle,
  teamTitleStyle,
  teamSubtitleStyle,
  teamGridStyle,
  memberCardStyle,
  memberCardOverlayStyle,
  memberNameStyle,
  memberRoleStyle,
} from "@/styles/team.styles";
import type { TeamMember } from "@/types/team.types";

// -----------------------------------------------------------------------------
// Team Member Card Component
// -----------------------------------------------------------------------------

interface TeamMemberCardProps {
  member: TeamMember;
}

function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div style={memberCardStyle}>
      <Image
        src={member.image}
        alt={member.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
        style={{ objectFit: "cover" }}
      />

      {/* Overlay with Name/Role */}
      <div style={memberCardOverlayStyle}>
        <h3 style={memberNameStyle}>{member.name}</h3>
        <p style={memberRoleStyle}>{member.role}</p>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function TeamGrid() {
  return (
    <section style={teamGridSectionStyle}>
      <div style={teamGridContainerStyle}>
        {/* Header - Overlapping the Hero */}
        <div style={teamGridHeaderStyle}>
          <h1 style={teamTitleStyle}>{TEAM_GRID_CONTENT.title}</h1>
          <p style={teamSubtitleStyle}>{TEAM_GRID_CONTENT.subtitle}</p>
        </div>

        {/* Team Grid */}
        <div style={teamGridStyle}>
          {TEAM_MEMBERS.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamGrid;
