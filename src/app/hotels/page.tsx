"use client";

// =============================================================================
// HOTEL SEARCH RESULTS PAGE
// Dynamic search results with filters, map view, header and footer
// =============================================================================

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamicImport from "next/dynamic";
import {
    MapPin,
    CalendarDays,
    Search,
    Check,
    ChevronDown,
    ChevronUp,
    Map,
    X,
    Navigation,
    Building2,
    Star,
    Pencil,
    Heart
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./hotels.css";

// Dynamically import the map components to avoid SSR issues with Leaflet
const HotelMapModal = dynamicImport(() => import("@/components/ui/HotelMapModal"), {
    ssr: false,
    loading: () => <div style={{ padding: "40px", textAlign: "center" }}>Loading map...</div>
});

const MapPreviewCard = dynamicImport(() => import("@/components/ui/MapPreviewCard"), {
    ssr: false,
    loading: () => <div style={{ height: "180px", backgroundColor: "#f3f4f6", borderRadius: "12px", marginBottom: "16px" }} />
});

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface Hotel {
    id: string;
    name: string;
    image: string;
    rating: number;
    ratingText: string;
    reviewCount: number;
    location: string;
    distance: string;
    roomType: string;
    bedInfo: string;
    features: string[];
    pricePerNight: number;
    originalPrice?: number;
    nights: number;
    adults: number;
    lat: number;
    lng: number;
}

interface FilterOption {
    label: string;
    count: number;
    checked: boolean;
}

// -----------------------------------------------------------------------------
// Sample Data
// -----------------------------------------------------------------------------

const SAMPLE_HOTELS: Hotel[] = [
    {
        id: "1",
        name: "Crowne Plaza Guangzhou Huadu by IHG",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
        rating: 9.1,
        ratingText: "Wonderful",
        reviewCount: 1083,
        location: "Tai He, Guangzhou",
        distance: "2.1km",
        roomType: "King Guest Room",
        bedInfo: "1 ekstra büyük çift kişilik yatak",
        features: ["Breakfast included", "Free cancellation", "No upfront payment required - Pay on site"],
        pricePerNight: 252,
        nights: 3,
        adults: 1,
        lat: 48.8566,
        lng: 2.3522
    },
    {
        id: "2",
        name: "Four Seasons Hotel Dubai",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop",
        rating: 9.4,
        ratingText: "Exceptional",
        reviewCount: 2341,
        location: "Downtown Dubai",
        distance: "0.5km",
        roomType: "Deluxe Suite",
        bedInfo: "1 king size bed",
        features: ["Breakfast included", "Free cancellation", "Spa access included"],
        pricePerNight: 485,
        originalPrice: 550,
        nights: 3,
        adults: 2,
        lat: 48.8606,
        lng: 2.3376
    },
    {
        id: "3",
        name: "The Ritz-Carlton Tokyo",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
        rating: 9.6,
        ratingText: "Exceptional",
        reviewCount: 1876,
        location: "Roppongi, Tokyo",
        distance: "1.2km",
        roomType: "Club Room",
        bedInfo: "2 queen beds",
        features: ["Breakfast included", "Free cancellation", "Club lounge access"],
        pricePerNight: 620,
        nights: 3,
        adults: 2,
        lat: 48.8738,
        lng: 2.2950
    },
    {
        id: "4",
        name: "Park Hyatt Paris-Vendôme",
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
        rating: 9.3,
        ratingText: "Wonderful",
        reviewCount: 1542,
        location: "Opera District, Paris",
        distance: "0.3km",
        roomType: "Park Deluxe Room",
        bedInfo: "1 king bed",
        features: ["Breakfast included", "Free cancellation", "No upfront payment required"],
        pricePerNight: 890,
        originalPrice: 1050,
        nights: 3,
        adults: 2,
        lat: 48.8690,
        lng: 2.3310
    },
    {
        id: "5",
        name: "Marina Bay Sands Singapore",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
        rating: 9.0,
        ratingText: "Wonderful",
        reviewCount: 4521,
        location: "Marina Bay, Singapore",
        distance: "2.0km",
        roomType: "Deluxe Room",
        bedInfo: "1 king bed",
        features: ["Infinity pool access", "Free cancellation", "City view"],
        pricePerNight: 445,
        nights: 3,
        adults: 2,
        lat: 48.8530,
        lng: 2.3499
    },
    {
        id: "6",
        name: "Burj Al Arab Jumeirah",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop",
        rating: 9.8,
        ratingText: "Exceptional",
        reviewCount: 3241,
        location: "Jumeirah Beach, Dubai",
        distance: "5.0km",
        roomType: "Deluxe Suite",
        bedInfo: "1 king bed",
        features: ["Butler service", "Free cancellation", "Private beach"],
        pricePerNight: 1850,
        nights: 3,
        adults: 2,
        lat: 48.8650,
        lng: 2.3200
    }
];

const POPULAR_FILTERS: FilterOption[] = [
    { label: "No down payment", count: 0, checked: false },
    { label: "Free cancellation", count: 12, checked: false },
    { label: "Airport shuttle", count: 17, checked: false },
    { label: "Breakfast included", count: 17, checked: false },
    { label: "Very good: 8+", count: 17, checked: false },
];

const AVERAGE_SCORE: FilterOption[] = [
    { label: "Excellent: 9+", count: 4, checked: false },
    { label: "Very good: 8+", count: 17, checked: false },
    { label: "Good: 7+", count: 23, checked: false },
    { label: "Enjoyable: 6+", count: 19, checked: false },
];

const MEAL_OPTIONS: FilterOption[] = [
    { label: "Self-catering", count: 4, checked: false },
    { label: "Breakfast included", count: 17, checked: false },
    { label: "All meals included", count: 23, checked: false },
    { label: "Breakfast & dinner included", count: 18, checked: false },
];

const FACILITY_FEATURES: FilterOption[] = [
    { label: "24-hour reception", count: 4, checked: false },
    { label: "Free Wi-Fi internet connection", count: 17, checked: false },
    { label: "Room service", count: 23, checked: false },
    { label: "Fitness center", count: 18, checked: false },
    { label: "Spa and wellness center", count: 23, checked: false },
    { label: "Wheelchair accessible", count: 19, checked: false },
];

const ROOM_AMENITIES: FilterOption[] = [
    { label: "Private bathroom", count: 4, checked: false },
    { label: "Balcony", count: 17, checked: false },
    { label: "Air conditioning", count: 23, checked: false },
    { label: "Sea view", count: 19, checked: false },
    { label: "Bathtub", count: 23, checked: false },
    { label: "Sauna", count: 19, checked: false },
];

const NEIGHBOURHOODS: FilterOption[] = [
    { label: "Tian He", count: 4, checked: false },
    { label: "Huang Pu", count: 17, checked: false },
    { label: "Guangzhou is Merkazi", count: 23, checked: false },
    { label: "Zhujiang New Town", count: 19, checked: false },
    { label: "Yue Xiu", count: 23, checked: false },
    { label: "Hai Zhu", count: 19, checked: false },
];

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const pageContainerStyle: React.CSSProperties = {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    display: "flex",
    flexDirection: "column",
    paddingTop: "72px", // Account for fixed header height
};

const searchBarStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    padding: "16px 0",
};

