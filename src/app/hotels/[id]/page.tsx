"use client";

// =============================================================================
// HOTEL DETAIL PAGE
// Comprehensive hotel detail view as a separate page
// =============================================================================

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import dynamicImport from "next/dynamic";
import {
    MapPin,
    Star,
    Car,
    Waves,
    Wifi,
    Coffee,
    Dumbbell,
    ChevronLeft,
    Check,
    Share2,
    Heart,
    ArrowLeft,
    CalendarDays,
    Search
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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

// -----------------------------------------------------------------------------
// Sample Data
// -----------------------------------------------------------------------------

const SAMPLE_HOTELS: Hotel[] = [
    {
        id: "1",
        name: "Crowne Plaza Guangzhou Huadu by IHG",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        rating: 9.1,
        ratingText: "Wonderful",
        reviewCount: 1083,
        location: "Tai He, Guangzhou",
        distance: "2.1km",
        roomType: "King Guest Room",
        bedInfo: "1 ekstra büyük çift kişilik yatak",
        features: ["Breakfast included", "Free cancellation", "No upfront payment required - Pay on site"],
        pricePerNight: 252,
        nights: 3,
        adults: 1,
        lat: 48.8566,
        lng: 2.3522
    },
    {
        id: "2",
        name: "Four Seasons Hotel Dubai",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop",
        rating: 9.4,
        ratingText: "Exceptional",
        reviewCount: 2341,
        location: "Downtown Dubai",
        distance: "0.5km",
        roomType: "Deluxe Suite",
        bedInfo: "1 king size bed",
        features: ["Breakfast included", "Free cancellation", "Spa access included"],
        pricePerNight: 485,
        originalPrice: 550,
        nights: 3,
        adults: 2,
        lat: 48.8606,
        lng: 2.3376
    },
    {
        id: "3",
        name: "The Ritz-Carlton Tokyo",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
        rating: 9.6,
        ratingText: "Exceptional",
        reviewCount: 1876,
        location: "Roppongi, Tokyo",
        distance: "1.2km",
        roomType: "Club Room",
        bedInfo: "2 queen beds",
        features: ["Breakfast included", "Free cancellation", "Club lounge access"],
        pricePerNight: 620,
        nights: 3,
        adults: 2,
        lat: 48.8738,
        lng: 2.2950
    },
    {
        id: "4",
        name: "Park Hyatt Paris-Vendôme",
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
        rating: 9.3,
        ratingText: "Wonderful",
        reviewCount: 1542,
        location: "Opera District, Paris",
        distance: "0.3km",
        roomType: "Park Deluxe Room",
        bedInfo: "1 king bed",
        features: ["Breakfast included", "Free cancellation", "No upfront payment required"],
        pricePerNight: 890,
        originalPrice: 1050,
        nights: 3,
        adults: 2,
        lat: 48.8690,
        lng: 2.3310
    },
    {
        id: "5",
        name: "Marina Bay Sands Singapore",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
        rating: 9.0,
        ratingText: "Wonderful",
        reviewCount: 4521,
        location: "Marina Bay, Singapore",
        distance: "2.0km",
        roomType: "Deluxe Room",
        bedInfo: "1 king bed",
        features: ["Infinity pool access", "Free cancellation", "City view"],
        pricePerNight: 445,
        nights: 3,
        adults: 2,
        lat: 48.8530,
        lng: 2.3499
    },
    {
        id: "6",
        name: "Burj Al Arab Jumeirah",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",
        rating: 9.8,
        ratingText: "Exceptional",
        reviewCount: 3241,
        location: "Jumeirah Beach, Dubai",
        distance: "5.0km",
        roomType: "Deluxe Suite",
        bedInfo: "1 king bed",
        features: ["Butler service", "Free cancellation", "Private beach"],
        pricePerNight: 1850,
        nights: 3,
        adults: 2,
        lat: 48.8650,
        lng: 2.3200
    }
];

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

const ADDITIONAL_IMAGES = [
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&h=300&fit=crop",
];

const NEARBY_PLACES = [
    { name: "Yuexiu Park", distance: "1 min walk" },
    { name: "Beijing Road Pedestrian S...", distance: "10 min walk" },
    { name: "Shangxiajiu Pedestrian St...", distance: "4 min drive" },
    { name: "Guangzhou (CAN-Baiyun...", distance: "27 min drive" },
];

const AMENITIES = [
    { icon: Car, label: "Self-parking" },
    { icon: Waves, label: "Full-service spa" },
    { icon: Wifi, label: "Free WiFi" },
    { icon: Coffee, label: "2 restaurants" },
    { icon: Dumbbell, label: "Fitness center" },
    { icon: Coffee, label: "Breakfast" },
];

// -----------------------------------------------------------------------------
// Room Card Component
// -----------------------------------------------------------------------------

function RoomCard({ room, onReserve }: { room: Room; onReserve: () => void }) {
    return (
        <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            overflow: "hidden",
            flex: 1,
            minWidth: "300px",
            maxWidth: "350px",
        }}>
            {/* Room Image */}
            <div style={{ position: "relative", height: "180px" }}>
                <img
                    src={room.image}
                    alt={room.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                }}>
                    1/{ADDITIONAL_IMAGES.length}
                </div>
            </div>

            {/* Room Info */}
            <div style={{ padding: "16px" }}>
                <h4 style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937", marginBottom: "8px" }}>
                    {room.name}
                </h4>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <span style={{
                        backgroundColor: "#06b6d4",
                        color: "#fff",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: 600,
                    }}>
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
// Main Page Component
// -----------------------------------------------------------------------------

