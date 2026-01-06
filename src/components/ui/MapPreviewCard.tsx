"use client";

// =============================================================================
// MAP PREVIEW CARD
// A small map preview widget with hotel markers for the sidebar
// =============================================================================

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { DivIcon, LatLngExpression } from "leaflet";
import { Map, ChevronRight } from "lucide-react";
import "leaflet/dist/leaflet.css";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface Hotel {
    id: string;
    name: string;
    pricePerNight: number;
    lat: number;
    lng: number;
}

interface MapPreviewCardProps {
    hotels: Hotel[];
    onViewFullMap: () => void;
    centerLat?: number;
    centerLng?: number;
}

// -----------------------------------------------------------------------------
// Custom Marker
// -----------------------------------------------------------------------------

const createSmallPriceMarker = (price: number) => {
    return new DivIcon({
        className: "preview-price-marker",
        html: `
      <div style="
        background-color: #06b6d4;
        color: #ffffff;
        padding: 3px 6px;
        border-radius: 4px;
        font-size: 10px;
        font-weight: 600;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
        white-space: nowrap;
      ">
        $${price}
      </div>
    `,
        iconSize: [40, 20],
        iconAnchor: [20, 20],
    });
};

// -----------------------------------------------------------------------------
// Fit Bounds Component
// -----------------------------------------------------------------------------

function FitBounds({ hotels }: { hotels: Hotel[] }) {
    const map = useMap();

    useEffect(() => {
        if (hotels.length > 0) {
            const bounds = hotels.map((h) => [h.lat, h.lng] as [number, number]);
            map.fitBounds(bounds, { padding: [20, 20] });
        }
    }, [hotels, map]);

    return null;
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function MapPreviewCard({
    hotels,
    onViewFullMap,
    centerLat = 48.8566,
    centerLng = 2.3522,
}: MapPreviewCardProps) {
    const [mapReady, setMapReady] = useState(false);

    useEffect(() => {
        // Delay to ensure proper mounting
        const timer = setTimeout(() => setMapReady(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const mapCenter: LatLngExpression = [centerLat, centerLng];

    return (
        <div
            style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                overflow: "hidden",
                marginBottom: "16px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                border: "1px solid #e5e7eb",
            }}
        >
            {/* Map Preview */}
            <div
                style={{
                    height: "180px",
                    position: "relative",
                    cursor: "pointer",
                }}
                onClick={onViewFullMap}
            >
                {mapReady && (
                    <MapContainer
                        center={mapCenter}
                        zoom={12}
                        style={{ width: "100%", height: "100%" }}
                        zoomControl={false}
                        dragging={false}
                        scrollWheelZoom={false}
                        doubleClickZoom={false}
                        touchZoom={false}
                        attributionControl={false}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                        {hotels.slice(0, 6).map((hotel) => (
                            <Marker
                                key={hotel.id}
                                position={[hotel.lat, hotel.lng]}
                                icon={createSmallPriceMarker(hotel.pricePerNight)}
                            />
                        ))}

                        <FitBounds hotels={hotels} />
                    </MapContainer>
                )}

                {/* Overlay Gradient */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "60px",
                        background: "linear-gradient(transparent, rgba(0,0,0,0.4))",
                        pointerEvents: "none",
                    }}
                />

                {/* View in Map Button Overlay */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onViewFullMap();
                    }}
                    style={{
                        position: "absolute",
                        bottom: "12px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#06b6d4",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "20px",
                        padding: "8px 16px",
                        fontSize: "13px",
                        fontWeight: 500,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        boxShadow: "0 2px 8px rgba(6, 182, 212, 0.4)",
                        zIndex: 10,
                    }}
                >
                    <Map size={14} />
                    View in map
                </button>
            </div>

            {/* Hotels Count */}
            <div
                style={{
                    padding: "12px 16px",
                    borderTop: "1px solid #f3f4f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                }}
                onClick={onViewFullMap}
            >
                <div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "#1f2937" }}>
                        {hotels.length} hotels on map
                    </div>
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>
                        Click to explore all locations
                    </div>
                </div>
                <ChevronRight size={20} color="#6b7280" />
            </div>

            {/* Global styles */}
            <style jsx global>{`
        .preview-price-marker {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
        </div>
    );
}

export default MapPreviewCard;
