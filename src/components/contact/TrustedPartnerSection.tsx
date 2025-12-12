"use client";

// =============================================================================
// TRUSTED PARTNER SECTION - Stats and FAQ
// =============================================================================

import Image from "next/image";
import { Plus } from "lucide-react";
import { useFaqToggle } from "@/hooks/useContactPageForm";
import {
  TRUSTED_PARTNER_CONTENT,
  STATS,
  FAQ_CONTENT,
  FAQS,
} from "@/constants/contact.constants";
import {
  trustedSectionStyle,
  contactContainerStyle,
  trustedGridStyle,
  trustedImageStyle,
  trustedTitleStyle,
  contactSubtitleStyle,
  statValueStyle,
  statLabelStyle,
  faqGridStyle,
  faqItemStyle,
  faqQuestionStyle,
  faqAnswerStyle,
  contactTypography,
  contactColors,
} from "@/styles/contact.styles";
import type { Stat, FAQ } from "@/types/contact.types";

// -----------------------------------------------------------------------------
// Stat Item Component
// -----------------------------------------------------------------------------

interface StatItemProps {
  stat: Stat;
}

function StatItem({ stat }: StatItemProps) {
  return (
    <div>
      <h3 style={statValueStyle}>{stat.value}</h3>
      <p style={statLabelStyle}>{stat.label}</p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// FAQ Item Component
// -----------------------------------------------------------------------------

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ faq, isOpen, onToggle }: FAQItemProps) {
  return (
    <div style={faqItemStyle} onClick={onToggle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={faqQuestionStyle}>{faq.question}</span>
        <Plus
          size={20}
          color={contactColors.textLight}
          style={{
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
            flexShrink: 0,
          }}
        />
      </div>

      {isOpen && <div style={faqAnswerStyle}>{faq.answer}</div>}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function TrustedPartnerSection() {
  const { isOpen, toggle } = useFaqToggle();

  // Handle multi-line titles
  const trustedTitleLines = TRUSTED_PARTNER_CONTENT.title.split("\n");
  const faqTitleLines = FAQ_CONTENT.title.split("\n");

  return (
    <section style={trustedSectionStyle}>
      <div style={contactContainerStyle}>
        {/* Trusted Partner Part */}
        <div style={trustedGridStyle}>
          {/* Left Image */}
          <div style={trustedImageStyle}>
            <Image
              src={TRUSTED_PARTNER_CONTENT.image}
              alt={TRUSTED_PARTNER_CONTENT.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Right Content */}
          <div style={{ flex: 1, minWidth: "300px" }}>
            <h2 style={trustedTitleStyle}>
              {trustedTitleLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < trustedTitleLines.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <p
              style={{
                ...contactSubtitleStyle,
                marginTop: 0,
                marginBottom: "40px",
              }}
            >
              {TRUSTED_PARTNER_CONTENT.subtitle}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "32px",
              }}
            >
              {STATS.map((stat) => (
                <StatItem key={stat.id} stat={stat} />
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Part */}
        <div style={faqGridStyle}>
          {/* Left Content: FAQ */}
          <div style={{ flex: 1, minWidth: "300px" }}>
            <h2
              style={{
                ...trustedTitleStyle,
                marginBottom: "40px",
              }}
            >
              {faqTitleLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < faqTitleLines.length - 1 && <br />}
                </span>
              ))}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {FAQS.map((faq) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  isOpen={isOpen(faq.id)}
                  onToggle={() => toggle(faq.id)}
                />
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div style={trustedImageStyle}>
            <Image
              src={FAQ_CONTENT.image}
              alt={FAQ_CONTENT.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustedPartnerSection;
