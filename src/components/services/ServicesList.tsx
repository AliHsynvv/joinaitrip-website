"use client";

// =============================================================================
// SERVICES LIST - Grid of service cards
// =============================================================================

import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SERVICES, SERVICES_LIST_CONTENT, SERVICE_COLORS } from "@/constants/services.constants";
import {
  servicesListSectionStyle,
  servicesContainerStyle,
  servicesHeaderStyle,
  servicesBadgeStyle,
  servicesTitleStyle,
  servicesSubtitleStyle,
  serviceCardStyle,
  cardHeaderStyle,
  iconBoxStyle,
  arrowButtonStyle,
  cardTitleStyle,
  cardSubtitleStyle,
  cardDescriptionStyle,
  featureItemStyle,
  featureTextStyle,
} from "@/styles/services.styles";
import type { ServiceItem, ServiceColorKey } from "@/types/services.types";

// -----------------------------------------------------------------------------
// Service Card Component
// -----------------------------------------------------------------------------

interface ServiceCardProps {
  service: ServiceItem;
  onClick?: (service: ServiceItem) => void;
}

function ServiceCard({ service, onClick }: ServiceCardProps) {
  const Icon = service.icon;
  const isHighlighted = service.isHighlighted || false;
  const colorScheme = SERVICE_COLORS[service.colorClass as ServiceColorKey];

  // Determine icon background color
  const iconBgColor = isHighlighted
    ? "rgba(255, 255, 255, 0.2)"
    : colorScheme?.iconBg || "#f1f5f9";

  // Determine icon color
  const iconColor = isHighlighted ? "#ffffff" : colorScheme?.text || "#64748b";

  return (
    <div
      className={`service-card col-span-${service.colSpan} ${isHighlighted ? "highlight-card" : ""}`}
      style={serviceCardStyle(isHighlighted)}
      onClick={() => onClick?.(service)}
    >
      {/* Header: Icon + Arrow Button */}
      <div style={cardHeaderStyle}>
        <div style={iconBoxStyle(iconBgColor)}>
          <Icon size={28} color={iconColor} />
        </div>
        <button className="arrow-btn" style={arrowButtonStyle(isHighlighted)}>
          <ArrowUpRight size={20} />
        </button>
      </div>

      {/* Content */}
      <div>
        <h3 style={cardTitleStyle(isHighlighted)}>{service.title}</h3>
        <span style={cardSubtitleStyle(isHighlighted)}>{service.subtitle}</span>
        <p style={cardDescriptionStyle(isHighlighted)}>{service.description}</p>

        {/* Features */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {service.features.map((feature, idx) => (
            <div key={idx} style={featureItemStyle(isHighlighted)}>
              <CheckCircle2
                size={16}
                color={isHighlighted ? "#a5f3fc" : "#9ca3af"}
              />
              <span style={featureTextStyle(isHighlighted)}>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function ServicesList() {
  const handleServiceClick = (service: ServiceItem) => {
    // TODO: Navigate to service details or open modal
    console.log("Service clicked:", service);
  };

  return (
    <section style={servicesListSectionStyle}>
      <div style={servicesContainerStyle}>
        {/* Header */}
        <div style={servicesHeaderStyle}>
          <span style={servicesBadgeStyle}>{SERVICES_LIST_CONTENT.badge}</span>
          <h2 style={servicesTitleStyle}>{SERVICES_LIST_CONTENT.title}</h2>
          <p style={servicesSubtitleStyle}>{SERVICES_LIST_CONTENT.subtitle}</p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={handleServiceClick}
            />
          ))}
        </div>

        {/* Grid Styles */}
        <style jsx global>{`
          .services-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 32px;
          }

          .service-card {
            cursor: pointer;
          }

          .service-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.1);
          }

          .service-card:not(.highlight-card):hover {
            border-color: #cbd5e1;
          }

          .service-card:hover .arrow-btn {
            background-color: #1e293b;
            color: #ffffff;
          }

          .highlight-card:hover .arrow-btn {
            background-color: #ffffff !important;
            color: #0891b2 !important;
          }

          .col-span-1 {
            grid-column: span 1;
          }

          .col-span-2 {
            grid-column: span 2;
          }

          .col-span-3 {
            grid-column: span 3;
          }

          /* Responsive */
          @media (max-width: 1024px) {
            .services-grid {
              grid-template-columns: repeat(2, 1fr);
            }
            .col-span-1,
            .col-span-2,
            .col-span-3 {
              grid-column: span 2 !important;
            }
          }

          @media (max-width: 768px) {
            .services-grid {
              grid-template-columns: 1fr;
              gap: 24px;
            }
            .col-span-1,
            .col-span-2,
            .col-span-3 {
              grid-column: span 1 !important;
            }
            .service-card {
              padding: 32px 24px;
            }
          }
        `}</style>
      </div>
    </section>
  );
}

export default ServicesList;