const searchBarContentStyle: React.CSSProperties = {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
};

const searchInputStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 16px",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    cursor: "pointer",
};

const searchButtonStyle: React.CSSProperties = {
    backgroundColor: "#06b6d4",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "12px 20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const mainContentStyle: React.CSSProperties = {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "24px",
    display: "flex",
    gap: "24px",
    flex: 1,
};

const sidebarStyle: React.CSSProperties = {
    width: "280px",
    flexShrink: 0,
};

const resultsStyle: React.CSSProperties = {
    flex: 1,
};

const filterSectionStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "16px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
};

const filterTitleStyle: React.CSSProperties = {
    fontSize: "15px",
    fontWeight: 600,
    color: "#1f2937",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
};

const checkboxLabelStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 0",
    cursor: "pointer",
    fontSize: "14px",
    color: "#4b5563",
};

const checkboxStyle: React.CSSProperties = {
    width: "18px",
    height: "18px",
    accentColor: "#06b6d4",
    cursor: "pointer",
};

const countBadgeStyle: React.CSSProperties = {
    marginLeft: "auto",
    fontSize: "13px",
    color: "#9ca3af",
};

const hotelCardStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    overflow: "hidden",
    display: "flex",
    marginBottom: "16px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    border: "1px solid #f3f4f6",
};

