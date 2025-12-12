// =============================================================================
// SECTION TYPES - Home Page Sections
// =============================================================================

import { LucideIcon } from "lucide-react";

// -----------------------------------------------------------------------------
// Contact Section Types
// -----------------------------------------------------------------------------

export interface ContactFormData {
  fullName: string;
  email: string;
  message: string;
}

export interface ContactFormState extends ContactFormData {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

// API Response for contact form
export interface ContactApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// -----------------------------------------------------------------------------
// Discover Section Types
// -----------------------------------------------------------------------------

export interface DiscoverPlace {
  id: string;
  title: string;
  image: string;
  slug?: string;
}

// -----------------------------------------------------------------------------
// Features Section Types
// -----------------------------------------------------------------------------

export interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;      // Background color
  iconColor: string;  // Icon color
}

// -----------------------------------------------------------------------------
// Feedback Section Types
// -----------------------------------------------------------------------------

export interface Review {
  id: string | number;
  name: string;
  avatar: string;
  time: string;
  comment: string;
  rating: number;
  likes: number;
  dislikes: number;
  source?: string;
}

export interface FeedbackStats {
  totalReviews: number;
  countriesCount: number;
}

// API Response for reviews
export interface ReviewsApiResponse {
  success: boolean;
  data: Review[];
  meta?: {
    total: number;
    page: number;
    perPage: number;
    hasMore: boolean;
  };
}

// -----------------------------------------------------------------------------
// Common Section Props
// -----------------------------------------------------------------------------

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center" | "right";
}

export interface ScrollableCarouselProps {
  scrollAmount?: number;
  showNavButtons?: boolean;
}

// -----------------------------------------------------------------------------
// Popular Section Types
// -----------------------------------------------------------------------------

export interface PopularPlace {
  id: number;
  name: string;
  location: string;
  price: number;
  note: string;
  image: string;
  slug?: string;
}

export interface PromoBanner {
  title: string;
  description: string;
  buttonText: string;
  image: string;
  imageAlt: string;
}

// -----------------------------------------------------------------------------
// Recommended Section Types
// -----------------------------------------------------------------------------

export interface RecommendedHotel {
  id: number;
  name: string;
  location: string;
  rating: string;
  ratingText: string;
  reviews: string;
  flightRoute: string;
  price: number;
  nightlyPrice: number;
  totalPrice: number;
  dateRange: string;
  image: string;
  originalPrice: number | null;
}

// -----------------------------------------------------------------------------
// Trending Section Types
// -----------------------------------------------------------------------------

export interface TrendingDestination {
  id: number;
  name: string;
  image: string;
  slug?: string;
}
