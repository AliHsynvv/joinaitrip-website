"use client";

// =============================================================================
// ABOUT CONTENT - Main content wrapper
// Modular architecture - each section is a separate component
// =============================================================================

import {
  IntroductionSection,
  AirenSection,
  EcosystemSection,
  MissionSection,
  VisionSection,
  UniqueSection,
} from "./sections";

// -----------------------------------------------------------------------------
// Responsive Styles
// -----------------------------------------------------------------------------

const ResponsiveStyles = () => (
  <style jsx global>{`
    @media (max-width: 1024px) {
      .airen-grid,
      .mission-grid {
        grid-template-columns: 1fr !important;
        gap: 48px !important;
      }
      .airen-image-container {
        height: 400px !important;
        order: -1;
      }
    }

    @media (max-width: 768px) {
      .airen-image-container {
        height: 300px !important;
      }
    }
  `}</style>
);

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function AboutContent() {
  return (
    <section style={{ backgroundColor: "#ffffff" }}>
      {/* Introduction */}
      <IntroductionSection />

      {/* Powered by Airen */}
      <AirenSection />

      {/* Global Ecosystem */}
      <EcosystemSection />

      {/* Our Mission */}
      <MissionSection />

      {/* Our Vision */}
      <VisionSection />

      {/* What Makes Us Unique */}
      <UniqueSection />

      {/* Responsive Styles */}
      <ResponsiveStyles />
    </section>
  );
}

export default AboutContent;