const hotelImageStyle: React.CSSProperties = {
    width: "220px",
    height: "200px",
    objectFit: "cover",
    flexShrink: 0,
};

const hotelInfoStyle: React.CSSProperties = {
    flex: 1,
    padding: "16px 20px",
    display: "flex",
    flexDirection: "column",
};

const hotelPriceStyle: React.CSSProperties = {
    width: "160px",
    padding: "16px",
    borderLeft: "1px solid #f3f4f6",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
};

const ratingBadgeStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    backgroundColor: "#06b6d4",
    color: "#ffffff",
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: 600,
};

const mapButtonStyle: React.CSSProperties = {
    backgroundColor: "#06b6d4",
    color: "#ffffff",
    border: "none",
    borderRadius: "20px",
    padding: "10px 20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: 500,
    marginBottom: "16px",
};

const selectButtonStyle: React.CSSProperties = {
    backgroundColor: "#06b6d4",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 24px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
    width: "100%",
};

const showMoreStyle: React.CSSProperties = {
    color: "#06b6d4",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    marginTop: "8px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
};

const priceRangeStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "8px",
};

const priceInputStyle: React.CSSProperties = {
    width: "80px",
    padding: "8px 12px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    fontSize: "14px",
};

// Map Modal Styles
const mapOverlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(4px)",
};

const mapContainerStyle: React.CSSProperties = {
    width: "90vw",
    height: "85vh",
    maxWidth: "1400px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
};

const mapHeaderStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 24px",
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "#ffffff",
};

const mapContentStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    position: "relative",
};

const mapViewStyle: React.CSSProperties = {
    flex: 1,
    position: "relative",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
};

const mapSidebarStyle: React.CSSProperties = {
    width: "380px",
    backgroundColor: "#ffffff",
    borderLeft: "1px solid #e5e7eb",
    overflowY: "auto",
};

// -----------------------------------------------------------------------------
// Components
// -----------------------------------------------------------------------------

