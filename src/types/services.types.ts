// =============================================================================
// SERVICES PAGE TYPES
// =============================================================================

import { LucideIcon } from "lucide-react";

// -----------------------------------------------------------------------------
// Service Item Types
// -----------------------------------------------------------------------------

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  colorClass: string;
  colSpan: "1" | "2" | "3";
  isHighlighted?: boolean;
}

// -----------------------------------------------------------------------------
// Hero Content Types
// -----------------------------------------------------------------------------

export interface ServicesHeroContent {
  title: string;
  subtitle: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton: {
    text: string;
    href: string;
  };
  backgroundImage: string;
  backgroundAlt: string;
}

// -----------------------------------------------------------------------------
// Services List Content Types
// -----------------------------------------------------------------------------

export interface ServicesListContent {
  badge: string;
  title: string;
  subtitle: string;
}

// -----------------------------------------------------------------------------
// Color Mapping Types
// -----------------------------------------------------------------------------

export interface ServiceColorScheme {
  background: string;
  text: string;
  iconBg: string;
}

export type ServiceColorKey = 
  | "blue"
  | "sky"
  | "indigo"
  | "teal"
  | "orange"
  | "green"
  | "purple"
  | "rose"
  | "amber"
  | "cyan";
