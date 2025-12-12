// =============================================================================
// HERO SECTION CONSTANTS
// =============================================================================

import {
  Plane,
  Building2,
  Bus,
  Car,
  Compass,
  BookOpen,
  UtensilsCrossed,
  Landmark,
  PlusCircle,
} from "lucide-react";
import type { ServiceTab, TripTypeOption, CabinClass } from "@/types/search.types";

// -----------------------------------------------------------------------------
// Service Tabs Configuration
// -----------------------------------------------------------------------------

export const SERVICE_TABS: ServiceTab[] = [
  { id: "flight", label: "Flight", icon: Plane },
  { id: "hotel", label: "Hotel", icon: Building2 },
  { id: "transfer", label: "Transfer", icon: Bus },
  { id: "car", label: "Car Rental", icon: Car },
  { id: "tour", label: "Tour", icon: Compass },
  { id: "guides", label: "Guides", icon: BookOpen },
  { id: "restaurant", label: "Restaurant", icon: UtensilsCrossed },
  { id: "museum", label: "Museum", icon: Landmark },
  { id: "package", label: "Create Package", icon: PlusCircle },
] as const;

// -----------------------------------------------------------------------------
// Trip Types
// -----------------------------------------------------------------------------

export const TRIP_TYPES: TripTypeOption[] = [
  { id: "round", label: "Round-trip" },
  { id: "oneway", label: "One-way" },
  { id: "multi", label: "Multi-city" },
] as const;

// -----------------------------------------------------------------------------
// Cabin Classes
// -----------------------------------------------------------------------------

export const CABIN_CLASSES: { id: CabinClass; label: string }[] = [
  { id: "economy", label: "Economy" },
  { id: "premium_economy", label: "Premium Economy" },
  { id: "business", label: "Business" },
  { id: "first", label: "First Class" },
] as const;

// -----------------------------------------------------------------------------
// Luggage Options (for Transfer)
// -----------------------------------------------------------------------------

export const LUGGAGE_OPTIONS = [
  { id: "small", label: "Small (Carry-on only)" },
  { id: "medium", label: "Medium (1-2 bags)" },
  { id: "large", label: "Large (3+ bags)" },
] as const;

// -----------------------------------------------------------------------------
// Default Values
// -----------------------------------------------------------------------------

export const DEFAULT_TRAVELERS = {
  adults: 1,
  children: 0,
  infants: 0,
  cabinClass: "economy" as CabinClass,
  rooms: 1,
};

export const DEFAULT_PRICE_RANGE = {
  min: 100,
  max: 200,
  currency: "₼",
};

// -----------------------------------------------------------------------------
// Package Builder - Available Services
// -----------------------------------------------------------------------------

export const PACKAGE_AVAILABLE_SERVICES = [
  "flight",
  "hotel",
  "transfer",
  "car",
  "tour",
  "restaurant",
  "museum",
] as const;

// -----------------------------------------------------------------------------
// Hero Images
// -----------------------------------------------------------------------------

export const HERO_IMAGES = {
  day: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=2073&auto=format&fit=crop",
  night: "/hero image/nghthero.jpeg",
  airenAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
} as const;

// -----------------------------------------------------------------------------
// Hero Content
// -----------------------------------------------------------------------------

export const HERO_CONTENT = {
  headline: {
    line1: "Planning your trip is now",
    line2: "easier than ever",
  },
  subheadline: "All your travel options in one place – anytime, anywhere.",
  chatButton: {
    label: "Chat with Airen",
    altText: "Airen AI Assistant",
  },
  searchButton: "Search",
  createTourButton: "Create Tour",
  addServicesButton: "Add Services",
  advancedSearchButton: "Advanced Search",
} as const;

// -----------------------------------------------------------------------------
// Form Field Labels
// -----------------------------------------------------------------------------

export const FORM_LABELS = {
  // Common
  from: "From:",
  to: "to:",
  whereTo: "Where to?",
  goingTo: "Going to",
  date: "Date",
  dates: "Dates",
  selectDate: "Select date",
  selectTime: "Select time",
  time: "Time",
  travelers: "Travelers",
  guests: "Guests",
  
  // Flight specific
  checkIn: "Check-in",
  checkOut: "Check-out",
  passengersDefault: "1 adult, Economy",
  travelersPerCabin: "Travelers / Cabin Class",
  
  // Hotel specific
  roomsGuests: "Rooms/Guests",
  
  // Transfer specific
  airport: "Airport",
  hotel: "Hotel",
  luggage: "Luggage",
  
  // Car specific
  pickup: "Pick-up",
  dropoff: "Drop-off",
  sameAsPickup: "Same as pick-up",
  pickupTime: "Pick-up time",
  dropoffTime: "Drop-off time",
  
  // Tour specific
  country: "Country",
  price: "Price :",
  priceRange: "₼100 - ₼200",
  needGuide: "Need Guide",
  needCar: "Need Car",
  needDriver: "Need English Speaking Driver",
  
  // Restaurant/Museum
  restaurantOrDestination: "Restaurant or destination",
  rooms: "Rooms",
} as const;
