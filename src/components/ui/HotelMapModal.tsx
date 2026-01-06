"use client";

// =============================================================================
// HOTEL MAP COMPONENT
// Interactive map with hotel markers using Leaflet/OpenStreetMap
// =============================================================================

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon, DivIcon, LatLngExpression } from "leaflet";
import { X, Navigation, ZoomIn, ZoomOut, Locate } from "lucide-react";
import "leaflet/dist/leaflet.css";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface Hotel {
    id: string;
    name: string;
    image: string;
    rating: number;
    ratingText: string;
    reviewCount: number;
    location: string;
    distance: string;
    pricePerNight: number;
    lat: number;
    lng: number;
}

interface HotelMapModalProps {
    isOpen: boolean;
    onClose: () => void;
    hotels: Hotel[];
    selectedHotel: Hotel | null;
    centerLat?: number;
    centerLng?: number;
}

// -----------------------------------------------------------------------------
// Custom Markers
// -----------------------------------------------------------------------------

const createPriceMarkerIcon = (price: number, isActive: boolean) => {
    return new DivIcon({
        className: "custom-price-marker",
        html: `
      <div style="
        background-color: ${isActive ? "#06b6d4" : "#ffffff"};
        color: ${isActive ? "#ffffff" : "#1f2937"};
        padding: 6px 12px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        box-shadow: ${isActive ? "0 4px 20px rgba(6, 182, 212, 0.4)" : "0 2px 8px rgba(0, 0, 0, 0.15)"};
        border: 2px solid ${isActive ? "#06b6d4" : "#e5e7eb"};
        white-space: nowrap;
        transform: ${isActive ? "scale(1.1)" : "scale(1)"};
        transition: all 0.2s ease;
        position: relative;
      ">
        $${price}
        <div style="
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid ${isActive ? "#06b6d4" : "#ffffff"};
        "></div>
      </div>
    `,
        iconSize: [80, 40],
        iconAnchor: [40, 40],
    });
};

// -----------------------------------------------------------------------------
// Map Controls Component
// -----------------------------------------------------------------------------

function MapControls() {
    const map = useMap();

    return (
        <div
            style={{
                position: "absolute",
                bottom: "24px",
                left: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                zIndex: 1000,
            }}
        >
            <button
                onClick={() => map.zoomIn()}
                style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <ZoomIn size={18} color="#374151" />
            </button>
            <button
                onClick={() => map.zoomOut()}
                style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <ZoomOut size={18} color="#374151" />
            </button>
            <button
                onClick={() => {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition((pos) => {
                            map.flyTo([pos.coords.latitude, pos.coords.longitude], 13);
                        });
                    }
                }}
                style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Locate size={18} color="#374151" />
            </button>
        </div>
    );
}

// -----------------------------------------------------------------------------
// Fly To Selected Hotel
// -----------------------------------------------------------------------------

function FlyToHotel({ hotel }: { hotel: Hotel | null }) {
    const map = useMap();

    useEffect(() => {
        if (hotel) {
            map.flyTo([hotel.lat, hotel.lng], 15, { duration: 1 });
        }
    }, [hotel, map]);

    return null;
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const mapOverlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(4px)",
};

const mapContainerStyle: React.CSSProperties = {
    width: "90vw",
    height: "85vh",
    maxWidth: "1400px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
};

const mapHeaderStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 24px",
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "#ffffff",
};

const mapContentStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    position: "relative",
};

