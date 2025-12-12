// =============================================================================
// TEAM PAGE CONSTANTS
// =============================================================================

import type { TeamMember, TeamHeroContent, TeamGridContent } from "@/types/team.types";

// -----------------------------------------------------------------------------
// Hero Content
// -----------------------------------------------------------------------------

export const TEAM_HERO: TeamHeroContent = {
  backgroundImage: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop",
  backgroundAlt: "Scenic landscape",
} as const;

// -----------------------------------------------------------------------------
// Grid Content
// -----------------------------------------------------------------------------

export const TEAM_GRID_CONTENT: TeamGridContent = {
  title: "Our\nTeam",
  subtitle: "The power to turn ideas into reality is here. For us, travel is not a point on a map, but an experience. Our team brings this experience to you in the most comfortable, safe and exciting way.",
} as const;

// -----------------------------------------------------------------------------
// Team Members Data
// TODO: Replace with API data in production
// -----------------------------------------------------------------------------

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "Ramil Səfərli",
    role: "Frontend Developer",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Ramil Səfərli",
    role: "Frontend Developer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Ramil Səfərli",
    role: "Frontend Developer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Ramil Səfərli",
    role: "Frontend Developer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Ramil Səfərli",
    role: "Frontend Developer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Ramil Səfərli",
    role: "Frontend Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Ramil Səfərli",
    role: "Frontend Developer",
    image: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Ramil Səfərli",
    role: "Frontend Developer",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=600&auto=format&fit=crop",
  },
];
