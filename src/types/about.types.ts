// =============================================================================
// ABOUT PAGE TYPES
// =============================================================================

import { LucideIcon } from "lucide-react";

// -----------------------------------------------------------------------------
// Feature Types
// -----------------------------------------------------------------------------

export interface UniqueFeature {
  id: string;
  icon: LucideIcon;
  text: string;
  color: "cyan" | "orange";
}

export interface MissionPoint {
  id: string;
  text: string;
}

// -----------------------------------------------------------------------------
// Content Section Types
// -----------------------------------------------------------------------------

export interface AboutHeroContent {
  title: string;
  subtitle: string;
  backgroundImage: string;
  backgroundAlt: string;
}

export interface IntroductionContent {
  paragraphs: string[];
}

export interface AirenSectionContent {
  badge: string;
  title: string;
  description: string;
  subDescription: string;
  features: string[];
  quote: string;
  image: string;
  imageAlt: string;
}

export interface EcosystemContent {
  title: string;
  subtitle: string;
  features: string[];
  statement: string;
}

export interface MissionContent {
  title: string;
  description: string;
  points: string[];
}

export interface VisionContent {
  title: string;
  description: string;
}

export interface UniqueContent {
  title: string;
  features: UniqueFeature[];
  finalStatement: {
    line1: string;
    line2: string;
  };
}
