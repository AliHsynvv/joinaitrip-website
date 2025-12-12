"use client";

// =============================================================================
// POPULAR SECTION - Popular places carousel with promo banner
// =============================================================================

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCarousel } from "@/hooks/useCarousel";
import { POPULAR_CONTENT, POPULAR_PLACES, PROMO_BANNER } from "@/constants/sections.constants";
import {
  sectionContainerStyle,
  sectionInnerStyle,
  sectionTitleStyle,
  navButtonStyle,
  placeCardStyle,
  placeCardImageStyle,
  placeCardTitleStyle,
  priceStyle,
  priceNoteStyle,
  promoButtonStyle,
  sectionColors,
  sectionTypography,
} from "@/styles/sections.styles";
import type { PopularPlace, PromoBanner } from "@/types/sections.types";

// -----------------------------------------------------------------------------
// Utility Functions
// -----------------------------------------------------------------------------

const formatPrice = (num: number): string => {
  return num.toLocaleString("en-US");
};

// -----------------------------------------------------------------------------
// Place Card Component
// -----------------------------------------------------------------------------

interface PlaceCardProps {
  place: PopularPlace;
  onClick?: (place: PopularPlace) => void;
}

function PlaceCard({ place, onClick }: PlaceCardProps) {
  return (
    <div style={placeCardStyle} onClick={() => onClick?.(place)}>
      <div style={placeCardImageStyle}>
        <Image
          src={place.image}
          alt={place.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div style={{ padding: "16px" }}>
        <h3 style={placeCardTitleStyle}>{place.name}</h3>
        <p style={{ fontSize: "13px", color: sectionColors.textMuted, marginBottom: "12px" }}>
          {place.location}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span style={priceStyle}>$ {formatPrice(place.price)}</span>
          <span style={priceNoteStyle}>{place.note}</span>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Promo Banner Component
// -----------------------------------------------------------------------------

interface PromoBannerProps {
  banner: PromoBanner;
  onBookClick?: () => void;
}

function PromoBannerComponent({ banner, onBookClick }: PromoBannerProps) {
  // Handle multi-line title
  const titleLines = banner.title.split("\n");

  return (
    <div className="promo-banner-container">
      <Image
        src={banner.image}
        alt={banner.imageAlt}
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />

      {/* Glassmorphism Card */}
      <div className="promo-glass-card">
        <h3 className="promo-title">
          {titleLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < titleLines.length - 1 && <br />}
            </span>
          ))}
        </h3>
        <p
          className="promo-description"
          style={{
            fontSize: "15px",
            color: "rgba(255, 255, 255, 0.9)",
            marginBottom: "32px",
            lineHeight: 1.6,
            fontFamily: sectionTypography.fontFamily,
          }}
        >
          {banner.description}
        </p>
        <button style={promoButtonStyle} onClick={onBookClick}>
          {banner.buttonText}
        </button>
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        .promo-banner-container {
          position: relative;
          height: 500px;
          border-radius: 32px;
          overflow: hidden;
        }

        .promo-glass-card {
          position: absolute;
          bottom: 40px;
          right: 40px;
          width: 480px;
          background-color: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(12px);
          border-radius: 24px;
          padding: 40px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .promo-title {
          font-size: 32px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 16px;
          font-family: var(--font-dm-sans), sans-serif;
          line-height: 1.2;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          .promo-banner-container {
            height: 600px !important;
            border-radius: 24px !important;
          }

          .promo-glass-card {
            right: 50% !important;
            transform: translateX(50%) !important;
            bottom: 16px !important;
            width: calc(100% - 32px) !important;
            padding: 24px !important;
            background-color: rgba(255, 255, 255, 0.15) !important;
          }

          .promo-title {
            font-size: 24px !important;
          }

          .promo-description {
            font-size: 14px !important;
            margin-bottom: 24px !important;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      `}</style>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function PopularSection() {
  const { containerRef, scrollLeft, scrollRight } = useCarousel();

  const handlePlaceClick = (place: PopularPlace) => {
    // TODO: Navigate to place details
    console.log("Place clicked:", place);
  };

  const handleBookClick = () => {
    // TODO: Navigate to booking page
    console.log("Book now clicked");
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
          <h2 style={sectionTitleStyle}>{POPULAR_CONTENT.title}</h2>

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

        {/* Carousel */}
        <div
          ref={containerRef}
          className="hide-scrollbar"
          style={{
            display: "flex",
            gap: "24px",
            overflowX: "auto",
            scrollBehavior: "smooth",
            paddingBottom: "8px",
            marginBottom: "80px",
          }}
        >
          {POPULAR_PLACES.map((place) => (
            <PlaceCard key={place.id} place={place} onClick={handlePlaceClick} />
          ))}
        </div>

        {/* Promo Banner */}
        <PromoBannerComponent banner={PROMO_BANNER} onBookClick={handleBookClick} />
      </div>
    </section>
  );
}

export default PopularSection;