function FilterSection({
    title,
    options,
    showMore = false
}: {
    title: string;
    options: FilterOption[];
    showMore?: boolean;
}) {
    const [showAll, setShowAll] = useState(false);
    const displayOptions = showAll ? options : options.slice(0, 5);

    return (
        <div style={filterSectionStyle}>
            <div style={filterTitleStyle}>{title}</div>
            {displayOptions.map((option, idx) => (
                <label key={idx} style={checkboxLabelStyle}>
                    <input type="checkbox" style={checkboxStyle} defaultChecked={option.checked} />
                    <span>{option.label}</span>
                    <span style={countBadgeStyle}>{option.count}</span>
                </label>
            ))}
            {showMore && options.length > 5 && (
                <div style={showMoreStyle} onClick={() => setShowAll(!showAll)}>
                    {showAll ? "Show Less" : "Show More"}
                    {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
            )}
        </div>
    );
}

function HotelCard({ hotel, onShowOnMap, onSelect }: { hotel: Hotel; onShowOnMap: (hotel: Hotel) => void; onSelect: (hotel: Hotel) => void }) {
    return (
        <div className="hotel-card" style={hotelCardStyle}>
            {/* Image with Favorite Button */}
            <div className="hotel-card-image-container" style={{ position: "relative" }}>
                <img className="hotel-card-image" src={hotel.image} alt={hotel.name} style={hotelImageStyle} />
                <button className="hotel-card-favorite" style={{
                    position: "absolute",
                    bottom: "12px",
                    right: "12px",
                    width: "36px",
                    height: "36px",
                    backgroundColor: "#ffffff",
                    borderRadius: "50%",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    cursor: "pointer",
                }}>
                    <Star size={18} color="#f97316" />
                </button>
            </div>

            <div className="hotel-card-info" style={hotelInfoStyle}>
                {/* Hotel Name */}
                <h3 className="hotel-name" style={{ fontSize: "18px", fontWeight: 600, color: "#1f2937", marginBottom: "8px" }}>
                    {hotel.name}
                </h3>

                {/* Rating Row */}
                <div className="hotel-rating-row" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <span className="rating-badge" style={ratingBadgeStyle}>{hotel.rating}</span>
                    <span className="hotel-rating-text" style={{ fontSize: "14px", fontWeight: 500, color: "#1f2937" }}>{hotel.ratingText}</span>
                    <span className="hotel-review-count" style={{ fontSize: "13px", color: "#6b7280" }}>({hotel.reviewCount} reviews)</span>
                </div>

                {/* Location Row */}
                <div className="hotel-location" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#06b6d4", flexWrap: "wrap", marginBottom: "4px" }}>
                    <span className="hotel-location-link">{hotel.location}</span>
                    <span>•</span>
                    <button
                        onClick={() => onShowOnMap(hotel)}
                        style={{ color: "#06b6d4", textDecoration: "underline", background: "none", border: "none", cursor: "pointer", fontSize: "13px", padding: 0 }}
                    >
                        Show on map
                    </button>
                </div>

                {/* Distance */}
                <div className="hotel-distance" style={{ fontSize: "13px", color: "#374151", marginBottom: "8px" }}>
                    Center: {hotel.distance}
                </div>

                {/* Room info - hidden on mobile */}
                <div className="hide-on-mobile" style={{ marginTop: "8px" }}>
                    <p style={{ fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "4px" }}>{hotel.roomType}</p>
                    <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "12px" }}>{hotel.bedInfo}</p>
                </div>

                {/* Features - hidden on mobile */}
                <div className="hotel-features" style={{ marginTop: "auto" }}>
                    {hotel.features.map((feature, idx) => (
                        <div key={idx} className="hotel-feature" style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                            <Check size={14} color="#10b981" />
                            <span style={{ fontSize: "13px", color: "#4b5563" }}>{feature}</span>
                        </div>
                    ))}
                </div>

                {/* Mobile-only Price Row (integrated with info) */}
                <div className="hotel-info-price-row show-on-mobile" style={{ display: "none" }}>
                    <div></div>
                    <div style={{ textAlign: "right" }}>
                        <div className="hotel-nights-info" style={{ fontSize: "12px", color: "#6b7280" }}>
                            {hotel.nights} nights, {hotel.adults} adult{hotel.adults > 1 ? "s" : ""}
                        </div>
                        <div className="hotel-nightly-price" style={{ fontSize: "12px", color: "#6b7280" }}>
                            ${Math.round(hotel.pricePerNight / hotel.nights)} nightly
                        </div>
                        <div className="hotel-total-price" style={{ fontSize: "22px", fontWeight: 700, color: "#1f2937" }}>
                            ${hotel.pricePerNight}
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Price Section */}
            <div className="hotel-card-price hide-on-mobile" style={hotelPriceStyle}>
                <div style={{ textAlign: "right" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <div>
                            <div style={{ fontSize: "13px", fontWeight: 500, color: "#1f2937" }}>{hotel.ratingText}</div>
                            <div style={{ fontSize: "12px", color: "#6b7280" }}>{hotel.reviewCount} reviews</div>
                        </div>
                        <span className="rating-badge" style={ratingBadgeStyle}>{hotel.rating}</span>
                    </div>
                </div>

                <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                        {hotel.nights} nights, {hotel.adults} adult{hotel.adults > 1 ? "s" : ""}
                    </div>
                    {hotel.originalPrice && (
                        <div style={{ fontSize: "13px", color: "#9ca3af", textDecoration: "line-through" }}>
                            ${hotel.originalPrice}
                        </div>
                    )}
                    <div style={{ fontSize: "24px", fontWeight: 600, color: "#1f2937", marginBottom: "8px" }}>
                        ${hotel.pricePerNight}
                    </div>
                    <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "12px" }}>
                        + ${Math.round(hotel.pricePerNight * 0.15)} taxes and fees
                    </div>
                    <button className="select-button" style={selectButtonStyle} onClick={() => onSelect(hotel)}>Select</button>
                </div>
            </div>

            {/* Mobile Select Button */}
            <button className="select-button show-on-mobile" style={{ ...selectButtonStyle, display: "none", width: "100%" }} onClick={() => onSelect(hotel)}>
                Select
            </button>
        </div>
    );
}