export default function HotelDetailPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [mapReady, setMapReady] = useState(false);

    const hotelId = params.id as string;
    const hotel = SAMPLE_HOTELS.find(h => h.id === hotelId);

    const location = searchParams.get("location") || hotel?.location || "";
    const checkIn = searchParams.get("checkIn") || "Check-in";
    const checkOut = searchParams.get("checkOut") || "Check-out";

    useEffect(() => {
        setTimeout(() => setMapReady(true), 200);
    }, []);

    if (!hotel) {
        return (
            <div style={{ padding: "100px", textAlign: "center" }}>
                <h1>Hotel not found</h1>
                <button onClick={() => router.push("/hotels")} style={{ marginTop: "20px", padding: "10px 20px" }}>
                    Back to Hotels
                </button>
            </div>
        );
    }

    const allImages = [hotel.image, ...ADDITIONAL_IMAGES];

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", paddingTop: "72px" }}>
            <Header />

            {/* Search Bar */}
            <div style={{
                backgroundColor: "#ffffff",
                borderBottom: "1px solid #e5e7eb",
                padding: "16px 0",
            }}>
                <div style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                }}>
                    <button
                        onClick={() => router.back()}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            backgroundColor: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color: "#6b7280",
                            fontSize: "14px",
                        }}
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>

                    <div style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px 16px",
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                    }}>
                        <MapPin size={16} color="#6b7280" />
                        <span style={{ fontSize: "14px", color: "#374151" }}>{location}</span>
                    </div>

                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px 16px",
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                    }}>
                        <CalendarDays size={16} color="#6b7280" />
                        <span style={{ fontSize: "14px", color: "#374151" }}>{checkIn}</span>
                    </div>

                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px 16px",
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                    }}>
                        <CalendarDays size={16} color="#6b7280" />
                        <span style={{ fontSize: "14px", color: "#374151" }}>{checkOut}</span>
                    </div>

                    <button style={{
                        backgroundColor: "#06b6d4",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        padding: "10px 20px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Search size={18} />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
                {/* Hotel Title Section */}
                <div style={{ marginBottom: "24px" }}>
                    <h1 style={{ fontSize: "28px", fontWeight: 600, color: "#1f2937", marginBottom: "8px" }}>
                        {hotel.name}
                    </h1>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                        <a href="#" style={{ fontSize: "14px", color: "#06b6d4" }}>{hotel.location}</a>
                        <span style={{ color: "#6b7280" }}>•</span>
                        <a href="#" style={{ fontSize: "14px", color: "#06b6d4" }}>Show on map</a>
                        <span style={{ color: "#6b7280" }}>•</span>
                        <span style={{ fontSize: "14px", color: "#6b7280" }}>Center: {hotel.distance}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{
                            backgroundColor: "#06b6d4",
                            color: "#fff",
                            padding: "4px 10px",
                            borderRadius: "6px",
                            fontSize: "14px",
                            fontWeight: 600,
                        }}>
                            {hotel.rating}
                        </span>
                        <span style={{ fontSize: "14px", fontWeight: 500, color: "#1f2937" }}>
                            {hotel.ratingText}
                        </span>
                        <span style={{ fontSize: "14px", color: "#6b7280" }}>
                            {hotel.reviewCount} reviews
                        </span>
                        <div style={{ marginLeft: "auto", display: "flex", gap: "16px" }}>
                            <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", color: "#6b7280", fontSize: "14px" }}>
                                <Share2 size={16} /> Share
                            </button>
                            <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", color: "#6b7280", fontSize: "14px" }}>
                                <Heart size={16} /> Save
                            </button>
                        </div>
                    </div>
                </div>

                {/* Image Gallery */}
                <div style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
                    {/* Main Image */}
                    <div style={{ flex: 2, position: "relative" }}>
                        <img
                            src={allImages[selectedImageIndex]}
                            alt={hotel.name}
                            style={{
                                width: "100%",
                                height: "400px",
                                objectFit: "cover",
                                borderRadius: "12px",
                            }}
                        />
                    </div>
                    {/* Thumbnail Grid */}
                    <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
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
                                        height: "94px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                        opacity: selectedImageIndex === idx + 1 ? 1 : 0.85,
                                        border: selectedImageIndex === idx + 1 ? "2px solid #06b6d4" : "none",
                                    }}
                                />
                                {idx === 3 && allImages.length > 5 && (
                                    <div style={{
                                        position: "absolute",
                                        inset: 0,
                                        backgroundColor: "rgba(0,0,0,0.5)",
                                        borderRadius: "8px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#fff",
                                        fontSize: "16px",
                                        fontWeight: 500,
                                    }}>
                                        +{allImages.length - 4}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* About & Map Section */}
                <div style={{ display: "flex", gap: "32px", marginBottom: "40px" }}>
                    {/* About this property */}
                    <div style={{ flex: 1 }}>
                        <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#1f2937", marginBottom: "20px" }}>
                            About this property
                        </h2>

                        {/* Amenities Grid */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "20px" }}>
                            {AMENITIES.map((amenity, idx) => (
                                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <amenity.icon size={20} color="#6b7280" />
                                    <span style={{ fontSize: "14px", color: "#4b5563" }}>{amenity.label}</span>
                                </div>
                            ))}
                        </div>

                        <a href="#" style={{ fontSize: "14px", color: "#06b6d4", display: "block", marginBottom: "20px" }}>
                            Show more
                        </a>

                        <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.7, marginBottom: "20px" }}>
                            Luxury family-friendly hotel near Beijing Road Pedestrian Street. Located close to Guangzhou Zoo and Shangxiajiu Pedestrian Street, Yuexiu Hotel Guangzhou, Curio Collection by Hilton provides a nightclub, a garden, and an air-conditioned room. Indulge in some rest and relaxation at Bo Yunhai Spa, the onsite spa. Be sure to enjoy a meal at the two on-site restaurants. Free in-room WiFi is available to all guests, along with a bar and a gym.
                        </p>

                        <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1f2937", marginBottom: "12px" }}>
                            Room features
                        </h3>
                        <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.7, marginBottom: "12px" }}>
                            All 200 individually decorated rooms feature comforts such as laptop-compatible safes and laptop-friendly workspaces. In addition to thoughtful touches like air conditioning and bathrooms.
                        </p>
                        <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>
                            More conveniences in all rooms include:
                        </p>
                        <ul style={{ fontSize: "14px", color: "#6b7280", paddingLeft: "20px", lineHeight: 1.9 }}>
                            <li>Bathtub showers, tubs or showers, and hair dryers</li>
                            <li>50-inch LED TVs with cable channels</li>
                            <li>Wardrobes/closets, kitchenettes, and mini fridges</li>
                        </ul>
                    </div>

                    {/* Explore the area */}
                    <div style={{ width: "360px" }}>
                        <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#1f2937", marginBottom: "20px" }}>
                            Explore the area
                        </h2>

                        {/* Mini Map */}
                        <div style={{ height: "200px", borderRadius: "12px", overflow: "hidden", marginBottom: "20px", backgroundColor: "#e5e7eb", position: "relative" }}>
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
                            <button style={{
                                position: "absolute",
                                bottom: "12px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                backgroundColor: "#06b6d4",
                                color: "#fff",
                                border: "none",
                                borderRadius: "20px",
                                padding: "8px 20px",
                                fontSize: "13px",
                                cursor: "pointer",
                                zIndex: 1000,
                            }}>
                                View in map
                            </button>
                        </div>

                        {/* Nearby Places */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                            {NEARBY_PLACES.map((place, idx) => (
                                <div key={idx} style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span style={{ fontSize: "14px", color: "#4b5563" }}>{place.name}</span>
                                    <span style={{ fontSize: "14px", color: "#6b7280" }}>{place.distance}</span>
                                </div>
                            ))}
                        </div>

                        <a href="#" style={{ fontSize: "14px", color: "#06b6d4", display: "block", marginTop: "16px" }}>
                            Show more
                        </a>
                    </div>
                </div>

                {/* Choose your room */}
                <div style={{ marginBottom: "40px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                        <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#1f2937" }}>
                            Choose your room
                        </h2>
                        <div style={{ display: "flex", gap: "8px" }}>
                            <button style={{
                                padding: "8px 20px",
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
                                padding: "8px 20px",
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
                                padding: "8px 20px",
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
                    <div style={{ display: "flex", gap: "20px", overflowX: "auto", paddingBottom: "16px" }}>
                        {SAMPLE_ROOMS.map((room) => (
                            <RoomCard
                                key={room.id}
                                room={room}
                                onReserve={() => {
                                    const params = new URLSearchParams();
                                    params.set("roomId", room.id);
                                    params.set("checkIn", checkIn);
                                    params.set("checkOut", checkOut);
                                    router.push(`/hotels/${hotel.id}/reserve?${params.toString()}`);
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* FAQ & Policies Section */}
                <div style={{ display: "flex", gap: "48px", marginBottom: "48px" }}>
                    {/* Frequently Asked Questions */}
                    <div style={{ flex: 1 }}>
                        <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#1f2937", marginBottom: "24px" }}>
                            Frequently asked questions
                        </h2>

                        {[
                            { q: `Is ${hotel.name} pet-friendly?`, a: "No, pets are not allowed at this property." },
                            { q: `How much is parking at ${hotel.name}?`, a: "" },
                            { q: `What time is check-in at ${hotel.name}?`, a: "" },
                            { q: `What time is check-out at ${hotel.name}?`, a: "" },
                            { q: `Where is ${hotel.name} located?`, a: "" },
                        ].map((faq, idx) => (
                            <div key={idx} style={{
                                borderBottom: "1px solid #e5e7eb",
                                paddingBottom: "12px",
                                marginBottom: "12px"
                            }}>
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    cursor: "pointer"
                                }}>
                                    <span style={{ fontSize: "14px", color: "#1f2937" }}>{faq.q}</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </div>
                                {faq.a && (
                                    <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "8px" }}>{faq.a}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Policies */}
                    <div style={{ flex: 1 }}>
                        <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#1f2937", marginBottom: "24px" }}>
                            Policies
                        </h2>

                        <div style={{ marginBottom: "20px" }}>
                            <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#1f2937", marginBottom: "4px" }}>Check-in</h4>
                            <p style={{ fontSize: "13px", color: "#6b7280" }}>Check-in start time: 2:00 PM;</p>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#1f2937", marginBottom: "4px" }}>Check-out</h4>
                            <p style={{ fontSize: "13px", color: "#6b7280" }}>Check-out before noon</p>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#1f2937", marginBottom: "4px" }}>Special check-in instructions</h4>
                            <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.6 }}>
                                This property offers transfers from the airport; guests must contact the property with arrival details before travel, using the contact information on the booking confirmation. Front desk staff will greet guests on arrival at the property.
                            </p>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#1f2937", marginBottom: "4px" }}>Pets</h4>
                            <p style={{ fontSize: "13px", color: "#6b7280" }}>Pets not allowed</p>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#1f2937", marginBottom: "4px" }}>Children and extra beds</h4>
                            <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.6 }}>
                                Children are welcome.<br />
                                Rollaway/extra beds are not available.<br />
                                Cribs (infant beds) are not available.
                            </p>
                        </div>
                    </div>
                </div>

                {/* From Guests Staying Here */}
                <div style={{ marginBottom: "48px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                        <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#1f2937" }}>
                            From guests staying here
                        </h2>
                        <div style={{ display: "flex", gap: "8px" }}>
                            <button style={{
                                width: "36px", height: "36px",
                                borderRadius: "50%", border: "1px solid #e5e7eb",
                                backgroundColor: "#fff", cursor: "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center"
                            }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                            <button style={{
                                width: "36px", height: "36px",
                                borderRadius: "50%", border: "1px solid #e5e7eb",
                                backgroundColor: "#fff", cursor: "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center"
                            }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "20px", overflowX: "auto", paddingBottom: "16px" }}>
                        {[
                            { name: "Fred Rick", date: "3 days ago", rating: 5, review: "The driver Ray was very friendly and knowledgeable about the island. He made it a fun and educational day for our group." },
                            { name: "Fred Rick", date: "3 days ago", rating: 5, review: "The driver Ray was very friendly and knowledgeable about the island. He made it a fun and educational day for our group." },
                            { name: "Fred Rick", date: "3 days ago", rating: 5, review: "The driver Ray was very friendly and knowledgeable about the island. He made it a fun and educational day for our group." },
                        ].map((review, idx) => (
                            <div key={idx} style={{
                                minWidth: "320px",
                                backgroundColor: "#ffffff",
                                borderRadius: "12px",
                                padding: "20px",
                                border: "1px solid #e5e7eb",
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                                    <div style={{
                                        width: "40px", height: "40px",
                                        borderRadius: "50%",
                                        backgroundColor: "#e5e7eb",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        overflow: "hidden"
                                    }}>
                                        <img
                                            src={`https://i.pravatar.cc/40?img=${idx + 10}`}
                                            alt={review.name}
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "14px", fontWeight: 600, color: "#1f2937" }}>{review.name}</div>
                                        <div style={{ fontSize: "12px", color: "#6b7280" }}>{review.date}</div>
                                    </div>
                                </div>

                                {/* Star Rating */}
                                <div style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill={star <= review.rating ? "#10b981" : "#e5e7eb"}>
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    ))}
                                </div>

                                <p style={{ fontSize: "14px", color: "#4b5563", lineHeight: 1.6, marginBottom: "16px" }}>
                                    {review.review}
                                </p>

                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid #f3f4f6" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                        <span style={{ fontSize: "12px", color: "#6b7280", display: "flex", alignItems: "center", gap: "4px" }}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                                            </svg>
                                            5
                                        </span>
                                        <span style={{ fontSize: "12px", color: "#6b7280", display: "flex", alignItems: "center", gap: "4px" }}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                            </svg>
                                            12
                                        </span>
                                    </div>
                                    <span style={{ fontSize: "11px", color: "#9ca3af" }}>Review from Trustpilot</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recommended For You */}
                <div style={{ marginBottom: "48px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                        <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#1f2937" }}>
                            Recommended For You
                        </h2>
                        <div style={{ display: "flex", gap: "8px" }}>
                            <button style={{
                                width: "36px", height: "36px",
                                borderRadius: "50%", border: "1px solid #e5e7eb",
                                backgroundColor: "#fff", cursor: "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center"
                            }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                            <button style={{
                                width: "36px", height: "36px",
                                borderRadius: "50%", border: "1px solid #e5e7eb",
                                backgroundColor: "#fff", cursor: "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center"
                            }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "20px", overflowX: "auto", paddingBottom: "16px" }}>
                        {SAMPLE_HOTELS.filter(h => h.id !== hotel.id).slice(0, 4).map((recHotel) => (
                            <div
                                key={recHotel.id}
                                style={{
                                    minWidth: "260px",
                                    backgroundColor: "#ffffff",
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    border: "1px solid #e5e7eb",
                                    cursor: "pointer",
                                }}
                                onClick={() => router.push(`/hotels/${recHotel.id}`)}
                            >
                                <div style={{ position: "relative", height: "160px" }}>
                                    <img
                                        src={recHotel.image}
                                        alt={recHotel.name}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                    <button
                                        style={{
                                            position: "absolute",
                                            top: "8px",
                                            right: "8px",
                                            width: "32px",
                                            height: "32px",
                                            borderRadius: "50%",
                                            backgroundColor: "rgba(255,255,255,0.9)",
                                            border: "none",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Heart size={16} color="#6b7280" />
                                    </button>
                                </div>

                                <div style={{ padding: "16px" }}>
                                    <h4 style={{ fontSize: "15px", fontWeight: 600, color: "#1f2937", marginBottom: "4px" }}>
                                        {recHotel.name.length > 25 ? recHotel.name.slice(0, 25) + "..." : recHotel.name}
                                    </h4>
                                    <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>{recHotel.location}</p>

                                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                                        <span style={{
                                            backgroundColor: "#06b6d4",
                                            color: "#fff",
                                            padding: "2px 6px",
                                            borderRadius: "4px",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                        }}>
                                            {recHotel.rating}
                                        </span>
                                        <span style={{ fontSize: "13px", color: "#1f2937" }}>{recHotel.ratingText}</span>
                                        <span style={{ fontSize: "12px", color: "#6b7280" }}>({recHotel.reviewCount} reviews)</span>
                                    </div>

                                    <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                                        ✈️ Baku(GYD)-{recHotel.location.split(",")[0]}
                                    </div>

                                    <div style={{ marginTop: "8px" }}>
                                        {recHotel.originalPrice && (
                                            <span style={{ fontSize: "13px", color: "#9ca3af", textDecoration: "line-through", marginRight: "8px" }}>
                                                ${recHotel.originalPrice}
                                            </span>
                                        )}
                                        <span style={{ fontSize: "18px", fontWeight: 600, color: "#1f2937" }}>${recHotel.pricePerNight}</span>
                                    </div>
                                    <div style={{ fontSize: "12px", color: "#6b7280" }}>
                                        ${Math.round(recHotel.pricePerNight / recHotel.nights)} nightly
                                    </div>
                                    <div style={{ fontSize: "12px", color: "#6b7280" }}>
                                        ${Math.round(recHotel.pricePerNight * 1.15)} total
                                    </div>
                                    <div style={{ fontSize: "11px", color: "#9ca3af" }}>
                                        Total with taxes and fees
                                    </div>
                                    <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "4px" }}>
                                        Sep 18 - Oct 3
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
