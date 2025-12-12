// =============================================================================
// SEARCH TYPES - API Integration Ready
// =============================================================================

import { LucideIcon } from "lucide-react";

// -----------------------------------------------------------------------------
// Service Types
// -----------------------------------------------------------------------------

export type ServiceType =
  | "flight"
  | "hotel"
  | "transfer"
  | "car"
  | "tour"
  | "guides"
  | "restaurant"
  | "museum"
  | "package";

export type TripType = "round" | "oneway" | "multi";

export type CabinClass = "economy" | "premium_economy" | "business" | "first";

// -----------------------------------------------------------------------------
// Service Tab Configuration
// -----------------------------------------------------------------------------

export interface ServiceTab {
  id: ServiceType;
  label: string;
  icon: LucideIcon;
}

export interface TripTypeOption {
  id: TripType;
  label: string;
}

// -----------------------------------------------------------------------------
// Common Form Field Types
// -----------------------------------------------------------------------------

export interface LocationField {
  code: string;      // Airport/City code (e.g., "IST", "JFK")
  name: string;      // Display name (e.g., "Istanbul Airport")
  city?: string;     // City name
  country?: string;  // Country name
}

export interface DateRange {
  checkIn: Date | null;
  checkOut: Date | null;
}

export interface TravelersInfo {
  adults: number;
  children: number;
  infants: number;
  cabinClass?: CabinClass;
  rooms?: number;
}

// -----------------------------------------------------------------------------
// Flight Search Types
// -----------------------------------------------------------------------------

export interface FlightSearchParams {
  tripType: TripType;
  from: LocationField | null;
  to: LocationField | null;
  departDate: Date | null;
  returnDate: Date | null;
  travelers: TravelersInfo;
}

export interface FlightSearchFormState extends FlightSearchParams {
  isLoading: boolean;
  errors: Partial<Record<keyof FlightSearchParams, string>>;
}

// -----------------------------------------------------------------------------
// Hotel Search Types
// -----------------------------------------------------------------------------

export interface HotelSearchParams {
  destination: LocationField | null;
  dates: DateRange;
  rooms: number;
  guests: TravelersInfo;
}

export interface HotelSearchFormState extends HotelSearchParams {
  isLoading: boolean;
  errors: Partial<Record<keyof HotelSearchParams, string>>;
}

// -----------------------------------------------------------------------------
// Transfer Search Types
// -----------------------------------------------------------------------------

export interface TransferSearchParams {
  from: LocationField | null;
  to: LocationField | null;
  travelers: number;
  luggage: "small" | "medium" | "large";
  date: Date | null;
  time: string | null;
}

export interface TransferSearchFormState extends TransferSearchParams {
  isLoading: boolean;
  errors: Partial<Record<keyof TransferSearchParams, string>>;
}

// -----------------------------------------------------------------------------
// Car Rental Search Types
// -----------------------------------------------------------------------------

export interface CarSearchParams {
  pickupLocation: LocationField | null;
  dropoffLocation: LocationField | null;
  sameDropoff: boolean;
  pickupDate: Date | null;
  dropoffDate: Date | null;
  pickupTime: string | null;
  dropoffTime: string | null;
}

export interface CarSearchFormState extends CarSearchParams {
  isLoading: boolean;
  errors: Partial<Record<keyof CarSearchParams, string>>;
}

// -----------------------------------------------------------------------------
// Tour Search Types
// -----------------------------------------------------------------------------

export interface TourSearchParams {
  country: LocationField | null;
  destination: LocationField | null;
  travelers: number;
  date: Date | null;
  priceRange: {
    min: number;
    max: number;
  };
}

export interface TourSearchFormState extends TourSearchParams {
  isLoading: boolean;
  errors: Partial<Record<keyof TourSearchParams, string>>;
}

// -----------------------------------------------------------------------------
// Guides Search Types
// -----------------------------------------------------------------------------

export interface GuidesSearchParams {
  country: LocationField | null;
  destination: LocationField | null;
  travelers: number;
  date: Date | null;
}

export interface GuidesSearchFormState extends GuidesSearchParams {
  isLoading: boolean;
  errors: Partial<Record<keyof GuidesSearchParams, string>>;
}

// -----------------------------------------------------------------------------
// Restaurant Search Types
// -----------------------------------------------------------------------------

export interface RestaurantSearchParams {
  query: string;
  location?: LocationField | null;
}

export interface RestaurantSearchFormState extends RestaurantSearchParams {
  isLoading: boolean;
  errors: Partial<Record<keyof RestaurantSearchParams, string>>;
}

// -----------------------------------------------------------------------------
// Museum Search Types
// -----------------------------------------------------------------------------

export interface MuseumSearchParams {
  destination: LocationField | null;
  date: Date | null;
}

export interface MuseumSearchFormState extends MuseumSearchParams {
  isLoading: boolean;
  errors: Partial<Record<keyof MuseumSearchParams, string>>;
}

// -----------------------------------------------------------------------------
// Package Builder Types
// -----------------------------------------------------------------------------

export interface PackageSearchParams {
  destination: LocationField | null;
  dates: DateRange;
  selectedServices: ServiceType[];
  // Individual service configs
  flight?: Partial<FlightSearchParams>;
  hotel?: Partial<HotelSearchParams>;
  transfer?: Partial<TransferSearchParams>;
  car?: Partial<CarSearchParams>;
  tour?: Partial<TourSearchParams>;
  restaurant?: Partial<RestaurantSearchParams>;
  museum?: Partial<MuseumSearchParams>;
}

export interface PackageSearchFormState extends PackageSearchParams {
  isExpanded: boolean;
  isLoading: boolean;
  errors: Record<string, string>;
}

// -----------------------------------------------------------------------------
// API Response Types (Ready for backend integration)
// -----------------------------------------------------------------------------

export interface SearchApiResponse<T> {
  success: boolean;
  data: T | null;
  error?: {
    code: string;
    message: string;
  };
  meta?: {
    total: number;
    page: number;
    perPage: number;
  };
}

// Generic search result types - to be extended per service
export interface FlightResult {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    time: string;
  };
  arrival: {
    airport: string;
    time: string;
  };
  duration: string;
  price: number;
  currency: string;
}

export interface HotelResult {
  id: string;
  name: string;
  rating: number;
  stars: number;
  address: string;
  pricePerNight: number;
  currency: string;
  amenities: string[];
  images: string[];
}

// Add more result types as needed...
