// =============================================================================
// TEAM PAGE TYPES
// =============================================================================

// -----------------------------------------------------------------------------
// Team Member Types
// -----------------------------------------------------------------------------

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

// -----------------------------------------------------------------------------
// Hero Content Types
// -----------------------------------------------------------------------------

export interface TeamHeroContent {
  backgroundImage: string;
  backgroundAlt: string;
}

// -----------------------------------------------------------------------------
// Grid Content Types
// -----------------------------------------------------------------------------

export interface TeamGridContent {
  title: string;
  subtitle: string;
}
