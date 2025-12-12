"use client";

// =============================================================================
// HERO SECTION - Main Component
// Clean, modular architecture ready for API integration
// =============================================================================

import { useState } from "react";

// Sub-components
import { HeroBackground } from "./HeroBackground";
import { HeroHeadline } from "./HeroHeadline";
import { ServiceTabs } from "./ServiceTabs";
import { ChatButton } from "./ChatButton";

// Forms
import {
  FlightSearchForm,
  HotelSearchForm,
  TransferSearchForm,
  CarSearchForm,
  TourSearchForm,
  GuidesSearchForm,
  RestaurantSearchForm,
  MuseumSearchForm,
  PackageBuilderForm,
} from "./forms";

// Styles
import {
  heroSectionStyle,
  contentContainerStyle,
  glassContainerStyle,
  innerBoxStyle,
  transitions,
} from "@/styles/hero.styles";

// Types
import type { ServiceType } from "@/types/search.types";

// CSS for responsive and dark mode
import "./hero.css";

// -----------------------------------------------------------------------------
// Form Renderer Component
// -----------------------------------------------------------------------------

interface FormRendererProps {
  activeService: ServiceType;
  isPackageExpanded: boolean;
  onPackageExpandToggle: () => void;
}

function FormRenderer({
  activeService,
  isPackageExpanded,
  onPackageExpandToggle,
}: FormRendererProps) {
  const formComponents: Record<ServiceType, React.ReactNode> = {
    flight: <FlightSearchForm />,
    hotel: <HotelSearchForm />,
    transfer: <TransferSearchForm />,
    car: <CarSearchForm />,
    tour: <TourSearchForm />,
    guides: <GuidesSearchForm />,
    restaurant: <RestaurantSearchForm />,
    museum: <MuseumSearchForm />,
    package: (
      <PackageBuilderForm
        isExpanded={isPackageExpanded}
        onExpandToggle={onPackageExpandToggle}
      />
    ),
  };

  return <>{formComponents[activeService]}</>;
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function HeroSection() {
  // State
  const [activeService, setActiveService] = useState<ServiceType>("flight");
  const [isPackageExpanded, setIsPackageExpanded] = useState(false);

  // Handlers
  const handleServiceChange = (service: ServiceType) => {
    setActiveService(service);
  };

  const handlePackageCollapse = () => {
    setIsPackageExpanded(false);
  };

  const handlePackageExpandToggle = () => {
    setIsPackageExpanded((prev) => !prev);
  };

  const handleChatClick = () => {
    // TODO: Open chat modal/drawer
    console.log("Open Airen chat");
  };

  // Calculate max width based on service
  const getSearchBoxMaxWidth = () => {
    if (isPackageExpanded) return "1650px";
    if (activeService === "car" || activeService === "tour") return "1650px";
    return "1550px";
  };

  return (
    <section style={heroSectionStyle(isPackageExpanded)}>
      {/* Background with day/night images */}
      <HeroBackground />

      {/* Main Content */}
      <div className="hero-content" style={contentContainerStyle}>
        {/* Headline - Hidden when package is expanded */}
        {!isPackageExpanded && <HeroHeadline />}

        {/* Search Box Container */}
        <div
          style={{
            maxWidth: getSearchBoxMaxWidth(),
            margin: "0 auto",
            transition: `all ${transitions.normal}`,
            paddingTop: isPackageExpanded ? "40px" : "0",
          }}
        >
          {/* Outer Glass Container */}
          <div className="search-box-glass" style={glassContainerStyle}>
            {/* Inner White Box */}
            <div className="search-box-inner" style={innerBoxStyle}>
              {/* Service Tabs */}
              <ServiceTabs
                activeService={activeService}
                onServiceChange={handleServiceChange}
                onPackageCollapse={handlePackageCollapse}
              />

              {/* Spacer for non-flight services */}
              {activeService !== "flight" && activeService !== "package" && (
                <div style={{ height: "24px" }} />
              )}

              {/* Dynamic Form */}
              <FormRenderer
                activeService={activeService}
                isPackageExpanded={isPackageExpanded}
                onPackageExpandToggle={handlePackageExpandToggle}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <ChatButton onClick={handleChatClick} />
    </section>
  );
}

export default HeroSection;
