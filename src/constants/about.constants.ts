// =============================================================================
// ABOUT PAGE CONSTANTS
// =============================================================================

import {
  BrainCircuit,
  BarChart3,
  Globe2,
  Clock,
  Cpu,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import type { UniqueFeature } from "@/types/about.types";

// -----------------------------------------------------------------------------
// Hero Section
// -----------------------------------------------------------------------------

export const ABOUT_HERO = {
  title: "Your Journey Begins With AI",
  subtitle: "JoinAiTrip is a next-generation AI-powered global travel ecosystem built to revolutionize how people discover, plan, and experience the world.",
  backgroundImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop",
  backgroundAlt: "Travelers looking at a map in nature",
} as const;

// -----------------------------------------------------------------------------
// Introduction Section
// -----------------------------------------------------------------------------

export const ABOUT_INTRODUCTION = {
  paragraphs: [
    "JoinAiTrip is a next-generation AI-powered global travel ecosystem built to revolutionize how people discover, plan, and experience the world.",
    "We combine intelligent algorithms, real-time global data, and marketplace infrastructure to create an entirely new era of travel — smart, personalized, dynamic, and effortless.",
    "Whether you're traveling for leisure, business, adventure, or family vacations, JoinAiTrip empowers every traveler with AI-driven planning, instant booking, and real-time assistance, turning complex decisions into simple, seamless experiences.",
  ],
} as const;

// -----------------------------------------------------------------------------
// Airen Section
// -----------------------------------------------------------------------------

export const ABOUT_AIREN = {
  badge: "Powered by Airen",
  title: "Your AI Travel Influencer & Personal Assistant",
  description: "At the core of JoinAiTrip stands Airen, the world's first AI travel influencer, concierge, and trip-planning engine integrated into a travel marketplace.",
  subDescription: "Airen analyzes millions of data points to deliver:",
  features: [
    "Personalized trip plans",
    "Destination recommendations",
    "Optimized hotel & flight suggestions",
    "Restaurant and cultural insights",
    "Smart tour/activity matching",
    "Real-time on-trip assistance",
    "Dynamic tour package creation",
    "Daily itineraries & budget optimization",
  ],
  quote: "\"Airen doesn't just suggest — she understands your style, learns your preferences, and creates travel experiences uniquely designed for you.\"",
  image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1632&auto=format&fit=crop",
  imageAlt: "Airen AI Technology",
} as const;

// -----------------------------------------------------------------------------
// Global Ecosystem Section
// -----------------------------------------------------------------------------

export const ABOUT_ECOSYSTEM = {
  title: "A Global Travel Ecosystem Covering 195+ Countries",
  subtitle: "JoinAiTrip provides:",
  features: [
    "A worldwide hotel & flight network",
    "City & region-based global experiences",
    "Thousands of tours and activities",
    "Multilingual guides",
    "Global car rentals & transfers",
    "Restaurants & cultural recommendations",
    "Museum & attraction entries",
    "AI-generated personalized travel packages",
  ],
  statement: "We empower both travelers and tourism businesses with one unified, intelligent marketplace.",
} as const;

// -----------------------------------------------------------------------------
// Mission Section
// -----------------------------------------------------------------------------

export const ABOUT_MISSION = {
  title: "Our Mission",
  description: "To redefine global travel through artificial intelligence by creating a world where:",
  points: [
    "Every traveler has a personal AI assistant",
    "Every decision is smart, fast, and optimized",
    "Every business has global reach and visibility",
    "Trip planning becomes effortless, enjoyable, and intelligent",
    "The entire travel industry becomes more transparent and future-ready",
  ],
} as const;

// -----------------------------------------------------------------------------
// Vision Section
// -----------------------------------------------------------------------------

export const ABOUT_VISION = {
  title: "Our Vision",
  description: "To become the world's leading AI travel marketplace, recognized for innovation, speed, intelligence, and global connectivity — setting a new global standard in how people explore the world.",
} as const;

// -----------------------------------------------------------------------------
// What Makes Us Unique Section
// -----------------------------------------------------------------------------

export const ABOUT_UNIQUE = {
  title: "What Makes JoinAiTrip Unique",
  features: [
    {
      id: "ai-integrated",
      icon: BrainCircuit,
      text: "AI integrated into every step of travel planning & booking",
      color: "cyan" as const,
    },
    {
      id: "price-intelligence",
      icon: BarChart3,
      text: "Real-time price intelligence for flights, hotels, and experiences",
      color: "orange" as const,
    },
    {
      id: "global-marketplace",
      icon: Globe2,
      text: "A global marketplace connecting travelers with top tourism businesses",
      color: "cyan" as const,
    },
    {
      id: "60-seconds",
      icon: Clock,
      text: "Personalized trip creation in 60 seconds",
      color: "orange" as const,
    },
    {
      id: "ai-influencer",
      icon: Cpu,
      text: "AI influencer (Airen) for destination discovery and social reach",
      color: "cyan" as const,
    },
    {
      id: "modern-ui",
      icon: Smartphone,
      text: "Modern UI/UX built for high scalability and global audiences",
      color: "orange" as const,
    },
    {
      id: "dynamic",
      icon: TrendingUp,
      text: "Dynamic, adaptive, smart — travel built around you",
      color: "cyan" as const,
    },
  ] satisfies UniqueFeature[],
  finalStatement: {
    line1: "JoinAiTrip is not just a platform.",
    line2: "It is the future of intelligent travel.",
  },
} as const;
