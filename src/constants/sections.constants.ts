// =============================================================================
// SECTIONS CONSTANTS - Home Page Content Data
// =============================================================================

import { Wallet, Home, Headset } from "lucide-react";
import type { DiscoverPlace, Feature, Review, FeedbackStats } from "@/types/sections.types";

// -----------------------------------------------------------------------------
// Contact Section
// -----------------------------------------------------------------------------

export const CONTACT_CONTENT = {
  title: "Let's Get In Touch",
  subtitle: "Contact us with your questions or collaboration proposals.",
  image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200&auto=format&fit=crop",
  imageAlt: "Beautiful Bali rice terrace landscape",
  form: {
    placeholders: {
      fullName: "Full Name",
      email: "E-mail",
      message: "Message",
    },
    submitButton: "Send",
  },
} as const;

// -----------------------------------------------------------------------------
// Discover Section
// -----------------------------------------------------------------------------

export const DISCOVER_CONTENT = {
  title: "Discover your new favorite places",
} as const;

export const DISCOVER_PLACES: DiscoverPlace[] = [
  {
    id: "pet-friendly",
    title: "Pet friendly",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop",
    slug: "pet-friendly",
  },
  {
    id: "pool",
    title: "Pool",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop",
    slug: "pool",
  },
  {
    id: "castle",
    title: "Castle",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=684&auto=format&fit=crop",
    slug: "castle",
  },
  {
    id: "ocean-view",
    title: "Ocean view",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop",
    slug: "ocean-view",
  },
  {
    id: "apartments",
    title: "Apartments",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
    slug: "apartments",
  },
];

// -----------------------------------------------------------------------------
// Features Section
// -----------------------------------------------------------------------------

export const FEATURES_DATA: Feature[] = [
  {
    id: "properties",
    icon: Wallet,
    title: "2+ million properties worldwide",
    description: "Hotels, guest houses, apartments, and more...",
    color: "#fef3c7", // amber-100
    iconColor: "#d97706", // amber-600
  },
  {
    id: "payment",
    icon: Home,
    title: "Book now, pay at the property",
    description: "FREE cancellation on most rooms",
    color: "#e0f2fe", // sky-100
    iconColor: "#0284c7", // sky-600
  },
  {
    id: "support",
    icon: Headset,
    title: "Trusted customer service you can rely on, 24/7",
    description: "We're always here to help",
    color: "#dcfce7", // green-100
    iconColor: "#16a34a", // green-600
  },
];

// -----------------------------------------------------------------------------
// Feedback Section
// -----------------------------------------------------------------------------

export const FEEDBACK_CONTENT = {
  title: "Feedback From You",
  subtitle: "1500+ people from 35 countries shared their experiences with us",
  showMoreButton: "Show More Comment",
} as const;

export const FEEDBACK_STATS: FeedbackStats = {
  totalReviews: 1500,
  countriesCount: 35,
};

// Sample reviews data - will be replaced with API data
export const SAMPLE_REVIEWS: Review[] = [
  {
    id: 1,
    name: "Fred Rick",
    time: "3 days ago",
    comment: "The driver Ray was very friendly and knowledgeable about the island. He made it a fun and educational day for our group.",
    rating: 5,
    likes: 5,
    dislikes: 12,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    source: "Trustpilot",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    time: "5 days ago",
    comment: "Amazing experience! The tour guide was incredibly helpful and made sure everyone was comfortable throughout the journey.",
    rating: 5,
    likes: 8,
    dislikes: 2,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    source: "Trustpilot",
  },
  {
    id: 3,
    name: "Michael Chen",
    time: "1 week ago",
    comment: "Great value for money. The hotel was exactly as described and the staff went above and beyond to help us.",
    rating: 5,
    likes: 12,
    dislikes: 3,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    source: "Trustpilot",
  },
  {
    id: 4,
    name: "Emma Wilson",
    time: "2 weeks ago",
    comment: "Booking was seamless and the customer support team was very responsive when I had questions. Highly recommend!",
    rating: 5,
    likes: 15,
    dislikes: 1,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    source: "Trustpilot",
  },
];

// -----------------------------------------------------------------------------
// Common Scroll Settings
// -----------------------------------------------------------------------------

export const CAROUSEL_SETTINGS = {
  scrollAmount: 300,
  cardWidth: 280,
  cardHeight: 360,
  gap: 24,
} as const;

// -----------------------------------------------------------------------------
// Popular Section
// -----------------------------------------------------------------------------

import type { PopularPlace, PromoBanner, RecommendedHotel, TrendingDestination } from "@/types/sections.types";

export const POPULAR_CONTENT = {
  title: "Popular Places",
} as const;

