"use client";

// =============================================================================
// FEATURES SECTION - Key value propositions
// =============================================================================

import { FEATURES_DATA } from "@/constants/sections.constants";
import {
  sectionInnerStyle,
  featureIconContainerStyle,
  featureIconStyle,
  featureTitleStyle,
  featureDescriptionStyle,
} from "@/styles/sections.styles";
import type { Feature } from "@/types/sections.types";

// -----------------------------------------------------------------------------
// Feature Card Component
// -----------------------------------------------------------------------------

interface FeatureCardProps {
  feature: Feature;
}

function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={featureIconContainerStyle(feature.color)}>
        <Icon style={featureIconStyle(feature.iconColor)} />
      </div>
      <h3 style={featureTitleStyle}>{feature.title}</h3>
      <p style={featureDescriptionStyle}>{feature.description}</p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function FeaturesSection() {
  return (
    <section style={{ padding: "60px 24px", backgroundColor: "#ffffff" }}>
      <div style={sectionInnerStyle}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "32px",
            textAlign: "center",
          }}
        >
          {FEATURES_DATA.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