function BudgetFilter() {
    return (
        <div style={filterSectionStyle}>
            <div style={filterTitleStyle}>Budget (per night)</div>
            <div style={priceRangeStyle}>
                <span style={{ fontSize: "14px", color: "#6b7280" }}>$</span>
                <input type="number" placeholder="0" style={priceInputStyle} defaultValue="0" />
                <span style={{ fontSize: "14px", color: "#6b7280" }}>-</span>
                <input type="number" placeholder="$200+" style={priceInputStyle} defaultValue="200" />
            </div>
            <div style={{ marginTop: "16px" }}>
                <input
                    type="range"
                    min="0"
                    max="500"
                    defaultValue="200"
                    style={{ width: "100%", accentColor: "#06b6d4" }}
                />
            </div>
        </div>
    );
}

function BedroomBathroomFilter() {
    const [bedrooms, setBedrooms] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);

    return (
        <div style={filterSectionStyle}>
            <div style={filterTitleStyle}>Bedrooms and bathrooms</div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ fontSize: "14px", color: "#4b5563" }}>Bedrooms</span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button
                        onClick={() => setBedrooms(Math.max(0, bedrooms - 1))}
                        style={{ width: "28px", height: "28px", border: "1px solid #e5e7eb", borderRadius: "6px", background: "#fff", cursor: "pointer" }}
                    >
                        -
                    </button>
                    <span style={{ width: "20px", textAlign: "center", fontSize: "14px" }}>{bedrooms}</span>
                    <button
                        onClick={() => setBedrooms(bedrooms + 1)}
                        style={{ width: "28px", height: "28px", border: "1px solid #e5e7eb", borderRadius: "6px", background: "#fff", cursor: "pointer" }}
                    >
                        +
                    </button>
                </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "14px", color: "#4b5563" }}>Bathrooms</span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button
                        onClick={() => setBathrooms(Math.max(0, bathrooms - 1))}
                        style={{ width: "28px", height: "28px", border: "1px solid #e5e7eb", borderRadius: "6px", background: "#fff", cursor: "pointer" }}
                    >
                        -
                    </button>
                    <span style={{ width: "20px", textAlign: "center", fontSize: "14px" }}>{bathrooms}</span>
                    <button
                        onClick={() => setBathrooms(bathrooms + 1)}
                        style={{ width: "28px", height: "28px", border: "1px solid #e5e7eb", borderRadius: "6px", background: "#fff", cursor: "pointer" }}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}