export const POPULAR_PLACES: PopularPlace[] = [
  {
    id: 1,
    name: "Antalya",
    location: "Antalya Region,Turkey",
    price: 736,
    note: "avg. night price",
    image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=800&auto=format&fit=crop",
    slug: "antalya",
  },
  {
    id: 2,
    name: "Switzerland",
    location: "Mugla, Turkey",
    price: 500,
    note: "avg. night price",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800&auto=format&fit=crop",
    slug: "switzerland",
  },
  {
    id: 3,
    name: "The Inn Of The Hills",
    location: "Antalya Region,Turkey",
    price: 736,
    note: "avg. night price",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    slug: "inn-hills",
  },
  {
    id: 4,
    name: "The fire city",
    location: "Baku, Azerbaijan",
    price: 700,
    note: "1 night, 2 adults",
    image: "https://images.unsplash.com/photo-1596306499398-8d88944a5ec4?q=80&w=1112&auto=format&fit=crop",
    slug: "baku",
  },
  {
    id: 5,
    name: "Bodrum",
    location: "Mugla, Turkey",
    price: 700,
    note: "avg. night price",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop",
    slug: "bodrum",
  },
];

export const PROMO_BANNER: PromoBanner = {
  title: "End of Summer\nSpecial Discounts",
  description: "Don't postpone your travel dreams. Up to 30% off all tours until the end of August. Book now, save money and take advantage of the last opportunities of the summer season.",
  buttonText: "Book Now",
  image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2000&auto=format&fit=crop",
  imageAlt: "Luxury pool with ocean view",
};

// -----------------------------------------------------------------------------
// Recommended Section
// -----------------------------------------------------------------------------

export const RECOMMENDED_CONTENT = {
  title: "Recommended For You",
} as const;

export const RECOMMENDED_HOTELS: RecommendedHotel[] = [
  {
    id: 1,
    name: "Sunset Hotel",
    location: "Sout Beach",
    rating: "8.0",
    ratingText: "Very Good",
    reviews: "1,900 reviews",
    flightRoute: "Baku(GYD)-Montenegro(TGD)",
    price: 736,
    nightlyPrice: 102,
    totalPrice: 838,
    dateRange: "Sep 18 - Oct 3",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
    originalPrice: null,
  },
  {
    id: 2,
    name: "Agriturismo Cabrele Hotel",
    location: "Sout Beach",
    rating: "9.3",
    ratingText: "Very Good",
    reviews: "1080 reviews",
    flightRoute: "Baku(GYD)-Milan(MIL)",
    price: 5560,
    nightlyPrice: 428,
    totalPrice: 5560,
    dateRange: "Sep 28 - Oct 3",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
    originalPrice: 6700,
  },
  {
    id: 3,
    name: "Hotel Principe Torlonia",
    location: "Sout Beach",
    rating: "9.5",
    ratingText: "Very Good",
    reviews: "1,900 reviews",
    flightRoute: "Baku(GYD)-Rome(ROM)",
    price: 736,
    nightlyPrice: 102,
    totalPrice: 838,
    dateRange: "Aug 25 - Sep 3",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop",
    originalPrice: null,
  },
  {
    id: 4,
    name: "Lemira Hotel Pera Hotel",
    location: "Sout Beach",
    rating: "7.0",
    ratingText: "Very Good",
    reviews: "500 reviews",
    flightRoute: "Baku(GYD)-Istanbul(IST)",
    price: 500,
    nightlyPrice: 92,
    totalPrice: 592,
    dateRange: "Sep 1 - Oct 10",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop",
    originalPrice: null,
  },
];

// -----------------------------------------------------------------------------
// Trending Section
// -----------------------------------------------------------------------------

export const TRENDING_CONTENT = {
  title: "Trending destinations",
} as const;

export const TRENDING_DESTINATIONS: TrendingDestination[] = [
  {
    id: 1,
    name: "Montenegro",
    image: "https://images.unsplash.com/photo-1586515779592-d94f096e4c41?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "montenegro",
  },
  {
    id: 2,
    name: "Rome-Italy",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1200&auto=format&fit=crop",
    slug: "rome-italy",
  },
  {
    id: 3,
    name: "Thailand-Phra Nang Beach",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1200&auto=format&fit=crop",
    slug: "thailand-phra-nang",
  },
  {
    id: 4,
    name: "Ulupamir Van Turkey",
    image: "https://images.unsplash.com/photo-1611733448849-0580689d5621?q=80&w=2101&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "ulupamir-van",
  },
  {
    id: 5,
    name: "Aegean Sea, Turkey",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "aegean-sea",
  },
];
