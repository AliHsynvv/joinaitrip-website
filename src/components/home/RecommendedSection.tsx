"use client";

// =============================================================================
// RECOMMENDED SECTION - Hotel recommendations carousel
// =============================================================================

import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart, Plane } from "lucide-react";
import { useCarousel } from "@/hooks/useCarousel";
import { RECOMMENDED_CONTENT, RECOMMENDED_HOTELS } from "@/constants/sections.constants";
import {
  sectionContainerStyle,
  sectionInnerStyle,
  sectionTitleStyle,
  navButtonStyle,
  hotelCardStyle,
  hotelCardImageStyle,
  favoriteButtonStyle,
  ratingBadgeStyle,
  originalPriceStyle,
  currentPriceStyle,
  sectionColors,
  sectionTypography,
} from "@/styles/sections.styles";
import type { RecommendedHotel } from "@/types/sections.types";

// -----------------------------------------------------------------------------
// Utility Functions
// -----------------------------------------------------------------------------

const formatPrice = (num: number): string => {
  return num.toLocaleString("en-US");
};

// -----------------------------------------------------------------------------
// Hotel Card Component
// -----------------------------------------------------------------------------

interface HotelCardProps {
  hotel: RecommendedHotel;
  onClick?: (hotel: RecommendedHotel) => void;
  onFavorite?: (hotelId: number) => void;
}

function HotelCard({ hotel, onClick, onFavorite }: HotelCardProps) {
  return (
    <div style={hotelCardStyle} onClick={() => onClick?.(hotel)}>
      {/* Image */}
      <div style={hotelCardImageStyle}>
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
        />
        <button
          style={favoriteButtonStyle}
          onClick={(e) => {
            e.stopPropagation();
            onFavorite?.(hotel.id);
          }}
          aria-label="Add to favorites"
        >
          <Heart size={18} color="#ef4444" />
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: "16px" }}>
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: sectionColors.textPrimary,
            marginBottom: "4px",
            fontFamily: sectionTypography.fontFamily,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {hotel.name}
        </h3>
        <p style={{ fontSize: "13px", color: sectionColors.textMuted, marginBottom: "12px" }}>
          {hotel.location}
        </p>

        {/* Rating */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <div style={ratingBadgeStyle}>{hotel.rating}</div>
          <span style={{ fontSize: "13px", fontWeight: 600, color: sectionColors.textPrimary }}>
            {hotel.ratingText}
          </span>
          <span style={{ fontSize: "12px", color: sectionColors.textMuted }}>
            ({hotel.reviews})
          </span>
        </div>

        {/* Flight Route */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <Plane size={16} color={sectionColors.textLight} />
          <span style={{ fontSize: "12px", color: sectionColors.textSecondary }}>
            {hotel.flightRoute}
          </span>
        </div>

        {/* Pricing */}
        <div style={{ textAlign: "right" }}>
          {hotel.originalPrice && (
            <span style={originalPriceStyle}>$ {formatPrice(hotel.originalPrice)}</span>
          )}
          <span style={currentPriceStyle}>$ {formatPrice(hotel.price)}</span>
          <div style={{ fontSize: "13px", color: sectionColors.textLight, marginTop: "2px" }}>
            $ {hotel.nightlyPrice} nightly
          </div>
          <div style={{ fontSize: "13px", color: sectionColors.textLight }}>
            $ {hotel.totalPrice} total
          </div>
          <div style={{ fontSize: "12px", color: sectionColors.textLight, marginTop: "4px" }}>
            Total with taxes and fees
          </div>
          <div style={{ fontSize: "13px", color: sectionColors.textMuted, marginTop: "4px" }}>
            {hotel.dateRange}
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function RecommendedSection() {
  const { containerRef, scrollLeft, scrollRight } = useCarousel({ scrollAmount: 320 });

  const handleHotelClick = (hotel: RecommendedHotel) => {
    // TODO: Navigate to hotel details page
    console.log("Hotel clicked:", hotel);
  };

  const handleFavorite = (hotelId: number) => {
    // TODO: Add to favorites via API
    console.log("Toggle favorite:", hotelId);
  };

  return (
    <section style={sectionContainerStyle}>
      <div style={sectionInnerStyle}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "32px",
          }}
        >
          <h2 style={sectionTitleStyle}>{RECOMMENDED_CONTENT.title}</h2>

          {/* Navigation Buttons */}
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={scrollLeft}
              style={navButtonStyle}
              aria-label="Scroll left"
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollRight}
              style={navButtonStyle}
              aria-label="Scroll right"
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={containerRef}
          className="hide-scrollbar"
          style={{
            display: "flex",
            gap: "24px",
            overflowX: "auto",
            scrollBehavior: "smooth",
            paddingBottom: "8px",
          }}
        >
          {RECOMMENDED_HOTELS.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onClick={handleHotelClick}
              onFavorite={handleFavorite}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecommendedSection;
