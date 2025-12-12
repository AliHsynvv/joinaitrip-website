"use client";

// =============================================================================
// CHAT BUTTON COMPONENT
// Floating chat button for Airen AI assistant
// =============================================================================

import Image from "next/image";
import { HERO_IMAGES, HERO_CONTENT } from "@/constants/hero.constants";
import { chatButtonContainerStyle, chatButtonAvatarStyle } from "@/styles/hero.styles";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface ChatButtonProps {
  onClick?: () => void;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function ChatButton({ onClick }: ChatButtonProps) {
  return (
    <div style={chatButtonContainerStyle}>
      {/* Curved Text */}
      <div style={{ position: "relative", width: "120px", height: "40px" }}>
        <svg
          viewBox="0 0 120 40"
          style={{ width: "100%", height: "100%", overflow: "visible" }}
        >
          <path id="textCurve" d="M 10 35 Q 60 5 110 35" fill="transparent" />
          <text
            fill="#ffffff"
            style={{
              fontSize: "13px",
              fontWeight: 600,
              textShadow: "0 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            <textPath href="#textCurve" startOffset="50%" textAnchor="middle">
              {HERO_CONTENT.chatButton.label}
            </textPath>
          </text>
        </svg>
      </div>

      {/* Avatar Button */}
      <button onClick={onClick} style={chatButtonAvatarStyle}>
        <Image
          src={HERO_IMAGES.airenAvatar}
          alt={HERO_CONTENT.chatButton.altText}
          width={64}
          height={64}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </button>
    </div>
  );
}

export default ChatButton;
