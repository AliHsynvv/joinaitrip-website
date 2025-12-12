// =============================================================================
// LAYOUT CONSTANTS
// =============================================================================

import { Linkedin, Facebook, Instagram } from "lucide-react";
import type {
  NavLink,
  SocialLink,
  FooterColumn,
  WeatherData,
  LanguageCurrency,
} from "@/types/layout.types";

// -----------------------------------------------------------------------------
// Header Navigation
// -----------------------------------------------------------------------------

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/team", label: "Our Team" },
  { href: "/contact", label: "Contact Us" },
];

export const DEFAULT_LANGUAGE_CURRENCY: LanguageCurrency = {
  language: "English",
  languageCode: "EN",
  currency: "US Dollar",
  currencyCode: "USD",
};

// Default weather - will be replaced with API data
export const DEFAULT_WEATHER: WeatherData = {
  city: "Baku",
  temperature: 31,
  unit: "C",
  condition: "partly-cloudy",
};

// -----------------------------------------------------------------------------
// Footer
// -----------------------------------------------------------------------------

export const FOOTER_LOGO = {
  text: "JoinAiTrip",
  href: "/",
} as const;

export const SOCIAL_LINKS: SocialLink[] = [
  { id: "linkedin", href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { id: "facebook", href: "https://facebook.com", icon: Facebook, label: "Facebook" },
  { id: "instagram", href: "https://instagram.com", icon: Instagram, label: "Instagram" },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    id: "company",
    title: "Company",
    links: [
      { label: "Services", href: "/services" },
      { label: "About Us", href: "/about" },
      { label: "Partners", href: "/partners" },
      { label: "Jobs", href: "/jobs" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    id: "explore",
    title: "Explore",
    links: [
      { label: "Digital Marketing and Branding", href: "#" },
      { label: "Website and app creation", href: "#" },
      { label: "Corporate Digital Solutions", href: "#" },
      { label: "Cyber Security Solutions", href: "#" },
    ],
  },
  {
    id: "policies",
    title: "Policies",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Cookies", href: "/cookies" },
      { label: "Terms of use", href: "/terms" },
      { label: "Cyber Security Solutions", href: "#" },
    ],
  },
  {
    id: "help",
    title: "Help",
    links: [
      { label: "Support", href: "/support" },
      { label: "Cancel Your Flight", href: "#" },
      { label: "Cancel Your Hotel or Vacation", href: "#" },
      { label: "Contact Customer Service", href: "/contact" },
      { label: "Manage Your Travels", href: "#" },
    ],
  },
];

// -----------------------------------------------------------------------------
// Auth Links
// -----------------------------------------------------------------------------

export const AUTH_LINKS = {
  login: { href: "/login", label: "Log in" },
  register: { href: "/register", label: "Sign up" },
} as const;
