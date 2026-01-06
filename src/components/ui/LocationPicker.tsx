"use client";

// =============================================================================
// LOCATION PICKER COMPONENT
// Modern search popup for countries, cities, and hotels
// =============================================================================

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Search, MapPin, Building2, Globe2, History, TrendingUp, X } from "lucide-react";
import { colors, borderRadius, typography, transitions } from "@/styles/hero.styles";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface Location {
    id: string;
    name: string;
    type: "country" | "city" | "hotel";
    country?: string;
    city?: string;
    rating?: number;
    imageUrl?: string;
}

interface LocationPickerProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (location: Location) => void;
    placeholder?: string;
}

// -----------------------------------------------------------------------------
// Sample Data (Replace with API calls in production)
// -----------------------------------------------------------------------------

const POPULAR_DESTINATIONS: Location[] = [
    { id: "1", name: "Paris", type: "city", country: "France" },
    { id: "2", name: "London", type: "city", country: "United Kingdom" },
    { id: "3", name: "Dubai", type: "city", country: "United Arab Emirates" },
    { id: "4", name: "New York", type: "city", country: "United States" },
    { id: "5", name: "Tokyo", type: "city", country: "Japan" },
    { id: "6", name: "Barcelona", type: "city", country: "Spain" },
];

const COUNTRIES: Location[] = [
    { id: "c1", name: "France", type: "country" },
    { id: "c2", name: "United Kingdom", type: "country" },
    { id: "c3", name: "United Arab Emirates", type: "country" },
    { id: "c4", name: "United States", type: "country" },
    { id: "c5", name: "Japan", type: "country" },
    { id: "c6", name: "Spain", type: "country" },
    { id: "c7", name: "Italy", type: "country" },
    { id: "c8", name: "Germany", type: "country" },
    { id: "c9", name: "Turkey", type: "country" },
    { id: "c10", name: "Azerbaijan", type: "country" },
];

const CITIES: Location[] = [
    { id: "ct1", name: "Paris", type: "city", country: "France" },
    { id: "ct2", name: "Nice", type: "city", country: "France" },
    { id: "ct3", name: "London", type: "city", country: "United Kingdom" },
    { id: "ct4", name: "Manchester", type: "city", country: "United Kingdom" },
    { id: "ct5", name: "Dubai", type: "city", country: "United Arab Emirates" },
    { id: "ct6", name: "Abu Dhabi", type: "city", country: "United Arab Emirates" },
    { id: "ct7", name: "New York", type: "city", country: "United States" },
    { id: "ct8", name: "Los Angeles", type: "city", country: "United States" },
    { id: "ct9", name: "Tokyo", type: "city", country: "Japan" },
    { id: "ct10", name: "Osaka", type: "city", country: "Japan" },
    { id: "ct11", name: "Barcelona", type: "city", country: "Spain" },
    { id: "ct12", name: "Madrid", type: "city", country: "Spain" },
    { id: "ct13", name: "Rome", type: "city", country: "Italy" },
    { id: "ct14", name: "Milan", type: "city", country: "Italy" },
    { id: "ct15", name: "Berlin", type: "city", country: "Germany" },
    { id: "ct16", name: "Munich", type: "city", country: "Germany" },
    { id: "ct17", name: "Istanbul", type: "city", country: "Turkey" },
    { id: "ct18", name: "Antalya", type: "city", country: "Turkey" },
    { id: "ct19", name: "Baku", type: "city", country: "Azerbaijan" },
    { id: "ct20", name: "Gabala", type: "city", country: "Azerbaijan" },
];

const HOTELS: Location[] = [
    { id: "h1", name: "The Ritz Paris", type: "hotel", city: "Paris", country: "France", rating: 5 },
    { id: "h2", name: "Four Seasons George V", type: "hotel", city: "Paris", country: "France", rating: 5 },
    { id: "h3", name: "The Savoy", type: "hotel", city: "London", country: "United Kingdom", rating: 5 },
    { id: "h4", name: "Claridge's", type: "hotel", city: "London", country: "United Kingdom", rating: 5 },
    { id: "h5", name: "Burj Al Arab", type: "hotel", city: "Dubai", country: "United Arab Emirates", rating: 5 },
    { id: "h6", name: "Atlantis The Palm", type: "hotel", city: "Dubai", country: "United Arab Emirates", rating: 5 },
    { id: "h7", name: "The Plaza Hotel", type: "hotel", city: "New York", country: "United States", rating: 5 },
    { id: "h8", name: "Park Hyatt Tokyo", type: "hotel", city: "Tokyo", country: "Japan", rating: 5 },
    { id: "h9", name: "Hotel Arts Barcelona", type: "hotel", city: "Barcelona", country: "Spain", rating: 5 },
    { id: "h10", name: "Four Seasons Baku", type: "hotel", city: "Baku", country: "Azerbaijan", rating: 5 },
];