const mapSidebarStyle: React.CSSProperties = {
    width: "380px",
    backgroundColor: "#ffffff",
    borderLeft: "1px solid #e5e7eb",
    overflowY: "auto",
};

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function HotelMapModal({
    isOpen,
    onClose,
    hotels,
    selectedHotel,
    centerLat = 48.8566,
    centerLng = 2.3522,
}: HotelMapModalProps) {
    const [activeHotel, setActiveHotel] = useState<Hotel | null>(selectedHotel);
    const [mapReady, setMapReady] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setActiveHotel(selectedHotel);
            // Delay to ensure proper mounting
            setTimeout(() => setMapReady(true), 100);
        } else {
            setMapReady(false);
        }
    }, [isOpen, selectedHotel]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const mapCenter: LatLngExpression = [centerLat, centerLng];

    return (
        <div style={mapOverlayStyle} onClick={onClose}>
            <div style={mapContainerStyle} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={mapHeaderStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div
                            style={{
                                width: "40px",
                                height: "40px",
                                backgroundColor: "#e0f7fa",
                                borderRadius: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Navigation size={20} color="#06b6d4" />
                        </div>
                        <div>
                            <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#1f2937", margin: 0 }}>
                                Hotels on Map
                            </h2>
                            <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
                                {hotels.length} properties available
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            width: "40px",
                            height: "40px",
                            border: "none",
                            backgroundColor: "#f3f4f6",
                            borderRadius: "50%",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "background-color 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5e7eb")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
                    >
                        <X size={20} color="#6b7280" />
                    </button>
                </div>

                {/* Map Content */}
                <div style={mapContentStyle}>
                    {/* Map View */}
                    <div style={{ flex: 1, position: "relative" }}>
                        {mapReady && (
                            <MapContainer
                                center={mapCenter}
                                zoom={13}
                                style={{ width: "100%", height: "100%" }}
                                zoomControl={false}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                {hotels.map((hotel) => (
                                    <Marker
                                        key={hotel.id}
                                        position={[hotel.lat, hotel.lng]}
                                        icon={createPriceMarkerIcon(hotel.pricePerNight, activeHotel?.id === hotel.id)}
                                        eventHandlers={{
                                            click: () => setActiveHotel(hotel),
                                        }}
                                    >
                                        <Popup>
                                            <div style={{ padding: "8px", minWidth: "200px" }}>
                                                <img
                                                    src={hotel.image}
                                                    alt={hotel.name}
                                                    style={{
                                                        width: "100%",
                                                        height: "100px",
                                                        objectFit: "cover",
                                                        borderRadius: "8px",
                                                        marginBottom: "8px",
                                                    }}
                                                />
                                                <h4 style={{ fontSize: "14px", fontWeight: 600, margin: "0 0 4px 0" }}>
                                                    {hotel.name}
                                                </h4>
                                                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                                                    <span
                                                        style={{
                                                            backgroundColor: "#06b6d4",
                                                            color: "#fff",
                                                            padding: "2px 6px",
                                                            borderRadius: "4px",
                                                            fontSize: "11px",
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        {hotel.rating}
                                                    </span>
                                                    <span style={{ fontSize: "12px", color: "#6b7280" }}>{hotel.ratingText}</span>
                                                </div>
                                                <div style={{ fontSize: "18px", fontWeight: 600, color: "#1f2937" }}>
                                                    ${hotel.pricePerNight}
                                                    <span style={{ fontSize: "12px", fontWeight: 400, color: "#6b7280" }}> / night</span>
                                                </div>
                                            </div>
                                        </Popup>
                                    </Marker>
                                ))}

                                <MapControls />
                                <FlyToHotel hotel={activeHotel} />
                            </MapContainer>
                        )}

                        {/* View in map button overlay - similar to reference */}
                        <div
                            style={{
                                position: "absolute",
                                bottom: "24px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                zIndex: 1000,
                            }}
                        >
                            <button
                                style={{
                                    backgroundColor: "#06b6d4",
                                    color: "#ffffff",
                                    border: "none",
                                    borderRadius: "24px",
                                    padding: "12px 32px",
                                    fontSize: "15px",
                                    fontWeight: 500,
                                    cursor: "pointer",
                                    boxShadow: "0 4px 20px rgba(6, 182, 212, 0.4)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                }}
                            >
                                <Navigation size={18} />
                                View in map
                            </button>
                        </div>
                    </div>

                    {/* Hotel List Sidebar */}
                    <div style={mapSidebarStyle}>
                        <div style={{ padding: "16px", borderBottom: "1px solid #e5e7eb" }}>
                            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937", margin: 0 }}>
                                Available Hotels
                            </h3>
                        </div>

                        {hotels.map((hotel) => (
                            <div
                                key={hotel.id}
                                onClick={() => setActiveHotel(hotel)}
                                style={{
                                    padding: "16px",
                                    borderBottom: "1px solid #f3f4f6",
                                    cursor: "pointer",
                                    backgroundColor: activeHotel?.id === hotel.id ? "#f0fdfa" : "#ffffff",
                                    transition: "background-color 0.2s",
                                    borderLeft: activeHotel?.id === hotel.id ? "3px solid #06b6d4" : "3px solid transparent",
                                }}
                            >
                                <div style={{ display: "flex", gap: "12px" }}>
                                    <img
                                        src={hotel.image}
                                        alt={hotel.name}
                                        style={{
                                            width: "80px",
                                            height: "60px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <h4
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                color: "#1f2937",
                                                margin: "0 0 4px 0",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {hotel.name}
                                        </h4>
                                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                                            <span
                                                style={{
                                                    backgroundColor: "#06b6d4",
                                                    color: "#fff",
                                                    padding: "2px 6px",
                                                    borderRadius: "4px",
                                                    fontSize: "11px",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {hotel.rating}
                                            </span>
                                            <span style={{ fontSize: "12px", color: "#6b7280" }}>{hotel.ratingText}</span>
                                        </div>
                                        <div style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937" }}>
                                            ${hotel.pricePerNight}
                                            <span style={{ fontSize: "12px", fontWeight: 400, color: "#6b7280" }}> / night</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Global styles for Leaflet customization */}
            <style jsx global>{`
        .custom-price-marker {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          padding: 0 !important;
          overflow: hidden;
        }
        .leaflet-popup-content {
          margin: 0 !important;
        }
        .leaflet-popup-tip {
          background: #ffffff !important;
        }
      `}</style>
        </div>
    );
}

export default HotelMapModal;
