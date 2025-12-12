// =============================================================================
// SERVICES PAGE CONSTANTS
// =============================================================================

import {
  Plane,
  Building2,
  Bus,
  Car,
  Map,
  Users,
  UtensilsCrossed,
  Landmark,
  Briefcase,
  Sparkles,
} from "lucide-react";
import type { ServiceItem, ServicesHeroContent, ServicesListContent, ServiceColorScheme, ServiceColorKey } from "@/types/services.types";

// -----------------------------------------------------------------------------
// Hero Content
// -----------------------------------------------------------------------------

export const SERVICES_HERO: ServicesHeroContent = {
  title: "Unforgettable Experiences Start Here",
  subtitle: "Planning your trip has never been so easy and exciting! Discover our services that will make your trip unforgettable.",
  primaryButton: {
    text: "Start Exploring",
    href: "/",
  },
  secondaryButton: {
    text: "Contact Us",
    href: "/contact",
  },
  backgroundImage: "https://images.unsplash.com/photo-1596306499398-8d88944a5ec4?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  backgroundAlt: "Colorful buildings in Cinque Terre, Italy",
} as const;

// -----------------------------------------------------------------------------
// Services List Content
// -----------------------------------------------------------------------------

export const SERVICES_LIST_CONTENT: ServicesListContent = {
  badge: "Complete Ecosystem",
  title: "Our Services",
  subtitle: "JoinAiTrip provides a fully AI-powered marketplace designed to cover every part of the travel journey. Our service list is structured to offer a complete, seamless, and globally optimized travel experience.",
} as const;

// -----------------------------------------------------------------------------
// Color Schemes
// -----------------------------------------------------------------------------

export const SERVICE_COLORS: Record<ServiceColorKey, ServiceColorScheme> = {
  blue: { background: "#eff6ff", text: "#2563eb", iconBg: "#dbeafe" },
  sky: { background: "#f0f9ff", text: "#0284c7", iconBg: "#e0f2fe" },
  indigo: { background: "#eef2ff", text: "#4f46e5", iconBg: "#e0e7ff" },
  teal: { background: "#f0fdfa", text: "#0d9488", iconBg: "#ccfbf1" },
  orange: { background: "#fff7ed", text: "#ea580c", iconBg: "#ffedd5" },
  green: { background: "#f0fdf4", text: "#16a34a", iconBg: "#dcfce7" },
  purple: { background: "#faf5ff", text: "#9333ea", iconBg: "#f3e8ff" },
  rose: { background: "#fff1f2", text: "#e11d48", iconBg: "#ffe4e6" },
  amber: { background: "#fffbeb", text: "#d97706", iconBg: "#fef3c7" },
  cyan: { background: "#ecfeff", text: "#0891b2", iconBg: "#cffafe" },
};

// -----------------------------------------------------------------------------
// Services Data
// -----------------------------------------------------------------------------

export const SERVICES: ServiceItem[] = [
  {
    id: "b2b",
    title: "B2B Marketplace",
    subtitle: "Global Partner Ecosystem",
    description: "JoinAiTrip's B2B Marketplace brings together travel agencies, hotels, tour operators, transport companies, and activity providers.",
    features: [
      "Partner dashboard & analytics",
      "Upload contract rates & availability",
      "AI-driven pricing guidance",
      "Global exposure to new customers",
    ],
    icon: Briefcase,
    colorClass: "blue",
    colSpan: "2",
  },
  {
    id: "flights",
    title: "Flights",
    subtitle: "AI-Powered Global Flight Search",
    description: "Intelligent worldwide flight booking with real-time fare comparison and route optimization.",
    features: [
      "AI fare prediction",
      "Multi-city & flexible dates",
      "Cheapest/fastest route analysis",
    ],
    icon: Plane,
    colorClass: "sky",
    colSpan: "1",
  },
  {
    id: "hotels",
    title: "Hotels",
    subtitle: "Worldwide Accommodation Network",
    description: "Thousands of global properties with AI-curated matching based on safety, location, and price.",
    features: [
      "Real-time availability",
      "AI-generated review summaries",
      "Luxury, budget, boutique options",
    ],
    icon: Building2,
    colorClass: "indigo",
    colSpan: "1",
  },
  {
    id: "transfers",
    title: "Transfers",
    subtitle: "Reliable Global Transportation",
    description: "Seamless airport & city transfers coordinated by AI with VIP and group options.",
    features: [
      "Airport & city transfers",
      "Private drivers & VIP vehicles",
      "Meet & Assist services",
    ],
    icon: Bus,
    colorClass: "teal",
    colSpan: "1",
  },
  {
    id: "car-rental",
    title: "Car Rental",
    subtitle: "Total Mobility, Anywhere",
    description: "Global car rental solutions powered by AI. From self-drive economy cars to luxury chauffeurs.",
    features: [
      "SUVs, EVs, minivans",
      "Professional chauffeurs",
      "Hourly & daily rentals",
    ],
    icon: Car,
    colorClass: "orange",
    colSpan: "1",
  },
  {
    id: "tours",
    title: "Tours",
    subtitle: "Global Activities & Experiences",
    description: "Thousands of curated experiences from city sightseeing to adventure & nature tours.",
    features: [
      "Cultural & historical tours",
      "Culinary & food tours",
      "Private & group options",
    ],
    icon: Map,
    colorClass: "green",
    colSpan: "2",
  },
  {
    id: "guides",
    title: "Guides",
    subtitle: "Professional Multilingual Experts",
    description: "Certified guides for any destination creating deeper, more meaningful travel experiences.",
    features: [
      "Museum & historical tours",
      "In-trip support",
      "Available in 10+ languages",
    ],
    icon: Users,
    colorClass: "purple",
    colSpan: "1",
  },
  {
    id: "restaurants",
    title: "Restaurants",
    subtitle: "AI-Curated Dining Experiences",
    description: "Discover authentic world cuisine matched to your taste, budget, and location.",
    features: [
      "Local must-try dishes",
      "Reviews & ratings analysis",
      "Budget & cuisine matching",
    ],
    icon: UtensilsCrossed,
    colorClass: "rose",
    colSpan: "1",
  },
  {
    id: "museums",
    title: "Museums & Attractions",
    subtitle: "Culture at Your Fingertips",
    description: "Connect to global cultural experiences with entry tickets and skip-the-line passes.",
    features: [
      "Entry tickets & passes",
      "Art & cultural experiences",
      "Local heritage insights",
    ],
    icon: Landmark,
    colorClass: "amber",
    colSpan: "1",
  },
  {
    id: "package",
    title: "Create Your Tour Package",
    subtitle: "AI Trip Builder",
    description: "A revolutionary feature: create your own complete travel package in under one minute.",
    features: [
      "Full itinerary generation",
      "Hotels, Flights, Transfers",
      "Tours, Activities, Dining",
      "Instant cost breakdown",
    ],
    icon: Sparkles,
    colorClass: "cyan",
    colSpan: "3",
    isHighlighted: true,
  },
];