// Map Modal Component
function MapModal({
    isOpen,
    onClose,
    hotels,
    selectedHotel
}: {
    isOpen: boolean;
    onClose: () => void;
    hotels: Hotel[];
    selectedHotel: Hotel | null;
}) {
    const [activeHotel, setActiveHotel] = useState<Hotel | null>(selectedHotel);

    if (!isOpen) return null;

    return (
        <div style={mapOverlayStyle} onClick={onClose}>
            <div style={mapContainerStyle} onClick={(e) => e.stopPropagation()}>
                {/* Map Header */}
                <div style={mapHeaderStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <Map size={24} color="#06b6d4" />
                        <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#1f2937", margin: 0 }}>
                            Hotels on Map
                        </h2>
                        <span style={{ fontSize: "14px", color: "#6b7280" }}>
                            {hotels.length} properties
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            width: "40px",
                            height: "40px",
                            border: "none",
                            backgroundColor: "#f3f4f6",
                            borderRadius: "50%",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <X size={20} color="#6b7280" />
                    </button>
                </div>

                {/* Map Content */}
                <div style={mapContentStyle}>
                    {/* Map View */}
                    <div style={mapViewStyle}>
                        {/* Interactive Map Visualization */}
                        <div style={{
                            position: "absolute",
                            inset: 0,
                            background: `
                linear-gradient(135deg, #e8f4f8 0%, #d1e7dd 50%, #e8f4f8 100%)
              `,
                            overflow: "hidden",
                        }}>
                            {/* Map Grid Lines */}
                            <svg width="100%" height="100%" style={{ position: "absolute", opacity: 0.3 }}>
                                <defs>
                                    <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#grid)" />
                            </svg>

                            {/* Roads/Streets */}
                            <svg width="100%" height="100%" style={{ position: "absolute" }}>
                                <line x1="0" y1="200" x2="100%" y2="200" stroke="#ffffff" strokeWidth="8" />
                                <line x1="0" y1="400" x2="100%" y2="400" stroke="#ffffff" strokeWidth="6" />
                                <line x1="300" y1="0" x2="300" y2="100%" stroke="#ffffff" strokeWidth="6" />
                                <line x1="600" y1="0" x2="600" y2="100%" stroke="#ffffff" strokeWidth="8" />
                            </svg>

                            {/* Hotel Markers */}
                            {hotels.map((hotel, index) => {
                                const x = 100 + (index % 3) * 200 + Math.random() * 50;
                                const y = 100 + Math.floor(index / 3) * 180 + Math.random() * 30;
                                const isActive = activeHotel?.id === hotel.id;

                                return (
                                    <div
                                        key={hotel.id}
                                        onClick={() => setActiveHotel(hotel)}
                                        style={{
                                            position: "absolute",
                                            left: `${x}px`,
                                            top: `${y}px`,
                                            transform: "translate(-50%, -100%)",
                                            cursor: "pointer",
                                            zIndex: isActive ? 10 : 1,
                                            transition: "all 0.2s ease",
                                        }}
                                    >
                                        {/* Price Bubble */}
                                        <div style={{
                                            backgroundColor: isActive ? "#06b6d4" : "#ffffff",
                                            color: isActive ? "#ffffff" : "#1f2937",
                                            padding: "8px 12px",
                                            borderRadius: "8px",
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            boxShadow: isActive
                                                ? "0 4px 20px rgba(6, 182, 212, 0.4)"
                                                : "0 2px 8px rgba(0, 0, 0, 0.15)",
                                            border: isActive ? "2px solid #06b6d4" : "2px solid #e5e7eb",
                                            whiteSpace: "nowrap",
                                            transform: isActive ? "scale(1.1)" : "scale(1)",
                                        }}>
                                            ${hotel.pricePerNight}
                                        </div>
                                        {/* Pointer */}
                                        <div style={{
                                            width: 0,
                                            height: 0,
                                            borderLeft: "8px solid transparent",
                                            borderRight: "8px solid transparent",
                                            borderTop: `8px solid ${isActive ? "#06b6d4" : "#ffffff"}`,
                                            margin: "0 auto",
                                        }} />
                                    </div>
                                );
                            })}

                            {/* Water/Park Areas */}
                            <div style={{
                                position: "absolute",
                                bottom: "50px",
                                right: "50px",
                                width: "150px",
                                height: "100px",
                                backgroundColor: "rgba(59, 130, 246, 0.2)",
                                borderRadius: "50%",
                                border: "2px solid rgba(59, 130, 246, 0.3)",
                            }} />

                            <div style={{
                                position: "absolute",
                                top: "80px",
                                left: "80px",
                                width: "100px",
                                height: "80px",
                                backgroundColor: "rgba(34, 197, 94, 0.2)",
                                borderRadius: "16px",
                                border: "2px solid rgba(34, 197, 94, 0.3)",
                            }} />
                        </div>

                        {/* Map Controls */}
                        <div style={{
                            position: "absolute",
                            bottom: "24px",
                            left: "24px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                        }}>
                            <button style={{
                                width: "40px",
                                height: "40px",
                                backgroundColor: "#ffffff",
                                border: "none",
                                borderRadius: "8px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                cursor: "pointer",
                                fontSize: "20px",
                            }}>+</button>
                            <button style={{
                                width: "40px",
                                height: "40px",
                                backgroundColor: "#ffffff",
                                border: "none",
                                borderRadius: "8px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                cursor: "pointer",
                                fontSize: "20px",
                            }}>−</button>
                            <button style={{
                                width: "40px",
                                height: "40px",
                                backgroundColor: "#ffffff",
                                border: "none",
                                borderRadius: "8px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <Navigation size={18} color="#6b7280" />
                            </button>
                        </div>
                    </div>

                    {/* Map Sidebar - Hotel List */}
                    <div style={mapSidebarStyle}>
                        <div style={{ padding: "16px", borderBottom: "1px solid #e5e7eb" }}>
                            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937", margin: 0 }}>
                                Available Hotels
                            </h3>
                        </div>

                        {hotels.map((hotel) => (
                            <div
                                key={hotel.id}
                                onClick={() => setActiveHotel(hotel)}
                                style={{
                                    padding: "16px",
                                    borderBottom: "1px solid #f3f4f6",
                                    cursor: "pointer",
                                    backgroundColor: activeHotel?.id === hotel.id ? "#f0fdfa" : "#ffffff",
                                    transition: "background-color 0.2s",
                                }}
                            >
                                <div style={{ display: "flex", gap: "12px" }}>
                                    <img
                                        src={hotel.image}
                                        alt={hotel.name}
                                        style={{
                                            width: "80px",
                                            height: "60px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <h4 style={{
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            color: "#1f2937",
                                            margin: "0 0 4px 0",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}>
                                            {hotel.name}
                                        </h4>
                                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                                            <span style={{
                                                backgroundColor: "#06b6d4",
                                                color: "#fff",
                                                padding: "2px 6px",
                                                borderRadius: "4px",
                                                fontSize: "11px",
                                                fontWeight: 600,
                                            }}>
                                                {hotel.rating}
                                            </span>
                                            <span style={{ fontSize: "12px", color: "#6b7280" }}>
                                                {hotel.ratingText}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937" }}>
                                            ${hotel.pricePerNight}
                                            <span style={{ fontSize: "12px", fontWeight: 400, color: "#6b7280" }}> / night</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// -----------------------------------------------------------------------------
// Main Page Component
// -----------------------------------------------------------------------------

function HotelSearchContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const location = searchParams.get("location") || "Guangzhou, China (CAN-Bayun Intl.)";
    const checkIn = searchParams.get("checkIn") || "Check-in";
    const checkOut = searchParams.get("checkOut") || "Check-out";

    const [hotels] = useState<Hotel[]>(SAMPLE_HOTELS);
    const [resultsCount] = useState(470);
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
    const [showFilters, setShowFilters] = useState(false);

    const handleShowOnMap = (hotel: Hotel) => {
        setSelectedHotel(hotel);
        setIsMapOpen(true);
    };

    const handleOpenMap = () => {
        setSelectedHotel(null);
        setIsMapOpen(true);
    };

    const handleSelectHotel = (hotel: Hotel) => {
        const params = new URLSearchParams();
        if (location) params.set("location", location);
        if (checkIn) params.set("checkIn", checkIn);
        if (checkOut) params.set("checkOut", checkOut);
        router.push(`/hotels/${hotel.id}?${params.toString()}`);
    };

    return (
        <div className="hotels-page" style={pageContainerStyle}>
            {/* Main Header */}
            <Header />

            {/* Search Bar */}
            <div className="search-bar" style={searchBarStyle}>
                <div className="search-bar-content" style={searchBarContentStyle}>
                    {/* Desktop Search Inputs */}
                    <div className="search-input-wrapper" style={searchInputStyle}>
                        <MapPin size={18} color="#6b7280" />
                        <span className="search-input-text">{location}</span>
                    </div>

                    <div className="search-input-wrapper" style={searchInputStyle}>
                        <CalendarDays size={18} color="#6b7280" />
                        <span className="search-input-text">{checkIn}</span>
                    </div>

                    <div className="search-input-wrapper" style={searchInputStyle}>
                        <CalendarDays size={18} color="#6b7280" />
                        <span className="search-input-text">{checkOut}</span>
                    </div>

                    <button className="search-button" style={searchButtonStyle}>
                        <Search size={20} />
                    </button>

                    {/* Mobile Compact Search */}
                    <div className="mobile-search-compact">
                        <div className="mobile-search-info">
                            <div className="mobile-search-destination">{location.split(",")[0]}</div>
                            <div className="mobile-search-details">
                                {checkIn !== "Check-in" ? checkIn : "Select dates"} · 1 traveler
                            </div>
                        </div>
                        <div className="mobile-search-edit">
                            <Pencil size={18} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="main-content" style={mainContentStyle}>
                {/* Sidebar Filters */}
                <aside className="sidebar" style={sidebarStyle}>
                    <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "16px" }}>
                        {resultsCount} opportunities found
                    </div>

                    {/* Map Preview Card - hidden on mobile via CSS */}
                    <div className="map-preview-container">
                        <MapPreviewCard
                            hotels={hotels}
                            onViewFullMap={handleOpenMap}
                            centerLat={48.8566}
                            centerLng={2.3522}
                        />
                    </div>

                    {/* Mobile Filter Toggle */}
                    <button
                        className="mobile-filter-toggle"
                        onClick={() => setShowFilters(!showFilters)}
                        style={{ display: "none" }}
                    >
                        <ChevronDown size={18} style={{ transform: showFilters ? "rotate(180deg)" : "none" }} />
                        {showFilters ? "Hide Filters" : "Show Filters"}
                    </button>

                    {/* Filter Sections */}
                    <div className={`sidebar-filters ${showFilters ? "show" : ""}`}>
                        <div className="filter-section" style={{ ...filterSectionStyle, padding: "16px 20px" }}>
                            <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#1f2937", marginBottom: "0" }}>Filter By</h2>
                        </div>

                        <FilterSection title="Popular filters" options={POPULAR_FILTERS} showMore />
                        <BudgetFilter />
                        <FilterSection title="Average score" options={AVERAGE_SCORE} showMore />
                        <FilterSection title="Meal" options={MEAL_OPTIONS} showMore />
                        <FilterSection title="Facility features" options={FACILITY_FEATURES} showMore />
                        <FilterSection title="Room amenities" options={ROOM_AMENITIES} showMore />
                        <BedroomBathroomFilter />
                        <FilterSection title="Neighbourhood" options={NEIGHBOURHOODS} showMore />

                        <div style={showMoreStyle}>
                            Show More
                            <ChevronDown size={16} />
                        </div>
                    </div>
                </aside>

                {/* Results */}
                <section className="results-section" style={resultsStyle}>
                    {/* Results Header */}
                    <div className="results-header">
                        <span className="results-count">{resultsCount} hotels found</span>
                        <select className="sort-dropdown">
                            <option>Recommended</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Rating</option>
                        </select>
                    </div>

                    {hotels.map((hotel) => (
                        <HotelCard
                            key={hotel.id}
                            hotel={hotel}
                            onShowOnMap={handleShowOnMap}
                            onSelect={handleSelectHotel}
                        />
                    ))}

                    <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
                        <button
                            style={{
                                backgroundColor: "#374151",
                                color: "#ffffff",
                                border: "none",
                                borderRadius: "8px",
                                padding: "12px 32px",
                                cursor: "pointer",
                                fontSize: "14px",
                                fontWeight: 500,
                            }}
                        >
                            Show more result
                        </button>
                    </div>
                </section>
            </main>

            {/* Mobile Floating Map Button */}
            <button
                className="mobile-map-button"
                onClick={handleOpenMap}
            >
                <Map size={18} />
                Show Map
            </button>

            {/* Footer */}
            <Footer />

            {/* Map Modal */}
            <HotelMapModal
                isOpen={isMapOpen}
                onClose={() => setIsMapOpen(false)}
                hotels={hotels}
                selectedHotel={selectedHotel}
                centerLat={48.8566}
                centerLng={2.3522}
            />
        </div>
    );
}

export default function HotelSearchPage() {
    return (
        <Suspense fallback={<div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>}>
            <HotelSearchContent />
        </Suspense>
    );
}