const ALL_LOCATIONS = [...COUNTRIES, ...CITIES, ...HOTELS];

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(4px)",
};

const containerStyle: React.CSSProperties = {
    backgroundColor: colors.bgWhite,
    borderRadius: borderRadius.xl,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    width: "100%",
    maxWidth: "600px",
    maxHeight: "80vh",
    overflow: "hidden",
    animation: "slideUp 0.3s ease-out",
};

const headerStyle: React.CSSProperties = {
    padding: "20px 24px",
    borderBottom: "1px solid #f3f4f6",
    position: "relative",
};

const searchContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    backgroundColor: "#f9fafb",
    borderRadius: borderRadius.lg,
    padding: "14px 18px",
    border: "2px solid transparent",
    transition: `all ${transitions.fast}`,
};

const searchInputStyle: React.CSSProperties = {
    flex: 1,
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontSize: typography.sizes.lg,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
};

const closeButtonStyle: React.CSSProperties = {
    position: "absolute",
    top: "20px",
    right: "24px",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    backgroundColor: "#f3f4f6",
    borderRadius: "50%",
    cursor: "pointer",
    color: colors.textSecondary,
    transition: `all ${transitions.fast}`,
};

const contentStyle: React.CSSProperties = {
    padding: "16px 0",
    overflowY: "auto",
    maxHeight: "calc(80vh - 100px)",
};

const sectionStyle: React.CSSProperties = {
    marginBottom: "24px",
};

const sectionTitleStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "0 24px",
    marginBottom: "12px",
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
};

const locationItemStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "12px 24px",
    cursor: "pointer",
    transition: `background-color ${transitions.fast}`,
};

const locationIconContainerStyle = (type: "country" | "city" | "hotel"): React.CSSProperties => ({
    width: "44px",
    height: "44px",
    borderRadius: type === "hotel" ? borderRadius.md : "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: type === "country" ? "#dbeafe" : type === "city" ? "#fef3c7" : "#f0fdf4",
    color: type === "country" ? "#2563eb" : type === "city" ? "#d97706" : "#16a34a",
    flexShrink: 0,
});

const locationInfoStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
};

const locationNameStyle: React.CSSProperties = {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
    marginBottom: "2px",
};

const locationSubtitleStyle: React.CSSProperties = {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
};

const typeTagStyle = (type: "country" | "city" | "hotel"): React.CSSProperties => ({
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    backgroundColor: type === "country" ? "#dbeafe" : type === "city" ? "#fef3c7" : "#f0fdf4",
    color: type === "country" ? "#1d4ed8" : type === "city" ? "#b45309" : "#15803d",
    textTransform: "capitalize",
});

const ratingStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "2px",
    color: "#fbbf24",
    fontSize: typography.sizes.sm,
};

const noResultsStyle: React.CSSProperties = {
    padding: "40px 24px",
    textAlign: "center",
    color: colors.textSecondary,
};

// -----------------------------------------------------------------------------
// Helper Components
// -----------------------------------------------------------------------------

function getLocationIcon(type: "country" | "city" | "hotel") {
    switch (type) {
        case "country":
            return Globe2;
        case "city":
            return MapPin;
        case "hotel":
            return Building2;
    }
}

