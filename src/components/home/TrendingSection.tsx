"use client";

// =============================================================================
// TRENDING SECTION - Trending destinations grid
// =============================================================================

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { TRENDING_CONTENT, TRENDING_DESTINATIONS } from "@/constants/sections.constants";
import {
  sectionContainerStyle,
  sectionInnerStyle,
  sectionTitleStyle,
  trendingCardStyle,
  trendingCardOverlayStyle,
  trendingCardTitleStyle,
} from "@/styles/sections.styles";
import type { TrendingDestination } from "@/types/sections.types";

// -----------------------------------------------------------------------------
// Trending Card Component
// -----------------------------------------------------------------------------

interface TrendingCardProps {
  destination: TrendingDestination;
  isLarge: boolean;
  onClick?: (destination: TrendingDestination) => void;
}

function TrendingCard({ destination, isLarge, onClick }: TrendingCardProps) {
  return (
    <div
      className={`trending-card ${isLarge ? "large-card" : "small-card"}`}
      style={trendingCardStyle}
      onClick={() => onClick?.(destination)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.(destination)}
    >
      <Image
        src={destination.image}
        alt={destination.name}
        fill
        sizes={isLarge ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
        style={{ objectFit: "cover", transition: "transform 0.5s" }}
        className="hover:scale-105"
      />

      {/* Content Overlay */}
      <div
        style={{
          position: "absolute",
          top: "24px",
          left: "24px",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <span style={trendingCardTitleStyle(isLarge)}>{destination.name}</span>
        <ChevronRight
          size={isLarge ? 20 : 18}
          color="#ffffff"
          style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}
        />
      </div>

      {/* Top Gradient */}
      <div style={trendingCardOverlayStyle} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function TrendingSection() {
  const handleDestinationClick = (destination: TrendingDestination) => {
    // TODO: Navigate to destination search/details
    console.log("Destination clicked:", destination);
  };

  return (
    <section style={sectionContainerStyle}>
      <div style={sectionInnerStyle}>
        {/* Header */}
        <h2 style={{ ...sectionTitleStyle, marginBottom: "32px" }}>{TRENDING_CONTENT.title}</h2>

        {/* CSS Grid Layout */}
        <div className="trending-grid">
          {TRENDING_DESTINATIONS.map((dest, index) => {
            // First 3 items on top row (small), last 2 on bottom row (large)
            const isLargeRow = index >= 3;

            return (
              <TrendingCard
                key={dest.id}
                destination={dest}
                isLarge={isLargeRow}
                onClick={handleDestinationClick}
              />
            );
          })}
        </div>

        {/* Grid Styles */}
        <style jsx>{`
          .trending-grid {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 24px;
          }

          .trending-card {
            width: 100%;
          }

          /* First 3 cards: 2 units width (6/3=2) */
          :global(.small-card) {
            grid-column: span 2;
            height: 320px;
          }

          /* Last 2 cards: 3 units width (6/2=3) */
          :global(.large-card) {
            grid-column: span 3;
            height: 420px;
          }

          /* Responsive Breakpoints */
          @media (max-width: 1024px) {
            .trending-grid {
              grid-template-columns: repeat(2, 1fr);
            }
            :global(.small-card) {
              grid-column: span 1;
              height: 280px;
            }
            :global(.large-card) {
              grid-column: span 1;
              height: 320px;
            }
          }

          @media (max-width: 640px) {
            .trending-grid {
              grid-template-columns: 1fr;
            }
            :global(.small-card),
            :global(.large-card) {
              grid-column: span 1;
              height: 240px;
            }
          }
        `}</style>
      </div>
    </section>
  );
}

export default TrendingSection;
