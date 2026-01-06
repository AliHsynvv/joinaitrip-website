"use client";

// =============================================================================
// HOTEL DETAIL MODAL
// Comprehensive hotel detail view matching the reference design
// =============================================================================

import { useState, useEffect } from "react";
import dynamicImport from "next/dynamic";
import {
    X,
    MapPin,
    Star,
    Car,
    Waves,
    Wifi,
    Coffee,
    Dumbbell,
    ChevronLeft,
    ChevronRight,
    Check,
    Users,
    Bed,
    Eye,
    Share2,
    Heart
} from "lucide-react";
import "leaflet/dist/leaflet.css";

// Dynamically import the map to avoid SSR issues
const MapContainer = dynamicImport(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamicImport(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false }
);
const Marker = dynamicImport(
    () => import("react-leaflet").then((mod) => mod.Marker),
    { ssr: false }
);

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
    roomType: string;
    bedInfo: string;
    features: string[];
    pricePerNight: number;
    originalPrice?: number;
    nights: number;
    adults: number;
    lat: number;
    lng: number;
}

interface Room {
    id: string;
    name: string;
    image: string;
    rating: number;
    ratingText: string;
    reviewCount: number;
    amenities: string[];
    cancellationPolicy: {
        nonRefundable: number;
        refundable: number;
        refundableDate: string;
    };
    extras: { name: string; price: number }[];
    pricePerNight: number;
    totalPrice: number;
}

interface HotelDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    hotel: Hotel | null;
}

// Sample room data
const SAMPLE_ROOMS: Room[] = [
    {
        id: "1",
        name: "Room, 1 King Bed",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop",
        rating: 9.1,
        ratingText: "Wonderful",
        reviewCount: 75,
        amenities: ["Self parking", "Free wifi", "City view"],
        cancellationPolicy: {
            nonRefundable: 0,
            refundable: 849,
            refundableDate: "Sep 10",
        },
        extras: [
            { name: "No extras", price: 0 },
            { name: "Breakfast buffet", price: 0 },
        ],
        pricePerNight: 94,
        totalPrice: 769,
    },
    {
        id: "2",
        name: "Room, 2 Twin Beds",
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&h=300&fit=crop",
        rating: 9.1,
        ratingText: "Wonderful",
        reviewCount: 75,
        amenities: ["Self parking", "Free wifi", "City view"],
        cancellationPolicy: {
            nonRefundable: 0,
            refundable: 849,
            refundableDate: "Sep 10",
        },
        extras: [
            { name: "No extras", price: 0 },
            { name: "Breakfast buffet", price: 0 },
        ],
        pricePerNight: 94,
        totalPrice: 769,
    },
    {
        id: "3",
        name: "Deluxe Room",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
        rating: 9.4,
        ratingText: "Wonderful",
        reviewCount: 62,
        amenities: ["Self parking", "Free wifi", "City view"],
        cancellationPolicy: {
            nonRefundable: 0,
            refundable: 849,
            refundableDate: "Sep 10",
        },
        extras: [
            { name: "No extras", price: 0 },
            { name: "Breakfast buffet", price: 0 },
        ],
        pricePerNight: 94,
        totalPrice: 769,
    },
];

// Sample additional images
const ADDITIONAL_IMAGES = [
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=200&h=150&fit=crop",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=200&h=150&fit=crop",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&h=150&fit=crop",
    "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=200&h=150&fit=crop",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=200&h=150&fit=crop",
];

// Nearby places
const NEARBY_PLACES = [
    { name: "Yuexiu Park", distance: "1 min walk" },
    { name: "Beijing Road Pedestrian S...", distance: "10 min walk" },
    { name: "Shangxiajiu Pedestrian St...", distance: "4 min drive" },
    { name: "Guangzhou (CAN-Baiyun...", distance: "27 min drive" },
];

// Amenities
const AMENITIES = [
    { icon: Car, label: "Self-parking" },
    { icon: Waves, label: "Full-service spa" },
    { icon: Wifi, label: "Free WiFi" },
    { icon: Coffee, label: "2 restaurants" },
    { icon: Dumbbell, label: "Fitness center" },
    { icon: Coffee, label: "Breakfast" },
];

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
    overflowY: "auto",
    padding: "20px",
};

const modalStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    maxWidth: "1200px",
    margin: "0 auto",
    overflow: "hidden",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
};

