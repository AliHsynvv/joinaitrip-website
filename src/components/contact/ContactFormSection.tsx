"use client";

// =============================================================================
// CONTACT FORM SECTION - Contact info and form
// =============================================================================

import { useContactPageForm } from "@/hooks/useContactPageForm";
import { CONTACT_FORM_CONTENT, CONTACT_INFO } from "@/constants/contact.constants";
import {
  contactSectionStyle,
  contactContainerStyle,
  contactGridStyle,
  contactTitleStyle,
  contactSubtitleStyle,
  contactInfoItemStyle,
  contactInfoIconStyle,
  contactInfoTitleStyle,
  contactInfoValueStyle,
  formContainerStyle,
  formLabelStyle,
  formInputStyle,
  formTextareaStyle,
  formButtonStyle,
  contactColors,
} from "@/styles/contact.styles";
import type { ContactInfo, ContactFormData } from "@/types/contact.types";

// -----------------------------------------------------------------------------
// Contact Info Item Component
// -----------------------------------------------------------------------------

interface ContactInfoItemProps {
  info: ContactInfo;
}

function ContactInfoItem({ info }: ContactInfoItemProps) {
  const Icon = info.icon;

  return (
    <div style={contactInfoItemStyle}>
      <div style={contactInfoIconStyle}>
        <Icon size={24} color="#ffffff" />
      </div>
      <div>
        <h4 style={contactInfoTitleStyle}>{info.title}</h4>
        <p style={contactInfoValueStyle}>{info.value}</p>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function ContactFormSection() {
  const {
    data,
    errors,
    isLoading,
    isSuccess,
    generalError,
    updateField,
    handleSubmit,
  } = useContactPageForm(handleContactSubmit);

  // API Call
  async function handleContactSubmit(formData: ContactFormData): Promise<void> {
    // TODO: Replace with actual API call
    console.log("Contact form submitted:", formData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Example API integration:
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });
    //
    // if (!response.ok) {
    //   const error = await response.json();
    //   throw new Error(error.message || 'Failed to send message');
    // }
  }

  // Handle multi-line title
  const titleLines = CONTACT_FORM_CONTENT.title.split("\n");

  return (
    <section style={contactSectionStyle}>
      <div style={contactContainerStyle}>
        <div style={contactGridStyle}>
          {/* Left Side: Info */}
          <div style={{ flex: 1, minWidth: "300px", maxWidth: "500px" }}>
            <h2 style={contactTitleStyle}>
              {titleLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < titleLines.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <p style={contactSubtitleStyle}>{CONTACT_FORM_CONTENT.subtitle}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {CONTACT_INFO.map((info) => (
                <ContactInfoItem key={info.id} info={info} />
              ))}
            </div>
          </div>

          {/* Right Side: Form */}
          <div style={formContainerStyle}>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              {/* Success Message */}
              {isSuccess && (
                <div
                  style={{
                    backgroundColor: "#f0fdf4",
                    border: "1px solid #22c55e",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    color: "#16a34a",
                    fontSize: "14px",
                  }}
                >
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              {/* General Error */}
              {generalError && (
                <div
                  style={{
                    backgroundColor: "#fef2f2",
                    border: "1px solid #ef4444",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    color: "#ef4444",
                    fontSize: "14px",
                  }}
                >
                  {generalError}
                </div>
              )}

              {/* Name Field */}
              <div>
                <label style={formLabelStyle}>
                  {CONTACT_FORM_CONTENT.form.nameLabel}
                </label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder={CONTACT_FORM_CONTENT.form.namePlaceholder}
                  disabled={isLoading}
                  style={{
                    ...formInputStyle,
                    borderColor: errors.name ? "#ef4444" : contactColors.border,
                  }}
                />
                {errors.name && (
                  <p style={{ color: "#ef4444", fontSize: "13px", marginTop: "4px" }}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label style={formLabelStyle}>
                  {CONTACT_FORM_CONTENT.form.emailLabel}
                </label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder={CONTACT_FORM_CONTENT.form.emailPlaceholder}
                  disabled={isLoading}
                  style={{
                    ...formInputStyle,
                    borderColor: errors.email ? "#ef4444" : contactColors.border,
                  }}
                />
                {errors.email && (
                  <p style={{ color: "#ef4444", fontSize: "13px", marginTop: "4px" }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label style={formLabelStyle}>
                  {CONTACT_FORM_CONTENT.form.messageLabel}
                </label>
                <textarea
                  value={data.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  placeholder={CONTACT_FORM_CONTENT.form.messagePlaceholder}
                  rows={6}
                  disabled={isLoading}
                  style={{
                    ...formTextareaStyle,
                    borderColor: errors.message ? "#ef4444" : contactColors.border,
                  }}
                />
                {errors.message && (
                  <p style={{ color: "#ef4444", fontSize: "13px", marginTop: "4px" }}>
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    ...formButtonStyle,
                    opacity: isLoading ? 0.7 : 1,
                    cursor: isLoading ? "not-allowed" : "pointer",
                  }}
                >
                  {isLoading ? "Sending..." : CONTACT_FORM_CONTENT.form.submitButton}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactFormSection;
