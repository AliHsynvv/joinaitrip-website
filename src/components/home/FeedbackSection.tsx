"use client";

// =============================================================================
// FEEDBACK SECTION - Customer reviews/testimonials
// =============================================================================

import { useState } from "react";
import Image from "next/image";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { FEEDBACK_CONTENT, SAMPLE_REVIEWS } from "@/constants/sections.constants";
import {
  sectionContainerStyle,
  sectionInnerStyle,
  sectionHeaderStyle,
  sectionTitleStyle,
  sectionSubtitleStyle,
  reviewCardStyle,
  avatarStyle,
  reactionButtonStyle,
  sectionColors,
} from "@/styles/sections.styles";
import type { Review } from "@/types/sections.types";

// -----------------------------------------------------------------------------
// Star Rating Component
// -----------------------------------------------------------------------------

interface StarRatingProps {
  rating: number;
}

function StarRating({ rating }: StarRatingProps) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            backgroundColor: i < rating ? sectionColors.trustpilotGreen : "#e5e7eb",
            padding: "2px",
            borderRadius: "2px",
          }}
        >
          <Star size={12} fill="#ffffff" color="#ffffff" style={{ display: "block" }} />
        </div>
      ))}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Review Card Component
// -----------------------------------------------------------------------------

interface ReviewCardProps {
  review: Review;
  onLike?: (reviewId: string | number) => void;
  onDislike?: (reviewId: string | number) => void;
}

function ReviewCard({ review, onLike, onDislike }: ReviewCardProps) {
  return (
    <div className="review-card" style={reviewCardStyle}>
      {/* User Info */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <div style={avatarStyle}>
          <Image
            src={review.avatar}
            alt={review.name}
            width={56}
            height={56}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div>
          <h4
            style={{
              fontSize: "16px",
              fontWeight: 600,
              color: sectionColors.textPrimary,
              marginBottom: "2px",
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            {review.name}
          </h4>
          <p style={{ fontSize: "13px", color: sectionColors.textMuted, marginBottom: "4px" }}>
            {review.time}
          </p>
          <StarRating rating={review.rating} />
        </div>
      </div>

      {/* Comment */}
      <p
        style={{
          fontSize: "15px",
          color: sectionColors.textSecondary,
          lineHeight: 1.6,
          marginBottom: "24px",
          fontFamily: "var(--font-dm-sans), sans-serif",
        }}
      >
        {review.comment}
      </p>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ display: "flex", gap: "16px" }}>
          <button
            onClick={() => onLike?.(review.id)}
            style={reactionButtonStyle(sectionColors.green)}
            aria-label="Like"
          >
            <ThumbsUp size={18} />
            <span>{review.likes}</span>
          </button>
          <button
            onClick={() => onDislike?.(review.id)}
            style={reactionButtonStyle(sectionColors.red)}
            aria-label="Dislike"
          >
            <ThumbsDown size={18} />
            <span>{review.dislikes}</span>
          </button>
        </div>

        {review.source && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "13px", color: sectionColors.textLight }}>Review from</span>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Star size={16} fill={sectionColors.trustpilotGreen} color={sectionColors.trustpilotGreen} />
              <span style={{ fontWeight: 600, color: sectionColors.textPrimary, fontSize: "14px" }}>
                {review.source}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function FeedbackSection() {
  const [reviews, setReviews] = useState<Review[]>(SAMPLE_REVIEWS);

  const handleLike = (reviewId: string | number) => {
    // TODO: API call to like review
    console.log("Like review:", reviewId);
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  const handleDislike = (reviewId: string | number) => {
    // TODO: API call to dislike review
    console.log("Dislike review:", reviewId);
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, dislikes: r.dislikes + 1 } : r))
    );
  };

  const handleShowMore = () => {
    // TODO: API call to fetch more reviews
    console.log("Fetch more reviews");
  };

  return (
    <section style={sectionContainerStyle}>
      {/* Responsive Styles */}
      <style jsx global>{`
        .reviews-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        @media (max-width: 768px) {
          .reviews-container {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory;
            gap: 16px !important;
            padding-bottom: 16px;
            margin-right: -24px;
            padding-right: 24px;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          .reviews-container::-webkit-scrollbar {
            display: none;
          }

          .review-card {
            min-width: 85vw;
            max-width: 320px;
            scroll-snap-align: start;
            flex-shrink: 0;
          }
        }
      `}</style>
      
      <div style={sectionInnerStyle}>
        {/* Header */}
        <div style={sectionHeaderStyle("center")}>
          <h2 style={{ ...sectionTitleStyle, marginBottom: "12px" }}>{FEEDBACK_CONTENT.title}</h2>
          <p style={sectionSubtitleStyle}>{FEEDBACK_CONTENT.subtitle}</p>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-container" style={{ marginBottom: "40px" }}>
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onLike={handleLike}
              onDislike={handleDislike}
            />
          ))}
        </div>

        {/* Show More Link */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={handleShowMore}
            style={{
              background: "none",
              border: "none",
              color: sectionColors.textMuted,
              fontSize: "16px",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "var(--font-dm-sans), sans-serif",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
            }}
          >
            {FEEDBACK_CONTENT.showMoreButton}
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeedbackSection;