const headerStyle: React.CSSProperties = {
    padding: "16px 24px",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    backgroundColor: "#ffffff",
    position: "sticky",
    top: 0,
    zIndex: 10,
};

const searchBarStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flex: 1,
};

const inputStyle: React.CSSProperties = {
    padding: "10px 16px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#ffffff",
};

const sectionStyle: React.CSSProperties = {
    padding: "24px",
    borderBottom: "1px solid #f3f4f6",
};

const roomCardStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    overflow: "hidden",
    flex: 1,
    minWidth: "280px",
};

// -----------------------------------------------------------------------------
// Sub Components
// -----------------------------------------------------------------------------

function RoomCard({ room, onReserve }: { room: Room; onReserve: () => void }) {
    return (
        <div style={roomCardStyle}>
            {/* Room Image */}
            <div style={{ position: "relative", height: "160px" }}>
                <img
                    src={room.image}
                    alt={room.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        backgroundColor: "rgba(0,0,0,0.6)",
                        color: "#fff",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                    }}
                >
                    1/{ADDITIONAL_IMAGES.length}
                </div>
            </div>

            {/* Room Info */}
            <div style={{ padding: "16px" }}>
                <h4 style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937", marginBottom: "8px" }}>
                    {room.name}
                </h4>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <span
                        style={{
                            backgroundColor: "#06b6d4",
                            color: "#fff",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: 600,
                        }}
                    >
                        {room.rating}
                    </span>
                    <span style={{ fontSize: "13px", color: "#1f2937", fontWeight: 500 }}>
                        {room.ratingText}
                    </span>
                    <span style={{ fontSize: "12px", color: "#6b7280" }}>
                        {room.reviewCount} reviews
                    </span>
                </div>

                {/* Amenities */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
                    {room.amenities.map((amenity, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <Check size={14} color="#10b981" />
                            <span style={{ fontSize: "13px", color: "#4b5563" }}>{amenity}</span>
                        </div>
                    ))}
                </div>

                <a href="#" style={{ fontSize: "13px", color: "#06b6d4", textDecoration: "none" }}>
                    More details →
                </a>

                {/* Cancellation Policy */}
                <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #f3f4f6" }}>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#1f2937", marginBottom: "8px" }}>
                        Cancellation policy
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <input type="radio" name={`cancel-${room.id}`} defaultChecked />
                            <span>Non-Refundable</span>
                            <span style={{ marginLeft: "auto", color: "#6b7280" }}>+$0</span>
                        </label>
                        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <input type="radio" name={`cancel-${room.id}`} />
                            <span>Fully refundable before {room.cancellationPolicy.refundableDate}</span>
                            <span style={{ marginLeft: "auto", color: "#6b7280" }}>+${room.cancellationPolicy.refundable}</span>
                        </label>
                    </div>
                </div>

                {/* Extras */}
                <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #f3f4f6" }}>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#1f2937", marginBottom: "8px" }}>
                        Extras
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px" }}>
                        {room.extras.map((extra, idx) => (
                            <label key={idx} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <input type="checkbox" />
                                <span>{extra.name}</span>
                                <span style={{ marginLeft: "auto", color: "#6b7280" }}>+${extra.price}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Pricing */}
                <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #f3f4f6" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                        <div>
                            <div style={{ fontSize: "12px", color: "#6b7280" }}>${room.pricePerNight} nightly</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: "20px", fontWeight: 600, color: "#1f2937" }}>
                                ${room.totalPrice} total
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reserve Button */}
                <button
                    onClick={onReserve}
                    style={{
                        width: "100%",
                        backgroundColor: "#06b6d4",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "8px",
                        padding: "12px",
                        fontSize: "14px",
                        fontWeight: 600,
                        cursor: "pointer",
                        marginTop: "16px",
                    }}
                >
                    Reserve
                </button>
            </div>
        </div>
    );
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function HotelDetailModal({ isOpen, onClose, hotel }: HotelDetailModalProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [mapReady, setMapReady] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            setTimeout(() => setMapReady(true), 200);
        } else {
            document.body.style.overflow = "";
            setMapReady(false);
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen || !hotel) return null;

    const allImages = [hotel.image, ...ADDITIONAL_IMAGES];

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={headerStyle}>
                    <div style={searchBarStyle}>
                        <div style={inputStyle}>
                            <MapPin size={16} color="#6b7280" />
                            <span style={{ fontSize: "14px", color: "#374151" }}>{hotel.location}</span>
                        </div>
                        <div style={inputStyle}>
                            <span style={{ fontSize: "14px", color: "#374151" }}>Check-in</span>
                        </div>
                        <div style={inputStyle}>
                            <span style={{ fontSize: "14px", color: "#374151" }}>Check-out</span>
                        </div>
                        <button
                            style={{
                                backgroundColor: "#06b6d4",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                padding: "10px 20px",
                                cursor: "pointer",
                            }}
                        >
                            Search
                        </button>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            backgroundColor: "#f3f4f6",
                            border: "none",
                            borderRadius: "50%",
                            width: "40px",
                            height: "40px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <X size={20} color="#6b7280" />
                    </button>
                </div>

                {/* Hotel Title Section */}
                <div style={{ padding: "20px 24px", borderBottom: "1px solid #f3f4f6" }}>
                    <h1 style={{ fontSize: "24px", fontWeight: 600, color: "#1f2937", marginBottom: "8px" }}>
                        {hotel.name}
                    </h1>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                        <a href="#" style={{ fontSize: "14px", color: "#06b6d4" }}>{hotel.location}</a>
                        <span style={{ color: "#6b7280" }}>•</span>
                        <a href="#" style={{ fontSize: "14px", color: "#06b6d4" }}>Show on map</a>
                        <span style={{ color: "#6b7280" }}>•</span>
                        <span style={{ fontSize: "14px", color: "#6b7280" }}>Center: {hotel.distance}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span
                            style={{
                                backgroundColor: "#06b6d4",
                                color: "#fff",
                                padding: "4px 10px",
                                borderRadius: "6px",
                                fontSize: "14px",
                                fontWeight: 600,
                            }}
                        >
                            {hotel.rating}
                        </span>
                        <span style={{ fontSize: "14px", fontWeight: 500, color: "#1f2937" }}>
                            {hotel.ratingText}
                        </span>
                        <span style={{ fontSize: "14px", color: "#6b7280" }}>
                            {hotel.reviewCount} reviews
                        </span>
                        <div style={{ marginLeft: "auto", display: "flex", gap: "12px" }}>
                            <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", color: "#6b7280" }}>
                                <Share2 size={16} /> Share
                            </button>
                            <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", color: "#6b7280" }}>
                                <Heart size={16} /> Save
                            </button>
                        </div>
                    </div>
                </div>

                {/* Image Gallery */}
                <div style={{ padding: "0 24px", marginTop: "20px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                        {/* Main Image */}
                        <div style={{ flex: 2, position: "relative" }}>
                            <img
                                src={allImages[selectedImageIndex]}
                                alt={hotel.name}
                                style={{
                                    width: "100%",
                                    height: "300px",
                                    objectFit: "cover",
                                    borderRadius: "12px",
                                }}
                            />
                        </div>
                        {/* Thumbnail Grid */}
                        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                            {allImages.slice(1, 5).map((img, idx) => (
                                <div
                                    key={idx}
                                    style={{ position: "relative", cursor: "pointer" }}
                                    onClick={() => setSelectedImageIndex(idx + 1)}
                                >
                                    <img
                                        src={img}
                                        alt=""
                                        style={{
                                            width: "100%",
                                            height: "72px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                            opacity: selectedImageIndex === idx + 1 ? 1 : 0.8,
                                        }}
                                    />
                                    {idx === 3 && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                                backgroundColor: "rgba(0,0,0,0.5)",
                                                borderRadius: "8px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "#fff",
                                                fontSize: "14px",
                                                fontWeight: 500,
                                            }}
                                        >
                                            +{allImages.length - 4}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* About & Map Section */}
                <div style={{ display: "flex", gap: "24px", padding: "24px" }}>
                    {/* About this property */}
                    <div style={{ flex: 1 }}>
                        <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#1f2937", marginBottom: "16px" }}>
                            About this property
                        </h2>

                        {/* Amenities Grid */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "16px" }}>
                            {AMENITIES.map((amenity, idx) => (
                                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <amenity.icon size={18} color="#6b7280" />
                                    <span style={{ fontSize: "14px", color: "#4b5563" }}>{amenity.label}</span>
                                </div>
                            ))}
                        </div>

                        <a href="#" style={{ fontSize: "14px", color: "#06b6d4", display: "block", marginBottom: "16px" }}>
                            Show more
                        </a>

                        <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.6, marginBottom: "16px" }}>
                            Luxury family-friendly hotel near Beijing Road Pedestrian Street. Located close to Guangzhou Zoo and Shangxiajiu Pedestrian Street, Yuexiu Hotel Guangzhou, Curio Collection by Hilton provides a nightclub, a garden, and an air-conditioned room. Indulge in some rest and relaxation at Bo Yunhai Spa, the onsite spa. Be sure to enjoy a meal at the two on-site restaurants. Free in-room WiFi is available to all guests, along with a bar and a gym.
                        </p>

                        <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937", marginBottom: "12px" }}>
                            Room features
                        </h3>
                        <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.6, marginBottom: "12px" }}>
                            All 200 individually decorated rooms feature comforts such as laptop-compatible safes and laptop-friendly workspaces. In addition to thoughtful touches like air conditioning and bathrooms.
                        </p>
                        <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>
                            More conveniences in all rooms include:
                        </p>
                        <ul style={{ fontSize: "14px", color: "#6b7280", paddingLeft: "20px", lineHeight: 1.8 }}>
                            <li>Bathtub showers, tubs or showers, and hair dryers</li>
                            <li>50-inch LED TVs with cable channels</li>
                            <li>Wardrobes/closets, kitchenettes, and mini fridges</li>
                        </ul>
                    </div>

                    {/* Explore the area */}
                    <div style={{ width: "320px" }}>
                        <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#1f2937", marginBottom: "16px" }}>
                            Explore the area
                        </h2>

                        {/* Mini Map */}
                        <div style={{ height: "180px", borderRadius: "12px", overflow: "hidden", marginBottom: "16px", backgroundColor: "#f3f4f6" }}>
                            {mapReady && (
                                <MapContainer
                                    center={[hotel.lat, hotel.lng]}
                                    zoom={14}
                                    style={{ width: "100%", height: "100%" }}
                                    zoomControl={false}
                                    dragging={false}
                                    scrollWheelZoom={false}
                                >
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                </MapContainer>
                            )}
                            <button
                                style={{
                                    position: "relative",
                                    top: "-40px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    backgroundColor: "#06b6d4",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "20px",
                                    padding: "8px 16px",
                                    fontSize: "13px",
                                    cursor: "pointer",
                                    zIndex: 10,
                                }}
                            >
                                View in map
                            </button>
                        </div>

                        {/* Nearby Places */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {NEARBY_PLACES.map((place, idx) => (
                                <div key={idx} style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span style={{ fontSize: "14px", color: "#4b5563" }}>{place.name}</span>
                                    <span style={{ fontSize: "14px", color: "#6b7280" }}>{place.distance}</span>
                                </div>
                            ))}
                        </div>

                        <a href="#" style={{ fontSize: "14px", color: "#06b6d4", display: "block", marginTop: "12px" }}>
                            Show more
                        </a>
                    </div>
                </div>

                {/* Choose your room */}
                <div style={sectionStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                        <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#1f2937" }}>
                            Choose your room
                        </h2>
                        <div style={{ display: "flex", gap: "8px" }}>
                            <button style={{
                                padding: "6px 16px",
                                border: "2px solid #06b6d4",
                                borderRadius: "20px",
                                backgroundColor: "#ffffff",
                                color: "#06b6d4",
                                fontSize: "13px",
                                fontWeight: 500,
                                cursor: "pointer",
                            }}>
                                All room
                            </button>
                            <button style={{
                                padding: "6px 16px",
                                border: "1px solid #e5e7eb",
                                borderRadius: "20px",
                                backgroundColor: "#ffffff",
                                color: "#6b7280",
                                fontSize: "13px",
                                cursor: "pointer",
                            }}>
                                1 bed
                            </button>
                            <button style={{
                                padding: "6px 16px",
                                border: "1px solid #e5e7eb",
                                borderRadius: "20px",
                                backgroundColor: "#ffffff",
                                color: "#6b7280",
                                fontSize: "13px",
                                cursor: "pointer",
                            }}>
                                2 beds
                            </button>
                        </div>
                    </div>

                    {/* Room Cards */}
                    <div style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "16px" }}>
                        {SAMPLE_ROOMS.map((room) => (
                            <RoomCard
                                key={room.id}
                                room={room}
                                onReserve={() => {
                                    alert(`Room "${room.name}" reserved! Total: $${room.totalPrice}`);
                                    onClose();
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HotelDetailModal;
