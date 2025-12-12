// =============================================================================
// LAYOUT TYPES
// =============================================================================

import { LucideIcon } from "lucide-react";

// -----------------------------------------------------------------------------
// Navigation Types
// -----------------------------------------------------------------------------

export interface NavLink {
  href: string;
  label: string;
}

export interface SocialLink {
  id: string;
  href: string;
  icon: LucideIcon;
  label: string;
}

// -----------------------------------------------------------------------------
// Footer Types
// -----------------------------------------------------------------------------

export interface FooterColumn {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface FooterLink {
  label: string;
  href: string;
}

// -----------------------------------------------------------------------------
// Weather Widget Types
// -----------------------------------------------------------------------------

export interface WeatherData {
  city: string;
  temperature: number;
  unit: "C" | "F";
  condition: "sunny" | "cloudy" | "rainy" | "partly-cloudy";
}

// -----------------------------------------------------------------------------
// Language/Currency Types
// -----------------------------------------------------------------------------

export interface LanguageCurrency {
  language: string;
  languageCode: string;
  currency: string;
  currencyCode: string;
}