function LocationItem({
    location,
    onSelect
}: {
    location: Location;
    onSelect: (location: Location) => void;
}) {
    const Icon = getLocationIcon(location.type);

    return (
        <div
            style={locationItemStyle}
            onClick={() => onSelect(location)}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f9fafb";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
            }}
        >
            <div style={locationIconContainerStyle(location.type)}>
                <Icon size={20} />
            </div>

            <div style={locationInfoStyle}>
                <div style={locationNameStyle}>{location.name}</div>
                <div style={locationSubtitleStyle}>
                    {location.type === "hotel" && location.city && `${location.city}, `}
                    {location.country || ""}
                </div>
            </div>

            {location.type === "hotel" && location.rating && (
                <div style={ratingStyle}>
                    {Array.from({ length: location.rating }).map((_, i) => (
                        <span key={i}>★</span>
                    ))}
                </div>
            )}

            <span style={typeTagStyle(location.type)}>{location.type}</span>
        </div>
    );
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function LocationPicker({
    isOpen,
    onClose,
    onSelect,
    placeholder = "Search for a destination...",
}: LocationPickerProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Filter locations based on search query
    const filteredLocations = useMemo(() => {
        if (!searchQuery.trim()) return [];

        const query = searchQuery.toLowerCase();
        return ALL_LOCATIONS.filter((location) => {
            const nameMatch = location.name.toLowerCase().includes(query);
            const countryMatch = location.country?.toLowerCase().includes(query);
            const cityMatch = location.city?.toLowerCase().includes(query);
            return nameMatch || countryMatch || cityMatch;
        }).slice(0, 10);
    }, [searchQuery]);

    // Group filtered results by type
    const groupedResults = useMemo(() => {
        const countries = filteredLocations.filter((l) => l.type === "country");
        const cities = filteredLocations.filter((l) => l.type === "city");
        const hotels = filteredLocations.filter((l) => l.type === "hotel");
        return { countries, cities, hotels };
    }, [filteredLocations]);

    const hasResults = filteredLocations.length > 0;
    const showDefaultContent = !searchQuery.trim();

    // Handle selection
    const handleSelect = useCallback((location: Location) => {
        onSelect(location);
        setSearchQuery("");
        onClose();
    }, [onSelect, onClose]);

    // Focus input on open
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div style={overlayStyle}>
            <div ref={containerRef} style={containerStyle}>
                {/* Header with Search */}
                <div style={headerStyle}>
                    <div
                        style={{
                            ...searchContainerStyle,
                            borderColor: isFocused ? colors.primary : "transparent",
                            backgroundColor: isFocused ? "#fff" : "#f9fafb",
                        }}
                    >
                        <Search size={20} color={colors.textSecondary} />
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder={placeholder}
                            style={searchInputStyle}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                style={{
                                    border: "none",
                                    background: "none",
                                    cursor: "pointer",
                                    padding: "4px",
                                    display: "flex",
                                    color: colors.textSecondary,
                                }}
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>

                    <button
                        style={closeButtonStyle}
                        onClick={onClose}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#e5e7eb";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#f3f4f6";
                        }}
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Content */}
                <div style={contentStyle}>
                    {showDefaultContent ? (
                        <>
                            {/* Popular Destinations */}
                            <div style={sectionStyle}>
                                <div style={sectionTitleStyle}>
                                    <TrendingUp size={14} />
                                    Popular Destinations
                                </div>
                                {POPULAR_DESTINATIONS.map((location) => (
                                    <LocationItem
                                        key={location.id}
                                        location={location}
                                        onSelect={handleSelect}
                                    />
                                ))}
                            </div>

                            {/* Countries */}
                            <div style={sectionStyle}>
                                <div style={sectionTitleStyle}>
                                    <Globe2 size={14} />
                                    Countries
                                </div>
                                {COUNTRIES.slice(0, 5).map((location) => (
                                    <LocationItem
                                        key={location.id}
                                        location={location}
                                        onSelect={handleSelect}
                                    />
                                ))}
                            </div>
                        </>
                    ) : hasResults ? (
                        <>
                            {/* Countries Results */}
                            {groupedResults.countries.length > 0 && (
                                <div style={sectionStyle}>
                                    <div style={sectionTitleStyle}>
                                        <Globe2 size={14} />
                                        Countries
                                    </div>
                                    {groupedResults.countries.map((location) => (
                                        <LocationItem
                                            key={location.id}
                                            location={location}
                                            onSelect={handleSelect}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Cities Results */}
                            {groupedResults.cities.length > 0 && (
                                <div style={sectionStyle}>
                                    <div style={sectionTitleStyle}>
                                        <MapPin size={14} />
                                        Cities
                                    </div>
                                    {groupedResults.cities.map((location) => (
                                        <LocationItem
                                            key={location.id}
                                            location={location}
                                            onSelect={handleSelect}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Hotels Results */}
                            {groupedResults.hotels.length > 0 && (
                                <div style={sectionStyle}>
                                    <div style={sectionTitleStyle}>
                                        <Building2 size={14} />
                                        Hotels
                                    </div>
                                    {groupedResults.hotels.map((location) => (
                                        <LocationItem
                                            key={location.id}
                                            location={location}
                                            onSelect={handleSelect}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div style={noResultsStyle}>
                            <MapPin size={48} color="#d1d5db" style={{ marginBottom: "16px" }} />
                            <p style={{ fontSize: typography.sizes.lg, marginBottom: "4px" }}>
                                No results found
                            </p>
                            <p style={{ fontSize: typography.sizes.sm }}>
                                Try searching for a different destination
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
        </div>
    );
}

export default LocationPicker;
