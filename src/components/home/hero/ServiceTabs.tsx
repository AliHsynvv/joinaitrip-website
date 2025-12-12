"use client";

// =============================================================================
// SERVICE TABS COMPONENT
// Navigation tabs for different search services
// =============================================================================

import { SERVICE_TABS } from "@/constants/hero.constants";
import { serviceTabStyle } from "@/styles/hero.styles";
import type { ServiceType } from "@/types/search.types";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface ServiceTabsProps {
  activeService: ServiceType;
  onServiceChange: (service: ServiceType) => void;
  onPackageCollapse?: () => void;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function ServiceTabs({
  activeService,
  onServiceChange,
  onPackageCollapse,
}: ServiceTabsProps) {
  const handleTabClick = (tabId: ServiceType) => {
    onServiceChange(tabId);
    if (tabId !== "package" && onPackageCollapse) {
      onPackageCollapse();
    }
  };

  return (
    <div
      className="hide-scrollbar service-tabs-row"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 24px",
        overflowX: "auto",
        borderBottom: "none",
        whiteSpace: "nowrap",
        WebkitOverflowScrolling: "touch",
        paddingBottom: "16px",
        gap: "5px",
      }}
    >
      {SERVICE_TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          style={serviceTabStyle(activeService === tab.id)}
        >
          <tab.icon style={{ width: "26px", height: "26px" }} />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

export default ServiceTabs;
