"use client";

// =============================================================================
// CONTACT SECTION - Clean, API-ready component
// =============================================================================

import Image from "next/image";
import { useContactForm } from "@/hooks/useContactForm";
import { CONTACT_CONTENT } from "@/constants/sections.constants";
import {
  sectionContainerStyle,
  sectionInnerStyle,
  sectionTitleStyle,
  sectionSubtitleStyle,
  inputStyle,
  textareaStyle,
  submitButtonStyle,
} from "@/styles/sections.styles";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function ContactSection() {
  const { formState, handleChange, handleSubmit } = useContactForm();
  const { placeholders, submitButton } = CONTACT_CONTENT.form;

  return (
    <section style={sectionContainerStyle}>
      <div style={sectionInnerStyle}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "48px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Left Side - Image */}
          <div
            style={{
              flex: 1,
              minWidth: "300px",
              height: "400px",
              position: "relative",
              borderRadius: "32px",
              overflow: "hidden",
            }}
          >
            <Image
              src={CONTACT_CONTENT.image}
              alt={CONTACT_CONTENT.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Right Side - Form */}
          <div style={{ flex: 1.2, minWidth: "300px" }}>
            <h2 style={{ ...sectionTitleStyle, marginBottom: "8px" }}>
              {CONTACT_CONTENT.title}
            </h2>
            <p style={{ ...sectionSubtitleStyle, marginBottom: "32px", fontSize: "15px" }}>
              {CONTACT_CONTENT.subtitle}
            </p>

            {/* Success Message */}
            {formState.isSuccess && (
              <div
                style={{
                  padding: "16px",
                  backgroundColor: "#dcfce7",
                  borderRadius: "8px",
                  marginBottom: "24px",
                  color: "#166534",
                }}
              >
                Thank you! Your message has been sent successfully.
              </div>
            )}

            {/* Error Message */}
            {formState.error && (
              <div
                style={{
                  padding: "16px",
                  backgroundColor: "#fef2f2",
                  borderRadius: "8px",
                  marginBottom: "24px",
                  color: "#dc2626",
                }}
              >
                {formState.error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                <input
                  type="text"
                  placeholder={placeholders.fullName}
                  value={formState.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  style={{ ...inputStyle, flex: 1, minWidth: "200px" }}
                  disabled={formState.isLoading}
                />
                <input
                  type="email"
                  placeholder={placeholders.email}
                  value={formState.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  style={{ ...inputStyle, flex: 1, minWidth: "200px" }}
                  disabled={formState.isLoading}
                />
              </div>

              <textarea
                placeholder={placeholders.message}
                rows={6}
                value={formState.message}
                onChange={(e) => handleChange("message", e.target.value)}
                style={textareaStyle}
                disabled={formState.isLoading}
              />

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="submit"
                  disabled={formState.isLoading}
                  style={{
                    ...submitButtonStyle,
                    opacity: formState.isLoading ? 0.7 : 1,
                    cursor: formState.isLoading ? "not-allowed" : "pointer",
                  }}
                >
                  {formState.isLoading ? "Sending..." : submitButton}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
