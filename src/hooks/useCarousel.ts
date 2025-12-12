// =============================================================================
// USE CAROUSEL HOOK
// Reusable horizontal scroll carousel functionality
// =============================================================================

import { useRef, useCallback } from "react";
import { CAROUSEL_SETTINGS } from "@/constants/sections.constants";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface UseCarouselOptions {
  scrollAmount?: number;
}

interface UseCarouselReturn {
  containerRef: React.RefObject<HTMLDivElement | null>;
  scrollLeft: () => void;
  scrollRight: () => void;
}

// -----------------------------------------------------------------------------
// Hook
// -----------------------------------------------------------------------------

export function useCarousel(options?: UseCarouselOptions): UseCarouselReturn {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAmount = options?.scrollAmount ?? CAROUSEL_SETTINGS.scrollAmount;

  const scrollLeft = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  }, [scrollAmount]);

  const scrollRight = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, [scrollAmount]);

  return {
    containerRef,
    scrollLeft,
    scrollRight,
  };
}

export default useCarousel;
