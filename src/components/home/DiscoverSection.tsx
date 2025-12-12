"use client";

// =============================================================================
// DISCOVER SECTION - Horizontal scrolling place cards
// =============================================================================

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCarousel } from "@/hooks/useCarousel";
import { DISCOVER_CONTENT, DISCOVER_PLACES } from "@/constants/sections.constants";
import {
  sectionContainerStyle,
  sectionInnerStyle,
  sectionTitleStyle,
  navButtonStyle,
  imageCardStyle,
  cardOverlayStyle,
  cardTitleStyle,
} from "@/styles/sections.styles";
import type { DiscoverPlace } from "@/types/sections.types";

// -----------------------------------------------------------------------------
// Place Card Component
// -----------------------------------------------------------------------------

interface PlaceCardProps {
  place: DiscoverPlace;
  onClick?: (place: DiscoverPlace) => void;
}

function PlaceCard({ place, onClick }: PlaceCardProps) {
  return (
    <div
      style={imageCardStyle}
      onClick={() => onClick?.(place)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.(place)}
    >
      <Image
        src={place.image}
        alt={place.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: "cover", transition: "transform 0.5s" }}
        className="hover:scale-110"
      />
      {/* Gradient Overlay */}
      <div style={cardOverlayStyle} />

      {/* Text */}
      <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px" }}>
        <h3 style={cardTitleStyle}>{place.title}</h3>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function DiscoverSection() {
  const { containerRef, scrollLeft, scrollRight } = useCarousel();

  const handlePlaceClick = (place: DiscoverPlace) => {
    // TODO: Navigate to place details or search results
    console.log("Place clicked:", place);
    // Example: router.push(`/search?category=${place.slug}`);
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
          <h2 style={sectionTitleStyle}>{DISCOVER_CONTENT.title}</h2>

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
          {DISCOVER_PLACES.map((place) => (
            <PlaceCard key={place.id} place={place} onClick={handlePlaceClick} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default DiscoverSection;
